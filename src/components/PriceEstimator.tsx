import { useState } from "react";

const PROJECT_TYPES = [
  "Attic",
  "Walls",
  "Crawl Space",
  "Metal Building / Pole Barn",
  "New Construction",
  "Other",
] as const;

type ProjectType = (typeof PROJECT_TYPES)[number];
type FoamType = "open" | "closed" | "not-sure";

const THICKNESS: Record<ProjectType, number> = {
  Attic: 5.5,
  Walls: 3.5,
  "Crawl Space": 2,
  "Metal Building / Pole Barn": 2,
  "New Construction": 3.5,
  Other: 3.5,
};

const RATES = {
  open: { low: 0.44, high: 0.65 },
  closed: { low: 1.0, high: 1.6 },
};

const SQFT_PRESETS = [1000, 1500, 2000, 2500, 3000, 5000];

const TAX_CREDIT_RATE = 0.3;
const TAX_CREDIT_CAP = 1200;

function formatCurrency(n: number): string {
  return "$" + Math.round(n).toLocaleString("en-US");
}

function calculateRange(
  sqft: number,
  thickness: number,
  foam: "open" | "closed"
) {
  const rate = RATES[foam];
  return {
    low: sqft * thickness * rate.low,
    high: sqft * thickness * rate.high,
  };
}

function taxCredit(cost: number): number {
  return Math.min(cost * TAX_CREDIT_RATE, TAX_CREDIT_CAP);
}

export default function PriceEstimator() {
  const [step, setStep] = useState(1);
  const [projectType, setProjectType] = useState<ProjectType | null>(null);
  const [sqft, setSqft] = useState<number | "">("");
  const [foamType, setFoamType] = useState<FoamType | null>(null);

  const canProceed =
    (step === 1 && projectType !== null) ||
    (step === 2 && typeof sqft === "number" && sqft > 0) ||
    (step === 3 && foamType !== null);

  function next() {
    if (canProceed && step < 4) setStep(step + 1);
  }

  function back() {
    if (step > 1) setStep(step - 1);
  }

  const thickness = projectType ? THICKNESS[projectType] : 3.5;
  const numericSqft = typeof sqft === "number" ? sqft : 0;

  // Build results
  const results: {
    label: string;
    low: number;
    high: number;
    creditLow: number;
    creditHigh: number;
  }[] = [];

  if (step === 4 && numericSqft > 0) {
    if (foamType === "open" || foamType === "not-sure") {
      const r = calculateRange(numericSqft, thickness, "open");
      results.push({
        label: "Open Cell Spray Foam",
        ...r,
        creditLow: taxCredit(r.low),
        creditHigh: taxCredit(r.high),
      });
    }
    if (foamType === "closed" || foamType === "not-sure") {
      const r = calculateRange(numericSqft, thickness, "closed");
      results.push({
        label: "Closed Cell Spray Foam",
        ...r,
        creditLow: taxCredit(r.low),
        creditHigh: taxCredit(r.high),
      });
    }
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8">
      <div
        style={{
          background: "#ffffff",
          borderRadius: "1rem",
          boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "#8B1A1A",
            padding: "1.5rem 2rem",
          }}
        >
          <h2
            style={{
              color: "#ffffff",
              fontSize: "1.5rem",
              fontWeight: 700,
              margin: 0,
              textAlign: "center",
            }}
          >
            Spray Foam Price Estimator
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: "0.875rem",
              textAlign: "center",
              marginTop: "0.25rem",
            }}
          >
            Get a ballpark estimate in under a minute
          </p>
        </div>

        {/* Progress indicator */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "0.5rem",
            padding: "1.25rem 2rem 0.75rem",
          }}
        >
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <div
                style={{
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  background:
                    s === step
                      ? "#C41E1E"
                      : s < step
                        ? "#8B1A1A"
                        : "#e5e7eb",
                  color: s <= step ? "#ffffff" : "#6b7280",
                  transition: "background 0.3s, color 0.3s",
                }}
              >
                {s < step ? "\u2713" : s}
              </div>
              {s < 4 && (
                <div
                  style={{
                    width: "2rem",
                    height: "2px",
                    background: s < step ? "#8B1A1A" : "#e5e7eb",
                    transition: "background 0.3s",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step labels */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1.25rem",
            padding: "0 2rem 1rem",
          }}
        >
          {["Project", "Size", "Foam", "Estimate"].map((label, i) => (
            <span
              key={label}
              style={{
                fontSize: "0.7rem",
                fontWeight: i + 1 === step ? 600 : 400,
                color: i + 1 === step ? "#C41E1E" : "#6b7280",
                textAlign: "center",
                width: "3.5rem",
                transition: "color 0.3s",
              }}
            >
              {label}
            </span>
          ))}
        </div>

        {/* Content */}
        <div style={{ padding: "0.5rem 2rem 2rem" }}>
          {/* Step 1: Project Type */}
          {step === 1 && (
            <div>
              <h3
                style={{
                  fontSize: "1.125rem",
                  fontWeight: 600,
                  color: "#8B1A1A",
                  marginBottom: "1rem",
                }}
              >
                What type of project is this?
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                  gap: "0.75rem",
                }}
              >
                {PROJECT_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setProjectType(type)}
                    style={{
                      padding: "0.875rem 1rem",
                      borderRadius: "0.5rem",
                      border:
                        projectType === type
                          ? "2px solid #C41E1E"
                          : "2px solid #e5e7eb",
                      background:
                        projectType === type ? "rgba(242,125,32,0.08)" : "#fff",
                      color: projectType === type ? "#C41E1E" : "#374151",
                      fontWeight: projectType === type ? 600 : 400,
                      fontSize: "0.95rem",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.2s",
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Square Footage */}
          {step === 2 && (
            <div>
              <h3
                style={{
                  fontSize: "1.125rem",
                  fontWeight: 600,
                  color: "#8B1A1A",
                  marginBottom: "1rem",
                }}
              >
                How many square feet?
              </h3>
              <input
                type="number"
                min={1}
                placeholder="Enter square footage"
                value={sqft}
                onChange={(e) => {
                  const val = e.target.value;
                  setSqft(val === "" ? "" : Math.max(0, Number(val)));
                }}
                style={{
                  width: "100%",
                  padding: "0.875rem 1rem",
                  borderRadius: "0.5rem",
                  border: "2px solid #e5e7eb",
                  fontSize: "1.125rem",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = "#C41E1E")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = "#e5e7eb")
                }
              />
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                  marginTop: "1rem",
                }}
              >
                {SQFT_PRESETS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setSqft(preset)}
                    style={{
                      padding: "0.5rem 1rem",
                      borderRadius: "2rem",
                      border:
                        sqft === preset
                          ? "2px solid #C41E1E"
                          : "2px solid #e5e7eb",
                      background:
                        sqft === preset ? "rgba(242,125,32,0.08)" : "#fff",
                      color: sqft === preset ? "#C41E1E" : "#374151",
                      fontWeight: sqft === preset ? 600 : 400,
                      fontSize: "0.875rem",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    {preset.toLocaleString()} sq ft
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Foam Type */}
          {step === 3 && (
            <div>
              <h3
                style={{
                  fontSize: "1.125rem",
                  fontWeight: 600,
                  color: "#8B1A1A",
                  marginBottom: "1rem",
                }}
              >
                Which type of spray foam?
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                {(
                  [
                    {
                      value: "open" as FoamType,
                      title: "Open Cell",
                      desc: "Lighter, more flexible foam. Great for interior walls and attics. Excellent sound dampening. More affordable option.",
                    },
                    {
                      value: "closed" as FoamType,
                      title: "Closed Cell",
                      desc: "Dense, rigid foam with highest R-value per inch. Superior moisture barrier. Ideal for crawl spaces, metal buildings, and areas needing structural reinforcement.",
                    },
                    {
                      value: "not-sure" as FoamType,
                      title: "Not Sure",
                      desc: "No worries \u2014 we\u2019ll show estimates for both types so you can compare. Our team will recommend the best fit during your free consultation.",
                    },
                  ] as const
                ).map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFoamType(option.value)}
                    style={{
                      padding: "1rem 1.25rem",
                      borderRadius: "0.5rem",
                      border:
                        foamType === option.value
                          ? "2px solid #C41E1E"
                          : "2px solid #e5e7eb",
                      background:
                        foamType === option.value
                          ? "rgba(242,125,32,0.08)"
                          : "#fff",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.2s",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: "1rem",
                        color:
                          foamType === option.value ? "#C41E1E" : "#8B1A1A",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {option.title}
                    </div>
                    <div
                      style={{
                        fontSize: "0.825rem",
                        color: "#6b7280",
                        lineHeight: 1.4,
                      }}
                    >
                      {option.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Results */}
          {step === 4 && (
            <div>
              <h3
                style={{
                  fontSize: "1.125rem",
                  fontWeight: 600,
                  color: "#8B1A1A",
                  marginBottom: "0.25rem",
                }}
              >
                Your Estimated Cost
              </h3>
              <p
                style={{
                  fontSize: "0.825rem",
                  color: "#6b7280",
                  marginBottom: "1.25rem",
                }}
              >
                {projectType} &middot; {numericSqft.toLocaleString()} sq ft
                &middot; {thickness}" thickness
              </p>

              {results.map((r) => (
                <div
                  key={r.label}
                  style={{
                    background: "#f9fafb",
                    borderRadius: "0.75rem",
                    padding: "1.25rem",
                    marginBottom: "1rem",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "#6b7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {r.label}
                  </div>
                  <div
                    style={{
                      fontSize: "1.75rem",
                      fontWeight: 700,
                      color: "#8B1A1A",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {formatCurrency(r.low)} &ndash; {formatCurrency(r.high)}
                  </div>
                  <div
                    style={{
                      fontSize: "0.875rem",
                      color: "#059669",
                      marginBottom: "0.25rem",
                    }}
                  >
                    30% Federal Tax Credit: up to{" "}
                    {formatCurrency(Math.max(r.creditLow, r.creditHigh))}
                  </div>
                  <div
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: 600,
                      color: "#8B1A1A",
                    }}
                  >
                    After Tax Credit: {formatCurrency(r.low - r.creditLow)}{" "}
                    &ndash; {formatCurrency(r.high - r.creditHigh)}
                  </div>
                </div>
              ))}

              {/* Disclaimer */}
              <div
                style={{
                  background: "rgba(242,125,32,0.08)",
                  border: "1px solid rgba(242,125,32,0.25)",
                  borderRadius: "0.5rem",
                  padding: "1rem",
                  marginBottom: "1.5rem",
                }}
              >
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "#92400e",
                    lineHeight: 1.5,
                    margin: 0,
                    fontWeight: 500,
                  }}
                >
                  This is a rough estimate. Actual pricing depends on site
                  conditions, access, prep work, and other factors.
                </p>
              </div>

              {/* CTA */}
              <a
                href="/contact"
                style={{
                  display: "block",
                  width: "100%",
                  padding: "1rem",
                  background: "#C41E1E",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "1.125rem",
                  textAlign: "center",
                  borderRadius: "0.5rem",
                  textDecoration: "none",
                  transition: "background 0.2s",
                  boxSizing: "border-box",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#e06d10")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#C41E1E")
                }
              >
                Want an Exact Price? Get Your Free Estimate
              </a>

              <div
                style={{
                  textAlign: "center",
                  marginTop: "1rem",
                }}
              >
                <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                  Or call us directly:
                </span>{" "}
                <a
                  href="tel:+15803205620"
                  style={{
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "#8B1A1A",
                    textDecoration: "none",
                  }}
                >
                  (580) 320-5620
                </a>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: step > 1 ? "space-between" : "flex-end",
              marginTop: "1.5rem",
              gap: "1rem",
            }}
          >
            {step > 1 && (
              <button
                type="button"
                onClick={back}
                style={{
                  padding: "0.75rem 1.5rem",
                  borderRadius: "0.5rem",
                  border: "2px solid #e5e7eb",
                  background: "#ffffff",
                  color: "#374151",
                  fontWeight: 500,
                  fontSize: "0.95rem",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                Back
              </button>
            )}
            {step < 4 && (
              <button
                type="button"
                onClick={next}
                disabled={!canProceed}
                style={{
                  padding: "0.75rem 2rem",
                  borderRadius: "0.5rem",
                  border: "none",
                  background: canProceed ? "#C41E1E" : "#d1d5db",
                  color: canProceed ? "#ffffff" : "#9ca3af",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  cursor: canProceed ? "pointer" : "not-allowed",
                  transition: "all 0.2s",
                }}
              >
                {step === 3 ? "See Estimate" : "Next"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
