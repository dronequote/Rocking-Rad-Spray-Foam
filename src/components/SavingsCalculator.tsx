import { useState, useEffect, useRef } from 'react';

interface City {
  slug: string;
  name: string;
  zipCodes: string[];
}

interface SavingsCalculatorProps {
  cities: City[];
}

// Constants
const HEATING_COOLING_SHARE = 0.55;
const ENERGY_ESCALATION = 0.04;

const CONDITION_OPTIONS = [
  { key: 'poor', label: 'Little or No Insulation', desc: 'No insulation, bare walls/attic, very old home', savings: 0.42 },
  { key: 'some', label: 'Some Insulation', desc: 'Thin or patchy fiberglass, 15+ years old', savings: 0.30 },
  { key: 'decent', label: 'Decent Insulation', desc: 'Standard fiberglass in okay condition', savings: 0.175 },
] as const;

const AREA_OPTIONS = [
  { key: 'attic', label: 'Attic', multiplier: 0.55, baseCost: 4500 },
  { key: 'walls', label: 'Exterior Walls', multiplier: 0.30, baseCost: 5500 },
  { key: 'crawl', label: 'Crawl Space', multiplier: 0.15, baseCost: 2500 },
  { key: 'metal', label: 'Metal Building', multiplier: 1.0, baseCost: 0 },
] as const;

const SQFT_PRESETS = [1200, 1500, 1900, 2500, 3500];

type ConditionKey = typeof CONDITION_OPTIONS[number]['key'];
type AreaKey = typeof AREA_OPTIONS[number]['key'];

function formatCurrency(n: number): string {
  return '$' + Math.round(n).toLocaleString();
}

function AnimatedCounter({ value, duration = 1200 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<number | null>(null);

  useEffect(() => {
    const start = display;
    const diff = value - start;
    const startTime = performance.now();
    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + diff * eased));
      if (progress < 1) ref.current = requestAnimationFrame(tick);
    }
    ref.current = requestAnimationFrame(tick);
    return () => { if (ref.current) cancelAnimationFrame(ref.current); };
  }, [value]);

  return <span>{formatCurrency(display)}</span>;
}

// Simple inline SVG line chart
function SavingsChart({ cumulativeSavings, netCost }: { cumulativeSavings: number[]; netCost: number }) {
  const W = 600;
  const H = 280;
  const PAD = { top: 20, right: 20, bottom: 40, left: 60 };
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;

  const maxY = Math.max(cumulativeSavings[19], netCost) * 1.1;
  const scaleX = (yr: number) => PAD.left + (yr / 20) * chartW;
  const scaleY = (v: number) => PAD.top + chartH - (v / maxY) * chartH;

  // Build cumulative savings path
  const points = cumulativeSavings.map((v, i) => `${scaleX(i + 1)},${scaleY(v)}`);
  const linePath = `M${scaleX(0)},${scaleY(0)} ` + points.map(p => `L${p}`).join(' ');

  // Find crossover year
  let crossoverYear = -1;
  for (let i = 0; i < 20; i++) {
    if (cumulativeSavings[i] >= netCost) { crossoverYear = i + 1; break; }
  }

  // Fill area above cost line after crossover
  let fillPath = '';
  if (crossoverYear > 0 && crossoverYear <= 20) {
    const startX = scaleX(crossoverYear);
    const costY = scaleY(netCost);
    const fillPoints: string[] = [];
    for (let i = crossoverYear; i < 20; i++) {
      fillPoints.push(`${scaleX(i + 1)},${scaleY(cumulativeSavings[i])}`);
    }
    fillPath = `M${startX},${costY} ${fillPoints.join(' L')} L${scaleX(20)},${costY} Z`;
  }

  // Y-axis labels
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map(f => Math.round(f * maxY));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" aria-label="Savings over 20 years chart">
      {/* Grid lines */}
      {yTicks.map(v => (
        <line key={v} x1={PAD.left} y1={scaleY(v)} x2={W - PAD.right} y2={scaleY(v)} stroke="#e5e7eb" strokeWidth="1" />
      ))}
      {/* Y labels */}
      {yTicks.map(v => (
        <text key={v} x={PAD.left - 8} y={scaleY(v) + 4} textAnchor="end" fontSize="10" fill="#6b7280">
          {v >= 1000 ? `$${Math.round(v / 1000)}k` : `$${v}`}
        </text>
      ))}
      {/* X labels */}
      {[1, 5, 10, 15, 20].map(yr => (
        <text key={yr} x={scaleX(yr)} y={H - 8} textAnchor="middle" fontSize="10" fill="#6b7280">Yr {yr}</text>
      ))}
      {/* Green fill above cost after crossover */}
      {fillPath && <path d={fillPath} fill="rgba(34,197,94,0.15)" />}
      {/* Cost line (dashed gray) */}
      <line x1={PAD.left} y1={scaleY(netCost)} x2={W - PAD.right} y2={scaleY(netCost)} stroke="#9ca3af" strokeWidth="2" strokeDasharray="6,4" />
      <text x={W - PAD.right + 2} y={scaleY(netCost) - 6} fontSize="9" fill="#9ca3af" textAnchor="end">Net Cost</text>
      {/* Savings line */}
      <path d={linePath} fill="none" stroke="#8B1A1A" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Crossover dot */}
      {crossoverYear > 0 && crossoverYear <= 20 && (
        <>
          <circle cx={scaleX(crossoverYear)} cy={scaleY(cumulativeSavings[crossoverYear - 1])} r="4" fill="#8B1A1A" />
          <text x={scaleX(crossoverYear)} y={scaleY(cumulativeSavings[crossoverYear - 1]) - 10} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#8B1A1A">
            Break-even Yr {crossoverYear}
          </text>
        </>
      )}
      {/* Year 10 label */}
      {cumulativeSavings[9] && (
        <text x={scaleX(10)} y={scaleY(cumulativeSavings[9]) - 10} textAnchor="middle" fontSize="9" fill="#8B1A1A">
          {formatCurrency(cumulativeSavings[9])}
        </text>
      )}
      {/* Year 20 label */}
      <text x={scaleX(20)} y={scaleY(cumulativeSavings[19]) - 10} textAnchor="middle" fontSize="9" fontWeight="bold" fill="#8B1A1A">
        {formatCurrency(cumulativeSavings[19])}
      </text>
      {/* Axis lines */}
      <line x1={PAD.left} y1={PAD.top} x2={PAD.left} y2={PAD.top + chartH} stroke="#d1d5db" strokeWidth="1" />
      <line x1={PAD.left} y1={PAD.top + chartH} x2={W - PAD.right} y2={PAD.top + chartH} stroke="#d1d5db" strokeWidth="1" />
    </svg>
  );
}

export default function SavingsCalculator({ cities }: SavingsCalculatorProps) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [animating, setAnimating] = useState(false);

  // Step 1 — Location
  const [zip, setZip] = useState('');
  const [matchedCity, setMatchedCity] = useState<string | null>(null);

  // Step 2 — Home Profile
  const [sqft, setSqft] = useState(1900);

  // Step 3 — Condition
  const [condition, setCondition] = useState<ConditionKey | null>(null);

  // Step 4 — Energy Bills
  const [monthlyBill, setMonthlyBill] = useState(200);

  // Step 5 — Areas
  const [areas, setAreas] = useState<AreaKey[]>(['attic']);

  // Rebates & Incentives (editable in results)
  const [userRebate, setUserRebate] = useState(0);

  // Read URL params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pZip = params.get('zip');
    const pSqft = params.get('sqft');
    const pCondition = params.get('condition');
    if (pZip) {
      setZip(pZip);
      const city = cities.find(c => c.zipCodes.includes(pZip));
      if (city) setMatchedCity(city.name);
    }
    if (pSqft) setSqft(Math.max(800, Math.min(5000, Number(pSqft) || 1900)));
    if (pCondition && ['poor', 'some', 'decent'].includes(pCondition)) {
      setCondition(pCondition as ConditionKey);
    }
  }, []);

  // ZIP lookup
  useEffect(() => {
    if (zip.length === 5) {
      const city = cities.find(c => c.zipCodes.includes(zip));
      setMatchedCity(city ? city.name : null);
    } else {
      setMatchedCity(null);
    }
  }, [zip]);

  function goTo(next: number) {
    if (animating) return;
    setDirection(next > step ? 1 : -1);
    setAnimating(true);
    setTimeout(() => {
      setStep(next);
      setAnimating(false);
    }, 250);
  }

  // Calculations
  const savingsPercent = condition ? CONDITION_OPTIONS.find(c => c.key === condition)!.savings : 0.30;
  const coverageMultiplier = Math.min(1.0, areas.reduce((sum, a) => sum + AREA_OPTIONS.find(o => o.key === a)!.multiplier, 0));
  const annualEnergySpend = monthlyBill * 12;
  const heatingCoolingSpend = annualEnergySpend * HEATING_COOLING_SHARE;
  const annualSavings = heatingCoolingSpend * savingsPercent * coverageMultiplier;

  // Project cost
  const totalCost = areas.reduce((sum, a) => {
    const opt = AREA_OPTIONS.find(o => o.key === a)!;
    if (a === 'metal') return sum + sqft * 3.50;
    return sum + opt.baseCost * (sqft / 1900);
  }, 0);

  const netCost = totalCost - userRebate;
  const paybackYears = annualSavings > 0 ? netCost / annualSavings : 99;

  // 20-year cumulative with 4% escalation
  const cumulativeSavings: number[] = [];
  let cumulative = 0;
  for (let yr = 0; yr < 20; yr++) {
    cumulative += annualSavings * Math.pow(1 + ENERGY_ESCALATION, yr);
    cumulativeSavings.push(cumulative);
  }
  const lifetimeSavings = cumulativeSavings[19];

  // Summer/winter split
  const summerSavings = annualSavings * 0.60;
  const winterSavings = annualSavings * 0.40;

  // HVAC reduction
  const hvacReduction = savingsPercent >= 0.30 ? Math.round(savingsPercent * 50) : 0;

  const showResults = step === 5;
  const totalSteps = 5;

  const canProceed = [
    true, // step 0: zip is optional
    true, // step 1: sqft always has default
    condition !== null, // step 2: must pick condition
    true, // step 3: bill always has default
    areas.length > 0, // step 4: must pick at least one area
  ];

  // Step content
  function renderStep() {
    switch (step) {
      case 0: return (
        <div>
          <h3 className="text-xl font-bold text-[#8B1A1A] mb-2">Where is your property?</h3>
          <p className="text-neutral-600 mb-6">Enter your ZIP code so we can check if you're in our service area.</p>
          <input
            type="text"
            inputMode="numeric"
            maxLength={5}
            value={zip}
            onChange={e => setZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
            placeholder="Enter ZIP code"
            className="w-full max-w-xs px-4 py-3 border-2 border-neutral-200 rounded-lg text-lg focus:border-[#8B1A1A] focus:outline-none transition-colors"
          />
          {matchedCity && (
            <p className="mt-3 text-green-700 font-semibold flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              We serve {matchedCity}!
            </p>
          )}
          {zip.length === 5 && !matchedCity && (
            <p className="mt-3 text-neutral-500 text-sm">ZIP not in our listed areas, but we may still serve you. Continue for your estimate!</p>
          )}
        </div>
      );

      case 1: return (
        <div>
          <h3 className="text-xl font-bold text-[#8B1A1A] mb-2">How big is your home?</h3>
          <p className="text-neutral-600 mb-6">Select or adjust the square footage of the area to be insulated.</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {SQFT_PRESETS.map(p => (
              <button
                key={p}
                onClick={() => setSqft(p)}
                className={`px-4 py-2 rounded-lg border-2 text-sm font-semibold transition-colors ${sqft === p ? 'border-[#8B1A1A] bg-[#8B1A1A] text-white' : 'border-neutral-200 text-neutral-700 hover:border-[#8B1A1A]'}`}
              >
                {p.toLocaleString()} sq ft
              </button>
            ))}
          </div>
          <input
            type="range"
            min={800}
            max={5000}
            step={100}
            value={sqft}
            onChange={e => setSqft(Number(e.target.value))}
            className="w-full accent-[#8B1A1A]"
          />
          <p className="text-center mt-2 text-2xl font-bold text-[#8B1A1A]">{sqft.toLocaleString()} sq ft</p>
        </div>
      );

      case 2: return (
        <div>
          <h3 className="text-xl font-bold text-[#8B1A1A] mb-2">Current insulation condition?</h3>
          <p className="text-neutral-600 mb-6">Pick the option that best describes your home's current insulation.</p>
          <div className="grid gap-4">
            {CONDITION_OPTIONS.map(opt => (
              <button
                key={opt.key}
                onClick={() => setCondition(opt.key)}
                className={`text-left p-5 rounded-xl border-2 transition-all ${condition === opt.key ? 'border-[#8B1A1A] bg-[#8B1A1A]/5 shadow-md' : 'border-neutral-200 hover:border-neutral-300'}`}
              >
                <p className="font-bold text-neutral-800">{opt.label}</p>
                <p className="text-sm text-neutral-500 mt-1">{opt.desc}</p>
                <p className="text-sm font-semibold text-[#C41E1E] mt-2">Potential savings: {Math.round(opt.savings * 100)}%</p>
              </button>
            ))}
          </div>
        </div>
      );

      case 3: return (
        <div>
          <h3 className="text-xl font-bold text-[#8B1A1A] mb-2">What's your monthly energy bill?</h3>
          <p className="text-neutral-600 mb-6">Include electricity and gas combined.</p>
          <input
            type="range"
            min={50}
            max={500}
            step={10}
            value={monthlyBill}
            onChange={e => setMonthlyBill(Number(e.target.value))}
            className="w-full accent-[#8B1A1A]"
          />
          <p className="text-center mt-2 text-3xl font-bold text-[#8B1A1A]">{formatCurrency(monthlyBill)}<span className="text-base text-neutral-500 font-normal">/month</span></p>
          <p className="text-center text-neutral-500 mt-1">Annual total: {formatCurrency(monthlyBill * 12)}</p>
          <button
            onClick={() => setMonthlyBill(250)}
            className="mt-4 mx-auto block px-4 py-2 text-sm rounded-lg border border-neutral-300 text-neutral-600 hover:border-[#8B1A1A] hover:text-[#8B1A1A] transition-colors"
          >
            Use Oklahoma average ($250/mo)
          </button>
        </div>
      );

      case 4: return (
        <div>
          <h3 className="text-xl font-bold text-[#8B1A1A] mb-2">Which areas need insulation?</h3>
          <p className="text-neutral-600 mb-6">Select all that apply. More coverage = more savings.</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {AREA_OPTIONS.map(opt => {
              const checked = areas.includes(opt.key);
              return (
                <label
                  key={opt.key}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${checked ? 'border-[#8B1A1A] bg-[#8B1A1A]/5' : 'border-neutral-200 hover:border-neutral-300'}`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => {
                      setAreas(prev => checked ? prev.filter(a => a !== opt.key) : [...prev, opt.key]);
                    }}
                    className="w-5 h-5 accent-[#8B1A1A]"
                  />
                  <div>
                    <p className="font-semibold text-neutral-800">{opt.label}</p>
                    <p className="text-xs text-neutral-500">{Math.round(opt.multiplier * 100)}% of heating/cooling impact</p>
                  </div>
                </label>
              );
            })}
          </div>
        </div>
      );

      default: return null;
    }
  }

  function renderResults() {
    return (
      <div className="space-y-8">
        {/* Hero number */}
        <div className="text-center">
          <p className="text-neutral-600 text-lg mb-1">Estimated Annual Savings</p>
          <p className="text-5xl md:text-6xl font-bold text-[#C41E1E]">
            <AnimatedCounter value={annualSavings} />
          </p>
          <p className="text-neutral-500 mt-2">per year on heating and cooling costs</p>
        </div>

        {/* Payback bar */}
        <div className="bg-neutral-50 rounded-xl p-6">
          <p className="text-sm font-semibold text-neutral-600 mb-3">Payback Timeline</p>
          <div className="relative h-8 rounded-full bg-neutral-200 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: `${Math.min(100, (Math.min(paybackYears, 20) / 20) * 100)}%`,
                background: 'linear-gradient(90deg, #dc2626 0%, #f97316 40%, #22c55e 100%)',
              }}
            />
            <div
              className="absolute top-0 h-full w-0.5 bg-[#8B1A1A]"
              style={{ left: `${Math.min(100, (Math.min(paybackYears, 20) / 20) * 100)}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-neutral-500">
            <span>Year 0</span>
            <span className="font-bold text-[#8B1A1A]">Pays for itself in {paybackYears < 1 ? '< 1' : paybackYears.toFixed(1)} years</span>
            <span>Year 20</span>
          </div>
        </div>

        {/* Monthly savings */}
        <div className="text-center bg-green-50 rounded-xl p-5 border border-green-200">
          <p className="text-3xl font-bold text-green-700">{formatCurrency(annualSavings / 12)}</p>
          <p className="text-green-600 text-sm">back in your pocket every month</p>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-xl border border-neutral-200 p-4">
          <p className="text-sm font-semibold text-neutral-700 mb-2">20-Year Cumulative Savings vs. Net Cost</p>
          <SavingsChart cumulativeSavings={cumulativeSavings} netCost={netCost} />
          <p className="text-xs text-neutral-400 mt-2">Includes 4% annual energy cost escalation (EIA projection)</p>
        </div>

        {/* Summer/Winter breakdown */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-orange-50 rounded-xl p-5 border border-orange-200 text-center">
            <svg className="w-8 h-8 mx-auto mb-2 text-orange-500" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" /><path d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.07-7.07l-1.41 1.41M6.34 17.66l-1.41 1.41m12.73 0l-1.41-1.41M6.34 6.34L4.93 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" /></svg>
            <p className="text-2xl font-bold text-orange-600">{formatCurrency(summerSavings)}</p>
            <p className="text-orange-500 text-xs mt-1">Summer cooling savings</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-5 border border-blue-200 text-center">
            <svg className="w-8 h-8 mx-auto mb-2 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2v20m-5-5l5 5 5-5m-10-5h10M7 7h10M9 2l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
            <p className="text-2xl font-bold text-blue-600">{formatCurrency(winterSavings)}</p>
            <p className="text-blue-500 text-xs mt-1">Winter heating savings</p>
          </div>
        </div>

        {/* Incentives summary */}
        <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
          <p className="font-bold text-neutral-800 mb-4">Your Investment Summary</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-neutral-600">Estimated project cost</span><span className="font-semibold">{formatCurrency(totalCost)}</span></div>
            <div className="flex justify-between items-start text-green-700">
              <div className="flex-1 mr-4">
                <p>Rebates &amp; Incentives</p>
                <p className="text-xs text-neutral-400 mt-0.5">Enter any rebates or incentives that apply to your project</p>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-green-700">-$</span>
                <input
                  type="number"
                  min={0}
                  value={userRebate || ''}
                  placeholder="0"
                  onChange={e => setUserRebate(Math.max(0, Number(e.target.value) || 0))}
                  className="w-24 px-2 py-1 border border-neutral-300 rounded text-right text-green-700 font-semibold focus:border-[#8B1A1A] focus:outline-none"
                />
              </div>
            </div>
            <hr className="border-neutral-200" />
            <div className="flex justify-between font-bold text-lg"><span>Your Net Investment</span><span className="text-[#8B1A1A]">{formatCurrency(netCost)}</span></div>
          </div>
        </div>

        {/* 20-year ROI */}
        <div className="text-center bg-[#8B1A1A]/5 rounded-xl p-6 border border-[#8B1A1A]/20">
          <p className="text-neutral-600 text-sm mb-1">20-Year Lifetime Savings</p>
          <p className="text-4xl font-bold text-[#8B1A1A]">{formatCurrency(lifetimeSavings)}</p>
          <p className="text-neutral-500 text-sm mt-1">That's a {((lifetimeSavings / netCost) * 100).toFixed(0)}% return on your investment</p>
        </div>

        {/* HVAC bonus */}
        {hvacReduction > 0 && (
          <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
            <p className="font-semibold text-blue-800">HVAC Bonus</p>
            <p className="text-blue-700 text-sm mt-1">
              Spray foam can reduce cooling system size by up to {hvacReduction}%, potentially saving thousands on your next HVAC replacement.
            </p>
          </div>
        )}

        {/* Trust anchors */}
        <p className="text-xs text-neutral-400 text-center leading-relaxed">
          Based on DOE and ENERGY STAR methodology. Energy rates from EIA 2025 Oklahoma residential data. Actual savings vary by home condition, usage, and installation.
        </p>

        {/* CTA */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="/contact"
            className="block text-center px-6 py-4 bg-[#8B1A1A] text-white font-bold rounded-lg hover:bg-[#6d1515] transition-colors text-lg"
          >
            Get My Free Assessment
          </a>
          <a
            href="tel:5803205620"
            className="block text-center px-6 py-4 border-2 border-[#8B1A1A] text-[#8B1A1A] font-bold rounded-lg hover:bg-[#8B1A1A]/5 transition-colors text-lg"
          >
            (580) 320-5620
          </a>
        </div>

        {/* Edit inputs */}
        <button
          onClick={() => { setStep(0); setDirection(-1); }}
          className="mx-auto block text-sm text-neutral-500 hover:text-[#8B1A1A] underline transition-colors"
        >
          Edit my inputs
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress dots */}
      {!showResults && (
        <div className="flex items-center justify-center gap-2 mb-8">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <button
              key={i}
              onClick={() => i < step && goTo(i)}
              className={`w-3 h-3 rounded-full transition-all ${i === step ? 'bg-[#8B1A1A] scale-125' : i < step ? 'bg-[#8B1A1A]/40 cursor-pointer hover:bg-[#8B1A1A]/60' : 'bg-neutral-200'}`}
              aria-label={`Step ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Step content with slide animation */}
      <div className="relative overflow-hidden">
        <div
          className="transition-all duration-250 ease-out"
          style={{
            opacity: animating ? 0 : 1,
            transform: animating ? `translateX(${direction * 40}px)` : 'translateX(0)',
          }}
        >
          {showResults ? renderResults() : renderStep()}
        </div>
      </div>

      {/* Navigation buttons */}
      {!showResults && (
        <div className="flex justify-between mt-8">
          <button
            onClick={() => goTo(step - 1)}
            disabled={step === 0}
            className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors ${step === 0 ? 'text-neutral-300 cursor-not-allowed' : 'text-neutral-600 hover:text-[#8B1A1A] hover:bg-neutral-50'}`}
          >
            Back
          </button>
          <button
            onClick={() => goTo(step + 1)}
            disabled={!canProceed[step]}
            className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-colors ${canProceed[step] ? 'bg-[#8B1A1A] text-white hover:bg-[#6d1515]' : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'}`}
          >
            {step === totalSteps - 1 ? 'See My Results' : 'Next'}
          </button>
        </div>
      )}
    </div>
  );
}
