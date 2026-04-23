# Project Context: André Torgal personal website (SSG)

## Overview

A custom-built Static Site Generator (SSG) for André Torgal's personal website.

The site is a multi-language, static site deployed to AWS S3 with CloudFront. The static pages are built with custom scripts and nunjucks and the content is stored in markdown and json files. The client side is pure JS modules (unbundled) and CSS is bundled by PostCSS.

It features a custom frontend runtime that preloads pages for instant navigation (SPA-like feel) while maintaining static HTML.

## Core Goals

2. **Performance:** Preload linked pages in the current language via XHR/Fetch, intercept navigation, and swap content without full page reloads.
3. **Privacy & Simplicity:** No tracking, minimal dependencies, pure HTML/CSS/JS.
4. **Maintainability:** Content in Markdown with frontmatter; build script handles routing and translation mapping.

## Directory Structure (Source)

```text
build/                         # Build scripts
├── site.js                    # SSG entry point
├── server.js                  # DEV entry point
└── locale.js                  # Build i18n resources (locale json files)
└── app.js                     # Build client-side code and assets
locale/                        # build i18n resources, 1 per language
src/
├── content/                   # Markdown source filess
│   ├── index.en.md            # /en
│   ├── index.cat.md           # /cat
│   ├── work/
│   │   ├── index.en.md        # /en/work/
│   │   ├── index.cat.md       # /cat/feina/
│   │   └── journey.en.md      # /en/work/journey
│   │   └── journey.en.md      # /cat/feina/viatge
├── templates/                 # Templates (e.g., Nunjucks, Handlebars)
│   ├── components             # Components used in other templates
│   │   ├── lang-switcher.njk  #
│   │   └── ...
│   ├── layouts                # Content layouts, specified in frontmatter
│   │   ├── home.njk           # Layout for homepage
│   │   └── ...
│   ├── index.njk              # Document template (HTML, head, footer, scripts)
├── lib/                       # Client app abstractions and services (state, router, ...)
├── app/                       # Static sources (CSS, JS, Images)
│   ├── components/            # Client-side components (mount on dom produced by SSG on dom ready)
│   ├── features/              # Client-side features (also latch on to existing DOM)
│   ├── styles/                # CSS sources split by layers, compiled and minified by client build
│   └── app.js                 # Main application module (creates containers, router, and components/features)
└── index.js                   # Client-side entry point (handles on dom ready)
```

## Build scripts

### npm run build:locale => build/bin/locale.js

- Scan for locale files `src/{lang}.locale.yml`
- Build i18n resources in `locale/{lang}.locale.json`

### npm run build:site => build/bin/site.js

- Copy public assets
- Scan: Read all .md files in src/content.
- Parse: Extract frontmatter and body and transform nodes:
  - rewrite links to current language
- Map: Generate a single sitemap.json (internationalized data)
- Render: Apply templates (templates/\*.njk) to generate HTML files
- Optimize: Minify CSS/JS
- Output: Write to dist/ folder ready for S3.

### npm run build:app => build/bin/app.js

- Build client-side entry point and page
- Optimize: Minify CSS/JS, inline critical CSS if needed.
- Output: Write to dist/ folder ready for S3.
