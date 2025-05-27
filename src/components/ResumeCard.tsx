import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Star, ChevronRight, Award } from 'lucide-react';

interface ResumeCardProps {
  resume: {
    id: string;
    name: string;
    email: string;
    score: number;
    skills: string[];
    experience: number;
    education: string;
    matchPercentage: number;
    isShortlisted: boolean;
  };
}

const ResumeCard: React.FC<ResumeCardProps> = ({ resume }) => {
  // Function to determine the score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="resume-card card overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-full">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold">{resume.name}</h3>
              <p className="text-sm text-gray-500">{resume.email}</p>
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <div className={`text-lg font-bold ${getScoreColor(resume.score)}`}>
              {resume.score}%
            </div>
            <div className="text-xs text-gray-500">Match Score</div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex flex-wrap gap-1 mb-3">
            {resume.skills.slice(0, 3).map((skill, index) => (
              <span key={index} className="badge badge-primary">
                {skill}
              </span>
            ))}
            {resume.skills.length > 3 && (
              <span className="badge badge-secondary">
                +{resume.skills.length - 3} more
              </span>
            )}
          </div>
          
          <div className="flex items-center text-sm text-gray-600 space-x-4">
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-1 text-gray-500" />
              <span>{resume.experience} years exp</span>
            </div>
            <div className="flex items-center">
              <Award className="h-4 w-4 mr-1 text-gray-500" />
              <span>{resume.education}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
          {resume.isShortlisted ? (
            <span className="badge badge-success">Shortlisted</span>
          ) : (
            <span className="text-sm text-gray-500">Not shortlisted</span>
          )}
          
          <Link 
            to={`/resume/${resume.id}`}
            className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            View Details
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
      
      {/* Progress bar for match percentage */}
      <div className="w-full bg-gray-200 h-1">
        <div 
          className="h-1 bg-blue-600 transition-all duration-500 ease-in-out" 
          style={{ width: `${resume.matchPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default ResumeCard;