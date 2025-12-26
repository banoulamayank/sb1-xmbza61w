export interface YouTubeChannelStats {
  subscriberCount: string;
  viewCount: string;
  videoCount: string;
}

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;

export const fetchYouTubeStats = async (): Promise<YouTubeChannelStats | null> => {
  // If API key or Channel ID is not configured, return null
  if (!YOUTUBE_API_KEY || !CHANNEL_ID) {
    console.warn('YouTube API credentials not configured. Using fallback data.');
    return null;
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${YOUTUBE_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      throw new Error('Channel not found');
    }

    const stats = data.items[0].statistics;

    return {
      subscriberCount: stats.subscriberCount,
      viewCount: stats.viewCount,
      videoCount: stats.videoCount,
    };
  } catch (error) {
    console.error('Error fetching YouTube stats:', error);
    return null;
  }
};

export const formatNumber = (num: string | number): string => {
  const value = typeof num === 'string' ? parseInt(num) : num;

  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }

  return value.toString();
};
