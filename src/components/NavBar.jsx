import React, { useState, useEffect, useCallback, memo } from 'react';
import { NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const links = [
  { to: '/', label: 'Home' },
  { to: '/product-tour', label: 'Product Tour' },
  { to: '/features', label: 'Features' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/faq', label: 'FAQ' }
];

const NavBar = memo(() => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth <= 900 : false);

  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth <= 900;
      setIsMobile(mobile);
      if (!mobile) setOpen(false); // force close when returning to desktop
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const toggle = useCallback(() => setOpen(o => !o), []);
  const close = useCallback(() => setOpen(false), []);

  return (
    <nav className="topnav" role="navigation" aria-label="Main navigation">
      <div className="topnav-inner">
        <NavLink to="/" className="brand" onClick={close}>CA Automation</NavLink>
        <div className="topnav-actions">
          {isMobile && <ThemeToggle />}
          {isMobile && (
            <button
              className="nav-toggle icon-btn"
              aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={open}
              onClick={toggle}
            >
              {open ? (
                <svg className="icon" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>
              ) : (
                <svg className="icon" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M3 12h18"/><path d="M3 18h18"/></svg>
              )}
            </button>
          )}
          <div className={`nav-links-wrapper ${isMobile && open ? 'open' : ''}`}>
            <div className="nav-links" onClick={isMobile ? close : undefined}>
              {links.map(l => (
                <NavLink key={l.to} to={l.to} className={({ isActive }) => (isActive ? 'active' : undefined)}>
                  {l.label}
                </NavLink>
              ))}
              {!isMobile && <ThemeToggle />}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
});

NavBar.displayName = 'NavBar';

export default NavBar;