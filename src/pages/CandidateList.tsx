import React, { useState, useEffect } from 'react';
import { Download, Filter, Users } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import ResumeCard from '../components/ResumeCard';
import { mockCandidates } from '../utils/mockData';

const CandidateList: React.FC = () => {
  const [candidates, setCandidates] = useState(mockCandidates);
  const [filteredCandidates, setFilteredCandidates] = useState(mockCandidates);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('score');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Apply filters and search
    let result = [...candidates];
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        candidate =>
          candidate.name.toLowerCase().includes(query) ||
          candidate.email.toLowerCase().includes(query) ||
          candidate.skills.some(skill => skill.toLowerCase().includes(query))
      );
    }
    
    // Apply filters
    if (activeFilter === 'shortlisted') {
      result = result.filter(candidate => candidate.isShortlisted);
    } else if (activeFilter === 'high-match') {
      result = result.filter(candidate => candidate.score >= 80);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      if (sortBy === 'score') {
        return b.score - a.score;
      } else if (sortBy === 'experience') {
        return b.experience - a.experience;
      } else {
        return a.name.localeCompare(b.name);
      }
    });
    
    setFilteredCandidates(result);
  }, [candidates, searchQuery, activeFilter, sortBy]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-900">Candidates</h1>
        <p className="mt-2 text-gray-600">
          Browse and evaluate all candidates based on their resume analysis
        </p>
      </div>
      
      <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <SearchBar 
          onSearch={handleSearch} 
          placeholder="Search candidates by name, email or skills..." 
        />
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <label htmlFor="sort" className="mr-2 text-sm text-gray-500">
              Sort by:
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={handleSortChange}
              className="rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="score">Match Score</option>
              <option value="name">Name</option>
              <option value="experience">Experience</option>
            </select>
          </div>
          
          <button
            type="button"
            className="btn btn-secondary"
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </button>
          
          <button
            type="button"
            className="btn btn-secondary"
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </button>
        </div>
      </div>
      
      <div className="mb-6 flex space-x-2">
        <button
          type="button"
          onClick={() => handleFilterChange('all')}
          className={`rounded-full px-4 py-1 text-sm font-medium ${
            activeFilter === 'all'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Candidates
        </button>
        
        <button
          type="button"
          onClick={() => handleFilterChange('shortlisted')}
          className={`rounded-full px-4 py-1 text-sm font-medium ${
            activeFilter === 'shortlisted'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Shortlisted
        </button>
        
        <button
          type="button"
          onClick={() => handleFilterChange('high-match')}
          className={`rounded-full px-4 py-1 text-sm font-medium ${
            activeFilter === 'high-match'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          High Match (80%+)
        </button>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array(6).fill(0).map((_, index) => (
            <div key={index} className="card animate-pulse">
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className="bg-gray-200 h-12 w-12 rounded-full"></div>
                    <div className="ml-3">
                      <div className="h-5 w-40 bg-gray-200 rounded"></div>
                      <div className="h-4 w-32 bg-gray-200 rounded mt-2"></div>
                    </div>
                  </div>
                  <div className="h-8 w-16 bg-gray-200 rounded"></div>
                </div>
                <div className="mt-4">
                  <div className="flex space-x-2 mb-3">
                    <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                    <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                    <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between">
                  <div className="h-6 w-24 bg-gray-200 rounded"></div>
                  <div className="h-6 w-24 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div className="w-full bg-gray-200 h-1">
                <div className="h-1 bg-gray-300 w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredCandidates.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCandidates.map(candidate => (
            <ResumeCard key={candidate.id} resume={candidate} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No candidates found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default CandidateList;