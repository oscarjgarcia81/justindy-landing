# Apple-Style Landing Page - Customization Guide

## Overview
Your Justin AI landing page has been transformed into a premium Apple-style experience with full-screen immersive sections, smooth animations, and dynamic gradients.

## 📁 File Structure

```
src/
├── app/
│   ├── layout.tsx          (Main layout - update metadata)
│   ├── page.tsx            (Main page - includes all sections)
│   └── globals.css         (Global styles - updated for dark theme)
├── components/
│   ├── Header.tsx          (Sticky navigation with scroll effects)
│   ├── Footer.tsx          (Minimal premium footer)
│   └── sections/
│       ├── Hero.tsx        (Full-screen hero with animations)
│       ├── Features.tsx    (4 full-screen feature sections)
│       ├── HowItWorks.tsx  (3 full-screen step sections)
│       ├── Stats.tsx       (Full-screen stats with counters)
│       └── CTA.tsx         (Final call-to-action section) NEW
```

## 🎨 Customization Guide

### 1. Changing Colors

Each section uses unique gradient combinations. To customize:

#### Hero Section (`src/components/sections/Hero.tsx`)
```tsx
// Change background gradient (line ~13)
className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-800 to-black"

// Tailwind gradient options:
// from-slate-900, from-blue-900, from-purple-900, from-black, etc.
```

#### Feature Sections (`src/components/sections/Features.tsx`)
Each feature has unique colors:
```tsx
const features = [
  {
    bgGradient: 'from-blue-900 via-cyan-900 to-black',      // Feature 1
    gradient: 'from-blue-600 to-cyan-600',
  },
  {
    bgGradient: 'from-purple-900 via-pink-900 to-black',    // Feature 2
    gradient: 'from-purple-600 to-pink-600',
  },
  // ... etc
]
```

**Popular Tailwind gradients:**
- Blue-Cyan: `from-blue-900 via-cyan-900 to-black`
- Purple-Pink: `from-purple-900 via-pink-900 to-black`
- Emerald-Teal: `from-emerald-900 via-teal-900 to-black`
- Orange-Red: `from-orange-900 via-red-900 to-black`
- Indigo-Blue: `from-indigo-900 via-blue-900 to-black`

### 2. Changing Text Content

#### Hero Headline
```tsx
// File: src/components/sections/Hero.tsx (line ~65)
<motion.h1 className="text-5xl sm:text-6xl lg:text-7xl ...">
  Never miss an
  <br />
  <motion.span>
    opportunity again  {/* Change this */}
  </motion.span>
</motion.h1>
```

#### Feature Titles & Descriptions
```tsx
// File: src/components/sections/Features.tsx (line ~8)
const features = [
  {
    title: 'AI Lead Generation',  // Change title
    description: 'Automatically find, qualify...',  // Change description
    metric: '50+ qualified leads/month',  // Change metric
  },
  // ...
]
```

#### Stats Numbers
```tsx
// File: src/components/sections/Stats.tsx (line ~26)
const stats = [
  {
    number: 100,     // Change number
    suffix: '+',     // + % hrs, etc.
    label: 'Businesses Helped',  // Change label
    description: 'Growing companies...',  // Change description
  },
  // ...
]
```

### 3. Changing Typography Sizes

Sizes are responsive with patterns like `text-4xl sm:text-5xl lg:text-6xl`:

| Tailwind Class | Size (pixels) |
|---|---|
| `text-xl` | 20px |
| `text-2xl` | 24px |
| `text-4xl` | 36px |
| `text-5xl` | 48px |
| `text-6xl` | 60px |
| `text-7xl` | 72px |

Example - make hero headline smaller:
```tsx
// Change from
<h1 className="text-5xl sm:text-6xl lg:text-7xl">

// To
<h1 className="text-4xl sm:text-5xl lg:text-6xl">
```

### 4. Changing Animation Speeds

Each animation uses a `transition` property. Change `duration` (in seconds):

```tsx
// Current - 0.8 seconds
transition={{ duration: 0.8, delay: 0.2 }}

// Faster - 0.4 seconds
transition={{ duration: 0.4, delay: 0.2 }}

// Slower - 1.5 seconds
transition={{ duration: 1.5, delay: 0.2 }}
```

For continuous animations (like floating orbs):
```tsx
// Current - 4 seconds per cycle
animate={{
  y: [0, 20, 0],
}}
transition={{
  duration: 4,  // Change this
  repeat: Infinity,
}}

// Make it 2 seconds: duration: 2
// Make it 6 seconds: duration: 6
```

### 5. Replacing Placeholder Images

The feature sections have placeholder media boxes. To add real images:

#### Current placeholder (`src/components/sections/Features.tsx`):
```tsx
<motion.div className="relative h-96 lg:h-full rounded-3xl overflow-hidden">
  <div className={`w-full h-full bg-gradient-to-br ${feature.bgGradient}`}>
    {/* Placeholder content */}
  </div>
</motion.div>
```

#### Replace with image:
```tsx
<motion.div className="relative h-96 lg:h-full rounded-3xl overflow-hidden">
  <Image
    src="/images/feature-1.jpg"
    alt={feature.title}
    fill
    className="object-cover"
  />
</motion.div>
```

#### Replace with video:
```tsx
<motion.div className="relative h-96 lg:h-full rounded-3xl overflow-hidden">
  <video
    autoPlay
    muted
    loop
    className="w-full h-full object-cover"
  >
    <source src="/videos/feature-1.mp4" type="video/mp4" />
  </video>
</motion.div>
```

### 6. Changing Button Colors

#### Primary button (Hero)
```tsx
// Current - white background
className="... bg-white text-black ..."

// Change to gradient
className="... bg-gradient-to-r from-blue-600 to-purple-600 text-white ..."
```

#### Secondary button (transparent)
```tsx
// Current - transparent with border
className="... border-2 border-white text-white ..."

// Change to filled
className="... bg-blue-600 text-white ..."
```

### 7. Adjusting Section Heights

To change section heights from full viewport (100vh):

```tsx
// Current - full screen
<section className="relative w-full h-screen ...">

// Half screen
<section className="relative w-full h-1/2 ...">

// Custom height (px-based)
<section className="relative w-full h-[600px] ...">

// Viewport-based (different multipliers)
<section className="relative w-full min-h-[120vh] ...">
```

### 8. Modifying Animation Triggers

Animations trigger when scrolling into view. To adjust:

```tsx
// Current - triggers when element enters viewport
viewport={{ once: true, margin: '-100px' }}

// Trigger sooner (before scrolling to it)
viewport={{ once: true, margin: '-200px' }}

// Trigger later (after scrolling past it)
viewport={{ once: true, margin: '0px' }}

// Allow animation to repeat on scroll
viewport={{ once: false, margin: '-100px' }}
```

### 9. Changing Spacing

Section padding uses custom utility classes:

```tsx
// Hero padding (pt=padding-top, pb=padding-bottom)
<section className="w-full pt-32 pb-16 sm:pt-40 sm:pb-24 lg:pt-48 lg:pb-32">

// Change to:
<section className="w-full pt-16 pb-8 sm:pt-24 sm:pb-16 lg:pt-32 lg:pb-24">
```

| Tailwind Value | Pixels |
|---|---|
| `pt-8` | 32px |
| `pt-16` | 64px |
| `pt-24` | 96px |
| `pt-32` | 128px |
| `pt-48` | 192px |

### 10. Adding New Sections

To add a new full-screen section:

1. Create file: `src/components/sections/NewSection.tsx`
2. Copy template from existing section
3. Customize content and colors
4. Add to `src/app/page.tsx`:

```tsx
import NewSection from '@/components/sections/NewSection'

export default function Home() {
  return (
    <main className="w-full">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <NewSection />  {/* Add here */}
      <Stats />
      <CTA />
      <Footer />
    </main>
  )
}
```

## 🎬 Animation Examples

### Fade In
```tsx
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
/>
```

### Slide In From Left
```tsx
<motion.div
  initial={{ opacity: 0, x: -40 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
/>
```

### Scale Up
```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  whileInView={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.8 }}
/>
```

### Continuous Animation
```tsx
<motion.div
  animate={{
    y: [0, 20, 0],
    rotate: [0, 5, 0],
  }}
  transition={{
    duration: 4,
    repeat: Infinity,
    ease: 'easeInOut',
  }}
/>
```

### Hover Effect
```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click Me
</motion.button>
```

## 📱 Responsive Breakpoints

Tailwind breakpoints used throughout:

```
sm: 640px   (tablets/landscape phones)
md: 768px   (tablets)
lg: 1024px  (desktops)
```

Example:
```tsx
// Mobile: text-4xl, Tablet: text-5xl, Desktop: text-6xl
className="text-4xl sm:text-5xl lg:text-6xl"
```

## 🌐 Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support (iOS 12+)
- IE11: ⚠️ No support (use next.js config to handle)

## 🚀 Performance Tips

1. **Lazy load images** - Use Next.js Image component
2. **Optimize videos** - Compress and use .webm format
3. **Limit animations** - Not every element needs animation
4. **Use `whileInView`** - Don't animate off-screen elements
5. **Test on mobile** - Animations can be heavy on older phones

## 🔧 Debugging

### Animations not working?
- Check `viewport={{ once: true }}` - might already have triggered
- Verify Framer Motion is imported: `import { motion } from 'framer-motion'`
- Check browser console for errors

### Styling issues?
- Verify Tailwind classes are correct (typos disable style)
- Check if custom CSS in `globals.css` is conflicting
- Use browser DevTools to inspect elements

### Performance issues?
- Reduce number of animated elements
- Increase animation duration slightly
- Disable animations on mobile if needed

## 📚 Useful Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Easing Functions](https://easings.net/)

## ✅ Checklist for Customization

- [ ] Updated Hero headline and description
- [ ] Changed feature titles and descriptions
- [ ] Updated stats numbers and labels
- [ ] Changed color schemes to match brand
- [ ] Replaced placeholder images/videos
- [ ] Updated contact information in footer
- [ ] Tested on mobile devices
- [ ] Tested animations at different speeds
- [ ] Checked accessibility (colors have good contrast)
- [ ] Built and tested production version

---

Need help? Check the documentation in:
- `APPLE_STYLE_TRANSFORM.md` - Full transformation details
- `TRANSFORM_SUMMARY.txt` - Quick overview
- Each section file has comments explaining the structure

Happy customizing! 🎨
