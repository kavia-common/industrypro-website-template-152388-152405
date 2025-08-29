import React, { useEffect } from 'react';
import './theme.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './sections/Home';
import About from './sections/About';
import Services from './sections/Services';
import WhyChooseUs from './sections/WhyChooseUs';
import Contact from './sections/Contact';
import 'aos/dist/aos.css';
import AOS from 'aos';

// PUBLIC_INTERFACE
function App() {
  /** Root SPA that renders all sections and sets up global behaviors (smooth-scroll, reveal animations). */
  useEffect(() => {
    // Smooth-scroll for anchor links
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href').slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (typeof window !== 'undefined' && window.history && window.history.replaceState) {
        window.history.replaceState(null, '', `#${id}`);
      }
    };
    document.addEventListener('click', onClick);

    // Initialize AOS for scroll reveal
    try {
      AOS.init({
        duration: 700,
        delay: 50,
        offset: 80,
        once: true,
        easing: 'ease-out-cubic'
      });
    } catch (_) {
      // no-op if AOS unavailable
    }

    // IntersectionObserver fallback for .reveal elements
    const ro = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('in-view');
      });
    }, { threshold: 0.2 }) : null;

    const els = document.querySelectorAll('.reveal');
    els.forEach(el => ro && ro.observe(el));

    return () => {
      document.removeEventListener('click', onClick);
      if (ro) ro.disconnect();
    };
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <section aria-label="Hero">
          <Home />
        </section>

        <section aria-label="Trusted by" className="section">
          <div className="container">
            <div className="kicker"><i className="fa fa-shield-check" aria-hidden="true" /> Trusted by</div>
            <div className="trust-logos" style={{ marginTop: 18 }}>
              {['ACME', 'SYNOVIQ', 'NORTHWIND', 'MISTRAL', 'XPLOR', 'GLOBEX'].map((n) => (
                <div key={n} className="logo reveal" data-aos="fade-up" aria-label={`Logo ${n}`}>
                  {n}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section aria-label="About">
          <About />
        </section>

        <section aria-label="Services">
          <Services />
        </section>

        <section aria-label="Why choose us">
          <WhyChooseUs />
        </section>

        <section aria-label="Contact">
          <Contact />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
