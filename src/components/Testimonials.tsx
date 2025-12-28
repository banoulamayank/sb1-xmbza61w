import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      name: 'Ratnam Sirsat',
      role: 'AI Engineer',
      company: 'Tech Innovations',
      rating: 5,
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      text: 'The ChatGPT and AI tutorials are incredibly detailed! The way complex AI concepts are broken down makes it so easy to understand. I\'ve implemented AI agents in my projects thanks to these videos!'
    },
    {
      name: 'Kaushal Bisht',
      role: 'Machine Learning Engineer',
      company: 'AI Research Lab',
      rating: 5,
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      text: 'These AI and ML tutorials are game-changers! The Google Gemini and image generation tool tutorials helped me understand generative AI deeply. Highly practical and industry-relevant!'
    },
    {
      name: 'Shiwani Jha',
      role: 'Gen AI Developer',
      company: 'Digital AI Solutions',
      rating: 5,
      image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      text: 'Best Gen AI tutorials ever! The video generation tools and ChatGPT deep-dives are exactly what I needed. Crystal clear explanations with real-world applications. Absolutely amazing!'
    },
    {
      name: 'Anubhav Sharma',
      role: 'AI/ML Freelancer',
      company: 'Independent Consultant',
      rating: 5,
      image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      text: 'As a freelancer, these tutorials are gold! The productivity tools and AI automation videos helped me streamline my workflow. I\'ve landed multiple Gen AI projects using what I learned here!'
    },
    {
      name: 'Aditya Chamoli',
      role: 'Computer Science Student',
      company: 'IIT Delhi',
      rating: 5,
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      text: 'These tutorials made AI accessible for students like me! The AI roadmap videos helped me chart my learning path. The explanations are beginner-friendly yet comprehensive!'
    },
    {
      name: 'Sagar Bisht',
      role: 'MLOps Engineer',
      company: 'Cloud AI Systems',
      rating: 5,
      image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      text: 'Perfect for implementing production AI systems! The tutorials on Google Gemini and ChatGPT integration are top-notch. I use these techniques daily in my MLOps work!'
    },
    {
      name: 'Mrityunjay Joshi',
      role: 'Data Science Student',
      company: 'University of Mumbai',
      rating: 5,
      image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      text: 'Amazing AI content for students! The image generation and video AI tutorials opened up a whole new world for me. The step-by-step approach is perfect for learning!'
    },
    {
      name: 'Bhumitra Nayal',
      role: 'Gen AI Specialist',
      company: 'Creative AI Studio',
      rating: 5,
      image: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      text: 'The best investment in my Gen AI journey! The Midjourney, DALL-E, and video generation tutorials are professionally made. I\'ve created stunning AI art using these techniques!'
    },
    {
      name: 'Hari Shankar',
      role: 'AI Product Manager',
      company: 'Tech Startup',
      rating: 5,
      image: 'https://images.pexels.com/photos/1933873/pexels-photo-1933873.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      text: 'Outstanding AI tutorials with practical examples! As a PM, these videos help me understand the technical aspects of AI products. The ChatGPT and Gemini comparisons are invaluable!'
    },
    {
      name: 'Priya Mehta',
      role: 'AI Research Student',
      company: 'Stanford University',
      rating: 5,
      image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      text: 'These tutorials bridge the gap between research and practical AI! The AI agents and automation videos are exactly what students need. Clear, concise, and cutting-edge content!'
    },
    {
      name: 'Vikram Singh',
      role: 'Gen AI Freelancer',
      company: 'Independent Creator',
      rating: 5,
      image: 'https://images.pexels.com/photos/2787341/pexels-photo-2787341.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      text: 'As a freelance AI developer, these tutorials are my go-to resource! The productivity and automation content saves me hours. The quality is unmatched in the Gen AI space!'
    },
    {
      name: 'Sneha Reddy',
      role: 'ML Engineering Intern',
      company: 'Microsoft',
      rating: 5,
      image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      text: 'These videos helped me land my ML internship! The Google Gemini and ChatGPT tutorials prepared me for technical interviews. The content is industry-standard and highly practical!'
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
          <Link to="/video-tutorials">
            <button className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
              Start Your Journey Today
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
