# ──────────────────────────────────────────────────────────────────────────────
# Apple‑Level Cinematic Portfolio – Next.js 14 (App Router)
# Tech: Tailwind CSS • Framer Motion • Lenis (buttery smooth scroll) • Red/Black theme
# Pages: Home (cinematic hero + project overview), Projects (grid),
#        Weather Kafka (detail), Healthcare Data (detail), Contact
# Effects: parallax hero, reveal-on-scroll (slide from sides), hover 3D, soft glows
# GitHub/Vercel-ready. Drop in your images under /public.
# ──────────────────────────────────────────────────────────────────────────────

# 📁 File Tree
# my-portfolio/
# ├─ app/
# │  ├─ globals.css
# │  ├─ layout.tsx
# │  ├─ page.tsx
# │  ├─ contact/page.tsx
# │  ├─ projects/page.tsx
# │  ├─ projects/healthcare-data/page.tsx
# │  └─ projects/weather-kafka/page.tsx
# ├─ components/
# │  ├─ AnimatedSection.tsx
# │  ├─ Badge.tsx
# │  ├─ Footer.tsx
# │  ├─ Navbar.tsx
# │  ├─ ParallaxHero.tsx
# │  ├─ ProjectCard.tsx
# │  └─ SmoothScrollProvider.tsx
# ├─ public/
# │  ├─ profile.jpg                         # ← add your image (replace placeholder)
# │  ├─ healthcare-cover.png                # ← add your image
# │  └─ weather-kafka-cover.png             # ← add your image
# ├─ next.config.mjs
# ├─ package.json
# ├─ postcss.config.js
# ├─ tailwind.config.ts
# ├─ tsconfig.json
# ├─ .gitignore
# └─ README.md


# ──────────────────────────────────────────────────────────────────────────────
# package.json
# ──────────────────────────────────────────────────────────────────────────────
{
  "name": "my-portfolio",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@studio-freight/lenis": "^1.0.38",
    "framer-motion": "^11.2.10",
    "next": "^14.2.10",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.45",
    "tailwindcss": "^3.4.14",
    "typescript": "^5.6.3"
  }
}


# ──────────────────────────────────────────────────────────────────────────────
# next.config.mjs
# ──────────────────────────────────────────────────────────────────────────────
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};
export default nextConfig;


# ──────────────────────────────────────────────────────────────────────────────
# postcss.config.js
# ──────────────────────────────────────────────────────────────────────────────
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};


# ──────────────────────────────────────────────────────────────────────────────
# tailwind.config.ts
# ──────────────────────────────────────────────────────────────────────────────
import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: '#0a0a0a',
          900: '#000000'
        },
        primary: {
          DEFAULT: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c'
        }
      },
      boxShadow: {
        glow: '0 0 0 2px rgba(239,68,68,0.35)'
      },
      backgroundImage: {
        grid: 'radial-gradient(rgba(239,68,68,0.08) 1px, transparent 1px)'
      }
    },
  },
  plugins: [],
} satisfies Config


# ──────────────────────────────────────────────────────────────────────────────
# tsconfig.json
# ──────────────────────────────────────────────────────────────────────────────
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "es2020"],
    "jsx": "preserve",
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "strict": true,
    "baseUrl": "."
  },
  "include": ["app", "components", "next-env.d.ts"],
  "exclude": ["node_modules"]
}


# ──────────────────────────────────────────────────────────────────────────────
# .gitignore
# ──────────────────────────────────────────────────────────────────────────────
node_modules
.next
.env
.DS_Store


# ──────────────────────────────────────────────────────────────────────────────
# app/globals.css
# ──────────────────────────────────────────────────────────────────────────────
@tailwind base;
@tailwind components;
@tailwind utilities;

:root { color-scheme: dark; }
html, body {
  @apply bg-base text-white scroll-smooth;
}

/* Subtle red grid background for depth */
.body-bg {
  background-image: theme('backgroundImage.grid');
  background-size: 18px 18px;
}

/***** UI Primitives *****/
.card {
  @apply bg-black/40 border border-white/10 rounded-2xl shadow-md shadow-black/20 hover:shadow-glow transition;
}
.btn { @apply inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-black/40 hover:bg-black/60 hover:border-primary text-white transition; }
.btn-primary { @apply bg-primary hover:bg-primary-600; }
.badge { @apply inline-block text-[11px] tracking-wide uppercase bg-primary/20 text-primary border border-primary/40 px-2.5 py-1 rounded-full; }

/* Apple‑like section spacing */
.section { @apply py-16 sm:py-24; }
.title-xl { @apply text-4xl sm:text-5xl font-extrabold leading-tight; }
.title-lg { @apply text-2xl font-bold; }

/* Hover 3D tilt for cards */
.tilt:hover { transform: perspective(1000px) rotateX(2deg) rotateY(-2deg) translateZ(0); }


# ──────────────────────────────────────────────────────────────────────────────
# components/SmoothScrollProvider.tsx
# ──────────────────────────────────────────────────────────────────────────────
'use client'
import { ReactNode, useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({ smoothWheel: true, lerp: 0.1 })
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    return () => { /* Lenis cleans itself up on unmount */ }
  }, [])
  return <>{children}</>
}


# ──────────────────────────────────────────────────────────────────────────────
# components/Navbar.tsx
# ──────────────────────────────────────────────────────────────────────────────
'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-40 backdrop-blur bg-black/40 border-b border-white/10"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-wider text-white">
          <span className="text-primary">◼</span> Sandeep Thatikonda
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/" className="hover:text-primary">Home</Link>
          <Link href="/projects" className="hover:text-primary">Projects</Link>
          <Link href="/contact" className="hover:text-primary">Contact</Link>
        </nav>
      </div>
    </motion.header>
  )
}


# ──────────────────────────────────────────────────────────────────────────────
# components/Footer.tsx
# ──────────────────────────────────────────────────────────────────────────────
export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-sm text-white/70 flex flex-col sm:flex-row gap-2 items-center justify-between">
        <p>© {new Date().getFullYear()} Sandeep Thatikonda</p>
        <p className="text-white/50">Built with Next.js • Tailwind • Framer Motion • Lenis</p>
      </div>
    </footer>
  )
}


# ──────────────────────────────────────────────────────────────────────────────
# components/Badge.tsx
# ──────────────────────────────────────────────────────────────────────────────
export default function Badge({ children }: { children: React.ReactNode }) {
  return <span className="badge">{children}</span>
}


# ──────────────────────────────────────────────────────────────────────────────
# components/AnimatedSection.tsx
# ──────────────────────────────────────────────────────────────────────────────
'use client'
import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

/** Slides content in from left or right when scrolled into view */
export default function AnimatedSection({ children, direction = 'left', className = '' }: { children: React.ReactNode, direction?: 'left'|'right', className?: string }) {
  const controls = useAnimation()
  const { ref, inView } = useInView({ threshold: 0.18, triggerOnce: true })

  useEffect(() => { if (inView) controls.start({ x: 0, opacity: 1 }) }, [inView, controls])
  const initialX = direction === 'left' ? -60 : 60

  return (
    <motion.section ref={ref} initial={{ x: initialX, opacity: 0 }} animate={controls} transition={{ type: 'spring', stiffness: 80, damping: 16 }} className={className}>
      {children}
    </motion.section>
  )
}


# ──────────────────────────────────────────────────────────────────────────────
# components/ParallaxHero.tsx
# ──────────────────────────────────────────────────────────────────────────────
'use client'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ParallaxHero() {
  const { scrollY } = useScroll()
  const yTitle = useTransform(scrollY, [0, 400], [0, -80])
  const yImage = useTransform(scrollY, [0, 400], [0, -40])
  const opacity = useTransform(scrollY, [0, 300], [1, 0.5])

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-black/60 to-black/20">
      <motion.div style={{ y: yTitle, opacity }} className="p-10 sm:p-16">
        <div className="flex items-center gap-3 mb-4">
          <span className="badge">DATA ENGINEER</span>
          <span className="badge">AI • Cloud</span>
          <span className="badge">AWS</span>
        </div>
        <h1 className="title-xl">
          Hi, I’m <span className="text-primary">Sandeep Thatikonda</span> — I build
          <span className="text-primary"> scalable</span> data platforms & AI pipelines.
        </h1>
        <p className="mt-4 text-white/80 max-w-prose">
          Real-time streaming, medallion data lakes, Snowflake/DBT, orchestration, and data quality — with
          cinematic UX inspired by Apple.
        </p>
      </motion.div>
      <motion.div style={{ y: yImage }} className="px-10 pb-10 sm:px-16 sm:pb-16">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/profile.jpg" alt="Sandeep profile" className="w-40 h-40 sm:w-52 sm:h-52 rounded-3xl object-cover border border-white/10 shadow-glow" />
      </motion.div>
    </div>
  )
}


# ──────────────────────────────────────────────────────────────────────────────
# components/ProjectCard.tsx
# ──────────────────────────────────────────────────────────────────────────────
import Link from 'next/link'

export default function ProjectCard({ slug, title, excerpt, image }: { slug: string, title: string, excerpt: string, image: string }) {
  return (
    <Link href={`/projects/${slug}`} className="group card overflow-hidden block tilt">
      <div className="aspect-video w-full bg-black/50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition" />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition">{title}</h3>
        <p className="text-white/70 text-sm">{excerpt}</p>
        <div className="mt-4">
          <span className="btn btn-primary text-sm">View details →</span>
        </div>
      </div>
    </Link>
  )
}


# ──────────────────────────────────────────────────────────────────────────────
# app/layout.tsx
# ──────────────────────────────────────────────────────────────────────────────
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'

export const metadata = {
  title: 'Sandeep Thatikonda | Portfolio',
  description: 'Apple-level cinematic portfolio in red & black with animations.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="body-bg min-h-screen flex flex-col">
        <SmoothScrollProvider>
          <Navbar />
          <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-10">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}


# ──────────────────────────────────────────────────────────────────────────────
# app/page.tsx (Home)
# ──────────────────────────────────────────────────────────────────────────────
import ParallaxHero from '@/components/ParallaxHero'
import AnimatedSection from '@/components/AnimatedSection'
import Badge from '@/components/Badge'
import ProjectCard from '@/components/ProjectCard'

export default function HomePage() {
  return (
    <div className="space-y-16">
      <ParallaxHero />

      {/* Skills snapshot */}
      <AnimatedSection direction="right" className="card p-6">
        <h2 className="title-lg mb-2">What I do</h2>
        <p className="text-white/80">
          • Real-time streaming (Kafka) • ELT/ETL (Python/SQL/DBT) • AWS (S3, Lambda, Step Functions, Glue) • Data Quality (Great Expectations)
          • Observability • Cost/perf optimization • AI agents on curated datasets.
        </p>
      </AnimatedSection>

      {/* Projects overview */}
      <AnimatedSection direction="left">
        <h2 className="title-lg mb-4">Featured Projects</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <ProjectCard
            slug="weather-kafka"
            title="Weather Kafka Pipeline"
            excerpt="Flask → Kafka streaming, resilient consumers, Snowflake warehousing, and BI dashboards."
            image="/weather-kafka-cover.png"
          />
          <ProjectCard
            slug="healthcare-data"
            title="Healthcare Data Quality Platform"
            excerpt="AWS Medallion (Raw→Quarantine→Curated), Step Functions + Glue, Great Expectations, AI insights."
            image="/healthcare-cover.png"
          />
        </div>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection direction="right" className="card p-6 flex items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold">Open to roles & collaborations</h3>
          <p className="text-white/70">Have a data problem? Let’s solve it with craftsmanship.</p>
        </div>
        <a href="/contact" className="btn btn-primary">Contact Me</a>
      </AnimatedSection>
    </div>
  )
}


# ──────────────────────────────────────────────────────────────────────────────
# app/projects/page.tsx
# ──────────────────────────────────────────────────────────────────────────────
import AnimatedSection from '@/components/AnimatedSection'
import ProjectCard from '@/components/ProjectCard'

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      <AnimatedSection direction="left">
        <h1 className="title-lg mb-2">Projects</h1>
        <p className="text-white/80">A curated selection of my work.</p>
      </AnimatedSection>

      <div className="grid md:grid-cols-2 gap-6">
        <AnimatedSection direction="left">
          <ProjectCard
            slug="weather-kafka"
            title="Weather Kafka Pipeline"
            excerpt="Producer/consumer microservices, schema evolution, dead-letter topic, and curated marts."
            image="/weather-kafka-cover.png"
          />
        </AnimatedSection>
        <AnimatedSection direction="right">
          <ProjectCard
            slug="healthcare-data"
            title="Healthcare Data Quality Platform"
            excerpt="S3 medallion zones, Step Functions orchestration, Glue transforms, Great Expectations checks."
            image="/healthcare-cover.png"
          />
        </AnimatedSection>
      </div>
    </div>
  )
}


# ──────────────────────────────────────────────────────────────────────────────
# app/projects/weather-kafka/page.tsx
# ──────────────────────────────────────────────────────────────────────────────
import AnimatedSection from '@/components/AnimatedSection'
import Badge from '@/components/Badge'

export const metadata = { title: 'Weather Kafka – Project Details' }

export default function WeatherKafkaProject() {
  return (
    <div className="space-y-8">
      <AnimatedSection direction="left">
        <h1 className="title-lg mb-2">Weather Kafka Pipeline</h1>
        <div className="flex gap-2 mb-4">
          <Badge>Kafka</Badge><Badge>Flask</Badge><Badge>Docker</Badge><Badge>Snowflake</Badge><Badge>Power BI</Badge>
        </div>
        <p className="text-white/80 max-w-3xl">
          An end-to-end streaming pipeline that ingests live weather from a Flask producer into Kafka topics. Consumers
          validate, enrich, and upsert into Snowflake. BI dashboards provide near real-time insight.
        </p>
      </AnimatedSection>

      <AnimatedSection direction="right" className="grid md:grid-cols-2 gap-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/weather-kafka-cover.png" alt="Weather Kafka" className="w-full rounded-xl border border-white/10" />
        <div className="card p-5">
          <h3 className="text-xl font-semibold mb-2">Highlights</h3>
          <ul className="list-disc list-inside text-white/80 space-y-1">
            <li>Idempotent consumers with retries and dead-letter topics.</li>
            <li>Schema evolution strategy, partitioning for scale.</li>
            <li>Dockerized local dev via Compose; CI on push to main.</li>
            <li>Snowflake staging → curated dimensional models.</li>
            <li>Structured logs, metrics hooks for observability.</li>
          </ul>
        </div>
      </AnimatedSection>

      <AnimatedSection direction="left" className="card p-5">
        <h3 className="text-xl font-semibold mb-2">Stack & Flow</h3>
        <p className="text-white/80">Flask (producer) → Kafka → Python consumers → Snowflake → Power BI dashboards.</p>
        <div className="mt-4 flex gap-3">
          <a className="btn btn-primary" href="https://github.com/sandeep1655" target="_blank" rel="noreferrer">GitHub</a>
          <a className="btn" href="/projects">Back to Projects</a>
        </div>
      </AnimatedSection>
    </div>
  )
}


# ──────────────────────────────────────────────────────────────────────────────
# app/projects/healthcare-data/page.tsx
# ──────────────────────────────────────────────────────────────────────────────
import AnimatedSection from '@/components/AnimatedSection'
import Badge from '@/components/Badge'

export const metadata = { title: 'Healthcare Data – Project Details' }

export default function HealthcareProject() {
  return (
    <div className="space-y-8">
      <AnimatedSection direction="left">
        <h1 className="title-lg mb-2">Healthcare Data Quality Platform</h1>
        <div className="flex gap-2 mb-4">
          <Badge>AWS</Badge><Badge>S3</Badge><Badge>Step Functions</Badge><Badge>Glue</Badge><Badge>Great Expectations</Badge>
        </div>
        <p className="text-white/80 max-w-3xl">
          Production-grade medallion architecture: Raw → Quarantine → Curated zones in S3. Step Functions orchestrate
          Lambdas and Glue jobs. Great Expectations enforces data quality. An AI agent operates on curated data to flag
          anomalies and provide insight summaries.
        </p>
      </AnimatedSection>

      <AnimatedSection direction="right" className="grid md:grid-cols-2 gap-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/healthcare-cover.png" alt="Healthcare Data" className="w-full rounded-xl border border-white/10" />
        <div className="card p-5">
          <h3 className="text-xl font-semibold mb-2">Highlights</h3>
          <ul className="list-disc list-inside text-white/80 space-y-1">
            <li>Zone promotions with automated quarantine policy.</li>
            <li>Observability and error routing patterns.</li>
            <li>Glue-based transforms; partitioned curated datasets.</li>
            <li>AI agent on curated datasets for anomaly surfacing.</li>
          </ul>
        </div>
      </AnimatedSection>

      <AnimatedSection direction="left" className="card p-5">
        <h3 className="text-xl font-semibold mb-2">Stack & Flow</h3>
        <p className="text-white/80">S3 Zones → Step Functions → Lambdas/Glue → Great Expectations → Curated insight layer.</p>
        <div className="mt-4 flex gap-3">
          <a className="btn btn-primary" href="https://github.com/sandeep1655" target="_blank" rel="noreferrer">GitHub</a>
          <a className="btn" href="/projects">Back to Projects</a>
        </div>
      </AnimatedSection>
    </div>
  )
}


# ──────────────────────────────────────────────────────────────────────────────
# app/contact/page.tsx
# ──────────────────────────────────────────────────────────────────────────────
import AnimatedSection from '@/components/AnimatedSection'

export const metadata = { title: 'Contact – Sandeep Thatikonda' }

export default function ContactPage() {
  return (
    <AnimatedSection direction="left" className="max-w-2xl mx-auto card p-8">
      <h1 className="title-lg mb-2">Contact</h1>
      <p className="text-white/80 mb-6">Let’s build something great together.</p>
      <div className="space-y-3 text-white/90">
        <p><span className="text-white/60">Email:</span> <a className="hover:text-primary" href="mailto:sthatikonda666@gmail.com">sthatikonda666@gmail.com</a></p>
        <p><span className="text-white/60">GitHub:</span> <a className="hover:text-primary" href="https://github.com/sandeep1655" target="_blank" rel="noreferrer">github.com/sandeep1655</a></p>
        <p><span className="text-white/60">Phone:</span> <a className="hover:text-primary" href="tel:+16143779873">+1 614-377-9873</a></p>
      </div>
    </AnimatedSection>
  )
}


# ──────────────────────────────────────────────────────────────────────────────
# README.md
# ──────────────────────────────────────────────────────────────────────────────
# Sandeep Thatikonda – Cinematic Portfolio (Next.js)

Red & black Apple‑inspired portfolio with parallax hero, buttery smooth scroll, slide‑in reveals, and hover depth.

## 🚀 Quick start
```bash
npm install
npm run dev
# open http://localhost:3000
```

## 🧩 Replace assets
- Add your headshot at `public/profile.jpg` (square works best)
- Add project covers: `public/weather-kafka-cover.png`, `public/healthcare-cover.png`

## 🔧 Tech
- Next.js 14 (App Router)
- Tailwind CSS
- Framer Motion (reveal animations)
- Lenis (smooth scroll)

## 🌐 Deploy to Vercel
1. Push to GitHub
2. Import the repo at https://vercel.com/new
3. Accept defaults and Deploy

---

> Tip: For even more Apple‑style flair, consider adding video hero loops (muted/auto‑play) and GSAP ScrollTrigger for section‑pinned storytelling.
