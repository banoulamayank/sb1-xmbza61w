# YouTube Data API Setup Guide

This guide will help you set up YouTube Data API integration to display real-time channel statistics on your website.

## Prerequisites

- A Google account
- A YouTube channel

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on "Select a project" at the top
3. Click "NEW PROJECT"
4. Enter a project name (e.g., "My Website YouTube Stats")
5. Click "CREATE"

## Step 2: Enable YouTube Data API v3

1. In your Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "YouTube Data API v3"
3. Click on it and press "ENABLE"

## Step 3: Create API Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "CREATE CREDENTIALS" at the top
3. Select "API key"
4. Your API key will be generated
5. (Optional but recommended) Click "RESTRICT KEY" to add restrictions:
   - Under "API restrictions", select "Restrict key"
   - Choose "YouTube Data API v3" from the dropdown
   - Under "Application restrictions", you can add your website domain

## Step 4: Get Your YouTube Channel ID

### Method 1: From YouTube Studio
1. Go to [YouTube Studio](https://studio.youtube.com/)
2. Click on "Settings" (gear icon)
3. Click "Channel" > "Advanced settings"
4. Your Channel ID will be displayed under "Channel ID"

### Method 2: From Your Channel URL
1. Go to your YouTube channel
2. Click "Customize channel"
3. Look at the URL - it should be something like:
   - `https://www.youtube.com/channel/UC...` - The part after `/channel/` is your Channel ID
   - OR `https://www.youtube.com/@username` - You'll need to use Method 1 in this case

## Step 5: Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and add your credentials:
   ```
   VITE_YOUTUBE_API_KEY=your_actual_api_key_here
   VITE_YOUTUBE_CHANNEL_ID=your_actual_channel_id_here
   ```

3. Save the file

## Step 6: Test Your Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit your website and check the "Our Impact in Numbers" section
3. You should see real-time statistics from your YouTube channel
4. Look for the "✓ Live data from YouTube API" indicator at the bottom of the stats section

## Fallback Behavior

If the API credentials are not configured or the API call fails, the website will automatically display fallback static data. This ensures your website continues to work even if there are issues with the YouTube API.

## API Quota

- YouTube Data API has a daily quota limit (10,000 units per day by default)
- A simple channel statistics request costs 1 unit
- This should be more than sufficient for most websites

## Security Notes

1. **Never commit your `.env` file** to version control (it's already in `.gitignore`)
2. For production deployment, add the environment variables in your hosting platform's settings
3. Consider adding domain restrictions to your API key in Google Cloud Console

## Troubleshooting

### "YouTube API credentials not configured" message in console
- Make sure `.env` file exists and contains both `VITE_YOUTUBE_API_KEY` and `VITE_YOUTUBE_CHANNEL_ID`
- Restart your development server after adding environment variables

### API returns 403 error
- Check that YouTube Data API v3 is enabled in your Google Cloud project
- Verify your API key is correct and not restricted to other APIs

### No data showing
- Check browser console for error messages
- Verify your Channel ID is correct
- Make sure your YouTube channel is public

## Support

For more information, visit:
- [YouTube Data API Documentation](https://developers.google.com/youtube/v3)
- [Google Cloud Console](https://console.cloud.google.com/)
