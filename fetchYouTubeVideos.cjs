const fs = require('fs');
const https = require('https');

// Load environment variables from .env file
try {
  const envContent = fs.readFileSync('.env', 'utf8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=:#]+?)[=:](.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim();
      process.env[key] = value;
    }
  });
} catch (e) {
  console.error('❌ Could not read .env file:', e.message);
  process.exit(1);
}

const API_KEY = process.env.VITE_YOUTUBE_API_KEY?.trim();
const CHANNEL_ID = process.env.VITE_YOUTUBE_CHANNEL_ID?.trim();

if (!API_KEY || !CHANNEL_ID) {
  console.error('❌ YouTube API credentials not found in .env file');
  console.error('Please make sure VITE_YOUTUBE_API_KEY and VITE_YOUTUBE_CHANNEL_ID are set');
  process.exit(1);
}

// Playlist name to category mapping
// Map your YouTube playlist names to website categories
const playlistMapping = {
  'ChatGPT Tutorials': ['chatgpt', 'gpt', 'openai'],
  'Google Gemini Tutorials': ['gemini', 'google', 'bard'],
  'AI Roadmap': ['roadmap', 'ai roadmap', 'learning path'],
  'Video Generation Tools': ['video generation', 'video ai', 'ai video'],
  'Image Generation Tools': ['image generation', 'image ai', 'ai image', 'dall-e', 'midjourney'],
  'Productivity Tutorials': ['productivity', 'automation', 'workflow']
};

// Function to map playlist title to category
function mapPlaylistToCategory(playlistTitle) {
  const lowerTitle = playlistTitle.toLowerCase();

  for (const [category, keywords] of Object.entries(playlistMapping)) {
    for (const keyword of keywords) {
      if (lowerTitle.includes(keyword.toLowerCase())) {
        return category;
      }
    }
  }

  // If no match found, use the playlist title as category or default
  console.log(`⚠️  No mapping found for playlist: "${playlistTitle}". Using "AI Roadmap" as default.`);
  return 'AI Roadmap';
}

// Function to format duration from ISO 8601 to readable format
function formatDuration(isoDuration) {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '0:00';

  const hours = parseInt(match[1] || 0);
  const minutes = parseInt(match[2] || 0);
  const seconds = parseInt(match[3] || 0);

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

// Function to get duration in seconds
function getDurationInSeconds(isoDuration) {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;

  const hours = parseInt(match[1] || 0);
  const minutes = parseInt(match[2] || 0);
  const seconds = parseInt(match[3] || 0);

  return hours * 3600 + minutes * 60 + seconds;
}

// Function to make HTTPS request
function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    }).on('error', reject);
  });
}

// Function to fetch all playlists from the channel
async function fetchChannelPlaylists() {
  console.log('📂 Fetching playlists from AI Loop channel...');

  let allPlaylists = [];
  let nextPageToken = '';

  try {
    do {
      const playlistsUrl = `https://www.googleapis.com/youtube/v3/playlists?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,contentDetails&maxResults=50${nextPageToken ? '&pageToken=' + nextPageToken : ''}`;

      const playlistsData = await httpsGet(playlistsUrl);

      if (playlistsData.items && playlistsData.items.length > 0) {
        allPlaylists.push(...playlistsData.items);
      }

      nextPageToken = playlistsData.nextPageToken || '';

      if (nextPageToken) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    } while (nextPageToken);

    console.log(`✓ Found ${allPlaylists.length} playlists`);
    return allPlaylists;

  } catch (error) {
    console.error('❌ Error fetching playlists:', error.message);
    throw error;
  }
}

// Function to fetch videos from a specific playlist
async function fetchPlaylistVideos(playlistId, playlistTitle) {
  console.log(`  📹 Fetching videos from: "${playlistTitle}"`);

  let allVideos = [];
  let nextPageToken = '';

  try {
    do {
      const playlistItemsUrl = `https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&playlistId=${playlistId}&part=snippet&maxResults=50${nextPageToken ? '&pageToken=' + nextPageToken : ''}`;

      const playlistData = await httpsGet(playlistItemsUrl);

      if (!playlistData.items || playlistData.items.length === 0) {
        break;
      }

      // Extract video IDs
      const videoIds = playlistData.items
        .map(item => item.snippet.resourceId.videoId)
        .filter(id => id)
        .join(',');

      if (videoIds) {
        // Get video details including duration
        const videosUrl = `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds}&part=snippet,contentDetails`;
        const videosData = await httpsGet(videosUrl);

        if (videosData.items) {
          allVideos.push(...videosData.items);
        }
      }

      nextPageToken = playlistData.nextPageToken || '';

      if (nextPageToken) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    } while (nextPageToken);

    return allVideos;

  } catch (error) {
    console.error(`  ❌ Error fetching videos from playlist "${playlistTitle}":`, error.message);
    return [];
  }
}

// Function to fetch all videos from all playlists
async function fetchAllPlaylistVideos() {
  console.log('🔍 Starting playlist-based video fetch...\n');

  try {
    // Step 1: Get all playlists
    const playlists = await fetchChannelPlaylists();

    if (playlists.length === 0) {
      console.log('⚠️  No playlists found in the channel');
      return [];
    }

    console.log('\n📋 Processing playlists:\n');

    let allVideos = [];
    const videoIds = new Set(); // To track duplicates

    // Step 2: Fetch videos from each playlist
    for (const playlist of playlists) {
      const playlistId = playlist.id;
      const playlistTitle = playlist.snippet.title;
      const category = mapPlaylistToCategory(playlistTitle);

      console.log(`\n📁 Playlist: "${playlistTitle}" → Category: "${category}"`);

      const playlistVideos = await fetchPlaylistVideos(playlistId, playlistTitle);

      let addedCount = 0;
      let skippedShorts = 0;
      let skippedDuplicates = 0;

      for (const video of playlistVideos) {
        const videoId = video.id;
        const durationSeconds = getDurationInSeconds(video.contentDetails.duration);

        // Skip shorts (videos less than 60 seconds)
        if (durationSeconds < 60) {
          skippedShorts++;
          continue;
        }

        // Skip duplicates (video already in another playlist)
        if (videoIds.has(videoId)) {
          skippedDuplicates++;
          continue;
        }

        videoIds.add(videoId);

        allVideos.push({
          id: videoId,
          title: video.snippet.title,
          description: video.snippet.description.substring(0, 150) || 'Learn more about this topic',
          youtubeId: videoId,
          category: category,
          duration: formatDuration(video.contentDetails.duration),
          publishedAt: video.snippet.publishedAt,
          playlistTitle: playlistTitle
        });

        addedCount++;
      }

      console.log(`  ✓ Added ${addedCount} videos`);
      if (skippedShorts > 0) console.log(`  ⏭️  Skipped ${skippedShorts} shorts (< 60s)`);
      if (skippedDuplicates > 0) console.log(`  ↺ Skipped ${skippedDuplicates} duplicates`);

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log(`\n✓ Total videos fetched: ${allVideos.length}`);
    return allVideos;

  } catch (error) {
    console.error('❌ Error fetching playlist videos:', error.message);
    throw error;
  }
}

// Function to generate TypeScript file with video data
function generateVideoDataFile(videos) {
  const timestamp = new Date().toISOString();

  // Sort videos by published date (newest first)
  videos.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  const fileContent = `// Auto-generated file - DO NOT EDIT MANUALLY
// Generated on: ${timestamp}
// Total videos: ${videos.length}
// Source: YouTube Playlists from AI Loop Channel

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  category: string;
  duration: string;
  publishedAt: string;
  playlistTitle?: string;
}

export const aiLoopVideos: VideoItem[] = ${JSON.stringify(videos, null, 2)};

export const videoCategories = [
  'All',
  'ChatGPT Tutorials',
  'Google Gemini Tutorials',
  'AI Roadmap',
  'Video Generation Tools',
  'Image Generation Tools',
  'Productivity Tutorials'
];
`;

  const outputPath = './src/data/aiLoopVideos.ts';
  fs.writeFileSync(outputPath, fileContent, 'utf8');
  console.log(`\n✓ Generated ${outputPath}`);

  // Print category statistics
  const categoryStats = {};
  const playlistStats = {};

  videos.forEach(video => {
    categoryStats[video.category] = (categoryStats[video.category] || 0) + 1;
    if (video.playlistTitle) {
      playlistStats[video.playlistTitle] = (playlistStats[video.playlistTitle] || 0) + 1;
    }
  });

  console.log('\n📊 Category Statistics:');
  Object.entries(categoryStats)
    .sort((a, b) => b[1] - a[1])
    .forEach(([category, count]) => {
      console.log(`   ${category}: ${count} videos`);
    });

  console.log('\n📂 Playlist Statistics:');
  Object.entries(playlistStats)
    .sort((a, b) => b[1] - a[1])
    .forEach(([playlist, count]) => {
      console.log(`   "${playlist}": ${count} videos`);
    });
}

// Main execution
async function main() {
  console.log('🚀 AI Loop YouTube Video Fetcher (Playlist-Based)');
  console.log('==================================================\n');

  try {
    const videos = await fetchAllPlaylistVideos();

    if (videos.length === 0) {
      console.log('\n⚠️  No videos found');
      console.log('💡 Make sure your YouTube channel has public playlists with videos');
      return;
    }

    generateVideoDataFile(videos);

    console.log('\n✅ Video data file generated successfully!');
    console.log('📝 Videos are automatically categorized based on their playlists');
    console.log('\n💡 Tips:');
    console.log('   - Add new videos to playlists on YouTube');
    console.log('   - Run "npm run fetch-videos" to update your website');
    console.log('   - Videos are automatically categorized by playlist name');

  } catch (error) {
    console.error('\n❌ Failed to fetch videos:', error.message);
    process.exit(1);
  }
}

main();
