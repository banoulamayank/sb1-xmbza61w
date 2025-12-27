import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { fullArticles } from '../data/allArticles';

const MyloChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean; html?: string }>>([
    {
      text: "Hey! Welcome to AI Loop! 🎓✨\n\nI'm Mylo, your AI assistant. I can help you with:\n• Articles and resources\n• Video tutorials\n• Job updates\n• AI tools and guides\n• Career guidance\n\nWhat would you like to explore today?",
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

  const searchArticles = (query: string) => {
    const lowerQuery = query.toLowerCase();
    return fullArticles.filter(article =>
      article.title.toLowerCase().includes(lowerQuery) ||
      article.category.toLowerCase().includes(lowerQuery) ||
      article.description.toLowerCase().includes(lowerQuery) ||
      article.keywords.some(keyword => keyword.toLowerCase().includes(lowerQuery))
    );
  };

  const formatArticlesList = (articles: typeof fullArticles, searchTerm: string) => {
    if (articles.length === 0) {
      return `I couldn't find any articles about "${searchTerm}". Try browsing our Articles section to see all available content!`;
    }

    const articlesList = articles.slice(0, 5).map(article =>
      `• <a href="/articles#${article.id}" class="text-blue-600 hover:text-blue-800 underline font-medium">${article.title}</a> (${article.readTime})`
    ).join('\n');

    const total = articles.length;
    const showing = Math.min(5, total);

    return `I found ${total} article${total > 1 ? 's' : ''} about "${searchTerm}". Here ${showing > 1 ? 'are' : 'is'} ${showing === total ? 'all of them' : `the top ${showing}`}:\n\n${articlesList}${total > 5 ? `\n\nAnd ${total - 5} more! Visit the <a href="/articles" class="text-blue-600 hover:text-blue-800 underline">Articles page</a> to see all.` : ''}`;
  };

  const getAIResponse = async (userMessage: string, conversationHistory: Array<{ text: string; isUser: boolean; html?: string }>) => {
    try {
      // Build context about the website
      const websiteContext = `You are Mylo, an AI assistant for AI Loop's website. AI Loop is a platform focused on AI education and tutorials.

The website has the following sections:
1. Articles - Educational articles about AI tools, ChatGPT, Google Gemini, career growth, and AI trends
2. Video Tutorials - YouTube videos covering ChatGPT, Google Gemini, AI tools, and productivity
3. Job Updates - Latest job opportunities in tech and AI fields
4. AI Tools & Guides - Resources for learning AI technologies

You should help users by:
- Answering questions about AI and the website content
- Guiding them to relevant articles and tutorials
- Providing career advice
- Helping them find specific content
- Being friendly, concise, and helpful

Keep responses brief (2-3 sentences max unless explaining something complex).`;

      // Use OpenAI API (more accessible than Claude for most users)
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY || ''}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: websiteContext },
            ...conversationHistory.slice(-6).map(msg => ({
              role: msg.isUser ? 'user' : 'assistant',
              content: msg.text
            })),
            { role: 'user', content: userMessage }
          ],
          temperature: 0.7,
          max_tokens: 200,
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || "I'm here to help! Could you please rephrase your question?";
    } catch (error) {
      console.error('Error calling AI API:', error);
      // Fallback to intelligent static responses
      return getFallbackResponse(userMessage);
    }
  };

  const getFallbackResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();

    // Check for specific article searches (e.g., "ChatGPT articles", "Gemini tutorials")
    const searchTerms = ['chatgpt', 'gemini', 'midjourney', 'ai', 'prompt', 'sora', 'dalle', 'stable diffusion', 'leonardo'];
    for (const term of searchTerms) {
      if (lowerMessage.includes(term) && (lowerMessage.includes('article') || lowerMessage.includes('about') || lowerMessage.includes('guide'))) {
        const results = searchArticles(term);
        return formatArticlesList(results, term);
      }
    }

    if (lowerMessage.includes('article') || lowerMessage.includes('read') || lowerMessage.includes('blog')) {
      return "Check out our Articles section for insightful content on AI tools, ChatGPT, Google Gemini, and more. You can find it in the main navigation menu! Try asking me about specific topics like 'ChatGPT articles' or 'Gemini guides'.";
    }
    if (lowerMessage.includes('video') || lowerMessage.includes('tutorial') || lowerMessage.includes('watch')) {
      return "Our <a href='/video-tutorials' class='text-blue-600 hover:text-blue-800 underline'>Video Tutorials section</a> has comprehensive learning content from our AI Loop YouTube channel. Explore tutorials on ChatGPT, Google Gemini, AI tools, and more!";
    }
    if (lowerMessage.includes('job') || lowerMessage.includes('career') || lowerMessage.includes('opportunity')) {
      return "Visit our <a href='/job-updates' class='text-blue-600 hover:text-blue-800 underline'>Job Updates section</a> to find the latest career opportunities in tech and AI fields. We regularly update it with new openings!";
    }
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! I'm Mylo, your AI Loop assistant. I can help you find articles, tutorials, job updates, or answer questions about AI tools. Try asking 'Show me ChatGPT articles' or 'Find Gemini tutorials'!";
    }

    return "I can help you explore our articles, video tutorials, and job updates. Try asking me things like:<br>• 'Show me ChatGPT articles'<br>• 'Find Gemini guides'<br>• 'What articles do you have?'";
  };

  const handleSendMessage = async () => {
    if (message.trim() && !isLoading) {
      const userMessage = message.trim();
      setMessages([...messages, { text: userMessage, isUser: true }]);
      setMessage('');
      setIsLoading(true);

      try {
        const aiResponse = await getAIResponse(userMessage, messages);
        const hasHTML = aiResponse.includes('<a ') || aiResponse.includes('<br');
        setMessages(prev => [...prev, {
          text: aiResponse,
          isUser: false,
          html: hasHTML ? aiResponse : undefined
        }]);
      } catch (error) {
        setMessages(prev => [...prev, {
          text: "I'm having trouble connecting right now. Please try asking your question again!",
          isUser: false
        }]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleQuickAction = async (action: string) => {
    setMessages([...messages, { text: action, isUser: true }]);
    setIsLoading(true);

    try {
      const aiResponse = await getAIResponse(action, messages);
      const hasHTML = aiResponse.includes('<a ') || aiResponse.includes('<br');
      setMessages(prev => [...prev, {
        text: aiResponse,
        isUser: false,
        html: hasHTML ? aiResponse : undefined
      }]);
    } catch (error) {
      // Fallback responses for quick actions
      let response = '';
      let hasHTML = false;
      switch(action) {
        case 'I am looking for career growth/transition':
          response = "Great! We have resources for career growth. Check out our <a href='/articles' class='text-blue-600 hover:text-blue-800 underline'>articles</a> for career tips, <a href='/video-tutorials' class='text-blue-600 hover:text-blue-800 underline'>video tutorials</a> for skill development, and <a href='/job-updates' class='text-blue-600 hover:text-blue-800 underline'>job updates</a> for opportunities!";
          hasHTML = true;
          break;
        case 'Show me ChatGPT articles':
          const chatgptArticles = searchArticles('chatgpt');
          response = formatArticlesList(chatgptArticles, 'ChatGPT');
          hasHTML = true;
          break;
        case 'I am just exploring':
          response = "Perfect! Feel free to browse through our <a href='/articles' class='text-blue-600 hover:text-blue-800 underline'>articles</a>, <a href='/video-tutorials' class='text-blue-600 hover:text-blue-800 underline'>video tutorials</a>, and <a href='/job-updates' class='text-blue-600 hover:text-blue-800 underline'>job updates</a>. What topic interests you?";
          hasHTML = true;
          break;
        default:
          response = "I'm here to help! Let me know what you'd like to explore.";
      }
      setMessages(prev => [...prev, {
        text: response,
        isUser: false,
        html: hasHTML ? response : undefined
      }]);
    } finally {
      setIsLoading(false);
    }
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
                    {msg.html ? (
                      <div
                        className="text-sm whitespace-pre-line"
                        dangerouslySetInnerHTML={{ __html: msg.html }}
                      />
                    ) : (
                      <p className="text-sm whitespace-pre-line">{msg.text}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-sm">
                    <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                  </div>
                </div>
              )}
            </div>

            {/* Quick Action Buttons */}
            {messages.length === 1 && !isLoading && (
              <div className="px-6 py-4 space-y-2 border-t border-gray-100">
                <button
                  onClick={() => handleQuickAction('I am looking for career growth/transition')}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-full text-sm font-medium text-gray-800 hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
                >
                  I am looking for career growth/transition
                </button>
                <button
                  onClick={() => handleQuickAction('Show me ChatGPT articles')}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-full text-sm font-medium text-gray-800 hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
                >
                  Show me ChatGPT articles
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
                  onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm disabled:bg-gray-200 disabled:cursor-not-allowed"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !message.trim()}
                  className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white p-3 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
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
