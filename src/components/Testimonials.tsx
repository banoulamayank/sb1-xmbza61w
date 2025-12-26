import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      name: 'Ratnam Sirsat',
      role: 'Software Engineer',
      company: 'Tech Innovations',
      rating: 5,
      image: 'https://ui-avatars.com/api/?name=Ratnam+Sirsat&background=0D8ABC&color=fff&size=200&bold=true',
      text: 'The video tutorials are crystal clear and easy to follow! Each concept is explained step-by-step with real coding examples. I can pause, rewind, and learn at my own pace. Absolutely love it!'
    },
    {
      name: 'Kaushal Bisht',
      role: 'Data Scientist',
      company: 'Analytics Pro',
      rating: 5,
      image: 'https://ui-avatars.com/api/?name=Kaushal+Bisht&background=6366F1&color=fff&size=200&bold=true',
      text: 'These video tutorials are a game-changer! The visual explanations make complex AI concepts so much easier to understand. The instructor\'s teaching style is engaging and practical.'
    },
    {
      name: 'Shiwani Jha',
      role: 'Full Stack Developer',
      company: 'Digital Solutions',
      rating: 5,
      image: 'https://ui-avatars.com/api/?name=Shiwani+Jha&background=EC4899&color=fff&size=200&bold=true',
      text: 'Best video tutorials I\'ve ever watched! The production quality is excellent, and the content is perfectly structured. I learned full-stack development from scratch with these videos.'
    },
    {
      name: 'Anubhav Sharma',
      role: 'ML Engineer',
      company: 'AI Dynamics',
      rating: 5,
      image: 'https://ui-avatars.com/api/?name=Anubhav+Sharma&background=10B981&color=fff&size=200&bold=true',
      text: 'The video quality and audio are top-notch! Every tutorial is well-organized with clear objectives. I appreciate how each video builds upon the previous one. Highly recommended!'
    },
    {
      name: 'Aditya Chamoli',
      role: 'Backend Developer',
      company: 'Cloud Systems',
      rating: 5,
      image: 'https://ui-avatars.com/api/?name=Aditya+Chamoli&background=F59E0B&color=fff&size=200&bold=true',
      text: 'These tutorials are incredibly detailed yet easy to digest. The instructor explains everything thoroughly with live coding sessions. I can watch and code along simultaneously!'
    },
    {
      name: 'Sagar Bisht',
      role: 'DevOps Engineer',
      company: 'Infrastructure Inc',
      rating: 5,
      image: 'https://ui-avatars.com/api/?name=Sagar+Bisht&background=EF4444&color=fff&size=200&bold=true',
      text: 'Perfect for visual learners like me! The video tutorials break down complicated topics into bite-sized, understandable chunks. The examples are practical and industry-relevant.'
    },
    {
      name: 'Mrityunjay Joshi',
      role: 'Data Analyst',
      company: 'Insights Corp',
      rating: 5,
      image: 'https://ui-avatars.com/api/?name=Mrityunjay+Joshi&background=8B5CF6&color=fff&size=200&bold=true',
      text: 'Amazing video content! The tutorials are comprehensive and the instructor\'s explanations are crystal clear. I finally understand data science concepts that seemed impossible before.'
    },
    {
      name: 'Bhumitra Nayal',
      role: 'Frontend Developer',
      company: 'Creative Digital',
      rating: 5,
      image: 'https://ui-avatars.com/api/?name=Bhumitra+Nayal&background=06B6D4&color=fff&size=200&bold=true',
      text: 'The best investment in my learning journey! These video tutorials are professionally made with excellent pacing. The real-world projects helped me build a strong portfolio.'
    },
    {
      name: 'Priya Mehta',
      role: 'UI/UX Designer',
      company: 'Design Studio',
      rating: 5,
      image: 'https://ui-avatars.com/api/?name=Priya+Mehta&background=DB2777&color=fff&size=200&bold=true',
      text: 'Outstanding video tutorials with practical examples! The visual demonstrations make learning design principles and coding so much easier. I can\'t recommend these enough!'
    }
  ];

  const itemsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === totalPages - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalPages]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalPages - 1 : prevIndex - 1
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalPages - 1 ? 0 : prevIndex + 1
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Video Tutorial Reviews
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See what our students say about our comprehensive video tutorials
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Main Slider */}
          <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl p-8 md:p-12">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {Array.from({ length: totalPages }).map((_, pageIndex) => (
                <div key={pageIndex} className="min-w-full">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials
                      .slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
                      .map((testimonial, index) => (
                        <div
                          key={index}
                          className="flex flex-col items-center text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-blue-50 hover:shadow-lg transition-shadow duration-300"
                        >
                          {/* Quote Icon */}
                          <div className="mb-4">
                            <Quote size={32} className="text-cyan-500 opacity-30" />
                          </div>

                          {/* Profile Image */}
                          <div className="mb-4">
                            <img
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="w-20 h-20 rounded-full object-cover ring-4 ring-cyan-500 ring-offset-2"
                            />
                          </div>

                          {/* Rating */}
                          <div className="flex items-center space-x-1 mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className="text-yellow-400 fill-yellow-400"
                              />
                            ))}
                          </div>

                          {/* Testimonial Text */}
                          <p className="text-sm md:text-base text-gray-700 mb-6 leading-relaxed italic flex-grow">
                            "{testimonial.text}"
                          </p>

                          {/* Author Info */}
                          <div>
                            <h4 className="text-lg font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-1">
                              {testimonial.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {testimonial.role}
                            </p>
                            <p className="text-xs text-gray-500">
                              {testimonial.company}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center items-center space-x-3 mt-8">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentIndex === index
                    ? 'w-12 h-3 bg-gradient-to-r from-cyan-500 to-blue-600'
                    : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
            Start Your Journey Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
