import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Instagram, Youtube } from 'lucide-react';
import logo from './logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Video Tutorials', href: '/video-tutorials', isRoute: true },
    { name: 'Articles', href: '/articles', isRoute: true },
    { name: 'Job Updates', href: '#jobs', isRoute: false },
    { name: 'Contact Us', href: '#contact', isRoute: false },
  ];

  return (
    <header className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link to="/" className="cursor-pointer">
              <img
                src={logo}
                alt="AI"
                className="h-36 w-auto"
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              item.isRoute ? (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-gray-700 hover:text-cyan-500 transition-colors duration-300 font-medium"
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-cyan-500 transition-colors duration-300 font-medium"
                >
                  {item.name}
                </a>
              )
            ))}
            <div className="flex items-center space-x-4">
              <a
                href="https://www.instagram.com/ailoop.co.in?igsh=YmEyNmJ0OHB1dHk%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-2 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 hover:scale-110 hover:rotate-6 transform transition-all duration-300 animate-pulse-slow shadow-lg hover:shadow-xl"
                aria-label="Instagram"
              >
                <Instagram size={20} className="text-white" />
              </a>
              <a
                href="https://www.youtube.com/@AILooop"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-2 rounded-full bg-gradient-to-br from-red-600 to-red-500 hover:scale-110 hover:-rotate-6 transform transition-all duration-300 animate-pulse-slow shadow-lg hover:shadow-xl"
                aria-label="YouTube"
              >
                <Youtube size={20} className="text-white" />
              </a>
            </div>
          </div>

          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            {navItems.map((item) => (
              item.isRoute ? (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block text-gray-700 hover:text-cyan-500 transition-colors duration-300 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-gray-700 hover:text-cyan-500 transition-colors duration-300 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              )
            ))}
            <div className="flex items-center space-x-6 pt-2">
              <a
                href="https://www.instagram.com/ailoop.co.in?igsh=YmEyNmJ0OHB1dHk%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-2 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 hover:scale-110 hover:rotate-6 transform transition-all duration-300 animate-pulse-slow shadow-lg hover:shadow-xl"
                aria-label="Instagram"
              >
                <Instagram size={24} className="text-white" />
              </a>
              <a
                href="https://www.youtube.com/@AILooop"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-2 rounded-full bg-gradient-to-br from-red-600 to-red-500 hover:scale-110 hover:-rotate-6 transform transition-all duration-300 animate-pulse-slow shadow-lg hover:shadow-xl"
                aria-label="YouTube"
              >
                <Youtube size={24} className="text-white" />
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
