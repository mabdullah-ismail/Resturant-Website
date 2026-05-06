# 🍔 Premium Interactive Restaurant Starter (Next.js 15 + GSAP)

This is a premium, high-performance "Scrollytelling" template built for gourmet food brands, boutique restaurants, and high-energy culinary businesses. 

## ✨ Key Features

- **Interactive Scroll Sequence**: Smooth 120-frame image sequence powered by HTML5 Canvas and GSAP.
- **Boutique Aesthetics**: Industrial brutalist design inspired by modern upscale street food brands.
- **3D Animated Receipt**: Custom Framer Motion powered interactive menu that follows user scroll.
- **Mobile First Optimization**: Custom loading queue and memory management for smooth performance on Android & iOS.
- **Global Config System**: Change the entire brand (Menu, Colors, Text, Socials) in seconds via `src/config/site.ts`.
- **Inertial Smooth Scrolling**: Integrated with Lenis for a "premium braking" scroll feel.

## 🚀 Quick Start

### 1. Installation
```bash
npm install
```

### 2. Run Locally
```bash
npm run dev
```

### 3. Customize Your Brand
Open `src/config/site.ts` and update the `siteConfig` object. This will automatically update:
- Hero headlines and mottos.
- Restaurant menu items and pricing.
- Social media links and Map locations.
- Brand logo/shortname.

## 🖼️ Replacing the Scroll Sequence
The sequence is located in `/public/sequence/`.
1. Render 120 frames of your own product (e.g., 1200x800px).
2. Name them `0001.webp` through `0120.webp`.
3. Replace the files in `/public/sequence/`.

## 🛠️ Tech Stack
- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Animation**: [GSAP](https://gsap.com/) & [Framer Motion](https://www.framer.com/motion/)
- **Scrolling**: [Lenis](https://lenis.darkroom.engineering/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

---

*Built for developers who want to wow clients with high-end interaction design.*
