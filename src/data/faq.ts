export interface FAQItem {
  question: string;
  answer: string;
  category: 'General' | 'Cost' | 'Process' | 'Technical';
}

export const faqs: FAQItem[] = [
  {
    question: 'What is spray foam insulation?',
    answer: 'Spray foam insulation is a two-component liquid that expands into a solid foam when applied to surfaces. It fills every crack, gap, and cavity, creating an airtight seal that traditional insulation types (fiberglass batts, blown-in cellulose) can\'t match. It\'s applied as a liquid and cures within hours, permanently bonding to the surface it\'s sprayed on.',
    category: 'General',
  },
  {
    question: 'What\'s the difference between open cell and closed cell spray foam?',
    answer: 'Open cell foam is lighter (half-pound density), costs less per board foot ($0.44–$0.65), and provides R-3.7 per inch. It\'s ideal for interior walls and attics. Closed cell foam is denser (two-pound density), costs more ($1.00–$1.60 per board foot), and delivers R-6.5+ per inch with built-in vapor barrier properties. It\'s the right choice for metal buildings, crawl spaces, and anywhere moisture is a concern. We\'ll recommend the best type for your specific project during your free estimate.',
    category: 'General',
  },
  {
    question: 'How long does spray foam insulation last?',
    answer: 'Spray foam insulation is permanent. Once cured, it maintains its R-value, air sealing, and structural properties for the life of the building. Unlike fiberglass that sags, compresses, and degrades over time, spray foam doesn\'t settle, shift, or lose performance. It\'s a one-time investment that never needs replacing.',
    category: 'General',
  },
  {
    question: 'Is spray foam insulation safe?',
    answer: 'Yes. Spray foam is fully cured within 24 hours of application. Once cured, it\'s chemically inert and non-toxic. During installation, our crew wears full protective equipment and ensures proper ventilation. We follow all manufacturer safety protocols and EPA guidelines. Occupants should stay out of the immediate spray area during application and for 24 hours after.',
    category: 'General',
  },
  {
    question: 'How much does spray foam insulation cost?',
    answer: 'Spray foam costs depend on foam type, thickness, square footage, and accessibility. Open cell runs $0.44–$0.65 per board foot. Closed cell runs $1.00–$1.60 per board foot. A typical attic job (1,500 sq ft) costs $3,600–$5,400. A 30x50 metal building costs $6,000–$9,600. Use our pricing estimator for a rough estimate, or schedule a free on-site estimate for exact pricing.',
    category: 'Cost',
  },
  {
    question: 'Is spray foam insulation worth the investment?',
    answer: 'For most Oklahoma homes and buildings, absolutely. Spray foam typically reduces energy bills by 30–50%. On a $200/month utility bill, that\'s $720–$1,200 saved per year — every year. Most projects pay for themselves in 3–5 years through energy savings alone. Add the permanent increase in property value, and spray foam consistently outperforms the alternatives on ROI.',
    category: 'Cost',
  },
  {
    question: 'Do you offer financing?',
    answer: 'Yes. We offer 0% financing options to qualified customers. Spray foam insulation is a permanent upgrade that pays for itself through energy savings, and financing makes it accessible without a large upfront cost. Ask about financing options when you schedule your free estimate.',
    category: 'Cost',
  },
  {
    question: 'How much can I save on energy bills with spray foam?',
    answer: 'Most Oklahoma homeowners see energy savings of 30–50% after spray foam insulation. The exact savings depend on your current insulation condition, home size, HVAC efficiency, and local energy rates. Metal buildings and commercial structures with no existing insulation often see even larger savings — 40–60% reductions are common.',
    category: 'Cost',
  },
  {
    question: 'How long does spray foam installation take?',
    answer: 'Most residential projects (attics, crawl spaces) take one day. Larger homes or whole-house projects may take 1–2 days. Metal buildings typically take 1–3 days depending on size. We\'ll give you a specific timeline during your free estimate. You can stay in your home during most installations.',
    category: 'Process',
  },
  {
    question: 'What should I expect during installation?',
    answer: 'Our crew arrives on time, protects surfaces with masking and drop cloths, and applies the foam using specialized spray equipment. The foam expands and cures within minutes. After spraying, we trim any excess foam, clean up the work area, and do a final walkthrough with you. The entire area is usable within 24 hours.',
    category: 'Process',
  },
  {
    question: 'Do I need to leave my home during installation?',
    answer: 'You don\'t need to leave your home, but we ask that you stay out of the immediate spray area during application and for about an hour afterward while the foam cures. The rest of your home is fine to occupy. Our crew ventilates the work area throughout the process.',
    category: 'Process',
  },
  {
    question: 'How do I get a quote?',
    answer: 'Call us at (580) 320-5620 or fill out the contact form on our website. We\'ll schedule a free on-site estimate at your convenience. During the visit, we\'ll assess your property, discuss your goals, recommend the best insulation approach, and provide a detailed written quote. No pressure, no obligation.',
    category: 'Process',
  },
  {
    question: 'What areas do you serve?',
    answer: 'We serve Ada (our home base), Oklahoma City, Norman, Tulsa, Shawnee, McAlester, Durant, Ardmore, Stillwater, and all surrounding communities across Oklahoma. We cover most of the state — if you\'re not sure whether we serve your area, give us a call.',
    category: 'Process',
  },
  {
    question: 'What R-value does spray foam provide?',
    answer: 'Open cell spray foam provides R-3.7 per inch. Closed cell provides R-6.5 to R-7.0 per inch. For reference, fiberglass batts provide R-3.1 to R-3.8 per inch but with significant air leakage that reduces effective performance. Spray foam\'s airtight seal means its rated R-value is its actual, in-wall performance — no gaps, no wind washing, no degradation over time.',
    category: 'Technical',
  },
  {
    question: 'Can spray foam be applied to existing walls without removing drywall?',
    answer: 'In some cases, yes. We can inject foam into enclosed wall cavities through small holes that are patched afterward. However, for attics, crawl spaces, basements, and exposed surfaces (like metal buildings), spray foam is applied directly to the open surface. We\'ll recommend the best approach for your specific situation during the estimate.',
    category: 'Technical',
  },
  {
    question: 'Does spray foam prevent mold?',
    answer: 'Spray foam itself does not support mold growth — it\'s not a food source for mold. More importantly, closed cell spray foam\'s vapor barrier properties prevent the condensation that causes mold in the first place. By controlling air movement and moisture, spray foam addresses the root cause of mold rather than just the symptom.',
    category: 'Technical',
  },
  {
    question: 'Will spray foam insulation help with noise?',
    answer: 'Yes, especially open cell spray foam. Its soft, flexible structure absorbs sound waves, reducing noise transfer between rooms by 50% or more compared to fiberglass. If you\'re insulating shared walls, bonus rooms, or media rooms, open cell\'s sound-dampening properties are a significant bonus.',
    category: 'Technical',
  },
];

export function getFAQsByCategory(category: FAQItem['category']): FAQItem[] {
  return faqs.filter(f => f.category === category);
}
