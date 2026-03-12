// PLACEHOLDER REVIEWS — Replace with actual client reviews when available
export interface Testimonial {
  name: string;
  location: string;
  source: 'Google' | 'Facebook' | 'BBB';
  rating: number;
  projectType: string;
  text: string;
}

export const testimonials: Testimonial[] = [
  {
    name: 'James R.',
    location: 'Ada, OK',
    source: 'Google',
    rating: 5,
    projectType: 'Attic Insulation',
    text: 'Had Rocking Rad spray foam our attic last month. The difference is night and day — our upstairs bedrooms used to be 5-6 degrees hotter than downstairs, and now the whole house stays even. First electric bill after was $40 less than the same month last year. Rayce and his crew were professional, showed up when they said they would, and cleaned up everything. Highly recommend.',
  },
  {
    name: 'Sarah M.',
    location: 'Oklahoma City, OK',
    source: 'Google',
    rating: 5,
    projectType: 'Metal Building',
    text: 'We have a 40x60 metal shop that was unbearable in summer and dripping condensation all winter. Rocking Rad sprayed closed cell on the walls and ceiling. The condensation stopped immediately and we can actually work in there year-round now. Worth every penny.',
  },
  {
    name: 'Dustin T.',
    location: 'Norman, OK',
    source: 'Google',
    rating: 5,
    projectType: 'Residential Whole Home',
    text: 'Got quotes from three different insulation companies for our 1960s ranch home. Rocking Rad was the most thorough in explaining the options and the most transparent about pricing. They sprayed open cell in the attic and closed cell in the crawl space. Our energy bills dropped about 35% and the house is so much more comfortable. The team was great to work with.',
  },
  {
    name: 'Linda K.',
    location: 'Shawnee, OK',
    source: 'Facebook',
    rating: 5,
    projectType: 'Attic Insulation',
    text: 'Finally pulled the trigger on getting our attic insulated with spray foam. Should have done it years ago! The Rocking Rad crew was in and out in one day. Our house has never been this comfortable and our AC isn\'t running constantly anymore. If you\'re on the fence, just do it.',
  },
  {
    name: 'Mark and Jennifer W.',
    location: 'Ardmore, OK',
    source: 'Facebook',
    rating: 5,
    projectType: 'Pole Barn',
    text: 'Had our horse barn insulated with spray foam and it has made a huge difference for the animals. No more sweating walls, and the temperature stays much more stable even on the hottest days. The horses are calmer and more comfortable. Rocking Rad understood exactly what we needed for a livestock application.',
  },
  {
    name: 'Robert C.',
    location: 'McAlester, OK',
    source: 'BBB',
    rating: 5,
    projectType: 'Commercial',
    text: 'Had Rocking Rad insulate our restaurant with spray foam. The kitchen heat was making the dining room uncomfortable and our energy bills were out of control. Since the insulation, the dining room stays cool and comfortable, and our energy costs dropped about 40%. Professional crew, clean work, fair price. A+ experience matching their A+ rating.',
  },
];
