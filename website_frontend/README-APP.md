# IndustryPro Website Frontend

Dark-themed React SPA with modular sections:
- Home, About Us, Services, Why Choose Us, Contact Us
- Responsive, modern nav and footer
- Backend integration for content and contact submissions

Now upgraded to a premium experience:
- Google Fonts (Plus Jakarta Sans) and Font Awesome icons
- Animated navigation with Framer Motion
- Scroll reveal transitions with AOS
- Hero with background imagery overlay and CTAs
- Trust logos/testimonials band
- Enhanced forms with icons, focus states, and accessibility
- Rich hover/focus interactions and micro-animations

## Run

1. Copy environment example and set backend URL if backend is on a different origin:
   cp .env.example .env
   # set REACT_APP_BACKEND_URL=http://localhost:3001

2. Install and start:
   npm install
   npm start

The app calls:
- GET /api/home
- GET /api/about
- GET /api/services
- GET /api/why-choose-us
- GET /api/contact
- POST /api/contact/submit

If the frontend is reverse-proxied to the backend on the same origin, you can leave REACT_APP_BACKEND_URL empty.
