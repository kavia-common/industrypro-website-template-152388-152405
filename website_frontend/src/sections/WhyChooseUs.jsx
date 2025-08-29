import React, { useEffect, useState } from 'react';
import { fetchWhyChooseUs } from '../services/api';

// PUBLIC_INTERFACE
export default function WhyChooseUs() {
  /** Trust signals and advantages grid. Adds scroll reveal animations. */
  const [data, setData] = useState(null);
  const [err, setErr] = useState('');

  useEffect(() => {
    fetchWhyChooseUs().then(setData).catch(e => setErr(e.message));
  }, []);

  const points = data?.points || [
    { title: 'Proven Delivery', desc: 'On-time, on-budget delivery with transparent communication.' },
    { title: 'Senior Talent', desc: 'Designers and engineers with deep product experience.' },
    { title: 'Security & Compliance', desc: 'Best practices with privacy-by-design.' },
    { title: 'Scalable Engagement', desc: 'Flexible commercial models, embedded teams.' },
    { title: 'Quality Engineering', desc: 'Automated testing, CI/CD, and observability.' },
    { title: 'Cloud-native', desc: 'Resilient architectures built for scale.' },
  ];

  return (
    <section id="why" className="section" role="region" aria-labelledby="why-heading">
      <div className="container">
        <div className="section-header">
          <span className="kicker reveal" data-aos="fade-up"><i className="fa fa-star" aria-hidden="true" /> Why Choose Us</span>
          <h2 id="why-heading" className="h2 reveal" data-aos="fade-up" data-aos-delay="60">{data?.title || 'Outcomes over output'}</h2>
          <p className="subtitle reveal" data-aos="fade-up" data-aos-delay="100">{data?.subtitle || 'We focus on measurable business impact and long-term partnerships.'}</p>
        </div>

        {err && <div className="notice error" style={{ marginBottom: 16 }}>{err}</div>}

        <div className="grid grid-3">
          {points.map((p, idx) => (
            <div className="card reveal" data-aos="fade-up" data-aos-delay={idx * 60} key={idx}>
              <div className="card-title">
                <span className="badge">Advantage</span> {p.title}
              </div>
              <div style={{ color: 'var(--text-dim)' }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
