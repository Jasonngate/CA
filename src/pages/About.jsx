import React from 'react';
import { Link } from 'react-router-dom';
import { Target, BarChart3, Users, Rocket } from 'lucide-react';

export default function About() {
  return (
    <div className="container page-container" style={{ paddingTop: 80 }}>
      
      {/* Hero Section */}
      <section className="page-hero">
        <div className="hero-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
          </svg>
        </div>
        <span className="badge gradient">About CA Automation</span>
        <h1 className="page-title">
          Empowering Accountants with Smart Automation
        </h1>
        <p className="page-subtitle">
          Our mission is to accelerate <strong>compliance intelligence</strong> for Chartered Accountants and finance teams.  
          We build automation that enhances accuracy, transparency, and decision-making — not just speed.
        </p>
      </section>

      {/* Story / Philosophy Section */}
      <section className="section">
        <div className="enhanced-grid">
          <div className="enhanced-card card-blue">
            <div className="card-icon">
              <Target className="icon" />
            </div>
            <h3>Our Purpose</h3>
            <p>
              We created <strong>CA Automation</strong> to eliminate repetitive manual reconciliation work, 
              giving professionals more time for insight and client strategy.  
              Our tools are designed to be transparent, predictable, and easy to trust.
            </p>
          </div>

          <div className="enhanced-card card-purple">
            <div className="card-icon">
              <BarChart3 className="icon" />
            </div>
            <h3>Our Approach</h3>
            <p>
              Every feature is backed by structured data models, deterministic logic, and AI-assisted validation.  
              From GST reconciliation to ledger classification — every workflow is built for clarity and compliance accuracy.
            </p>
          </div>

          <div className="enhanced-card card-green">
            <div className="card-icon">
              <Users className="icon" />
            </div>
            <h3>Built for Teams</h3>
            <p>
              Whether you're a solo CA or a large finance department, our platform scales effortlessly.  
              Secure processing, instant exports, and collaborative dashboards help teams stay aligned.
            </p>
          </div>

          <div className="enhanced-card card-orange">
            <div className="card-icon">
              <Rocket className="icon" />
            </div>
            <h3>Our Vision</h3>
            <p>
              We’re building toward intelligent anomaly detection, API federation, 
              and multi-user collaboration — enabling data-driven decision-making in compliance management.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="section-alt text-center">
        <h2 className="section-heading">Our Philosophy</h2>
        <p className="section-sub">
          We believe automation should be <strong>assistive</strong>, not opaque.  
          That’s why CA Automation focuses on accuracy, transparency, and user control — 
          ensuring every report, reconciliation, and ledger classification remains auditable and explainable.
        </p>
      </section>

      {/* CTA Band */}
      <section className="section-tight">
        <div className="cta-band">
          <h2>Join the Future of Financial Automation</h2>
          <p>
            Experience the clarity and performance of intelligent accounting tools.  
            Explore our modules or take a guided product tour today.
          </p>
          <div className="cta-actions">
            <Link to="/features" className="button light">Explore Features</Link>
            <Link to="/product-tour" className="button dark">Take a Tour</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
