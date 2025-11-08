import React, { useEffect, useState, useCallback, lazy, Suspense } from 'react';
import './styles/globals.css';
import SplashScreen from './components/SplashScreen';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NavBar from './components/NavBar';
import SiteFooter from './components/SiteFooter';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const ProductTour = lazy(() => import('./pages/ProductTour'));
const Features = lazy(() => import('./pages/Features'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const ChatBot = lazy(() => import('./components/ChatBot'));

export default function AppFixed() {
  const [showSplash, setShowSplash] = useState(true);
  const onSplashFinish = useCallback(() => setShowSplash(false), []);

  useEffect(() => {
    // Splash dismiss handled by SplashScreen via callback
  }, []);

  return (
    <>
      {showSplash && <SplashScreen onFinish={onSplashFinish} />}
      <Router>
        <NavBar />
        <div className="layout" aria-hidden={showSplash}>
          <div className="content" style={{ paddingTop: 70 }}>
            <Suspense fallback={<div className="loading-fallback">Loading...</div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product-tour" element={<ProductTour />} />
                <Route path="/features" element={<Features />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </div>
          <SiteFooter />
        </div>
        {!showSplash && (
          <Suspense fallback={null}>
            <ChatBot />
          </Suspense>
        )}
      </Router>
    </>
  );
}

function NotFound() {
  return (
    <div className="container">
      <header className="header">
        <div>
          <h1>404 - Page Not Found</h1>
          <div className="tagline">The page you’re looking for doesn’t exist.</div>
        </div>
      </header>
      <p><Link to="/">Go back home</Link></p>
    </div>
  );
}
