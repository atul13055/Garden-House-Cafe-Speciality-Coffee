import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import {
  Star,
  MapPin,
  Clock,
  Phone,
  ShoppingBag,
  Sparkles,
  Calendar,
  ArrowRight,
  ArrowDown,
  Plus,
  Play,
  FileText,
  Navigation,
  ExternalLink,
  Coffee,
  Utensils,
  Sun,
  Award,
  Check,
} from 'lucide-react';
import { VENUE_INFO, MENU_ITEMS, MenuItem } from '../data/cafeData';
import { PoolsideWaterRippleOverlay } from './MenuArtwork';

interface RestaurantLandingHeroProps {
  onAddToCart: (item: MenuItem, e?: React.MouseEvent<HTMLButtonElement>) => void;
  onOpenCart: () => void;
  onOpenMenuBoard: (idx: number) => void;
  onOpenVideoTour: () => void;
  onQuickReserve: (zone: string, guests: string, time: string) => void;
  onNavigateToFullMenu: () => void;
  totalCartCount: number;
}

interface HeroShowcaseSlide {
  id: string;
  indexLabel: string;
  kicker: string;
  title: string;
  subtitle: string;
  tastingNotes: string[];
  prepTime: string;
  pairingSuggestion: string;
  menuItemId: string;
  accentColor: string;
  visualType: 'coffee-sanctuary' | 'pistachio-bakery' | 'avocado-brunch' | 'poolside-mojito';
}

const HERO_SLIDES: HeroShowcaseSlide[] = [
  {
    id: 'slide-coffee',
    indexLabel: '01',
    kicker: 'Signature Espresso & Latte Bar',
    title: 'Iced Pistachio & Specialty Coffee',
    subtitle:
      'Velvety microfoam, freshly roasted specialty beans, and rich Sicilian pistachio cream—crafted for serene mornings by our sunlit window.',
    tastingNotes: ['Roasted Pistachio Cream', 'Double Ristretto Shot', 'Velvety Cold Foam'],
    prepTime: '3–4 mins',
    pairingSuggestion: 'Best paired with Zaatar or Pistachio Croissant',
    menuItemId: 'ls-iced-pistachio',
    accentColor: '#5E7159',
    visualType: 'coffee-sanctuary',
  },
  {
    id: 'slide-bakery',
    indexLabel: '02',
    kicker: 'Artisanal Morning Boulangerie',
    title: 'Pistachio, Nutella & Kinda Croissant',
    subtitle:
      'Golden 27-layer French pastry baked fresh each morning, generously filled with roasted pistachio crema and smooth hazelnut chocolate.',
    tastingNotes: ['Flaky French Butter', 'Crushed Green Pistachios', 'Warm Hazelnut Drizzle'],
    prepTime: 'Served Warm',
    pairingSuggestion: 'Rated #1 Must-Try by 94+ Cafe Guests',
    menuItemId: 'cr-pistachio-nutella-kinda',
    accentColor: '#B87D4B',
    visualType: 'pistachio-bakery',
  },
  {
    id: 'slide-brunch',
    indexLabel: '03',
    kicker: 'All-Day Chef Brunch & Toasts',
    title: 'Egg Benedict with Hass Avocado',
    subtitle:
      'Organic poached eggs with golden runny yolks over crushed seasoned avocado, toasted artisanal sourdough, and herb microgreens.',
    tastingNotes: ['Creamy Hass Avocado', 'Two Poached Eggs', 'Toasted Country Sourdough'],
    prepTime: '10–12 mins',
    pairingSuggestion: 'Pairs effortlessly with Iced Orange Espresso',
    menuItemId: 'tst-egg-benedict-avocado',
    accentColor: '#4D6B43',
    visualType: 'avocado-brunch',
  },
  {
    id: 'slide-mojito',
    indexLabel: '04',
    kicker: '5th Floor Poolside Refreshers',
    title: 'Botanical Lavender & Berry Mojitos',
    subtitle:
      'Aromatic French lavender infusion, muddled garden mint, fresh lime zest, and sparkling soda served over crushed crystal ice.',
    tastingNotes: ['Botanical Lavender', 'Fresh Garden Mint', 'Pressed Lime & Soda'],
    prepTime: '3 mins',
    pairingSuggestion: 'Refreshing poolside companion until 10 PM',
    menuItemId: 'moj-lavender',
    accentColor: '#7A689B',
    visualType: 'poolside-mojito',
  },
];

export const RestaurantLandingHero: React.FC<RestaurantLandingHeroProps> = ({
  onAddToCart,
  onOpenCart,
  onOpenMenuBoard,
  onOpenVideoTour,
  onQuickReserve,
  onNavigateToFullMenu,
}) => {
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroSectionRef,
    offset: ['start start', 'end start'],
  });

  // Parallax transforms driven by page scroll
  const orbLeftY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const orbRightY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const visualStageY = useTransform(scrollYProgress, [0, 1], [0, -32]);
  const visualImageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [quickZone, setQuickZone] = useState('Poolside 5th Floor Terrace');
  const [quickGuests, setQuickGuests] = useState('2 Guests');
  const [quickTime, setQuickTime] = useState('10:00 AM');
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActiveSlideIdx((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const currentSlide = HERO_SLIDES[activeSlideIdx];
  const matchedMenuItem =
    MENU_ITEMS.find((item) => item.id === currentSlide.menuItemId) || MENU_ITEMS[0];

  const handleHeroOrderClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onAddToCart(matchedMenuItem, e);
    setJustAddedId(matchedMenuItem.id);
    setTimeout(() => setJustAddedId(null), 1600);
  };

  return (
    <section
      ref={heroSectionRef}
      className="relative overflow-hidden border-b border-[#E3E7E1] bg-gradient-to-b from-[#EFF2EE] via-[#FAF8F5] to-[#FAF8F5]"
    >
      {/* Scroll-Linked Parallax Architectural Window Sunbeams in Background */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-70"
        aria-hidden="true"
      >
        <motion.div
          style={{
            y: orbLeftY,
            background:
              'radial-gradient(circle, rgba(116,132,112,0.18) 0%, rgba(250,248,245,0) 70%)',
          }}
          className="absolute -top-24 -left-24 w-[520px] h-[520px] rounded-full"
        />
        <motion.div
          style={{
            y: orbRightY,
            background:
              'radial-gradient(circle, rgba(184,125,75,0.13) 0%, rgba(250,248,245,0) 70%)',
          }}
          className="absolute top-1/4 right-0 w-[480px] h-[480px] rounded-full"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-10 lg:pt-12 lg:pb-14">
        {/* TOP RESTAURANT IDENTITY BANNER WITH OFFICIAL LOGO */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 mb-8 border-b border-[#E3E7E1]"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            {/* Prominent Official Logo Medallion */}
            <motion.div
              initial={{ scale: 0.88, opacity: 0, rotate: -4 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.04, rotate: 1 }}
              className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white border-2 border-[#748470]/35 p-2 shadow-md shrink-0 flex items-center justify-center group"
            >
              <img
                src={VENUE_INFO.logoPath}
                alt="Garden House Cafe — Speciality Coffee Official Logo"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </motion.div>

            {/* Brand Title & Verified Abu Dhabi Sanctuary Credentials */}
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#5E7159] font-medium">
                <span>THE ARC TOWER · 5TH FLOOR</span>
                <span aria-hidden="true">·</span>
                <span>AL REEM ISLAND, ABU DHABI</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#231F1D] font-semibold">جاردن هاوس كافيه</span>
              </div>

              <h1
                className="font-display font-semibold text-[#231F1D] tracking-tight leading-[1.04]"
                style={{ fontSize: 'clamp(2.35rem, 4.3vw, 3.85rem)', textWrap: 'balance' }}
              >
                Garden House Cafe — <span className="italic font-normal text-[#5E7159]">Speciality Coffee</span>
              </h1>

              <div className="flex flex-wrap items-center gap-2.5 text-xs text-[#5C645A] pt-0.5">
                <span className="inline-flex items-center gap-1 font-mono-tabular font-semibold text-[#231F1D]">
                  <Star className="w-3.5 h-3.5 fill-[#B87D4B] text-[#B87D4B]" />
                  4.9 (541 Reviews)
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono-tabular font-medium text-[#231F1D]">
                  AED 1–50 per person
                </span>
                <span aria-hidden="true">·</span>
                <span>OPEN DAILY 7 AM – 10 PM</span>
              </div>
            </div>
          </div>

          {/* Right Quick Restaurant Actions (Menu Photos, Video Tour, Call, Directions) */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={onOpenVideoTour}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold text-[#231F1D] bg-white hover:bg-[#EFF2EE] border border-[#E3E7E1] rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-2xs cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-[#5E7159] text-[#5E7159]" />
              Poolside Photo & Tour
            </button>
            <button
              onClick={() => onOpenMenuBoard(0)}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold text-[#5E7159] bg-[#EFF2EE] hover:bg-[#E3E7E1] border border-[#748470]/30 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              Menu Boards (1–3)
            </button>
            <a
              href={VENUE_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-medium text-[#231F1D] bg-white hover:bg-[#EFF2EE] border border-[#E3E7E1] rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <Navigation className="w-3.5 h-3.5 text-[#5E7159]" />
              Directions
            </a>
          </div>
        </motion.div>

        {/* MAIN INTERACTIVE RESTAURANT SHOWCASE SPLIT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* LEFT COLUMN (7 Cols): Interactive Story, Slide Selector & Order CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col justify-between space-y-8"
          >
            {/* Slide Selector Tabs (4 Signature Restaurant Pillars) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[#5C645A]">
                  Interactive House Highlights — Select an Experience:
                </span>
                <span className="text-xs font-mono-tabular text-[#5E7159]">
                  {currentSlide.indexLabel} / 04
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {HERO_SLIDES.map((slide, idx) => {
                  const isActive = idx === activeSlideIdx;
                  return (
                    <button
                      key={slide.id}
                      onClick={() => {
                        setActiveSlideIdx(idx);
                        setIsAutoPlaying(false);
                      }}
                      className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#5E7159] text-white border-[#5E7159] shadow-sm'
                          : 'bg-white text-[#231F1D] border-[#E3E7E1] hover:border-[#748470]'
                      }`}
                    >
                      <p
                        className={`text-[11px] font-mono-tabular font-semibold ${
                          isActive ? 'text-white/80' : 'text-[#5E7159]'
                        }`}
                      >
                        {slide.indexLabel}.
                      </p>
                      <p className="text-xs font-semibold truncate mt-0.5">
                        {slide.title.split('&')[0]}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>


            {/* Active Experience Narrative */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28 }}
                className="space-y-5 bg-white border border-[#E3E7E1] rounded-2xl p-6 sm:p-8 shadow-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#5C645A]">
                  <span className="font-semibold text-[#5E7159] uppercase tracking-wider">
                    {currentSlide.indexLabel}. {currentSlide.kicker}
                  </span>
                  <span className="font-mono-tabular text-[#231F1D] font-semibold">
                    Prep: {currentSlide.prepTime} · dh {matchedMenuItem.price.toFixed(2)}
                  </span>
                </div>

                <div className="space-y-2.5">
                  <h2 className="text-3xl sm:text-4xl font-display font-semibold text-[#231F1D] leading-tight">
                    {currentSlide.title}
                  </h2>
                  <p className="text-sm sm:text-base text-[#5C645A] leading-relaxed">
                    {currentSlide.subtitle}
                  </p>
                </div>

                {/* Unboxed Tasting Notes Separator Row */}
                <div className="pt-2 flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-[#231F1D]">
                  <span className="text-[#5C645A] font-medium">Tasting Profile:</span>
                  {currentSlide.tastingNotes.map((note, i) => (
                    <React.Fragment key={note}>
                      <span className="font-medium text-[#5E7159]">{note}</span>
                      {i < currentSlide.tastingNotes.length - 1 && (
                        <span aria-hidden="true" className="text-[#5C645A]">
                          ·
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Primary & Secondary Conversion CTAs */}
                <div className="pt-4 border-t border-[#E3E7E1] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={handleHeroOrderClick}
                      className="px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-[#5E7159] hover:bg-[#4D5E49] rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 shadow-xs"
                    >
                      {justAddedId === matchedMenuItem.id ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added to Order Bag!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>
                            Order {matchedMenuItem.name} · dh {matchedMenuItem.price.toFixed(2)}
                          </span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={onNavigateToFullMenu}
                      className="px-4 py-3 text-xs sm:text-sm font-semibold text-[#231F1D] bg-[#FAF8F5] hover:bg-[#EFF2EE] border border-[#E3E7E1] rounded-lg transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
                    >
                      <span>Open Full Menu Page (54 Items)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-xs text-[#5C645A]">{currentSlide.pairingSuggestion}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Welcome Promise Quote Strip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2 text-xs text-[#5C645A]">
              <p className="italic max-w-xl">
                “Welcome to Garden House Cafe. Our café is a haven for coffee enthusiasts and food
                lovers, offering a serene and quiet environment perfect for both relaxation and
                productivity.”
              </p>
              <a
                href={VENUE_INFO.whatsappCatalogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#5E7159] hover:underline inline-flex items-center gap-1 shrink-0"
              >
                <span>WhatsApp Catalog</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* RIGHT COLUMN (5 Cols): Interactive Visual Stage Featuring Real Storefront Photo & Culinary Art */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: visualStageY }}
            className="lg:col-span-5 flex flex-col justify-between bg-white border border-[#E3E7E1] rounded-2xl overflow-hidden shadow-sm"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.visualType}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35 }}
                className="relative h-88 sm:h-[420px] w-full bg-[#EFF2EE] overflow-hidden flex items-center justify-center"
              >
                {currentSlide.visualType === 'coffee-sanctuary' && (
                  <div className="relative w-full h-full overflow-hidden">
                    <motion.img
                      style={{ scale: visualImageScale }}
                      src={VENUE_INFO.storefrontPhotoPath}
                      alt="Garden House Cafe — Speciality Coffee Poolside Storefront at The Arc Tower 5th Floor"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top scale-[1.07] origin-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/15 pointer-events-none" />
                    {/* Interactive Poolside Water Caustic & Ripple Layer */}
                    <PoolsideWaterRippleOverlay heightClass="h-[34%]" />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs border border-[#E3E7E1] rounded-lg px-3 py-1.5 text-[11px] font-medium text-[#231F1D] shadow-xs pointer-events-none">
                      The Arc Tower · 5th Floor Poolside Sanctuary
                    </div>
                  </div>
                )}

                {currentSlide.visualType === 'pistachio-bakery' && (
                  <svg viewBox="0 0 460 360" className="w-full h-full object-cover">
                    <rect width="460" height="360" fill="#F6F1E7" />
                    <circle cx="230" cy="180" r="135" fill="#EFE8DA" />
                    <ellipse
                      cx="230"
                      cy="215"
                      rx="145"
                      ry="58"
                      fill="#FFFFFF"
                      stroke="#E2D9C8"
                      strokeWidth="3"
                    />
                    {/* Golden Layered Artisan Croissant */}
                    <path
                      d="M115 205 C102 158, 142 118, 230 118 C318 118, 358 158, 345 205 C332 232, 298 232, 282 208 C262 188, 198 188, 178 208 C162 232, 128 232, 115 205 Z"
                      fill="#D89444"
                      stroke="#9C5D18"
                      strokeWidth="3"
                    />
                    <path
                      d="M155 188 C160 135, 300 135, 305 188 C275 210, 185 210, 155 188 Z"
                      fill="#E5A856"
                      stroke="#9C5D18"
                      strokeWidth="2.5"
                    />
                    <path
                      d="M185 172 C192 132, 268 132, 275 172 C252 192, 208 192, 185 172 Z"
                      fill="#F0BC6D"
                      stroke="#9C5D18"
                      strokeWidth="2"
                    />
                    {/* Rich Pistachio & Nutella Drizzle */}
                    <path
                      d="M148 166 Q175 128 198 174 T245 168 T292 166 T316 175"
                      fill="none"
                      stroke="#789A61"
                      strokeWidth="9"
                      strokeLinecap="round"
                    />
                    <path
                      d="M165 174 Q195 142 222 182 T278 168"
                      fill="none"
                      stroke="#3E2415"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                    {/* Crushed Pistachio Kernels */}
                    <circle cx="195" cy="152" r="4" fill="#94B87B" />
                    <circle cx="228" cy="148" r="3.5" fill="#94B87B" />
                    <circle cx="258" cy="155" r="4" fill="#94B87B" />
                    <circle cx="212" cy="165" r="3" fill="#FAF8F5" />
                  </svg>
                )}

                {currentSlide.visualType === 'avocado-brunch' && (
                  <svg viewBox="0 0 460 360" className="w-full h-full object-cover">
                    <rect width="460" height="360" fill="#EFF3EC" />
                    <ellipse
                      cx="230"
                      cy="195"
                      rx="145"
                      ry="78"
                      fill="#FFFFFF"
                      stroke="#DCE3D8"
                      strokeWidth="3"
                    />
                    {/* Rustic Sourdough Base */}
                    <path
                      d="M135 175 C128 135, 175 118, 230 122 C285 118, 332 135, 325 175 L312 228 C308 242, 152 242, 148 228 Z"
                      fill="#C69253"
                      stroke="#8A5A24"
                      strokeWidth="3"
                    />
                    {/* Mashed Avocado Bed */}
                    <path
                      d="M148 175 C142 144, 184 130, 230 134 C276 130, 318 144, 312 175 L302 218 C298 230, 162 230, 158 218 Z"
                      fill="#84A66C"
                    />
                    {/* Two Poached Eggs with Hollandaise */}
                    <ellipse
                      cx="196"
                      cy="180"
                      rx="38"
                      ry="28"
                      fill="#FFFDF7"
                      stroke="#EAE2CE"
                      strokeWidth="2"
                    />
                    <circle cx="196" cy="178" r="18" fill="#F29B22" />
                    <ellipse
                      cx="266"
                      cy="186"
                      rx="36"
                      ry="26"
                      fill="#FFFDF7"
                      stroke="#EAE2CE"
                      strokeWidth="2"
                    />
                    <circle cx="266" cy="184" r="17" fill="#F29B22" />
                    {/* Baby Heirloom Tomatoes & Microgreens */}
                    <circle cx="168" cy="205" r="7" fill="#C94836" />
                    <circle cx="294" cy="158" r="7" fill="#C94836" />
                    <path
                      d="M218 156 Q230 140 242 156"
                      fill="none"
                      stroke="#435E3A"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                  </svg>
                )}

                {currentSlide.visualType === 'poolside-mojito' && (
                  <svg viewBox="0 0 460 360" className="w-full h-full object-cover">
                    <defs>
                      <linearGradient id="lav-mojito-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#EBE3F5" />
                        <stop offset="55%" stopColor="#B8A2D8" />
                        <stop offset="100%" stopColor="#7C62A8" />
                      </linearGradient>
                      <linearGradient id="peach-tea-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FDEBD2" />
                        <stop offset="100%" stopColor="#DF7A30" />
                      </linearGradient>
                    </defs>
                    <rect width="460" height="360" fill="#EAF1EE" />
                    {/* Poolside Shimmer Background */}
                    <path d="M0 245 L460 245 L460 360 L0 360 Z" fill="#89B5B2" fillOpacity="0.35" />
                    {/* Lavender Mojito Glass */}
                    <path
                      d="M145 92 L225 92 L215 278 C214 286 206 292 196 292 L174 292 C164 292 156 286 155 278 Z"
                      fill="url(#lav-mojito-grad)"
                      stroke="#FFFFFF"
                      strokeWidth="4"
                    />
                    <circle cx="174" cy="135" r="18" fill="#8DB865" stroke="#FFFFFF" strokeWidth="2" />
                    <path
                      d="M192 92 C198 66, 216 58, 226 66 C216 82, 204 92, 192 92 Z"
                      fill="#5E7159"
                    />
                    {/* Peach Ice Tea Glass */}
                    <path
                      d="M255 112 L330 112 L320 278 C319 286 312 292 302 292 L283 292 C273 292 266 286 265 278 Z"
                      fill="url(#peach-tea-grad)"
                      stroke="#FFFFFF"
                      strokeWidth="4"
                    />
                    <circle cx="292" cy="155" r="16" fill="#F6B042" stroke="#FFF6E5" strokeWidth="2" />
                  </svg>
                )}

                {/* Floating Live Dish Price & Rating Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md border border-[#E3E7E1] rounded-xl p-4 flex items-center justify-between gap-4 shadow-md">
                  <div>
                    <p className="text-[11px] font-medium text-[#5E7159]">
                      Featured on Menu · {matchedMenuItem.category}
                    </p>
                    <h3 className="text-base font-semibold text-[#231F1D]">
                      {matchedMenuItem.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-base font-mono-tabular font-semibold text-[#231F1D]">
                      dh {matchedMenuItem.price.toFixed(2)}
                    </span>
                    <button
                      onClick={handleHeroOrderClick}
                      className="px-3.5 py-2 text-xs font-semibold text-white bg-[#5E7159] hover:bg-[#4D5E49] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom Gallery & Menu Quick Strip inside Right Hero Card */}
            <div className="p-4 bg-[#FAF8F5] border-t border-[#E3E7E1] flex items-center justify-between gap-2 text-xs">
              <span className="text-[#5C645A]">
                Printed Cafe Menu Boards:
              </span>
              <div className="flex items-center gap-1.5">
                {[0, 1, 2].map((idx) => (
                  <button
                    key={idx}
                    onClick={() => onOpenMenuBoard(idx)}
                    className="px-2.5 py-1 font-medium text-[#231F1D] bg-white hover:bg-[#EFF2EE] border border-[#E3E7E1] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Photo {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* FULL-WIDTH INTERACTIVE TABLE RESERVATION & EXPERIENCE BAR BELOW HERO SPLIT */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 bg-white border border-[#E3E7E1] rounded-2xl p-5 sm:p-6 shadow-xs"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            <div className="lg:col-span-3 space-y-0.5">
              <p className="text-xs font-semibold text-[#5E7159] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                Instant Table Booking
              </p>
              <h3 className="text-lg font-display font-semibold text-[#231F1D]">
                Reserve Your Sanctuary Spot
              </h3>
            </div>

            <div className="lg:col-span-3">
              <label className="block text-[11px] text-[#5C645A] mb-1">Seating Atmosphere</label>
              <select
                value={quickZone}
                onChange={(e) => setQuickZone(e.target.value)}
                className="w-full px-3 py-2 text-xs font-medium bg-[#FAF8F5] border border-[#E3E7E1] rounded-lg text-[#231F1D] focus:outline-none focus:border-[#5E7159]"
              >
                <option value="Poolside 5th Floor Terrace">Poolside 5th Floor Terrace</option>
                <option value="Quiet Indoor Study Nook">Quiet Indoor Study Nook (Laptop Friendly)</option>
                <option value="Family & Group Table">Family & Group Table (High Chairs Available)</option>
              </select>
            </div>

            <div className="lg:col-span-2">
              <label className="block text-[11px] text-[#5C645A] mb-1">Guests</label>
              <select
                value={quickGuests}
                onChange={(e) => setQuickGuests(e.target.value)}
                className="w-full px-3 py-2 text-xs font-medium bg-[#FAF8F5] border border-[#E3E7E1] rounded-lg text-[#231F1D] focus:outline-none focus:border-[#5E7159]"
              >
                <option value="1 Guest (Solo / Laptop)">1 Guest (Solo / Laptop)</option>
                <option value="2 Guests">2 Guests</option>
                <option value="3–4 Guests">3–4 Guests</option>
                <option value="5–6 Guests (Family)">5–6 Guests (Family)</option>
              </select>
            </div>

            <div className="lg:col-span-2">
              <label className="block text-[11px] text-[#5C645A] mb-1">Preferred Time</label>
              <select
                value={quickTime}
                onChange={(e) => setQuickTime(e.target.value)}
                className="w-full px-3 py-2 text-xs font-mono-tabular font-medium bg-[#FAF8F5] border border-[#E3E7E1] rounded-lg text-[#231F1D] focus:outline-none focus:border-[#5E7159]"
              >
                <option value="08:30 AM">08:30 AM (Breakfast)</option>
                <option value="10:00 AM">10:00 AM (Brunch)</option>
                <option value="01:00 PM">01:00 PM (Lunch)</option>
                <option value="05:30 PM">05:30 PM (Sunset Coffee)</option>
                <option value="08:00 PM">08:00 PM (Evening Terrace)</option>
              </select>
            </div>

            <div className="lg:col-span-2 pt-2 lg:pt-4">
              <button
                onClick={() => onQuickReserve(quickZone, quickGuests, quickTime)}
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#231F1D] hover:bg-[#5E7159] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Reserve Table →
              </button>
            </div>
          </div>
        </motion.div>

        {/* Smooth Scroll Down Indicator Cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75, duration: 0.5 }}
          className="pt-8 flex justify-center"
        >
          <a
            href="#glance-favorites"
            className="group inline-flex items-center gap-2 text-xs font-medium text-[#5C645A] hover:text-[#231F1D] transition-colors"
          >
            <span>Scroll to Explore Sanctuary & Signature Dishes</span>
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="w-6 h-6 rounded-full bg-white border border-[#E3E7E1] flex items-center justify-center text-[#5E7159] group-hover:border-[#5E7159]"
            >
              <ArrowDown className="w-3.5 h-3.5" />
            </motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

