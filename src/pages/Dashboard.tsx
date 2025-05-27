import React, { useState, useEffect } from 'react';
import { 
  Users, 
  CheckCircle, 
  FileText, 
  Clock, 
  BarChart3,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import StatCard from '../components/StatCard';
import ResumeUploader from '../components/ResumeUploader';
import { mockDashboardData } from '../utils/mockData';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState(mockDashboardData.stats);
  const [recentCandidates, setRecentCandidates] = useState(mockDashboardData.recentCandidates);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleUploadComplete = (files: File[]) => {
    console.log('Uploaded files:', files);
    // In a real app, we would process the files and update the dashboard
    // For the demo, let's update the stats to simulate new uploads
    setStats({
      ...stats,
      totalResumes: stats.totalResumes + files.length,
      pendingReview: stats.pendingReview + files.length
    });
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Overview of your resume analysis and shortlisting process
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Resumes"
          value={stats.totalResumes}
          icon={<FileText className="h-6 w-6 text-blue-600" />}
          trend={{ direction: 'up', value: '+12% from last month' }}
        />
        
        <StatCard
          title="Shortlisted"
          value={stats.shortlisted}
          icon={<CheckCircle className="h-6 w-6 text-green-600" />}
          trend={{ direction: 'up', value: '+5% from last month' }}
        />
        
        <StatCard
          title="Pending Review"
          value={stats.pendingReview}
          icon={<Clock className="h-6 w-6 text-yellow-600" />}
        />
        
        <StatCard
          title="Active Jobs"
          value={stats.activeJobs}
          icon={<BarChart3 className="h-6 w-6 text-purple-600" />}
        />
      </div>
      
      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Candidates
              </h2>
              <Link
                to="/candidates"
                className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center"
              >
                View all
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Match
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {isLoading ? (
                    Array(5).fill(0).map((_, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4">
                          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3"></div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    recentCandidates.map((candidate) => (
                      <tr key={candidate.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <Users className="h-5 w-5 text-gray-500" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {candidate.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {candidate.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 font-medium">
                            {candidate.matchScore}%
                          </div>
                          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-600" 
                              style={{ width: `${candidate.matchScore}%` }}
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`badge ${
                            candidate.status === 'Shortlisted' 
                              ? 'badge-success' 
                              : candidate.status === 'Reviewing' 
                              ? 'badge-warning'
                              : 'badge-secondary'
                          }`}>
                            {candidate.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link 
                            to={`/resume/${candidate.id}`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Upload Resumes
          </h2>
          <ResumeUploader onUploadComplete={handleUploadComplete} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;