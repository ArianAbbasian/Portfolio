# Arian Abbasian — Personal Portfolio

A bilingual personal portfolio website built with **Next.js, TypeScript, and Tailwind CSS**.

The portfolio serves two main purposes:

* Present Arian as a serious **Frontend Developer** to recruiters.
* Attract **business clients** who need a professional, modern website.

**Live Site:** [arianabbasian.ir](https://arianabbasian.ir)

---

## Features

*  Fully bilingual (**English & Persian**) with RTL support
*  Dark / light theme with no flash on initial load
*  Custom scrollbar and custom cursor on desktop
*  Fully responsive and performance-conscious
*  Desktop and mobile layouts optimized separately for heavy animations
*  Dynamic project showcase

  * Horizontal scrolling on desktop
  * Vertical layout on mobile
*  Project modal with image gallery and lightbox
*  Smooth GSAP and Framer Motion animations with carefully scoped usage
*  Structured data for SEO (`Person` + `WebSite`)
*  Floating contact button
*  Static export ready for deployment on static hosting

---

## Tech Stack

| Category             | Technology                          |
| -------------------- | ----------------------------------- |
| Framework            | Next.js (App Router)                |
| Language             | TypeScript                          |
| Styling              | Tailwind CSS v4                     |
| Animation            | GSAP (ScrollTrigger), Framer Motion |
| Icons                | Lucide React                        |
| Internationalization | next-intl                           |
| English Font         | Satoshi                             |
| Persian Font         | IranYekan                           |

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

* **Node.js 18.17 or later**
* **npm** or **yarn**

### Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/ArianAbbasian/portfolio.git
cd portfolio
npm install
```

---

## Development

Run the development server:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

The root path `/` redirects to `/fa` by default.

---

## Build & Export

The website is configured for **static export**.

Build the project with:

```bash
npm run build
```

The generated static files will be available in:

```text
out/
```

Because `output: 'export'` is configured in `next.config.ts`, all pages are pre-rendered at build time.

---

## Project Structure

```text
portfolio/
├── app/
│   ├── [locale]/              # Locale-scoped pages and layout
│   ├── globals.css            # Design tokens, utilities, custom CSS
│   ├── layout.tsx             # Root layout, fonts, metadata
│   ├── page.tsx               # Root redirect component
│   ├── robots.ts              # Robots metadata
│   ├── sitemap.ts             # Sitemap generation
│   └── root-redirect.tsx      # Client-side redirect fallback
│
├── components/
│   ├── about/                 # About page sections
│   ├── home/                  # Hero, Services, Projects
│   ├── layout/                # Header, Footer, FloatingContact, etc.
│   ├── projects/              # ProjectModal
│   ├── ui/                    # Lightbox and shared UI
│   └── structured-data.tsx     # Structured data
│
├── constants/
│   ├── projects.ts            # Bilingual project data
│   └── project-themes.ts      # Per-project color themes
│
├── hooks/                     # Custom React hooks
│   ├── useIsTouchDevice
│   └── useMounted
│
├── i18n/                      # next-intl configuration
├── lib/                       # Site configuration
├── messages/                  # Translation files
│   ├── en.json
│   └── fa.json
│
├── public/                    # Images, fonts, videos, resume
├── next.config.ts
├── proxy.ts                   # next-intl middleware
└── tsconfig.json
```

---

## Internationalization

The website supports both **English** and **Persian**.

All user-facing strings are stored in:

```text
messages/en.json
messages/fa.json
```

The active locale is determined by the URL:

```text
/en
/fa
```

RTL direction and the `lang` attribute are handled dynamically through `LocaleHtml` to prevent a flash of incorrect text direction during page load.

Both languages are written naturally rather than being translated word-for-word. This keeps the tone, wording, and cultural context appropriate for each language.

---

## Performance

The website is built with **mobile performance** in mind.

Several techniques are used to reduce unnecessary rendering and improve the overall experience.

### Split Rendering

Components such as:

* `AboutMe`
* `AboutSkills`
* `AboutGoals`

use different layouts for desktop and mobile.

This prevents heavy scroll-driven animations from running unnecessarily on smaller devices.

### Reduced Backdrop Filters

Backdrop blur effects are reduced on mobile:

```text
backdrop-blur-sm
```

while larger screens use:

```text
md:backdrop-blur-2xl
```

### Video Handling

Videos are only played when they are visible using `IntersectionObserver`.

Where appropriate, videos are replaced with static images on mobile devices.

### Motion Values Instead of React State

Components such as `AboutEducation` and `AboutExperience` use `useTransform` instead of combining `useState` with `useMotionValueEvent`.

This reduces unnecessary React re-renders during scroll interactions.

### Custom Scrollbar

Only the main document scrollbar is visible.

Inner scrollbars are hidden to reduce visual noise and unnecessary UI elements.

### Lazy Loading

Project images and skill icons use lazy loading where appropriate.

---

## SEO

The website includes several SEO-focused features:

* Locale-specific metadata
* `hreflang` alternates
* Canonical URLs
* `robots.txt`
* `sitemap.xml`
* Structured data:

  * `Person`
  * `WebSite`
* `noindex` on the root redirect page
* Clean and semantic HTML

### Known SEO Limitations

There are currently a few known limitations:

* No `og:image` has been implemented yet.
* The root redirect is handled client-side.

For production hosting, a server-side **301 redirect** from `/` to `/fa/` is recommended.

---

## Deployment

The website is deployed as a static site on **cPanel hosting**.

Since the project uses static export, deployment only requires uploading the contents of the `out/` directory to the server.

### Recommended `.htaccess` Redirect

To redirect the root path `/` to `/fa/` using a permanent HTTP 301 redirect, add the following to `.htaccess` in the public root:

```apache
RewriteEngine On
RewriteRule ^$ /fa/ [R=301,L]
```

---

## Contact

* **Email:** [ArianAbbasian013@gmail.com](mailto:ArianAbbasian013@gmail.com)
* **Telegram:** [@Arian_Abbasian](https://t.me/Arian_Abbasian)
* **LinkedIn:** [linkedin.com/in/arian-abbasian](https://www.linkedin.com/in/arian-abbasian)
* **GitHub:** [github.com/ArianAbbasian](https://github.com/ArianAbbasian)

---

## License

This project is a **personal portfolio** and is not intended for public reuse.

You are welcome to browse and learn from the code, but please do not use this project as a template or redistribute it without permission.
