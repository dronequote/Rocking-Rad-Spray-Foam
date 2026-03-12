export const company = {
  name: 'Rocking Rad Spray Foam LLC',
  shortName: 'Rocking Rad Spray Foam',
  phone: '(580) 320-5620',
  phoneRaw: '5803205620',
  email: 'rockingradsprayfoam@gmail.com',
  address: {
    street: 'Ada',
    city: 'Ada',
    state: 'Oklahoma',
    stateAbbr: 'OK',
    zip: '74820',
  },
  coordinates: {
    lat: 34.7746,
    lng: -96.6783,
  },
  hours: 'Mon–Fri: 7:00 AM – 5:00 PM | Sat: By Appointment',
  social: {
    facebook: 'https://www.facebook.com/rockingradsprayfoam',
    google: 'https://g.page/rockingradsprayfoam',
  },
  differentiators: [
    'Woman-Owned Business',
    'Minority-Owned Business',
    'BBB A+ Rated',
    'Licensed Home Builders',
    '94% Facebook Recommendation Rate',
  ],
  stats: {
    yearsInBusiness: 7, // Established 2019 per logo
    projectsCompleted: 500, // TODO: Verify with client
    googleRating: 5.0,
    facebookRecommendation: 94,
  },
  financing: {
    available: true,
    terms: '0% Financing Available',
    taxCredit: '30% Federal Tax Credit (up to $1,200)',
  },
  seo: {
    defaultTitle: 'Rocking Rad Spray Foam | Spray Foam Insulation Oklahoma',
    titleTemplate: '%s | Rocking Rad Spray Foam',
    defaultDescription: 'Oklahoma\'s trusted spray foam insulation contractor. Woman-owned, BBB A+ rated. Open cell, closed cell, attic, metal building & commercial insulation. Free estimates. (580) 320-5620',
  },
};

export type Company = typeof company;
