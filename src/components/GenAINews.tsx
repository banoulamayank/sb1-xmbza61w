import { useState, useEffect } from 'react';
import { Search, Calendar, ExternalLink, TrendingUp, Sparkles, Brain, Loader2, RefreshCw } from 'lucide-react';

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
  const [filteredNews, setFilteredNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [refreshing, setRefreshing] = useState(false);

  const categories = ['All', 'Generative AI', 'Machine Learning', 'AI Tools', 'Research', 'Industry News'];

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
          setFilteredNews(JSON.parse(cachedData));
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
                const description = item.querySelector('description')?.textContent?.replace(/<[^>]*>/g, '') || '';
                const source = item.querySelector('source')?.textContent || 'Google News';

                allArticles.push({
                  title,
                  description: description.substring(0, 200) + '...',
                  link,
                  pubDate,
                  source,
                  category: topic.category,
                  image: `https://source.unsplash.com/400x300/?artificial-intelligence,technology,${topic.query.replace(' ', ',')}`
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

      // Filter to show only articles from the last 7 days
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const recentArticles = allArticles.filter(article => {
        const articleDate = new Date(article.pubDate);
        return articleDate >= sevenDaysAgo;
      });

      // Cache the results
      localStorage.setItem(cacheKey, JSON.stringify(recentArticles));
      localStorage.setItem(cacheTimeKey, Date.now().toString());

      setNews(recentArticles);
      setFilteredNews(recentArticles);
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('Failed to fetch news. Please try again later.');

      // Load cached data as fallback
      const cachedData = localStorage.getItem('genai_news_cache');
      if (cachedData) {
        setNews(JSON.parse(cachedData));
        setFilteredNews(JSON.parse(cachedData));
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

  // Filter news based on search and category
  useEffect(() => {
    let filtered = news;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredNews(filtered);
  }, [searchQuery, selectedCategory, news]);

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
            <p className="text-xl text-center text-white/90 max-w-3xl mx-auto mb-8">
              Stay ahead with real-time updates on Generative AI, Machine Learning, and cutting-edge AI technology
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search AI news..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-white/30 bg-white/20 backdrop-blur-sm text-white placeholder-white/70 focus:outline-none focus:border-white/50 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-12">
          {/* Category Filter & Refresh */}
          <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
            <div className="flex flex-wrap gap-3">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg scale-105'
                      : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
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
                  {filteredNews.length} {filteredNews.length === 1 ? 'article' : 'articles'} found
                </p>
              </div>

              {/* News Grid */}
              {filteredNews.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-gray-500 text-lg">No news articles found. Try adjusting your filters.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredNews.map((article, index) => (
                    <article
                      key={index}
                      className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                    >
                      {/* Article Image */}
                      <div className="relative h-48 bg-gradient-to-br from-cyan-400 to-purple-500 overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
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
