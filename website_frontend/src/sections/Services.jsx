import React, { useEffect, useState } from 'react';
import { fetchServices } from '../services/api';

// PUBLIC_INTERFACE
export default function Services() {
  /** Services section with industry verticals and offerings. Adds reveal animations and icons. */
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
    <section id="services" className="section" role="region" aria-labelledby="services-heading">
      <div className="container">
        <div className="section-header">
          <span className="kicker reveal" data-aos="fade-up"><i className="fa fa-grid" aria-hidden="true" /> Services</span>
          <h2 id="services-heading" className="h2 reveal" data-aos="fade-up" data-aos-delay="60">{data?.title || 'Expertise across critical verticals'}</h2>
          <p className="subtitle reveal" data-aos="fade-up" data-aos-delay="100">{data?.subtitle || 'Composable capabilities to accelerate your roadmap.'}</p>
        </div>

        {err && <div className="notice error" style={{ marginBottom: 16 }}>{err}</div>}

        <div className="grid grid-3">
          {verticals.map((v, i) => (
            <div className="card reveal" data-aos="fade-up" data-aos-delay={i * 60} key={i}>
              <div className="card-title">
                <span className="badge">Vertical</span> {v.name}
              </div>
              <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--text-dim)' }}>
                {v.items.map((it, k) => <li key={k}>{it}</li>)}
              </ul>
              <div style={{ marginTop: 12 }}>
                <a href="#contact" className="btn secondary"><i className="fa fa-message" aria-hidden="true" /> Talk to us</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
