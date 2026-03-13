import { useState, type FormEvent } from 'react';

const LOCATION_ID = 'iv9DRjJPqHFSq3pFsRq';
const API_BASE = 'https://api.leadprospecting.ai/api';

const projectTypes = [
  'Attic Insulation',
  'Metal Building / Pole Barn',
  'Crawl Space',
  'Residential Walls',
  'Commercial Building',
  'New Construction',
  'Other',
];

const cities = [
  'Ada', 'Oklahoma City', 'Norman', 'Tulsa', 'Shawnee',
  'McAlester', 'Durant', 'Ardmore', 'Stillwater', 'Other',
];

function parseName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return { firstName: parts[0], lastName: '' };
  return { firstName: parts[0], lastName: parts.slice(1).join(' ') };
}

function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
  return phone;
}

declare global {
  interface Window {
    getAmbassadorAttribution?: () => {
      slug: string;
      sessionId: string;
      landingPath: string;
      timestamp: number;
      expiry: number;
    } | null;
  }
}

export default function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError('');

    const form = new FormData(e.currentTarget);
    const fullName = (form.get('name') as string) || '';
    const { firstName, lastName } = parseName(fullName);
    const phone = (form.get('phone') as string) || '';
    const email = (form.get('email') as string) || '';
    const city = (form.get('city') as string) || '';
    const projectType = (form.get('projectType') as string) || '';
    const details = (form.get('details') as string) || '';

    // Check for ambassador attribution
    const attribution = window.getAmbassadorAttribution?.() ?? null;

    const tags = ['website_contact', 'free_estimate'];
    if (projectType) tags.push(`project_${projectType.toLowerCase().replace(/[\s\/]+/g, '_')}`);
    if (city) tags.push(`city_${city.toLowerCase().replace(/\s+/g, '_')}`);
    if (attribution) tags.push('ambassador_referral');

    const source = attribution
      ? `Ambassador Referral (${attribution.slug}) — ${projectType || 'General Inquiry'}`
      : `Website Contact Form — ${projectType || 'General Inquiry'}`;

    try {
      const response = await fetch(`${API_BASE}/public/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locationId: LOCATION_ID,
          firstName,
          lastName,
          email: email || undefined,
          phone: phone ? formatPhone(phone) : undefined,
          tags,
          source,
          notes: [city, projectType, details].filter(Boolean).join(' | '),
        }),
      });

      const data = await response.json();

      if (response.ok || data.success) {
        setSubmitted(true);

        // Fire ambassador lead tracking (non-blocking)
        if (attribution && (email || phone)) {
          fetch(`${API_BASE}/ambassador/track-lead`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              locationId: LOCATION_ID,
              ambassadorSlug: attribution.slug,
              leadEmail: email || `${formatPhone(phone)}@phone.placeholder`,
              leadName: fullName,
              leadPhone: phone ? formatPhone(phone) : undefined,
              eventType: 'free_estimate',
              sessionId: attribution.sessionId,
              landingPath: attribution.landingPath,
              attributionMethod: 'cookie',
            }),
          }).catch(() => { /* silent fail */ });
        }
      } else {
        setError(data.message || 'Something went wrong. Please try again or call us directly.');
      }
    } catch {
      setError('Unable to connect. Please call us at (580) 320-5620.');
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <h3 className="font-bold text-xl text-green-800 mb-2">Thank You!</h3>
        <p className="text-green-700">
          We've received your request and will contact you within 24 hours to schedule your free estimate.
        </p>
        <p className="text-green-600 text-sm mt-4">
          Need faster response? Call us at{' '}
          <a href="tel:5803205620" className="font-bold underline">(580) 320-5620</a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-accent-orange outline-none text-sm"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-accent-orange outline-none text-sm"
            placeholder="(555) 123-4567"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-accent-orange outline-none text-sm"
          placeholder="you@email.com"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-neutral-700 mb-1">
            City *
          </label>
          <select
            id="city"
            name="city"
            required
            className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-accent-orange outline-none text-sm bg-white"
          >
            <option value="">Select your city</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="projectType" className="block text-sm font-medium text-neutral-700 mb-1">
            Project Type *
          </label>
          <select
            id="projectType"
            name="projectType"
            required
            className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-accent-orange outline-none text-sm bg-white"
          >
            <option value="">Select project type</option>
            {projectTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="details" className="block text-sm font-medium text-neutral-700 mb-1">
          Project Details
        </label>
        <textarea
          id="details"
          name="details"
          rows={3}
          className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-accent-orange outline-none text-sm resize-none"
          placeholder="Tell us about your project — approximate size, any specific concerns, etc."
        />
      </div>

      <button
        type="submit"
        disabled={sending}
        className="w-full btn-primary text-base py-3 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {sending ? 'Sending...' : 'Request Your Free Estimate'}
      </button>

      <p className="text-xs text-neutral-500 text-center">
        No spam, no obligation. We typically respond within 24 hours.
      </p>
    </form>
  );
}
