# The Perfume Essence Official Luxury eCommerce Platform 🇵🇰

> Premium watches, jewelry & perfumes built for conversion, optimized for scale.



---

## Overview

The Perfume Essence Official is a full-stack multi-category eCommerce platform for a Pakistan-based luxury brand selling watches, jewelry, perfumes, rings, and bags. The platform handles everything from product discovery to order management — with a custom admin dashboard built from scratch.

The store serves customers nationwide across Karachi, Lahore, and Islamabad, with a product catalogue managed entirely through a protected admin panel.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **State** | ContextAPI |
| **Styling** | Tailwind CSS |
| **Database** | MongoDB |
| **Media** | Cloudinary |
| **Animation** | Framer Motion, GSAP, lenis |
| **Domain** | GoDaddy |
| **Deployment** | Vercel |

---

## Features

**Storefront**
- Multi-category product catalogue — Watches, Jewelry Sets, Rings, Perfumes, Bags, Stainless Steel & Gold Plated collections
- Product filtering by category, collection, and search
- Full checkout flow with Cash on Delivery support
- Sale / discount pricing display per product
- Free shipping logic (orders above PKR 5,000)
- Animated hero section and scroll-based UI with Framer Motion
- Customer reviews section

**Admin Dashboard**
- Protected admin panel with session-based auth (NextAuth)
- Full product CRUD — add, edit, delete, manage inventory
- Order management and fulfilment tracking
- Review moderation
- Sales analytics with charts

**SEO & Performance**
- Dynamic metadata per page (title, description, Open Graph)
- XML sitemap and canonical tags
- JSON-LD structured data
- Google Search Console integration
- Cloudinary image optimization (`.webp` delivery)
- **99+ Lighthouse SEO score** across all pages

---

## Product Categories

- ⌚ Watches
- 💍 Jewelry Sets
- 💎 Rings
- 🌸 Perfumes
- 👜 Bags
- Stainless Steel Bracelets · Earrings · Pendants
- Gold Plated Bracelets · Earrings

---

## Pages

| Route | Description |
|---|---|
| `/` | Homepage — hero, collections, new arrivals, watches, brand story |
| `/collections/[category]` | Category listing with filtered products |
| `/collections/[category]/[slug]` | Product detail page |
| `/contact-information` | Contact & support |
| `/shipping-policy` | Shipping & delivery info |
| `/return-refund-policy` | Returns & exchange policy |
| `/privacy-policy` | Privacy policy |
| `/terms-service` | Terms of service |

---

## Key Engineering Decisions

- **App Router** — used Next.js 16 App Router for nested layouts, server components, and optimized data fetching
- **Cloudinary pipeline** — all product images served as `.webp` via Cloudinary with responsive sizing
- **MongoDB** — flexible document model for product variants, order states, and review data
- **NextAuth** — session-based auth protecting all admin routes
- **SEO-first architecture** — every page has unique metadata generated server-side
- **Indexing** — Indexed every page on google search console, sitemap.xml, robots.txt

---

