import React, { useEffect } from 'react';

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    const t = setTimeout(onFinish, 1800);
    return () => clearTimeout(t);
  }, [onFinish]);
  return (
    <div className="splash" role="alert" aria-live="polite">
      <div className="splash-inner splash-animate">
        <div className="splash-title gradient-text" style={{ letterSpacing: '0.5px' }}>CA Automation</div>
        <div className="splash-tag fade-up">Accelerating Compliance Intelligence</div>
        <div className="loading-bars" aria-hidden="true">
          <span /><span /><span /><span />
        </div>
      </div>
    </div>
  );
}
