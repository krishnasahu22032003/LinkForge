"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleShorten = () => {
    if (!url) return;
    setResult("lnfg.io/" + Math.random().toString(36).slice(2, 8));
    setCopied(false);
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <main>
      <section className="hero min-h-[100vh] flex flex-col">
        {/* Nav */}
        <nav className="relative z-10 flex items-center justify-between px-6 sm:px-10 py-6 max-w-6xl mx-auto w-full">
          <div className="flex items-center gap-2">
            <div className="logo-mark" />
            <span className="font-semibold text-[15px]">LinkForge</span>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-sm text-[var(--color-text-muted)]">
            <span>Product</span>
            <span>Pricing</span>
            <button className="btn-ghost px-4 py-2">Get started</button>
          </div>
        </nav>

        {/* Hero content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pb-16">
          <div className="badge fade-up mb-6">
            <span className="badge-dot" />
            Now with custom domains
          </div>

          <h1 className="fade-up-1 text-4xl sm:text-6xl font-bold tracking-tight mb-4 leading-[1.15] max-w-3xl">
            Links that <span className="gradient-text">work as hard</span>
            <br className="hidden sm:block" /> as you do.
          </h1>

          <p className="fade-up-1 text-[var(--color-text-muted)] text-base sm:text-lg mb-9 max-w-md">
            Shorten, brand, and track every click — beautifully.
          </p>

          <div className="input-shell fade-up-2 flex-col sm:flex-row flex w-full max-w-md">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste your long URL"
              className="input-field flex-1 px-4 py-3"
            />
            <button onClick={handleShorten} className="btn-primary px-6 py-3 whitespace-nowrap">
              Forge link →
            </button>
          </div>

          {result && (
            <div className="glass mt-4 p-3 w-full max-w-md flex items-center justify-between fade-up">
              <div className="result-line flex items-center gap-2">
                <span className="text-[var(--color-text-dim)]">→</span>
                <span style={{ color: "var(--color-accent-light)" }}>{result}</span>
                <span className="cursor" />
              </div>
              <button onClick={handleCopy} className="btn-ghost px-3 py-1.5 text-xs">
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          )}

          {/* Stat cards */}
          <div className="fade-up-3 flex justify-center gap-3 sm:gap-4 mt-14 flex-wrap">
            {[
              ["1,204", "Clicks"],
              ["14", "Countries"],
              ["3", "Active links"],
            ].map(([num, label]) => (
              <div key={label} className="glass px-7 py-5 text-center min-w-[120px]">
                <p className="gradient-number text-3xl font-bold">{num}</p>
                <p className="label-muted mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature section below the fold */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <div className="badge mb-4 mx-auto">Built for teams</div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
            Everything you need, <span className="gradient-text">nothing you don't</span>
          </h2>
          <p className="text-[var(--color-text-muted)] max-w-lg mx-auto">
            From the first link to millions of clicks, LinkForge scales with you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            ["Real-time analytics", "See clicks, locations, and devices the moment they happen, with a live dashboard."],
            ["Custom domains", "Brand every short link with your own domain in minutes — no DNS headaches."],
            ["Built to scale", "From a handful of links to millions, with the reliability enterprise teams need."],
          ].map(([title, desc]) => (
            <div key={title} className="card-solid p-6">
              <div className="logo-mark mb-4" />
              <h3 className="font-medium mb-2">{title}</h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}