import React from 'react';

// PUBLIC_INTERFACE
export default function Footer() {
  /** Minimal modern footer with copyright and quick links. */
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>© {year} IndustryPro Template. All rights reserved.</div>
        <div style={{ display: 'flex', gap: 12 }}>
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </footer>
  );
}
