import { useState, useRef, useCallback } from 'react';

interface City {
  slug: string;
  name: string;
  zipCodes: string[];
}

interface Props {
  cities: City[];
}

export default function ZipChecker({ cities }: Props) {
  const [zipCode, setZipCode] = useState('');
  const [result, setResult] = useState<{ found: boolean; city?: City } | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const checkZip = useCallback(
    (value: string) => {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length === 5) {
        const matchedCity = cities.find((c) => c.zipCodes.includes(cleaned));
        setResult(matchedCity ? { found: true, city: matchedCity } : { found: false });
      } else {
        setResult(null);
      }
    },
    [cities]
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setZipCode(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => checkZip(value), 300);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      checkZip(zipCode);
    }
  }

  return (
    <div className="relative" style={{ maxWidth: '200px' }}>
      <div className="flex items-center">
        <input
          type="text"
          inputMode="numeric"
          maxLength={5}
          placeholder="Enter ZIP"
          value={zipCode}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="w-full px-3 py-1.5 text-xs border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent-orange focus:border-transparent"
          aria-label="Check ZIP code for service area"
        />
        <button
          type="button"
          onClick={() => checkZip(zipCode)}
          className="ml-1 p-1.5 text-neutral-500 hover:text-brand-blue transition-colors"
          aria-label="Search ZIP code"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>

      {result && (
        <div className="absolute top-full left-0 right-0 mt-1 z-50">
          {result.found && result.city ? (
            <a
              href={`/service-areas/${result.city.slug}`}
              className="block px-3 py-2 bg-green-50 border border-green-200 rounded-md text-xs font-semibold text-green-700 hover:bg-green-100 transition-colors whitespace-nowrap"
            >
              We serve {result.city.name}!
            </a>
          ) : (
            <div className="px-3 py-2 bg-white border border-neutral-200 rounded-md text-xs text-neutral-600 shadow-sm whitespace-nowrap">
              Call{' '}
              <a href="tel:5803205620" className="font-bold text-brand-blue hover:underline">
                (580) 320-5620
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
