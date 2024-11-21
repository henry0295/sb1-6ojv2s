import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import AgentDashboard from './components/AgentDashboard';
import AdminDashboard from './components/AdminDashboard';

function App() {
  // In a real app, this would come from your auth system
  const isAdmin = true;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route 
            path="dashboard" 
            element={isAdmin ? <AdminDashboard /> : <AgentDashboard />} 
          />
          {/* Add other routes as needed */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;