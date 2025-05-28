import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const GuestBanner: React.FC = () => {
  return (
    <div className="guest-banner">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <AlertCircle className="h-4 w-4 mr-2" />
          <span>You're using the app as a guest. Some features may be limited.</span>
        </div>
        <Link
          to="/login"
          className="text-primary-700 hover:text-primary-800 font-medium"
        >
          Create Account
        </Link>
      </div>
    </div>
  );
};

export default GuestBanner;