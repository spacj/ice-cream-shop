# Pistacchio Design System

## Overview
Pistacchio is an authentic Sicilian pistachio gelato brand with a light-spectrum, Italian-inspired design system featuring stunning scroll animations and video integration.

## Color Palette

### Primary Colors - Pistachio Greens
- **Pistachio-50**: #F9FDF6 (Lightest)
- **Pistachio-100**: #F0FAE8
- **Pistachio-200**: #E1F5D1
- **Pistachio-300**: #C8EDAA
- **Pistachio-400**: #B0E680
- **Pistachio-500**: #98DE64 (Main Brand Color)
- **Pistachio-600**: #7CC83A
- **Pistachio-700**: #5F9A2E (Darkest)

### Italian Accent Colors
- **Italian Red**: #DC143C (Vibrant red, representing Italian flag)
- **Tomato**: #FF6347 (Warm accent)
- **Mediterranean Blue**: #4A90E2 (Italian sea)
- **Sky Blue**: #87CEEB (Mediterranean sky)

### Warm Tones (Italian Countryside)
- **Cream**: #FFFAF5 (Light cream)
- **Vanilla**: #FFF8F0 (Warm vanilla)
- **Ivory**: #F5F1EB (Soft ivory)
- **Warm Beige**: #E8D7C3
- **Sand**: #C4B5A0

### Neutrals
- **Gold/Amber**: #FFD700, #FFC700
- **Taupe**: #B8A0A0 (Text color)
- **Cloud**: #F8F8F8
- **Mist**: #E8E8E8
- **Dark**: #2C2C2C (Main text on light backgrounds)

## Typography

### Display Font
- **Font Family**: Playfair Display (Serif)
- **Use**: Headings, titles, brand name
- **Weight**: 700, 900
- **Spacing**: -0.01em letter-spacing

### Body Font
- **Font Family**: Poppins (Sans-serif)
- **Use**: Body text, descriptions, UI
- **Weights**: 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

## Animations

### Scroll-Based Animations
- **FadeInOnScroll**: Elements fade and slide up on scroll
- **SlideInOnScroll**: Elements slide from left/right on scroll
- **ScaleInOnScroll**: Elements scale up as they enter viewport
- **ParallaxSection**: Creates depth with different scroll speeds
- **StaggerContainer**: Staggers child animations

### Micro Interactions
- **float**: Floating animation (6s loop)
- **bounce-gentle**: Gentle bounce effect
- **glow-pistachio**: Pistachio-colored glow effect
- **scale-in**: Smooth scale entrance
- **fade-in-up/down**: Directional fades
- **slide-in-left/right**: Directional slides

### Video Animations
- Scroll-based opacity changes
- Video parallax effects
- Video overlay animations
- Auto-play muted videos for hero sections

## Component Library

### Layout Components
- **VideoHero**: Full-screen video background with content overlay
- **ParallaxSection**: Creates parallax scrolling effect
- **StaggerContainer**: Container for staggered child animations

### Content Components
- **PistachioButton**: Themed button variants (primary, secondary, outline, ghost)
- **PistachioCard**: Flexible card with gradient backgrounds
- **SectionHeader**: Centered section title with subtitle
- **Feature**: Icon + title + description layout
- **TestimonialCard**: Themed testimonial display
- **StatBox**: Number/label stat display

### Media Components
- **VideoHero**: Hero section with video background
- **VideoGallery**: Responsive video grid
- **TestimonialVideo**: Video testimonial card
- **VideoWithOverlay**: Video with text overlay
- **ScrollOpacityVideo**: Video that fades on scroll

### Utility Components
- **Badge**: Small labeled badge
- **TagCloud**: Collection of interactive tags
- **CTASection**: Call-to-action section
- **RevealText**: Text reveal on scroll

## Glass Morphism
- **Background**: rgba(255, 255, 255, 0.6)
- **Backdrop Filter**: blur(10px)
- **Border**: 1px solid rgba(152, 222, 100, 0.2)

## Gradients

### Primary Gradient
- Direction: 135deg
- Colors: #98DE64 (Pistachio-500) → #7CC83A (Pistachio-600)
- Use: Primary CTAs, highlights

### Secondary Gradient
- Direction: 135deg
- Colors: #87CEEB (Sky Blue) → #4A90E2 (Mediterranean)
- Use: Secondary actions, accents

### Accent Gradient
- Direction: 135deg
- Colors: #FFD700 (Gold) → #FFC700 (Amber)
- Use: Decorative elements, highlights

### Warm Gradient
- Direction: 135deg
- Colors: #FF6347 (Tomato) → #DC143C (Italian Red)
- Use: Special promotions, warnings

## Shadow System

### Light Shadows (on light backgrounds)
- Card hover: `0 20px 40px rgba(152, 222, 100, 0.15)`
- Button hover: `0 20px 40px rgba(0, 0, 0, 0.1)`

### Glow Effects
- **Pistachio Glow**: `0 0 30px rgba(152, 222, 100, 0.4)`
- **Pistachio Glow (intense)**: `0 0 40px rgba(152, 222, 100, 0.7)`

## Spacing & Layout

### Padding/Margins
- **Section padding**: py-20 (80px vertical)
- **Card padding**: p-8 (32px)
- **Button padding**: 
  - Small: px-4 py-2
  - Medium: px-6 py-3
  - Large: px-8 py-4

### Border Radius
- **Cards**: rounded-2xl (16px)
- **Buttons**: rounded-full
- **Images**: rounded-3xl (24px)

## Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile Optimizations
- Touch-friendly button sizes (minimum 44px)
- Simplified navigation (hamburger menu)
- Full-width sections with padding
- Vertical stacking of grid layouts

## Accessibility

### Color Contrast
- Text on light backgrounds uses dark text (#2C2C2C, #5F9A2E)
- Text on dark backgrounds uses light text
- All buttons have sufficient contrast ratios

### Motion
- Animations can be disabled with prefers-reduced-motion
- All interactive elements have clear hover states
- Focus states for keyboard navigation

## File Structure

```
lib/
├── scroll-animations.js      # Scroll-based animation components
├── video-components.js       # Video integration components
├── pistachio-components.js   # Themed UI components
└── ...

app/
├── globals.css              # Global styles + Pistachio theme
├── page.js                  # Home page with animations
└── ...

components/
├── Navigation.js            # Updated navigation
└── ...

tailwind.config.js           # Extended Tailwind with Pistachio colors
```

## Implementation Examples

### Using Scroll Animations
```jsx
import { FadeInOnScroll, SlideInOnScroll } from '@/lib/scroll-animations';

<FadeInOnScroll>
  <h2>Your heading fades in on scroll</h2>
</FadeInOnScroll>

<SlideInOnScroll direction="left">
  <p>Slides in from left on scroll</p>
</SlideInOnScroll>
```

### Using Pistachio Components
```jsx
import { PistachioButton, PistachioCard } from '@/lib/pistachio-components';

<PistachioButton variant="primary" size="lg">
  Click Me
</PistachioButton>

<PistachioCard 
  title="Pistacchio Classico"
  description="Pure pistachio flavor"
  icon="💚"
/>
```

### Using Video Components
```jsx
import { VideoHero, VideoGallery } from '@/lib/video-components';

<VideoHero 
  videoSrc="/videos/hero.mp4"
  title="Pistacchio"
  subtitle="Genuino Italiano"
  cta="Discover Flavors"
/>

<VideoGallery videos={[...]} />
```

## Best Practices

1. **Animations**: Use `viewport={{ once: true }}` to animate only once
2. **Performance**: Lazy load videos with `loading="lazy"`
3. **Accessibility**: Always provide alt text for images
4. **Colors**: Maintain contrast ratios for accessibility
5. **Typography**: Use display font for headings, body font for content
6. **Responsive**: Always test on mobile, tablet, and desktop
7. **Videos**: Use multiple formats (mp4, webm) for compatibility

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support with webkit prefixes
- Mobile: Optimized for iOS Safari and Chrome Mobile

## Future Enhancements

- Add dark mode variant
- Create component documentation site
- Add more video templates
- Create animations library
- Add SEO optimizations
