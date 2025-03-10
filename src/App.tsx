import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { MainLayout } from './components/MainLayout';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { AllRecommendationsPage } from './pages/AllRecommendationsPage';
import { AllNotificationsPage } from './pages/AllNotificationsPage';
import { NewCoursePage } from './pages/NewCoursePage';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<MainLayout><DashboardPage /></MainLayout>} />
        <Route path="/recommendations" element={<MainLayout><AllRecommendationsPage /></MainLayout>} />
        <Route path="/notifications" element={<MainLayout><AllNotificationsPage /></MainLayout>} />
        <Route path="/courses/new" element={<MainLayout><NewCoursePage /></MainLayout>} />
        <Route path="/courses" element={<MainLayout><div>Kurse</div></MainLayout>} />
        <Route path="/modules" element={<MainLayout><div>Module</div></MainLayout>} />
        <Route path="/formats" element={<MainLayout><div>Lernformate</div></MainLayout>} />
        <Route path="/analytics" element={<MainLayout><div>Analysen</div></MainLayout>} />
        <Route path="/settings" element={<MainLayout><div>Einstellungen</div></MainLayout>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;