import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Youtube, Instagram } from 'lucide-react';
import logo from './logo.png';

interface NewsletterStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<NewsletterStatus>({
    type: 'idle',
    message: ''
  });

  const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || '';

  const handleNewsletterSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setStatus({
        type: 'error',
        message: 'Please enter a valid email address'
      });
      return;
    }

    if (!GOOGLE_SCRIPT_URL) {
      setStatus({
        type: 'error',
        message: 'Newsletter service not configured'
      });
      return;
    }

    setStatus({ type: 'loading', message: 'Subscribing...' });

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'newsletter',
          email: email,
          timestamp: new Date().toISOString()
        })
      });

      setStatus({
        type: 'success',
        message: 'Successfully subscribed!'
      });

      setEmail('');

      // Clear success message after 5 seconds
      setTimeout(() => {
        setStatus({ type: 'idle', message: '' });
      }, 5000);

    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to subscribe. Please try again.'
      });
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 px-6">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          <div>
            <Link to="/">
              <img
                src={logo}
                alt="AI Loop"
                className="h-24 w-auto mb-4 cursor-pointer"
              />
            </Link>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Empowering learners worldwide with cutting-edge technology education and career opportunities.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 transition-all duration-300">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 transition-all duration-300">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 transition-all duration-300">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 transition-all duration-300">
                <Youtube size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 transition-all duration-300">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/video-tutorials" className="hover:text-cyan-400 transition-colors">Video Tutorials</Link></li>
              <li><a href="#jobs" className="hover:text-cyan-400 transition-colors">Job Updates</a></li>
              <li><Link to="/articles" className="hover:text-cyan-400 transition-colors">Articles</Link></li>
              <li><a href="#contact" className="hover:text-cyan-400 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">Subscribe to get the latest updates and job opportunities.</p>
            <form onSubmit={handleNewsletterSubmit}>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status.type === 'loading'}
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-cyan-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  type="submit"
                  disabled={status.type === 'loading'}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2 rounded-r-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status.type === 'loading' ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
              {status.message && (
                <div className={`mt-3 text-sm ${
                  status.type === 'success' ? 'text-green-400' :
                  status.type === 'error' ? 'text-red-400' :
                  'text-blue-400'
                }`}>
                  {status.message}
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              &copy; 2025 AI Loop. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
