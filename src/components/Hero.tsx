import { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Latest 5 videos
  const latestVideos = [
    {
      id: '1',
      title: 'ChatGPT Image Generator Model - Image 1.5 2026',
      youtubeId: 'Hg6PFwBdTwg',
    },
    {
      id: '2',
      title: 'Claude OPUS 4.5, Gemini 3 Pro, or Chatgpt 5.1 2026',
      youtubeId: 'WUXR-H9FUVw',
    },
    {
      id: '3',
      title: 'ChatGPT 5.2 Tutorial With Demo 2026',
      youtubeId: '1HJAZU94OpY',
    },
    {
      id: '4',
      title: 'ChatGPT AI Agents Tutorial 2026',
      youtubeId: 'L12PYcIcaj8',
    },
    {
      id: '5',
      title: 'Google Flow Tutorial 2026',
      youtubeId: 'rXNCPen0Lzs',
    },
  ];

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
            Master cutting-edge technologies with video tutorials
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
