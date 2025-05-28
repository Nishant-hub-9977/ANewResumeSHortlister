import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, AlertCircle } from 'lucide-react';

const BoltData: React.FC = () => {
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Bolt IoT Data</h3>
        <Link
          to="/settings"
          className="text-sm text-primary-600 hover:text-primary-700 flex items-center"
        >
          <Settings className="h-4 w-4 mr-1" />
          Configure
        </Link>
      </div>

      <div className="bg-primary-50 border border-primary-100 rounded-lg p-4">
        <div className="flex items-start">
          <AlertCircle className="h-5 w-5 text-primary-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <p className="text-sm text-primary-800">
              To enable Bolt integration, you need to:
            </p>
            <ol className="mt-2 text-sm text-primary-700 list-decimal list-inside space-y-1">
              <li>Create a Bolt Cloud account</li>
              <li>Configure your Bolt device</li>
              <li>Add your API key and Device ID in Settings</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoltData;