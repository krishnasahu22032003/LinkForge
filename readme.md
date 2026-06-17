<div align="center">

<br />

<!-- Logo / Banner -->
██╗     ██╗███╗   ██╗██╗  ██╗███████╗ ██████╗ ██████╗  ██████╗ ███████╗
██║     ██║████╗  ██║██║ ██╔╝██╔════╝██╔═══██╗██╔══██╗██╔════╝ ██╔════╝
██║     ██║██╔██╗ ██║█████╔╝ █████╗  ██║   ██║██████╔╝██║  ███╗█████╗  
██║     ██║██║╚██╗██║██╔═██╗ ██╔══╝  ██║   ██║██╔══██╗██║   ██║██╔══╝  
███████╗██║██║ ╚████║██║  ██╗██║     ╚██████╔╝██║  ██║╚██████╔╝███████╗
╚══════╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝
<h1>
  <b>LinkForge</b>
</h1>

<p>
  A modern, high-performance URL shortener built for speed, analytics, and elegance.<br/>
  Shorten links. Track clicks. Forge your brand.
</p>

<br />

<!-- Badges Row 1 -->
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Prisma-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/Redis-Cache-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)

---

</div>

## ⭐ Support the Project

If LinkForge has been useful or inspired you, consider dropping a star — it truly helps!

[![GitHub Stars](https://img.shields.io/github/stars/krishna-sahu-work/linkforge?style=social)](https://github.com/krishnasahu22032003/LinkForge)

> Every star motivates continued development and helps others discover this project. 🙏

---

## 📸 Screenshots

<br />

**Landing Page** — Clean, conversion-focused hero with animated headline and instant link shortening CTA.

![LinkForge Landing Page](./screenshots/landing.png)

<br />

**Dashboard** — Your command center for all links, analytics, click tracking, and QR code generation.

![LinkForge Dashboard](./screenshots/dashboard.png)

<br />

---

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Architecture Overview](#-architecture-overview)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running Locally](#running-locally)
- [API Reference](#-api-reference)
- [Authentication Flow](#-authentication-flow)
- [Performance & Caching](#-performance--caching)
- [Deployment](#-deployment)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🔗 About the Project

**LinkForge** is a full-stack, production-grade URL shortener that goes far beyond simple link redirection. It is designed with a developer-first mindset — clean API, real-time analytics, custom aliases, and an authentication system built from the ground up using Google OAuth 2.0 and email verification.

The project follows modern best practices throughout: strict TypeScript, RESTful API design, Redis-powered redirect caching for sub-millisecond response times, Framer Motion + GSAP for buttery-smooth UI animations, and a dark design system with premium aesthetics.

LinkForge is split into two independently deployable applications — a **Next.js 15 frontend** and a **custom Express backend** — keeping concerns cleanly separated while sharing type definitions and validation schemas.

---

## ✨ Key Features

### 🔗 Link Management
- **Instant URL shortening** with nanoid-generated slugs
- **Custom aliases** — define your own branded short paths (e.g. `/go/launch`)
- **Link expiration** — set TTL for time-sensitive campaigns
- **Bulk link management** — create, archive, and delete multiple links at once
- **QR code generation** for every shortened link

### 📊 Analytics & Tracking
- **Click tracking** with timestamp, IP, referrer, device, browser, and OS
- **Geo-location data** per click (country, city)
- **Real-time click counter** updated on every redirect
- **Dashboard charts** showing click trends over time (daily / weekly / monthly views)

### 🔐 Authentication & Security
- **Google OAuth 2.0** — one-click sign-in with Google accounts
- **Email & password auth** — traditional sign-up with email confirmation flow
- **Resend-powered transactional emails** — beautiful verification and welcome emails
- **JWT-based sessions** — stateless, secure, and scalable
- **Email verification gate** — only verified accounts can create and manage links

### 🎨 UI & Experience
- **Dark design system** — premium deep background with carefully crafted contrast ratios
- **Framer Motion animations** — page transitions, micro-interactions, stagger effects
- **GSAP scroll animations** — reveal effects and timeline-driven landing page sequences
- **Lucide React icons** — consistent, sharp iconography throughout
- **Fully responsive** — optimized for mobile, tablet, and desktop
- **Custom input components** — styled focus rings, error states, and validation feedback

### ⚡ Performance
- **Redis caching layer** — resolved URLs cached on first hit, redirects served in ~2ms
- **Server components** — Next.js 15 App Router with RSC for zero JS on static pages
- **Optimistic UI** — link creation reflected instantly before server confirmation
- **Image optimization** — Next.js `<Image>` with lazy loading and blur placeholders
- **Debounced API calls** — search and filter with intelligent debouncing

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **Next.js 15** | React framework with App Router, RSC, and SSR |
| **TypeScript** | End-to-end type safety |
| **Tailwind CSS** | Utility-first styling with custom design tokens |
| **Framer Motion** | Page transitions, hover effects, and stagger animations |
| **GSAP** | Complex scroll-driven and timeline-based animations |
| **Lucide React** | Icon library — clean and consistent SVG icons |
| **TanStack Query** | Server state management, caching, and background refetching |
| **React Hook Form** | Performant form handling with minimal re-renders |
| **Zod** | Schema validation shared between client and server |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime |
| **Express.js** | HTTP server and REST API routing |
| **TypeScript** | Strict typing across all controllers and services |
| **Prisma ORM** | Type-safe database client and schema management |
| **PostgreSQL** | Primary relational database for links, users, and analytics |
| **Redis** | URL redirect cache and session storage |
| **Resend** | Transactional email delivery (verification, welcome) |
| **Zod** | Request body and query param validation |
| **JWT (jsonwebtoken)** | Stateless authentication tokens |
| **Google OAuth 2.0** | Third-party authentication provider |
| **nanoid** | Collision-resistant short slug generation |

### DevOps & Tooling
| Technology | Purpose |
|---|---|
| **ESLint + Prettier** | Code linting and consistent formatting |
| **Husky + lint-staged** | Pre-commit hooks for quality gates |
| **Docker + docker-compose** | Local containerized PostgreSQL and Redis |
| **Vercel** | Frontend deployment with edge network |
| **Railway / Render** | Backend API deployment |

---

## 🏗 Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                      │
│              Next.js 15 App (RSC + Client Components)        │
└────────────────────────────┬────────────────────────────────┘
                             │ HTTPS / REST API calls
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                   BACKEND (Express + Node.js)                │
│                                                              │
│   ┌─────────────┐   ┌─────────────┐   ┌─────────────────┐  │
│   │   Auth      │   │   Links     │   │   Analytics     │  │
│   │  Controller │   │  Controller │   │   Controller    │  │
│   └──────┬──────┘   └──────┬──────┘   └────────┬────────┘  │
│          │                 │                    │            │
│   ┌──────▼─────────────────▼────────────────────▼────────┐  │
│   │                    Service Layer                       │  │
│   │   AuthService  │  LinkService  │  AnalyticsService    │  │
│   └──────┬─────────────────┬───────────────────┬─────────┘  │
│          │                 │                   │             │
│   ┌──────▼──────┐  ┌───────▼──────┐           │             │
│   │  PostgreSQL │  │    Redis     │           │             │
│   │  (Prisma)   │  │   (Cache)    │           │             │
│   └─────────────┘  └─────────────┘           │             │
│                                               │             │
│   ┌───────────────────────────────────────────▼──────────┐  │
│   │                   Resend (Email)                      │  │
│   └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Redirect Flow (Critical Path)
```
User hits /<slug>
     │
     ▼
Express Route Handler
     │
     ├──► Redis Cache HIT? ──► 302 Redirect (< 5ms)
     │
     └──► Cache MISS
               │
               ▼
          Postgres Lookup
               │
               ├──► Not Found? ──► 404 Page
               │
               └──► Found
                      │
                      ├──► Write to Redis Cache
                      ├──► Async: record click event
                      └──► 302 Redirect
```

---

## 📁 Project Structure

```
linkforge/
│
├── frontend/                          # Next.js 15 Application
│   ├── app/
│   │   ├── (auth)/                    # Auth route group
│   │   │   ├── signin/page.tsx
│   │   │   ├── signup/page.tsx
│   │   │   ├── verify-email/page.tsx
│   │   │   └── confirm-email/page.tsx
│   │   ├── (dashboard)/               # Protected route group
│   │   │   ├── dashboard/page.tsx
│   │   │   └── links/[id]/page.tsx
│   │   ├── layout.tsx                 # Root layout with providers
│   │   └── page.tsx                   # Landing page
│   │
│   ├── components/
│   │   ├── ui/                        # Primitive UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx              # Custom input with focus ring fix
│   │   │   ├── Modal.tsx
│   │   │   └── Badge.tsx
│   │   ├── dashboard/                 # Dashboard-specific components
│   │   │   ├── LinkCard.tsx
│   │   │   ├── AnalyticsChart.tsx
│   │   │   ├── CreateLinkModal.tsx
│   │   │   └── StatsGrid.tsx
│   │   ├── landing/                   # Landing page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   └── CTA.tsx
│   │   └── shared/                    # Shared layout components
│   │       ├── Navbar.tsx
│   │       └── Footer.tsx
│   │
│   ├── lib/
│   │   ├── api.ts                     # Typed API client (fetch wrapper)
│   │   ├── auth.ts                    # Auth helpers and token management
│   │   └── utils.ts                   # Utility functions
│   │
│   ├── hooks/
│   │   ├── useLinks.ts               # TanStack Query hooks for links
│   │   └── useAuth.ts                # Auth state hook
│   │
│   ├── types/                         # Shared TypeScript types
│   └── styles/
│       └── globals.css                # CSS variables and design tokens
│
├── backend/                           # Express + Node.js API
│   ├── src/
│   │   ├── routes/
│   │   │   ├── auth.routes.ts
│   │   │   ├── link.routes.ts
│   │   │   └── analytics.routes.ts
│   │   │
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts
│   │   │   ├── link.controller.ts
│   │   │   └── analytics.controller.ts
│   │   │
│   │   ├── services/
│   │   │   ├── auth.service.ts        # OAuth, JWT, email verification
│   │   │   ├── link.service.ts        # CRUD, slug generation, caching
│   │   │   ├── cache.service.ts       # Redis abstraction layer
│   │   │   └── email.service.ts       # Resend email templates
│   │   │
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.ts     # JWT verification guard
│   │   │   ├── validate.middleware.ts # Zod schema validation
│   │   │   └── rateLimit.middleware.ts
│   │   │
│   │   ├── prisma/
│   │   │   └── schema.prisma          # Database schema
│   │   │
│   │   ├── utils/
│   │   │   ├── slugGenerator.ts       # nanoid-based slug creation
│   │   │   └── jwt.ts                 # Token sign/verify helpers
│   │   │
│   │   └── index.ts                   # Express app entry point
│   │
│   └── .env.example
│
├── .gitignore
├── docker-compose.yml                 # Local Postgres + Redis
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Ensure the following are installed on your machine:

- **Node.js** `>= 20.x`
- **npm** `>= 10.x` or **pnpm** `>= 9.x`
- **Docker** (for local PostgreSQL and Redis via docker-compose)
- **Git**

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/krishna-sahu-work/linkforge.git
cd linkforge
```

**2. Install frontend dependencies**

```bash
cd frontend
npm install
```

**3. Install backend dependencies**

```bash
cd ../backend
npm install
```

**4. Start the local database and cache**

```bash
# From the project root
docker-compose up -d
```

This spins up PostgreSQL on port `5432` and Redis on port `6379`.

**5. Push the Prisma schema to the database**

```bash
cd backend
npx prisma migrate dev --name init
npx prisma generate
```

### Environment Variables

#### Backend — `backend/.env`

```env
# Server
PORT=5000
NODE_ENV=development

# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/linkforge"

# Redis
REDIS_URL="redis://localhost:6379"

# JWT
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# Email (Resend)
RESEND_API_KEY=re_your_resend_api_key
EMAIL_FROM=noreply@yourdomain.com

# App URLs
FRONTEND_URL=http://localhost:3000
BASE_SHORT_URL=http://localhost:5000
```

#### Frontend — `frontend/.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_BASE_SHORT_URL=http://localhost:5000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Running Locally

**Start the backend API server**

```bash
cd backend
npm run dev
```

The Express server starts at `http://localhost:5000`.

**Start the frontend development server**

```bash
cd frontend
npm run dev
```

The Next.js app starts at `http://localhost:3000`.

---

## 📡 API Reference

All API routes are prefixed with `/api/v1`.


## 🔐 Authentication Flow

### Email & Password

```
Sign Up ──► Email Sent (Resend) ──► Click Verification Link
                                           │
                                           ▼
                                  Account Verified
                                           │
                                           ▼
                                  JWT Issued ──► Access Granted
```

### Google OAuth

```
Click "Sign in with Google"
         │
         ▼
Google Consent Screen
         │
         ▼
Callback to /auth/google/callback
         │
         ├──► New User? ──► Create account ──► JWT Issued
         │
         └──► Existing User? ──► JWT Issued
                                      │
                                      ▼
                               Redirect to Dashboard
```

Tokens are stored in `httpOnly` cookies on the frontend to prevent XSS access, with CSRF protection applied on state-changing routes.

---

## ⚡ Performance & Caching

LinkForge is built to handle high redirect traffic without hammering the database.

**Redis Cache Strategy**

- On first visit to `/:slug`, the backend queries PostgreSQL for the destination URL.
- The resolved URL is then stored in Redis with a `TTL` matching the link's expiry (or a default 24h).
- All subsequent redirects for that slug are served entirely from Redis — no database round-trip.
- When a link is updated or deleted, the corresponding Redis key is invalidated immediately.

**Measured redirect times (local dev):**
- Cold (cache miss): ~12–25ms
- Warm (cache hit): ~2–5ms

**Frontend Performance**
- Next.js 15 App Router with React Server Components for zero client JS on static sections.
- TanStack Query handles stale-while-revalidate patterns for dashboard data.
- GSAP and Framer Motion animations run on the compositor thread, never blocking layout.

---

## 🤝 Contributing

Contributions are what make open source projects thrive. Any improvements are **greatly appreciated**.

1. Fork the repository
2. Create your feature branch — `git checkout -b feature/amazing-feature`
3. Commit your changes — `git commit -m 'feat: add some amazing feature'`
4. Push to the branch — `git push origin feature/amazing-feature`
5. Open a Pull Request

Please ensure:
- TypeScript types are accurate and complete
- ESLint passes with no errors — `npm run lint`
- Meaningful commit messages following [Conventional Commits](https://www.conventionalcommits.org/)
- API changes are reflected in this README

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

---

## 📬 Contact

**Krishna Sahu** — Full-Stack Developer

[![Email](https://img.shields.io/badge/Email-krishna.sahu.work%40gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:krishna.sahu.work@gmail.com)

---

<div align="center">

<br />

Made with ❤️ by **Krishna Sahu**

<br />

*If this project helped you, consider giving it a ⭐ on GitHub — it means a lot!*

[![GitHub Stars](https://img.shields.io/github/stars/krishna-sahu-work/linkforge?style=for-the-badge&logo=github&color=gold&label=Star%20this%20repo)](https://github.com/krishnasahu22032003/LinkForge)

<br />

</div>