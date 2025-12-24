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
      text: 'AI Loop transformed my career! The courses are incredibly well-structured and the instructors are top-notch. I landed my dream job within 3 months of completing the Full Stack program.'
    },
    {
      name: 'Kaushal Bisht',
      role: 'Data Scientist',
      company: 'Analytics Pro',
      rating: 5,
      image: 'https://ui-avatars.com/api/?name=Kaushal+Bisht&background=6366F1&color=fff&size=200&bold=true',
      text: 'The AI & Machine Learning course exceeded all my expectations. The hands-on projects and real-world applications helped me understand complex concepts with ease. Highly recommended!'
    },
    {
      name: 'Shiwani Jha',
      role: 'Full Stack Developer',
      company: 'Digital Solutions',
      rating: 5,
      image: 'https://ui-avatars.com/api/?name=Shiwani+Jha&background=EC4899&color=fff&size=200&bold=true',
      text: 'Best investment I\'ve made in my education! The interactive learning environment and supportive community made learning enjoyable and effective. I\'m now confident in my development skills.'
    },
    {
      name: 'Anubhav Sharma',
      role: 'ML Engineer',
      company: 'AI Dynamics',
      rating: 5,
      image: 'https://ui-avatars.com/api/?name=Anubhav+Sharma&background=10B981&color=fff&size=200&bold=true',
      text: 'Outstanding platform! The curriculum is cutting-edge and the mentorship is invaluable. AI Loop helped me transition from a different field into machine learning seamlessly.'
    },
    {
      name: 'Aditya Chamoli',
      role: 'Backend Developer',
      company: 'Cloud Systems',
      rating: 5,
      image: 'https://ui-avatars.com/api/?name=Aditya+Chamoli&background=F59E0B&color=fff&size=200&bold=true',
      text: 'The quality of content and the depth of knowledge shared in the courses is exceptional. I appreciate how the courses are constantly updated with the latest industry trends.'
    },
    {
      name: 'Sagar Bisht',
      role: 'DevOps Engineer',
      company: 'Infrastructure Inc',
      rating: 5,
      image: 'https://ui-avatars.com/api/?name=Sagar+Bisht&background=EF4444&color=fff&size=200&bold=true',
      text: 'AI Loop\'s practical approach to teaching made all the difference. The projects I built during the course became key highlights in my portfolio and impressed my current employer.'
    },
    {
      name: 'Mrityunjay Joshi',
      role: 'Data Analyst',
      company: 'Insights Corp',
      rating: 5,
      image: 'https://ui-avatars.com/api/?name=Mrityunjay+Joshi&background=8B5CF6&color=fff&size=200&bold=true',
      text: 'From the comprehensive curriculum to the responsive support team, everything about AI Loop is world-class. The Data Science course gave me the skills I needed to excel in my career.'
    },
    {
      name: 'Bhumitra Nayal',
      role: 'Frontend Developer',
      company: 'Creative Digital',
      rating: 5,
      image: 'https://ui-avatars.com/api/?name=Bhumitra+Nayal&background=06B6D4&color=fff&size=200&bold=true',
      text: 'The best online learning experience I\'ve had! The interactive sessions, real-world projects, and career guidance made my learning journey smooth and rewarding. Truly life-changing!'
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
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
              What Our Students Say
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of successful learners who transformed their careers with AI Loop
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Main Slider */}
          <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="min-w-full px-8 md:px-16 py-12 md:py-16"
                >
                  <div className="flex flex-col items-center text-center">
                    {/* Quote Icon */}
                    <div className="mb-6">
                      <Quote size={48} className="text-cyan-500 opacity-30" />
                    </div>

                    {/* Profile Image */}
                    <div className="mb-6">
                      <div className="relative">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover ring-4 ring-cyan-500 ring-offset-4"
                        />
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center space-x-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className="text-yellow-400 fill-yellow-400"
                        />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl leading-relaxed italic">
                      "{testimonial.text}"
                    </p>

                    {/* Author Info */}
                    <div>
                      <h4 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-2">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-600">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
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
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentIndex === index
                    ? 'w-12 h-3 bg-gradient-to-r from-cyan-500 to-blue-600'
                    : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
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
