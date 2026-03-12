import { useState, useMemo } from 'react';

interface City {
  slug: string;
  name: string;
  state?: string;
  zipCodes: string[];
  population: string;
  isHomeBase?: boolean;
}

interface Props {
  cities: City[];
}

// City coordinates (lat, lon)
const cityCoords: Record<string, { lat: number; lon: number }> = {
  ada: { lat: 34.77, lon: -96.68 },
  'oklahoma-city': { lat: 35.47, lon: -97.52 },
  norman: { lat: 35.22, lon: -97.44 },
  tulsa: { lat: 36.15, lon: -95.99 },
  shawnee: { lat: 35.33, lon: -96.93 },
  mcalester: { lat: 34.93, lon: -95.77 },
  durant: { lat: 33.99, lon: -96.39 },
  ardmore: { lat: 34.17, lon: -97.13 },
  stillwater: { lat: 36.12, lon: -97.06 },
};

// Convert lat/lon to SVG coordinates
// Oklahoma bounds approx: lat 33.6-37.0, lon -103.0 to -94.4
const SVG_WIDTH = 800;
const SVG_HEIGHT = 400;
const LON_MIN = -103.0;
const LON_MAX = -94.4;
const LAT_MIN = 33.6;
const LAT_MAX = 37.0;

function toSvgX(lon: number): number {
  return ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * SVG_WIDTH;
}

function toSvgY(lat: number): number {
  return SVG_HEIGHT - ((lat - LAT_MIN) / (LAT_MAX - LAT_MIN)) * SVG_HEIGHT;
}

// Approximate distance in miles between two lat/lon points
function distanceMiles(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3958.8; // Earth radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

// Simplified Oklahoma state outline SVG path
const OKLAHOMA_PATH = `
  M ${toSvgX(-103.0)} ${toSvgY(36.5)}
  L ${toSvgX(-100.0)} ${toSvgY(36.5)}
  L ${toSvgX(-100.0)} ${toSvgY(37.0)}
  L ${toSvgX(-94.43)} ${toSvgY(37.0)}
  L ${toSvgX(-94.43)} ${toSvgY(36.5)}
  L ${toSvgX(-94.43)} ${toSvgY(35.4)}
  L ${toSvgX(-94.77)} ${toSvgY(35.0)}
  L ${toSvgX(-94.47)} ${toSvgY(34.5)}
  L ${toSvgX(-94.47)} ${toSvgY(33.64)}
  L ${toSvgX(-96.0)} ${toSvgY(33.74)}
  L ${toSvgX(-96.35)} ${toSvgY(33.69)}
  L ${toSvgX(-96.58)} ${toSvgY(33.83)}
  L ${toSvgX(-96.68)} ${toSvgY(33.84)}
  L ${toSvgX(-96.85)} ${toSvgY(33.86)}
  L ${toSvgX(-97.1)} ${toSvgY(33.74)}
  L ${toSvgX(-97.2)} ${toSvgY(33.9)}
  L ${toSvgX(-97.4)} ${toSvgY(33.86)}
  L ${toSvgX(-97.67)} ${toSvgY(33.99)}
  L ${toSvgX(-97.95)} ${toSvgY(33.87)}
  L ${toSvgX(-98.1)} ${toSvgY(34.07)}
  L ${toSvgX(-98.4)} ${toSvgY(34.08)}
  L ${toSvgX(-98.6)} ${toSvgY(34.15)}
  L ${toSvgX(-99.0)} ${toSvgY(34.21)}
  L ${toSvgX(-99.2)} ${toSvgY(34.33)}
  L ${toSvgX(-99.4)} ${toSvgY(34.37)}
  L ${toSvgX(-99.6)} ${toSvgY(34.37)}
  L ${toSvgX(-99.83)} ${toSvgY(34.56)}
  L ${toSvgX(-100.0)} ${toSvgY(34.56)}
  L ${toSvgX(-100.0)} ${toSvgY(36.5)}
  L ${toSvgX(-103.0)} ${toSvgY(36.5)}
  Z
`;

export default function ServiceAreaMap({ cities }: Props) {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [zipCode, setZipCode] = useState('');
  const [zipResult, setZipResult] = useState<{ found: boolean; city?: City } | null>(null);

  const adaCoords = cityCoords.ada;
  const adaSvgX = toSvgX(adaCoords.lon);
  const adaSvgY = toSvgY(adaCoords.lat);

  // 120-mile radius in SVG units (approximate)
  const milesPerDegLon = 54.6; // at ~34.7 lat
  const milesPerDegLat = 69.0;
  const radiusSvgX = (120 / milesPerDegLon) * (SVG_WIDTH / (LON_MAX - LON_MIN));
  const radiusSvgY = (120 / milesPerDegLat) * (SVG_HEIGHT / (LAT_MAX - LAT_MIN));
  const coverageRadius = (radiusSvgX + radiusSvgY) / 2;

  const cityMarkers = useMemo(() => {
    return cities
      .filter((city) => cityCoords[city.slug])
      .map((city) => {
        const coords = cityCoords[city.slug];
        const dist = city.isHomeBase
          ? 0
          : distanceMiles(adaCoords.lat, adaCoords.lon, coords.lat, coords.lon);
        return {
          ...city,
          svgX: toSvgX(coords.lon),
          svgY: toSvgY(coords.lat),
          distance: dist,
        };
      });
  }, [cities]);

  function handleZipSearch(value: string) {
    setZipCode(value);
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length === 5) {
      const matchedCity = cities.find((c) => c.zipCodes.includes(cleaned));
      setZipResult(matchedCity ? { found: true, city: matchedCity } : { found: false });
    } else {
      setZipResult(null);
    }
  }

  return (
    <section className="section-padding bg-neutral-50">
      <div className="container-narrow">
        <div className="text-center mb-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-blue mb-4">
            Coverage Area
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Based in Ada, we serve communities across Oklahoma. Don't see your area? Call us — we
            likely cover it.
          </p>
        </div>

        {/* SVG Map */}
        <div className="bg-white rounded-xl max-w-4xl mx-auto border border-neutral-200 p-4 md:p-6">
          <svg
            viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
            className="w-full h-auto"
            role="img"
            aria-label="Oklahoma service area map showing cities served by Rocking Rad Spray Foam"
          >
            {/* State outline */}
            <path
              d={OKLAHOMA_PATH}
              fill="#f5f5f4"
              stroke="#a8a29e"
              strokeWidth="2"
            />

            {/* Coverage circle */}
            <ellipse
              cx={adaSvgX}
              cy={adaSvgY}
              rx={radiusSvgX}
              ry={radiusSvgY}
              fill="#C41E1E"
              fillOpacity="0.08"
              stroke="#C41E1E"
              strokeWidth="1.5"
              strokeDasharray="8 4"
              strokeOpacity="0.4"
            />

            {/* City markers */}
            {cityMarkers.map((city) => {
              const isHQ = city.isHomeBase;
              const isHovered = hoveredCity === city.slug;
              const markerRadius = isHQ ? 10 : 6;
              const color = isHQ ? '#8B1A1A' : '#C41E1E';

              return (
                <a
                  key={city.slug}
                  href={`/service-areas/${city.slug}`}
                  className="cursor-pointer"
                >
                  <g
                    onMouseEnter={() => setHoveredCity(city.slug)}
                    onMouseLeave={() => setHoveredCity(null)}
                  >
                    {/* Marker pulse for HQ */}
                    {isHQ && (
                      <circle
                        cx={city.svgX}
                        cy={city.svgY}
                        r="16"
                        fill={color}
                        fillOpacity="0.15"
                      >
                        <animate
                          attributeName="r"
                          values="14;20;14"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="fill-opacity"
                          values="0.15;0.05;0.15"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}

                    {/* Marker dot */}
                    <circle
                      cx={city.svgX}
                      cy={city.svgY}
                      r={isHovered ? markerRadius + 2 : markerRadius}
                      fill={color}
                      stroke="white"
                      strokeWidth="2"
                      style={{ transition: 'r 0.15s ease' }}
                    />

                    {/* HQ label */}
                    {isHQ && (
                      <text
                        x={city.svgX}
                        y={city.svgY + 1}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="white"
                        fontSize="8"
                        fontWeight="bold"
                      >
                        HQ
                      </text>
                    )}

                    {/* City name label */}
                    <text
                      x={city.svgX}
                      y={city.svgY - (isHQ ? 18 : 12)}
                      textAnchor="middle"
                      fill="#44403c"
                      fontSize={isHQ ? '13' : '11'}
                      fontWeight={isHQ ? 'bold' : '500'}
                    >
                      {city.name}
                    </text>

                    {/* Tooltip */}
                    {isHovered && (
                      <g>
                        <rect
                          x={city.svgX - 75}
                          y={city.svgY + (isHQ ? 18 : 14)}
                          width="150"
                          height="52"
                          rx="6"
                          fill="white"
                          stroke="#d6d3d1"
                          strokeWidth="1"
                          filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
                        />
                        <text
                          x={city.svgX}
                          y={city.svgY + (isHQ ? 34 : 30)}
                          textAnchor="middle"
                          fill="#8B1A1A"
                          fontSize="12"
                          fontWeight="bold"
                        >
                          {city.name}, OK
                        </text>
                        <text
                          x={city.svgX}
                          y={city.svgY + (isHQ ? 48 : 44)}
                          textAnchor="middle"
                          fill="#78716c"
                          fontSize="10"
                        >
                          {isHQ ? 'Home Base' : `${city.distance} mi from Ada`} · Pop.{' '}
                          {city.population}
                        </text>
                        <text
                          x={city.svgX}
                          y={city.svgY + (isHQ ? 62 : 58)}
                          textAnchor="middle"
                          fill="#C41E1E"
                          fontSize="10"
                          fontWeight="600"
                        >
                          Click for details →
                        </text>
                      </g>
                    )}
                  </g>
                </a>
              );
            })}
          </svg>

          <div className="flex items-center justify-center gap-6 mt-4 text-sm text-neutral-500">
            <div className="flex items-center gap-2">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ backgroundColor: '#8B1A1A' }}
              ></span>
              <span>Home Base (Ada)</span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ backgroundColor: '#C41E1E' }}
              ></span>
              <span>Service Area</span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="inline-block w-6 border-t-2 border-dashed"
                style={{ borderColor: '#C41E1E' }}
              ></span>
              <span>~120 mi radius</span>
            </div>
          </div>
        </div>

        {/* ZIP Code Search */}
        <div className="max-w-md mx-auto mt-10">
          <label
            htmlFor="zip-search"
            className="block text-center font-display text-lg font-bold text-brand-blue mb-3"
          >
            Check If We Serve Your Area
          </label>
          <div className="flex gap-2">
            <input
              id="zip-search"
              type="text"
              inputMode="numeric"
              maxLength={5}
              placeholder="Enter your ZIP code"
              value={zipCode}
              onChange={(e) => handleZipSearch(e.target.value)}
              className="flex-1 px-4 py-3 border border-neutral-300 rounded-lg text-center text-lg font-medium focus:outline-none focus:ring-2 focus:ring-accent-orange focus:border-transparent"
            />
          </div>

          {zipResult && (
            <div className="mt-4 text-center">
              {zipResult.found && zipResult.city ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 font-semibold text-lg">
                    We serve {zipResult.city.name}!
                  </p>
                  <a
                    href={`/service-areas/${zipResult.city.slug}`}
                    className="inline-block mt-2 text-accent-orange font-semibold hover:underline"
                  >
                    View {zipResult.city.name} service details →
                  </a>
                </div>
              ) : (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-amber-800">
                    Not sure if we cover your area? Call us at{' '}
                    <a href="tel:5803205620" className="font-bold hover:underline">
                      (580) 320-5620
                    </a>{' '}
                    or{' '}
                    <a
                      href="/contact"
                      className="font-bold text-accent-orange hover:underline"
                    >
                      request a free estimate
                    </a>
                    .
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
