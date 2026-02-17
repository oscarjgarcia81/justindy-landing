# Animated Sequences Integration Guide

## Overview

The `AnimatedSequences.tsx` component provides 3 professional, looping animations showcasing AI automation features:

1. **Email Scanning** - Lead detection with envelope opening and scanning effect
2. **Calendar Booking** - Automated meeting scheduling
3. **Phone Notifications** - Real-time report alerts

## Features

✅ **3 Display Modes:**
- `variant="grid"` - Show all 3 side-by-side (responsive to 1 column on mobile)
- `variant="carousel"` - Rotate through animations with nav dots
- `variant="stacked"` - Stack vertically with individual titles

✅ **Performance:**
- GPU-accelerated animations with Framer Motion
- Smooth springs and easing functions
- Viewport-triggered animations (animate only when visible)
- Lightweight lucide-react icons

✅ **Customizable:**
- Auto-rotate interval (default: 6000ms)
- Easy color modifications
- Text content fully editable
- Timing/duration adjustable per animation

## Usage Examples

### 1. Hero Section (Grid Layout)

```tsx
// pages/index.tsx or app/page.tsx
import AnimatedSequences from '@/components/AnimatedSequences'

export default function Home() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Text content */}
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">
              AI-Powered Automation
            </h1>
            <p className="text-gray-400 mb-8">
              Watch how Justin automates lead detection, scheduling, and notifications in real-time.
            </p>
            <button className="px-6 py-3 bg-blue-500 text-white rounded-lg">
              Get Started
            </button>
          </div>

          {/* Right: Animations (grid) */}
          <div>
            <AnimatedSequences variant="grid" />
          </div>

        </div>
      </div>
    </section>
  )
}
```

### 2. Hero Section (Carousel)

```tsx
<section className="py-20 bg-black">
  <div className="container mx-auto px-4 max-w-4xl">
    <h1 className="text-4xl font-bold text-center text-white mb-4">
      Automation in Action
    </h1>
    <p className="text-center text-gray-400 mb-12">
      See Justin's AI automate your workflow
    </p>
    
    {/* Rotating carousel - one animation at a time */}
    <AnimatedSequences 
      variant="carousel"
      autoRotate={true}
      rotationInterval={5000}
    />
  </div>
</section>
```

### 3. Features Section (Stacked)

```tsx
<section className="py-20 bg-gradient-to-b from-black to-gray-950">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-white text-center mb-16">
      How It Works
    </h2>
    
    {/* Stacked animations with descriptions */}
    <AnimatedSequences variant="stacked" />
  </div>
</section>
```

### 4. Individual Animations (Advanced)

```tsx
import {
  EmailScanningAnimation,
  CalendarBookingAnimation,
  PhoneNotificationAnimation,
} from '@/components/AnimatedSequences'

export default function CustomLayout() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-6">
        <EmailScanningAnimation />
        <div>
          <h3>Lead Detection</h3>
          <p>Automatically scans and prioritizes new leads</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <CalendarBookingAnimation />
        <div>
          <h3>Smart Scheduling</h3>
          <p>Books meetings and sends confirmations instantly</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <PhoneNotificationAnimation />
        <div>
          <h3>Real-Time Alerts</h3>
          <p>Get instant notifications when reports are ready</p>
        </div>
      </div>
    </div>
  )
}
```

## Component Props

```tsx
interface AnimatedSequencesProps {
  variant?: 'carousel' | 'grid' | 'stacked'  // Default: 'grid'
  autoRotate?: boolean                        // Default: true
  rotationInterval?: number                   // ms, Default: 6000
}
```

## Customization

### Change Colors

Edit the color classes in `AnimatedSequences.tsx`:

```tsx
// Email animation - change blue to another color
<motion.div className="h-2 bg-gradient-to-r from-blue-400 to-blue-500 ..." />

// Change to purple:
<motion.div className="h-2 bg-gradient-to-r from-purple-400 to-purple-500 ..." />
```

### Adjust Timing

```tsx
// Email text line animation
textLineVariants = {
  visible: {
    width: '100%',
    opacity: 1,
    transition: {
      duration: 0.5,  // ← Change this (lower = faster)
      ease: 'easeOut',
    },
  },
}
```

### Edit Text Content

```tsx
// In EmailScanningAnimation function
[
  { text: 'New lead: John Smith', delay: 0.6 },
  { text: 'Interested in: Lead Gen', delay: 0.9 },
  { text: 'Email: john@company.com', delay: 1.2 },
  // ↑ Edit these texts
].map(...)
```

### Add Your Logo/Branding

```tsx
// Add to any animation component
<motion.img
  src="/logo.png"
  className="w-8 h-8"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.1 }}
/>
```

## Animation Timings

Each animation is designed to complete in 3-4 seconds and loop seamlessly:

**Email Scanning:**
- 0s: Envelope fades in
- 0.3s: Envelope flap opens
- 0.6s: First text line appears + checkmark
- 0.9s: Second text line + checkmark
- 1.2s: Third text line + checkmark
- 1.5s: Status text appears
- ~3.5s: Total animation cycle

**Calendar Booking:**
- 0s: Calendar pops in
- 0.4s: Event block slides from right
- 0.8s: Event text appears
- 1.3s: Checkmark appears
- ~2.7s: Total cycle (best for 3-4s loops with delay)

**Phone Notification:**
- 0s: Phone fades and slides in
- 0.5s: Notification badge pops
- 0.9s: Message appears
- 1.4s: Phone vibrates
- ~2.0s: Total cycle (best for 3-4s loops with delay)

## Accessibility

- All animations respect `prefers-reduced-motion` (add support if needed)
- Icons are decorative, not critical to understanding
- Text content is always visible
- Colors pass AA contrast ratio

## Performance Notes

- Animations use Framer Motion's GPU acceleration
- Icons are from lucide-react (lightweight SVGs)
- No heavy images or external assets needed
- Lazy-loaded with viewport detection
- No impact on Core Web Vitals when used correctly

## Responsive Design

- Grid: 3 columns on desktop, 1 on mobile
- Carousel: Full width responsive
- Stacked: Always full width, adaptive padding
- All animations scale with container

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

**Animations not triggering?**
- Check `whileInView` viewport settings
- Ensure component is within viewport
- Try adding `viewport={{ once: false }}` if needed

**Performance issues?**
- Reduce number of staggered animations
- Increase animation duration
- Use `variant="carousel"` instead of grid

**Text not showing?**
- Check Tailwind color classes are applied
- Ensure dark background for text contrast
- Use `text-gray-300` or `text-white`

## Next Steps

1. Choose your preferred layout (grid/carousel/stacked)
2. Integrate into hero section or features section
3. Customize colors to match brand
4. Test on mobile devices
5. Deploy! 🚀
