import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './components/ui/Toast';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Assessment from './pages/Assessment';
import Milestones from './pages/Milestones';
import Resources from './pages/Resources';

/** Pages that should NOT show the footer */
const NO_FOOTER_PATHS = ['/register', '/login'];

function AppShell() {
  const location = useLocation();
  const showFooter = !NO_FOOTER_PATHS.includes(location.pathname);

  return (
    <>
      <Navbar />
      <div className="page-wrapper">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/"           element={<Landing />} />
            <Route path="/login"      element={<Login />} />
            <Route path="/register"   element={<Register />} />
            <Route path="/dashboard"  element={<Dashboard />} />
            <Route path="/profile"    element={<Profile />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/milestones" element={<Milestones />} />
            <Route path="/resources"  element={<Resources />} />
            <Route path="*"           element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </div>
      {showFooter && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            <AppShell />
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
