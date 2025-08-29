/**
 * Minimal API client for backend content and contact submission.
 * Uses REACT_APP_BACKEND_URL as base; defaults to relative "".
 */

// PUBLIC_INTERFACE
export const getApiBaseUrl = () => {
  /** Returns the API base URL from environment variable or empty string for same-origin proxy. */
  return process.env.REACT_APP_BACKEND_URL || '';
};

async function handle(resp) {
  if (!resp.ok) {
    const text = await resp.text().catch(() => '');
    const message = text || `Request failed with ${resp.status}`;
    throw new Error(message);
  }
  const ct = resp.headers.get('content-type') || '';
  if (ct.includes('application/json')) return resp.json();
  return resp.text();
}

// PUBLIC_INTERFACE
export async function fetchHome() {
  /** Fetch Home section content. */
  return handle(await fetch(`${getApiBaseUrl()}/api/home`));
}

// PUBLIC_INTERFACE
export async function fetchAbout() {
  /** Fetch About Us section content. */
  return handle(await fetch(`${getApiBaseUrl()}/api/about`));
}

// PUBLIC_INTERFACE
export async function fetchServices() {
  /** Fetch Services section content. */
  return handle(await fetch(`${getApiBaseUrl()}/api/services`));
}

// PUBLIC_INTERFACE
export async function fetchWhyChooseUs() {
  /** Fetch Why Choose Us content. */
  return handle(await fetch(`${getApiBaseUrl()}/api/why-choose-us`));
}

// PUBLIC_INTERFACE
export async function fetchContactMeta() {
  /** Fetch Contact Us content and form schema. */
  return handle(await fetch(`${getApiBaseUrl()}/api/contact`));
}

// PUBLIC_INTERFACE
export async function submitContact(payload) {
  /** Submit contact form to backend. */
  return handle(await fetch(`${getApiBaseUrl()}/api/contact/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }));
}
