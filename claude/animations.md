When building animations always use Framer Motion.
- Sections enter with: opacity 0→1, y 60→0, duration 0.9s, ease [0.22,1,0.36,1]
- Stagger children: 0.12s between each child
- Hero words: stagger 0.08s, y 40→0, opacity 0→1
- Cards hover: y -10px, shadow intensifies, image scales 1→1.06
- Stats: count from 0 using animate() from framer-motion, triggered by useInView
- Navbar: useScroll → animate backgroundColor and backdropFilter
- Always animate only transform and opacity — never width, height, or layout properties
- Use AnimatePresence for anything that mounts/unmounts (mobile menu, success state, modals)