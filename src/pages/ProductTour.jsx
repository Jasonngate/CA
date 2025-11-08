import React from 'react';
import { Link } from 'react-router-dom';
import { Upload, FileSpreadsheet, CheckCircle2, Repeat2 } from 'lucide-react';

export default function ProductTour() {
  return (
    <div className="container" style={{ paddingTop: 80 }}>
      {/* Header */}
      <section className="section-tight text-center">
        <span className="badge">Guided Walkthrough</span>
        <h1 className="section-heading" style={{ marginTop: 16 }}>
          Take a Quick Tour of CA Automation
        </h1>
        <p className="section-sub">
          Learn how to process your GST, TDS, and ledger files with intelligent automation.
          Follow these steps to see how easily you can streamline compliance tasks.
        </p>
      </section>

      {/* Steps Section */}
      <section className="section">
        <div className="cards-grid">
          <div className="info-card">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileSpreadsheet size={20} /> Step 1: Access Dashboard
            </h3>
            <p>
              Go to the <Link to="/dashboard">Dashboard</Link> to view available automation tools —
              GST Reconciliation, TDS Computation, Invoice Extraction, and Ledger Classification.
            </p>
          </div>

          <div className="info-card">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Upload size={20} /> Step 2: Upload Your File
            </h3>
            <p>
              Choose the relevant module and click <strong>Upload</strong>. 
              For GST, upload your GSTR-2B or GSTR-3B Excel files; for invoices, upload PDF documents.
            </p>
          </div>

          <div className="info-card">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={20} /> Step 3: AI Processing
            </h3>
            <p>
              The system validates, reconciles, and classifies your data automatically.
              Exception mismatches are highlighted for easy review.
            </p>
          </div>

          <div className="info-card">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Repeat2 size={20} /> Step 4: Review & Export
            </h3>
            <p>
              Once processing is complete, review the generated summaries or download the final
              <code> _checked.xlsx</code> reports — formatted and ready for audit.
            </p>
          </div>
        </div>

        <p className="section-sub" style={{ marginTop: 40 }}>
          💡 <strong>Tip:</strong> For best results, ensure uploaded Excel files have consistent column headers and
          follow government GSTR templates. The system automatically detects duplicates and missing GSTINs.
        </p>
      </section>

      {/* CTA Band */}
      <section className="section-tight">
        <div className="cta-band">
          <h2>Ready to Experience the Automation?</h2>
          <p>
            Jump straight into your dashboard or explore feature-wise tools for your next compliance cycle.
          </p>
          <div className="cta-actions">
            <Link to="/dashboard" className="button light">Open Dashboard</Link>
            <Link to="/features" className="button dark">Explore Features</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
