import { useState, useEffect, useMemo } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { aiLoopVideos, videoCategories, VideoItem } from '../data/aiLoopVideos';

const Hero = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Manual videos (same as in VideoTutorials for consistency)
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
      category: 'Productivity Tutorials',
      duration: '08:15',
      publishedAt: '2026-02-10T00:00:00Z',
    },
    {
      id: '23',
      title: 'What is Claude Opus 4.6 Actually Good at',
      description: 'Claude Opus 4.6 best model for Non Coders',
      youtubeId: '5oZctgsiY5U',
      category: 'Productivity Tutorials',
      duration: '07:35',
      publishedAt: '2026-02-11T00:00:00Z',
    },
    {
      id: '24',
      title: 'How To Create Spiritual AI Influencer FREE',
      description: 'Leaern how to create spiritual videos for free',
      youtubeId: 'o8liXmJCFyQ',
      category: 'Video Generation Tools',
      duration: '07:35',
      publishedAt: '2026-02-12T00:00:00Z',
    },
    {
      id: '25',
      title: 'High Paying AI Tools In 2026',
      description: 'Leaern about High Paying AI Tools In 2026',
      youtubeId: 'zxlj7BxdjUE',
      category: 'AI Roadmap',
      duration: '05:50',
      publishedAt: '2026-02-13T00:00:00Z',
    },
    {
      id: '26',
      title: 'How To Create Object Talking Videos',
      description: 'Create Viral Object Talking AI Videos In FREE',
      youtubeId: 'o0kNRuc1_Bg',
      category: 'Video Generation Tools',
      duration: '06:36',
      publishedAt: '2026-02-14T00:00:00Z',
    },
    {
      id: '27',
      title: 'ChatGPT images 2.0 Tutorial',
      description: 'how to use chatgpt images 2.0 in simplest way',
      youtubeId: 'LySCr-byoos',
      category: 'Image Generation Tools',
      duration: '11:18',
      publishedAt: '2026-02-15T00:00:00Z',
    },
    {
      id: '28',
      title: 'Chatgpt Use Kaise Kare',
      description: 'Chatgpt tutorial for beginners',
      youtubeId: 'RE_nt3tbdiI',
      category: 'ChatGPT Tutorials',
      duration: '09:09',
      publishedAt: '2026-02-16T00:00:00Z',
    },
    {
      id: '29',
      title: 'Image Background Remover',
      description: 'how we can change or remove image background in just one click',
      youtubeId: 'ZUFzhJvVjXQ',
      category: 'Productivity Tutorials',
      duration: '09:13',
      publishedAt: '2026-02-17T00:00:00Z',
    },
  ];

  // Get top 5 videos from ALL section (same logic as VideoTutorials ALL category)
  const latestVideos = useMemo(() => {
    // Merge AI Loop videos with manual videos (AI Loop videos take priority)
    const allVideos: VideoItem[] = [...aiLoopVideos];

    // Add manual videos that are not already in AI Loop videos (same youtubeId AND category)
    manualVideos.forEach(manualVideo => {
      if (!allVideos.find(v => v.youtubeId === manualVideo.youtubeId && v.category === manualVideo.category)) {
        allVideos.push(manualVideo);
      }
    });

    // Sort all videos by publishedAt date (newest first)
    allVideos.sort((a, b) => {
      if (a.publishedAt && b.publishedAt) {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      }
      // Videos with publishedAt appear before those without
      if (a.publishedAt && !b.publishedAt) return -1;
      if (!a.publishedAt && b.publishedAt) return 1;
      return 0;
    });

    // Deduplicate by youtubeId (same as ALL section logic)
    const uniqueVideos = allVideos.filter((video, index, self) =>
      index === self.findIndex(v => v.youtubeId === video.youtubeId)
    );

    // Return top 5 videos
    return uniqueVideos.slice(0, 5);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) =>
        prevIndex === latestVideos.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, latestVideos.length]);

  const goToPrevious = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === 0 ? latestVideos.length - 1 : prevIndex - 1
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === latestVideos.length - 1 ? 0 : prevIndex + 1
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index: number) => {
    setCurrentVideoIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="pt-48 pb-20 px-6 bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Upskill at the Speed of AI
            </span>
            <br />
          </h1>

          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Master cutting-edge technologies with tutorials, articles
            and stay updated with the latest job opportunities in tech.
          </p>

          {/* Video Slider */}
          <div className="mb-10 max-w-4xl mx-auto">
            <div className="relative">
              <a
                href={`https://www.youtube.com/watch?v=${latestVideos[currentVideoIndex].youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl group cursor-pointer"
              >
                {/* YouTube Thumbnail */}
                <img
                  src={`https://img.youtube.com/vi/${latestVideos[currentVideoIndex].youtubeId}/maxresdefault.jpg`}
                  alt={latestVideos[currentVideoIndex].title}
                  className="w-full h-full object-cover"
                />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-all duration-300">
                  <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Click to watch hint */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Click to watch on YouTube
                </div>
              </a>

              {/* Navigation Arrows */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-10"
                aria-label="Previous video"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-10"
                aria-label="Next video"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Video Title */}
            <h3 className="mt-4 text-lg font-semibold text-gray-800">
              {latestVideos[currentVideoIndex].title}
            </h3>

            {/* Dots Navigation */}
            <div className="flex justify-center items-center space-x-2 mt-4">
              {latestVideos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    currentVideoIndex === index
                      ? 'w-8 h-2 bg-gradient-to-r from-cyan-500 to-blue-600'
                      : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to video ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/video-tutorials">
              <button className="group bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 flex items-center space-x-2 animate-pulse-slow">
                <span>Learn More</span>
                <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300 animate-float" size={20} />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
