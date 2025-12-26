import { Video, BookOpen, Briefcase, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const Features = () => {
  const features = [
    {
      icon: Video,
      title: 'Video Tutorials',
      description: 'Learn at your own pace with high-quality video content from industry experts.',
      gradient: 'from-cyan-500 to-blue-600',
      id: 'tutorials'
    },
    {
      icon: BookOpen,
      title: 'Comprehensive Courses',
      description: 'Structured learning paths designed to take you from beginner to professional.',
      gradient: 'from-blue-600 to-purple-600',
      id: 'courses'
    },
    {
      icon: Briefcase,
      title: 'Job Updates',
      description: 'Get notified about the latest job opportunities matching your skillset.',
      gradient: 'from-purple-600 to-orange-500',
      id: 'jobs'
    },
    {
      icon: FileText,
      title: 'Expert Articles',
      description: 'Read insightful articles and stay updated with industry trends and best practices.',
      gradient: 'from-orange-500 to-cyan-500',
      id: 'articles'
    },
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Everything You Need
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            All the tools and resources to accelerate your learning journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const content = (
              <div
                key={index}
                id={feature.id}
                className="group bg-white p-8 rounded-2xl border-2 border-gray-100 hover:border-transparent hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon size={32} className="text-white" />
                </div>

                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );

            // Link Video Tutorials card to video tutorials page
            if (feature.id === 'tutorials') {
              return (
                <Link key={index} to="/video-tutorials">
                  {content}
                </Link>
              );
            }

            return content;
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
