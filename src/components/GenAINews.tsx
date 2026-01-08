import { useState, useEffect } from 'react';
import { Calendar, ExternalLink, TrendingUp, Sparkles, Brain, Loader2, RefreshCw } from 'lucide-react';

interface NewsArticle {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  source: string;
  category: string;
  image?: string;
}

const GenAINews = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch news from multiple RSS feeds
  const fetchNews = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      // Check cache first (cache for 30 minutes)
      const cacheKey = 'genai_news_cache';
      const cacheTimeKey = 'genai_news_cache_time';
      const cachedData = localStorage.getItem(cacheKey);
      const cacheTime = localStorage.getItem(cacheTimeKey);

      if (!isRefresh && cachedData && cacheTime) {
        const timeDiff = Date.now() - parseInt(cacheTime);
        if (timeDiff < 30 * 60 * 1000) { // 30 minutes
          setNews(JSON.parse(cachedData));
          setLoading(false);
          return;
        }
      }

      // Fetch from multiple sources
      const searchTopics = [
        { query: 'generative AI', category: 'Generative AI' },
        { query: 'artificial intelligence machine learning', category: 'Machine Learning' },
        { query: 'AI tools ChatGPT', category: 'AI Tools' },
        { query: 'AI research breakthrough', category: 'Research' },
        { query: 'AI industry news technology', category: 'Industry News' }
      ];

      const allArticles: NewsArticle[] = [];

      // Using Google News RSS with rss2json API
      for (const topic of searchTopics) {
        try {
          const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(topic.query)}&hl=en-US&gl=US&ceid=US:en`;
          const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}&api_key=YOUR_API_KEY&count=10`;

          // Alternative: use AllOrigins CORS proxy
          const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`;

          const response = await fetch(proxyUrl);
          const data = await response.json();

          if (data.contents) {
            // Parse XML manually
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data.contents, 'text/xml');
            const items = xmlDoc.querySelectorAll('item');

            items.forEach((item, index) => {
              if (index < 6) { // Limit to 6 articles per topic
                const title = item.querySelector('title')?.textContent || '';
                const link = item.querySelector('link')?.textContent || '';
                const pubDate = item.querySelector('pubDate')?.textContent || '';
                const descriptionRaw = item.querySelector('description')?.textContent || '';
                const description = descriptionRaw.replace(/<[^>]*>/g, '');
                const source = item.querySelector('source')?.textContent || 'Google News';

                // Try to extract image from various sources
                let image = '';

                // Try media:content tag
                const mediaContent = item.querySelector('content, media\\:content');
                if (mediaContent) {
                  image = mediaContent.getAttribute('url') || '';
                }

                // Try enclosure tag
                if (!image) {
                  const enclosure = item.querySelector('enclosure');
                  if (enclosure && enclosure.getAttribute('type')?.startsWith('image/')) {
                    image = enclosure.getAttribute('url') || '';
                  }
                }

                // Try to extract image from description HTML
                if (!image && descriptionRaw.includes('<img')) {
                  const imgMatch = descriptionRaw.match(/<img[^>]+src="([^">]+)"/);
                  if (imgMatch && imgMatch[1]) {
                    image = imgMatch[1];
                  }
                }

                // Fallback to curated AI images
                if (!image) {
                  const fallbackImages = [
                    'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
                    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=300&fit=crop',
                    'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop',
                    'https://images.unsplash.com/photo-1655635643532-fa9ba2648cbe?w=400&h=300&fit=crop',
                    'https://images.unsplash.com/photo-1676277791608-ac5a0b5f6f8a?w=400&h=300&fit=crop',
                    'https://images.unsplash.com/photo-1686191128892-c49b930e8389?w=400&h=300&fit=crop',
                    'https://images.unsplash.com/photo-1655721531369-3a0f4b7c0c4c?w=400&h=300&fit=crop',
                    'https://images.unsplash.com/photo-1675557009806-8a396f64c9e7?w=400&h=300&fit=crop'
                  ];
                  image = fallbackImages[allArticles.length % fallbackImages.length];
                }

                allArticles.push({
                  title,
                  description: description.substring(0, 200) + '...',
                  link,
                  pubDate,
                  source,
                  category: topic.category,
                  image
                });
              }
            });
          }
        } catch (err) {
          console.error(`Error fetching ${topic.query}:`, err);
        }
      }

      // Sort by date (newest first)
      allArticles.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

      // Get existing cached news to merge with new articles
      const existingCachedData = localStorage.getItem(cacheKey);
      let existingArticles: NewsArticle[] = [];
      if (existingCachedData) {
        try {
          existingArticles = JSON.parse(existingCachedData);
        } catch (e) {
          console.error('Error parsing cached data:', e);
        }
      }

      // Merge existing articles with new ones, removing duplicates by link
      const mergedArticles = [...existingArticles, ...allArticles];
      const uniqueArticles = mergedArticles.filter((article, index, self) =>
        index === self.findIndex((a) => a.link === article.link)
      );

      // Sort merged articles by date (newest first)
      uniqueArticles.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

      // Filter to show only articles from the last 7 days
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const recentArticles = uniqueArticles.filter(article => {
        const articleDate = new Date(article.pubDate);
        return articleDate >= sevenDaysAgo;
      });

      // Cache the results
      localStorage.setItem(cacheKey, JSON.stringify(recentArticles));
      localStorage.setItem(cacheTimeKey, Date.now().toString());

      setNews(recentArticles);
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('Failed to fetch news. Please try again later.');

      // Load cached data as fallback
      const cachedData = localStorage.getItem('genai_news_cache');
      if (cachedData) {
        setNews(JSON.parse(cachedData));
        setError('Showing cached news. Unable to fetch latest updates.');
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHrs / 24);

    if (diffHrs < 1) return 'Just now';
    if (diffHrs < 24) return `${diffHrs} hour${diffHrs > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Get category color
  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Generative AI': 'from-purple-500 to-pink-500',
      'Machine Learning': 'from-blue-500 to-cyan-500',
      'AI Tools': 'from-green-500 to-emerald-500',
      'Research': 'from-orange-500 to-red-500',
      'Industry News': 'from-indigo-500 to-purple-500'
    };
    return colors[category] || 'from-gray-500 to-gray-600';
  };

  // Update document title for SEO
  useEffect(() => {
    document.title = 'Gen AI Latest News - AI Loop | Breaking AI & Machine Learning Updates';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Stay updated with the latest Generative AI, Machine Learning, and Artificial Intelligence news. Real-time updates on AI breakthroughs, tools, research, and industry developments.');
    }
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 py-20">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl animate-pulse-slow">
                  <Brain size={48} className="text-white" />
                </div>
                <Sparkles size={32} className="text-yellow-300 animate-spin-slow" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-center text-white mb-4">
              Gen AI Latest News
            </h1>
            <p className="text-xl text-center text-white/90 max-w-3xl mx-auto">
              Stay ahead with real-time updates on Generative AI, Machine Learning, and cutting-edge AI technology
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-12">
          {/* Refresh Button */}
          <div className="flex justify-end mb-8">
            <button
              onClick={() => fetchNews(true)}
              disabled={refreshing}
              className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50"
            >
              <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
              <span>{refreshing ? 'Refreshing...' : 'Refresh News'}</span>
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-8 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded-lg">
              <p className="font-medium">{error}</p>
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 size={48} className="animate-spin text-blue-600 mb-4" />
              <p className="text-gray-600 text-lg">Fetching latest AI news...</p>
            </div>
          ) : (
            <>
              {/* Results Count */}
              <div className="mb-6 flex items-center space-x-2">
                <TrendingUp className="text-blue-600" size={20} />
                <p className="text-gray-700 font-medium">
                  {news.length} {news.length === 1 ? 'article' : 'articles'} found
                </p>
              </div>

              {/* News Grid */}
              {news.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-gray-500 text-lg">No news articles found. Please try refreshing.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {news.map((article, index) => (
                    <article
                      key={index}
                      className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                    >
                      {/* Article Image */}
                      <div className="relative h-48 bg-gradient-to-br from-cyan-400 to-purple-500 overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%2306b6d4"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="48" fill="white"%3EAI%3C/text%3E%3C/svg%3E';
                          }}
                        />
                        {/* Category Badge */}
                        <div className="absolute top-4 right-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getCategoryColor(article.category)} shadow-lg`}>
                            {article.category}
                          </span>
                        </div>
                      </div>

                      {/* Article Content */}
                      <div className="p-6">
                        {/* Meta Info */}
                        <div className="flex items-center justify-between mb-3 text-sm text-gray-500">
                          <div className="flex items-center space-x-2">
                            <Calendar size={14} />
                            <span>{formatDate(article.pubDate)}</span>
                          </div>
                          <span className="font-medium text-blue-600">{article.source}</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                          {article.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {article.description}
                        </p>

                        {/* Read More Link */}
                        <a
                          href={article.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 text-blue-600 font-semibold hover:text-purple-600 transition-colors duration-300"
                        >
                          <span>Read Full Article</span>
                          <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Auto-refresh Info */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm">
              News updates automatically every 30 minutes • Last updated: {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default GenAINews;
