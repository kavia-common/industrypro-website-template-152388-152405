import React from 'react';

// PUBLIC_INTERFACE
export default function Footer() {
  /** Minimal modern footer with copyright and quick links. */
  const year = new Date().getFullYear();
  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer-inner">
        <div className="reveal" data-aos="fade-up">© {year} IndustryPro Template. All rights reserved.</div>
        <div style={{ display: 'flex', gap: 12 }}>
          <a className="reveal" data-aos="fade-up" data-aos-delay="40" href="#privacy">Privacy</a>
          <a className="reveal" data-aos="fade-up" data-aos-delay="80" href="#terms">Terms</a>
          <a className="reveal" data-aos="fade-up" data-aos-delay="120" href="#contact">Contact</a>
        </div>
      </div>
    </footer>
  );
}
