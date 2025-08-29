import React, { useEffect, useState } from 'react';
import { fetchHome } from '../services/api';

// PUBLIC_INTERFACE
export default function Home() {
  /** Hero/Home section with value proposition and highlights. */
  const [data, setData] = useState(null);
  const [err, setErr] = useState('');

  useEffect(() => {
    fetchHome().then(setData).catch(e => setErr(e.message));
  }, []);

  return (
    <section id="home" className="hero section">
      <div className="container">
        <span className="kicker">Trusted by leading teams</span>
        <h1 className="h1">{data?.headline || 'Build products faster with a partner you can trust.'}</h1>
        <p className="subtitle">{data?.subheadline || 'We design, engineer, and scale digital experiences for modern enterprises.'}</p>

        <div className="cta-row">
          <a className="btn" href="#contact">{data?.primaryCta?.label || 'Start a Project'}</a>
          <a className="btn secondary" href="#services">{data?.secondaryCta?.label || 'Explore Services'}</a>
        </div>

        {err ? (
          <div className="notice error" style={{ marginTop: 16 }}>{err}</div>
        ) : (
          <div className="hero-highlights">
            {(data?.highlights || [
              'ISO-grade delivery', 'Senior engineers', 'Outcome driven'
            ]).map((h, i) => (
              <div key={i} className="pill">• {h}</div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
