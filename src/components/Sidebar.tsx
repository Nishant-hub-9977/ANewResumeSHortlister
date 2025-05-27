import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  SplitSquareVertical,
  Settings,
  Brain,
  User
} from 'lucide-react';

interface SidebarProps {
  closeMobileSidebar?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ closeMobileSidebar }) => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: 'Job Requirements', path: '/job-requirements', icon: <FileText className="h-5 w-5" /> },
    { name: 'Candidates', path: '/candidates', icon: <Users className="h-5 w-5" /> },
    { name: 'Compare', path: '/compare', icon: <SplitSquareVertical className="h-5 w-5" /> },
    { name: 'Settings', path: '/settings', icon: <Settings className="h-5 w-5" /> },
  ];

  const handleClick = () => {
    if (closeMobileSidebar) {
      closeMobileSidebar();
    }
  };

  return (
    <div className="flex flex-col flex-grow">
      <div className="flex items-center justify-center h-16 flex-shrink-0 px-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Brain className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">ResumeAI</span>
        </div>
      </div>
      <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={handleClick}
              className={({ isActive }) =>
                `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <div className="mr-3 flex-shrink-0">{item.icon}</div>
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
        <div className="flex items-center">
          <div className="bg-blue-500 rounded-full p-1 text-white">
            <User className="h-6 w-6" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">Admin User</p>
            <button className="text-xs font-medium text-gray-500 hover:text-blue-500">
              View profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;