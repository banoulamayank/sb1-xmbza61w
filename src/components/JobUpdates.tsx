import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, Clock, DollarSign, Building2, ExternalLink, Loader2 } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary?: string;
  postedDate: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  category: string;
  applicationUrl?: string;
}

const categories = ['All Jobs', 'Technology', 'Marketing', 'Sales', 'Design', 'Management', 'Content'];

// Google Sheets Configuration
// To use real-time data from Google Sheets:
// 1. Create a Google Sheet with your job data
// 2. Go to File > Share > Publish to web > Choose "Comma-separated values (.csv)"
// 3. Copy the URL and replace GOOGLE_SHEETS_CSV_URL below
// 4. Or use Google Sheets API (see README-JOBS.md for detailed instructions)

const GOOGLE_SHEETS_CSV_URL = ''; // Add your published Google Sheets CSV URL here

// Alternative: Use Google Sheets API with a public sheet
// Format: https://sheets.googleapis.com/v4/spreadsheets/{SPREADSHEET_ID}/values/{RANGE}?key={API_KEY}
const GOOGLE_SHEETS_API_URL = ''; // Add your Google Sheets API URL here

// Sample jobs data - used as fallback when no real-time data is available
const sampleJobs: Job[] = [
  {
    id: '1',
    title: 'Product Marketing Manager',
    company: 'AAFT',
    location: 'Noida, Uttar Pradesh, India',
    type: 'Full-time',
    salary: '₹8-12 LPA',
    postedDate: '4 days ago',
    category: 'Marketing',
    description: 'We are looking for an experienced Product Marketing Manager to join our team. You will be responsible for developing and executing marketing strategies for our educational programs.',
    requirements: [
      '5+ years of experience in product marketing',
      'Strong understanding of digital marketing',
      'Excellent communication skills',
      'Experience in the education sector is a plus'
    ],
    responsibilities: [
      'Define and execute brand messaging and positioning',
      'Map and articulate Points of Parity (POPs) and Points of Difference (PODs)',
      'Create and maintain feature comparison tables',
      'Develop marketing collaterals and sales materials'
    ],
    applicationUrl: 'https://www.linkedin.com/jobs'
  },
  {
    id: '2',
    title: 'Senior UI/UX Designer',
    company: 'Creative Studios India',
    location: 'Mumbai, Maharashtra, India',
    type: 'Full-time',
    salary: '₹10-15 LPA',
    postedDate: '1 week ago',
    category: 'Design',
    description: 'Join our creative team to design innovative user experiences for web and mobile applications.',
    requirements: [
      '4+ years of UI/UX design experience',
      'Proficiency in Figma, Adobe XD',
      'Strong portfolio demonstrating design skills',
      'Understanding of user-centered design principles'
    ],
    responsibilities: [
      'Create wireframes, prototypes, and high-fidelity designs',
      'Conduct user research and usability testing',
      'Collaborate with developers and product managers',
      'Maintain design system and component library'
    ]
  },
  {
    id: '3',
    title: 'Full Stack Developer',
    company: 'Tech Innovations Pvt Ltd',
    location: 'Bangalore, Karnataka, India',
    type: 'Full-time',
    salary: '₹12-18 LPA',
    postedDate: '2 days ago',
    category: 'Technology',
    description: 'We are seeking a talented Full Stack Developer to build scalable web applications using modern technologies.',
    requirements: [
      '3+ years of full stack development experience',
      'Strong knowledge of React, Node.js, TypeScript',
      'Experience with databases (SQL and NoSQL)',
      'Familiarity with cloud platforms (AWS/Azure)'
    ],
    responsibilities: [
      'Develop and maintain web applications',
      'Write clean, maintainable code',
      'Collaborate with cross-functional teams',
      'Optimize application performance'
    ]
  },
  {
    id: '4',
    title: 'Content Writer',
    company: 'Media House Digital',
    location: 'Delhi, India',
    type: 'Full-time',
    salary: '₹4-7 LPA',
    postedDate: '3 days ago',
    category: 'Content',
    description: 'Looking for a creative content writer to produce engaging content for our digital platforms.',
    requirements: [
      '2+ years of content writing experience',
      'Excellent command of English',
      'SEO knowledge',
      'Portfolio of published articles'
    ],
    responsibilities: [
      'Create blog posts, articles, and web content',
      'Research industry trends and topics',
      'Optimize content for SEO',
      'Edit and proofread content'
    ]
  },
  {
    id: '5',
    title: 'Sales Manager',
    company: 'Enterprise Solutions Ltd',
    location: 'Gurgaon, Haryana, India',
    type: 'Full-time',
    salary: '₹15-20 LPA',
    postedDate: '5 days ago',
    category: 'Sales',
    description: 'Experienced Sales Manager needed to lead our sales team and drive revenue growth.',
    requirements: [
      '6+ years of sales experience',
      'Proven track record of meeting sales targets',
      'Strong leadership skills',
      'Experience in B2B sales'
    ],
    responsibilities: [
      'Lead and manage sales team',
      'Develop sales strategies',
      'Build relationships with key clients',
      'Analyze sales metrics and reports'
    ]
  },
  {
    id: '6',
    title: 'Digital Marketing Specialist',
    company: 'Growth Marketing Co',
    location: 'Pune, Maharashtra, India',
    type: 'Full-time',
    salary: '₹6-10 LPA',
    postedDate: '1 day ago',
    category: 'Marketing',
    description: 'Join our team to create and execute digital marketing campaigns across multiple channels.',
    requirements: [
      '3+ years of digital marketing experience',
      'Google Ads and Facebook Ads certification',
      'Analytics and data-driven approach',
      'Experience with marketing automation tools'
    ],
    responsibilities: [
      'Plan and execute digital campaigns',
      'Manage social media platforms',
      'Analyze campaign performance',
      'Optimize conversion rates'
    ]
  }
];

// Helper function to parse CSV data into Job objects
const parseCSVToJobs = (csv: string): Job[] => {
  const lines = csv.split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  const jobs: Job[] = [];

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;

    const values = lines[i].split(',').map(v => v.trim());
    const job: any = {};

    headers.forEach((header, index) => {
      const value = values[index] || '';
      if (header === 'requirements' || header === 'responsibilities') {
        job[header] = value.split('|').map(item => item.trim());
      } else {
        job[header] = value;
      }
    });

    if (job.title && job.company) {
      jobs.push(job as Job);
    }
  }

  return jobs;
};

// Helper function to parse Google Sheets API response
const parseGoogleSheetsAPI = (data: any): Job[] => {
  if (!data.values || data.values.length < 2) return [];

  const headers = data.values[0];
  const jobs: Job[] = [];

  for (let i = 1; i < data.values.length; i++) {
    const row = data.values[i];
    const job: any = {};

    headers.forEach((header: string, index: number) => {
      const value = row[index] || '';
      if (header === 'requirements' || header === 'responsibilities') {
        job[header] = value.split('|').map((item: string) => item.trim());
      } else {
        job[header] = value;
      }
    });

    if (job.title && job.company) {
      jobs.push(job as Job);
    }
  }

  return jobs;
};

const JobUpdates: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Jobs');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobs, setJobs] = useState<Job[]>(sampleJobs);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch jobs data from Google Sheets on component mount
  useEffect(() => {
    const fetchJobs = async () => {
      // Only fetch if a URL is configured
      if (!GOOGLE_SHEETS_CSV_URL && !GOOGLE_SHEETS_API_URL) {
        setSelectedJob(sampleJobs[0]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        let fetchedJobs: Job[] = [];

        if (GOOGLE_SHEETS_API_URL) {
          // Fetch from Google Sheets API
          const response = await fetch(GOOGLE_SHEETS_API_URL);
          if (!response.ok) throw new Error('Failed to fetch from Google Sheets API');
          const data = await response.json();
          fetchedJobs = parseGoogleSheetsAPI(data);
        } else if (GOOGLE_SHEETS_CSV_URL) {
          // Fetch from published CSV
          const response = await fetch(GOOGLE_SHEETS_CSV_URL);
          if (!response.ok) throw new Error('Failed to fetch from Google Sheets CSV');
          const csvText = await response.text();
          fetchedJobs = parseCSVToJobs(csvText);
        }

        if (fetchedJobs.length > 0) {
          setJobs(fetchedJobs);
          setSelectedJob(fetchedJobs[0]);
        } else {
          // Fallback to sample data if no jobs found
          setJobs(sampleJobs);
          setSelectedJob(sampleJobs[0]);
        }
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to load jobs. Showing sample data.');
        setJobs(sampleJobs);
        setSelectedJob(sampleJobs[0]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = selectedCategory === 'All Jobs'
    ? jobs
    : jobs.filter(job => job.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Job Updates
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover exciting career opportunities and find your dream job
          </p>

          {/* Error Message */}
          {error && (
            <div className="mt-4 max-w-2xl mx-auto bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800 text-sm">{error}</p>
            </div>
          )}

          {/* Loading Indicator */}
          {loading && (
            <div className="mt-4 flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
              <span className="text-gray-600">Loading latest jobs...</span>
            </div>
          )}
        </div>

        {/* Category Filter */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Two Panel Layout */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Panel - Job Listings */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white rounded-2xl shadow-lg p-4 max-h-[800px] overflow-y-auto">
                <div className="mb-4 pb-3 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {filteredJobs.length} jobs found
                  </h2>
                </div>

                {filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    onClick={() => setSelectedJob(job)}
                    className={`p-4 rounded-xl mb-3 cursor-pointer transition-all duration-300 border-2 ${
                      selectedJob?.id === job.id
                        ? 'bg-gradient-to-r from-cyan-50 to-blue-50 border-blue-500 shadow-md'
                        : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1 hover:text-blue-600 transition-colors">
                          {job.title}
                        </h3>
                        <div className="flex items-center text-sm text-gray-600 mb-1">
                          <Building2 className="w-4 h-4 mr-1" />
                          {job.company}
                        </div>
                      </div>
                      <div className="ml-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                          <Briefcase className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5 mb-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-1.5" />
                        {job.location}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <Clock className="w-3 h-3 mr-1" />
                          {job.type}
                        </span>
                        {job.salary && (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            <DollarSign className="w-3 h-3 mr-1" />
                            {job.salary}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-xs text-gray-500">
                      Posted {job.postedDate}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Panel - Job Description */}
            <div className="lg:col-span-7">
              {selectedJob ? (
                <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24 max-h-[800px] overflow-y-auto">
                  {/* Job Header */}
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                          {selectedJob.title}
                        </h2>
                        <div className="flex items-center text-lg text-gray-700 mb-2">
                          <Building2 className="w-5 h-5 mr-2" />
                          {selectedJob.company}
                        </div>
                      </div>
                      <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 rounded-2xl flex items-center justify-center animate-float">
                        <Briefcase className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                        {selectedJob.location}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-5 h-5 mr-2 text-green-600" />
                        {selectedJob.type}
                      </div>
                      {selectedJob.salary && (
                        <div className="flex items-center text-gray-600">
                          <DollarSign className="w-5 h-5 mr-2 text-purple-600" />
                          {selectedJob.salary}
                        </div>
                      )}
                      <div className="text-gray-500">
                        Posted {selectedJob.postedDate}
                      </div>
                    </div>

                    {selectedJob.applicationUrl && (
                      <a
                        href={selectedJob.applicationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                      >
                        Apply Now
                        <ExternalLink className="w-5 h-5 ml-2" />
                      </a>
                    )}
                  </div>

                  {/* Job Description */}
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                      <div className="w-1.5 h-6 bg-gradient-to-b from-cyan-500 to-blue-600 rounded-full mr-3"></div>
                      About the Role
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedJob.description}
                    </p>
                  </div>

                  {/* Key Responsibilities */}
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                      <div className="w-1.5 h-6 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full mr-3"></div>
                      Key Responsibilities
                    </h3>
                    <ul className="space-y-2">
                      {selectedJob.responsibilities.map((responsibility, index) => (
                        <li key={index} className="flex items-start text-gray-700">
                          <span className="inline-block w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mr-3 mt-2"></span>
                          <span>{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Requirements */}
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                      <div className="w-1.5 h-6 bg-gradient-to-b from-purple-600 to-pink-600 rounded-full mr-3"></div>
                      Requirements
                    </h3>
                    <ul className="space-y-2">
                      {selectedJob.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start text-gray-700">
                          <span className="inline-block w-2 h-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mr-3 mt-2"></span>
                          <span>{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Google Jobs Integration Placeholder */}
                  <div className="mt-8 p-6 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl border border-blue-200">
                    <p className="text-sm text-gray-600 mb-3">
                      Find more jobs on Google:
                    </p>
                    <a
                      href={`https://www.google.com/search?q=${encodeURIComponent(selectedJob.title + ' jobs in India')}&ibp=htl;jobs`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                      Search on Google Jobs
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <Briefcase className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                    Select a Job
                  </h3>
                  <p className="text-gray-600">
                    Click on any job from the list to view details
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Google Jobs Embed Section */}
        <div className="max-w-7xl mx-auto mt-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Browse More Jobs on Google
              </span>
            </h2>
            <p className="text-gray-600 mb-6">
              Search for real-time job opportunities across India using Google Jobs
            </p>
            <div className="relative w-full h-[600px] rounded-xl overflow-hidden border border-gray-200">
              <iframe
                src="https://www.google.com/search?q=jobs+in+india&ibp=htl;jobs"
                className="w-full h-full"
                title="Google Jobs Search"
                style={{ border: 'none' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobUpdates;
