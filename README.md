# Help2Move Web

A modern, conversion-optimised landing page and quote-request platform for **Help2Move** — a Dutch transparent moving service. Built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Pages & Routes](#pages--routes)
- [Key Components](#key-components)
- [Design System](#design-system)
- [Scripts](#scripts)

---

## Overview

Help2Move Web is a Dutch-language marketing site and lead-generation tool for a moving company. Visitors can learn about the services, read testimonials, and submit a detailed quote request through a 3-step interactive form. The form integrates with the **Google Maps Places API** for real-time Dutch, Belgian, and German address autocomplete and calculates the distance between pickup and drop-off locations.

---

## Features

- **Responsive landing page** — hero, trust bar, services grid, how-it-works steps, testimonials, and CTA
- **3-step quote form** — address collection → housing details → contact info, with Zod validation at every step
- **Google Places autocomplete** — restricted to NL/BE/DE, extracts structured address components and lat/lng coordinates
- **Distance calculation** — Haversine formula computes the km between from/to addresses and is included in the quote payload
- **Mobile-first design** — hamburger nav, stacked layouts, touch-friendly inputs
- **Smooth animations** — Framer Motion and CSS keyframe animations
- **Accessibility-friendly** — semantic HTML, visible focus states, ARIA-compatible form structure

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Icons | lucide-react |
| Animations | Framer Motion |
| Forms | react-hook-form + Zod |
| Maps | @googlemaps/js-api-loader |
| Class utilities | clsx + tailwind-merge |
| Linting | ESLint 9 |

---

## Project Structure

```
help2move-web/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout — metadata, Poppins font, html lang="nl"
│   │   ├── page.tsx                # Home page (/)
│   │   ├── offerte/
│   │   │   └── page.tsx            # Quote request page (/offerte)
│   │   └── globals.css             # Global styles, Tailwind theme tokens, utility classes
│   ├── components/
│   │   ├── Header.tsx              # Sticky nav with mobile hamburger menu
│   │   ├── Hero.tsx                # Landing hero with trust badges and quick CTA card
│   │   ├── TrustBar.tsx            # Strip of social proof metrics
│   │   ├── Services.tsx            # 6-service grid
│   │   ├── HowItWorks.tsx          # 4-step process timeline
│   │   ├── Testimonials.tsx        # Customer review cards
│   │   ├── CTASection.tsx          # Bottom call-to-action banner
│   │   ├── Footer.tsx              # Site footer with links and contact details
│   │   ├── OfferteForm.tsx         # Main 3-step multi-step quote form
│   │   ├── AddressAutocomplete.tsx # Google Places address input component
│   │   └── QuoteForm.tsx           # Alternate 4-step quote form (extended services)
│   ├── lib/
│   │   └── utils.ts                # cn() helper for conditional Tailwind classes
│   └── types/
│       └── quote.ts                # TypeScript interfaces: Address, QuoteFormData, QuoteStep
├── public/                         # Static assets (SVGs)
├── .env.local                      # Local environment variables (not committed)
├── next.config.ts                  # Next.js configuration
├── tsconfig.json                   # TypeScript configuration (ES2017, @/* path alias)
├── postcss.config.mjs              # PostCSS with @tailwindcss/postcss
└── eslint.config.mjs               # ESLint 9 flat config
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm**, **yarn**, or **pnpm**
- A **Google Maps Platform** API key with the *Places API* and *Maps JavaScript API* enabled

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd help2move-web

# Install dependencies
npm install
```

### Configure environment variables

Create a `.env.local` file in the project root (see [Environment Variables](#environment-variables)).

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Yes | Google Maps API key. Must have **Places API** and **Maps JavaScript API** enabled. Exposed to the browser (`NEXT_PUBLIC_` prefix). |

> The key is restricted to NL, BE, and DE address suggestions in `AddressAutocomplete.tsx`.

---

## Pages & Routes

| Route | File | Description |
|---|---|---|
| `/` | `src/app/page.tsx` | Marketing landing page |
| `/offerte` | `src/app/offerte/page.tsx` | 3-step quote request form |

---

## Key Components

### `OfferteForm`
The primary lead-capture component. Three steps, each validated independently with Zod before advancing:

1. **Adressen** — pickup and drop-off addresses via `AddressAutocomplete`
2. **Woonsituatie** — dwelling type, floor/elevator details, parking distance, number of people, preferred moving date
3. **Contactgegevens** — full name, email address, phone number

On submission the form calculates the distance between the two addresses using the Haversine formula and displays a success screen with a summary of all collected data.

### `AddressAutocomplete`
Wraps the Google Maps Places API (loaded via `@googlemaps/js-api-loader`). Features:
- Debounced real-time suggestions
- Restricted to `NL`, `BE`, `DE`
- Parses the Places API result into a structured `Address` object (street, house number, postal code, city, country, lat/lng)
- Handles loading and error states gracefully

### `Header`
Sticky navigation bar that changes appearance on scroll. Desktop: logo + nav links + phone CTA. Mobile: collapsed menu toggled by a hamburger icon.

### `Hero`
Full-viewport hero section with:
- Gradient background
- Trust badges (Google rating, certifications, client count, transparent pricing)
- Social proof ticker ("124 personen vroegen deze week een offerte aan")
- Card with primary CTA button linking to `/offerte`

---

## Design System

All design tokens are defined as CSS custom properties in `src/app/globals.css`.

| Token | Value | Usage |
|---|---|---|
| `--color-brand` | `#0074C8` | Primary blue — buttons, links, accents |
| `--color-accent` | `#FF9C24` | Orange — highlights, badges |
| `--color-surface` | `#F4F9FA` | Light background sections |
| `--color-text` | `#282828` | Body text |
| `--color-gray-light` | `#EBEEEB` | Borders, dividers |

**Font:** [Poppins](https://fonts.google.com/specimen/Poppins) (loaded via `next/font/google`)

**Utility classes:**
- `.hero-gradient` — diagonal brand-colour gradient for the hero background
- `.glass` — frosted-glass card effect (backdrop-blur + semi-transparent background)
- `.gradient-text` — brand-colour gradient applied to text via `background-clip`

---

## Scripts

```bash
npm run dev      # Start Next.js development server (with Turbopack)
npm run build    # Build for production
npm run start    # Serve the production build
npm run lint     # Run ESLint across the project
```
