# AnjaHak Enterprises — Website Project Brief

## What is AnjaHak
Premium African agricultural exporter based in Nairobi, Kenya. Exports organic produce globally.
- Email: info@anjahak.com
- Phone: +254 721 377 422 / +254 787 353 676 / +254 738 690 998 / +254 704 925 908
- Address: 147 Koitobos Road, P.O. Box 15060, 0509, Nairobi, Kenya

## Products
1. Chick Peas
2. Premium Roselle (Hibiscus)
3. Soy Beans
4. Cashew Nuts
5. Premium Halal Lamb & Goat
6. Sunflower Seeds

## Tech Stack — install all of these
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --yes
npm install framer-motion lucide-react clsx tailwind-merge react-hook-form zod @hookform/resolvers
npm install @radix-ui/react-dialog @radix-ui/react-select @radix-ui/react-label
npm install @tailwindcss/typography @tailwindcss/forms
npx shadcn-ui@latest init --defaults --yes
```

## Design System

### Colors
```css
:root {
  --earth:      #1A1208;
  --forest:     #1B3A2D;
  --canopy:     #2D5940;
  --sage:       #6B8F71;
  --harvest:    #C8920A;
  --gold:       #E8B84B;
  --dusk:       #F5EDD8;
  --parchment:  #FAF6EE;
}
```

### Fonts — load via next/font/google
- Display/Italic headers: Cormorant Garamond (400, 600 italic)
- Bold headlines: Playfair Display (700, 900)
- Body text: DM Sans (300, 400, 500)
- Labels/stats: Space Mono (400)

### Aesthetic
Luxury editorial meets African organic richness. Think earthy, refined, textured — NOT generic green agriculture. Every section must feel premium. Dark forest green, warm amber gold, cream parchment.

## Pages to Build
1. Home (all sections below)
2. About Us (/about)
3. Products (/products + /products/[slug])
4. Contact (/contact)

## Home Page Sections — build in this order

### 1. Hero
- Full viewport height
- Background: rich farm image with parallax scroll (useScroll + useTransform from framer-motion)
- Framer Motion: headline words animate in one by one (stagger 0.08s, y: 40→0, opacity 0→1)
- Ken Burns effect on background image (CSS: scale 1.08→1 over 12s)
- Grain texture overlay (SVG noise filter via CSS)
- Bottom gradient fade to parchment
- Headline (italic Cormorant Garamond): "Africa's Finest, Delivered to the World"
- Two buttons: "Explore Products" (amber filled) + "Learn Our Story" (ghost)
- Infinite ticker strip at bottom: product names scrolling left (CSS animation, pauses on hover)
- Scroll down indicator with bouncing chevron

### 2. About Teaser
- Split layout: images left (overlapping with offset), text right
- Small green label: "ABOUT ANJAHAK ENTERPRISES"
- Headline: "From Africa's Soil To Your Table"
- Body: company mission text
- Two animated progress bars: "Freshly Grown Produce 99%" + "Free Hold Reared Livestock 99%"
- Progress bars animate when scrolled into view (useInView)
- "Read Our Story" ghost link button

### 3. Products Preview
- Section label + "Our Premium Exports" headline
- 3-column grid of product cards
- Each card: image top (aspect-ratio 4/3, object-cover), category badge, product name, arrow button
- Framer Motion whileHover: card lifts y:-10px, image scales 1→1.06, shadow intensifies
- "View All Products" link below grid

### 4. Stats Band
- Full width dark forest green background
- 4 stats with animated counters (count up from 0 when in view):
  - 6+ Export Products
  - 99% Quality Rating
  - 10+ Years Experience
  - 4 Continents Served
- Gold numbers in Cormorant Garamond, white labels
- Gold decorative lines top and bottom of band

### 5. Quality Section
- Two column: left = bold headline + body + 4 icon features; right = stacked overlapping images
- Features: Certified Quality / Eco-Friendly Practices / Global Standards / Direct from Farmers
- Background: warm cream (--dusk)

### 6. Testimonials
- 3 quote cards: italic serif quote, name, country, role
- Auto-cycle on mobile (Framer Motion AnimatePresence)
- Soft parchment background

### 7. Feedback Section (NEW - important)
- Section on --dusk background
- Left: headline "Share Your Experience" + trust points
- Right: white card with form
- Form fields: Name*, Email*, Company, Country (select), Rating (1-5 stars interactive)*, How did you find us* (select), Message*
- Star rating: 5 clickable stars, animate on click (scale pop), amber fill
- Submit: loading spinner state → animated success checkmark
- Validation: React Hook Form + Zod
- Countries: Kenya, USA, UK, UAE, Saudi Arabia, Qatar, Germany, Netherlands, China, India, Other
- Sources: Google, LinkedIn, Trade Show, Referral, Social Media, Other

### 8. CTA Banner
- Dark green full-width section
- "Ready to Source Premium African Produce?"
- Two buttons: Get in Touch + View Products

## Animation Rules
- Every section: fade in + slide up 60px when scrolled into view (Framer Motion useInView)
- Stagger children with 0.12s delay between each
- Easing: cubic-bezier(0.22, 1, 0.36, 1) always
- All animations: opacity + transform only (GPU composited, no layout thrash)
- Navbar: transparent → frosted glass (backdrop-blur) after 80px scroll

## Navbar
- Logo left, nav links center (Home / About Us / Our Products / Contact Us), phone number + "Get Quote" amber button right
- Mobile: hamburger → full screen slide-down menu (Framer Motion AnimatePresence)
- Scroll-aware: transparent at top → white/blur background when scrolled

## Footer
- Dark green background (--forest)
- 3 columns: About blurb | Explore links | Contact details
- All 4 phone numbers, email, address
- Social icons: Twitter, Facebook, Pinterest, Instagram

## Code Rules
- Always use next/image for images
- Always use CSS variables for colors — never hardcode hex in components
- Mobile-first responsive design
- All forms use React Hook Form + Zod
- Accessibility: aria labels on all interactive elements
- No placeholder text in final output — use real AnjaHak content

## Build Order
1. Setup (install deps, configure tailwind + fonts)
2. globals.css (CSS variables, base styles, animations, grain overlay, ticker keyframe)
3. lib/utils.ts + lib/products.ts + lib/animations.ts
4. layout.tsx (fonts, metadata, nav + footer wrapper)
5. Navbar component
6. Footer component
7. Hero section
8. About section
9. Products section + ProductCard component
10. Stats section + AnimatedCounter component
11. Quality section
12. Testimonials section
13. Feedback section
14. CTA section
15. Home page (assemble all sections)
16. /products page + /products/[slug] page
17. /about page
18. /contact page
19. Polish: spacing, mobile, transitions