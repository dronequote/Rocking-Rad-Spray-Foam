/**
 * Initialize Ambassador Program Config for Rocking Rad Spray Foam
 * Location ID: iv9DRjJPqHFSq3pFsRq
 *
 * Run this once to create the ambassador_configs document in MongoDB
 * via the LPAI NestJS API.
 *
 * Usage:
 *   node scripts/init-ambassador-config.js
 *
 * Prerequisites:
 *   - The location iv9DRjJPqHFSq3pFsRq must already exist in MongoDB
 *   - The NestJS API must be running at https://api.leadprospecting.ai
 */

const LOCATION_ID = 'iv9DRjJPqHFSq3pFsRq';
const API_BASE = 'https://api.leadprospecting.ai/api';

const config = {
  programName: 'Rocking Rad Referral Program',
  programEnabled: true,
  programType: 'points',
  domain: 'rockingradsprayfoam.com',
  websiteUrl: 'https://rockingradsprayfoam.com',
  branding: {
    name: 'Rocking Rad Spray Foam',
    logo: 'https://rockingradsprayfoam.com/images/rocking-rad-spray-foam-logo-full-color.png',
    primaryColor: '#8B1A1A',
    accentColor: '#C41E1E',
    tagline: 'Refer friends & earn rewards for spray foam insulation referrals',
    supportEmail: 'rockingradsprayfoam@gmail.com',
  },
  attributionWindowDays: 90,
  autoApproveAmbassadors: true,
  trackableProducts: [
    {
      productId: 'free_estimate',
      productName: 'Free Estimate Request',
      provider: 'website',
      enabled: true,
      rewardType: 'points',
      rewardValue: 100,
      category: 'leads',
    },
    {
      productId: 'attic_insulation',
      productName: 'Attic Insulation Project',
      provider: 'ghl',
      enabled: true,
      rewardType: 'points',
      rewardValue: 500,
      category: 'projects',
    },
    {
      productId: 'metal_building',
      productName: 'Metal Building / Pole Barn Project',
      provider: 'ghl',
      enabled: true,
      rewardType: 'points',
      rewardValue: 750,
      category: 'projects',
    },
    {
      productId: 'commercial',
      productName: 'Commercial Insulation Project',
      provider: 'ghl',
      enabled: true,
      rewardType: 'points',
      rewardValue: 1000,
      category: 'projects',
    },
  ],
  rewards: [
    {
      name: '$25 Gift Card',
      description: 'A $25 gift card to a retailer of your choice',
      pointCost: 500,
      active: true,
      quantityAvailable: 50,
    },
    {
      name: '$50 Gift Card',
      description: 'A $50 gift card to a retailer of your choice',
      pointCost: 1000,
      active: true,
      quantityAvailable: 25,
    },
    {
      name: '$100 Gift Card',
      description: 'A $100 gift card — our top reward for dedicated ambassadors',
      pointCost: 2000,
      active: true,
      quantityAvailable: 10,
    },
  ],
  promotions: [],
  shareableLinks: [
    { label: 'Free Estimate', path: '/contact', active: true },
    { label: 'Services', path: '/services', active: true },
    { label: 'Reviews', path: '/reviews', active: true },
    { label: 'Savings Calculator', path: '/savings-calculator', active: true },
  ],
  leaderboard: {
    enabled: true,
    showTopN: 10,
    resetPeriod: 'monthly',
    displayMetric: 'points',
  },
  sharing: {
    shareMessage: 'Check out Rocking Rad Spray Foam for insulation in Oklahoma! Woman-owned, BBB A+ rated, free estimates.',
    pointsPerShare: 5,
    pointsPerClick: 1,
    pointsPerSignup: 50,
    platforms: ['facebook', 'twitter', 'whatsapp', 'email', 'sms'],
  },
};

async function initConfig() {
  console.log(`Initializing ambassador config for location ${LOCATION_ID}...`);

  try {
    // First check if config already exists
    const checkRes = await fetch(`${API_BASE}/ambassador/config?locationId=${LOCATION_ID}`);
    if (checkRes.ok) {
      const existing = await checkRes.json();
      if (existing && existing.locationId) {
        console.log('Config already exists! Updating...');
      }
    }

    // Create/update config
    const res = await fetch(`${API_BASE}/ambassador/config/${LOCATION_ID}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config),
    });

    if (res.ok) {
      const data = await res.json();
      console.log('Ambassador config initialized successfully!');
      console.log(JSON.stringify(data, null, 2));
    } else {
      const err = await res.json().catch(() => ({}));
      console.error(`Failed (${res.status}):`, err);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

initConfig();
