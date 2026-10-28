# Garden House Cafe — Digital Storefront & Sanctuary Experience

A warm, botanical web experience and interactive ordering platform for **Garden House Cafe** (The Arc Tower, 5th Floor, Al Reem Island, Abu Dhabi), designed around its official sage-green and espresso brand identity with smooth animations, complete menu ordering, table reservations, and comprehensive venue details.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following product and design choices have been confirmed from your preferences and the Google Maps / Talabat venue details:

- **Confirmed Ordering Workflow**: **Interactive Cart with Local Checkout Confirmation** — Customers can browse all 15 menu categories, customize items or quantities, add to a slide-over shopping bag, choose Dine-In, Pickup, or Delivery (including No-Contact Delivery), and receive an instant local order confirmation receipt (with an optional one-click WhatsApp order dispatch link to `wa.me/c/244044638740501`).
- **Confirmed Visual Identity**: **Warm Botanical Light Theme** — Harmonized directly with the uploaded Garden House Cafe logo (`/assets/aistudio/image_5192c9e4.png`), pairing a sunlit alabaster/paper canvas (`#FAF8F5`) with botanical sage green (`#6F806B`), deep espresso roast (`#2B2320`), and subtle stone hairline borders.
- **Confirmed Feature Scope**:
  1. **Complete 15-Category Menu** (All 50+ items from Talabat/Google with exact AED prices and descriptions).
  2. **Table Reservation Booking Form** with instant confirmation state (supporting poolside terrace or quiet indoor laptop-friendly seating).
  3. **Customer Reviews (4.9 ★ · 541 Reviews) & Interactive Popular Times Chart** (Monday–Sunday hourly traffic & live busyness indicator).
  4. **Interactive Photo & Video Highlights Gallery** (Featuring contributor highlights from Shaira Villa-Alvina Vlogs, Judrani Design, Akram Marzouk, Tina FAN, Martin Harich, and signature menu photography).
  5. **Complete A-to-Z About Us, Amenities, Accessibility & Location Guide** (The Arc Tower 5th Floor, opening hours 7:00 AM – 10:00 PM daily, service options, dining highlights, payments, children/family perks, and free parking).

---

## 1. Overview & Core Concept

- **What It Does**: Serves as the official flagship website for **Garden House Cafe — Speciality Coffee**, blending editorial storytelling about its serene poolside/5th-floor sanctuary in The Gate District with a frictionless interactive menu, cart checkout, table reservation engine, and verified visitor guide.
- **Target Audience / Persona**: Specialty coffee enthusiasts, remote workers seeking a quiet laptop-friendly oasis, Al Reem Island / Arc Tower residents, and families looking for all-day breakfast, artisanal croissants, and poolside refreshments.
- **Key Value**: Consolidates every detail from the cafe's Google Maps profile, WhatsApp catalog, and Talabat menu into a single cohesive, animated destination where guests can order ahead or reserve a table in seconds.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Arrival & Brand Immersion**: Visitors land on a split-screen botanical hero showcasing the uploaded **Garden House Cafe** logo, its `4.9 ★ (541 Reviews)` reputation, live open status (`Open · 7:00 AM – 10:00 PM · The Arc Tower 5th Floor`), and direct actions to **Explore Menu & Order** or **Book a Table**.
2. **Interactive Menu & Cart Checkout**: Guests filter across all 15 categories (*At a Glance, Specialty Coffee, Latte Special, Croissants, All Day Breakfast, Toast, Pancake, Crepe, Sandwich, Burger, Pasta, Noodle, Salad, Mojito, Iced Tea, Tea, Muffin & Cake, Dessert*) or search by keyword. Clicking **Add to Order** updates the persistent cart drawer with item steppers, AED subtotal calculation (`tabular-nums`), dining mode selection (*Dine-In, Takeaway, Delivery*), and instant order confirmation receipt.
3. **Atmosphere, Gallery & Popular Times**: Visitors explore curated cafe photography and video highlights with lightbox inspection, switch days (`Mon`–`Sun`) on the **Popular Times** interactive bar chart to plan a quiet visit, and read verified guest testimonials praising the pistachio croissants, smoothies, poolside vibe, and welcoming staff.
4. **Table Reservation & A-to-Z Venue Directory**: Guests submit a validated reservation request (date, time, party size, seating preference: *Poolside Terrace*, *Indoor Quiet Study*, or *Family Table*) and browse the structured A-to-Z directory covering Accessibility, Service Options, Highlights, Payments, Children's amenities, Parking, and Al Reem Island Neighborhood Context.

### Visual Identity & Theme
- **Aesthetic Direction**: *Botanical Architectural Sanctuary* — serene, sunlit, tactile, and unhurried. Strictly adheres to anti-slop and zero-pill metadata discipline (unboxed inline metadata separated by `·`, subtle 1px hairline borders, and generous whitespace).
- **Color Palette & Mood (60-30-10 Distribution)**:
  - **60% Dominant Neutral Canvas**: Warm Sunlit Paper (`#FAF8F5`) and Crisp Alabaster (`#FFFFFF`) for elevated surfaces.
  - **30% Structural Surfaces & Typography**: Soft Sage Mist (`#EFF2EE`) for secondary sections, Deep Espresso Ink (`#231F1D`) for primary prose, Muted Olive-Slate (`#5C645A`) for secondary copy, and Stone Hairlines (`#E4E7E2`).
  - **10% Accent Budget**: Garden House Sage (`#5E7159` / `#748470`, sampled directly from the uploaded logo's window & saucer illustration) paired with Warm Terracotta Gold (`#B87D4B`) for star ratings and warm highlights.
- **Typography & Hierarchy (2+1 Font Rule)**:
  - *Display / Headings*: **Cormorant Garamond** (SemiBold/Italic) — echoes the graceful, artisanal calligraphy of the "Garden house" script in the logo while maintaining crisp editorial legibility.
  - *Body & UI Controls*: **Plus Jakarta Sans** (Regular 400, Medium 500, SemiBold 600) — clean, modern geometric legibility for menu descriptions and navigation.
  - *Prices, Ratings & Timestamps*: **JetBrains Mono** (`tabular-nums`) — ensures vertical alignment of all `AED / dh` prices, review counts, and popular-times percentages.
- **Top Bar Contract**:
  - Strict single-row, three-zone header separated by `gap-8`:
    - **Zone 1 (Brand)**: Official uploaded Garden House Cafe logo lockup + `Garden House Cafe` single-line title.
    - **Zone 2 (Navigation)**: 5 single-line text links (`Menu`, `About & Amenities`, `Gallery`, `Reviews & Hours`, `Location`).
    - **Zone 3 (Primary Action)**: Single primary action button (`Order Bag (N)` with live AED total / `Book a Table`).
- **Interactive Feedback & Motion**:
  - Smooth `motion/react` staggered section entrances and layout transitions (`cubic-bezier(0.16, 1, 0.3, 1)`, $\le 200\text{ms}$ for micro-interactions).
  - Subtle `translateY(-2px)` card lift on menu items, instant cart counter pulse on item addition, and smooth category tab switching.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Interactive Local Cart + Optional WhatsApp & Talabat Handoff**
  - *Chosen Approach*: Full in-app cart drawer and multi-step local checkout confirmation that generates an itemized order number and receipt, supplemented by direct quick-links to the official WhatsApp catalog (`https://wa.me/c/244044638740501`) and phone (`+971 58 283 5070`).
  - *Why*: Fulfils your preference for a self-contained interactive cart with local confirmation while keeping real-world communication channels one click away.
- **Decision 2: Complete Unabridged 15-Category Menu with Dietary & Highlight Filters**
  - *Chosen Approach*: Include every single dish and beverage from the provided Talabat/Google menu data (from *Oreo Truffles* at `dh 7.00` to *Egg Benedict With Avocado* at `dh 60.00`), complete with category tabs, live search, and quick filter buttons (*All*, *Popular Highlights*, *Coffee & Tea*, *Breakfast & Toast*, *Sweet & Pastries*, *Savory Meals*).
  - *Why*: Visitors expect complete price transparency (`AED 1–50` range) and effortless discovery across a 50+ item menu.
- **Decision 3: Curated High-Resolution Imagery + Uploaded Brand Logo**
  - *Chosen Approach*: Embed `/assets/aistudio/image_5192c9e4.png` as the core brand emblem and generate bespoke, cohesive studio-quality food & cafe architectural photography via `generate_image` (with resilient CSS/SVG fallbacks).
  - *Why*: Guarantees zero broken external links and visual harmony with the sage-green botanical palette.

---

## 4. Technical Architecture & Data Strategy

### Architecture & Component Diagram

```
┌────────────────────────────────────────────────────────────────────────────┐
│                        App Shell (Garden House Cafe)                       │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │ Top Bar Header: [Logo + Wordmark] ── [5 Nav Links] ── [Cart Drawer]  │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                     │                                      │
│        ┌────────────────────────────┼────────────────────────────┐         │
│        ▼                            ▼                            ▼         │
│  ┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────┐  │
│  │ 1. Hero & Sanctuary  │  │ 2. Interactive Menu  │  │ 3. Cart & Local  │  │
│  │    Showcase          │  │    Engine (50+ Items)│  │    Checkout      │  │
│  │ - Brand Logo Emblem  │  │ - 15 Category Tabs   │  │ - Slide-Over Bag │  │
│  │ - 4.9★ (541) Proof   │  │ - Search & Sorting   │  │ - Qty Steppers   │  │
│  │ - Live Hours & Info  │  │ - Add-to-Bag Handler │  │ - Dine/Delivery  │  │
│  │ - Quick CTAs         │  │ - Item Detail Modal  │  │ - Order Receipt  │  │
│  └──────────────────────┘  └──────────────────────┘  └──────────────────┘  │
│        │                            │                            │         │
│        ▼                            ▼                            ▼         │
│  ┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────┐  │
│  │ 4. About & A-to-Z    │  │ 5. Reviews, Popular  │  │ 6. Reservations  │  │
│  │    Amenities Matrix  │  │    Times & Gallery   │  │    & Location    │  │
│  │ - 13 Google Feature  │  │ - 4.9★ Rating Bars   │  │ - Table Booking  │  │
│  │   Groups (A to Z)    │  │ - Mon-Sun Busy Chart │  │   Form & Receipt │  │
│  │ - Poolside & Study   │  │ - Review Tag Filters │  │ - Arc Tower Map  │  │
│  │   Storytelling       │  │ - Lightbox Gallery   │  │   & Nearby Guide │  │
│  └──────────────────────┘  └──────────────────────┘  └──────────────────┘  │
└────────────────────────────────────────────────────────────────────────────┘
```

### Data Model & State
- **Menu Catalog (`MENU_ITEMS`)**: Typed collection of all 54 items across 15 categories (`id`, `name`, `category`, `priceAED`, `description`, `isPopular`, `dietaryNotes`).
- **Shopping Cart State (`cart`, `localStorage` persisted)**: Array of `{ item, quantity, notes, temperatureOrSize }`, computing `subtotal`, `serviceFee`, and `total` in AED (`dh`).
- **Checkout & Reservation State**:
  - `CheckoutOrder`: Customer name, phone (`+971...`), fulfillment type (`Dine-In Table`, `Self Pickup - 5th Floor`, `Arc/Gate Tower Delivery`), payment method (`Card / NFC Mobile Payment`, `Cash`), generating a timestamped confirmation code.
  - `ReservationBooking`: Guest name, phone, date, time slot (`07:00` to `21:30`), party size, seating zone (`Poolside Outdoor`, `Quiet Indoor Workspace`, `Cozy Lounge`), and special requests (e.g., high chair, kids' menu).
- **Venue Metadata (`VENUE_DETAILS`)**: Complete structured data from the Google Maps listing including phone (`+971 58 283 5070`), WhatsApp catalog link, address (`The Arc Tower - A 5th Floor - Al Reem Island - The Gate District - Abu Dhabi`), popular times hourly matrix (`Mon`–`Sun`), review topic filters (`smoothies`, `kind staff`, `poolside`, `pistachio croissant`, `quick service`, `french toast`, `egg toast`, `croissants`), and all 13 amenity categories (Accessibility, Service options, Highlights, Popular for, Offerings, Dining options, Amenities, Atmosphere, Crowd, Planning, Payments, Children, Parking) plus the Al Reem Island local cafe comparison directory.

### Interactive Component & State Mapping
- **Category & Search Filtering**: Clicking any category tab or typing in the search bar instantaneously filters the menu grid with smooth layout transitions and a clear "Reset Filters" empty-state handler if no items match.
- **Review Topic Filter & Popular Times Day Switcher**: Clicking review topic buttons (`pistachio croissant`, `poolside`, `kind staff`, etc.) filters guest reviews dynamically; clicking `Mon` through `Sun` updates the hourly occupancy histogram and live status ("Live: Busier than usual" / "Usually a little busy").
- **Gallery Lightbox**: Clicking any photo or video highlight card opens a high-resolution modal viewer with contributor attribution (`Shaira Villa-Alvina Vlogs`, `Judrani Design`, `Akram Marzouk`, `Tina FAN`, `Martin Harich`) and keyboard navigation.
