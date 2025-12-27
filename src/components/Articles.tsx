import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, Eye } from 'lucide-react';
import ArticleModal from './ArticleModal';
import { fullArticles, FullArticle } from '../data/allArticles';

const categories = [
  'All',
  'ChatGPT Articles',
  'Google Gemini Articles',
  'AI Roadmap',
  'Video Generation Tools',
  'Image Generation Tools',
  'Productivity Articles',
];

export default function Articles() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState<FullArticle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredArticles = selectedCategory === 'All'
    ? fullArticles
    : fullArticles.filter(article => article.category === selectedCategory);

  const getArticleCountByCategory = (category: string) => {
    if (category === 'All') return fullArticles.length;
    return fullArticles.filter(article => article.category === category).length;
  };

  const getCategoryArticles = (category: string) => {
    return fullArticles.filter(article => article.category === category);
  };

  const getTypeStyles = (type: FullArticle['type']) => {
    switch (type) {
      case 'Article':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'Ebook':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'Guide':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const handleArticleClick = (article: FullArticle) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedArticle(null), 300);
  };

  const ArticleCard = ({ article }: { article: FullArticle }) => {
    const [imageError, setImageError] = React.useState(false);
    const [imageLoaded, setImageLoaded] = React.useState(false);
    const [currentViews, setCurrentViews] = React.useState(article.views);

    // Simulate real-time view counter
    useEffect(() => {
      const interval = setInterval(() => {
        // Randomly increment views by 0-2 every 3-8 seconds
        if (Math.random() > 0.5) {
          const increment = Math.floor(Math.random() * 3);
          setCurrentViews(prev => prev + increment);
        }
      }, Math.random() * 5000 + 3000);

      return () => clearInterval(interval);
    }, []);

    return (
      <div
        className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
        onClick={() => handleArticleClick(article)}
      >
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600">
          {!imageError ? (
            <>
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-4xl font-bold opacity-30">
                    {article.category.charAt(0)}
                  </div>
                </div>
              )}
              <img
                src={article.thumbnail}
                alt={article.title}
                className={`w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                loading="lazy"
              />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600">
              <div className="text-center text-white p-6">
                <div className="text-5xl font-bold mb-2 opacity-90">
                  {article.category.split(' ').map(word => word.charAt(0)).join('')}
                </div>
                <div className="text-sm opacity-75 font-medium">
                  {article.type}
                </div>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4">
            <button className="w-full py-2 px-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg font-semibold text-gray-900 dark:text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-y-0 translate-y-2">
              Read Full Article
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeStyles(article.type)}`}>
              {article.type}
            </span>
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
              <Calendar className="w-4 h-4 mr-1" />
              {article.date}
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {article.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
            {article.description}
          </p>
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            {article.readTime && (
              <div className="flex items-center">
                <BookOpen className="w-4 h-4 mr-1" />
                {article.readTime}
              </div>
            )}
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              <span className="font-medium">{currentViews.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Categories */}
          <aside className="lg:w-80">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Categories
              </h2>
              <nav className="space-y-2">
                {categories.map((category) => {
                  const count = getArticleCountByCategory(category);
                  const isActive = selectedCategory === category;

                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{category}</span>
                        <span className={`text-sm px-2 py-1 rounded-full ${
                          isActive
                            ? 'bg-white/20'
                            : 'bg-gray-200 dark:bg-gray-600'
                        }`}>
                          {count}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content - Articles */}
          <main className="flex-1">
            {selectedCategory === 'All' ? (
              // Show articles grouped by category
              <div className="space-y-12">
                {categories.slice(1).map((category) => {
                  const categoryArticles = getCategoryArticles(category);

                  if (categoryArticles.length === 0) return null;

                  return (
                    <section key={category}>
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                            {category}
                          </h2>
                          <p className="text-gray-500 dark:text-gray-400 mt-1">
                            ({categoryArticles.length})
                          </p>
                        </div>
                        <button
                          onClick={() => setSelectedCategory(category)}
                          className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                        >
                          VIEW ALL
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categoryArticles.slice(0, 3).map((article) => (
                          <ArticleCard key={article.id} article={article} />
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>
            ) : (
              // Show filtered articles for selected category
              <div>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {selectedCategory}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Article Modal */}
      <ArticleModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        article={selectedArticle}
      />
    </div>
  );
}
