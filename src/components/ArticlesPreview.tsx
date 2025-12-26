import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, ArrowRight } from 'lucide-react';

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

// Featured articles for home page preview
const featuredArticles: ArticleItem[] = [
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
    id: '10',
    title: 'Midjourney vs DALL-E 3: Ultimate Comparison',
    description: 'Detailed comparison of the leading AI image generation platforms',
    category: 'Image Generation Tools',
    type: 'Article',
    date: 'Dec 24, 2025',
    thumbnail: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&auto=format&fit=crop',
    readTime: '10 min read'
  },
];

const ArticlesPreview = () => {
  const [imageErrors, setImageErrors] = React.useState<{ [key: string]: boolean }>({});
  const [imageLoaded, setImageLoaded] = React.useState<{ [key: string]: boolean }>({});

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

  const handleImageError = (articleId: string) => {
    setImageErrors(prev => ({ ...prev, [articleId]: true }));
  };

  const handleImageLoad = (articleId: string) => {
    setImageLoaded(prev => ({ ...prev, [articleId]: true }));
  };

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">
              Latest Articles
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Expert insights, tutorials, and guides to help you master AI and technology
          </p>
          <Link
            to="/articles"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 font-medium"
          >
            View All Articles
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {featuredArticles.map((article) => (
            <Link
              key={article.id}
              to="/articles"
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600">
                {!imageErrors[article.id] ? (
                  <>
                    {!imageLoaded[article.id] && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-white text-4xl font-bold opacity-30">
                          {article.category.charAt(0)}
                        </div>
                      </div>
                    )}
                    <img
                      src={article.thumbnail}
                      alt={article.title}
                      className={`w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300 ${imageLoaded[article.id] ? 'opacity-100' : 'opacity-0'}`}
                      onLoad={() => handleImageLoad(article.id)}
                      onError={() => handleImageError(article.id)}
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
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeStyles(article.type)}`}>
                    {article.type}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    {article.date}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {article.description}
                </p>
                {article.readTime && (
                  <div className="flex items-center text-sm text-gray-500">
                    <BookOpen className="w-4 h-4 mr-1" />
                    {article.readTime}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticlesPreview;
