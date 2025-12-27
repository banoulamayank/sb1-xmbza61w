import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const MyloChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    {
      text: "Hey! Welcome to upGrad! 🎓✨\n\nI'm Mylo, your AI assistant. I can help you with:\n• Articles and resources\n• Video tutorials\n• Job updates\n• Career guidance\n• Program information\n\nWhat would you like to explore today?",
      isUser: false
    }
  ]);

  useEffect(() => {
    // Show tooltip after 2 seconds
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);


  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, isUser: true }]);
      setMessage('');

      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, {
          text: "Thanks for your question! I'm here to help you navigate our website. You can explore our articles, tutorials, and job updates. What specific topic interests you?",
          isUser: false
        }]);
      }, 1000);
    }
  };

  const handleQuickAction = (action: string) => {
    setMessages([...messages, { text: action, isUser: true }]);

    setTimeout(() => {
      let response = '';
      switch(action) {
        case 'I am looking for career growth/transition':
          response = "Great! We have comprehensive resources for career growth. Check out our articles section for career tips, our video tutorials for skill development, and job updates for opportunities. Which area would you like to explore first?";
          break;
        case 'Learn about upGrad programs':
          response = "We offer programs from top universities like Liverpool John Moores, Golden Gate, IIIT-B, IMT, MICA, Jindal Global, and many more. Our programs cover various domains to help you upskill. Would you like to know about any specific domain?";
          break;
        case 'I am just exploring':
          response = "Perfect! Feel free to browse through our articles for insights, video tutorials for learning, and job updates for opportunities. Is there anything specific you'd like to know about?";
          break;
        default:
          response = "I'm here to help! Let me know what you'd like to explore.";
      }
      setMessages(prev => [...prev, { text: response, isUser: false }]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-40">
        {/* Tooltip */}
        {showTooltip && !isOpen && (
          <div className="absolute bottom-20 right-0 bg-white shadow-lg rounded-2xl px-4 py-3 mb-2 animate-pulse-slow">
            <div className="text-sm font-medium text-gray-800 whitespace-nowrap">
              Ask your doubts to Mylo 💬
            </div>
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white transform rotate-45"></div>
          </div>
        )}

        {/* Chat Button */}
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setShowTooltip(false);
          }}
          className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-cyan-500/50 transform hover:scale-110 transition-all duration-300 animate-float"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>

      {/* Chat Popup */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 md:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] md:w-[400px]">
          <div className="bg-white rounded-3xl shadow-2xl h-[500px] md:h-[550px] flex flex-col overflow-hidden transform transition-all duration-300">
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white px-6 py-4 flex items-center justify-between rounded-t-3xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Mylo</h3>
                  <p className="text-xs text-white/90">We are online!</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* New Messages Badge */}
            <div className="px-6 py-3 border-b border-gray-100">
              <p className="text-sm font-semibold text-center bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                New Messages
              </p>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                      msg.isUser
                        ? 'bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white rounded-br-sm'
                        : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Action Buttons */}
            {messages.length === 1 && (
              <div className="px-6 py-4 space-y-2 border-t border-gray-100">
                <button
                  onClick={() => handleQuickAction('I am looking for career growth/transition')}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-full text-sm font-medium text-gray-800 hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
                >
                  I am looking for career growth/transition
                </button>
                <button
                  onClick={() => handleQuickAction('Learn about upGrad programs')}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-full text-sm font-medium text-gray-800 hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
                >
                  Learn about upGrad programs
                </button>
                <button
                  onClick={() => handleQuickAction('I am just exploring')}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-full text-sm font-medium text-gray-800 hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
                >
                  I am just exploring
                </button>
              </div>
            )}

            {/* Message Input */}
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-3xl">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white p-3 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyloChatbot;
