import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Clock, Plus, Flame, Calendar, ChevronRight } from 'lucide-react';
import { MenuItem } from '../data/cafeData';
import { MenuArtwork } from './MenuArtwork';

interface SeasonalCollection {
  seasonId: string;
  badgeText: string;
  seasonTitle: string;
  seasonSubtitle: string;
  batchWindowLabel: string;
  items: MenuItem[];
}

interface LimitedEditionBannerProps {
  onAddToCart: (item: MenuItem, e?: React.MouseEvent<HTMLButtonElement>) => void;
  onExploreFullMenu: () => void;
}

function getDynamicSeasonalCollection(now: Date): {
  collection: SeasonalCollection;
  targetEndDate: Date;
  currentDateFormatted: string;
} {
  const year = now.getFullYear();
  const month = now.getMonth(); // 0 = Jan, 9 = Oct, etc.

  // Calculate end of the current month at 22:00:00 (10:00 PM Cafe Closing)
  let targetEndDate = new Date(year, month + 1, 0, 22, 0, 0, 0);
  // If we are past 22:00 on the last day of the month, roll to a 5-day Encore Batch
  if (targetEndDate.getTime() - now.getTime() <= 3600 * 1000) {
    targetEndDate = new Date(now.getTime() + 5 * 24 * 3600 * 1000);
  }

  const monthName = now.toLocaleDateString('en-US', { month: 'long' });
  const currentDateFormatted = now.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  // Autumn (Sep, Oct, Nov)
  if (month >= 8 && month <= 10) {
    return {
      currentDateFormatted,
      targetEndDate,
      collection: {
        seasonId: 'autumn-harvest',
        badgeText: `LIMITED EDITION · ${monthName.toUpperCase()} BOTANICAL DROP`,
        seasonTitle: 'Autumn Botanical & Saffron Reserve',
        seasonSubtitle:
          'Small-batch seasonal creations crafted on our 5th-floor roastery bar with Emirati saffron, roasted Sicilian pistachio, and blood orange.',
        batchWindowLabel: `Ends ${targetEndDate.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        })} at 10:00 PM`,
        items: [
          {
            id: 'ltd-autumn-saffron-pistachio-latte',
            name: 'Saffron & Roasted Pistachio Velvet Latte',
            category: 'Limited Edition Seasonal',
            price: 34,
            description:
              'Double specialty espresso infused with warm threads of saffron, house-made Sicilian pistachio praline cream, and micro-foamed milk.',
            highlightTag: 'Autumn Micro-Lot',
            artworkType: 'iced-latte',
          },
          {
            id: 'ltd-autumn-fig-cardamom-croissant',
            name: 'Caramelized Fig, Honey & Cardamom Croissant',
            category: 'Limited Edition Seasonal',
            price: 29,
            description:
              '27-layer French butter pastry baked golden with black mission figs, whipped cardamom mascarpone, and wild Sidr honey drizzle.',
            highlightTag: 'Baked 7 AM Daily',
            artworkType: 'pistachio-croissant',
          },
          {
            id: 'ltd-autumn-blood-orange-espresso',
            name: 'Spiced Blood Orange & Rosemary Espresso Tonic',
            category: 'Limited Edition Seasonal',
            price: 31,
            description:
              'Single-origin Ethiopian espresso layered over cold-pressed blood orange juice, botanical tonic, and a smoked rosemary sprig.',
            highlightTag: 'Poolside Favorite',
            artworkType: 'orange-espresso',
          },
        ],
      },
    };
  }

  // Winter (Dec, Jan, Feb)
  if (month === 11 || month <= 1) {
    return {
      currentDateFormatted,
      targetEndDate,
      collection: {
        seasonId: 'winter-terrace',
        badgeText: `LIMITED EDITION · ${monthName.toUpperCase()} WINTER ROASTERY`,
        seasonTitle: 'Winter Terrace & Warm Spice Collection',
        seasonSubtitle:
          'Cozy poolside mornings in Al Reem Island featuring roasted chestnut brioche, Emirati date-tahini espresso, and cinnamon hibiscus.',
        batchWindowLabel: `Ends ${targetEndDate.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        })} at 10:00 PM`,
        items: [
          {
            id: 'ltd-winter-date-tahini-cortado',
            name: 'Warm Medjool Date & Tahini Velvet Cortado',
            category: 'Limited Edition Seasonal',
            price: 30,
            description:
              'Velvety double ristretto swirled with organic Medjool date reduction, artisanal sesame tahini foam, and dusted cinnamon.',
            highlightTag: 'Winter Signature',
            artworkType: 'espresso',
          },
          {
            id: 'ltd-winter-chestnut-french-toast',
            name: 'Roasted Chestnut & Praline Brioche Toast',
            category: 'Limited Edition Seasonal',
            price: 46,
            description:
              'Thick-cut caramelized brioche topped with warm chestnut vanilla bean Chantilly, toasted hazelnuts, and espresso maple glaze.',
            highlightTag: 'Chef Special',
            artworkType: 'french-toast',
          },
          {
            id: 'ltd-winter-hibiscus-cinnamon-tea',
            name: 'Artisanal Hibiscus, Clove & Orange Peel Tea',
            category: 'Limited Edition Seasonal',
            price: 27,
            description:
              'Steaming botanical infusion of crimson hibiscus petals, Ceylon cinnamon bark, star anise, and fresh citrus zest.',
            highlightTag: 'Caffeine-Free',
            artworkType: 'hot-tea',
          },
        ],
      },
    };
  }

  // Spring (Mar, Apr, May)
  if (month >= 2 && month <= 4) {
    return {
      currentDateFormatted,
      targetEndDate,
      collection: {
        seasonId: 'spring-blossom',
        badgeText: `LIMITED EDITION · ${monthName.toUpperCase()} BLOSSOM DROP`,
        seasonTitle: 'Spring Botanical & Rosewater Harvest',
        seasonSubtitle:
          'Bright floral infusions and ceremonial Uji matcha crafted to celebrate crisp spring breezes across The Arc Tower terrace.',
        batchWindowLabel: `Ends ${targetEndDate.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        })} at 10:00 PM`,
        items: [
          {
            id: 'ltd-spring-rose-pistachio-matcha',
            name: 'Damask Rose & Pistachio Ceremonial Matcha',
            category: 'Limited Edition Seasonal',
            price: 35,
            description:
              'First-harvest Uji matcha whisked over oat milk with organic Damask rosewater cold foam and crushed green pistachios.',
            highlightTag: 'Spring Exclusive',
            artworkType: 'matcha',
          },
          {
            id: 'ltd-spring-orange-blossom-croissant',
            name: 'Orange Blossom & Ricotta Brioche Croissant',
            category: 'Limited Edition Seasonal',
            price: 28,
            description:
              'Flaky golden croissant filled with whipped orange-blossom ricotta, candied citrus peel, and pistachio crumble.',
            highlightTag: 'Morning Batch',
            artworkType: 'croissant',
          },
          {
            id: 'ltd-spring-lavender-pea-mojito',
            name: 'Botanical Butterfly Pea & Lavender Fizz',
            category: 'Limited Edition Seasonal',
            price: 29,
            description:
              'Sparkling poolside refresher with French lavender, muddled garden mint, fresh lime, and color-shifting butterfly pea flower.',
            highlightTag: 'Terrace Cooler',
            artworkType: 'mojito-lavender',
          },
        ],
      },
    };
  }

  // Summer (Jun, Jul, Aug)
  return {
    currentDateFormatted,
    targetEndDate,
    collection: {
      seasonId: 'summer-oasis',
      badgeText: `LIMITED EDITION · ${monthName.toUpperCase()} POOLSIDE OASIS`,
      seasonTitle: 'Summer Oasis Cold-Brew & Citrus Series',
      seasonSubtitle:
        'Sub-zero cold-pressed espresso tonics, chilled tropical bowls, and crushed berry coolers designed for sunny Abu Dhabi afternoons.',
      batchWindowLabel: `Ends ${targetEndDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })} at 10:00 PM`,
      items: [
        {
          id: 'ltd-summer-yuzu-orange-espresso',
          name: 'Iced Yuzu & Valencia Orange Cold Brew',
          category: 'Limited Edition Seasonal',
          price: 32,
          description:
            '18-hour slow-steeped specialty cold brew layered over fresh Valencia orange juice and Japanese yuzu citrus spritz.',
          highlightTag: 'Summer Best-Seller',
          artworkType: 'orange-espresso',
        },
        {
          id: 'ltd-summer-berry-mint-cooler',
          name: 'Crushed Blackberry, Mint & Lime Poolside Mojito',
          category: 'Limited Edition Seasonal',
          price: 28,
          description:
            'Chilled muddled blackberries, organic garden mint leaves, pressed lime juice, and sparkling mountain water.',
          highlightTag: 'Poolside Refresh',
          artworkType: 'mojito-berry',
        },
        {
          id: 'ltd-summer-avocado-citrus-toast',
          name: 'Chilled Burrata, Hass Avocado & Pomegranate Toast',
          category: 'Limited Edition Seasonal',
          price: 42,
          description:
            'Artisanal sourdough topped with creamy pugliese burrata, smashed avocado, ruby pomegranate jewels, and basil oil.',
          highlightTag: 'All-Day Light Brunch',
          artworkType: 'toast-avocado',
        },
      ],
    },
  };
}

export const LimitedEditionBanner: React.FC<LimitedEditionBannerProps> = ({
  onAddToCart,
  onExploreFullMenu,
}) => {
  const [now, setNow] = useState<Date>(() => new Date());
  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  // Live 1-second tick for real-time countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const { collection, targetEndDate, currentDateFormatted } = useMemo(
    () => getDynamicSeasonalCollection(now),
    // Re-evaluate seasonal metadata if the day changes
    [now.getFullYear(), now.getMonth(), now.getDate()]
  );

  // Calculate remaining Days, Hours, Minutes, Seconds
  const diffMs = Math.max(0, targetEndDate.getTime() - now.getTime());
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
  const seconds = Math.floor((diffMs / 1000) % 60);

  const pad2 = (n: number) => String(n).padStart(2, '0');

  const activeItem = collection.items[selectedIdx] || collection.items[0];

  return (
    <section
      aria-label="Limited Edition Seasonal Menu Countdown"
      className="bg-gradient-to-r from-[#231F1D] via-[#2C352B] to-[#231F1D] text-[#FAF8F5] border-b border-[#5E7159]/40 relative overflow-hidden"
    >
      {/* Subtle Botanical Ambient Glow */}
      <div
        className="pointer-events-none absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-[#5E7159]/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 right-1/4 w-96 h-96 rounded-full bg-[#B87D4B]/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-4 sm:py-5 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-center">
          {/* Left Column (5 cols): Seasonal Drop Identity + Live Countdown Timer */}
          <div className="lg:col-span-5 space-y-2.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#B87D4B] text-white text-[10px] font-semibold tracking-wider uppercase shadow-2xs">
                <Flame className="w-3 h-3 fill-current" />
                {collection.badgeText}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono-tabular text-[#D5DDD3]">
                <Calendar className="w-3 h-3 text-[#9AB589]" />
                Live Date: {currentDateFormatted}
              </span>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-display font-semibold text-white leading-tight">
                {collection.seasonTitle}
              </h2>
              <p className="text-xs text-[#D5DDD3] leading-relaxed mt-0.5 line-clamp-2">
                {collection.seasonSubtitle}
              </p>
            </div>

            {/* Live Dynamic Countdown Tiles */}
            <div className="pt-1 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5" role="timer" aria-live="polite">
                {[
                  { label: 'DAYS', value: pad2(days) },
                  { label: 'HRS', value: pad2(hours) },
                  { label: 'MIN', value: pad2(minutes) },
                  { label: 'SEC', value: pad2(seconds) },
                ].map((unit, idx) => (
                  <React.Fragment key={unit.label}>
                    <div className="bg-[#181514]/90 border border-[#5E7159]/50 rounded-lg px-2.5 py-1.5 min-w-[52px] text-center shadow-inner">
                      <p className="text-base sm:text-lg font-mono-tabular font-semibold text-[#FAF8F5] leading-none">
                        {unit.value}
                      </p>
                      <p className="text-[9px] font-mono-tabular tracking-widest text-[#9AB589] mt-1">
                        {unit.label}
                      </p>
                    </div>
                    {idx < 3 && (
                      <span className="text-[#9AB589] font-mono-tabular font-bold text-sm select-none">
                        :
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <div className="text-[11px] text-[#D5DDD3] space-y-0.5">
                <p className="font-medium text-[#E8C59B] flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{collection.batchWindowLabel}</span>
                </p>
                <p className="text-[10px] text-[#9AB589]">
                  Small-batch daily roast · Limited cups per day
                </p>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Interactive Seasonal Item Selector & Instant Order Card */}
          <div className="lg:col-span-7 flex flex-col sm:flex-row items-stretch gap-3 bg-white/95 text-[#231F1D] rounded-xl p-3 sm:p-3.5 border border-[#E3E7E1] shadow-lg overflow-hidden">
            {/* Seasonal Item Selector Tabs (3 Seasonal Items) */}
            <div className="flex sm:flex-col justify-between gap-1.5 sm:w-44 shrink-0 border-b sm:border-b-0 sm:border-r border-[#E3E7E1] pb-2.5 sm:pb-0 sm:pr-3 overflow-x-auto no-scrollbar">
              <p className="hidden sm:flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-[#5E7159] px-1">
                <Sparkles className="w-3 h-3 text-[#B87D4B]" />
                <span>3 Seasonal Drops</span>
              </p>
              {collection.items.map((item, idx) => {
                const isSelected = idx === selectedIdx;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedIdx(idx)}
                    className={`flex-1 sm:flex-initial text-left px-2.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer flex items-center justify-between gap-1.5 ${
                      isSelected
                        ? 'bg-[#5E7159] text-white font-semibold shadow-2xs'
                        : 'bg-[#FAF8F5] text-[#5C645A] hover:text-[#231F1D] hover:bg-[#EFF2EE]'
                    }`}
                  >
                    <span className="truncate text-[11px]">{item.name.split(' ')[0]} {item.name.split(' ')[1]}</span>
                    <span className="font-mono-tabular text-[10px] shrink-0 opacity-90">
                      dh {item.price}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Seasonal Item Spotlight */}
            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start gap-3.5"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-[#E3E7E1] shrink-0 relative group">
                    <MenuArtwork
                      type={activeItem.artworkType}
                      name={activeItem.name}
                      showSteam={true}
                      className="w-full h-full"
                    />
                  </div>

                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-[#EFF2EE] text-[#5E7159]">
                        {activeItem.highlightTag}
                      </span>
                      <span className="text-xs font-mono-tabular font-semibold text-[#B87D4B]">
                        dh {activeItem.price.toFixed(2)}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-semibold text-[#231F1D] leading-snug truncate">
                      {activeItem.name}
                    </h3>

                    <p className="text-xs text-[#5C645A] line-clamp-2 leading-relaxed">
                      {activeItem.description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="pt-2.5 mt-2 border-t border-[#E3E7E1] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={onExploreFullMenu}
                  className="inline-flex items-center justify-center sm:justify-start gap-1 text-[11px] font-semibold text-[#5E7159] hover:text-[#231F1D] transition-colors cursor-pointer py-1 sm:py-0"
                >
                  <span>View All 54 Menu Items</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={(e) => onAddToCart(activeItem, e)}
                  className="w-full sm:w-auto px-3.5 py-2 sm:py-1.5 rounded-lg bg-[#5E7159] hover:bg-[#4D5E49] text-white text-xs font-semibold transition-colors inline-flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Limited Drop · dh {activeItem.price.toFixed(2)}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
