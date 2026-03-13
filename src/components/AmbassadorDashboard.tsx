import { useState, useEffect, useCallback } from 'react';

const LOCATION_ID = 'iv9DRjJPqHFSq3pFsRq';
const API_BASE = 'https://api.leadprospecting.ai/api';
const SITE_URL = 'https://rockingradsprayfoam.com';

interface AmbassadorStats {
  ambassador: {
    firstName: string;
    lastName: string;
    slug: string;
    totalClicks: number;
    totalConversions: number;
    totalPoints: number;
    totalCommission: number;
    status: string;
  };
  referralLink: string;
  recentConversions: Array<{
    purchaserName?: string;
    totalPointsAwarded: number;
    createdAt: string;
  }>;
}

export default function AmbassadorDashboard() {
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [stats, setStats] = useState<AmbassadorStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  // Verify magic link token or restore session
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      // Verify the magic link token
      fetch(`${API_BASE}/ambassador/auth/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.sessionToken) {
            localStorage.setItem('amb_session', data.sessionToken);
            localStorage.setItem('amb_email', data.ambassador?.email || data.email || '');
            localStorage.setItem('amb_locationId', LOCATION_ID);
            setSessionToken(data.sessionToken);
            setEmail(data.ambassador?.email || data.email);
            // Clean URL
            window.history.replaceState({}, '', '/ambassador/dashboard');
          } else {
            setError('Invalid or expired magic link. Please request a new one.');
            setLoading(false);
          }
        })
        .catch(() => {
          setError('Failed to verify magic link. Please try again.');
          setLoading(false);
        });
    } else {
      // Try to restore existing session
      const savedToken = localStorage.getItem('amb_session');
      const savedEmail = localStorage.getItem('amb_email');
      if (savedToken && savedEmail) {
        setSessionToken(savedToken);
        setEmail(savedEmail);
      } else {
        setLoading(false);
      }
    }
  }, []);

  // Fetch stats once we have a session
  const fetchStats = useCallback(async () => {
    if (!email) return;
    try {
      const res = await fetch(`${API_BASE}/ambassador/stats?locationId=${LOCATION_ID}&email=${encodeURIComponent(email)}`);
      const data = await res.json();
      if (res.ok) {
        setStats(data);
      } else {
        // Session might be invalid
        setError('Session expired. Please sign in again.');
        localStorage.removeItem('amb_session');
        localStorage.removeItem('amb_email');
        setSessionToken(null);
      }
    } catch {
      setError('Unable to load dashboard. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [email]);

  useEffect(() => {
    if (sessionToken && email) {
      fetchStats();
    }
  }, [sessionToken, email, fetchStats]);

  function handleLogout() {
    localStorage.removeItem('amb_session');
    localStorage.removeItem('amb_email');
    localStorage.removeItem('amb_locationId');
    setSessionToken(null);
    setStats(null);
    setEmail(null);
  }

  function copyLink() {
    if (!stats) return;
    const link = `${SITE_URL}?ref=${stats.ambassador.slug}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // Not logged in
  if (!sessionToken && !loading) {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">Sign In Required</h2>
        <p className="text-neutral-600 mb-6">
          You need to sign in to access your ambassador dashboard.
        </p>
        <a href="/ambassador#join" className="btn-primary inline-block px-6 py-3">
          Sign In / Sign Up
        </a>
        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
            {error}
          </div>
        )}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-accent-orange"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700 mb-4">{error}</div>
        <a href="/ambassador#join" className="btn-primary inline-block px-6 py-3">Sign In Again</a>
      </div>
    );
  }

  if (!stats) return null;

  const referralLink = `${SITE_URL}?ref=${stats.ambassador.slug}`;
  const shareText = encodeURIComponent(`Check out Rocking Rad Spray Foam for your insulation needs! ${referralLink}`);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">
            Welcome back, {stats.ambassador.firstName}!
          </h2>
          <p className="text-sm text-neutral-500">Ambassador Dashboard</p>
        </div>
        <button onClick={handleLogout} className="text-sm text-neutral-500 underline hover:text-neutral-700">
          Sign Out
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-neutral-200 rounded-xl p-5">
          <p className="text-sm text-neutral-500">Total Clicks</p>
          <p className="text-3xl font-bold text-neutral-900">{stats.ambassador.totalClicks}</p>
        </div>
        <div className="bg-white border border-neutral-200 rounded-xl p-5">
          <p className="text-sm text-neutral-500">Referrals</p>
          <p className="text-3xl font-bold text-neutral-900">{stats.ambassador.totalConversions}</p>
        </div>
        <div className="bg-white border border-neutral-200 rounded-xl p-5">
          <p className="text-sm text-neutral-500">Points Earned</p>
          <p className="text-3xl font-bold text-accent-orange">{stats.ambassador.totalPoints}</p>
        </div>
        <div className="bg-white border border-neutral-200 rounded-xl p-5">
          <p className="text-sm text-neutral-500">Commission</p>
          <p className="text-3xl font-bold text-green-600">${(stats.ambassador.totalCommission / 100).toFixed(2)}</p>
        </div>
      </div>

      {/* Referral Link */}
      <div className="bg-white border border-neutral-200 rounded-xl p-6">
        <h3 className="font-bold text-lg mb-3">Your Referral Link</h3>
        <div className="flex gap-2 mb-4">
          <input
            readOnly
            value={referralLink}
            className="flex-1 px-4 py-2.5 border border-neutral-300 rounded-lg bg-neutral-50 text-sm"
          />
          <button onClick={copyLink} className="btn-primary px-5 py-2.5 text-sm whitespace-nowrap">
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-medium text-white bg-[#1877F2]"
          >
            Facebook
          </a>
          <a
            href={`https://wa.me/?text=${shareText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-medium text-white bg-[#25D366]"
          >
            WhatsApp
          </a>
          <a
            href={`sms:?body=${shareText}`}
            className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-medium text-white bg-emerald-500"
          >
            Text
          </a>
          <a
            href={`mailto:?subject=${encodeURIComponent('Check out Rocking Rad Spray Foam!')}&body=${shareText}`}
            className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-medium text-white bg-neutral-500"
          >
            Email
          </a>
        </div>
      </div>

      {/* Recent Activity */}
      {stats.recentConversions && stats.recentConversions.length > 0 && (
        <div className="bg-white border border-neutral-200 rounded-xl p-6">
          <h3 className="font-bold text-lg mb-3">Recent Referrals</h3>
          <div className="space-y-3">
            {stats.recentConversions.map((conv, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-neutral-100 last:border-0">
                <div>
                  <p className="font-medium text-sm">{conv.purchaserName || 'Referral'}</p>
                  <p className="text-xs text-neutral-500">
                    {new Date(conv.createdAt).toLocaleDateString('en-US', {
                      month: 'short', day: 'numeric', year: 'numeric',
                    })}
                  </p>
                </div>
                <span className="text-sm font-bold text-accent-orange">+{conv.totalPointsAwarded} pts</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-brand-blue/5 border border-brand-blue/20 rounded-xl p-6">
        <h3 className="font-bold text-lg text-brand-blue mb-3">Tips to Earn More</h3>
        <ul className="space-y-2 text-sm text-neutral-700">
          <li className="flex items-start gap-2">
            <span className="text-accent-orange font-bold mt-0.5">1.</span>
            <span>Share your link on Facebook and local community groups</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-orange font-bold mt-0.5">2.</span>
            <span>Text your referral link to friends who have been complaining about energy bills</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-orange font-bold mt-0.5">3.</span>
            <span>If you're a realtor or contractor, share with clients who need insulation</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-orange font-bold mt-0.5">4.</span>
            <span>Mention your experience with Rocking Rad when someone asks for recommendations</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
