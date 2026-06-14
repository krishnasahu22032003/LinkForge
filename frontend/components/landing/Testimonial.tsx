"use client"

import { motion, type Easing } from "framer-motion";
import { Star, Quote, Sparkles } from "lucide-react";

const ThemeStyles = () => (
  <style>{`
    :root {
      --color-bg: #08080C;
      --color-surface: rgba(255, 255, 255, 0.03);
      --color-surface-solid: #111116;
      --color-border: rgba(255, 255, 255, 0.07);
      --color-border-hover: rgba(255, 255, 255, 0.14);

      --color-text: #F5F5F7;
      --color-text-muted: #9CA0AE;
      --color-text-dim: #6B7280;

      --color-accent: #6366F1;
      --color-accent-light: #818CF8;
      --color-accent-pale: #A5B4FC;

      --color-success: #34D399;

      --radius: 10px;
      --radius-lg: 14px;
    }

    .lf-root * { border-color: var(--color-border); box-sizing: border-box; }
    .lf-root { color-scheme: dark; }

    .lf-root {
      background: var(--color-bg);
      color: var(--color-text);
      font-family: var(--font-sans);
      -webkit-font-smoothing: antialiased;
    }

    .testimonials { position: relative; overflow: hidden; }
    .testimonials::before {
      content: "";
      position: absolute;
      top: -120px;
      left: 50%;
      transform: translateX(-50%);
      width: 900px;
      height: 600px;
      background: radial-gradient(ellipse, rgba(99,102,241,0.14), rgba(99,102,241,0.03) 45%, transparent 70%);
      pointer-events: none;
      z-index: 0;
    }
    .testimonials::after {
      content: "";
      position: absolute;
      inset: 0;
      background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0);
      background-size: 32px 32px;
      opacity: 0.35;
      pointer-events: none;
      z-index: 0;
    }

    .gradient-text {
      background: linear-gradient(120deg, var(--color-accent-pale), var(--color-accent-light));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
    .gradient-number {
      background: linear-gradient(135deg, #fff, var(--color-accent-pale));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(99, 102, 241, 0.1);
      border: 1px solid rgba(99, 102, 241, 0.25);
      border-radius: 999px;
      padding: 6px 16px;
      font-size: 12px;
      color: var(--color-accent-pale);
    }
    .badge-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--color-accent-light);
    }

    .glass {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      transition: border-color 0.4s ease;
    }
    .glass:hover { border-color: var(--color-border-hover); }

    .avatar-orb {
      position: relative;
      width: 44px;
      height: 44px;
      border-radius: 12px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 13px;
      color: #fff;
      background: linear-gradient(135deg, var(--color-accent), var(--color-accent-pale));
      box-shadow: 0 8px 24px rgba(99,102,241,0.3), 0 0 32px rgba(99,102,241,0.14);
      transition: transform 0.4s ease, box-shadow 0.4s ease;
    }

    .label-muted {
      color: var(--color-text-dim);
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    .result-line { font-family: var(--font-mono); font-size: 13px; }

    @media (prefers-reduced-motion: reduce) {
      * { animation: none !important; transition: none !important; }
    }
  `}</style>
);

const EASE: Easing = [0.22, 1, 0.36, 1] as unknown as Easing;

const TESTIMONIALS = [
  {
    quote:
      "The QR codes alone saved us a separate tool subscription. Every product label now points to a link we can update without reprinting anything.",
    name: "Daniel Reyes",
    role: "Ops Lead, Forma Goods",
    initials: "DR",
  },
  {
    quote:
      "Password-protected links became our default for client previews. Clients feel like they're getting something exclusive, and we get a paper trail of who opened what.",
    name: "Priya Nair",
    role: "Founder, Studio Loom",
    initials: "PN",
  },
  {
    quote:
      "Scheduled links let us queue up an entire launch week in one sitting. Nothing goes live before it should, and nothing needs a follow-up edit.",
    name: "Tomás Alvarez",
    role: "Marketing Manager, Verdant",
    initials: "TA",
  },
  {
    quote:
      "Our whole team works out of one workspace now. No more spreadsheets of links, no more 'who shortened this one' messages on Slack.",
    name: "Hana Suzuki",
    role: "Project Manager, Kaida Co.",
    initials: "HS",
  },
  {
    quote:
      "The API is the cleanest I've integrated in a while. We had link creation wired into our own dashboard within a day, webhooks included.",
    name: "Lucas Bennett",
    role: "Engineering Lead, Pivot Labs",
    initials: "LB",
  },
  {
    quote:
      "Switching domains used to mean broken links everywhere. With LinkForge, the redirect layer just sits quietly underneath and never blinks.",
    name: "Sofia Martins",
    role: "IT Director, Aurora Health",
    initials: "SM",
  },
];

function StarRow() {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="w-3.5 h-3.5"
          style={{ color: "var(--color-accent-light)", fill: "var(--color-accent-light)" }}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <div className="lf-root">
      <ThemeStyles />

      <section className="testimonials px-4 sm:px-6 py-14 sm:py-22">
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">

          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.3, ease: EASE }}
            className="badge"
          >
            <Sparkles className="w-3 h-3" />
            Loved by builders
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 60, filter: "blur(14px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.7, ease: EASE, delay: 0.15 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] text-center mt-7"
          >
            Don't just take
            <br />
            <span className="gradient-text">our word for it.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.5, ease: EASE, delay: 0.35 }}
            className="text-sm sm:text-md max-w-2xl text-center mt-6"
            style={{ color: "var(--color-text-muted)" }}
          >
            From solo founders to ops teams managing thousands of links,
            here's what changed once the shortener stopped getting in the
            way.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full mt-10">
            {TESTIMONIALS.map(({ quote, name, role, initials }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1.4, ease: EASE, delay: 0.08 * i }}
                whileHover={{ y: -8 }}
                className="glass p-6 flex flex-col gap-5"
                style={{ transition: "transform 0.5s ease, border-color 0.4s ease" }}
              >
                <StarRow />
                <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--color-text-muted)" }}>
                  {quote}
                </p>
                <div className="flex items-center gap-3 pt-2 border-t" style={{ borderColor: "var(--color-border)" }}>
                  <motion.div
                    className="avatar-orb"
                    whileHover={{ scale: 1.08, rotate: 4 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    style={{ width: 38, height: 38, fontSize: 12, marginTop: 12 }}
                  >
                    {initials}
                  </motion.div>
                  <div className="flex flex-col text-left mt-3">
                    <span className="text-sm font-semibold">{name}</span>
                    <span className="label-muted">{role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}