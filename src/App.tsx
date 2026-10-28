/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import {
  Star,
  MapPin,
  Phone,
  Clock,
  Search,
  ShoppingBag,
  Plus,
  Minus,
  Check,
  ExternalLink,
  Share2,
  Bookmark,
  Navigation,
  Play,
  FileText,
  Calendar,
  Users,
  CheckCircle2,
  Sparkles,
  Coffee,
  Utensils,
  MessageSquarePlus,
  RotateCcw,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
} from 'lucide-react';
import {
  VENUE_INFO,
  MENU_CATEGORIES,
  MENU_ITEMS,
  MenuCategory,
  MenuItem,
  REVIEW_TOPICS,
  RATING_DISTRIBUTION,
  GOOGLE_REVIEWS,
  ReviewItem,
  POPULAR_TIMES_DATA,
  GALLERY_MEDIA,
  PHYSICAL_MENU_BOARDS,
  AMENITIES_MATRIX,
  NEARBY_ABU_DHABI_CAFES,
} from './data/cafeData';
import { MenuArtwork, GalleryVisual, PoolsideWaterRippleOverlay } from './components/MenuArtwork';
import { MagneticMenuCard, AnimatedCounter } from './components/MagneticMenuCard';
import { MenuBoardModal } from './components/MenuBoardModal';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { GalleryLightbox } from './components/GalleryLightbox';
import { RestaurantLandingHero } from './components/RestaurantLandingHero';
import { TerraceReservationCalendar } from './components/TerraceReservationCalendar';
import { LimitedEditionBanner } from './components/LimitedEditionBanner';

interface FlyingBagToken {
  id: number;
  name: string;
  artworkType: MenuItem['artworkType'];
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

type DayKey = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

interface ReservationReceipt {
  referenceCode: string;
  guestName: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  seatingZone: string;
  highChairNeeded: boolean;
  notes: string;
}

const MARQUEE_HIGHLIGHTS = [
  'GARDEN HOUSE CAFE · جاردن هاوس كافيه',
  '4.9 ★ GUEST RATED (541 REVIEWS)',
  'THE ARC TOWER · 5TH FLOOR POOLSIDE SANCTUARY',
  'ICED PISTACHIO LATTE & ARTISAN V60',
  'FRESH 27-LAYER PISTACHIO & NUTELLA CROISSANTS',
  'ALL-DAY BRUNCH & EGG BENEDICT WITH AVOCADO',
  'BOTANICAL LAVENDER & BERRY MOJITOS',
  'QUIET LAPTOP-FRIENDLY STUDY NOOKS',
  'OPEN DAILY 7:00 AM – 10:00 PM',
];

export default function App() {
  // Smooth Page Scroll Progress Bar & Floating Scroll-To-Top State
  const { scrollYProgress } = useScroll();
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    restDelta: 0.001,
  });
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 420);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Persistent Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ghc_cart_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('ghc_cart_v1', JSON.stringify(cart));
    } catch {
      // ignore storage errors
    }
  }, [cart]);

  // Saved / Share Feedback State
  const [isSavedPlace, setIsSavedPlace] = useState<boolean>(() => {
    try {
      return localStorage.getItem('ghc_saved_place') === 'true';
    } catch {
      return false;
    }
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  // Page Routing State ('landing' shows curated preview; 'menu' shows all 54 items across 18 categories)
  const [activePage, setActivePage] = useState<'landing' | 'menu'>('landing');

  // Menu Filter & Search State
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('All Menu');
  const [menuSearch, setMenuSearch] = useState('');
  const [priceSort, setPriceSort] = useState<'default' | 'asc' | 'desc'>('default');

  const openFullMenuPage = (category: MenuCategory = 'All Menu') => {
    setSelectedCategory(category);
    setActivePage('menu');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToLandingSection = (sectionId?: string) => {
    setActivePage('landing');
    if (!sectionId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 60);
  };


  // Physical Menu Photo Modal State
  const [activeMenuBoardIdx, setActiveMenuBoardIdx] = useState<number | null>(null);

  // Gallery Lightbox State
  const [galleryCategory, setGalleryCategory] = useState<string>('All');
  const [activeGalleryIdx, setActiveGalleryIdx] = useState<number | null>(null);

  // Reviews & Popular Times State
  const [selectedReviewTopic, setSelectedReviewTopic] = useState<string>('All');
  const [customReviews, setCustomReviews] = useState<ReviewItem[]>([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewTopic, setNewReviewTopic] = useState('pistachio croissant');
  const [selectedDay, setSelectedDay] = useState<DayKey>('Wed');

  // Amenities Filter & Nearby Comparison Tab State
  const [amenitySearch, setAmenitySearch] = useState('');
  const [nearbyGroupFilter, setNearbyGroupFilter] = useState<
    'All' | 'Cafes' | 'Coffee shops' | 'Coffee and dessert'
  >('All');

  // Table Reservation Form State
  const [resName, setResName] = useState('');
  const [resPhone, setResPhone] = useState('+971 ');
  const [resDate, setResDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [resTime, setResTime] = useState('10:00 AM');
  const [resGuests, setResGuests] = useState('2 Guests');
  const [resZone, setResZone] = useState('Poolside 5th Floor Terrace');
  const [resHighChair, setResHighChair] = useState(false);
  const [resNotes, setResNotes] = useState('');
  const [reservationReceipt, setReservationReceipt] = useState<ReservationReceipt | null>(null);

  // Order Bag Button Ref & Fly-to-Bag Arc Animation State
  const orderBagBtnRef = useRef<HTMLButtonElement | null>(null);
  const [flyingTokens, setFlyingTokens] = useState<FlyingBagToken[]>([]);
  const [bagBounceKey, setBagBounceKey] = useState(0);

  const triggerFlyToBag = (item: MenuItem, e?: React.MouseEvent<HTMLButtonElement>) => {
    const bagRect = orderBagBtnRef.current?.getBoundingClientRect();
    const endX = bagRect ? bagRect.left + bagRect.width / 2 : window.innerWidth - 90;
    const endY = bagRect ? bagRect.top + bagRect.height / 2 : 32;

    let startX = window.innerWidth / 2;
    let startY = window.innerHeight / 2;

    if (e?.currentTarget) {
      const btnRect = e.currentTarget.getBoundingClientRect();
      startX = btnRect.left + btnRect.width / 2;
      startY = btnRect.top + btnRect.height / 2;
    }

    const tokenId = Date.now() + Math.random();
    setFlyingTokens((prev) => [
      ...prev,
      {
        id: tokenId,
        name: item.name,
        artworkType: item.artworkType,
        startX,
        startY,
        endX,
        endY,
      },
    ]);

    setTimeout(() => {
      setFlyingTokens((prev) => prev.filter((t) => t.id !== tokenId));
      setBagBounceKey((k) => k + 1);
    }, 640);
  };

  // Cart Handlers
  const handleAddToCart = (item: MenuItem, e?: React.MouseEvent<HTMLButtonElement>) => {
    triggerFlyToBag(item, e);
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
    showToast(`Added ${item.name} (dh ${item.price.toFixed(2)}) to your order bag`);
  };

  const handleUpdateQuantity = (
    id: string,
    delta: number,
    e?: React.MouseEvent<HTMLButtonElement>,
    itemForFly?: MenuItem
  ) => {
    if (delta > 0) {
      const found = itemForFly || MENU_ITEMS.find((m) => m.id === id);
      if (found) triggerFlyToBag(found, e);
    }
    setCart((prev) =>
      prev
        .map((c) => (c.item.id === id ? { ...c, quantity: c.quantity + delta } : c))
        .filter((c) => c.quantity > 0)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((c) => c.item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalCartCount = useMemo(
    () => cart.reduce((acc, c) => acc + c.quantity, 0),
    [cart]
  );
  const totalCartAmount = useMemo(
    () => cart.reduce((acc, c) => acc + c.item.price * c.quantity, 0),
    [cart]
  );

  // Filtered Menu Items
  const filteredMenuItems = useMemo(() => {
    let list = MENU_ITEMS.filter((item) => {
      const matchesCat =
        selectedCategory === 'All Menu'
          ? true
          : selectedCategory === 'At a Glance'
          ? Boolean(item.featuredInGlance)
          : item.category === selectedCategory;

      const q = menuSearch.trim().toLowerCase();
      const matchesQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);

      return matchesCat && matchesQuery;
    });

    if (priceSort === 'asc') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (priceSort === 'desc') {
      list = [...list].sort((a, b) => b.price - a.price);
    }
    return list;
  }, [selectedCategory, menuSearch, priceSort]);

  // Glance Trio
  const glanceItems = useMemo(
    () => MENU_ITEMS.filter((i) => i.featuredInGlance),
    []
  );

  // Curated 6 Signature Items for the Landing Page
  const landingSignatureItems = useMemo(() => {
    const signatureIds = [
      'ls-iced-pistachio',
      'cr-pistachio-nutella-kinda',
      'tst-egg-benedict-avocado',
      'sc-iced-orange-espresso',
      'adb-french-toast',
      'moj-lavender',
    ];
    return signatureIds
      .map((id) => MENU_ITEMS.find((item) => item.id === id))
      .filter((item): item is MenuItem => Boolean(item));
  }, []);

  // Filtered Reviews
  const allReviews = useMemo(
    () => [...customReviews, ...GOOGLE_REVIEWS],
    [customReviews]
  );

  const filteredReviews = useMemo(() => {
    if (selectedReviewTopic === 'All') return allReviews;
    return allReviews.filter((r) => r.topics.includes(selectedReviewTopic));
  }, [allReviews, selectedReviewTopic]);

  // Filtered Gallery
  const filteredGallery = useMemo(() => {
    if (galleryCategory === 'All') return GALLERY_MEDIA;
    return GALLERY_MEDIA.filter((g) => g.category === galleryCategory);
  }, [galleryCategory]);

  // Filtered Amenities
  const filteredAmenities = useMemo(() => {
    const q = amenitySearch.trim().toLowerCase();
    if (!q) return AMENITIES_MATRIX;
    return AMENITIES_MATRIX.map((group) => ({
      ...group,
      items: group.items.filter(
        (item) =>
          item.toLowerCase().includes(q) || group.category.toLowerCase().includes(q)
      ),
    })).filter((g) => g.items.length > 0);
  }, [amenitySearch]);

  // Filtered Nearby Places
  const filteredNearbyCafes = useMemo(() => {
    if (nearbyGroupFilter === 'All') return NEARBY_ABU_DHABI_CAFES;
    return NEARBY_ABU_DHABI_CAFES.filter((p) => p.group === nearbyGroupFilter);
  }, [nearbyGroupFilter]);

  const handleToggleSave = () => {
    const next = !isSavedPlace;
    setIsSavedPlace(next);
    try {
      localStorage.setItem('ghc_saved_place', String(next));
    } catch {
      // ignore
    }
    showToast(
      next
        ? 'Saved Garden House Cafe to your favorite places'
        : 'Removed from saved places'
    );
  };

  const handleShareVenue = async () => {
    const shareText = `${VENUE_INFO.name} (${VENUE_INFO.rating}★) — ${VENUE_INFO.address}. Maps: ${VENUE_INFO.googleMapsUrl}`;
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareText);
        showToast('Copied Garden House Cafe address & Google Maps link to clipboard');
        return;
      } catch {
        // fallback
      }
    }
    showToast('Share link ready: ' + VENUE_INFO.googleMapsUrl);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewText.trim()) return;
    const created: ReviewItem = {
      id: `custom-${Date.now()}`,
      author: newReviewAuthor.trim(),
      roleOrBadge: 'Verified Cafe Visitor · Just now',
      timeAgo: 'Just now',
      rating: 5,
      text: newReviewText.trim(),
      topics: [newReviewTopic, 'kind staff'],
    };
    setCustomReviews((prev) => [created, ...prev]);
    setNewReviewAuthor('');
    setNewReviewText('');
    setShowReviewForm(false);
    showToast('Thank you! Your 5★ review has been added.');
  };

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resName.trim() || resPhone.trim().length < 7) return;
    const code = `RES-${Math.floor(1000 + Math.random() * 9000)}`;
    setReservationReceipt({
      referenceCode: code,
      guestName: resName.trim(),
      phone: resPhone.trim(),
      date: resDate,
      time: resTime,
      guests: resGuests,
      seatingZone: resZone,
      highChairNeeded: resHighChair,
      notes: resNotes.trim() || 'Standard sanctuary table preparation',
    });
    showToast(`Table reservation ${code} confirmed for ${resName.trim()}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#231F1D]">
      {/* Strict 3-Zone Top Bar Contract + Live Scroll Progress Indicator */}
      <header className="sticky top-0 z-40 flex items-center justify-between gap-3 sm:gap-8 px-4 sm:px-6 lg:px-12 py-3.5 sm:py-4 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E3E7E1] relative">
        {/* Live Scroll Progress Bar */}
        <motion.div
          style={{ scaleX: smoothScrollProgress }}
          className="absolute top-0 left-0 right-0 h-[3px] origin-left bg-gradient-to-r from-[#5E7159] via-[#B87D4B] to-[#5E7159] z-50"
        />

        {/* Zone 1: Single text element wordmark */}
        <button
          type="button"
          onClick={() => navigateToLandingSection()}
          className="text-xl sm:text-2xl font-display font-semibold tracking-tight text-[#231F1D] whitespace-nowrap shrink-0 text-left cursor-pointer"
        >
          Garden House Cafe
        </button>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#5C645A]">
          <button
            type="button"
            onClick={() => navigateToLandingSection()}
            className={`hover:text-[#231F1D] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activePage === 'landing' ? 'text-[#231F1D] font-semibold' : ''
            }`}
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => openFullMenuPage('All Menu')}
            className={`hover:text-[#231F1D] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activePage === 'menu' ? 'text-[#5E7159] font-semibold underline' : ''
            }`}
          >
            Full Menu (54)
          </button>
          <button
            type="button"
            onClick={() => navigateToLandingSection('about-amenities')}
            className="hover:text-[#231F1D] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            About & Amenities
          </button>
          <button
            type="button"
            onClick={() => navigateToLandingSection('reviews-hours')}
            className="hover:text-[#231F1D] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Reviews & Hours
          </button>
          <button
            type="button"
            onClick={() => navigateToLandingSection('reserve-visit')}
            className="hover:text-[#231F1D] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Reserve & Visit
          </button>
        </nav>

        {/* Zone 3: 1 primary action with Fly-to-Bag bounce target */}
        <div className="flex items-center shrink-0">
          <motion.button
            ref={orderBagBtnRef}
            key={bagBounceKey}
            animate={
              bagBounceKey > 0
                ? { scale: [1, 1.18, 0.93, 1.07, 1], rotate: [0, -4, 4, -2, 0] }
                : { scale: 1 }
            }
            transition={{ duration: 0.42, ease: 'easeOut' }}
            onClick={() => setIsCartOpen(true)}
            className="px-3 sm:px-4 py-2 text-xs font-semibold text-white bg-[#5E7159] hover:bg-[#4D5E49] rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 sm:gap-2 shadow-xs cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
            <span>
              Order Bag ({totalCartCount}){' '}
              <span className="hidden xs:inline sm:inline">
                {totalCartAmount > 0 ? `· dh ${totalCartAmount.toFixed(0)}` : ''}
              </span>
            </span>
          </motion.button>
        </div>
      </header>

      {/* Mobile Touch-Friendly Quick Navigation Bar (Visible on Smartphones < 768px) */}
      <nav
        aria-label="Mobile quick navigation"
        className="md:hidden sticky top-[57px] z-30 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E3E7E1] px-4 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar"
      >
        <button
          type="button"
          onClick={() => navigateToLandingSection()}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
            activePage === 'landing'
              ? 'bg-[#231F1D] text-white'
              : 'bg-white text-[#5C645A] border border-[#E3E7E1]'
          }`}
        >
          Home
        </button>
        <button
          type="button"
          onClick={() => openFullMenuPage('All Menu')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
            activePage === 'menu'
              ? 'bg-[#5E7159] text-white'
              : 'bg-[#EFF2EE] text-[#5E7159] border border-[#5E7159]/30'
          }`}
        >
          Full Menu (54)
        </button>
        <button
          type="button"
          onClick={() => navigateToLandingSection('about-amenities')}
          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white text-[#5C645A] border border-[#E3E7E1] whitespace-nowrap shrink-0 cursor-pointer"
        >
          About & Amenities
        </button>
        <button
          type="button"
          onClick={() => navigateToLandingSection('reviews-hours')}
          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white text-[#5C645A] border border-[#E3E7E1] whitespace-nowrap shrink-0 cursor-pointer"
        >
          Reviews & Hours
        </button>
        <button
          type="button"
          onClick={() => navigateToLandingSection('reserve-visit')}
          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white text-[#5C645A] border border-[#E3E7E1] whitespace-nowrap shrink-0 cursor-pointer"
        >
          Reserve & Visit
        </button>
      </nav>

      {/* Fly-to-Bag Parabolic Arc Particles */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
        <AnimatePresence>
          {flyingTokens.map((token) => {
            const midX = (token.startX + token.endX) / 2;
            const arcPeakY = Math.min(token.startY, token.endY) - 110;
            const isPastryOrFood =
              token.artworkType === 'croissant' ||
              token.artworkType === 'toast-brunch' ||
              token.artworkType === 'cake-dessert' ||
              token.artworkType === 'savory-bowl';

            return (
              <motion.div
                key={token.id}
                initial={{
                  x: token.startX - 20,
                  y: token.startY - 20,
                  scale: 0.85,
                  opacity: 1,
                  rotate: 0,
                }}
                animate={{
                  x: [token.startX - 20, midX - 20, token.endX - 16],
                  y: [token.startY - 20, arcPeakY - 20, token.endY - 16],
                  scale: [0.95, 1.18, 0.35],
                  opacity: [1, 1, 0.2],
                  rotate: [0, -14, 18],
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  duration: 0.64,
                  ease: [0.22, 1, 0.36, 1],
                  times: [0, 0.46, 1],
                }}
                className="fixed top-0 left-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[#231F1D] text-white shadow-xl border border-[#9AB589]"
              >
                {isPastryOrFood ? (
                  <Utensils className="w-3.5 h-3.5 text-[#E8C59B]" />
                ) : (
                  <Coffee className="w-3.5 h-3.5 text-[#9AB589]" />
                )}
                <span className="text-[10px] font-semibold whitespace-nowrap max-w-[110px] truncate">
                  +1 {token.name}
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Floating Scroll-To-Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 16 }}
            transition={{ duration: 0.22 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll back to top"
            className={`fixed left-4 sm:left-5 z-40 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#231F1D] hover:bg-[#5E7159] text-white shadow-lg border border-[#E3E7E1]/30 flex items-center justify-center transition-all cursor-pointer ${
              totalCartCount > 0 ? 'bottom-20 md:bottom-5' : 'bottom-5'
            }`}
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile Floating Bottom Order Bag Checkout Bar */}
      <AnimatePresence>
        {totalCartCount > 0 && !isCartOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.22 }}
            className="md:hidden fixed bottom-3 left-3 right-3 z-40"
          >
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="w-full py-3 px-4 rounded-xl bg-[#231F1D] text-white shadow-xl border border-[#5E7159] flex items-center justify-between gap-3 cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#5E7159] text-white text-xs font-mono-tabular font-semibold flex items-center justify-center">
                  {totalCartCount}
                </span>
                <span className="text-xs font-semibold">View Order Bag & Checkout</span>
              </div>
              <span className="text-xs font-mono-tabular font-semibold text-[#E8C59B]">
                dh {totalCartAmount.toFixed(2)} →
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.18 }}
            className={`fixed right-4 left-4 sm:left-auto sm:right-5 z-50 sm:max-w-sm bg-[#231F1D] text-white px-4 py-3 rounded-lg shadow-xl border border-[#5E7159]/40 flex items-center gap-2.5 text-xs ${
              totalCartCount > 0 ? 'bottom-20 md:bottom-5' : 'bottom-5'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-[#9AB589] shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <main id="top" className="flex-1">
        {activePage === 'menu' ? (
          /* DEDICATED FULL 54-ITEM MENU PAGE */
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-10 space-y-6 sm:space-y-8">
            {/* Top Breadcrumb & Menu Page Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white border border-[#E3E7E1] rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-2xs"
            >
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => navigateToLandingSection()}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5E7159] hover:text-[#231F1D] transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Landing Page</span>
                </button>
                <div className="flex items-center gap-3.5 pt-1">
                  <img
                    src={VENUE_INFO.logoPath}
                    alt="Garden House Cafe"
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-xl object-contain border border-[#E3E7E1] bg-white p-1 shrink-0"
                  />
                  <div>
                    <p className="text-xs text-[#5E7159] font-medium">
                      Complete Cafe Menu · All 18 Categories · {MENU_ITEMS.length} Items
                    </p>
                    <h1 className="text-3xl sm:text-4xl font-display font-semibold text-[#231F1D]">
                      Garden House Cafe — Full Menu
                    </h1>
                  </div>
                </div>
              </div>

              {/* Search, Sort & Physical Menu Board Triggers */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative min-w-[230px] flex-1 sm:flex-initial">
                  <Search className="w-4 h-4 text-[#5C645A] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={menuSearch}
                    onChange={(e) => setMenuSearch(e.target.value)}
                    placeholder="Search all 54 dishes & drinks..."
                    className="w-full pl-9 pr-3 py-2.5 text-xs bg-[#FAF8F5] border border-[#E3E7E1] rounded-lg focus:outline-none focus:border-[#5E7159]"
                  />
                </div>

                <select
                  value={priceSort}
                  onChange={(e) => setPriceSort(e.target.value as 'default' | 'asc' | 'desc')}
                  aria-label="Sort menu by price"
                  className="px-3 py-2.5 text-xs font-medium bg-[#FAF8F5] border border-[#E3E7E1] rounded-lg text-[#231F1D] focus:outline-none focus:border-[#5E7159]"
                >
                  <option value="default">Sort: Category Default</option>
                  <option value="asc">Price: Low to High (dh 7 → dh 60)</option>
                  <option value="desc">Price: High to Low (dh 60 → dh 7)</option>
                </select>

                <button
                  onClick={() => setActiveMenuBoardIdx(0)}
                  className="px-3.5 py-2.5 text-xs font-semibold text-[#5E7159] bg-[#EFF2EE] hover:bg-[#E3E7E1] rounded-lg transition-colors whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  Menu Photos (1–3)
                </button>
              </div>
            </motion.div>

            {/* Interactive 18-Category Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2 border-b border-[#E3E7E1]">
              {MENU_CATEGORIES.map((category) => {
                const isSelected = selectedCategory === category;
                const count =
                  category === 'All Menu'
                    ? MENU_ITEMS.length
                    : category === 'At a Glance'
                    ? glanceItems.length
                    : MENU_ITEMS.filter((i) => i.category === category).length;

                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-[#5E7159] text-white shadow-xs'
                        : 'bg-white text-[#5C645A] hover:text-[#231F1D] border border-[#E3E7E1]'
                    }`}
                  >
                    {category} ({count})
                  </button>
                );
              })}
            </div>

            {/* Complete Menu Grid */}
            {filteredMenuItems.length === 0 ? (
              <div className="bg-white border border-[#E3E7E1] rounded-xl p-12 text-center space-y-3">
                <p className="text-base font-medium text-[#231F1D]">
                  No menu items match "{menuSearch}" in {selectedCategory}.
                </p>
                <button
                  onClick={() => {
                    setMenuSearch('');
                    setSelectedCategory('All Menu');
                    setPriceSort('default');
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-[#5E7159] rounded-lg hover:bg-[#4D5E49] transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset Menu Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMenuItems.map((item, idx) => {
                  const inCart = cart.find((c) => c.item.id === item.id);
                  return (
                    <MagneticMenuCard
                      key={item.id}
                      item={item}
                      idx={idx}
                      inCartQuantity={inCart?.quantity || 0}
                      onAddToCart={handleAddToCart}
                      onUpdateQuantity={handleUpdateQuantity}
                    />
                  );
                })}
              </div>
            )}
          </section>
        ) : (
          <>
            {/* SECTION 0: DYNAMIC LIMITED EDITION SEASONAL MENU COUNTDOWN BANNER */}
            <LimitedEditionBanner
              onAddToCart={handleAddToCart}
              onExploreFullMenu={() => openFullMenuPage('All Menu')}
            />

            {/* SECTION 1: FLAGSHIP INTERACTIVE RESTAURANT LANDING HERO */}
            <RestaurantLandingHero
              onAddToCart={handleAddToCart}
              onOpenCart={() => setIsCartOpen(true)}
              onOpenMenuBoard={(idx) => setActiveMenuBoardIdx(idx)}
              onOpenVideoTour={() => setActiveGalleryIdx(0)}
              onNavigateToFullMenu={() => openFullMenuPage('All Menu')}
              totalCartCount={totalCartCount}
              onQuickReserve={(zone, guests, time) => {
                setResZone(zone);
                setResGuests(guests);
                setResTime(time);
                const el = document.getElementById('reserve-visit');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                showToast(
                  `Selected ${zone} for ${guests} at ${time} — enter your name below to confirm`
                );
              }}
            />

            {/* CONTINUOUS SCROLLING BOTANICAL & CULINARY MARQUEE RIBBON */}
            <div
              className="bg-[#231F1D] text-[#FAF8F5] border-b border-[#E3E7E1] py-3 overflow-hidden select-none"
              aria-label="Garden House Cafe Signature Highlights"
            >
              <div className="animate-marquee-infinite items-center">
                {[...MARQUEE_HIGHLIGHTS, ...MARQUEE_HIGHLIGHTS].map((label, idx) => (
                  <div
                    key={`${label}-${idx}`}
                    className="inline-flex items-center gap-4 px-4 text-xs font-medium tracking-wider whitespace-nowrap"
                  >
                    <span>{label}</span>
                    <span className="text-[#9AB589]" aria-hidden="true">
                      ✦
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 1B: RESTAURANT SIGNATURE "AT A GLANCE" & VENUE UTILITY STRIP */}
            <section
              id="glance-favorites"
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-12 border-b border-[#E3E7E1] space-y-6 sm:space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col md:flex-row md:items-end justify-between gap-4"
              >
                <div>
                  <p className="text-xs font-medium text-[#5E7159]">
                    House Signatures · Freshly Crafted in Our Kitchen
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-display font-semibold text-[#231F1D]">
                    At a Glance — Quick Cafe Favorites
                  </h2>
                </div>

                {/* Utility Actions: Save, Share, Call, WhatsApp */}
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={VENUE_INFO.phoneHref}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono-tabular font-medium text-[#231F1D] bg-white border border-[#E3E7E1] rounded-lg hover:bg-[#EFF2EE] transition-colors whitespace-nowrap shrink-0"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#5E7159]" />
                    {VENUE_INFO.phoneDisplay}
                  </a>
                  <button
                    onClick={handleToggleSave}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium border rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isSavedPlace
                        ? 'bg-[#EFF2EE] text-[#5E7159] border-[#5E7159]'
                        : 'bg-white text-[#231F1D] border-[#E3E7E1] hover:bg-[#EFF2EE]'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    {isSavedPlace ? 'Saved' : 'Save Cafe'}
                  </button>
                  <button
                    onClick={handleShareVenue}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#231F1D] bg-white border border-[#E3E7E1] rounded-lg hover:bg-[#EFF2EE] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5 text-[#5E7159]" />
                    Share
                  </button>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {glanceItems.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 26 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.45,
                      delay: idx * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{ y: -3 }}
                    className="bg-white border border-[#E3E7E1] rounded-xl p-4 flex items-center justify-between gap-4 hover:border-[#5E7159]/50 transition-colors shadow-2xs"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <MenuArtwork
                        type={item.artworkType}
                        name={item.name}
                        className="w-16 h-16 rounded-lg shrink-0 border border-[#E3E7E1]"
                      />
                      <div className="min-w-0 space-y-1">
                        <p className="text-[11px] font-medium text-[#5E7159] uppercase tracking-wider">
                          {item.category}
                        </p>
                        <h3 className="text-base font-semibold text-[#231F1D] truncate">
                          {item.name}
                        </h3>
                        <p className="text-xs text-[#5C645A] line-clamp-1">{item.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className="text-sm font-mono-tabular font-semibold text-[#231F1D]">
                        dh {item.price.toFixed(2)}
                      </span>
                      <button
                        onClick={(e) => handleAddToCart(item, e)}
                        className="px-3 py-1.5 rounded-md bg-[#5E7159] text-white text-xs font-semibold hover:bg-[#4D5E49] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        + Order
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* SECTION 2 (LANDING PAGE): CURATED 6-ITEM SIGNATURE PREVIEW + FULL MENU PAGE GATEWAY */}
            <section
              id="menu"
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-16 border-b border-[#E3E7E1] space-y-8 sm:space-y-10"
            >
              <motion.div
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col lg:flex-row lg:items-end justify-between gap-6"
              >
                <div className="space-y-2">
                  <p className="text-xs text-[#5E7159] font-medium">
                    01. Curated Taste of Garden House · 6 Chef & Barista Signatures
                  </p>
                  <h2 className="text-3xl sm:text-4xl font-display font-semibold text-[#231F1D]">
                    Signature Dishes & Specialty Brews
                  </h2>
                  <p className="text-sm text-[#5C645A] max-w-2xl">
                    A hand-picked preview of our most-loved creations. Open our dedicated Menu Page
                    anytime to browse all {MENU_ITEMS.length} dishes and drinks across 18 categories.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveMenuBoardIdx(0)}
                    className="px-4 py-2.5 text-xs font-semibold text-[#231F1D] bg-white hover:bg-[#EFF2EE] border border-[#E3E7E1] rounded-lg transition-colors whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#5E7159]" />
                    Menu Photos (1–3)
                  </button>
                  <button
                    type="button"
                    onClick={() => openFullMenuPage('All Menu')}
                    className="px-5 py-2.5 text-xs font-semibold text-white bg-[#5E7159] hover:bg-[#4D5E49] rounded-lg transition-colors whitespace-nowrap shrink-0 inline-flex items-center gap-2 shadow-xs cursor-pointer"
                  >
                    <span>View Complete Menu ({MENU_ITEMS.length} Items)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>

              {/* 6 Curated Signature Cards with 3D Magnetic Tilt & Floating Steam */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {landingSignatureItems.map((item, idx) => {
                  const inCart = cart.find((c) => c.item.id === item.id);
                  return (
                    <MagneticMenuCard
                      key={item.id}
                      item={item}
                      idx={idx}
                      inCartQuantity={inCart?.quantity || 0}
                      onAddToCart={handleAddToCart}
                      onUpdateQuantity={handleUpdateQuantity}
                    />
                  );
                })}
              </div>

              {/* Interactive Category Gateway Bar to Full Menu Page */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="bg-[#EFF2EE] border border-[#E3E7E1] rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                <div className="space-y-1.5">
                  <p className="text-xs font-semibold text-[#5E7159] uppercase tracking-wider">
                    Full 18-Category Culinary Catalog
                  </p>
                  <h3 className="text-2xl font-display font-semibold text-[#231F1D]">
                    Hungry for more? Jump directly into any category on our Menu Page:
                  </h3>
                  <div className="flex flex-wrap items-center gap-1.5 pt-2">
                    {(
                      [
                        'Specialty Coffee',
                        'Latte Special',
                        'Croissants',
                        'Toast',
                        'All Day Breakfast',
                        'Pancake',
                        'Sandwich',
                        'Mojito',
                        'Iced Tea',
                        'Muffin & Cake',
                      ] as MenuCategory[]
                    ).map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => openFullMenuPage(cat)}
                        className="px-3 py-1.5 text-xs font-medium text-[#231F1D] bg-white hover:bg-[#5E7159] hover:text-white border border-[#E3E7E1] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        {cat} →
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => openFullMenuPage('All Menu')}
                  className="px-6 py-3.5 text-xs sm:text-sm font-semibold text-white bg-[#231F1D] hover:bg-[#5E7159] rounded-xl transition-colors whitespace-nowrap shrink-0 inline-flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <span>Open Full Menu Page (All 54 Items)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </section>


        {/* SECTION 3: ABOUT US & COMPLETE A-TO-Z AMENITIES DIRECTORY */}
        <section
          id="about-amenities"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-16 border-b border-[#E3E7E1] space-y-10 sm:space-y-12"
        >
          {/* Editorial Story Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-stretch">
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 space-y-5 flex flex-col justify-between bg-white border border-[#E3E7E1] rounded-xl p-5 sm:p-8"
            >
              <div className="space-y-4">
                <p className="text-xs text-[#5E7159] font-medium">
                  02. About Garden House Cafe · The Arc Tower 5th Floor
                </p>
                <h2 className="text-3xl sm:text-4xl font-display font-semibold text-[#231F1D] leading-tight">
                  Designed for unhurried mornings, quiet focus, and poolside warmth.
                </h2>
                <p className="text-sm text-[#5C645A] leading-relaxed">
                  Welcome to Garden House Cafe. Our café is a haven for coffee enthusiasts and food
                  lovers, offering a serene and quiet environment perfect for both relaxation and
                  productivity.
                </p>
                <p className="text-sm text-[#5C645A] leading-relaxed">
                  Situated on the 5th Floor podium level of The Arc Tower in The Gate District, Al
                  Reem Island, our space bridges indoor botanical calm with breezy outdoor poolside
                  seating. Whether you are starting your day with an Iced Pistachio Latte and warm
                  Zaatar Croissant, working solo with a laptop, or gathering with family for All-Day
                  Breakfast, our team welcomes you every day from 7:00 AM to 10:00 PM.
                </p>
              </div>

              <div className="pt-6 border-t border-[#E3E7E1] grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <p className="text-2xl font-mono-tabular font-semibold text-[#5E7159]">
                    <AnimatedCounter target={4.9} decimals={1} suffix=" ★" />
                  </p>
                  <p className="text-xs text-[#5C645A] mt-0.5">Guest Rating</p>
                </div>
                <div>
                  <p className="text-2xl font-mono-tabular font-semibold text-[#231F1D]">
                    <AnimatedCounter target={541} />
                  </p>
                  <p className="text-xs text-[#5C645A] mt-0.5">Verified Reviews</p>
                </div>
                <div>
                  <p className="text-2xl font-mono-tabular font-semibold text-[#231F1D]">
                    <AnimatedCounter target={54} suffix=" Items" />
                  </p>
                  <p className="text-xs text-[#5C645A] mt-0.5">Across 18 Categories</p>
                </div>
                <div>
                  <p className="text-2xl font-mono-tabular font-semibold text-[#231F1D]">
                    <AnimatedCounter target={15} suffix=" Hrs" />
                  </p>
                  <p className="text-xs text-[#5C645A] mt-0.5">Open Daily 7 AM – 10 PM</p>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Real Storefront Poolside Photo + Core Pillars */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.58, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              <div
                onClick={() => setActiveGalleryIdx(0)}
                className="sm:col-span-2 relative h-64 sm:h-72 rounded-xl overflow-hidden border border-[#E3E7E1] cursor-pointer group"
              >
                <img
                  src={VENUE_INFO.storefrontPhotoPath}
                  alt="Garden House Cafe — Speciality Coffee Poolside Storefront at The Arc Tower 5th Floor"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top scale-[1.07] origin-top transition-transform duration-500 group-hover:scale-110"
                />
                {/* Interactive Turquoise Poolside Water Caustic Ripple Overlay */}
                <PoolsideWaterRippleOverlay heightClass="h-[36%]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex flex-col justify-end p-5 text-white pointer-events-none">
                  <p className="text-xs text-white/85">
                    The Arc Tower · 5th Floor Poolside Facade · جاردن هاوس كافيه
                  </p>
                  <h3 className="text-xl font-display font-semibold mt-0.5">
                    Our Serene Poolside Storefront in Al Reem Island
                  </h3>
                </div>
              </div>

              <div className="bg-[#EFF2EE] border border-[#E3E7E1] rounded-xl p-5 flex flex-col justify-between space-y-3">
                <Coffee className="w-5 h-5 text-[#5E7159]" />
                <div className="space-y-1.5">
                  <h3 className="text-lg font-display font-semibold text-[#231F1D]">
                    Specialty Coffee & Tea Selection
                  </h3>
                  <p className="text-xs text-[#5C645A] leading-relaxed">
                    Precision-pulled espresso, Iced Orange Espresso, Ceremonial Matcha, Iced
                    Pistachio Lattes, and fragrant Earl Grey Flora & Masala Chai infusions.
                  </p>
                </div>
              </div>

              <div className="bg-white border border-[#E3E7E1] rounded-xl p-5 flex flex-col justify-between space-y-3">
                <Utensils className="w-5 h-5 text-[#B87D4B]" />
                <div className="space-y-1.5">
                  <h3 className="text-lg font-display font-semibold text-[#231F1D]">
                    All-Day Brunch & Artisanal Bakery
                  </h3>
                  <p className="text-xs text-[#5C645A] leading-relaxed">
                    Flaky Pistachio/Nutella croissants, Egg Benedict with Avocado, Halloumi Heaven
                    Toast, Brioche French Toast, and savory club sandwiches.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Complete A-to-Z Venue Features, Accessibility & Amenities Matrix */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
            >
              <div>
                <h3 className="text-2xl font-display font-semibold text-[#231F1D]">
                  Complete A-to-Z Venue Amenities, Service Options & Accessibility
                </h3>
                <p className="text-xs text-[#5C645A] mt-1">
                  Every facility detail at The Arc Tower 5th Floor—from wheelchair access
                  and poolside outdoor seating to contactless payments and kids’ high chairs.
                </p>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-[#5C645A] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={amenitySearch}
                  onChange={(e) => setAmenitySearch(e.target.value)}
                  placeholder="Filter amenities (e.g. kids, parking, wifi)..."
                  className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-[#E3E7E1] rounded-lg focus:outline-none focus:border-[#5E7159]"
                />
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredAmenities.map((group, idx) => (
                <motion.div
                  key={group.category}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.42,
                    delay: (idx % 3) * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: -3 }}
                  className="bg-white border border-[#E3E7E1] rounded-xl p-5 space-y-3 transition-shadow hover:shadow-xs"
                >
                  <h4 className="text-sm font-semibold text-[#231F1D] border-b border-[#E3E7E1] pb-2">
                    {group.category}
                  </h4>
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-[#5C645A]">
                        <Check className="w-3.5 h-3.5 text-[#5E7159] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: GOOGLE REVIEWS (4.9★ · 541) & INTERACTIVE POPULAR TIMES */}
        <section
          id="reviews-hours"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-16 border-b border-[#E3E7E1] space-y-10 sm:space-y-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
          >
            <div className="space-y-1.5">
              <p className="text-xs text-[#5E7159] font-medium">
                03. Guest Experiences & Visit Hours
              </p>
              <h2 className="text-3xl sm:text-4xl font-display font-semibold text-[#231F1D]">
                Guest Review Summary & Popular Times
              </h2>
            </div>
            <button
              onClick={() => setShowReviewForm((prev) => !prev)}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#231F1D] bg-white hover:bg-[#EFF2EE] border border-[#E3E7E1] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4 text-[#5E7159]" />
              Rate and Review
            </button>
          </motion.div>

          {/* Optional Add Review Drawer */}
          <AnimatePresence>
            {showReviewForm && (
              <motion.form
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                onSubmit={handleReviewSubmit}
                className="bg-white border border-[#5E7159]/40 rounded-xl p-6 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-display font-semibold text-[#231F1D]">
                    Share Your Experience at Garden House Cafe
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="text-xs text-[#5C645A] hover:text-[#231F1D]"
                  >
                    Cancel
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#5C645A] mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={newReviewAuthor}
                      onChange={(e) => setNewReviewAuthor(e.target.value)}
                      placeholder="e.g., Layla Hassan"
                      className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E3E7E1] rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#5C645A] mb-1">Highlight Topic</label>
                    <select
                      value={newReviewTopic}
                      onChange={(e) => setNewReviewTopic(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E3E7E1] rounded-lg"
                    >
                      {REVIEW_TOPICS.filter((t) => t.id !== 'All').map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-[#5C645A] mb-1">Your Review *</label>
                  <textarea
                    rows={3}
                    required
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    placeholder="What did you enjoy most? (e.g., Pistachio croissant, poolside atmosphere, kind staff...)"
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E3E7E1] rounded-lg"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-[#5E7159] hover:bg-[#4D5E49] rounded-lg transition-colors"
                >
                  Publish 5★ Review
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Rating Distribution + Popular Times Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: Google Review Summary Bars & Topic Filters */}
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 bg-white border border-[#E3E7E1] rounded-xl p-6 flex flex-col justify-between space-y-6"
            >
              <div className="flex items-center gap-6 pb-5 border-b border-[#E3E7E1]">
                <div className="text-center shrink-0">
                  <p className="text-5xl font-mono-tabular font-semibold text-[#231F1D]">
                    <AnimatedCounter target={VENUE_INFO.rating} decimals={1} />
                  </p>
                  <div className="flex items-center justify-center gap-0.5 my-1.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className="w-4 h-4 fill-[#B87D4B] text-[#B87D4B]"
                      />
                    ))}
                  </div>
                  <p className="text-xs font-mono-tabular text-[#5C645A]">
                    (<AnimatedCounter target={VENUE_INFO.reviewCount + customReviews.length} />)
                  </p>
                </div>

                <div className="flex-1 space-y-2">
                  {RATING_DISTRIBUTION.map((row, idx) => (
                    <div key={row.stars} className="flex items-center gap-2.5 text-xs">
                      <span className="font-mono-tabular font-medium w-3 text-[#231F1D]">
                        {row.stars}
                      </span>
                      <div className="flex-1 h-2 bg-[#EFF2EE] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${row.percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.65, delay: idx * 0.08 }}
                          className="h-full bg-[#B87D4B] rounded-full"
                        />
                      </div>
                      <span className="font-mono-tabular text-[#5C645A] w-8 text-right">
                        {row.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* "About this place" Interactive Topic Filter Buttons */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-[#231F1D]">
                  Filter guest reviews by highlight:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {REVIEW_TOPICS.map((topic) => {
                    const active = selectedReviewTopic === topic.id;
                    return (
                      <button
                        key={topic.id}
                        onClick={() => setSelectedReviewTopic(topic.id)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          active
                            ? 'bg-[#5E7159] text-white'
                            : 'bg-[#FAF8F5] text-[#5C645A] hover:text-[#231F1D] border border-[#E3E7E1]'
                        }`}
                      >
                        {topic.label} · {topic.count}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Right: Interactive Popular Times Histogram (Mon - Sun) */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7 bg-white border border-[#E3E7E1] rounded-xl p-6 flex flex-col justify-between space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E3E7E1] pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#5E7159]" />
                    <h3 className="text-lg font-display font-semibold text-[#231F1D]">
                      Popular Times · Plan Your Visit
                    </h3>
                  </div>
                  <p className="text-xs text-[#5E7159] font-medium mt-0.5">
                    {POPULAR_TIMES_DATA[selectedDay].summary}
                  </p>
                </div>

                {/* Day Selector Tabs */}
                <div className="flex items-center gap-1 bg-[#FAF8F5] p-1 rounded-lg border border-[#E3E7E1] overflow-x-auto no-scrollbar max-w-full">
                  {(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as DayKey[]).map((day) => (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        selectedDay === day
                          ? 'bg-[#5E7159] text-white'
                          : 'text-[#5C645A] hover:text-[#231F1D]'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hourly Bar Chart */}
              <div className="pt-2">
                <div className="h-36 flex items-end justify-between gap-1.5 sm:gap-2 pt-4 px-1">
                  {POPULAR_TIMES_DATA[selectedDay].hours.map((slot) => {
                    const isLiveHour = Boolean(slot.live);
                    const barHeight = slot.live ? slot.live : slot.busyness;
                    return (
                      <div
                        key={slot.label}
                        className="flex-1 flex flex-col items-center gap-2 h-full justify-end group"
                      >
                        <span className="text-[10px] font-mono-tabular text-[#5C645A] opacity-0 group-hover:opacity-100 transition-opacity">
                          {barHeight}%
                        </span>
                        <div className="w-full bg-[#EFF2EE] rounded-t-sm h-24 flex items-end overflow-hidden">
                          <motion.div
                            key={`${selectedDay}-${slot.label}`}
                            initial={{ height: 0 }}
                            whileInView={{ height: `${barHeight}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45 }}
                            className={`w-full rounded-t-sm ${
                              isLiveHour ? 'bg-[#B87D4B]' : 'bg-[#748470]'
                            }`}
                          />
                        </div>
                        <span
                          className={`text-[10px] font-mono-tabular ${
                            isLiveHour ? 'font-bold text-[#B87D4B]' : 'text-[#5C645A]'
                          }`}
                        >
                          {slot.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#E3E7E1] text-xs text-[#5C645A]">
                <span>{POPULAR_TIMES_DATA[selectedDay].peakNote}</span>
                <span className="font-medium text-[#B87D4B]">
                  Highlighted bar: Live / Peak 10 AM Brunch Window
                </span>
              </div>
            </motion.div>
          </div>

          {/* Filtered Guest Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((review, idx) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.45,
                  delay: (idx % 3) * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -3 }}
                className="bg-white border border-[#E3E7E1] rounded-xl p-6 flex flex-col justify-between space-y-4 transition-shadow hover:shadow-xs"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-semibold text-[#231F1D]">{review.author}</h4>
                      <p className="text-xs text-[#5C645A]">
                        {review.roleOrBadge} · {review.timeAgo}
                      </p>
                    </div>
                    <div className="flex items-center gap-0.5 shrink-0">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className="w-3.5 h-3.5 fill-[#B87D4B] text-[#B87D4B]"
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-[#231F1D] leading-relaxed">{review.text}</p>
                </div>

                <div className="pt-3 border-t border-[#E3E7E1] flex items-center justify-between text-xs text-[#5C645A]">
                  <span>Topics: {review.topics.join(' · ')}</span>
                  {review.mediaTag && (
                    <span className="font-medium text-[#5E7159]">{review.mediaTag}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECTION 5: INTERACTIVE PHOTO & VIDEO GALLERY */}
        <section
          id="gallery"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-16 border-b border-[#E3E7E1] space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
          >
            <div className="space-y-1.5">
              <p className="text-xs text-[#5E7159] font-medium">
                04. Visual Tour & Community Highlights
              </p>
              <h2 className="text-3xl sm:text-4xl font-display font-semibold text-[#231F1D]">
                Photos & Video Highlights
              </h2>
              <p className="text-sm text-[#5C645A]">
                Explore poolside moments, specialty coffee pours, and morning pastries from our
                5th-floor oasis.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {[
                'All',
                'Poolside & Ambience',
                'Specialty Coffee & Smoothies',
                'Croissants & Brunch',
              ].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setGalleryCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    galleryCategory === cat
                      ? 'bg-[#5E7159] text-white'
                      : 'bg-white text-[#5C645A] hover:text-[#231F1D] border border-[#E3E7E1]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((media, idx) => {
              const globalIdx = GALLERY_MEDIA.findIndex((m) => m.id === media.id);
              return (
                <motion.div
                  key={media.id}
                  initial={{ opacity: 0, y: 28, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.46,
                    delay: idx * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: -4 }}
                  onClick={() => setActiveGalleryIdx(globalIdx)}
                  className="group cursor-pointer bg-white border border-[#E3E7E1] rounded-xl overflow-hidden flex flex-col justify-between transition-shadow duration-200 hover:shadow-md"
                >
                  <div className="relative h-52 w-full overflow-hidden border-b border-[#E3E7E1]">
                    <GalleryVisual
                      theme={media.visualTheme}
                      imageUrl={media.imageUrl}
                      className="w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end justify-between p-4 text-white">
                      <span className="text-xs font-medium">
                        {media.contributor} · {media.source} · {media.timeAgo}
                      </span>
                      {media.type === 'video' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-black/60 text-xs font-mono-tabular">
                          <Play className="w-3 h-3 fill-white" />
                          {media.duration}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-4 space-y-1">
                    <p className="text-xs text-[#5E7159] font-medium">{media.category}</p>
                    <h3 className="text-base font-semibold text-[#231F1D]">{media.title}</h3>
                    <p className="text-xs text-[#5C645A] line-clamp-2">{media.caption}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* SECTION 6: TABLE RESERVATION BOOKING FORM & LOCATION GUIDE */}
        <section
          id="reserve-visit"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-16 space-y-12 sm:space-y-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Left: Table Reservation Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 bg-white border border-[#E3E7E1] rounded-xl p-6 sm:p-8 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-2">
                <p className="text-xs text-[#5E7159] font-medium">
                  05. Table Reservations & Visit Guide
                </p>
                <h2 className="text-3xl font-display font-semibold text-[#231F1D]">
                  Reserve a Poolside or Study Table
                </h2>
                <p className="text-xs text-[#5C645A]">
                  Whether for solo laptop focus, a weekend family brunch, or group coffee by the 5th
                  floor terrace—reserve your table in advance.
                </p>
              </div>

              {reservationReceipt ? (
                <div className="bg-[#FAF8F5] border border-[#5E7159]/40 rounded-xl p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#5E7159] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-mono-tabular font-semibold text-[#5E7159]">
                        RESERVATION #{reservationReceipt.referenceCode} · CONFIRMED
                      </p>
                      <h3 className="text-xl font-display font-semibold text-[#231F1D]">
                        We look forward to hosting you, {reservationReceipt.guestName}!
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-[#5C645A] border-t border-[#E3E7E1] pt-3">
                    <div className="flex justify-between">
                      <span>Date & Time:</span>
                      <span className="font-mono-tabular font-medium text-[#231F1D]">
                        {reservationReceipt.date} at {reservationReceipt.time}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Party Size:</span>
                      <span className="font-medium text-[#231F1D]">
                        {reservationReceipt.guests}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Seating Area:</span>
                      <span className="font-medium text-[#231F1D]">
                        {reservationReceipt.seatingZone}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Kids' High Chair:</span>
                      <span className="font-medium text-[#231F1D]">
                        {reservationReceipt.highChairNeeded ? 'Requested' : 'Not required'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setReservationReceipt(null)}
                    className="w-full py-2.5 px-4 text-xs font-medium text-[#231F1D] bg-white border border-[#E3E7E1] rounded-lg hover:bg-[#EFF2EE] transition-colors"
                  >
                    Modify or Book Another Table
                  </button>
                </div>
              ) : (
                <form onSubmit={handleReservationSubmit} className="space-y-5">
                  {/* Visual Month-View Calendar & 5th-Floor Terrace Availability Slot Picker */}
                  <TerraceReservationCalendar
                    selectedDate={resDate}
                    selectedTime={resTime}
                    selectedZone={resZone}
                    onSelectDate={(isoDate) => setResDate(isoDate)}
                    onSelectTime={(slotTime) => setResTime(slotTime)}
                    onSelectZone={(zone) => setResZone(zone)}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#231F1D] mb-1">
                        Guest Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={resName}
                        onChange={(e) => setResName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E3E7E1] rounded-lg focus:outline-none focus:border-[#5E7159]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#231F1D] mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={resPhone}
                        onChange={(e) => setResPhone(e.target.value)}
                        placeholder="+971 58 283 5070"
                        className="w-full px-3 py-2 text-xs font-mono-tabular bg-[#FAF8F5] border border-[#E3E7E1] rounded-lg focus:outline-none focus:border-[#5E7159]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#231F1D] mb-1">
                        Party Size
                      </label>
                      <select
                        value={resGuests}
                        onChange={(e) => setResGuests(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E3E7E1] rounded-lg focus:outline-none focus:border-[#5E7159]"
                      >
                        {[
                          '1 Guest (Solo / Laptop)',
                          '2 Guests',
                          '3–4 Guests',
                          '5–6 Guests (Family)',
                          '7+ Group Table',
                        ].map((g) => (
                          <option key={g} value={g}>
                            {g}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Summary of Selected Calendar Date, Time & Terrace Zone */}
                  <div className="px-3.5 py-2.5 rounded-lg bg-[#EFF2EE] border border-[#E3E7E1] flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="text-[#5C645A]">
                      Selected Slot:{' '}
                      <strong className="font-mono-tabular text-[#231F1D]">
                        {resDate} · {resTime}
                      </strong>
                    </span>
                    <span className="font-medium text-[#5E7159]">{resZone}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      id="high-chair-check"
                      type="checkbox"
                      checked={resHighChair}
                      onChange={(e) => setResHighChair(e.target.checked)}
                      className="rounded border-[#E3E7E1] text-[#5E7159] focus:ring-[#5E7159]"
                    />
                    <label htmlFor="high-chair-check" className="text-xs text-[#5C645A]">
                      Include Children’s High Chair & Kids’ Menu at table
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-5 text-xs font-semibold text-white bg-[#5E7159] hover:bg-[#4D5E49] rounded-lg transition-colors cursor-pointer"
                  >
                    Confirm Table Reservation for {resDate} at {resTime}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Right: The Arc Tower 5th Floor Location Map & Directions Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.56, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 bg-white border border-[#E3E7E1] rounded-xl overflow-hidden flex flex-col justify-between"
            >
              {/* Interactive Architectural Map Diagram of The Arc Tower / Gate District with Poolside Ripples */}
              <div className="relative h-64 bg-[#EFF2EE] border-b border-[#E3E7E1] overflow-hidden">
                <svg viewBox="0 0 600 280" className="w-full h-full">
                  <rect width="600" height="280" fill="#E8EFE6" />
                  {/* Arabian Gulf Canal Water with Animated Caustic Waves */}
                  <path d="M0 0 L600 0 L600 60 Q300 84 0 50 Z" fill="#6EC3D0" fillOpacity="0.65" />
                  <path
                    d="M-30 22 Q90 10 210 24 T450 20 T630 26"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    strokeOpacity="0.55"
                    className="animate-water-caustic"
                  />
                  <path
                    d="M-20 40 Q120 52 260 36 T520 44 T640 38"
                    fill="none"
                    stroke="#E0F7FA"
                    strokeWidth="1.5"
                    strokeOpacity="0.6"
                    className="animate-water-caustic"
                  />
                  {/* Al Reem Island Road Grid */}
                  <path
                    d="M0 150 L600 130 M180 0 L210 280 M420 0 L390 280"
                    stroke="#FFFFFF"
                    strokeWidth="10"
                  />
                  <path
                    d="M0 150 L600 130 M180 0 L210 280 M420 0 L390 280"
                    stroke="#D5DDD3"
                    strokeWidth="2"
                    strokeDasharray="6 6"
                  />
                  {/* The Gate Towers & The Arc Tower Podium footprint */}
                  <rect
                    x="220"
                    y="80"
                    width="165"
                    height="112"
                    rx="18"
                    fill="#FAF8F5"
                    stroke="#5E7159"
                    strokeWidth="2.5"
                  />
                  {/* 5th Floor Turquoise Pool Deck on Podium */}
                  <rect
                    x="236"
                    y="156"
                    width="132"
                    height="24"
                    rx="8"
                    fill="#48B5C4"
                    fillOpacity="0.75"
                  />
                  <path
                    d="M244 168 Q275 162 302 168 T360 168"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                    strokeOpacity="0.75"
                    className="animate-water-caustic"
                  />
                  <circle cx="302" cy="126" r="22" fill="#5E7159" fillOpacity="0.18" />
                  <circle cx="302" cy="126" r="7" fill="#5E7159" />
                  <text
                    x="302"
                    y="102"
                    textAnchor="middle"
                    className="text-[11px] font-semibold fill-[#231F1D]"
                  >
                    Garden House Cafe (5th Floor)
                  </text>
                  <text
                    x="302"
                    y="148"
                    textAnchor="middle"
                    className="text-[9.5px] fill-[#5C645A]"
                  >
                    The Arc Tower · Poolside Terrace
                  </text>
                </svg>

                {/* Interactive Water Ripple Overlay across the Map */}
                <PoolsideWaterRippleOverlay heightClass="h-full" />

                <div className="absolute bottom-3 right-3 z-10">
                  <a
                    href={VENUE_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#231F1D] hover:bg-[#5E7159] rounded-lg shadow-md transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    Open in Google Maps
                  </a>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-2xl font-display font-semibold text-[#231F1D]">
                    How to Find Us at The Arc Tower
                  </h3>
                  <p className="text-xs text-[#5C645A] leading-relaxed">
                    <strong>Address:</strong> {VENUE_INFO.address}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                    <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#E3E7E1]">
                      <p className="font-semibold text-[#231F1D]">Elevator & Podium Access</p>
                      <p className="text-[#5C645A] mt-0.5">
                        Take The Arc Tower - A lift to the 5th Floor amenities & pool deck level.
                        Wheelchair-accessible entrance throughout.
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#E3E7E1]">
                      <p className="font-semibold text-[#231F1D]">Free Parking & Contact</p>
                      <p className="text-[#5C645A] mt-0.5">
                        Free parking lot & wheelchair-accessible car park available. Call{' '}
                        <span className="font-mono-tabular text-[#231F1D]">
                          {VENUE_INFO.phoneDisplay}
                        </span>{' '}
                        for delivery or access assistance.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E3E7E1] flex flex-wrap items-center justify-between gap-3">
                  <a
                    href={VENUE_INFO.phoneHref}
                    className="inline-flex items-center gap-1.5 text-xs font-mono-tabular font-semibold text-[#5E7159] hover:underline"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Call {VENUE_INFO.phoneDisplay}
                  </a>
                  <a
                    href={VENUE_INFO.whatsappCatalogUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5E7159] hover:underline"
                  >
                    <span>WhatsApp Menu Catalog</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Al Reem Island & Abu Dhabi Neighborhood Cafe Comparison Directory */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white border border-[#E3E7E1] rounded-xl p-6 sm:p-8 space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E3E7E1] pb-4">
              <div>
                <p className="text-xs text-[#5E7159] font-medium">
                  Local Abu Dhabi Specialty Coffee Landscape
                </p>
                <h3 className="text-2xl font-display font-semibold text-[#231F1D]">
                  How Garden House Cafe (4.9★ · AED 1–50) Compares Across Abu Dhabi
                </h3>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {(['All', 'Cafes', 'Coffee shops', 'Coffee and dessert'] as const).map((grp) => (
                  <button
                    key={grp}
                    onClick={() => setNearbyGroupFilter(grp)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      nearbyGroupFilter === grp
                        ? 'bg-[#5E7159] text-white'
                        : 'bg-[#FAF8F5] text-[#5C645A] hover:text-[#231F1D] border border-[#E3E7E1]'
                    }`}
                  >
                    {grp}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Highlighted Garden House Benchmark Card */}
              <div className="p-4 rounded-lg bg-[#EFF2EE] border border-[#5E7159] flex flex-col justify-between space-y-2">
                <div className="flex items-center justify-between text-xs text-[#5E7159] font-semibold">
                  <span>Our Sanctuary · Al Reem Island</span>
                  <span className="font-mono-tabular">4.9 ★ (541)</span>
                </div>
                <h4 className="text-base font-semibold text-[#231F1D]">Garden House Cafe</h4>
                <p className="text-xs text-[#5C645A]">
                  AED 1–50 · Open · Cafe · The Arc Tower 5th Floor
                </p>
              </div>

              {filteredNearbyCafes.map((place) => (
                <div
                  key={place.name}
                  className="p-4 rounded-lg bg-[#FAF8F5] border border-[#E3E7E1] flex flex-col justify-between space-y-2"
                >
                  <div className="flex items-center justify-between text-xs text-[#5C645A]">
                    <span>{place.group}</span>
                    <span className="font-mono-tabular font-medium text-[#231F1D]">
                      {place.rating} ★ ({place.reviewsCount})
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-[#231F1D]">{place.name}</h4>
                  <p className="text-xs text-[#5C645A]">
                    {place.priceRange} · Open · {place.type} · {place.location}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
        </>
        )}

      </main>

      {/* Quiet Editorial Footer */}
      <footer className="bg-white border-t border-[#E3E7E1] py-10 sm:py-12 pb-24 md:pb-12 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <img
              src={VENUE_INFO.logoPath}
              alt="Garden House Cafe"
              referrerPolicy="no-referrer"
              className="w-14 h-14 rounded-xl object-contain border border-[#E3E7E1] bg-white p-1"
            />
            <div>
              <h3 className="text-xl font-display font-semibold text-[#231F1D]">
                Garden House Cafe — Speciality Coffee
              </h3>
              <p className="text-xs text-[#5C645A] mt-0.5">{VENUE_INFO.address}</p>
              <p className="text-xs text-[#5E7159] font-mono-tabular mt-0.5">
                Open Daily 7:00 AM – 10:00 PM · {VENUE_INFO.phoneDisplay}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-[#5C645A]">
            <button
              type="button"
              onClick={() => navigateToLandingSection()}
              className="hover:text-[#231F1D] transition-colors cursor-pointer"
            >
              Landing Page
            </button>
            <button
              type="button"
              onClick={() => openFullMenuPage('All Menu')}
              className="hover:text-[#231F1D] font-semibold text-[#5E7159] transition-colors cursor-pointer"
            >
              Full Menu Page ({MENU_ITEMS.length} Items)
            </button>
            <button
              type="button"
              onClick={() => setActiveMenuBoardIdx(0)}
              className="hover:text-[#231F1D] transition-colors cursor-pointer"
            >
              Menu Photos (1–3)
            </button>
            <button
              type="button"
              onClick={() => navigateToLandingSection('about-amenities')}
              className="hover:text-[#231F1D] transition-colors cursor-pointer"
            >
              A–Z Amenities
            </button>
            <a
              href={VENUE_INFO.whatsappCatalogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#231F1D] transition-colors"
            >
              WhatsApp Catalog
            </a>
            <a
              href={VENUE_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#231F1D] transition-colors"
            >
              Google Maps
            </a>
          </div>
        </div>
      </footer>

      {/* Modals & Slide-Over Drawers */}
      <MenuBoardModal
        boardIndex={activeMenuBoardIdx}
        onClose={() => setActiveMenuBoardIdx(null)}
        onSelectIndex={(idx) => setActiveMenuBoardIdx(idx)}
      />

      <GalleryLightbox
        items={GALLERY_MEDIA}
        activeIndex={activeGalleryIdx}
        onClose={() => setActiveGalleryIdx(null)}
        onSelectIndex={(idx) => setActiveGalleryIdx(idx)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
