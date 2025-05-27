import React, { useState } from 'react';
import { ArrowLeftRight, Star, Award, Building, Trash2 } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import SkillTag from '../components/SkillTag';
import { mockCandidates } from '../utils/mockData';

const CompareResumes: React.FC = () => {
  const [selectedCandidates, setSelectedCandidates] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    const results = mockCandidates.filter(
      candidate =>
        candidate.name.toLowerCase().includes(query.toLowerCase()) ||
        candidate.email.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);
    
    setSearchResults(results);
  };

  const handleSelectCandidate = (candidate: any) => {
    if (selectedCandidates.length < 3 && 
        !selectedCandidates.find(c => c.id === candidate.id)) {
      setSelectedCandidates([...selectedCandidates, candidate]);
      setSearchResults([]);
      setSearchQuery('');
    }
  };

  const handleRemoveCandidate = (id: string) => {
    setSelectedCandidates(selectedCandidates.filter(c => c.id !== id));
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Compare Resumes</h1>
        <p className="mt-2 text-gray-600">
          Select up to 3 candidates to compare side by side
        </p>
      </div>
      
      <div className="card p-6 mb-8">
        <div className="max-w-md">
          <label htmlFor="search-candidates" className="block text-sm font-medium text-gray-700 mb-2">
            Search and select candidates to compare
          </label>
          <div className="relative">
            <SearchBar 
              onSearch={handleSearch} 
              placeholder="Search by name or email..." 
            />
            
            {searchResults.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-auto">
                <ul className="py-1">
                  {searchResults.map(candidate => (
                    <li 
                      key={candidate.id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSelectCandidate(candidate)}
                    >
                      <div className="flex items-center">
                        <div className="mr-3">
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-800 font-medium text-sm">
                              {candidate.name.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{candidate.name}</p>
                          <p className="text-xs text-gray-500">{candidate.email}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <div className="mt-4 flex items-center">
            <ArrowLeftRight className="h-5 w-5 text-gray-400 mr-2" />
            <p className="text-sm text-gray-500">
              Select up to 3 candidates to compare side by side
            </p>
          </div>
        </div>
      </div>
      
      {selectedCandidates.length > 0 ? (
        <div className="card overflow-hidden">
          <div className="grid grid-cols-1 divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
            {selectedCandidates.map(candidate => (
              <div key={candidate.id} className="p-6 relative">
                <button
                  type="button"
                  onClick={() => handleRemoveCandidate(candidate.id)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
                
                <div className="text-center mb-4">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 mb-2">
                    <span className="text-2xl font-medium text-blue-700">
                      {candidate.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold">{candidate.name}</h3>
                  <p className="text-gray-600 text-sm">{candidate.email}</p>
                  
                  <div className="mt-2 flex justify-center">
                    <div className={`text-2xl font-bold ${getScoreColor(candidate.score)}`}>
                      {candidate.score}%
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">Match Score</p>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    {candidate.skills.map((skill: string, i: number) => (
                      <SkillTag
                        key={i}
                        skill={{ id: i.toString(), name: skill }}
                        isEditable={false}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="mt-4 space-y-3">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm font-medium">Experience</p>
                      <p className="text-sm text-gray-600">{candidate.experience} years</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm font-medium">Education</p>
                      <p className="text-sm text-gray-600">{candidate.education}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Building className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm font-medium">Previous Company</p>
                      <p className="text-sm text-gray-600">Example Inc.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Strengths</h4>
                  <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                    <li>Strong technical background</li>
                    <li>Leadership experience</li>
                    <li>Problem-solving skills</li>
                  </ul>
                </div>
                
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Gaps</h4>
                  <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                    <li>Limited cloud experience</li>
                    <li>No enterprise projects</li>
                  </ul>
                </div>
                
                <div className="mt-6">
                  <button
                    type="button"
                    className="w-full btn btn-primary"
                  >
                    View Full Resume
                  </button>
                </div>
              </div>
            ))}
            
            {Array(3 - selectedCandidates.length).fill(0).map((_, index) => (
              <div key={`empty-${index}`} className="p-6 flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <div className="rounded-full bg-gray-200 h-16 w-16 flex items-center justify-center mx-auto mb-4">
                    <ArrowLeftRight className="h-6 w-6 text-gray-400" />
                  </div>
                  <p className="text-gray-500">
                    Select another candidate to compare
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
          <ArrowLeftRight className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No candidates selected</h3>
          <p className="mt-1 text-sm text-gray-500">
            Search and select candidates above to start comparing resumes
          </p>
        </div>
      )}
    </div>
  );
};

export default CompareResumes;