import React, { useState } from 'react';
import { Video, Play, Filter } from 'lucide-react';
import { aiLoopVideos, videoCategories as importedCategories, VideoItem } from '../data/aiLoopVideos';

const VideoTutorials = () => {
  // Use categories from data file
  const categories = importedCategories;

  const [selectedCategory, setSelectedCategory] = useState('All');

  // Manual videos (kept for reference or additional videos not from AI Loop)
  const manualVideos: VideoItem[] = [
    {
      id: '1',
      title: 'ChatGPT Image Generator Model - Image 1.5 2026',
      description: 'Learn the basics of ChatGPT Image 1.5 and how to use it effectively',
      youtubeId: 'Hg6PFwBdTwg',
      category: 'Image Generation Tools',
      duration: '10:09',
    },
    {
      id: '2',
      title: 'ChatGPT AI Agents Tutorial 2026',
      description: 'Your complete guide to building ChatGPT AI Agents',
      youtubeId: 'L12PYcIcaj8',
      category: 'Productivity Tutorials',
      duration: '18:05',
    },
    {
      id: '3',
      title: 'Google Flow Tutorial 2026',
      description: 'Explore Google Flow AI capabilities and features for productivity',
      youtubeId: 'rXNCPen0Lzs',
      category: 'Video Generation Tools',
      duration: '11:50',
    },
    {
      id: '4',
      title: 'Google VEO 3.1 Tutorial 2026',
      description: 'Create AI Videos with VEO',
      youtubeId: '39W9D2j1_30',
      category: 'Video Generation Tools',
      duration: '10:54',
    },
    {
      id: '5',
      title: 'Claude OPUS 4.5, Gemini 3 Pro, or Chatgpt 5.1 2026',
      description: 'Learn Differences Between Claude OPUS 4.5, Gemini 3 Pro, or Chatgpt 5.1',
      youtubeId: 'WUXR-H9FUVw',
      category: 'ChatGPT Tutorials',
      duration: '15:06',
    },
    {
      id: '6',
      title: 'ChatGPT 5.2 Tutorial With Demo 2026',
      description: 'Explore ChatGPT 5.2 capabilities and features with Demo',
      youtubeId: '1HJAZU94OpY',
      category: 'ChatGPT Tutorials',
      duration: '12:41',
    },
    {
      id: '7',
      title: 'Gemini 3 Pro Tutorial 2026',
      description: 'Learn all about Google Gemini 3 Pro Capabilities and features',
      youtubeId: 'b7z_J50HcOw',
      category: 'Google Gemini Tutorials',
      duration: '10:37',
    },
    {
      id: '8',
      title: 'Google Firebase Studio 2026',
      description: 'Google Firebase Studio - Create Apps In Seconds',
      youtubeId: 'kAT_s86yjVw',
      category: 'Google Gemini Tutorials',
      duration: '07:06',
    },
    {
      id: '9',
      title: 'Heygen AI Video Generator 2026',
      description: 'Explore Heygen AI capabilities and features',
      youtubeId: 'S3_2VMpD_vo',
      category: 'Video Generation Tools',
      duration: '09:15',
    },
    {
      id: '10',
      title: 'New ChatGPT Apps You Must Know 2026',
      description: 'Explore ChatGPT apps for productivity',
      youtubeId: 'd9ZAsI6Cnl4',
      category: 'Productivity Tutorials',
      duration: '06:04',
    },

  {
      id: '11',
      title: 'AI Engineer Roadmap 2026',
      description: 'How To Learn AI In 2026',
      youtubeId: '9kHoWkCYOpI',
      category: 'AI Roadmap',
      duration: '07:44',
      publishedAt: '2026-01-07T11:00:00Z',
    },
    {
      id: '12',
      title: 'Google Flow Tutorial 2026',
      description: 'Explore Google Flow AI capabilities and features for productivity',
      youtubeId: 'rXNCPen0Lzs',
      category: 'Google Gemini Tutorials',
      duration: '11:50',
    },
     {
      id: '13',
      title: 'How To Create High CTR Thumbnails Using AI',
      description: 'High CTR Thumbnail Design Using Leonardo AI',
      youtubeId: 'QMw42YaosW0',
      category: 'Productivity Tutorials',
      duration: '09:09',
      publishedAt: '2026-01-07T12:00:00Z',
    },
     {
      id: '14',
      title: 'How To Create High CTR Thumbnails Using AI',
      description: 'High CTR Thumbnail Design Using Leonardo AI',
      youtubeId: 'QMw42YaosW0',
      category: 'Image Generation Tools',
      duration: '09:09',
    },
    {
      id: '15',
      title: 'Google Flow Tutorial 2026',
      description: 'Explore Google Flow AI capabilities and features for productivity',
      youtubeId: 'rXNCPen0Lzs',
      category: 'Productivity Tutorials',
      duration: '11:50',
    },
    {
      id: '16',
      title: 'AI Video generation With Hindi Audio',
      description: 'Learn how to create AI-generated videos with Hindi audio narration',
      youtubeId: '_rs1uHk82Uo',
      category: 'Video Generation Tools',
      duration: '10:00',
      publishedAt: '2026-01-16T00:00:00Z',
    },
    {
      id: '17',
      title: 'AI Video generation With Hindi Audio',
      description: 'Learn how to create AI-generated videos with Hindi audio narration',
      youtubeId: '_rs1uHk82Uo',
      category: 'Productivity Tutorials',
      duration: '10:00',
      publishedAt: '2026-01-16T00:00:00Z',
    },
    {
      id: '18',
      title: 'Build 3D Animated Website using AI',
      description: 'Learn how to create Animated website Using Google Antigravity',
      youtubeId: 'TFqQiJPX8Zw',
      category: 'Productivity Tutorials',
      duration: '14:50',
      publishedAt: '2026-01-24T00:00:00Z',
    },
    {
      id: '19',
      title: 'Build 3D Animated Website using AI',
      description: 'Learn how to create Animated website Using Google Antigravity',
      youtubeId: 'TFqQiJPX8Zw',
      category: 'Google Gemini Tutorials',
      duration: '14:50',
      publishedAt: '2026-01-24T00:00:00Z',
    },
    {
      id: '20',
      title: 'Artificial Intelligence Course | AI Tools Course',
      description: 'Learn AI In 2 Hours',
      youtubeId: 'EtDbtfahmvM',
      category: 'Productivity Tutorials',
      duration: '01:33:18',
      publishedAt: '2026-02-07T00:00:00Z',
    },
    {
      id: '21',
      title: 'AI Tool Made my Tutorial Video In Just 10 Mins',
      description: 'Create tutorials without Voiceover',
      youtubeId: 'Zxs9hOzusrU',
      category: 'Productivity Tutorials',
      duration: '09:42',
      publishedAt: '2026-02-08T00:00:00Z',
    },
    {
      id: '22',
      title: 'How To Create FREE AI Influencer',
      description: 'Create Viral AI influencer FREE',
      youtubeId: '3CqGX3ZZIa8',
      category: 'Video Generation Tools',
      duration: '08:15',
      publishedAt: '2026-02-10T00:00:00Z',
    },
    {
      id: '22',
      title: 'How To Create FREE AI Influencer',
      description: 'Create Viral AI influencer FREE',
      youtubeId: '3CqGX3ZZIa8',
      category: 'Productivity Tutorials',
      duration: '08:15',
      publishedAt: '2026-02-10T00:00:00Z',
    },
    // Add more videos as needed
  ];

  // Merge AI Loop videos with manual videos (AI Loop videos take priority)
  // Allow duplicates with different categories so same video can appear in multiple categories
  const allVideos: VideoItem[] = [...aiLoopVideos];

  // Add manual videos that are not already in AI Loop videos (same youtubeId AND category)
  manualVideos.forEach(manualVideo => {
    if (!allVideos.find(v => v.youtubeId === manualVideo.youtubeId && v.category === manualVideo.category)) {
      allVideos.push(manualVideo);
    }
  });

  // Sort all videos by publishedAt date (newest first)
  // Videos without publishedAt will appear at the end
  allVideos.sort((a, b) => {
    if (a.publishedAt && b.publishedAt) {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    }
    // Videos with publishedAt appear before those without
    if (a.publishedAt && !b.publishedAt) return -1;
    if (!a.publishedAt && b.publishedAt) return 1;
    return 0;
  });

  // Filter videos based on selected category
  // For 'All', deduplicate by youtubeId to prevent same video appearing multiple times
  // For specific categories, show all videos in that category
  const filteredVideos = selectedCategory === 'All'
    ? allVideos.filter((video, index, self) =>
        index === self.findIndex(v => v.youtubeId === video.youtubeId)
      )
    : allVideos.filter(video => video.category === selectedCategory);

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
                {/* YouTube Video Thumbnail - Click to Watch */}
                <a
                  href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative aspect-video bg-gray-900 block overflow-hidden"
                >
                  {/* YouTube Thumbnail */}
                  <img
                    src={video.thumbnail || `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      // Fallback to standard quality thumbnail if maxresdefault doesn't exist
                      e.currentTarget.src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                    }}
                  />

                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transform transition-all duration-300 shadow-2xl">
                      <Play className="w-10 h-10 text-white ml-1" fill="currentColor" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute top-3 right-3 bg-black/80 text-white px-3 py-1 rounded-lg text-sm font-medium backdrop-blur-sm">
                    {video.duration}
                  </div>

                  {/* Watch on YouTube Badge */}
                  <div className="absolute bottom-3 left-3 bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2">
                    <Play className="w-4 h-4" fill="currentColor" />
                    Watch on YouTube
                  </div>
                </a>

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
