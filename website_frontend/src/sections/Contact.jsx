import React, { useEffect, useState } from 'react';
import { fetchContactMeta, submitContact } from '../services/api';

// PUBLIC_INTERFACE
export default function Contact() {
  /** Contact Us section with form wired to backend. */
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
    <section id="contact" className="section">
      <div className="container">
        <div className="section-header">
          <span className="kicker">Contact Us</span>
          <h2 className="h2">{meta?.title || 'Let’s build something great together'}</h2>
          <p className="subtitle">{meta?.subtitle || 'Tell us about your goals. We’ll reach out within 1–2 business days.'}</p>
        </div>

        {status.message && (
          <div className={`notice ${status.type}`} style={{ marginBottom: 16 }}>
            {status.message}
          </div>
        )}

        <form className="card" onSubmit={onSubmit} noValidate>
          <div className="form-row">
            <div>
              <label className="helper">Full name</label>
              <input className="input" name="name" placeholder="Jane Doe" value={form.name} onChange={onChange} />
            </div>
            <div>
              <label className="helper">Work email</label>
              <input className="input" name="email" type="email" placeholder="jane@company.com" value={form.email} onChange={onChange} />
            </div>
          </div>

          <div className="form-row" style={{ marginTop: 12 }}>
            <div>
              <label className="helper">Company</label>
              <input className="input" name="company" placeholder="Acme Inc." value={form.company} onChange={onChange} />
            </div>
            <div>
              <label className="helper">Topic</label>
              <select className="input" name="topic" value={form.topic} onChange={onChange}>
                <option value="">Select a topic…</option>
                {topics.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div style={{ marginTop: 12 }}>
            <label className="helper">How can we help?</label>
            <textarea className="input" name="message" rows={5} placeholder="Describe your goals or challenges…" value={form.message} onChange={onChange} />
          </div>

          <div className="form-actions">
            <button className="btn" type="submit" disabled={loading}>
              {loading ? 'Sending…' : 'Send message'}
            </button>
            <span className="helper">We’ll never share your information.</span>
          </div>
        </form>
      </div>
    </section>
  );
}
