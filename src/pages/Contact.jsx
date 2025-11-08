import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Contact() {
  return (
    <div className="container page-container" style={{ paddingTop: 80, maxWidth: 1000 }}>
      
      {/* Header */}
      <section className="page-hero">
        <div className="hero-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        </div>
        <span className="badge gradient">Get in Touch</span>
        <h1 className="page-title">
          Contact Us
        </h1>
        <p className="page-subtitle">
          We'd love to hear from you — whether you're a Chartered Accountant, 
          finance professional, or curious about automation.  
          Reach out to our team for support, demos, or partnership inquiries.
        </p>
      </section>

      {/* Contact Info Cards */}
      <section className="section" style={{ paddingTop: 30 }}>
        <div className="enhanced-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
          <div className="enhanced-card card-blue" style={{ textAlign: 'center' }}>
            <div className="card-icon">
              <Mail className="icon" />
            </div>
            <h3>Email Us</h3>
            <p>
              <a href="mailto:support@ca-automation.example" style={{ color: 'var(--brand)', fontWeight: 600 }}>
                support@ca-automation.example
              </a>
            </p>
          </div>
          <div className="enhanced-card card-purple" style={{ textAlign: 'center' }}>
            <div className="card-icon">
              <Phone className="icon" />
            </div>
            <h3>Call Us</h3>
            <p>
              <a href="tel:+1800123456" style={{ color: 'var(--brand)', fontWeight: 600 }}>
                +1 800 123 456
              </a>
            </p>
          </div>
          <div className="enhanced-card card-green" style={{ textAlign: 'center' }}>
            <div className="card-icon">
              <MapPin className="icon" />
            </div>
            <h3>Office</h3>
            <p style={{ color: 'var(--muted)' }}>
              2nd Floor, FinEdge Tech Park, Mumbai, India
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-alt" style={{ borderRadius: 16, marginTop: 30 }}>
        <h2 className="section-heading" style={{ marginBottom: 12 }}>
          Send Us a Message
        </h2>
        <p className="section-sub">
          Have questions or feedback? Drop your details below — we’ll get back to you shortly.
        </p>

        <form
          className="fade-up"
          style={{
            display: 'grid',
            gap: 16,
            maxWidth: 600,
            margin: '40px auto 0'
          }}
          onSubmit={(e) => e.preventDefault()}
        >
          <input aria-label="Your name" required placeholder="Full Name" className="contact-input" />
          <input type="email" aria-label="Your email" required placeholder="Email Address" className="contact-input" />
          <textarea aria-label="Message" required placeholder="Your Message" rows={5} className="contact-input" />
          <button className="button gradient" type="submit">
            Send Message (Demo)
          </button>
          <div className="tagline" style={{ fontSize: 12, color: 'var(--muted)' }}>
            *This form is illustrative. Connect to backend to enable submission.
          </div>
        </form>
      </section>

      {/* CTA Band */}
      <section className="section-tight">
        <div className="cta-band">
          <h2>Looking to Automate Your Accounting?</h2>
          <p>
            Explore our modules or take a guided tour to see how CA Automation 
            can simplify compliance for your team.
          </p>
          <div className="cta-actions">
            <Link to="/features" className="button light">Explore Features</Link>
            <Link to="/product-tour" className="button dark">Take Product Tour</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
