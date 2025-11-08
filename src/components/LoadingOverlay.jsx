import React from 'react';
import '../styles/spinner.css';

export default function LoadingOverlay({ text = 'Loading' }) {
  return (
    <div className="overlay" aria-live="polite" aria-label={text}>
      <div className="spinner" />
      <div style={{ fontSize: 14, color: '#c9d7ec' }}>{text}</div>
    </div>
  );
}
