import React from 'react';
import { useLocation } from 'react-router-dom';
import { MenuIcon, BellIcon, User } from 'lucide-react';

interface HeaderProps {
  openMobileSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ openMobileSidebar }) => {
  const location = useLocation();
  
  // Get the title based on the current route
  const getPageTitle = () => {
    const path = location.pathname;
    
    if (path === '/') return 'Dashboard';
    if (path === '/job-requirements') return 'Job Requirements';
    if (path === '/candidates') return 'Candidates';
    if (path === '/compare') return 'Compare Resumes';
    if (path === '/settings') return 'Settings';
    if (path.startsWith('/resume/')) return 'Resume Details';
    
    return 'Resume Shortlister';
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white shadow-sm">
      <div className="flex flex-1 justify-between px-4 md:px-0">
        <div className="flex items-center md:ml-0">
          <button
            type="button"
            className="inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden"
            onClick={openMobileSidebar}
          >
            <MenuIcon className="h-6 w-6" />
          </button>
          <h1 className="ml-2 text-xl font-semibold text-gray-900 md:ml-6">
            {getPageTitle()}
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            type="button"
            className="flex-shrink-0 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <BellIcon className="h-6 w-6" />
          </button>
          
          <div className="relative flex-shrink-0">
            <button
              type="button"
              className="flex rounded-full bg-blue-500 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <User className="h-8 w-8 p-1" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;