import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import JobRequirements from './pages/JobRequirements';
import CandidateList from './pages/CandidateList';
import CompareResumes from './pages/CompareResumes';
import ResumeDetail from './pages/ResumeDetail';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Layout />}>
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