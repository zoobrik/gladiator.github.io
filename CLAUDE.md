# Gladiator Gym & Fitness — Project Context

## Overview
A single-page marketing website for **Gladiator Gym & Fitness**, a combat sports and fitness gym located in **Gldani, Tbilisi, Georgia**. Pure HTML + CSS + JS — no frameworks, no build tools, no dependencies.

Facebook: https://www.facebook.com/GladiatorGldani/

## File Structure
```
Gladiator Gym/
├── index.html   # All markup — 11-section single-page layout
├── style.css    # All styles — ~1450 lines, CSS custom properties
├── script.js    # All interactivity — no libraries
├── logo.svg     # Official gym logo (transparent bg, 1024×1024)
└── CLAUDE.md    # This file
```

## Brand
| Token | Value | Usage |
|-------|-------|-------|
| `--gold` | `#ffd600` | Primary accent everywhere |
| `--gold-dark` | `#ffaa00` | Gradient end, hover states |
| `--gold-grad` | `linear-gradient(135deg, #ffd600, #ffaa00)` | Buttons, text fills |
| `--dark` | `#0a0a0a` | Base background |
| `--text` | `#ffffff` | Body text |
| `--text-muted` | `#888888` | Secondary text |

Font: **Cinzel** (Google Fonts) for all headings and logo text — gives the Roman/gladiator feel. `system-ui` for body.

Logo: `logo.svg` — circular badge with Spartan helmet, barbell, Georgian arc text "სპორტ კლუბი გლადიატორი", and "GLADIATOR / GYM & FITNESS". Black background path was removed so it renders transparently.

## Page Sections (in order)
1. **Navbar** — `logo.svg` left, nav links center, "გაწევრიანება / Join" CTA right. Sticky, blur backdrop, hides on scroll-down on mobile.
2. **Hero** (`#home`) — Full viewport. `logo.svg` as watermark (opacity 0.08, floating animation). Bold Georgian + English headline with gold gradient text. CSS-only floating gold particles (`<i>` elements animated via nth-child). Two CTA buttons + scroll indicator.
3. **About** (`#about`) — Two-column: story text left, 2×2 stat grid right. Stats animate via IntersectionObserver counter.
4. **Gallery** (`#gallery`) — 4-column CSS grid, 8 placeholder cards. Two cards span 2 rows (3rd and 6th) for masonry feel. Gold overlay + label on hover. Mouse-move parallax via JS.
5. **Classes** (`#classes`) — 6 service cards: Strength Training, Boxing & MMA, CrossFit, Cardio, Yoga & Mobility, Kids Fitness. Gold glow + translateY(-8px) on hover.
6. **Trainers** (`#trainers`) — 4 cards with circular SVG photo placeholder, name, specialty, bio. Gold border ring on hover.
7. **Pricing** (`#pricing`) — 3 plans: სტანდარტი/Standard ₾60, პრო/Pro ₾100 (featured, gold border), VIP ₾180. "Choose Plan" buttons scroll to contact form and pre-fill the plan select + message field.
8. **Testimonials** (`#testimonials`) — 3 quote cards with star ratings, Georgian names, member-since dates.
9. **Schedule** (`#schedule`) — Full Mon–Sun × Morning/Afternoon/Evening HTML table. Horizontally scrollable on mobile. Color-coded class pills (gold=Strength, red=Boxing, blue=CrossFit, green=Cardio, purple=Yoga, amber=Kids).
10. **Contact** (`#contact`) — Two columns: form (Name, Phone, Email, Plan select, Message) + info block (address, phone, Facebook, hours, Google Maps iframe for Gldani). Plan select is pre-filled by pricing buttons.
11. **Footer** — `logo.svg` at 80px, Georgian tagline, Facebook icon link, quick links column, hours column with address.

## JavaScript Behaviors
- Navbar darkens + box-shadow on scroll past 60px (`.scrolled` class)
- Navbar hides on scroll-down, reappears on scroll-up (mobile only, ≤768px)
- Mobile nav: hamburger with animated 3-span → X transform, `.open` class toggle
- Counters: `data-target` attribute, eased animation via `requestAnimationFrame`
- Scroll reveal: `.reveal` → `.visible` via IntersectionObserver (threshold 0.08), siblings stagger by 80ms
- Active nav link: `.active` class on link matching current visible section
- Pricing → contact pre-fill: sets `#fplan` value + prefills `#fmessage`
- Form submit: 1.2s simulated async → success banner → auto-hides after 5s
- Gallery parallax: `mousemove` → `rotateY/X` perspective tilt, resets on `mouseleave`
- Smooth scroll: all `a[href^="#"]` anchors offset by navbar height

## CSS Details
- Diagonal texture: `repeating-linear-gradient(-45deg, ...)` on About, Classes, Pricing sections
- Hero glow: animated `::after` radial gradient orb (keyframe `heroGlow`)
- Hero particles: `.hero-particles i` with `particleRise` keyframe, 10 elements, nth-child offsets
- Watermark float: `helmetFloat` keyframe on `.hero-watermark-img`
- Scroll indicator: bouncing dot in a rounded border using `scrollBounce` keyframe
- Gold dividers: `linear-gradient(90deg, transparent, #ffd600, transparent)` 1px lines between sections

## Responsive Breakpoints
| Breakpoint | Changes |
|------------|---------|
| ≤1024px | Classes → 2-col; Trainers → 2-col; Gallery → 3-col; Footer → 2-col |
| ≤768px | Nav collapses to hamburger; About stacks; Gallery → 2-col; Classes → 1-col; Pricing → 1-col; Testimonials → 1-col; Contact stacks; Footer → 1-col |
| ≤480px | Stats grid stays 2-col; Gallery → 2-col smaller; Trainers → 1-col; logo-img shrinks to 42px |

## Pricing Plans
| Plan | Georgian | Price | Key perks |
|------|----------|-------|-----------|
| Standard | სტანდარტი | ₾60/mo | Gym floor, 2 classes/wk, locker |
| Pro | პრო | ₾100/mo | Unlimited access, sauna, 2 PT sessions |
| VIP | VIP | ₾180/mo | Everything + spa/pool + weekly PT + nutrition |

## Schedule (class pills color coding)
- `.p-strength` gold — `.p-boxing` red — `.p-crossfit` blue — `.p-cardio` green — `.p-yoga` purple — `.p-kids` amber

## Common Tasks
- **Swap logo**: replace `logo.svg` in root. Used via `<img src="logo.svg">` in navbar, hero watermark, and footer — no HTML change needed if filename stays the same.
- **Change brand color**: update `--gold` and `--gold-dark` in `:root` in `style.css`
- **Add a class card**: copy a `.class-card` block in `index.html`, update icon/title/description/tag
- **Add a trainer**: copy a `.trainer-card` block, update name/role/bio
- **Update pricing**: edit `.plan-price` text and `data-plan` attribute on `.pricing-card`
- **Add a gallery image**: replace `.gallery-card` background with `background-image: url(...)`, keep existing structure
- **Wire up real form backend**: replace the `setTimeout` block in `script.js` `contactForm` handler with a `fetch()` POST
- **Add real Google Maps**: replace the `src` on the `<iframe>` in the contact section with a proper Maps embed URL
