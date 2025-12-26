import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
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

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/video-tutorials">
              <button className="group bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 flex items-center space-x-2 animate-pulse-slow">
                <span>Start Now</span>
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
