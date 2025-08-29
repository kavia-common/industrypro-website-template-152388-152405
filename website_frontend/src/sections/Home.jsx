import React, { useEffect, useState } from 'react';
import { fetchHome } from '../services/api';

// PUBLIC_INTERFACE
export default function Home() {
  /** Hero/Home section with value proposition and highlights. Includes reveal animations and enhanced CTA. */
  const [data, setData] = useState(null);
  const [err, setErr] = useState('');

  useEffect(() => {
    fetchHome().then(setData).catch(e => setErr(e.message));
  }, []);

  return (
    <section id="home" className="hero section" role="region" aria-labelledby="hero-heading">
      <div className="container">
        <span className="kicker reveal" data-aos="fade-down"><i className="fa fa-sparkles" aria-hidden="true" /> Trusted by leading teams</span>
        <h1 id="hero-heading" className="h1 reveal" data-aos="fade-up">{data?.headline || 'Build products faster with a partner you can trust.'}</h1>
        <p className="subtitle reveal" data-aos="fade-up" data-aos-delay="50">
          {data?.subheadline || 'We design, engineer, and scale digital experiences for modern enterprises.'}
        </p>

        <div className="cta-row reveal" data-aos="zoom-in" data-aos-delay="80">
          <a className="btn" href="#contact">
            <i className="fa fa-bolt" aria-hidden="true" /> {data?.primaryCta?.label || 'Start a Project'}
          </a>
          <a className="btn secondary" href="#services">
            <i className="fa fa-grid-2" aria-hidden="true" /> {data?.secondaryCta?.label || 'Explore Services'}
          </a>
        </div>

        {err ? (
          <div className="notice error" style={{ marginTop: 16 }}>{err}</div>
        ) : (
          <div className="hero-highlights reveal" data-aos="fade-up" data-aos-delay="120" aria-label="Key highlights">
            {(data?.highlights || [
              'ISO-grade delivery', 'Senior engineers', 'Outcome driven'
            ]).map((h, i) => (
              <div key={i} className="pill"><i className="fa fa-check" aria-hidden="true" /> {h}</div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
