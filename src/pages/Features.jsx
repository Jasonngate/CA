import React from 'react';
import { Link } from 'react-router-dom';
import { FileSpreadsheet, Calculator, FileText, FolderOpen } from 'lucide-react';

export default function Features() {
  return (
    <div className="container page-container" style={{ paddingTop: 80 }}>
      
      {/* Header */}
      <section className="page-hero">
        <div className="hero-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        <span className="badge gradient">Feature Overview</span>
        <h1 className="page-title">
          Powerful Tools for Smarter Compliance
        </h1>
        <p className="page-subtitle">
          Explore all the intelligent modules built into <strong>CA Automation</strong> — 
          each crafted to simplify accounting workflows, improve accuracy, and save hours every month.
        </p>
      </section>

      {/* Feature Cards */}
      <section className="section">
        <div className="enhanced-grid">
          <div className="enhanced-card card-blue">
            <div className="card-icon">
              <FileSpreadsheet className="icon" />
            </div>
            <h3>GST Reconciliation</h3>
            <p>
              Upload your <code>.xlsx</code> GSTR-2B and GSTR-3B files — 
              the system automatically reconciles invoices, flags mismatches, 
              and generates downloadable exception summaries with accuracy insights.
            </p>
          </div>

          <div className="enhanced-card card-purple">
            <div className="card-icon">
              <Calculator className="icon" />
            </div>
            <h3>TDS Calculation</h3>
            <p>
              Compute TDS across multiple client files in seconds. 
              Auto-detect applicable sections, calculate deductions, 
              and export summary sheets for review and filing.
            </p>
          </div>

          <div className="enhanced-card card-green">
            <div className="card-icon">
              <FileText className="icon" />
            </div>
            <h3>Invoice Extraction</h3>
            <p>
              Extract invoice numbers, GSTINs, values, and dates from PDFs or scanned invoices 
              using AI-based OCR and pattern recognition — ensuring accuracy even in bulk uploads.
            </p>
          </div>

          <div className="enhanced-card card-orange">
            <div className="card-icon">
              <FolderOpen className="icon" />
            </div>
            <h3>Ledger Classification</h3>
            <p>
              Classify thousands of ledger entries into accounting categories automatically. 
              Supports multi-client data with clear, structured outputs for audits and analysis.
            </p>
          </div>
        </div>

        <p className="section-sub" style={{ marginTop: 40 }}>
          ⚙️ Each module integrates with your dashboard for unified management, data visualization, 
          and Excel exports ready for audit or filing.
        </p>
      </section>

      {/* CTA Band */}
      <section className="section-tight">
        <div className="cta-band">
          <h2>Want to See It in Action?</h2>
          <p>
            Take a guided tour through the workflow or head directly to your dashboard to start automating.
          </p>
          <div className="cta-actions">
            <Link to="/product-tour" className="button light">Take Product Tour</Link>
            <Link to="/dashboard" className="button dark">Open Dashboard</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
