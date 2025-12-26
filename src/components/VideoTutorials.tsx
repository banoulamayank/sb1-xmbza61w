import React, { useState } from 'react';
import { Video, Play, Filter } from 'lucide-react';

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
  // Define your video categories
  const categories = ['All', 'ChatGPT Tutorials', 'Google Gemini Tutorials', 'AI Roadmap', 'Video Generation Tools', 'Image Generation Tools', 'Productivity Tutorials'];

  const [selectedCategory, setSelectedCategory] = useState('All');

  // Add your YouTube videos here
  // To get the YouTube ID: from https://www.youtube.com/watch?v=dQw4w9WgXcQ
  // the ID is: dQw4w9WgXcQ
  const videos: VideoItem[] = [
    {
      id: '1',
      title: 'ChatGPT Image Generator Model - Image 1.5 2026',
      description: 'Learn the basics of ChatGPT Image 1.5 and how to use it effectively',
      youtubeId: 'Hg6PFwBdTwg', // Replace with your actual video ID
      category: 'ChatGPT Tutorials',
      duration: '10:09',
    },
    {
      id: '2',
      title: 'Claude OPUS 4.5, Gemini 3 Pro, or Chatgpt 5.1 2026',
      description: 'Learn Differences Between Claude OPUS 4.5, Gemini 3 Pro, or Chatgpt 5.1',
      youtubeId: 'WUXR-H9FUVw', // Replace with your actual video ID
      category: 'ChatGPT Tutorials',
      duration: '15:06',
    },
    {
      id: '3',
      title: 'ChatGPT 5.2 Tutorial With Demo 2026',
      description: 'Explore ChatGPT 5.2 capabilities and features with Demo',
      youtubeId: '1HJAZU94OpY', // Replace with your actual video ID
      category: 'ChatGPT Tutorials',
      duration: '12:41',
    },
    {
      id: '4',
      title: 'ChatGPT AI Agents Tutorial 2026',
      description: 'Your complete guide to building ChatGPT AI Agents',
      youtubeId: 'L12PYcIcaj8', // Replace with your actual video ID
      category: 'ChatGPT Tutorials',
      duration: '18:05',
    },
    {
      id: '5',
      title: 'Google Flow Tutorial 2026',
      description: 'Explore Google Flow AI capabilities and features',
      youtubeId: 'rXNCPen0Lzs', // Replace with your actual video ID
      category: 'Google Gemini Tutorials',
      duration: '11:50',
    },
    {
      id: '6',
      title: 'Gemini 3 Pro Tutorial 2026',
      description: 'Learn ALl about Google Gemini 3 Pro Capabilities and features.',
      youtubeId: 'b7z_J50HcOw', // Replace with your actual video ID
      category: 'Google Gemini Tutorials',
      duration: '10:37',
    },
    {
      id: '7',
      title: 'Google VEO 3.1 Tutorial 2026',
      description: 'Create AI Videos with VEO',
      youtubeId: '39W9D2j1_30', // Replace with your actual video ID
      category: 'Google Gemini Tutorials',
      duration: '10:54',
    },
    {
      id: '8',
      title: 'Gogle Firebase Studio 2026',
      description: 'Google's Firebase Studio - Create Apps In Seconds',
      youtubeId: 'kAT_s86yjVw', // Replace with your actual video ID
      category: 'Google Gemini Tutorials',
      duration: '07:06',
    },
    {
      id: '9',
      title: 'Google VEO 3.1 Tutorial 2026',
      description: 'Create AI Videos with VEO',
      youtubeId: '39W9D2j1_30', // Replace with your actual video ID
      category: 'Video Generation Tools',
      duration: '10:54',
    },
    {
      id: '10',
      title: 'Google Flow Tutorial 2026',
      description: 'Explore Google Flow AI capabilities and features',
      youtubeId: 'rXNCPen0Lzs', // Replace with your actual video ID
      category: 'Video Generation Tools',
      duration: '11:50',
    },
    {
      id: '11',
      title: 'Boost Your Productivity with AI',
      description: 'Leverage AI tools to enhance your workflow and efficiency',
      youtubeId: 'ahCwqrYpIuM', // Replace with your actual video ID
      category: 'Productivity Tutorials',
      duration: '20:15',
    },
    // Add more videos as needed
  ];

  // Filter videos based on selected category
  const filteredVideos = selectedCategory === 'All'
    ? videos
    : videos.filter(video => video.category === selectedCategory);

  return (
    <section id="tutorials" className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Video className="w-12 h-12 text-blue-600" />
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Video Tutorials
              </span>
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn at your own pace with our comprehensive video tutorials covering various topics
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
    </section>
  );
};

export default VideoTutorials;
