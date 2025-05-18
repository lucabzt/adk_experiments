import React from 'react';
import './Header.css';

// A simple abstract logo SVG
const TeachAiLogo = () => (
  <svg width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 10C27.9086 10 10 27.9086 10 50C10 72.0914 27.9086 90 50 90" stroke="var(--accent-blue)" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M50 10C72.0914 10 90 27.9086 90 50C90 72.0914 72.0914 90 50 90" stroke="var(--accent-green)" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="0.1 110"/>
    <circle cx="50" cy="50" r="15" fill="var(--accent-blue)"/>
    <circle cx="50" cy="50" r="7" fill="var(--bg-primary)"/>
  </svg>
);


const Header = () => {
  return (
    <header className="app-header">
      <div className="header-left">
        <div className="logo-container">
          <TeachAiLogo />
          <span className="app-name">TeachAI</span>
        </div>
        <nav className="main-nav">
          <a href="#my-courses" className="nav-link active">My Courses</a>
          <a href="#explore" className="nav-link">Explore</a>
          {/* Add more links as needed */}
        </nav>
      </div>
      <div className="header-right">
        <nav className="auth-nav">
          <a href="#signup" className="auth-button secondary">Sign Up</a>
          <a href="#login" className="auth-button primary">Log In</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;