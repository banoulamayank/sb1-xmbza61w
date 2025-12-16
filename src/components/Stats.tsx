import { TrendingUp, Award, Users, Target } from 'lucide-react';

const Stats = () => {
  const stats = [
    {
      icon: Users,
      value: '10,000+',
      label: 'Active Learners',
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      icon: Award,
      value: '500+',
      label: 'Expert Instructors',
      gradient: 'from-blue-600 to-purple-600'
    },
    {
      icon: Target,
      value: '95%',
      label: 'Completion Rate',
      gradient: 'from-purple-600 to-orange-500'
    },
    {
      icon: TrendingUp,
      value: '85%',
      label: 'Job Placement',
      gradient: 'from-orange-500 to-cyan-500'
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Our Impact in Numbers
          </h2>
          <p className="text-xl text-cyan-100 max-w-2xl mx-auto">
            Join thousands of successful learners who transformed their careers
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 text-center"
            >
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <stat.icon size={32} className="text-white" />
              </div>

              <div className="text-4xl font-bold mb-2 text-white">
                {stat.value}
              </div>

              <div className="text-cyan-100">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
