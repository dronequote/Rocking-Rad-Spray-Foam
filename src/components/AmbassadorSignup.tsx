import { useState, type FormEvent } from 'react';

const LOCATION_ID = 'iv9DRjJPqHFSq3pFsRq';
const API_BASE = 'https://api.leadprospecting.ai/api';

export default function AmbassadorSignup() {
  const [mode, setMode] = useState<'signup' | 'login'>('signup');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function handleSignup(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    const form = new FormData(e.currentTarget);
    const firstName = (form.get('firstName') as string) || '';
    const lastName = (form.get('lastName') as string) || '';
    const email = (form.get('email') as string) || '';
    const phone = (form.get('phone') as string) || '';
    const slug = (form.get('slug') as string) || '';

    try {
      const res = await fetch(`${API_BASE}/ambassador/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locationId: LOCATION_ID,
          firstName,
          lastName,
          email,
          phone: phone || undefined,
          slug: slug || undefined,
        }),
      });
      const data = await res.json();
      if (res.ok || data.success) {
        setMessage('Welcome aboard! Check your email for a magic link to access your ambassador dashboard.');
        setMode('login');
      } else {
        setError(data.error || data.message || 'Signup failed. Please try again.');
      }
    } catch {
      setError('Unable to connect. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    const form = new FormData(e.currentTarget);
    const email = (form.get('email') as string) || '';

    try {
      const res = await fetch(`${API_BASE}/ambassador/auth/magic-link`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locationId: LOCATION_ID, email }),
      });
      const data = await res.json();
      if (res.ok || data.success) {
        setMessage('Check your email for a magic link to sign in to your dashboard.');
      } else {
        setError(data.error || data.message || 'Failed to send magic link.');
      }
    } catch {
      setError('Unable to connect. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 max-w-md mx-auto">
      {mode === 'signup' ? (
        <>
          <h3 className="text-xl font-bold text-neutral-900 mb-1">Become an Ambassador</h3>
          <p className="text-sm text-neutral-600 mb-6">
            Sign up to get your unique referral link and start earning rewards.
          </p>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="amb-first" className="block text-sm font-medium text-neutral-700 mb-1">First Name *</label>
                <input type="text" id="amb-first" name="firstName" required
                  className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-accent-orange focus:border-accent-orange outline-none" />
              </div>
              <div>
                <label htmlFor="amb-last" className="block text-sm font-medium text-neutral-700 mb-1">Last Name *</label>
                <input type="text" id="amb-last" name="lastName" required
                  className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-accent-orange focus:border-accent-orange outline-none" />
              </div>
            </div>
            <div>
              <label htmlFor="amb-email" className="block text-sm font-medium text-neutral-700 mb-1">Email *</label>
              <input type="email" id="amb-email" name="email" required
                className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-accent-orange focus:border-accent-orange outline-none"
                placeholder="you@email.com" />
            </div>
            <div>
              <label htmlFor="amb-phone" className="block text-sm font-medium text-neutral-700 mb-1">Phone (optional)</label>
              <input type="tel" id="amb-phone" name="phone"
                className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-accent-orange focus:border-accent-orange outline-none"
                placeholder="(555) 123-4567" />
            </div>
            <div>
              <label htmlFor="amb-slug" className="block text-sm font-medium text-neutral-700 mb-1">Custom Referral ID (optional)</label>
              <input type="text" id="amb-slug" name="slug"
                className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-accent-orange focus:border-accent-orange outline-none"
                placeholder="jane-smith"
                onInput={(e) => {
                  const input = e.target as HTMLInputElement;
                  input.value = input.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
                }} />
              <p className="text-xs text-neutral-500 mt-1">Your unique ID for referral links (letters, numbers, hyphens only)</p>
            </div>
            <button type="submit" disabled={loading}
              className="w-full btn-primary text-base py-3 disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? 'Signing Up...' : 'Join the Program'}
            </button>
            <p className="text-center text-sm text-neutral-500">
              Already an ambassador?{' '}
              <button type="button" onClick={() => { setMode('login'); setError(''); setMessage(''); }}
                className="font-semibold text-accent-orange underline">Sign in</button>
            </p>
          </form>
        </>
      ) : (
        <>
          <h3 className="text-xl font-bold text-neutral-900 mb-1">Ambassador Login</h3>
          <p className="text-sm text-neutral-600 mb-6">
            Enter your email and we'll send you a magic link to access your dashboard.
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="amb-login-email" className="block text-sm font-medium text-neutral-700 mb-1">Email *</label>
              <input type="email" id="amb-login-email" name="email" required
                className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-accent-orange focus:border-accent-orange outline-none"
                placeholder="you@email.com" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full btn-primary text-base py-3 disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? 'Sending...' : 'Send Magic Link'}
            </button>
            <p className="text-center text-sm text-neutral-500">
              New here?{' '}
              <button type="button" onClick={() => { setMode('signup'); setError(''); setMessage(''); }}
                className="font-semibold text-accent-orange underline">Sign up</button>
            </p>
          </form>
        </>
      )}

      {message && (
        <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-700 text-center">
          {message}
        </div>
      )}
      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700 text-center">
          {error}
        </div>
      )}
    </div>
  );
}
