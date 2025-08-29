import React, { useEffect, useState } from 'react';
import { fetchAbout } from '../services/api';

// PUBLIC_INTERFACE
export default function About() {
  /** About Us section with company intro and values. */
  const [data, setData] = useState(null);
  const [err, setErr] = useState('');

  useEffect(() => {
    fetchAbout().then(setData).catch(e => setErr(e.message));
  }, []);

  const values = data?.values || [
    { title: 'Customer Obsession', desc: 'We align to outcomes, not hours.' },
    { title: 'Craftsmanship', desc: 'Design and engineering with pride.' },
    { title: 'Velocity', desc: 'Short cycles, measurable impact.' },
  ];

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-header">
          <span className="kicker">About Us</span>
          <h2 className="h2">{data?.title || 'We partner as an extension of your product team.'}</h2>
          <p className="subtitle">{data?.intro || 'From discovery to scale, we bring experience across product, design, and engineering to deliver resilient software solutions.'}</p>
        </div>

        {err && <div className="notice error" style={{ marginBottom: 16 }}>{err}</div>}

        <div className="grid grid-3">
          {values.map((v, idx) => (
            <div className="card" key={idx}>
              <div className="card-title">
                <span className="badge">Value</span> {v.title}
              </div>
              <div style={{ color: 'var(--text-dim)' }}>{v.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
