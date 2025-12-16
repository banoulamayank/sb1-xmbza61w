import { Clock, Users, Star, ArrowRight } from 'lucide-react';

const Courses = () => {
  const courses = [
    {
      title: 'AI & Machine Learning Fundamentals',
      instructor: 'Dr. Sarah Johnson',
      students: 2500,
      rating: 4.9,
      duration: '12 weeks',
      level: 'Beginner',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      title: 'Full Stack Web Development',
      instructor: 'Michael Chen',
      students: 3200,
      rating: 4.8,
      duration: '16 weeks',
      level: 'Intermediate',
      image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800',
      gradient: 'from-blue-600 to-purple-600'
    },
    {
      title: 'Data Science & Analytics',
      instructor: 'Emily Rodriguez',
      students: 1800,
      rating: 4.9,
      duration: '10 weeks',
      level: 'Advanced',
      image: 'https://images.pexels.com/photos/7887800/pexels-photo-7887800.jpeg?auto=compress&cs=tinysrgb&w=800',
      gradient: 'from-purple-600 to-orange-500'
    }
  ];

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Popular Courses
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start your learning journey with our most sought-after courses
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className={`absolute top-4 right-4 bg-gradient-to-r ${course.gradient} text-white px-4 py-1 rounded-full text-sm font-semibold`}>
                  {course.level}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-cyan-600 transition-colors">
                  {course.title}
                </h3>

                <p className="text-gray-600 mb-4">by {course.instructor}</p>

                <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Users size={16} />
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock size={16} />
                    <span>{course.duration}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-1 text-yellow-500">
                    <Star size={16} fill="currentColor" />
                    <span className="font-semibold text-gray-900">{course.rating}</span>
                  </div>

                  <button className="flex items-center space-x-1 text-cyan-600 font-semibold group-hover:space-x-2 transition-all">
                    <span>Enroll Now</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
            View All Courses
          </button>
        </div>
      </div>
    </section>
  );
};

export default Courses;
