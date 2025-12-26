import React, { useState } from 'react';
import { BookOpen, Calendar } from 'lucide-react';

interface ArticleItem {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'Article' | 'Ebook' | 'Guide';
  date: string;
  thumbnail: string;
  readTime?: string;
}

// Sample articles data with categories matching video tutorials
const articlesData: ArticleItem[] = [
  // ChatGPT Articles
  {
    id: '1',
    title: 'ChatGPT Prompt Engineering: Complete Guide',
    description: 'Master the art of prompt engineering to get the best results from ChatGPT',
    category: 'ChatGPT Articles',
    type: 'Guide',
    date: 'Dec 20, 2025',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop',
    readTime: '10 min read'
  },
  {
    id: '2',
    title: 'Advanced ChatGPT Techniques for Developers',
    description: 'Learn advanced techniques to integrate ChatGPT into your development workflow',
    category: 'ChatGPT Articles',
    type: 'Article',
    date: 'Dec 18, 2025',
    thumbnail: 'https://images.unsplash.com/photo-1676277791608-ac5cf6d5e60c?w=800&auto=format&fit=crop',
    readTime: '8 min read'
  },
  {
    id: '3',
    title: 'ChatGPT API Integration Best Practices',
    description: 'Best practices for integrating ChatGPT API in production applications',
    category: 'ChatGPT Articles',
    type: 'Article',
    date: 'Dec 15, 2025',
    thumbnail: 'https://images.unsplash.com/photo-1675271591293-9b2f078e5c0e?w=800&auto=format&fit=crop',
    readTime: '12 min read'
  },

  // Google Gemini Articles
  {
    id: '4',
    title: 'Getting Started with Google Gemini AI',
    description: 'A comprehensive guide to understanding and using Google Gemini AI',
    category: 'Google Gemini Articles',
    type: 'Guide',
    date: 'Dec 22, 2025',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop',
    readTime: '15 min read'
  },
  {
    id: '5',
    title: 'Gemini Pro vs ChatGPT: Detailed Comparison',
    description: 'In-depth comparison of capabilities, features, and use cases',
    category: 'Google Gemini Articles',
    type: 'Article',
    date: 'Dec 19, 2025',
    thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop',
    readTime: '10 min read'
  },

  // AI Roadmap Articles
  {
    id: '6',
    title: 'AI Learning Roadmap 2026: Complete Guide',
    description: 'Step-by-step roadmap to become an AI expert in 2026',
    category: 'AI Roadmap',
    type: 'Ebook',
    date: 'Dec 25, 2025',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop',
    readTime: '20 min read'
  },
  {
    id: '7',
    title: 'Machine Learning Career Path in 2026',
    description: 'Navigate your career path in machine learning and AI',
    category: 'AI Roadmap',
    type: 'Guide',
    date: 'Dec 21, 2025',
    thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop',
    readTime: '12 min read'
  },

  // Video Generation Tools Articles
  {
    id: '8',
    title: 'Top AI Video Generation Tools in 2026',
    description: 'Comprehensive review of the best AI video generation tools available',
    category: 'Video Generation Tools',
    type: 'Article',
    date: 'Dec 23, 2025',
    thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop',
    readTime: '8 min read'
  },
  {
    id: '9',
    title: 'Creating Professional Videos with AI',
    description: 'Learn how to create professional-quality videos using AI tools',
    category: 'Video Generation Tools',
    type: 'Guide',
    date: 'Dec 17, 2025',
    thumbnail: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&auto=format&fit=crop',
    readTime: '15 min read'
  },

  // Image Generation Tools Articles
  {
    id: '10',
    title: 'Midjourney vs DALL-E 3: Ultimate Comparison',
    description: 'Detailed comparison of the leading AI image generation platforms',
    category: 'Image Generation Tools',
    type: 'Article',
    date: 'Dec 24, 2025',
    thumbnail: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&auto=format&fit=crop',
    readTime: '10 min read'
  },
  {
    id: '11',
    title: 'AI Image Generation: Best Practices Guide',
    description: 'Master the art of creating stunning images with AI tools',
    category: 'Image Generation Tools',
    type: 'Guide',
    date: 'Dec 16, 2025',
    thumbnail: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=800&auto=format&fit=crop',
    readTime: '12 min read'
  },

  // Productivity Articles
  {
    id: '12',
    title: 'AI Tools to 10x Your Productivity in 2026',
    description: 'Discover AI tools that can dramatically boost your productivity',
    category: 'Productivity Articles',
    type: 'Article',
    date: 'Dec 26, 2025',
    thumbnail: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&auto=format&fit=crop',
    readTime: '8 min read'
  },
  {
    id: '13',
    title: 'Automating Workflows with AI: Complete Guide',
    description: 'Learn how to automate repetitive tasks using AI-powered tools',
    category: 'Productivity Articles',
    type: 'Ebook',
    date: 'Dec 14, 2025',
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop',
    readTime: '18 min read'
  },
];

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

  const filteredArticles = selectedCategory === 'All'
    ? articlesData
    : articlesData.filter(article => article.category === selectedCategory);

  const getArticleCountByCategory = (category: string) => {
    if (category === 'All') return articlesData.length;
    return articlesData.filter(article => article.category === category).length;
  };

  const getCategoryArticles = (category: string) => {
    return articlesData.filter(article => article.category === category);
  };

  const getTypeStyles = (type: ArticleItem['type']) => {
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

  const ArticleCard = ({ article }: { article: ArticleItem }) => (
    <div className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img
          src={article.thumbnail}
          alt={article.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
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
        {article.readTime && (
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <BookOpen className="w-4 h-4 mr-1" />
            {article.readTime}
          </div>
        )}
      </div>
    </div>
  );

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
    </div>
  );
}
