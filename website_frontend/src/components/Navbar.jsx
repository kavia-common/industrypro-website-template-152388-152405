import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// PUBLIC_INTERFACE
export default function Navbar() {
  /** Modern sticky navbar with brand and anchor links. Includes scroll-reactive background and mobile menu. */
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const links = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#why', label: 'Why Us' },
    { href: '#contact', label: 'Contact' }
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const currentHash = typeof window !== 'undefined' ? window.location.hash || '#home' : '#home';

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} aria-label="Primary">
      <div className="container navbar-inner">
        <a className="brand" href="#home" aria-label="IndustryPro Home">
          <span className="dot" aria-hidden />
          <span>IndustryPro</span>
        </a>
        <div className="navlinks" role="menubar" aria-label="Primary">
          {links.map(l => (
            <motion.a
              key={l.href}
              href={l.href}
              role="menuitem"
              aria-current={currentHash === l.href ? 'page' : undefined}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              {l.label}
            </motion.a>
          ))}
          <motion.a className="btn" href="#contact" whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
            <i className="fa fa-paper-plane" aria-hidden="true" /> Let’s Talk
          </motion.a>
        </div>
        <button
          className="btn secondary mobile-toggle"
          aria-label="Toggle Menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(v => !v)}
        >
          <i className="fa fa-bars" aria-hidden="true" />
        </button>
      </div>
      {open && (
        <div id="mobile-menu" className="container" style={{ paddingBottom: 12 }}>
          <div className="card" style={{ marginTop: 8 }}>
            <div className="grid">
              {links.map(l => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ padding: 8 }}>
                  {l.label}
                </a>
              ))}
              <a className="btn" href="#contact" onClick={() => setOpen(false)}>
                <i className="fa fa-paper-plane" aria-hidden="true" /> Let’s Talk
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
