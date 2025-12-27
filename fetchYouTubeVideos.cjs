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

// Category keywords mapping
const categoryKeywords = {
  'ChatGPT Tutorials': ['chatgpt', 'gpt', 'openai', 'chat gpt'],
  'Google Gemini Tutorials': ['gemini', 'google', 'bard', 'firebase', 'veo'],
  'AI Roadmap': ['roadmap', 'guide', 'learn', 'beginner', 'tutorial', 'course'],
  'Video Generation Tools': ['video', 'veo', 'sora', 'gen-2', 'runway', 'heygen', 'synthesis'],
  'Image Generation Tools': ['image', 'dall-e', 'midjourney', 'stable diffusion', 'imagen', 'picture', 'art'],
  'Productivity Tutorials': ['productivity', 'workflow', 'automation', 'tool', 'app', 'efficiency']
};

// Function to categorize video based on title
function categorizeVideo(title) {
  const lowerTitle = title.toLowerCase();

  // Check each category
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    for (const keyword of keywords) {
      if (lowerTitle.includes(keyword.toLowerCase())) {
        return category;
      }
    }
  }

  // Default category if no match
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

// Function to fetch all videos from a channel (excluding shorts)
async function fetchChannelVideos() {
  console.log('🔍 Fetching videos from AI Loop channel...');

  let allVideos = [];
  let nextPageToken = '';
  let pageCount = 0;
  const maxPages = 10; // Limit to prevent excessive API calls

  try {
    // Step 1: Get all video IDs from the channel
    do {
      pageCount++;
      console.log(`📄 Fetching page ${pageCount}...`);

      const searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&type=video&order=date&maxResults=50${nextPageToken ? '&pageToken=' + nextPageToken : ''}`;

      const searchData = await httpsGet(searchUrl);

      if (!searchData.items || searchData.items.length === 0) {
        console.log('✓ No more videos found');
        break;
      }

      const videoIds = searchData.items.map(item => item.id.videoId).join(',');

      // Step 2: Get video details including duration
      const videosUrl = `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds}&part=snippet,contentDetails`;

      const videosData = await httpsGet(videosUrl);

      if (videosData.items) {
        for (const video of videosData.items) {
          const durationSeconds = getDurationInSeconds(video.contentDetails.duration);

          // Filter out shorts (videos less than 60 seconds)
          if (durationSeconds >= 60) {
            const category = categorizeVideo(video.snippet.title);

            allVideos.push({
              id: video.id,
              title: video.snippet.title,
              description: video.snippet.description.substring(0, 150) || 'Learn more about this topic',
              youtubeId: video.id,
              category: category,
              duration: formatDuration(video.contentDetails.duration),
              publishedAt: video.snippet.publishedAt
            });
          } else {
            console.log(`⏭️  Skipping short: ${video.snippet.title} (${durationSeconds}s)`);
          }
        }
      }

      nextPageToken = searchData.nextPageToken || '';

      // Add a small delay to avoid rate limiting
      if (nextPageToken && pageCount < maxPages) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

    } while (nextPageToken && pageCount < maxPages);

    console.log(`✓ Found ${allVideos.length} videos (excluding shorts)`);
    return allVideos;

  } catch (error) {
    console.error('❌ Error fetching videos:', error.message);
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

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  category: string;
  duration: string;
  publishedAt: string;
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
  console.log(`✓ Generated ${outputPath}`);

  // Print category statistics
  const categoryStats = {};
  videos.forEach(video => {
    categoryStats[video.category] = (categoryStats[video.category] || 0) + 1;
  });

  console.log('\n📊 Category Statistics:');
  Object.entries(categoryStats)
    .sort((a, b) => b[1] - a[1])
    .forEach(([category, count]) => {
      console.log(`   ${category}: ${count} videos`);
    });
}

// Main execution
async function main() {
  console.log('🚀 AI Loop YouTube Video Fetcher');
  console.log('================================\n');

  try {
    const videos = await fetchChannelVideos();

    if (videos.length === 0) {
      console.log('⚠️  No videos found');
      return;
    }

    generateVideoDataFile(videos);

    console.log('\n✅ Video data file generated successfully!');
    console.log('📝 Update src/components/VideoTutorials.tsx to import and use this data');

  } catch (error) {
    console.error('\n❌ Failed to fetch videos:', error.message);
    process.exit(1);
  }
}

main();
