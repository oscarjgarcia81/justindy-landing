# Dynamic Media Background Guide

## Overview

The Justin AI landing page now supports dynamic media backgrounds using the `DynamicBackground` component. This allows you to:

- Add video backgrounds to sections
- Add image backgrounds
- Fall back to gradient backgrounds automatically
- Customize overlay opacity for text readability
- Easily swap media sources without code changes

## What Was Added

### 1. **DynamicBackground Component** (`src/components/DynamicBackground.tsx`)

A reusable, performance-optimized component that handles:
- HTML5 video backgrounds with autoplay/muted/loop
- Image backgrounds as fallbacks
- Gradient fallbacks when media fails to load
- Dark overlay for text readability
- GPU acceleration for smooth playback
- Error handling and graceful degradation

### 2. **Updated Sections**

All major sections now use `DynamicBackground`:

#### Hero Section
- **Current:** Free stock video from Pexels (tech/digital theme)
- **Video URL:** `https://videos.pexels.com/video-files/3945683/3945683-hd_1920_1080_30fps.mp4`
- **Overlay:** 75% opacity

#### Features Section
- **Style:** Individual feature cards with gradient backgrounds
- **Gradients:** Blue, purple, green, orange tones (customizable per card)
- **Overlay:** 75% opacity per card

#### Stats Section
- **Current:** Free stock video from Pexels (abstract tech)
- **Video URL:** `https://videos.pexels.com/video-files/3131655/3131655-sd_640_360_30fps.mp4`
- **Overlay:** 70% opacity

#### CTA Section
- **Current:** Free stock video from Pexels (professional/corporate)
- **Video URL:** `https://videos.pexels.com/video-files/3930282/3930282-hd_1920_1080_30fps.mp4`
- **Overlay:** 80% opacity

### 3. **Styling** (`src/app/globals.css`)

Added video-specific CSS:
- GPU acceleration classes (`.video-bg`, `.animate-gpu`)
- Responsive video optimization
- Cross-browser compatibility

## How to Use

### Basic Usage

```tsx
import DynamicBackground from '@/components/DynamicBackground'

export default function MySection() {
  return (
    <DynamicBackground
      videoUrl="https://example.com/video.mp4"
      gradient="from-black to-gray-900"
      overlayOpacity={60}
      className="py-20"
    >
      <div className="relative z-10">
        {/* Your content here */}
      </div>
    </DynamicBackground>
  )
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `videoUrl` | string | undefined | Video source URL (mp4 recommended) |
| `imageUrl` | string | undefined | Image source URL (fallback) |
| `gradient` | string | "from-black to-gray-900" | Tailwind gradient classes |
| `overlayOpacity` | number | 50 | Dark overlay opacity (0-100) |
| `loop` | boolean | true | Loop video playback |
| `autoplay` | boolean | true | Autoplay video |
| `objectFit` | string | "cover" | CSS object-fit property |
| `className` | string | "" | Additional CSS classes |
| `children` | ReactNode | undefined | Section content |

## Free Stock Video Sources

### Recommended CDNs

1. **Pexels Videos** (Free, high quality)
   - https://www.pexels.com/search/videos/
   - Direct MP4 links available
   - No credit required

2. **Pixabay Videos** (Free, no credit required)
   - https://pixabay.com/videos/
   - Various categories and quality levels

3. **Coverr** (Free for personal/commercial)
   - https://coverr.co/
   - Cinematic stock videos

### Example Pexels Video URLs

**Tech/Digital:**
- https://videos.pexels.com/video-files/3945683/3945683-hd_1920_1080_30fps.mp4
- https://videos.pexels.com/video-files/3131655/3131655-sd_640_360_30fps.mp4

**Professional/Corporate:**
- https://videos.pexels.com/video-files/3930282/3930282-hd_1920_1080_30fps.mp4

**Nature/Ambient:**
- https://videos.pexels.com/video-files/4254176/4254176-hd_1920_1080_30fps.mp4
- https://videos.pexels.com/video-files/4281852/4281852-hd_1920_1080_30fps.mp4

## Customization Examples

### Change Hero Video

In `src/components/sections/Hero.tsx`:

```tsx
<DynamicBackground
  videoUrl="https://videos.pexels.com/your-custom-video.mp4"  // ← Change this
  gradient="from-black to-gray-950"
  overlayOpacity={75}
  className="pt-32 pb-20 px-4 sm:px-6 lg:px-8"
>
```

### Adjust Overlay Opacity

Lower opacity = more visible video, less readable text
Higher opacity = darker overlay, more readable text

```tsx
<DynamicBackground
  videoUrl="https://..."
  overlayOpacity={85}  // ← Darker overlay
>
```

### Use Image Instead of Video

```tsx
<DynamicBackground
  imageUrl="https://example.com/image.jpg"
  gradient="from-black to-gray-900"
  overlayOpacity={50}
>
```

### Feature Card with Custom Gradient

In `src/components/sections/Features.tsx`:

```tsx
const features = [
  {
    id: 1,
    icon: Users,
    title: 'AI Lead Generation',
    description: 'Find and qualify leads automatically.',
    gradient: 'from-blue-900 to-blue-950',  // ← Customize
  },
  // ...
]
```

## Performance Optimization

The `DynamicBackground` component is optimized for performance:

1. **Lazy Loading:** Videos use lazy loading where supported
2. **GPU Acceleration:** Transform: translateZ(0) for smooth playback
3. **Muted Autoplay:** Videos are muted to enable autoplay on all browsers
4. **Fallback Chain:** 
   - Video → Image → Gradient (graceful degradation)
5. **Responsive:** Videos scale properly on all screen sizes
6. **Error Handling:** Gracefully falls back if media fails to load

## Mobile Considerations

On mobile devices:
- Videos will still play (HTML5 supports it)
- Consider using lower quality videos for faster load times
- The overlay helps maintain text readability on mobile

## Browser Support

- **Chrome/Edge:** Full support
- **Firefox:** Full support
- **Safari:** Full support (including iOS)
- **Mobile browsers:** Full support (with muted autoplay)

## Best Practices

1. **Use MP4 format** for best browser compatibility
2. **Optimize video size** (2-10MB recommended)
3. **Adjust overlay opacity** based on text contrast needs
4. **Test on mobile** to ensure videos load properly
5. **Use 16:9 aspect ratio** for consistent appearance
6. **Provide fallback gradients** that match your design

## Troubleshooting

### Video Not Playing

1. Check URL is accessible and returns valid MP4
2. Ensure browser supports video element
3. Check browser console for CORS errors
4. Try a different video source

### Video Not Covering Full Section

- Use `objectFit="cover"` (default) to fill the space
- Ensure video has 16:9 or wider aspect ratio

### Text Not Readable

- Increase `overlayOpacity` (75-85 recommended)
- Use white text with text-white class
- Ensure sufficient contrast

### Performance Issues

- Use lower quality video sources
- Reduce video resolution
- Increase overlay opacity (less GPU work rendering video)
- Test in production with proper caching headers

## Future Enhancements

Possible improvements for future versions:

- [ ] WebM/VP9 format support for better compression
- [ ] Adaptive bitrate streaming (HLS/DASH)
- [ ] Animated GIF support
- [ ] Blur effects on video
- [ ] Parallax scrolling effects
- [ ] Video preloading strategies
- [ ] Analytics tracking for video views

## Questions or Issues?

The DynamicBackground component is located at:
- `src/components/DynamicBackground.tsx`

Updated section components:
- `src/components/sections/Hero.tsx`
- `src/components/sections/Features.tsx`
- `src/components/sections/Stats.tsx`
- `src/components/sections/CTA.tsx`

All sections use the standard props and can be customized the same way.
