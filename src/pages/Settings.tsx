import React, { useState } from 'react';
import { Save, AlertCircle, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    notifyOnNewResumes: true,
    autoAnalyzeResumes: true,
    emailSummaryFrequency: 'daily',
    aiSensitivity: 70,
    defaultJobRequirement: '',
    theme: 'light',
    boltApiKey: '',
    boltDeviceId: '',
    googleAnalyticsViewId: '',
    smtp: {
      host: '',
      port: '',
      username: '',
      password: '',
      senderName: '',
      senderEmail: '',
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSmtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      smtp: {
        ...prev.smtp,
        [name]: value,
      },
    }));
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      aiSensitivity: parseInt(e.target.value),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/update-smtp`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          smtp: settings.smtp,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update SMTP settings');
      }

      toast.success('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Settings</h1>
        <p className="mt-2 text-gray-600">
          Configure your resume shortlisting preferences and integrations
        </p>
      </div>
      
      <div className="card p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Email Settings (SMTP)
              </h2>
              <div className="bg-primary-50 border border-primary-100 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-primary-500 mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-sm text-primary-800">
                    Configure your SMTP settings to enable email notifications and increase the email sending rate limit.
                  </p>
                </div>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="host" className="block text-sm font-medium text-gray-700">
                SMTP Host
              </label>
              <input
                type="text"
                name="host"
                id="host"
                value={settings.smtp.host}
                onChange={handleSmtpChange}
                className="mt-1 input"
                placeholder="smtp.example.com"
              />
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="port" className="block text-sm font-medium text-gray-700">
                SMTP Port
              </label>
              <input
                type="text"
                name="port"
                id="port"
                value={settings.smtp.port}
                onChange={handleSmtpChange}
                className="mt-1 input"
                placeholder="587"
              />
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                SMTP Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={settings.smtp.username}
                onChange={handleSmtpChange}
                className="mt-1 input"
                placeholder="your-username"
              />
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                SMTP Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={settings.smtp.password}
                onChange={handleSmtpChange}
                className="mt-1 input"
                placeholder="••••••••"
              />
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="senderName" className="block text-sm font-medium text-gray-700">
                Sender Name
              </label>
              <input
                type="text"
                name="senderName"
                id="senderName"
                value={settings.smtp.senderName}
                onChange={handleSmtpChange}
                className="mt-1 input"
                placeholder="Resume Shortlister"
              />
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="senderEmail" className="block text-sm font-medium text-gray-700">
                Sender Email
              </label>
              <input
                type="email"
                name="senderEmail"
                id="senderEmail"
                value={settings.smtp.senderEmail}
                onChange={handleSmtpChange}
                className="mt-1 input"
                placeholder="no-reply@yourdomain.com"
              />
            </div>

            {/* Rest of the settings form... */}
            
            <div className="sm:col-span-6 pt-6 border-t border-gray-200">
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isSubmitting ? 'Saving...' : 'Save Settings'}
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