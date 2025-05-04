import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// Import of page components
import HomePage from '../pages/homepage';
import AboutPage from '../pages/AboutPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import Dashboard from '../pages/DashboardPage';
import CreateStudy from '../components/CreateStudy/StudyForm';
import ResultsPage from '../pages/ResultsPage';
import NotFoundPage from '../pages/NotFoundPage';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useContext(AuthContext);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Public route that redirects logged-in users
const PublicRoute = ({ children }) => {
  const { isLoggedIn, loading } = useContext(AuthContext);
  console.log('PublicRoute:', { isLoggedIn, loading });
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      
      {/* Authentication routes - redirect to dashboard if already logged in */}
      <Route path="/login" element={
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      } />
      <Route path="/register" element={
        <PublicRoute>
          <RegisterPage />
        </PublicRoute>
      } />
      
      {/* Protected routes - must be logged in */}
      <Route path="/dashboard" element={
        //Made public for the presentation
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />

      <Route path="/create-study" element={
        //made public for the presentation
        <PublicRoute>
          <CreateStudy/>
        </PublicRoute>
      } />

      <Route path="/results" element={
        <ProtectedRoute>
          <ResultsPage />
        </ProtectedRoute>
      } />
      
      <Route path="/results/:id" element={
        <ProtectedRoute>
          <ResultsPage />
        </ProtectedRoute>
      } />
      
      {/* 404 route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;