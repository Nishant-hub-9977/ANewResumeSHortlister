import React, { useState } from 'react';
import { Save } from 'lucide-react';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    notifyOnNewResumes: true,
    autoAnalyzeResumes: true,
    emailSummaryFrequency: 'daily',
    aiSensitivity: 70,
    defaultJobRequirement: '',
    theme: 'light',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      aiSensitivity: parseInt(e.target.value),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save settings to backend
    console.log('Saving settings:', settings);
    // Show success message
    alert('Settings saved successfully!');
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Settings</h1>
        <p className="mt-2 text-gray-600">
          Configure your resume shortlisting preferences and notifications
        </p>
      </div>
      
      <div className="card p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                General Settings
              </h2>
            </div>
            
            <div className="sm:col-span-3">
              <label htmlFor="theme" className="block text-sm font-medium text-gray-700">
                Interface Theme
              </label>
              <select
                id="theme"
                name="theme"
                value={settings.theme}
                onChange={handleInputChange}
                className="mt-1 input"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System Default</option>
              </select>
            </div>
            
            <div className="sm:col-span-3">
              <label htmlFor="defaultJobRequirement" className="block text-sm font-medium text-gray-700">
                Default Job Requirement
              </label>
              <select
                id="defaultJobRequirement"
                name="defaultJobRequirement"
                value={settings.defaultJobRequirement}
                onChange={handleInputChange}
                className="mt-1 input"
              >
                <option value="">Select a default job requirement</option>
                <option value="software-engineer">Software Engineer</option>
                <option value="frontend-developer">Frontend Developer</option>
                <option value="backend-developer">Backend Developer</option>
                <option value="fullstack-developer">Fullstack Developer</option>
              </select>
            </div>
            
            <div className="sm:col-span-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 pt-4 border-t border-gray-200">
                AI Analysis Settings
              </h2>
            </div>
            
            <div className="sm:col-span-6">
              <div className="flex items-center">
                <input
                  id="autoAnalyzeResumes"
                  name="autoAnalyzeResumes"
                  type="checkbox"
                  checked={settings.autoAnalyzeResumes}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <label htmlFor="autoAnalyzeResumes" className="ml-2 text-sm text-gray-700">
                  Automatically analyze resumes upon upload
                </label>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                When enabled, new resumes will be automatically analyzed against your selected job requirements
              </p>
            </div>
            
            <div className="sm:col-span-6">
              <label htmlFor="aiSensitivity" className="block text-sm font-medium text-gray-700">
                AI Matching Sensitivity: {settings.aiSensitivity}%
              </label>
              <input
                id="aiSensitivity"
                name="aiSensitivity"
                type="range"
                min="0"
                max="100"
                value={settings.aiSensitivity}
                onChange={handleSliderChange}
                className="mt-1 w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer"
              />
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>Strict Matching</span>
                <span>Balanced</span>
                <span>Flexible Matching</span>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Higher sensitivity means stricter matching against job requirements. Lower sensitivity allows for more flexible matches.
              </p>
            </div>
            
            <div className="sm:col-span-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 pt-4 border-t border-gray-200">
                Notification Settings
              </h2>
            </div>
            
            <div className="sm:col-span-6">
              <div className="flex items-center">
                <input
                  id="notifyOnNewResumes"
                  name="notifyOnNewResumes"
                  type="checkbox"
                  checked={settings.notifyOnNewResumes}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <label htmlFor="notifyOnNewResumes" className="ml-2 text-sm text-gray-700">
                  Notify me when new resumes are uploaded
                </label>
              </div>
            </div>
            
            <div className="sm:col-span-3">
              <label htmlFor="emailSummaryFrequency" className="block text-sm font-medium text-gray-700">
                Email Summary Frequency
              </label>
              <select
                id="emailSummaryFrequency"
                name="emailSummaryFrequency"
                value={settings.emailSummaryFrequency}
                onChange={handleInputChange}
                className="mt-1 input"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="never">Never</option>
              </select>
            </div>
            
            <div className="sm:col-span-6 pt-6 border-t border-gray-200">
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;