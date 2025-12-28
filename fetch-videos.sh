#!/bin/bash

# AI Loop YouTube Video Fetcher
# This script fetches videos from your YouTube playlists and updates your website

echo "🚀 Fetching videos from AI Loop YouTube Channel..."
echo "=================================================="
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found"
    echo "Please create a .env file with:"
    echo "  VITE_YOUTUBE_API_KEY=your_api_key"
    echo "  VITE_YOUTUBE_CHANNEL_ID=UCm4qtW9GIh8C8sMmKxSlZZA"
    exit 1
fi

# Run the fetch script
echo "📂 Fetching playlists and videos..."
node fetchYouTubeVideos.cjs

# Check if it was successful
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Videos fetched successfully!"
    echo ""
    echo "📝 Next steps:"
    echo "  1. Review src/data/aiLoopVideos.ts"
    echo "  2. Commit the changes: git add src/data/aiLoopVideos.ts"
    echo "  3. Push to your repository"
    echo "  4. Deploy your website"
    echo ""
    echo "💡 Your website will now show all videos from your YouTube playlists!"
else
    echo ""
    echo "❌ Error fetching videos"
    echo "Please check:"
    echo "  - Internet connection"
    echo "  - YouTube API credentials in .env"
    echo "  - API quota hasn't been exceeded"
    exit 1
fi
