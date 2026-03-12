import { useState, type FormEvent } from 'react';

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

export default function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    // In production, this would POST to an API endpoint
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSubmitted(true);
    setSending(false);
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
