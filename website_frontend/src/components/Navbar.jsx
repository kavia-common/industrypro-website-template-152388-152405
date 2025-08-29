import React, { useState } from 'react';

// PUBLIC_INTERFACE
export default function Navbar() {
  /** Modern sticky navbar with brand and anchor links. */
  const [open, setOpen] = useState(false);
  const links = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#why', label: 'Why Us' },
    { href: '#contact', label: 'Contact' }
  ];

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <div className="brand">
          <span className="dot" aria-hidden />
          <span>IndustryPro</span>
        </div>
        <div className="navlinks">
          {links.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
          <a className="btn" href="#contact">Let’s Talk</a>
        </div>
        <button className="btn secondary mobile-toggle" aria-label="Toggle Menu" onClick={() => setOpen(v => !v)}>
          ☰
        </button>
      </div>
      {open && (
        <div className="container" style={{ paddingBottom: 12 }}>
          <div className="card" style={{ marginTop: 8 }}>
            <div className="grid">
              {links.map(l => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ padding: 8 }}>
                  {l.label}
                </a>
              ))}
              <a className="btn" href="#contact" onClick={() => setOpen(false)}>Let’s Talk</a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
