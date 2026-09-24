import { useState } from "react";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

type Kind = "cluster" | "regression" | "classification" | "fake";
type Row = Record<string, string | number>;
type Result = { message: string; download_url: string; sample_data: Row[] };
type NumField = { key: string; label: string; hint: string; min: number; max: number; step?: number; def: number };

const KINDS: Record<Kind, { label: string; blurb: string; path: string; fields: NumField[] }> = {
  cluster: {
    label: "Clustering",
    blurb: "Blobs of points around a set of centers. Good for K-Means and DBSCAN.",
    path: "cluster_data",
    fields: [
      { key: "sample", label: "Rows", hint: "How many points", min: 10, max: 10000, step: 10, def: 300 },
      { key: "feature", label: "Features", hint: "Columns per row", min: 1, max: 20, def: 2 },
      { key: "centers", label: "Clusters", hint: "Number of groups", min: 1, max: 15, def: 3 },
      { key: "std", label: "Spread", hint: "0 = tight, 1 = loose", min: 0, max: 1, step: 0.05, def: 0.6 },
      { key: "random_state", label: "Seed", hint: "Same seed, same data", min: 1, max: 9999, def: 42 },
    ],
  },
  regression: {
    label: "Regression",
    blurb: "Numeric features with a continuous target. Good for linear models.",
    path: "regression_data",
    fields: [
      { key: "sample", label: "Rows", hint: "How many points", min: 10, max: 10000, step: 10, def: 500 },
      { key: "feature", label: "Features", hint: "Columns per row", min: 1, max: 30, def: 3 },
      { key: "noise", label: "Noise", hint: "Whole number, higher = messier", min: 1, max: 100, def: 10 },
      { key: "random_state", label: "Seed", hint: "Same seed, same data", min: 1, max: 9999, def: 42 },
    ],
  },
  classification: {
    label: "Classification",
    blurb: "Features with a class label. Good for logistic regression and trees.",
    path: "classification_data",
    fields: [
      { key: "sample", label: "Rows", hint: "How many points", min: 10, max: 10000, step: 10, def: 500 },
      { key: "feature", label: "Features", hint: "Columns per row", min: 2, max: 30, def: 6 },
      { key: "redundant", label: "Redundant", hint: "Columns copied from others", min: 1, max: 10, def: 1 },
      { key: "classes", label: "Classes", hint: "Labels to predict", min: 2, max: 10, def: 2 },
      { key: "random_state", label: "Seed", hint: "Same seed, same data", min: 1, max: 9999, def: 42 },
    ],
  },
  fake: {
    label: "Fake people & text",
    blurb: "Realistic names, emails, addresses and more. Pick the columns you need.",
    path: "fake_data",
    fields: [{ key: "n_dataset", label: "Rows", hint: "How many records", min: 1, max: 5000, def: 50 }],
  },
};

const FAKE_FIELDS = [
  "first_name", "last_name", "name", "age", "email", "contact", "username", "job title",
  "city", "country", "address", "zip code", "past date", "domain", "ipv4", "ipv6",
  "text", "sentence", "word", "color", "hex color", "credit card number",
].map((k) => ({ key: k, label: k.replace("_", " ") }));

const defaults = (k: Kind) => Object.fromEntries(KINDS[k].fields.map((f) => [f.key, f.def]));

async function generate(kind: Kind, values: Record<string, number>, cols: string[]): Promise<Result> {
  const body = kind === "fake" ? { n_dataset: values.n_dataset, list_of_data: cols } : values;
  const res = await fetch(`${API}/generate_datasets/${KINDS[kind].path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const d = json.detail;
    throw new Error(Array.isArray(d) ? d.map((e: any) => `${e.loc?.slice(-1)}: ${e.msg}`).join(", ") : d ?? "Something went wrong");
  }
  return json;
}

function NumberField({ f, value, onChange }: { f: NumField; value: number; onChange: (n: number) => void }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={f.key} className="text-sm font-semibold text-[#0E1B2C]">{f.label}</label>
        <input
          id={f.key}
          type="number"
          value={value}
          min={f.min}
          max={f.max}
          step={f.step ?? 1}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-24 rounded-lg border border-[#0E1B2C]/15 bg-white px-2 py-1 text-right text-sm tabular-nums outline-none focus:border-[#2F5BFF] focus:ring-2 focus:ring-[#2F5BFF]/30"
        />
      </div>
      <input
        type="range"
        aria-label={f.label}
        value={value}
        min={f.min}
        max={f.max}
        step={f.step ?? 1}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-[#2F5BFF]"
      />
      <p className="text-xs text-[#0E1B2C]/60">{f.hint}</p>
    </div>
  );
}

export default function App() {
  const [kind, setKind] = useState<Kind>("cluster");
  const [values, setValues] = useState(defaults("cluster"));
  const [cols, setCols] = useState<string[]>(["name", "email", "city"]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [copied, setCopied] = useState(false);

  const pick = (k: Kind) => {
    setKind(k);
    setValues(defaults(k));
    setResult(null);
    setError("");
  };
  const toggle = (c: string) => setCols((p) => (p.includes(c) ? p.filter((x) => x !== c) : [...p, c]));

  const run = async () => {
    setLoading(true);
    setError("");
    try {
      setResult(await generate(kind, values, cols));
    } catch (e: any) {
      setResult(null);
      setError(e.message === "Failed to fetch" ? `Can't reach the API at ${API}. Is it running, and is CORS enabled?` : e.message);
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result.download_url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const k = KINDS[kind];
  const canRun = !loading && (kind !== "fake" || cols.length > 0);
  const headers = result?.sample_data[0] ? Object.keys(result.sample_data[0]) : [];

  return (
    <div className="min-h-screen bg-[#EDF1F5] text-[#0E1B2C] [font-family:'Bricolage_Grotesque',system-ui,sans-serif]">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&display=swap');`}</style>

      <div className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
        <header className="max-w-2xl">
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
            Make a dataset,<br />download the CSV.
          </h1>
          <p className="mt-4 text-lg text-[#0E1B2C]/70">
            Pick a type, set the knobs, and get a file you can drop straight into a notebook.
          </p>
        </header>

        <div role="tablist" aria-label="Dataset type" className="mt-10 inline-flex flex-wrap gap-1 rounded-2xl bg-white p-1 shadow-sm">
          {(Object.keys(KINDS) as Kind[]).map((key) => (
            <button
              key={key}
              role="tab"
              aria-selected={kind === key}
              onClick={() => pick(key)}
              className={`rounded-xl px-4 py-2 text-sm font-semibold outline-none transition focus-visible:ring-2 focus-visible:ring-[#2F5BFF] ${
                kind === key ? "bg-[#0E1B2C] text-white" : "text-[#0E1B2C]/70 hover:bg-[#EDF1F5]"
              }`}
            >
              {KINDS[key].label}
            </button>
          ))}
        </div>

        <main className="mt-6 grid gap-6 lg:grid-cols-[380px_1fr]">
          <section className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm text-[#0E1B2C]/70">{k.blurb}</p>
            <div className="mt-6 space-y-6">
              {k.fields.map((f) => (
                <NumberField key={f.key} f={f} value={values[f.key]} onChange={(n) => setValues((v) => ({ ...v, [f.key]: n }))} />
              ))}
            </div>

            {kind === "fake" && (
              <fieldset className="mt-6">
                <legend className="text-sm font-semibold">Columns ({cols.length} selected)</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {FAKE_FIELDS.map((f) => {
                    const on = cols.includes(f.key);
                    return (
                      <button
                        key={f.key}
                        type="button"
                        aria-pressed={on}
                        onClick={() => toggle(f.key)}
                        className={`rounded-full border px-3 py-1 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[#2F5BFF] ${
                          on ? "border-transparent bg-[#D7F171] font-semibold" : "border-[#0E1B2C]/15 hover:border-[#0E1B2C]/40"
                        }`}
                      >
                        {f.label}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            )}

            <button
              onClick={run}
              disabled={!canRun}
              className="mt-8 w-full rounded-2xl bg-[#2F5BFF] px-5 py-3.5 text-base font-bold text-white outline-none transition hover:bg-[#2148d6] focus-visible:ring-4 focus-visible:ring-[#2F5BFF]/40 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Generating…" : "Generate dataset"}
            </button>
            {kind === "fake" && cols.length === 0 && (
              <p className="mt-2 text-xs text-[#0E1B2C]/60">Select at least one column to continue.</p>
            )}
          </section>

          <section aria-live="polite" className="min-w-0 rounded-3xl bg-[#0E1B2C] p-6 text-white shadow-sm">
            {error && (
              <div role="alert" className="rounded-2xl bg-[#FF6B6B]/15 p-4 text-sm text-[#FFB3B3]">
                <p className="font-semibold">Couldn't generate the dataset</p>
                <p className="mt-1">{error}</p>
              </div>
            )}

            {loading && (
              <div className="space-y-3" aria-hidden>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-9 animate-pulse rounded-lg bg-white/10" />
                ))}
              </div>
            )}

            {!loading && !error && !result && (
              <div className="flex h-full min-h-[320px] flex-col items-start justify-center">
                <p className="text-2xl font-bold">Your preview shows up here</p>
                <p className="mt-2 max-w-sm text-white/60">
                  Set the options on the left and select Generate dataset. You'll see the first 5 rows and a download link.
                </p>
              </div>
            )}

            {!loading && result && (
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xl font-bold">Dataset ready</p>
                    <p className="text-sm text-white/60">Showing the first {result.sample_data.length} rows</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={copy}
                      className="rounded-xl border border-white/25 px-4 py-2 text-sm font-semibold outline-none transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-[#D7F171]"
                    >
                      {copied ? "Copied" : "Copy link"}
                    </button>
                    <a
                      href={result.download_url}
                      download
                      className="rounded-xl bg-[#D7F171] px-4 py-2 text-sm font-bold text-[#0E1B2C] outline-none transition hover:bg-[#c8e85a] focus-visible:ring-2 focus-visible:ring-white"
                    >
                      Download CSV
                    </a>
                  </div>
                </div>

                <div className="mt-5 overflow-x-auto rounded-2xl border border-white/10">
                  <table className="w-full text-left text-sm tabular-nums">
                    <thead className="bg-white/5 text-white/70">
                      <tr>
                        {headers.map((h) => (
                          <th key={h} className="whitespace-nowrap px-4 py-3 font-semibold">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {result.sample_data.map((row, i) => (
                        <tr key={i} className="border-t border-white/10">
                          {headers.map((h) => (
                            <td key={h} className="whitespace-nowrap px-4 py-3">
                              {typeof row[h] === "number" ? (row[h] as number).toFixed(3).replace(/\.?0+$/, "") : String(row[h])}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
