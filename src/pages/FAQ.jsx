import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    q: 'Which file types are supported?',
    a: 'GST: .xlsx, TDS: .csv/.xlsx, Invoice: .pdf/.png/.jpg, Ledger: .csv/.xlsx. Each module validates your upload type automatically.'
  },
  {
    q: 'Is my data stored?',
    a: 'In this demo, all uploads are processed in-memory and discarded after output generation. No data is permanently stored or shared externally.'
  },
  {
    q: 'Can I integrate my own APIs?',
    a: 'Yes. You can replace the simulate* functions with real API calls to your Flask or external services using secure endpoints.'
  },
  {
    q: 'Do you validate financial correctness?',
    a: 'The current version ensures structural accuracy and field validation. Upcoming updates will include rule-based and ML-backed financial checks.'
  },
  {
    q: 'How do I report issues or request features?',
    a: 'You can email support@ca-automation.example with sample files, logs, or feature suggestions. Our team usually responds within 24 hours.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container page-container" style={{ paddingTop: 80, maxWidth: 1000 }}>
      
      {/* Header */}
      <section className="page-hero">
        <div className="hero-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        </div>
        <span className="badge gradient">Help & Support</span>
        <h1 className="page-title">
          Frequently Asked Questions
        </h1>
        <p className="page-subtitle">
          Quick answers to common queries about CA Automation — setup, usage, and integration.
        </p>
      </section>

      {/* FAQ List */}
      <section className="section">
        <div className="faq-list" style={{ display: 'grid', gap: 16 }}>
          {faqs.map((f, i) => (
            <div
              key={i}
              className="faq-card"
              onClick={() => toggleFAQ(i)}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <h3 style={{ margin: 0, fontSize: 17, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <HelpCircle size={18} /> {f.q}
                </h3>
                {openIndex === i ? (
                  <ChevronUp size={20} color="var(--brand)" />
                ) : (
                  <ChevronDown size={20} color="var(--muted)" />
                )}
              </div>
              {openIndex === i && (
                <p
                  style={{
                    marginTop: 12,
                    color: 'var(--muted)',
                    lineHeight: 1.6,
                    fontSize: 15
                  }}
                >
                  {f.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Band */}
      <section className="section-tight">
        <div className="cta-band">
          <h2>Need More Help?</h2>
          <p>
            If your question isn’t listed here, reach out to our support team or explore product features for guidance.
          </p>
          <div className="cta-actions">
            <Link to="/contact" className="button light">Contact Support</Link>
            <Link to="/product-tour" className="button dark">Take a Product Tour</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
