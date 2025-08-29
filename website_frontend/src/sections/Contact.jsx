import React, { useEffect, useState } from 'react';
import { fetchContactMeta, submitContact } from '../services/api';

// PUBLIC_INTERFACE
export default function Contact() {
  /** Contact Us section with form wired to backend. Enhanced with accessibility, animations, and validation hints. */
  const [meta, setMeta] = useState(null);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', company: '', topic: '', message: ''
  });

  useEffect(() => {
    fetchContactMeta().then(setMeta).catch(() => setMeta(null));
  }, []);

  const topics = meta?.topics || ['General', 'Partnership', 'Services', 'Careers'];

  const onChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const validate = () => {
    if (!form.name.trim()) return 'Please enter your name.';
    if (!/\S+@\S+\.\S+/.test(form.email)) return 'Please enter a valid email.';
    if (!form.topic.trim()) return 'Please select a topic.';
    if (form.message.trim().length < 10) return 'Message should be at least 10 characters.';
    return '';
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (v) {
      setStatus({ type: 'error', message: v });
      return;
    }
    setLoading(true);
    setStatus({ type: '', message: '' });
    try {
      await submitContact(form);
      setStatus({ type: 'success', message: 'Thanks! We received your message and will get back shortly.' });
      setForm({ name: '', email: '', company: '', topic: '', message: '' });
    } catch (err) {
      setStatus({ type: 'error', message: err.message || 'Failed to submit. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section" role="form" aria-labelledby="contact-heading">
      <div className="container">
        <div className="section-header">
          <span className="kicker reveal" data-aos="fade-up"><i className="fa fa-envelope" aria-hidden="true" /> Contact Us</span>
          <h2 id="contact-heading" className="h2 reveal" data-aos="fade-up" data-aos-delay="60">{meta?.title || 'Let’s build something great together'}</h2>
          <p className="subtitle reveal" data-aos="fade-up" data-aos-delay="100">{meta?.subtitle || 'Tell us about your goals. We’ll reach out within 1–2 business days.'}</p>
        </div>

        {status.message && (
          <div className={`notice ${status.type}`} style={{ marginBottom: 16 }} role="status" aria-live="polite">
            {status.message}
          </div>
        )}

        <form className="card reveal" data-aos="fade-up" onSubmit={onSubmit} noValidate>
          <div className="form-row">
            <div>
              <label className="helper" htmlFor="name">Full name</label>
              <div style={{ position: 'relative' }}>
                <i className="fa fa-user" aria-hidden="true" style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-dim)' }} />
                <input id="name" className="input" name="name" placeholder="Jane Doe" value={form.name} onChange={onChange} style={{ paddingLeft: 36 }} />
              </div>
            </div>
            <div>
              <label className="helper" htmlFor="email">Work email</label>
              <div style={{ position: 'relative' }}>
                <i className="fa fa-at" aria-hidden="true" style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-dim)' }} />
                <input id="email" className="input" name="email" type="email" placeholder="jane@company.com" value={form.email} onChange={onChange} style={{ paddingLeft: 36 }} />
              </div>
            </div>
          </div>

          <div className="form-row" style={{ marginTop: 12 }}>
            <div>
              <label className="helper" htmlFor="company">Company</label>
              <div style={{ position: 'relative' }}>
                <i className="fa fa-building" aria-hidden="true" style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-dim)' }} />
                <input id="company" className="input" name="company" placeholder="Acme Inc." value={form.company} onChange={onChange} style={{ paddingLeft: 36 }} />
              </div>
            </div>
            <div>
              <label className="helper" htmlFor="topic">Topic</label>
              <div style={{ position: 'relative' }}>
                <i className="fa fa-tag" aria-hidden="true" style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-dim)' }} />
                <select id="topic" className="input" name="topic" value={form.topic} onChange={onChange} style={{ paddingLeft: 36 }}>
                  <option value="">Select a topic…</option>
                  {topics.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 12 }}>
            <label className="helper" htmlFor="message">How can we help?</label>
            <div style={{ position: 'relative' }}>
              <i className="fa fa-message" aria-hidden="true" style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-dim)' }} />
              <textarea id="message" className="input" name="message" rows={5} placeholder="Describe your goals or challenges…" value={form.message} onChange={onChange} style={{ paddingLeft: 36 }} />
            </div>
            <div className="helper" aria-hidden="true" style={{ marginTop: 6 }}>Minimum 10 characters.</div>
          </div>

          <div className="form-actions">
            <button className="btn" type="submit" disabled={loading}>
              <i className="fa fa-paper-plane" aria-hidden="true" /> {loading ? 'Sending…' : 'Send message'}
            </button>
            <span className="helper">We’ll never share your information.</span>
          </div>
        </form>
      </div>
    </section>
  );
}
