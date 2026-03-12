export interface Service {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  heroImage: string;
  seoTitle: string;
  seoDescription: string;
  icon: string;
  benefits: { text: string; icon: string }[];
  applications: string[];
  rValue: string;
  costRange: string;
  content: string;
  faqs: { question: string; answer: string }[];
}

export const services: Service[] = [
  {
    slug: 'open-cell-spray-foam',
    name: 'Open Cell Spray Foam Insulation',
    shortName: 'Open Cell',
    tagline: 'Affordable comfort for every Oklahoma home',
    description: 'Open cell spray foam expands to fill every crack and gap, creating an airtight seal that keeps Oklahoma\'s extreme heat and cold where they belong — outside. At roughly half the cost of closed cell, it\'s the smart choice for interior walls, attics, and anywhere you need maximum coverage on a budget.',
    heroImage: '/images/open-cell-spray-foam.jpg',
    seoTitle: 'Open Cell Spray Foam Insulation Oklahoma',
    seoDescription: 'Professional open cell spray foam insulation in Oklahoma. R-3.7 per inch, airtight seal, noise reduction. Free estimates from Rocking Rad Spray Foam. (580) 320-5620',
    icon: 'Wind',
    benefits: [
      { text: 'R-3.7 per inch of insulation value', icon: 'Thermometer' },
      { text: 'Expands 100x to seal every crack and gap', icon: 'Wind' },
      { text: 'Excellent sound dampening between rooms', icon: 'Volume2' },
      { text: 'Lower cost per square foot than closed cell', icon: 'DollarSign' },
      { text: 'Ideal for interior applications and attics', icon: 'Target' },
      { text: 'Creates a continuous air barrier', icon: 'Wind' },
    ],
    applications: ['Attics', 'Interior walls', 'Ceilings', 'Bonus rooms', 'Soundproofing projects'],
    rValue: 'R-3.7 per inch',
    costRange: '$0.44–$0.65 per board foot',
    content: `Open cell spray foam is a half-pound density foam that expands roughly 100 times its liquid volume when applied. That expansion is what makes it so effective — it reaches into every crack, gap, and irregular surface that rigid insulation boards and fiberglass batts simply can't touch.

For Oklahoma homeowners dealing with 100°+ summers and ice storms in winter, that airtight seal matters more than R-value alone. A fiberglass batt might have a similar R-value on paper, but the moment wind pushes through gaps around it, that number means nothing. Open cell foam eliminates those gaps entirely.

## Where Open Cell Works Best

Open cell is the go-to choice for attics, interior walls, and ceilings. It's softer and more flexible than closed cell, which makes it ideal for areas where the structure might shift slightly over time — like roof decking that expands and contracts with Oklahoma's temperature swings.

It also dampens sound significantly. If you've got a bonus room above the garage, a home office, or bedrooms that share walls with living spaces, open cell foam cuts noise transfer by 50% or more compared to fiberglass.

## What It Costs

Open cell spray foam typically runs $0.44–$0.65 per board foot installed. For a standard 1,500 sq ft attic sprayed at 5.5 inches, you're looking at roughly $3,630–$5,363. That's a fraction of what you'd spend on closed cell for the same area, and the energy savings start from day one.

The 30% federal tax credit (up to $1,200) through the Inflation Reduction Act applies to spray foam insulation installed in your primary residence. That can knock $1,000+ off your project cost.

## Open Cell vs. Closed Cell

The decision comes down to where you're insulating and what you need. Open cell is the better value for interior applications where moisture isn't a concern. It costs less, fills gaps just as effectively, and provides solid R-value. Choose closed cell when you need the vapor barrier properties — crawl spaces, exterior walls, or metal buildings where condensation is an issue.

Not sure which is right for your project? That's what the free estimate is for. We'll walk your property, assess your needs, and recommend the best foam type for your specific situation.`,
    faqs: [
      {
        question: 'How long does open cell spray foam last?',
        answer: 'Open cell spray foam is a permanent insulation solution. Once installed, it maintains its R-value and air sealing properties for the lifetime of the structure. Unlike fiberglass that sags and compresses over time, spray foam stays put.',
      },
      {
        question: 'Is open cell spray foam safe?',
        answer: 'Yes. Open cell spray foam is fully cured within 24 hours of installation. Once cured, it\'s inert and non-toxic. During installation, our crew uses full protective equipment and ventilates the space. We follow all manufacturer safety protocols.',
      },
      {
        question: 'Can open cell spray foam get wet?',
        answer: 'Open cell foam can absorb water, which is why we recommend it for interior applications rather than below-grade or exterior use. For crawl spaces, basements, and metal buildings where moisture is a concern, closed cell is the better choice.',
      },
    ],
  },
  {
    slug: 'closed-cell-spray-foam',
    name: 'Closed Cell Spray Foam Insulation',
    shortName: 'Closed Cell',
    tagline: 'Maximum protection for Oklahoma\'s toughest conditions',
    description: 'Closed cell spray foam delivers the highest R-value per inch of any insulation on the market — R-6.5 to R-7.0. It\'s also a vapor barrier, structural reinforcement, and air seal all in one application. For metal buildings, crawl spaces, and anywhere moisture is a factor, closed cell is the premium solution.',
    heroImage: '/images/closed-cell-spray-foam.jpg',
    seoTitle: 'Closed Cell Spray Foam Insulation Oklahoma',
    seoDescription: 'Closed cell spray foam insulation in Oklahoma. R-6.5+ per inch, vapor barrier, structural strength. BBB A+ rated. Free estimates. (580) 320-5620',
    icon: 'Shield',
    benefits: [
      { text: 'R-6.5 to R-7.0 per inch — highest available', icon: 'Thermometer' },
      { text: 'Built-in vapor barrier stops moisture dead', icon: 'Droplets' },
      { text: 'Adds structural rigidity to walls and roofs', icon: 'Shield' },
      { text: 'Resists water, flooding, and condensation', icon: 'Droplets' },
      { text: 'Ideal for metal buildings and crawl spaces', icon: 'Target' },
      { text: 'Meets code in thinner applications', icon: 'FileCheck' },
    ],
    applications: ['Metal buildings', 'Pole barns', 'Crawl spaces', 'Exterior walls', 'Commercial buildings', 'Basements'],
    rValue: 'R-6.5 to R-7.0 per inch',
    costRange: '$1.00–$1.60 per board foot',
    content: `Closed cell spray foam is a two-pound density foam that delivers R-6.5 to R-7.0 per inch — nearly double the insulation value of open cell. But R-value is only part of the story. Closed cell foam is also a Class II vapor retarder at just 2 inches thick, and at 3+ inches it functions as a vapor barrier. It adds measurable structural rigidity to any surface it's applied to. It's three products in one application.

For Oklahoma's metal buildings, pole barns, and commercial structures, closed cell is often the only insulation that makes sense. Metal conducts heat and cold aggressively and sweats with condensation. Closed cell foam bonds directly to the metal surface, stops condensation at the source, and creates an insulated envelope that transforms an unlivable metal box into a comfortable, climate-controlled space.

## Where Closed Cell Works Best

Any application where moisture is present or possible: crawl spaces, basements, exterior walls, rim joists, metal buildings, pole barns, and commercial structures. The vapor barrier properties eliminate the need for separate moisture barriers, and the structural reinforcement can improve a building's rack strength by up to 300%.

For new construction, closed cell in the exterior walls means you can hit code-required R-values in a standard 2x4 wall cavity — no need to upgrade to 2x6 framing. That saves the builder money on materials while delivering superior performance.

## What It Costs

Closed cell spray foam runs $1.00–$1.60 per board foot installed. It's a higher upfront investment than open cell, but for applications where you need moisture resistance, structural improvement, or maximum R-value in minimal thickness, it's the only real option.

A typical 2,000 sq ft metal building sprayed at 2 inches runs roughly $4,000–$6,400. The energy savings on a metal building can be dramatic — we've seen clients cut their heating and cooling costs by 40–60% after insulating a previously bare metal structure.

The 30% federal tax credit (up to $1,200) applies here too. Combined with the energy savings, closed cell foam pays for itself faster than most homeowners expect.

## The Investment Perspective

Think of closed cell spray foam as a permanent upgrade to your property — not an expense. The insulation value never degrades. The structural improvement is permanent. The moisture barrier doesn't wear out. Twenty years from now, the closed cell foam in your building will perform exactly as it does the day it's installed. That's the difference between spray foam and every other insulation type on the market.`,
    faqs: [
      {
        question: 'Is closed cell spray foam worth the extra cost?',
        answer: 'For metal buildings, crawl spaces, and any application where moisture is a concern — absolutely. Closed cell gives you insulation, vapor barrier, and structural reinforcement in one product. You\'d need three separate products to match what closed cell does in one application.',
      },
      {
        question: 'How thick should closed cell spray foam be?',
        answer: 'It depends on the application. For moisture barrier properties, 2 inches minimum. For metal buildings, 2–3 inches is standard. For walls in new construction, 3.5 inches fills a 2x4 cavity and exceeds code. We\'ll recommend the right thickness during your free estimate.',
      },
      {
        question: 'Does closed cell spray foam prevent condensation?',
        answer: 'Yes — this is one of its biggest advantages for metal buildings and pole barns. Closed cell foam bonds directly to the metal surface and acts as a vapor barrier, stopping the temperature differential that causes condensation. No more sweating walls and dripping ceilings.',
      },
    ],
  },
  {
    slug: 'attic-insulation',
    name: 'Attic Insulation & Air Sealing',
    shortName: 'Attic Insulation',
    tagline: 'Stop losing money through your roof',
    description: 'Your attic is where you\'re losing the most energy — and the most money. In Oklahoma\'s extreme heat, an uninsulated or under-insulated attic can reach 150°F, forcing your AC to fight a losing battle. Spray foam attic insulation seals and insulates in one step, cutting energy waste at the source.',
    heroImage: '/images/attic-insulation.jpg',
    seoTitle: 'Attic Insulation & Air Sealing Oklahoma',
    seoDescription: 'Professional attic insulation and air sealing in Oklahoma. Spray foam stops heat loss and cuts energy bills 30-50%. Free estimates. (580) 320-5620',
    icon: 'Home',
    benefits: [
      { text: 'Cut energy bills 30–50% by sealing the #1 heat loss zone', icon: 'DollarSign' },
      { text: 'Eliminate hot and cold spots throughout your home', icon: 'Thermometer' },
      { text: 'Stop ice dams and moisture damage in winter', icon: 'Droplets' },
      { text: 'Reduce HVAC strain and extend equipment life', icon: 'Cog' },
      { text: 'Seal out dust, allergens, and outdoor pollutants', icon: 'Wind' },
      { text: 'One-day installation for most residential attics', icon: 'Zap' },
    ],
    applications: ['Residential attics', 'Roof decking', 'Attic knee walls', 'Cathedral ceilings', 'Bonus rooms over garages'],
    rValue: 'R-20 to R-38 (varies by thickness and foam type)',
    costRange: '$3,600–$8,000 for a typical home',
    content: `In Oklahoma, your attic is ground zero for energy waste. During summer, an uninsulated attic can hit 150°F or higher. That heat radiates down through your ceiling, and your air conditioner has to work overtime to fight it. In winter, the warm air you're paying to heat rises straight through gaps and thin insulation into the attic and out through the roof.

The Department of Energy estimates that 25–40% of a home's heating and cooling energy escapes through the attic. For an Oklahoma home spending $200/month on utilities, that's $600–$960 per year — every year — going straight through the roof.

## Why Spray Foam Beats Traditional Attic Insulation

Fiberglass batts and blown-in insulation sit on the attic floor. They insulate, but they don't air seal. Every wire penetration, light fixture, plumbing vent, and HVAC chase is a gap that lets conditioned air escape and outdoor air infiltrate. Spray foam seals and insulates in one application — no gaps, no air bypass, no separate vapor barrier needed.

We typically spray the underside of the roof decking rather than the attic floor. This brings the attic inside the building envelope, which means your ductwork (which is usually in the attic) now runs through conditioned space instead of fighting 150°F air. That alone can improve HVAC efficiency by 20–30%.

## The Process

Most residential attic jobs take one day. We prep the space, mask off anything that needs protection, and spray the foam to the specified thickness. Open cell at 5.5 inches is the most common attic application — it fills the rafter bays completely and provides R-20. For higher R-values, we can go thicker or use closed cell.

After spraying, the foam cures within hours. You'll notice the difference the same day — your upstairs rooms will hold temperature better, your AC will cycle less frequently, and the house will feel noticeably more comfortable.

## What It Costs

A typical Oklahoma home attic (1,200–2,000 sq ft) runs $3,600–$8,000 depending on size, accessibility, foam type, and thickness. That investment typically pays for itself in energy savings within 3–5 years, then continues saving you money for the life of the home.

Don't forget the 30% federal tax credit — up to $1,200 back on your insulation project. That accelerates payback significantly.`,
    faqs: [
      {
        question: 'How long does attic insulation take to install?',
        answer: 'Most residential attic spray foam jobs take one day from setup to cleanup. Larger homes or complex attic layouts may take a day and a half. You can stay in your home during installation.',
      },
      {
        question: 'Should I remove old insulation before spraying foam?',
        answer: 'If we\'re spraying the roof decking (our recommended approach), old floor insulation can usually stay in place — it provides additional R-value. If the existing insulation is damaged, moldy, or pest-contaminated, we\'ll recommend removal first.',
      },
      {
        question: 'Will spray foam in my attic void my roof warranty?',
        answer: 'Spray foam applied to the underside of roof decking does not affect shingle warranties. The foam is on the interior side and doesn\'t interfere with roofing materials or ventilation. We follow manufacturer guidelines for every installation.',
      },
    ],
  },
  {
    slug: 'metal-building-insulation',
    name: 'Metal Building & Pole Barn Insulation',
    shortName: 'Metal Building',
    tagline: 'Turn your metal building into a year-round workspace',
    description: 'Oklahoma\'s metal buildings and pole barns face unique challenges: extreme heat conduction in summer, freezing surfaces in winter, and constant condensation. Spray foam is the only insulation that bonds directly to metal, eliminates condensation, and creates a fully climate-controlled space.',
    heroImage: '/images/metal-building-insulation.jpg',
    seoTitle: 'Metal Building & Pole Barn Insulation Oklahoma',
    seoDescription: 'Spray foam insulation for metal buildings and pole barns in Oklahoma. Stops condensation, cuts energy costs 40-60%. Free estimates. (580) 320-5620',
    icon: 'Warehouse',
    benefits: [
      { text: 'Eliminates condensation on metal surfaces', icon: 'Droplets' },
      { text: 'Cuts heating and cooling costs 40–60%', icon: 'DollarSign' },
      { text: 'Bonds directly to metal — no framing needed', icon: 'Target' },
      { text: 'Adds structural rigidity to walls and roof', icon: 'Shield' },
      { text: 'Protects equipment, livestock, and inventory', icon: 'ShieldCheck' },
      { text: 'Transforms unusable space into year-round workspace', icon: 'Warehouse' },
    ],
    applications: ['Pole barns', 'Metal shops', 'Agricultural buildings', 'Horse barns', 'Equipment storage', 'Commercial warehouses'],
    rValue: 'R-13 to R-14 at 2" closed cell (meets code)',
    costRange: '$4,000–$12,000 depending on building size',
    content: `Metal buildings are everywhere in Oklahoma — shops, pole barns, horse barns, equipment storage, commercial warehouses. They go up fast and they're built to last. But bare metal is a terrible insulator. In July, the interior of an uninsulated metal building can exceed 140°F. In January, every surface is cold enough to condensate, dripping water on equipment, feed, and anything stored inside.

Fiberglass batts stapled between purlins are the traditional "solution," but they sag, collect moisture, become rodent habitat, and lose R-value over time. Spray foam is a fundamentally different approach — it bonds directly to the metal surface, creating a monolithic insulated envelope with no gaps, no sag, and no condensation.

## Why Spray Foam Is the Only Real Solution for Metal

The condensation problem in metal buildings isn't about insulation — it's about the dew point. When warm interior air meets a cold metal surface, moisture condenses. Fiberglass doesn't stop this because air passes through it freely. Spray foam creates an air-and-vapor barrier bonded directly to the metal, preventing warm air from ever reaching the cold surface. No air contact means no condensation. Problem solved permanently.

Closed cell foam at 2 inches is the standard for metal buildings. It delivers R-13 to R-14, meets energy code, and provides the vapor barrier properties you need. For buildings that need higher R-values (climate-controlled shops, livestock barns in extreme cold), we go thicker.

## Common Metal Building Projects

**Shops and workspaces** — Temperature control for year-round work. Keep tools from rusting, equipment from overheating, and yourself comfortable whether it's August or February.

**Pole barns and horse barns** — Livestock comfort directly affects health and productivity. Spray foam eliminates the condensation drip that causes respiratory issues in horses and cattle, and maintains stable temperatures that reduce stress and feed costs.

**Commercial and industrial** — Warehouses, manufacturing facilities, retail spaces. Spray foam meets commercial energy code requirements and can qualify for utility rebates and the federal tax credit.

## What It Costs

A typical 30x50 (1,500 sq ft) metal building sprayed with 2 inches of closed cell runs roughly $6,000–$9,600. Larger buildings — 40x60, 50x100 — scale up accordingly. The per-board-foot rate ($1.00–$1.60) stays consistent; it's the square footage and thickness that drive the total.

For buildings with no existing climate control, the energy savings are dramatic. We've seen clients go from spending $400–$600/month on propane heating to under $150 after insulating. The foam pays for itself, then keeps paying you back.`,
    faqs: [
      {
        question: 'Can you spray foam an existing metal building?',
        answer: 'Absolutely. Most of our metal building projects are retrofits on existing structures. We spray directly onto the interior metal surface — walls and roof. No framing or furring strips needed. The foam bonds permanently to the metal.',
      },
      {
        question: 'Will spray foam stop my metal building from sweating?',
        answer: 'Yes — this is the primary reason most metal building owners contact us. Closed cell spray foam eliminates condensation by preventing warm interior air from reaching the cold metal surface. It\'s a permanent fix, not a band-aid.',
      },
      {
        question: 'How long does it take to insulate a metal building?',
        answer: 'A standard 30x50 shop typically takes 1–2 days. Larger buildings or complex layouts may take 2–3 days. We work quickly and clean up thoroughly — your building will be ready to use within 24 hours of completion.',
      },
    ],
  },
  {
    slug: 'commercial-insulation',
    name: 'Commercial & Industrial Insulation',
    shortName: 'Commercial',
    tagline: 'Energy performance that impacts your bottom line',
    description: 'For Oklahoma businesses, spray foam insulation isn\'t just about comfort — it\'s about operational costs, building performance, and meeting energy codes. From new construction to retrofit projects, we deliver commercial-grade insulation solutions that reduce overhead and improve working conditions.',
    heroImage: '/images/commercial-insulation.jpg',
    seoTitle: 'Commercial Spray Foam Insulation Oklahoma',
    seoDescription: 'Commercial and industrial spray foam insulation in Oklahoma. Energy code compliance, reduced operating costs. Licensed contractors. Free estimates. (580) 320-5620',
    icon: 'Building2',
    benefits: [
      { text: 'Meet or exceed Oklahoma commercial energy codes', icon: 'FileCheck' },
      { text: 'Reduce heating and cooling costs 30–50%', icon: 'DollarSign' },
      { text: 'Improve employee comfort and productivity', icon: 'Users' },
      { text: 'Protect inventory and equipment from temperature extremes', icon: 'ShieldCheck' },
      { text: 'Single-application insulation + air barrier + vapor barrier', icon: 'Zap' },
      { text: 'Minimal disruption to business operations', icon: 'Clock' },
    ],
    applications: ['Office buildings', 'Retail spaces', 'Restaurants', 'Warehouses', 'New construction', 'Cold storage'],
    rValue: 'Varies by application and code requirements',
    costRange: 'Project-dependent — request a commercial estimate',
    content: `Commercial insulation is a business decision, not just a building decision. Every dollar spent on heating and cooling an under-insulated commercial space is a dollar that comes straight off your bottom line — every month, every year, for the life of the building.

Spray foam insulation addresses commercial buildings differently than residential. The stakes are higher (larger spaces, higher energy consumption, code compliance requirements), and the solutions need to match. We bring the same precision and performance to a 50,000 sq ft warehouse that we bring to a residential attic — because the physics are the same, just at a different scale.

## Commercial Applications

**Office buildings and retail** — Temperature consistency across large floor plates. Eliminate hot and cold zones that drive employee complaints and customer discomfort. Spray foam's air sealing properties mean your HVAC system works with the building, not against it.

**Restaurants and food service** — Kitchen heat loads, walk-in cooler efficiency, and comfort in dining areas all benefit from proper insulation. Spray foam around walk-in coolers and freezers can reduce compressor run time by 20–30%.

**Warehouses and distribution** — Protect temperature-sensitive inventory. Reduce the massive energy costs of heating or cooling large-volume spaces. Closed cell foam on metal warehouse structures eliminates condensation that damages products and creates safety hazards.

**New construction** — We work directly with builders and general contractors on new commercial projects. Spray foam meets Oklahoma commercial energy codes in thinner applications than other insulation types, which can reduce framing costs and construction timelines.

## Why Builders Choose Us

We're not just insulation contractors — we're licensed home builders ourselves. We understand construction schedules, sequencing, and what it takes to keep a project moving. When we're on your job site, we show up on time, work clean, and don't hold up other trades.

## Energy Code Compliance

Oklahoma's commercial energy code requires specific R-values and air barrier performance for different building types and climate zones. Spray foam consistently meets or exceeds these requirements in fewer inches than any other insulation type — and the air barrier is built in at no additional cost.

## Getting Started

Commercial projects require a site visit for accurate estimating. Building size, construction type, current insulation (if any), usage patterns, and code requirements all factor into the recommendation. Contact us to schedule a no-obligation walkthrough. We'll assess your building, discuss your goals, and provide a detailed proposal with projected energy savings.`,
    faqs: [
      {
        question: 'Do you work with general contractors on new builds?',
        answer: 'Yes — we work with builders and GCs across Oklahoma on new commercial and residential construction. We\'re licensed home builders ourselves, so we understand construction scheduling and sequencing. We show up when we say we will and don\'t hold up other trades.',
      },
      {
        question: 'Can spray foam be installed in an occupied building?',
        answer: 'In most cases, yes. We can phase the work to minimize disruption — spraying sections at a time while the rest of the building operates normally. The foam cures quickly and is fully inert within 24 hours. We\'ll work around your schedule.',
      },
      {
        question: 'Does commercial spray foam qualify for tax credits?',
        answer: 'Commercial buildings may qualify for the Section 179D energy-efficient commercial building deduction, which can be substantial. The residential 30% tax credit (up to $1,200) applies to qualifying residential projects. Consult your tax advisor for specifics.',
      },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(s => s.slug === slug);
}
