# Quick Start: Fetch Videos from YouTube

Since the automated fetch requires network access to YouTube API, here's how to fetch your videos:

## Option 1: Run Locally (Recommended)

On your local machine with internet access:

```bash
# Clone the repository
git clone <your-repo-url>
cd sb1-xmbza61w

# Install dependencies if needed
npm install

# Fetch videos from YouTube
npm run fetch-videos
```

This will:
- ✅ Connect to YouTube API
- ✅ Fetch all playlists from AI Loop channel
- ✅ Get all videos from each playlist
- ✅ Categorize based on playlist names
- ✅ Filter out shorts (< 60 seconds)
- ✅ Generate `src/data/aiLoopVideos.ts`

Then commit and push:
```bash
git add src/data/aiLoopVideos.ts
git commit -m "Update videos from YouTube playlists"
git push
```

## Option 2: Use the Helper Script

```bash
./fetch-videos.sh
```

## Option 3: Manual Setup

If you want to add videos manually without fetching from YouTube:

1. Edit `src/data/aiLoopVideos.ts`
2. Add your videos to the `aiLoopVideos` array

Example:
```typescript
export const aiLoopVideos: VideoItem[] = [
  {
    id: "1",
    title: "Your Video Title",
    description: "Video description",
    youtubeId: "VIDEO_ID_HERE",
    category: "ChatGPT Tutorials",
    duration: "10:30",
    publishedAt: "2025-01-01T00:00:00Z"
  },
  // Add more videos...
];
```

## Current Playlist Categories

Your videos will be automatically categorized based on playlist names:

| Playlist Name Contains | Category |
|----------------------|----------|
| "chatgpt", "gpt", "openai" | ChatGPT Tutorials |
| "gemini", "google", "bard" | Google Gemini Tutorials |
| "roadmap", "learning" | AI Roadmap |
| "video generation", "video ai" | Video Generation Tools |
| "image generation", "ai image" | Image Generation Tools |
| "productivity", "automation" | Productivity Tutorials |

## What's Already Set Up

✅ **fetchYouTubeVideos.cjs** - Playlist-based fetching script
✅ **npm run fetch-videos** - Command to fetch videos
✅ **VideoTutorials.tsx** - Automatically displays fetched videos
✅ **Playlist mapping** - Categories based on playlist names
✅ **Shorts filtering** - Videos < 60 seconds excluded
✅ **Duplicate handling** - No duplicate videos

## Next Steps

1. Run `npm run fetch-videos` on a machine with internet access
2. Videos will be saved to `src/data/aiLoopVideos.ts`
3. Commit and push the file
4. Your website automatically displays all videos!

## Need Help?

See VIDEO_FETCH_SETUP.md for complete documentation.
