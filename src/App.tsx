import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useUser } from '@supabase/auth-helpers-react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import JobRequirements from './pages/JobRequirements';
import CandidateList from './pages/CandidateList';
import CompareResumes from './pages/CompareResumes';
import ResumeDetail from './pages/ResumeDetail';
import Settings from './pages/Settings';
import Auth from './components/Auth';
import GuestBanner from './components/GuestBanner';

function App() {
  const user = useUser();
  const isGuest = user?.email?.startsWith('guest_');

  return (
    <Router>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          className: 'animate-slide-up',
        }}
      />
      {isGuest && <GuestBanner />}
      <Routes>
        <Route 
          path="/login" 
          element={user ? <Navigate to="/" replace /> : <Auth />} 
        />
        <Route 
          path="/" 
          element={user ? <Layout /> : <Navigate to="/login" replace />}
        >
          <Route index element={<Dashboard />} />
          <Route path="job-requirements" element={<JobRequirements />} />
          <Route path="candidates" element={<CandidateList />} />
          <Route path="compare" element={<CompareResumes />} />
          <Route path="resume/:id" element={<ResumeDetail />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;