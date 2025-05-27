import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  FileText, 
  Star, 
  Award, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Download, 
  Bookmark,
  CheckCircle,
  BarChart3,
  Building,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { mockCandidates } from '../utils/mockData';

const ResumeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [resume, setResume] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isShortlisted, setIsShortlisted] = useState(false);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      const found = mockCandidates.find(candidate => candidate.id === id);
      if (found) {
        setResume(found);
        setIsShortlisted(found.isShortlisted);
      }
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [id]);

  const toggleShortlist = () => {
    setIsShortlisted(!isShortlisted);
  };

  if (isLoading) {
    return (
      <div className="animate-pulse p-8 max-w-5xl mx-auto">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-2/4 mb-8"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 h-64">
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow p-6 h-64">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="text-center py-12">
        <FileText className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-lg font-medium text-gray-900">Resume not found</h3>
        <p className="mt-1 text-sm text-gray-500">
          The resume you're looking for doesn't exist or has been removed
        </p>
      </div>
    );
  }

  // Calculate score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-blue-600 bg-blue-50';
    if (score >= 40) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="animate-fade-in max-w-7xl mx-auto">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">{resume.name}</h1>
          <p className="mt-1 text-gray-600">{resume.email}</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button
            type="button"
            className="btn btn-secondary"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Resume
          </button>
          
          <button
            type="button"
            onClick={toggleShortlist}
            className={`btn ${isShortlisted ? 'btn-accent' : 'btn-primary'}`}
          >
            <Bookmark className="mr-2 h-4 w-4" />
            {isShortlisted ? 'Shortlisted' : 'Add to Shortlist'}
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Left column - Candidate info */}
        <div className="md:col-span-1 space-y-6">
          <div className="card p-6">
            <div className="flex items-center mb-4">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{resume.name}</h2>
                <p className="text-gray-600">Software Engineer</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-gray-600">{resume.email}</span>
              </div>
              
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-gray-600">+1 (555) 123-4567</span>
              </div>
              
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-gray-600">San Francisco, CA</span>
              </div>
              
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-gray-600">Available immediately</span>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Match Score</h3>
                <div className={`px-3 py-1 rounded-full text-lg font-bold ${getScoreColor(resume.score)}`}>
                  {resume.score}%
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${resume.score}%` }}
                />
              </div>
            </div>
          </div>
          
          <div className="card p-6">
            <h3 className="font-medium text-lg mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {resume.skills.map((skill: string, i: number) => (
                <span 
                  key={i}
                  className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-blue-100 text-blue-800"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div className="card p-6">
            <h3 className="font-medium text-lg mb-4">Key Information</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <Star className="h-5 w-5 text-yellow-500 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium">Experience</p>
                  <p className="text-gray-600">{resume.experience} years</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Award className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium">Education</p>
                  <p className="text-gray-600">{resume.education}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Building className="h-5 w-5 text-purple-500 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium">Current Company</p>
                  <p className="text-gray-600">Example Tech Inc.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right column - Resume analysis */}
        <div className="md:col-span-2 space-y-6">
          <div className="card overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex">
                <button
                  type="button"
                  className={`px-4 py-4 text-sm font-medium border-b-2 ${
                    activeTab === 'overview'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('overview')}
                >
                  Overview
                </button>
                
                <button
                  type="button"
                  className={`px-4 py-4 text-sm font-medium border-b-2 ${
                    activeTab === 'analysis'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('analysis')}
                >
                  AI Analysis
                </button>
                
                <button
                  type="button"
                  className={`px-4 py-4 text-sm font-medium border-b-2 ${
                    activeTab === 'experience'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('experience')}
                >
                  Experience
                </button>
                
                <button
                  type="button"
                  className={`px-4 py-4 text-sm font-medium border-b-2 ${
                    activeTab === 'education'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('education')}
                >
                  Education
                </button>
              </nav>
            </div>
            
            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Summary</h3>
                    <p className="text-gray-600">
                      Experienced software engineer with {resume.experience} years of professional experience developing web applications and services. Strong background in JavaScript, React, and Node.js with a focus on building scalable and maintainable solutions. {resume.education} graduate with a passion for learning new technologies and solving complex problems.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="card p-4 bg-blue-50">
                      <div className="flex items-center">
                        <CheckCircle className="h-8 w-8 text-blue-600 mr-3" />
                        <div>
                          <p className="text-xs text-blue-600 uppercase font-semibold">Match Score</p>
                          <p className="text-2xl font-bold">{resume.score}%</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="card p-4 bg-green-50">
                      <div className="flex items-center">
                        <BarChart3 className="h-8 w-8 text-green-600 mr-3" />
                        <div>
                          <p className="text-xs text-green-600 uppercase font-semibold">Skills Match</p>
                          <p className="text-2xl font-bold">8/10</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="card p-4 bg-purple-50">
                      <div className="flex items-center">
                        <Star className="h-8 w-8 text-purple-600 mr-3" />
                        <div>
                          <p className="text-xs text-purple-600 uppercase font-semibold">Experience</p>
                          <p className="text-2xl font-bold">{resume.experience} years</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Key Strengths</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      <li>Strong technical expertise in frontend development</li>
                      <li>Experience with modern JavaScript frameworks</li>
                      <li>Good problem-solving skills</li>
                      <li>Team collaboration and communication</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Areas for Consideration</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      <li>Limited experience with cloud infrastructure</li>
                      <li>No formal project management experience</li>
                    </ul>
                  </div>
                </div>
              )}
              
              {activeTab === 'analysis' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">AI Analysis</h3>
                    <p className="text-gray-600 mb-4">
                      Our AI has analyzed this resume against the job requirements and found the following insights:
                    </p>
                    
                    <div className="space-y-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium flex items-center">
                          <ThumbsUp className="h-5 w-5 text-green-500 mr-2" />
                          Strengths
                        </h4>
                        <ul className="mt-2 list-disc list-inside space-y-1 text-gray-600">
                          <li>Technical skills strongly align with job requirements (90% match)</li>
                          <li>Experience level meets the minimum requirement</li>
                          <li>Education background is relevant to the position</li>
                          <li>Has worked on similar projects in the past</li>
                        </ul>
                      </div>
                      
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium flex items-center">
                          <ThumbsDown className="h-5 w-5 text-yellow-500 mr-2" />
                          Gaps
                        </h4>
                        <ul className="mt-2 list-disc list-inside space-y-1 text-gray-600">
                          <li>Missing experience with some required technologies</li>
                          <li>Limited leadership experience compared to job requirements</li>
                          <li>No specific industry experience in finance</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Skills Analysis</h3>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">JavaScript</span>
                          <span className="text-sm font-medium text-gray-500">95%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: '95%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">React</span>
                          <span className="text-sm font-medium text-gray-500">90%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Node.js</span>
                          <span className="text-sm font-medium text-gray-500">85%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">TypeScript</span>
                          <span className="text-sm font-medium text-gray-500">80%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">GraphQL</span>
                          <span className="text-sm font-medium text-gray-500">60%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">AWS</span>
                          <span className="text-sm font-medium text-gray-500">40%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-red-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">AI Recommendation</h3>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <p className="text-blue-800">
                        Based on the analysis, this candidate is <strong>recommended for interview</strong>. Their technical skills and experience align well with the job requirements, though there are some areas that should be explored further during the interview process.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'experience' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Work Experience</h3>
                  
                  <div className="border-l-2 border-gray-200 pl-4 space-y-8">
                    <div className="relative">
                      <div className="absolute -left-6 mt-1 h-4 w-4 rounded-full bg-blue-500"></div>
                      <div>
                        <h4 className="text-base font-semibold">Senior Frontend Developer</h4>
                        <p className="text-sm text-gray-600">Example Tech Inc. • 2020 - Present</p>
                        <p className="mt-2 text-gray-700">
                          Led the development of the company's flagship web application using React, TypeScript, and GraphQL. Implemented CI/CD pipelines and improved performance by 40%.
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          <span className="badge badge-primary">React</span>
                          <span className="badge badge-primary">TypeScript</span>
                          <span className="badge badge-primary">GraphQL</span>
                          <span className="badge badge-primary">Jest</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute -left-6 mt-1 h-4 w-4 rounded-full bg-gray-400"></div>
                      <div>
                        <h4 className="text-base font-semibold">Frontend Developer</h4>
                        <p className="text-sm text-gray-600">Web Solutions LLC • 2018 - 2020</p>
                        <p className="mt-2 text-gray-700">
                          Developed responsive web applications for various clients using React, Redux, and Node.js. Collaborated with design and backend teams to implement new features.
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          <span className="badge badge-primary">React</span>
                          <span className="badge badge-primary">Redux</span>
                          <span className="badge badge-primary">Node.js</span>
                          <span className="badge badge-primary">CSS</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute -left-6 mt-1 h-4 w-4 rounded-full bg-gray-400"></div>
                      <div>
                        <h4 className="text-base font-semibold">Junior Web Developer</h4>
                        <p className="text-sm text-gray-600">Digital Agency Inc. • 2016 - 2018</p>
                        <p className="mt-2 text-gray-700">
                          Built websites and web applications for small businesses using JavaScript, HTML, and CSS. Implemented responsive designs and integrated with backend APIs.
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          <span className="badge badge-primary">JavaScript</span>
                          <span className="badge badge-primary">HTML</span>
                          <span className="badge badge-primary">CSS</span>
                          <span className="badge badge-primary">jQuery</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'education' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Education</h3>
                  
                  <div className="border-l-2 border-gray-200 pl-4 space-y-8">
                    <div className="relative">
                      <div className="absolute -left-6 mt-1 h-4 w-4 rounded-full bg-blue-500"></div>
                      <div>
                        <h4 className="text-base font-semibold">Master's in Computer Science</h4>
                        <p className="text-sm text-gray-600">Stanford University • 2014 - 2016</p>
                        <p className="mt-2 text-gray-700">
                          Specialized in Software Engineering with focus on web technologies and distributed systems. Graduated with honors.
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          <span className="badge badge-secondary">GPA: 3.8/4.0</span>
                          <span className="badge badge-secondary">Research Assistant</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute -left-6 mt-1 h-4 w-4 rounded-full bg-gray-400"></div>
                      <div>
                        <h4 className="text-base font-semibold">Bachelor's in Computer Science</h4>
                        <p className="text-sm text-gray-600">University of California, Berkeley • 2010 - 2014</p>
                        <p className="mt-2 text-gray-700">
                          Completed a Bachelor's degree with a minor in Mathematics. Participated in various hackathons and coding competitions.
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          <span className="badge badge-secondary">GPA: 3.7/4.0</span>
                          <span className="badge badge-secondary">Dean's List</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-medium text-gray-900 mt-8 mb-4">Certifications</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Award className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">AWS Certified Developer</p>
                        <p className="text-sm text-gray-600">Amazon Web Services • 2021</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Award className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">Professional Scrum Master I</p>
                        <p className="text-sm text-gray-600">Scrum.org • 2020</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Award className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">Frontend Development Certification</p>
                        <p className="text-sm text-gray-600">freeCodeCamp • 2019</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="card p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Interviewer Notes</h3>
            
            <div className="mb-4">
              <textarea
                rows={4}
                className="w-full rounded-md border border-gray-300 p-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add your notes about this candidate..."
              ></textarea>
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                className="btn btn-primary"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeDetail;