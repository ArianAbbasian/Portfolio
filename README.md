# Arian Abbasian — Personal Portfolio

A bilingual personal portfolio website built with Next.js, TypeScript, and Tailwind CSS.  
It serves two purposes: to present Arian as a serious Frontend Developer to recruiters, and to attract business clients who need a professional website.

**Live site:** [arianabbasian.ir](https://arianabbasian.ir)

---

## Features

- Fully bilingual (English & Persian) with RTL support
- Dark / light theme with no flash on load
- Custom scrollbar and custom cursor (desktop only)
- Responsive and performance‑conscious — heavy animations are split between desktop and mobile
- Dynamic project showcase with horizontal scroll on desktop, vertical on mobile
- Project modal with image gallery and lightbox
- Smooth GSAP and Framer Motion animations, but carefully scoped
- Structured data (Person + WebSite) for SEO
- Floating contact button
- Static export ready for any static host

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** GSAP (ScrollTrigger) + Framer Motion
- **Icons:** Lucide React
- **i18n:** next-intl
- **Fonts:** Satoshi (English), IranYekan (Persian) loaded locally

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

Clone the repo and install dependencies:

bash
git clone https://github.com/ArianAbbasian/portfolio.git
cd portfolio
npm install
Development
Run the dev server:

bash
npm run dev
Open http://localhost:3000.
The root path / redirects to /fa by default.

Build & Export
The site is statically exported:

bash
npm run build
The output will be in the out/ directory.
Because output: 'export' is set, all pages are pre‑rendered at build time.

Project Structure
text
portfolio/
├── app/
│   ├── [locale]/          # locale‑scoped pages and layout
│   ├── globals.css        # design tokens, utilities, custom CSS
│   ├── layout.tsx         # root layout (fonts, metadata)
│   ├── page.tsx           # root redirect component
│   ├── robots.ts
│   ├── sitemap.ts
│   └── root-redirect.tsx  # client‑side redirect fallback
├── components/
│   ├── about/             # all About page sections
│   ├── home/              # Hero, Services, Projects
│   ├── layout/            # Header, Footer, FloatingContact, etc.
│   ├── projects/          # ProjectModal
│   ├── ui/                # Lightbox
│   └── structured-data.tsx
├── constants/
│   ├── projects.ts        # project data (bilingual)
│   └── project-themes.ts  # per‑project color themes
├── hooks/                 # useIsTouchDevice, useMounted
├── i18n/                  # next-intl request config
├── lib/                   # site config
├── messages/              # en.json, fa.json
├── public/                # images, fonts, videos, resume
├── next.config.ts
├── proxy.ts               # next-intl middleware
└── tsconfig.json
Internationalization
All user‑facing strings live in messages/en.json and messages/fa.json.
The locale is determined by the URL segment (/en, /fa).
RTL direction and lang attribute are set dynamically on the client via LocaleHtml to avoid a flash of wrong direction.

Both languages are written naturally, not word‑for‑word translations.
This matters for tone and cultural appropriateness.

Performance Notes
The site is built with mobile performance in mind. Some techniques used:

Split rendering: components like AboutMe, AboutSkills, AboutGoals render completely different layouts for desktop and mobile. This avoids running heavy scroll‑driven animations on small screens.

Reduced backdrop‑filter on mobile: several components use backdrop-blur-sm on mobile and md:backdrop-blur-2xl on desktop.

Video handling: videos only play when visible (IntersectionObserver) and are replaced by static images on mobile where appropriate.

Motion values, not state: AboutEducation and AboutExperience use useTransform instead of useState + useMotionValueEvent to avoid React re‑renders during scroll.

Custom scrollbar: only the main document scrollbar is visible; inner scrollbars are hidden to reduce visual noise and improve performance.

Lazy loading: project images and skill icons use loading="lazy".

SEO
The site includes:

Metadata for each locale with alternates (hreflang) and canonical URLs

robots.txt and sitemap.xml

Structured data (Person, WebSite)

noindex on the root redirect page

Clean, semantic HTML

A few known limitations: no og:image yet, and the root redirect is client‑side (a 301 from the hosting server is recommended). But overall the foundation is solid.

Deployment
The site is deployed on a static host (cPanel).
Since the build output is static, simply upload the contents of the out/ directory (or the build folder) to your server.

For a 301 redirect from / to /fa, add this to .htaccess in the public root:

apache
RewriteEngine On
RewriteRule ^$ /fa/ [R=301,L]
Contact
Email: ArianAbbasian013@gmail.com

Telegram: @Arian_Abbasian

LinkedIn: linkedin.com/in/arian-abbasian

GitHub: github.com/ArianAbbasian

License
This project is personal and not intended for public reuse.
Feel free to browse the code, but please do not use it as a template without permission.
