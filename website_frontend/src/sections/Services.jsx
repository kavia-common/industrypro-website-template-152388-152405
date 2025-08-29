import React, { useEffect, useState } from 'react';
import { fetchServices } from '../services/api';

// PUBLIC_INTERFACE
export default function Services() {
  /** Services section with industry verticals and offerings. */
  const [data, setData] = useState(null);
  const [err, setErr] = useState('');

  useEffect(() => {
    fetchServices().then(setData).catch(e => setErr(e.message));
  }, []);

  const verticals = data?.verticals || [
    { name: 'Education', items: ['LMS platforms', 'Virtual classrooms', 'Assessment engines'] },
    { name: 'Field Services', items: ['Scheduling & dispatch', 'Mobile apps', 'IoT integrations'] },
    { name: 'Fitness & Wellbeing', items: ['Member apps', 'Wearable integrations', 'Coaching portals'] },
    { name: 'Personal Services', items: ['Booking platforms', 'Payments', 'CRM'] },
    { name: 'Payments & Technology', items: ['Payment orchestration', 'Billing & invoicing', 'Compliance'] },
    { name: 'Product Eng. & Design', items: ['MVPs', 'UX/UI', 'Cloud-native'] },
  ];

  return (
    <section id="services" className="section">
      <div className="container">
        <div className="section-header">
          <span className="kicker">Services</span>
          <h2 className="h2">{data?.title || 'Expertise across critical verticals'}</h2>
          <p className="subtitle">{data?.subtitle || 'Composable capabilities to accelerate your roadmap.'}</p>
        </div>

        {err && <div className="notice error" style={{ marginBottom: 16 }}>{err}</div>}

        <div className="grid grid-3">
          {verticals.map((v, i) => (
            <div className="card" key={i}>
              <div className="card-title">
                <span className="badge">Vertical</span> {v.name}
              </div>
              <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--text-dim)' }}>
                {v.items.map((it, k) => <li key={k}>{it}</li>)}
              </ul>
              <div style={{ marginTop: 12 }}>
                <a href="#contact" className="btn secondary">Talk to us</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
