# Customization Guide

## 🎨 Colors & Styling

### Change Primary Colors
Edit `tailwind.config.ts`:
```typescript
theme: {
  extend: {
    colors: {
      background: '#ffffff',    // Page background
      foreground: '#000000',    // Text color
      muted: '#6B7280',        // Secondary text
    },
  },
},
```

### Button Styling
Edit `src/app/globals.css`:
```css
.btn-primary {
  @apply inline-flex items-center justify-center px-6 py-3 
         rounded-lg bg-gray-900 text-white font-medium 
         transition-colors hover:bg-gray-800;
}

.btn-secondary {
  @apply inline-flex items-center justify-center px-6 py-3 
         rounded-lg border border-gray-300 text-gray-900 
         font-medium transition-colors hover:bg-gray-50;
}
```

Change `bg-gray-900` to any Tailwind color: `bg-blue-600`, `bg-indigo-500`, etc.

## ✏️ Content Changes

### Hero Section
File: `src/components/sections/Hero.tsx`

```typescript
// Change headline
<h1 className="text-6xl font-bold">
  Build faster.
  <br />
  <span>Ship smarter.</span>
</h1>

// Change subheadline
<p>A modern platform designed for teams...</p>

// Change button text
<button>Get Started Now</button>
```

### Feature Cards
File: `src/components/sections/Features.tsx`

```typescript
const features = [
  {
    id: 1,
    icon: Zap,              // Change icon from lucide-react
    title: 'Lightning Fast',
    description: 'Optimized performance...',
  },
  // Add more or edit existing
]
```

**Available icons from lucide-react:**
- `Zap`, `Zeppelin` - Lightning/electricity
- `Shield`, `ShieldCheck` - Security
- `Workflow`, `Gitflow` - Process
- `BarChart3`, `TrendingUp` - Analytics
- `Users`, `UserCheck` - People
- `Rocket`, `Target` - Launch/goals
- [See all icons](https://lucide.dev)

### How It Works Steps
File: `src/components/sections/HowItWorks.tsx`

```typescript
const steps = [
  {
    id: 1,
    title: 'Sign Up',
    description: 'Create your account...',
    details: 'Get started instantly...',
  },
  // Modify or add steps
]
```

### Stats/Metrics
File: `src/components/sections/Stats.tsx`

```typescript
const stats = [
  {
    id: 1,
    number: '500K+',
    label: 'Active Users',
    description: 'Teams worldwide...',
  },
  // Update numbers and text
]
```

### Footer Links
File: `src/components/Footer.tsx`

Update href attributes:
```jsx
<a href="/about">About</a>
<a href="/privacy">Privacy</a>
<a href="https://twitter.com/yourhandle">Twitter</a>
```

## 🔧 Layout Changes

### Container Width
Edit `src/app/globals.css`:
```css
.container-max {
  @apply max-w-6xl mx-auto px-4 sm:px-6 lg:px-8;
}
```

Change `max-w-6xl` to:
- `max-w-5xl` (smaller)
- `max-w-7xl` (larger)
- `max-w-screen` (full width)

### Section Padding
Edit `src/app/globals.css`:
```css
.section-padding {
  @apply py-16 sm:py-24 lg:py-32;
}
```

Change padding values (py = padding-y):
- `py-16` = smaller sections
- `py-32` = larger sections
- `py-8` = compact sections

### Grid Columns
Edit feature/stats grid layout:
```jsx
// 4 columns on large screens
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

// Change to 3 columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

## 🎭 Typography

### Heading Sizes
Tailwind size scale:
```
text-lg   → 18px
text-xl   → 20px
text-2xl  → 24px
text-3xl  → 30px
text-4xl  → 36px
text-5xl  → 48px
text-6xl  → 60px
```

Edit section headings in component files:
```jsx
// Make bigger
<h2 className="text-5xl lg:text-6xl">Powerful features</h2>

// Make smaller
<h2 className="text-3xl lg:text-4xl">Powerful features</h2>
```

### Font Weights
```
font-light    → 300
font-normal   → 400
font-medium   → 500
font-semibold → 600
font-bold     → 700
```

## 🌙 Dark Mode (Optional)

### Enable Dark Mode
Edit `tailwind.config.ts`:
```typescript
darkMode: 'class',  // Add this
```

### Add Dark Variants
Update component classes:
```jsx
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Content
</div>
```

### Add Toggle Button
```typescript
'use client'
import { useEffect, useState } from 'react'

export function DarkModeToggle() {
  const [dark, setDark] = useState(false)
  
  const toggle = () => {
    setDark(!dark)
    if (!dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
  
  return <button onClick={toggle}>Toggle Dark Mode</button>
}
```

## ➕ Adding New Sections

### Create New Component
Create `src/components/sections/Testimonials.tsx`:
```typescript
'use client'

export default function Testimonials() {
  return (
    <section id="testimonials" className="w-full section-padding bg-white">
      <div className="container-max">
        {/* Your content here */}
      </div>
    </section>
  )
}
```

### Add to Page
Edit `src/app/page.tsx`:
```typescript
import Testimonials from '@/components/sections/Testimonials'

export default function Home() {
  return (
    <main className="w-full">
      <Header />
      <Hero />
      <Features />
      <Testimonials />  {/* ← Add here */}
      <HowItWorks />
      <Stats />
      <Footer />
    </main>
  )
}
```

## 📦 Add New Dependencies

If you want to add packages:
```bash
npm install package-name
```

Suggested packages:
- `framer-motion` - Animations
- `react-hook-form` - Forms
- `react-intersection-observer` - Scroll effects
- `clsx` - Conditional class names
- `date-fns` - Date utilities

## 🎯 Common Tailwind Classes

### Spacing
```
m-4  = margin 16px (all sides)
mx-4 = margin-x (left & right)
my-4 = margin-y (top & bottom)
p-4  = padding 16px
gap-4 = gap between items
```

### Colors
```
text-gray-900     = dark text
text-gray-600     = secondary text
bg-white          = white background
bg-gray-50        = light gray background
bg-gray-900       = dark background
border-gray-200   = light border
hover:bg-gray-800 = hover state
```

### Sizing
```
w-full    = 100% width
max-w-4xl = max width constraint
aspect-video = 16:9 ratio
h-12 h-16 = height units
```

### Responsive
```
sm:text-lg   = 640px and up
md:grid-cols-2 = 768px and up
lg:text-5xl  = 1024px and up
```

## 🚀 Performance Tips

1. **Use Next.js Image component** for images:
   ```jsx
   import Image from 'next/image'
   <Image src="/logo.png" alt="Logo" width={100} height={100} />
   ```

2. **Optimize icon usage** - lucide-react icons are SVG, lightweight

3. **Keep animations minimal** - use `transition-colors` not complex keyframes

4. **Lazy load sections** - use `'use client'` for interactivity

5. **Minimize external fonts** - system fonts are fast

## 📱 Testing Responsive Design

View mobile version in DevTools:
- Chrome: `Cmd+Shift+M` (Mac) or `Ctrl+Shift+M` (Windows)
- Firefox: `Cmd+Option+M` (Mac) or `Ctrl+Shift+M` (Windows)

Or use Tailwind's browser extension for live preview.

---

**Happy customizing! 🎨**
