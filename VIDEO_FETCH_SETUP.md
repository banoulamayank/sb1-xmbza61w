# AI Loop YouTube Video Auto-Fetch Setup

This guide explains how to automatically fetch and display videos from the AI Loop YouTube channel in your video tutorials section.

## Features

✅ **Automatic Video Fetching** - Fetches all videos from AI Loop YouTube channel
✅ **Shorts Filtering** - Automatically excludes YouTube Shorts (videos < 60 seconds)
✅ **Smart Categorization** - Categorizes videos based on title keywords
✅ **No Duplicates** - Merges with manual videos and removes duplicates
✅ **Fresh Content** - Run the script anytime to get latest videos

## How It Works

1. **fetchYouTubeVideos.cjs** - Node.js script that:
   - Fetches all videos from AI Loop channel using YouTube Data API
   - Filters out shorts (videos less than 60 seconds)
   - Categorizes videos automatically based on title keywords
   - Generates TypeScript data file with all videos

2. **src/data/aiLoopVideos.ts** - Auto-generated data file containing:
   - Array of all fetched videos
   - Video metadata (title, description, duration, category)
   - Video categories list

3. **src/components/VideoTutorials.tsx** - Component that:
   - Imports AI Loop videos automatically
   - Merges with any manual videos
   - Displays videos with filtering by category

## Category Mapping

Videos are automatically categorized based on these keywords in their titles:

| Category | Keywords |
|----------|----------|
| **ChatGPT Tutorials** | chatgpt, gpt, openai, chat gpt |
| **Google Gemini Tutorials** | gemini, google, bard, firebase, veo |
| **AI Roadmap** | roadmap, guide, learn, beginner, tutorial, course |
| **Video Generation Tools** | video, veo, sora, gen-2, runway, heygen, synthesis |
| **Image Generation Tools** | image, dall-e, midjourney, stable diffusion, imagen, picture, art |
| **Productivity Tutorials** | productivity, workflow, automation, tool, app, efficiency |

If no keywords match, videos default to **AI Roadmap** category.

## Usage

### Fetch Videos (One-Time Setup or Updates)

Run this command to fetch all latest videos from AI Loop channel:

```bash
npm run fetch-videos
```

This will:
1. Connect to YouTube Data API using credentials from `.env`
2. Fetch all videos from the AI Loop channel
3. Filter out shorts automatically
4. Categorize each video based on its title
5. Generate/update `src/data/aiLoopVideos.ts`
6. Show statistics about fetched videos

### View Videos on Website

The videos are automatically displayed in the Video Tutorials section:
- Homepage: Scroll to "Video Tutorials" section
- Dedicated page: `/tutorials`
- Filter by category using the category buttons
- Click any video to watch on YouTube

## Configuration

### Environment Variables

Make sure these are set in your `.env` file:

```env
VITE_YOUTUBE_API_KEY=your_youtube_api_key
VITE_YOUTUBE_CHANNEL_ID=UCm4qtW9GIh8C8sMmKxSlZZA
```

See [YOUTUBE_SETUP.md](./YOUTUBE_SETUP.md) for detailed YouTube API setup instructions.

### Customizing Categories

To add or modify categories, edit `fetchYouTubeVideos.cjs`:

```javascript
const categoryKeywords = {
  'ChatGPT Tutorials': ['chatgpt', 'gpt', 'openai', 'chat gpt'],
  'Your New Category': ['keyword1', 'keyword2'],
  // Add more categories...
};
```

Also update the categories in `src/data/aiLoopVideos.ts`:

```typescript
export const videoCategories = [
  'All',
  'ChatGPT Tutorials',
  'Your New Category',
  // Add more categories...
];
```

## Manual Videos

You can still add manual videos alongside AI Loop videos. Edit `src/components/VideoTutorials.tsx`:

```typescript
const manualVideos: VideoItem[] = [
  {
    id: 'unique-id',
    title: 'Your Video Title',
    description: 'Video description',
    youtubeId: 'YouTube_Video_ID',
    category: 'ChatGPT Tutorials',
    duration: '10:30',
  },
  // Add more manual videos...
];
```

The component automatically:
- Merges AI Loop videos with manual videos
- Removes duplicates (same youtubeId)
- Prioritizes AI Loop videos over manual videos

## Updating Videos

### Regular Updates

To keep videos fresh, run the fetch script periodically:

```bash
npm run fetch-videos
```

### Automated Updates (Optional)

You can automate video fetching by:

1. **Adding to build process** - Update `package.json`:
   ```json
   "scripts": {
     "build": "npm run fetch-videos && vite build"
   }
   ```

2. **GitHub Actions** - Create `.github/workflows/update-videos.yml`:
   ```yaml
   name: Update Videos
   on:
     schedule:
       - cron: '0 0 * * 0'  # Weekly on Sundays
     workflow_dispatch:  # Manual trigger

   jobs:
     update:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
         - run: npm run fetch-videos
         - run: |
             git config user.name github-actions
             git config user.email github-actions@github.com
             git add src/data/aiLoopVideos.ts
             git commit -m "Update AI Loop videos" || exit 0
             git push
   ```

3. **Vercel Deploy Hook** - Set up a webhook that:
   - Runs `npm run fetch-videos`
   - Commits changes
   - Triggers rebuild

## Troubleshooting

### "YouTube API credentials not configured"

- Verify `.env` file exists with correct API key and channel ID
- Restart your development server after adding env variables
- See [YOUTUBE_SETUP.md](./YOUTUBE_SETUP.md) for setup instructions

### "403 Forbidden" or "API Error"

- Check YouTube Data API v3 is enabled in Google Cloud Console
- Verify API key restrictions allow YouTube Data API
- Check API quota (10,000 units/day default)
- Ensure API key is not domain-restricted or allows current domain

### No videos appearing

- Run `npm run fetch-videos` first to populate data
- Check `src/data/aiLoopVideos.ts` has videos array with items
- Verify channel ID is correct (UCm4qtW9GIh8C8sMmKxSlZZA)
- Check browser console for errors

### Videos not categorized correctly

- Review title keywords in `fetchYouTubeVideos.cjs`
- Add missing keywords for your specific video titles
- Re-run `npm run fetch-videos` after changes

### Network errors

- Check internet connection
- Verify googleapis.com is accessible
- Try running script with delay between API calls
- Check firewall/proxy settings

## API Quota Management

YouTube Data API has daily quotas:
- **Default quota**: 10,000 units/day
- **Channel search**: ~1 unit per request
- **Video details**: ~1 unit per request
- **Typical usage**: ~100-200 units per full fetch

The script is designed to:
- Batch requests efficiently (50 videos per page)
- Add delays between requests
- Limit to 10 pages max (500 videos) per run

## File Structure

```
.
├── fetchYouTubeVideos.cjs          # Video fetch script
├── src/
│   ├── components/
│   │   └── VideoTutorials.tsx      # Video display component
│   └── data/
│       └── aiLoopVideos.ts         # Auto-generated video data
├── .env                             # API credentials
├── package.json                     # npm scripts
└── VIDEO_FETCH_SETUP.md            # This file
```

## Support

For more information:
- [YouTube Data API Documentation](https://developers.google.com/youtube/v3)
- [YouTube API Setup Guide](./YOUTUBE_SETUP.md)
- [Google Cloud Console](https://console.cloud.google.com/)

## Summary

1. ✅ YouTube API is configured in `.env`
2. ✅ Run `npm run fetch-videos` to get latest videos
3. ✅ Videos automatically categorized and filtered
4. ✅ Shorts excluded automatically
5. ✅ Videos displayed in Video Tutorials section
6. ✅ Run script periodically to keep content fresh
