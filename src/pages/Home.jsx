import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/globals.css';

export default function Home() {
  return (
    <div className="home">
      <div className="container">

        {/* HERO SECTION */}
        <section className="hero text-center py-24">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Automate Accounting. Amplify Accuracy.
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-lg">
            CA Automation is an AI-powered platform built for Chartered Accountants and finance professionals.
            It automates GST reconciliation, TDS computation, and invoice extraction — faster, cleaner, and error-free.
          </p>
          <div className="flex justify-center flex-wrap" style={{ gap: '24px', marginTop: '20px' }}>
            <Link className="button gradient" style={{ marginRight: '6px' }} to="/dashboard">Launch Dashboard</Link>
            <Link className="button light" style={{ marginLeft: '6px' }} to="/features">See How It Works</Link>
          </div>
        </section>

        {/* HIGHLIGHTS SECTION */}
        <section className="section">
          <h2 className="section-heading">Smart Financial Automation. Made Simple.</h2>
          <p className="section-sub max-w-3xl mx-auto mb-12">
            Streamline compliance workflows with intelligent modules designed for accuracy, scalability, and transparency.
          </p>

          <div className="cards-grid">
            {[
              {
                title: 'GST Reconciliation',
                text: 'Automatically match invoices between GSTR-2B and GSTR-3B. Identify mismatches, missing invoices, and unmatched credits in seconds.',
              },
              {
                title: 'TDS Computation',
                text: 'Auto-calculate TDS deductions with section-wise accuracy and generate summarized reports for filing and review.',
              },
              {
                title: 'Invoice Extraction',
                text: 'Extract key invoice details from PDFs using OCR and regex — structured, validated, and ready for compliance.',
              },
              {
                title: 'Exception Reports',
                text: 'Review flagged mismatches and missing data instantly with an AI-powered audit-ready exception dashboard.',
              },
              {
                title: 'Excel Export Engine',
                text: 'Generate polished, formatted Excel reports for audit, filing, and data validation in one click.',
              },
              {
                title: 'Data Privacy',
                text: 'All processing happens locally — your financial data never leaves your environment.',
              },
            ].map((item, idx) => (
              <div className="info-card hover:shadow-md transition-all duration-300" key={idx}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* COMPARISON TABLE SECTION */}
        <section className="section section-alt">
          <h2 className="section-heading">Manual vs Automated Workflows</h2>
          <p className="section-sub mb-10">
            See how CA Automation transforms tedious manual work into smart, auditable, and efficient processing.
          </p>

          <div className="comparison-wrapper overflow-x-auto">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Aspect</th>
                  <th>Manual Accounting</th>
                  <th>CA Automation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Processing Time</td>
                  <td>2–3 hours for large GST files</td>
                  <td><strong>Under 5 minutes</strong> per reconciliation</td>
                </tr>
                <tr>
                  <td>Error Rate</td>
                  <td>Prone to human copy-paste mistakes</td>
                  <td><strong>99% accuracy</strong> through automated logic</td>
                </tr>
                <tr>
                  <td>Audit Trail</td>
                  <td>No clear record of changes</td>
                  <td><strong>Full traceability</strong> with exception summaries</td>
                </tr>
                <tr>
                  <td>Scalability</td>
                  <td>Manual effort increases with data</td>
                  <td><strong>Processes 10,000+ rows</strong> without slowdown</td>
                </tr>
                <tr>
                  <td>Output Format</td>
                  <td>Unstructured spreadsheets</td>
                  <td><strong>Standardized Excel reports</strong> for audit filing</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA BAND */}
        <section className="section-tight">
          <div className="cta-band">
            <h2 className="text-3xl font-semibold mb-4">
              Ready to Automate Your Compliance?
            </h2>
            <p className="text-gray-100 mb-6">
              Start simplifying your accounting workflow — accurate, fast, and audit-ready.
            </p>
            <div className="cta-actions flex justify-center gap-4 flex-wrap">
              <Link className="button light" to="/dashboard">Get Started</Link>
              <Link className="button dark" to="/contact">Request a Demo</Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
