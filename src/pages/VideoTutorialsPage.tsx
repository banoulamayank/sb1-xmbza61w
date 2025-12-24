import React, { useState } from 'react';
import { Video, Play, Filter, ArrowLeft, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface VideoItem {
  id: string;
  title: string;
  description: string;
  youtubeId: string; // YouTube video ID (the part after v= in the URL)
  category: string;
  duration: string;
  thumbnail?: string; // Optional custom thumbnail
}

const VideoTutorials = () => {
  const navigate = useNavigate();

  // Define your AI-focused video categories
  const categories = [
    'All',
    'ChatGPT Tutorials',
    'Google Gemini Tutorials',
    'AI Roadmap',
    'Video Generation Tools',
    'Image Generation Tools',
    'Productivity Tutorials'
  ];

  const [selectedCategory, setSelectedCategory] = useState('All');

  // Add your YouTube videos here
  // To get the YouTube ID: from https://www.youtube.com/watch?v=dQw4w9WgXcQ
  // the ID is: dQw4w9WgXcQ
  const videos: VideoItem[] = [
    {
      id: '1',
      title: 'ChatGPT Complete Beginner Guide',
      description: 'Master ChatGPT from scratch - Learn prompts, tips, and best practices',
      youtubeId: 'JTxsNm9IdYU', // Replace with your actual video ID
      category: 'ChatGPT Tutorials',
      duration: '15:30',
    },
    {
      id: '2',
      title: 'Advanced ChatGPT Prompt Engineering',
      description: 'Take your ChatGPT skills to the next level with advanced prompting techniques',
      youtubeId: 'jC4v5AS4RIM', // Replace with your actual video ID
      category: 'ChatGPT Tutorials',
      duration: '22:45',
    },
    {
      id: '3',
      title: 'Google Gemini AI - Complete Tutorial',
      description: 'Everything you need to know about Google Gemini AI',
      youtubeId: 'UIZAiXYceBI', // Replace with your actual video ID
      category: 'Google Gemini Tutorials',
      duration: '18:20',
    },
    {
      id: '4',
      title: 'AI Career Roadmap 2024',
      description: 'Complete roadmap to start your career in AI and Machine Learning',
      youtubeId: 'pHiMN_gy9mk', // Replace with your actual video ID
      category: 'AI Roadmap',
      duration: '25:15',
    },
    {
      id: '5',
      title: 'Create Videos with AI - Runway ML Tutorial',
      description: 'Learn how to generate stunning videos using AI-powered tools',
      youtubeId: '0CqTBT85LuI', // Replace with your actual video ID
      category: 'Video Generation Tools',
      duration: '30:00',
    },
    {
      id: '6',
      title: 'Midjourney AI Art - Complete Guide',
      description: 'Create amazing AI-generated images with Midjourney',
      youtubeId: 'F420GKjG73U', // Replace with your actual video ID
      category: 'Image Generation Tools',
      duration: '28:40',
    },
    {
      id: '7',
      title: 'AI Tools for Productivity',
      description: 'Boost your productivity with these amazing AI tools',
      youtubeId: 'SsuAi0Ro7Qo', // Replace with your actual video ID
      category: 'Productivity Tutorials',
      duration: '20:15',
    },
    {
      id: '8',
      title: 'DALL-E 3 Image Generation Tutorial',
      description: 'Master DALL-E 3 for creating professional AI images',
      youtubeId: 'GlGnl-OjJx4', // Replace with your actual video ID
      category: 'Image Generation Tools',
      duration: '17:30',
    },
    // Add more videos as needed
  ];

  // Filter videos based on selected category
  const filteredVideos = selectedCategory === 'All'
    ? videos
    : videos.filter(video => video.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Home className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-20 px-6">
        <div className="container mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Video className="w-12 h-12 text-blue-600" />
              <h1 className="text-4xl md:text-5xl font-bold">
                <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI Video Tutorials
                </span>
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master AI tools and technologies with our comprehensive video tutorials
            </p>
          </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:shadow-md hover:scale-105 border border-gray-200'
              }`}
            >
              {category === selectedCategory && <Filter className="w-4 h-4" />}
              {category}
            </button>
          ))}
        </div>

        {/* Video Count */}
        <div className="text-center mb-8">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-blue-600">{filteredVideos.length}</span> video{filteredVideos.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Video Grid */}
        {filteredVideos.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
              >
                {/* YouTube Video Embed */}
                <div className="relative aspect-video bg-gray-900">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${video.youtubeId}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  {/* Duration Badge */}
                  <div className="absolute top-3 right-3 bg-black/80 text-white px-3 py-1 rounded-lg text-sm font-medium backdrop-blur-sm">
                    {video.duration}
                  </div>
                </div>

                {/* Video Info */}
                <div className="p-6">
                  {/* Category Badge */}
                  <div className="inline-block mb-3">
                    <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-medium">
                      {video.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {video.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {video.description}
                  </p>

                  {/* Watch Button */}
                  <a
                    href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-purple-600 transition-colors group/btn"
                  >
                    <Play className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                    Watch on YouTube
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Video className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No videos found in this category</p>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default VideoTutorials;
