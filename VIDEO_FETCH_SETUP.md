# AI Loop YouTube Video Auto-Fetch Setup (Playlist-Based)

This guide explains how to automatically fetch and display videos from the AI Loop YouTube channel based on playlists.

## 🎯 Features

✅ **Playlist-Based Categorization** - Videos are categorized by their YouTube playlists
✅ **Automatic Updates** - Upload videos to playlists on YouTube, run script to update website
✅ **Shorts Filtering** - Automatically excludes YouTube Shorts (videos < 60 seconds)
✅ **No Duplicates** - Handles videos in multiple playlists intelligently
✅ **Fresh Content** - Run the script anytime to sync with your YouTube channel

## 🔄 How It Works

### The Workflow

```
YouTube Channel → Playlists → Videos → Website
```

1. **Upload video to YouTube** - Add your new video to the AI Loop channel
2. **Add to playlist** - Place the video in the appropriate playlist (e.g., "ChatGPT Tutorials")
3. **Run fetch script** - Execute `npm run fetch-videos`
4. **Automatic categorization** - Video appears in the correct category on your website

### System Components

1. **fetchYouTubeVideos.cjs** - Node.js script that:
   - Fetches all playlists from AI Loop channel using YouTube Data API
   - For each playlist, fetches all videos
   - Maps playlist names to website categories
   - Filters out shorts (videos less than 60 seconds)
   - Removes duplicate videos (if in multiple playlists)
   - Generates TypeScript data file with all videos

2. **src/data/aiLoopVideos.ts** - Auto-generated data file containing:
   - Array of all fetched videos with metadata
   - Video information (title, description, duration, category, playlist)
   - Video categories list

3. **src/components/VideoTutorials.tsx** - React component that:
   - Imports AI Loop videos automatically
   - Merges with any manual videos
   - Displays videos with filtering by category

## 📂 Playlist to Category Mapping

Videos are automatically categorized based on which playlist they belong to:

| Website Category | YouTube Playlist Name Contains |
|-----------------|-------------------------------|
| **ChatGPT Tutorials** | "chatgpt", "gpt", "openai" |
| **Google Gemini Tutorials** | "gemini", "google", "bard" |
| **AI Roadmap** | "roadmap", "ai roadmap", "learning path" |
| **Video Generation Tools** | "video generation", "video ai", "ai video" |
| **Image Generation Tools** | "image generation", "ai image", "dall-e", "midjourney" |
| **Productivity Tutorials** | "productivity", "automation", "workflow" |

### How Mapping Works

The script checks each playlist name against the keywords above:
- Playlist named "ChatGPT Tips and Tricks" → **ChatGPT Tutorials**
- Playlist named "Google Gemini Features" → **Google Gemini Tutorials**
- Playlist named "Best AI Video Tools" → **Video Generation Tools**
- Playlist named "Custom Playlist XYZ" → **AI Roadmap** (default)

## 🚀 Usage

### Setup Your YouTube Playlists

1. Go to [YouTube Studio](https://studio.youtube.com/)
2. Create playlists with names matching the keywords above:
   - "ChatGPT Tutorials"
   - "Google Gemini Tutorials"
   - "AI Roadmap"
   - "Video Generation Tools"
   - "Image Generation Tools"
   - "Productivity Tutorials"
3. Add videos to the appropriate playlists

### Fetch Videos

Run this command to fetch all latest videos from your playlists:

```bash
npm run fetch-videos
```

**What happens:**
1. ✅ Connects to YouTube Data API using credentials from `.env`
2. 📂 Fetches all playlists from the AI Loop channel
3. 📹 For each playlist, fetches all videos
4. 🏷️ Maps playlist names to website categories
5. ⏭️ Filters out shorts automatically (< 60 seconds)
6. ✂️ Removes duplicate videos (same video in multiple playlists)
7. 💾 Generates/updates `src/data/aiLoopVideos.ts`
8. 📊 Shows statistics (total videos, by category, by playlist)

### View Videos on Website

Videos automatically appear in the Video Tutorials section:
- **Homepage**: Scroll to "Video Tutorials" section
- **Dedicated page**: Navigate to `/tutorials`
- **Filter by category**: Use category buttons
- **Watch**: Click any video to watch on YouTube

## ⚙️ Configuration

### Environment Variables

Make sure these are set in your `.env` file:

```env
VITE_YOUTUBE_API_KEY=your_youtube_api_key
VITE_YOUTUBE_CHANNEL_ID=UCm4qtW9GIh8C8sMmKxSlZZA
```

See [YOUTUBE_SETUP.md](./YOUTUBE_SETUP.md) for detailed YouTube API setup instructions.

### Customizing Playlist Mapping

To add or modify playlist-to-category mappings, edit `fetchYouTubeVideos.cjs`:

```javascript
const playlistMapping = {
  'ChatGPT Tutorials': ['chatgpt', 'gpt', 'openai'],
  'Your New Category': ['keyword1', 'keyword2'],
  // Add more mappings...
};
```

**Important:** Also update the categories in `src/data/aiLoopVideos.ts`:

```typescript
export const videoCategories = [
  'All',
  'ChatGPT Tutorials',
  'Your New Category',
  // Add more categories...
];
```

## 📝 Workflow Examples

### Example 1: Adding a New ChatGPT Tutorial

1. Upload video to YouTube: "ChatGPT 5.3 New Features"
2. Add to playlist: "ChatGPT Tutorials"
3. Run: `npm run fetch-videos`
4. Result: Video appears in "ChatGPT Tutorials" category on website

### Example 2: Adding a Video to Multiple Playlists

1. Upload video: "Google Gemini for Productivity"
2. Add to playlists: "Google Gemini Tutorials" AND "Productivity Tutorials"
3. Run: `npm run fetch-videos`
4. Result: Video appears in "Google Gemini Tutorials" only (first match wins, duplicates skipped)

### Example 3: Creating a New Category

1. Edit `fetchYouTubeVideos.cjs`:
   ```javascript
   'AI News': ['ai news', 'news', 'updates']
   ```
2. Create YouTube playlist: "AI News Weekly"
3. Add videos to that playlist
4. Run: `npm run fetch-videos`
5. Update website UI to show "AI News" category
6. Result: Videos automatically appear in new category

## 🔄 Regular Updates

### Manual Updates

To keep videos fresh, run the fetch script periodically:

```bash
npm run fetch-videos
```

### Automated Updates (Recommended)

#### Option 1: GitHub Actions (Scheduled)

Create `.github/workflows/update-videos.yml`:

```yaml
name: Update AI Loop Videos

on:
  schedule:
    - cron: '0 0 * * *'  # Daily at midnight
  workflow_dispatch:  # Allow manual trigger

jobs:
  update-videos:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Fetch latest videos
        env:
          VITE_YOUTUBE_API_KEY: ${{ secrets.YOUTUBE_API_KEY }}
          VITE_YOUTUBE_CHANNEL_ID: ${{ secrets.YOUTUBE_CHANNEL_ID }}
        run: npm run fetch-videos

      - name: Commit and push if changed
        run: |
          git config user.name github-actions
          git config user.email github-actions@github.com
          git add src/data/aiLoopVideos.ts
          git diff --quiet && git diff --staged --quiet || (git commit -m "Update AI Loop videos" && git push)
```

Add secrets to your GitHub repository:
- `YOUTUBE_API_KEY` - Your YouTube API key
- `YOUTUBE_CHANNEL_ID` - Your channel ID

#### Option 2: Build-Time Updates

Update `package.json` to fetch videos during build:

```json
"scripts": {
  "prebuild": "npm run fetch-videos",
  "build": "vite build"
}
```

**Note:** This increases build time but ensures videos are always fresh on deployment.

#### Option 3: Webhook Trigger

Set up a webhook that:
1. Triggers when you upload a new video to YouTube
2. Runs `npm run fetch-videos`
3. Commits changes
4. Triggers deployment

## 🛠️ Troubleshooting

### "YouTube API credentials not configured"

**Solution:**
- Verify `.env` file exists with correct API key and channel ID
- Restart development server after adding env variables
- Check [YOUTUBE_SETUP.md](./YOUTUBE_SETUP.md) for setup instructions

### "403 Forbidden" or "API Error"

**Solution:**
- Check YouTube Data API v3 is enabled in Google Cloud Console
- Verify API key restrictions allow YouTube Data API
- Check API quota (10,000 units/day default)
- Ensure API key works for playlists and playlistItems endpoints

### "No playlists found in the channel"

**Solution:**
- Create public playlists in YouTube Studio
- Ensure playlists are set to "Public" not "Private" or "Unlisted"
- Wait a few minutes after creating playlists
- Verify channel ID is correct

### Videos not categorized correctly

**Solution:**
- Check playlist names match the keywords in `playlistMapping`
- Update mapping in `fetchYouTubeVideos.cjs` if needed
- Rename playlists on YouTube to match expected keywords
- Re-run `npm run fetch-videos` after changes

### Duplicates appearing

**Solution:**
- The script automatically handles duplicates
- If same video is in multiple playlists, only first match is used
- Check console output to see which videos were skipped as duplicates

### Network errors

**Solution:**
- Check internet connection
- Verify googleapis.com is accessible
- Script includes automatic delays between requests
- Check firewall/proxy settings

## 📊 API Quota Management

YouTube Data API has daily quotas:
- **Default quota**: 10,000 units/day
- **List playlists**: ~1 unit per request
- **List playlist items**: ~1 unit per request
- **Get video details**: ~1 unit per request
- **Typical usage**: 50-200 units per full fetch (depends on playlist count)

The script is optimized to:
- Batch requests efficiently (50 items per page)
- Add delays between requests (500ms-1000ms)
- Minimize redundant API calls
- Use pagination effectively

## 📁 File Structure

```
.
├── fetchYouTubeVideos.cjs          # Playlist-based video fetch script
├── src/
│   ├── components/
│   │   └── VideoTutorials.tsx      # Video display component
│   └── data/
│       └── aiLoopVideos.ts         # Auto-generated video data
├── .env                             # API credentials
├── package.json                     # npm scripts
└── VIDEO_FETCH_SETUP.md            # This file
```

## 💡 Best Practices

1. **Organize playlists clearly**: Use descriptive names matching the categories
2. **Run fetch regularly**: Set up automated updates (daily or weekly)
3. **Monitor API quota**: Check usage in Google Cloud Console
4. **Test before deploying**: Run `npm run fetch-videos` locally first
5. **Version control**: Commit generated `aiLoopVideos.ts` file
6. **Backup strategy**: Keep manual videos as fallback

## 🎓 Tips & Tricks

### Tip 1: Quick Category Change
Move a video to a different category by:
1. Remove from current playlist on YouTube
2. Add to target playlist
3. Run `npm run fetch-videos`

### Tip 2: Bulk Import
To add many videos at once:
1. Create playlist on YouTube
2. Add all videos to that playlist
3. Run script once to import all

### Tip 3: Preview Before Publishing
Use "Unlisted" playlists for testing, then change to "Public" when ready

### Tip 4: Manage Duplicates
If a video fits multiple categories:
- Add to most specific category first
- Script will use first match, skip duplicates

## 🆘 Support

For more information:
- [YouTube Data API Documentation](https://developers.google.com/youtube/v3)
- [YouTube Playlists API](https://developers.google.com/youtube/v3/docs/playlists)
- [YouTube API Setup Guide](./YOUTUBE_SETUP.md)
- [Google Cloud Console](https://console.cloud.google.com/)

## 📝 Summary

1. ✅ Create playlists on YouTube matching category keywords
2. ✅ Upload videos and add them to appropriate playlists
3. ✅ Run `npm run fetch-videos` to sync with website
4. ✅ Videos automatically categorized based on playlist
5. ✅ Shorts filtered out automatically
6. ✅ Duplicates handled intelligently
7. ✅ Repeat whenever you add new videos

**The system is fully automatic - just organize your YouTube playlists and run the script!** 🎉
