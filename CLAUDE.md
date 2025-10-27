# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Epic Swagger is a landing page for a fitness/body transformation service built with Astro 5, Tailwind CSS 4, and Swiper.js for carousels. The site is deployed to Netlify (production only).

**Site URL**: https://www.epicswagger.com

## Development Commands

All commands run from the project root:

- `npm install` - Install dependencies
- `npm run dev` - Start dev server at `localhost:4321`
- `npm run build` - Build for production to `./dist/`
- `npm run preview` - Preview production build locally
- `npm run astro -- --help` - Get help with Astro CLI

## Architecture & Code Organization

### Page Structure

The site uses a single-page layout approach with sectioned components:

- **Main page**: `src/pages/index.astro` - Imports and assembles all sections
- **Layout**: `src/layouts/Layout.astro` - Shared layout with navbar, global styles, font loading
- **Testing pages**: `src/pages/testing.astro` and `src/pages/testing-images.astro` - Development/testing pages

### Component Pattern

Components are organized by section number (Section2, Section4, Section6, etc.) representing different parts of the landing page. Key components:

- `Hero.astro` - Hero section
- `Section2.astro` through `Section11.astro` - Main content sections
- `Gallery.astro` - Transformation gallery with infinite scroll animation (uses CSS animations, not Swiper)
- `CarouselSwiper.astro` - Swiper-based carousel for before/after transformations
- `Steps5.astro` - Steps/process section
- `SideEffects.astro` - Side effects/benefits section
- `Navbar.astro` - Navigation component
- `Logo.astro` - Logo component

**Note**: Not all sections are currently in use on the main page (check `src/pages/index.astro` to see which are included).

### Gallery vs CarouselSwiper

- **Gallery.astro**: Uses CSS `@keyframes` animations for infinite horizontal scrolling transformation cards. Creates two rows (one scrolling right, one left) with duplicated content for seamless looping.
- **CarouselSwiper.astro**: Uses Swiper.js library for interactive before/after carousel with navigation, pagination, and autoplay.

### Styling System

- **Global styles**: `src/styles/global.css` using Tailwind CSS 4 with `@theme` for custom design tokens
- **Font system**:
  - Outfit (brand font for headings) - loaded via Astro experimental fonts
  - Inter - loaded via Astro experimental fonts
  - Optima Nova LT Pro - loaded via Adobe Typekit for body copy
  - New Science - loaded via Adobe Typekit
- **Custom color tokens**:
  - `--color-brand` (#38bdf8) - primary accent
  - `--color-ink` - text colors (ink, ink-2, ink-3 for hierarchy)
  - `--color-surface` - background colors
  - `--color-divider` - border colors
- **Icons**: Uses astro-icon with multiple Iconify collections (@iconify-json/*)

### Client-Side Interactivity

- **Alpine.js**: Loaded from CDN in Layout.astro for lightweight interactions
- **Typed.js**: Available for typing animations
- **Swiper.js**: Used in CarouselSwiper component with Navigation, Pagination, and Autoplay modules

### Assets & Images

- **Public directory structure**:
  - `/public/transformations/` - Before/after transformation images (t000-t009 with -before/-after suffixes)
  - `/public/older versions/` - Legacy logo/favicon files
  - Hero images: `hero.jpg`, `hero.png`, `joe-surf.jpg`

## Configuration Details

### Build Configuration

- **Development**: Uses no adapter (static SSG)
- **Production**: Uses `@astrojs/netlify` adapter (conditionally based on `NODE_ENV`)
- **Vite plugins**: Tailwind CSS 4 via `@tailwindcss/vite`

### Code Formatting

Prettier is configured with:
- `prettier-plugin-astro` - Astro component formatting
- `prettier-plugin-tailwindcss` - Automatic Tailwind class sorting

Run formatting with: `npx prettier --write .`

## TypeScript

Uses Astro's strict TypeScript config (`astro/tsconfigs/strict`). TypeScript is configured but most components use minimal typing (Astro component props are typically defined inline).

## Important Patterns

### Component Script Initialization

Client-side scripts in Astro components (e.g., Swiper initialization in CarouselSwiper) should wrap initialization in `DOMContentLoaded`:

```javascript
document.addEventListener("DOMContentLoaded", () => {
  // initialization code
});
```

### Image Optimization

All transformation images use:
- `loading="lazy"` attribute
- Explicit `width` and `height` attributes
- Consistent aspect ratios (2:3 for transformation photos)

### Responsive Breakpoints

Swiper carousels use these breakpoints:
- 320px: 1.1 slides
- 640px: 1.4 slides
- 1024px: 2.5 slides
- 1280px: 3.5 slides

## Deployment

Production builds deploy to Netlify. The Netlify adapter is only enabled when `NODE_ENV === "production"`.
