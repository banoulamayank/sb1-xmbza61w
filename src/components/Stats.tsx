import { useEffect, useState } from 'react';
import { Users, Eye, Video, TrendingUp } from 'lucide-react';
import { fetchYouTubeStats, formatNumber, YouTubeChannelStats } from '../services/youtubeApi';

const Stats = () => {
  const [youtubeStats, setYoutubeStats] = useState<YouTubeChannelStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      const stats = await fetchYouTubeStats();
      setYoutubeStats(stats);
      setLoading(false);
    };

    loadStats();
  }, []);

  // Fallback stats if API is not configured or fails
  const fallbackStats = [
    {
      icon: Users,
      value: '10K+',
      label: 'Subscribers',
      gradient: 'from-cyan-500 to-blue-600',
      animation: 'animate-pulse-slow'
    },
    {
      icon: Eye,
      value: '500K+',
      label: 'Total Views',
      gradient: 'from-blue-600 to-purple-600',
      animation: 'animate-float'
    },
    {
      icon: Video,
      value: '200+',
      label: 'Videos',
      gradient: 'from-purple-600 to-orange-500',
      animation: 'animate-wiggle'
    },
    {
      icon: TrendingUp,
      value: '95%',
      label: 'Engagement Rate',
      gradient: 'from-orange-500 to-cyan-500',
      animation: 'animate-float'
    }
  ];

  // Build stats array with real data if available
  const stats = youtubeStats
    ? [
        {
          icon: Users,
          value: formatNumber(youtubeStats.subscriberCount) + '+',
          label: 'Subscribers',
          gradient: 'from-cyan-500 to-blue-600',
          animation: 'animate-pulse-slow'
        },
        {
          icon: Eye,
          value: formatNumber(youtubeStats.viewCount),
          label: 'Total Views',
          gradient: 'from-blue-600 to-purple-600',
          animation: 'animate-float'
        },
        {
          icon: Video,
          value: youtubeStats.videoCount,
          label: 'Videos',
          gradient: 'from-purple-600 to-orange-500',
          animation: 'animate-wiggle'
        },
        {
          icon: TrendingUp,
          value: '95%',
          label: 'Engagement Rate',
          gradient: 'from-orange-500 to-cyan-500',
          animation: 'animate-float'
        }
      ]
    : fallbackStats;

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Our Impact in Numbers
          </h2>
          <p className="text-xl text-cyan-100 max-w-2xl mx-auto">
            Real-time stats from our YouTube channel
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 text-center group"
            >
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <stat.icon size={32} className={`text-white ${stat.animation}`} />
              </div>

              <div className="text-4xl font-bold mb-2 text-white">
                {loading && !youtubeStats ? (
                  <div className="animate-pulse">...</div>
                ) : (
                  stat.value
                )}
              </div>

              <div className="text-cyan-100">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
