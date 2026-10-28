import React from 'react';
import { MenuItem, GalleryMediaItem } from '../data/cafeData';

interface MenuArtworkProps {
  type: MenuItem['artworkType'];
  name: string;
  className?: string;
}

export const MenuArtwork: React.FC<MenuArtworkProps> = ({ type, name, className = '' }) => {
  const renderIllustration = () => {
    switch (type) {
      case 'espresso':
      case 'iced-latte':
        return (
          <svg viewBox="0 0 240 180" className="w-full h-full" aria-label={name}>
            <defs>
              <linearGradient id="bg-coffee" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F4F1EA" />
                <stop offset="100%" stopColor="#E6ECE4" />
              </linearGradient>
              <linearGradient id="coffee-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#DFCCB7" />
                <stop offset="35%" stopColor="#9C714F" />
                <stop offset="100%" stopColor="#3B281E" />
              </linearGradient>
            </defs>
            <rect width="240" height="180" fill="url(#bg-coffee)" />
            {/* Sunlit window shadow motif echoing the Garden House logo */}
            <path d="M0 0 L110 0 L80 180 L0 180 Z" fill="#FFFFFF" fillOpacity="0.45" />
            <line x1="48" y1="0" x2="32" y2="180" stroke="#748470" strokeOpacity="0.18" strokeWidth="2" />
            <line x1="0" y1="78" x2="98" y2="68" stroke="#748470" strokeOpacity="0.18" strokeWidth="2" />
            {/* Botanical leaf sprig */}
            <path d="M36 125 C28 108, 34 90, 46 80 C44 98, 42 112, 36 125 Z" fill="#6E806A" fillOpacity="0.65" />
            <path d="M37 124 C48 112, 58 106, 66 108 C56 118, 46 122, 37 124 Z" fill="#748470" fillOpacity="0.5" />
            {/* Saucer */}
            <ellipse cx="132" cy="148" rx="48" ry="9" fill="#5E7159" fillOpacity="0.22" />
            {/* Tall Glass */}
            <path d="M100 44 L164 44 L156 144 C155 148 150 151 144 151 L120 151 C114 151 109 148 108 144 Z" fill="url(#coffee-grad)" stroke="#FFFFFF" strokeWidth="3" />
            {/* Creamy Foam Top */}
            <ellipse cx="132" cy="45" rx="32" ry="7" fill="#FAF7F2" stroke="#E5DEC9" strokeWidth="1.5" />
            {/* Ice Cubes */}
            <rect x="112" y="58" width="16" height="15" rx="3" transform="rotate(-8 112 58)" fill="#FFFFFF" fillOpacity="0.55" />
            <rect x="134" y="64" width="15" height="15" rx="3" transform="rotate(12 134 64)" fill="#FFFFFF" fillOpacity="0.5" />
            <rect x="120" y="80" width="16" height="14" rx="3" transform="rotate(5 120 80)" fill="#FFFFFF" fillOpacity="0.35" />
            {/* Glass Straw */}
            <path d="M142 140 L158 22" stroke="#231F1D" strokeWidth="3.5" strokeLinecap="round" strokeOpacity="0.7" />
          </svg>
        );

      case 'orange-espresso':
        return (
          <svg viewBox="0 0 240 180" className="w-full h-full" aria-label={name}>
            <defs>
              <linearGradient id="orange-esp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B261D" />
                <stop offset="42%" stopColor="#7A4424" />
                <stop offset="55%" stopColor="#E07B27" />
                <stop offset="100%" stopColor="#F5A623" />
              </linearGradient>
            </defs>
            <rect width="240" height="180" fill="#F7F3EB" />
            <circle cx="185" cy="42" r="46" fill="#F5A623" fillOpacity="0.1" />
            <ellipse cx="128" cy="148" rx="46" ry="9" fill="#748470" fillOpacity="0.22" />
            {/* Citrus wheel garnish */}
            <circle cx="158" cy="50" r="18" fill="#F28C28" stroke="#FFF8ED" strokeWidth="2.5" />
            <circle cx="158" cy="50" r="13" fill="#F9B248" />
            {/* Layered Glass */}
            <path d="M96 46 L160 46 L152 144 C151 148 146 151 140 151 L116 151 C110 151 105 148 104 144 Z" fill="url(#orange-esp)" stroke="#FFFFFF" strokeWidth="3" />
            <rect x="110" y="62" width="15" height="15" rx="3" transform="rotate(-10 110 62)" fill="#FFFFFF" fillOpacity="0.5" />
            <rect x="130" y="72" width="15" height="14" rx="3" transform="rotate(14 130 72)" fill="#FFFFFF" fillOpacity="0.45" />
            {/* Rosemary / Mint sprig */}
            <path d="M114 46 C108 32, 102 24, 96 20" stroke="#5E7159" strokeWidth="2.5" strokeLinecap="round" />
            <ellipse cx="105" cy="30" rx="6" ry="3" transform="rotate(-25 105 30)" fill="#5E7159" />
          </svg>
        );

      case 'matcha':
        return (
          <svg viewBox="0 0 240 180" className="w-full h-full" aria-label={name}>
            <defs>
              <linearGradient id="matcha-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FAF8F4" />
                <stop offset="32%" stopColor="#9AB589" />
                <stop offset="100%" stopColor="#58754A" />
              </linearGradient>
            </defs>
            <rect width="240" height="180" fill="#EFF3ED" />
            <path d="M0 0 L95 0 L68 180 L0 180 Z" fill="#FFFFFF" fillOpacity="0.5" />
            <ellipse cx="128" cy="148" rx="48" ry="9" fill="#5E7159" fillOpacity="0.22" />
            <path d="M96 44 L160 44 L152 144 C151 148 146 151 140 151 L116 151 C110 151 105 148 104 144 Z" fill="url(#matcha-grad)" stroke="#FFFFFF" strokeWidth="3" />
            <ellipse cx="128" cy="45" rx="32" ry="6.5" fill="#F9F7F1" />
            {/* Pistachio/Matcha dust on foam */}
            <circle cx="122" cy="44" r="2" fill="#58754A" />
            <circle cx="130" cy="46" r="1.5" fill="#58754A" />
            <circle cx="135" cy="43" r="2" fill="#6E806A" />
            <rect x="110" y="60" width="16" height="15" rx="3" transform="rotate(-8 110 60)" fill="#FFFFFF" fillOpacity="0.55" />
            <rect x="132" y="70" width="15" height="15" rx="3" transform="rotate(11 132 70)" fill="#FFFFFF" fillOpacity="0.5" />
          </svg>
        );

      case 'pistachio-croissant':
      case 'croissant':
        return (
          <svg viewBox="0 0 240 180" className="w-full h-full" aria-label={name}>
            <rect width="240" height="180" fill="#F6F2EB" />
            {/* Ceramic Plate */}
            <ellipse cx="120" cy="118" rx="78" ry="34" fill="#FFFFFF" stroke="#E2DDD3" strokeWidth="2" />
            <ellipse cx="120" cy="118" rx="60" ry="24" fill="#FAF8F5" stroke="#EFECE6" strokeWidth="1" />
            {/* Golden Flaky Croissant Body */}
            <path d="M62 115 C54 92, 74 72, 120 72 C166 72, 186 92, 178 115 C172 128, 154 128, 146 116 C136 106, 104 106, 94 116 C86 128, 68 128, 62 115 Z" fill="#D69548" stroke="#9E6220" strokeWidth="2" />
            <path d="M84 106 C86 80, 154 80, 156 106 C142 116, 98 116, 84 106 Z" fill="#E3A857" stroke="#A66B26" strokeWidth="1.8" />
            <path d="M98 98 C102 78, 138 78, 142 98 C130 108, 110 108, 98 98 Z" fill="#ECBA6B" stroke="#A66B26" strokeWidth="1.5" />
            {/* Pistachio & Nutella Drizzle if pistachio */}
            {type === 'pistachio-croissant' ? (
              <>
                <path d="M82 94 Q95 76 106 98 T130 96 T154 95" fill="none" stroke="#7A9A65" strokeWidth="5" strokeLinecap="round" />
                <path d="M90 98 Q105 82 118 102 T144 96" fill="none" stroke="#42291B" strokeWidth="3.5" strokeLinecap="round" />
                <circle cx="105" cy="88" r="2.5" fill="#8FB377" />
                <circle cx="122" cy="86" r="2" fill="#8FB377" />
                <circle cx="136" cy="90" r="2.5" fill="#8FB377" />
              </>
            ) : (
              <path d="M90 92 Q120 82 150 92" fill="none" stroke="#FFFDF9" strokeWidth="2" strokeDasharray="3 4" />
            )}
          </svg>
        );

      case 'toast-avocado':
      case 'toast-egg':
        return (
          <svg viewBox="0 0 240 180" className="w-full h-full" aria-label={name}>
            <rect width="240" height="180" fill="#F1F4EF" />
            <ellipse cx="120" cy="108" rx="76" ry="44" fill="#FFFFFF" stroke="#DFE5DC" strokeWidth="2" />
            {/* Sourdough Slice */}
            <path d="M74 96 C70 76, 94 68, 120 70 C146 68, 170 76, 166 96 L160 124 C158 132, 82 132, 80 124 Z" fill="#C89658" stroke="#8C5E2A" strokeWidth="2.5" />
            <path d="M80 96 C77 80, 98 74, 120 76 C142 74, 163 80, 160 96 L155 120 C153 126, 87 126, 85 120 Z" fill={type === 'toast-avocado' ? '#88A870' : '#F4E8C1'} />
            {/* Poached Egg */}
            <ellipse cx="106" cy="98" rx="20" ry="15" fill="#FFFFFF" stroke="#E8E2D5" strokeWidth="1.5" />
            <circle cx="106" cy="97" r="9" fill="#F29F24" />
            <ellipse cx="136" cy="102" rx="19" ry="14" fill="#FFFFFF" stroke="#E8E2D5" strokeWidth="1.5" />
            <circle cx="136" cy="101" r="8.5" fill="#F29F24" />
            {/* Microgreens & Cherry Tomatoes */}
            <circle cx="92" cy="112" r="4" fill="#C94A38" />
            <circle cx="148" cy="88" r="4" fill="#C94A38" />
            <path d="M118 86 Q124 78 130 86" stroke="#4D6B43" strokeWidth="2" fill="none" />
          </svg>
        );

      case 'french-toast':
      case 'pancake':
      case 'crepe':
        return (
          <svg viewBox="0 0 240 180" className="w-full h-full" aria-label={name}>
            <rect width="240" height="180" fill="#F8F3EC" />
            <ellipse cx="120" cy="122" rx="78" ry="34" fill="#FFFFFF" stroke="#E6DFD3" strokeWidth="2" />
            {/* Golden Stack */}
            <ellipse cx="120" cy="114" rx="48" ry="16" fill="#D48D3B" stroke="#9B5F1B" strokeWidth="2" />
            <ellipse cx="120" cy="102" rx="46" ry="15" fill="#DE9B48" stroke="#9B5F1B" strokeWidth="2" />
            <ellipse cx="120" cy="90" rx="44" ry="15" fill="#E8AC5A" stroke="#9B5F1B" strokeWidth="2" />
            {/* Maple / Chocolate Drizzle */}
            <path d="M90 88 Q106 105 112 118 Q120 96 128 115 Q138 94 148 104" fill="none" stroke="#522D18" strokeWidth="4" strokeLinecap="round" />
            {/* Whipped Cream & Berry */}
            <circle cx="120" cy="84" r="11" fill="#FFFDF9" stroke="#EAE3D5" strokeWidth="1.5" />
            <circle cx="116" cy="80" r="6" fill="#C83E3B" />
            <circle cx="126" cy="82" r="5" fill="#4A5D4E" />
          </svg>
        );

      case 'mojito-lavender':
      case 'mojito-berry':
      case 'iced-tea':
        return (
          <svg viewBox="0 0 240 180" className="w-full h-full" aria-label={name}>
            <defs>
              <linearGradient id="refresh-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={type === 'mojito-lavender' ? '#E4DCF2' : type === 'mojito-berry' ? '#FADADD' : '#FCE6C9'} />
                <stop offset="100%" stopColor={type === 'mojito-lavender' ? '#9B82C4' : type === 'mojito-berry' ? '#D44A64' : '#E08238'} />
              </linearGradient>
            </defs>
            <rect width="240" height="180" fill="#F2F5F0" />
            <ellipse cx="126" cy="148" rx="44" ry="8" fill="#5E7159" fillOpacity="0.2" />
            <path d="M98 42 L154 42 L148 144 C147 148 143 151 138 151 L114 151 C109 151 105 148 104 144 Z" fill="url(#refresh-grad)" stroke="#FFFFFF" strokeWidth="3" />
            {/* Mint leaves & Lime wheel */}
            <circle cx="116" cy="68" r="11" fill="#8FB868" fillOpacity="0.85" stroke="#FFFFFF" strokeWidth="1.5" />
            <path d="M132 42 C136 28, 148 24, 154 28 C148 38, 140 42, 132 42 Z" fill="#5E7159" />
            <path d="M124 42 C118 30, 108 26, 104 32 C110 40, 118 42, 124 42 Z" fill="#748470" />
            {/* Effervescent bubbles */}
            <circle cx="122" cy="118" r="2.5" fill="#FFFFFF" fillOpacity="0.8" />
            <circle cx="134" cy="102" r="2" fill="#FFFFFF" fillOpacity="0.8" />
            <circle cx="118" cy="90" r="3" fill="#FFFFFF" fillOpacity="0.7" />
            <circle cx="136" cy="78" r="2.5" fill="#FFFFFF" fillOpacity="0.8" />
          </svg>
        );

      case 'hot-tea':
        return (
          <svg viewBox="0 0 240 180" className="w-full h-full" aria-label={name}>
            <rect width="240" height="180" fill="#EFF2EE" />
            {/* Minimalist Logo Echo: Teacup & Saucer */}
            <ellipse cx="126" cy="136" rx="54" ry="12" fill="#748470" fillOpacity="0.35" />
            <path d="M84 86 L168 86 C168 122 150 136 126 136 C102 136 84 122 84 86 Z" fill="#FFFFFF" stroke="#5E7159" strokeWidth="2.5" />
            <path d="M84 96 C66 96, 66 120, 88 122" fill="none" stroke="#5E7159" strokeWidth="5" strokeLinecap="round" />
            <ellipse cx="126" cy="86" rx="42" ry="9" fill="#C87A3E" stroke="#FFFFFF" strokeWidth="2" />
            {/* Aromatic Steam */}
            <path d="M114 68 Q108 54 116 42" fill="none" stroke="#748470" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6" />
            <path d="M134 64 Q140 50 132 38" fill="none" stroke="#748470" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6" />
          </svg>
        );

      default:
        // Savory Plates, Sandwiches, Pasta, Salad, Muffins, Truffles
        return (
          <svg viewBox="0 0 240 180" className="w-full h-full" aria-label={name}>
            <rect width="240" height="180" fill="#F4F2EC" />
            <ellipse cx="120" cy="108" rx="76" ry="42" fill="#FFFFFF" stroke="#DEDAD0" strokeWidth="2" />
            <ellipse cx="120" cy="108" rx="58" ry="30" fill="#FAF8F5" stroke="#EAE6DF" strokeWidth="1.5" />
            {type === 'salad' ? (
              <>
                <circle cx="105" cy="102" r="16" fill="#6E8B5E" />
                <circle cx="132" cy="106" r="18" fill="#84A372" />
                <circle cx="118" cy="94" r="15" fill="#5E7159" />
                <circle cx="108" cy="110" r="5" fill="#D1493B" />
                <circle cx="135" cy="98" r="5" fill="#D1493B" />
                <rect x="115" y="102" width="10" height="8" rx="2" fill="#E3B261" />
              </>
            ) : type === 'muffin' || type === 'truffle' ? (
              <>
                <circle cx="104" cy="104" r="16" fill="#4B2E1E" stroke="#2E1B10" strokeWidth="1.5" />
                <circle cx="136" cy="108" r="16" fill="#5C3A28" stroke="#2E1B10" strokeWidth="1.5" />
                <circle cx="120" cy="92" r="17" fill="#3D2315" stroke="#2E1B10" strokeWidth="1.5" />
                <path d="M108 90 Q120 82 132 90" fill="none" stroke="#FAF8F5" strokeWidth="2" />
              </>
            ) : (
              <>
                <path d="M84 106 Q120 76 156 106 Q120 128 84 106 Z" fill="#DDA15E" stroke="#9C6628" strokeWidth="2" />
                <path d="M92 104 Q120 88 148 104" fill="none" stroke="#6E806A" strokeWidth="4" strokeLinecap="round" />
                <circle cx="120" cy="98" r="6" fill="#C94A38" />
              </>
            )}
          </svg>
        );
    }
  };

  const isWarmAromaticItem =
    type === 'espresso' ||
    type === 'hot-tea' ||
    type === 'pistachio-croissant' ||
    type === 'croissant' ||
    type === 'toast-avocado' ||
    type === 'toast-egg' ||
    type === 'french-toast' ||
    type === 'pancake' ||
    type === 'crepe' ||
    type === 'savory';

  return (
    <div className={`relative overflow-hidden bg-[#EFF2EE] select-none ${className}`}>
      {renderIllustration()}

      {/* Floating Rising Aroma Steam Waves for Warm Coffee, Bakery & Brunch Items */}
      {isWarmAromaticItem && (
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity duration-300"
          aria-hidden="true"
        >
          <svg viewBox="0 0 240 180" className="w-full h-full overflow-visible">
            <g className="animate-steam-1">
              <path
                d="M104 72 C98 56, 112 44, 104 26"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="3"
                strokeLinecap="round"
                strokeOpacity="0.85"
              />
              <path
                d="M104 72 C98 56, 112 44, 104 26"
                fill="none"
                stroke="#748470"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeOpacity="0.45"
              />
            </g>
            <g className="animate-steam-2">
              <path
                d="M124 66 C130 50, 116 38, 125 18"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeOpacity="0.9"
              />
              <path
                d="M124 66 C130 50, 116 38, 125 18"
                fill="none"
                stroke="#5E7159"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeOpacity="0.45"
              />
            </g>
            <g className="animate-steam-3">
              <path
                d="M142 74 C136 58, 148 46, 140 28"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeOpacity="0.8"
              />
              <path
                d="M142 74 C136 58, 148 46, 140 28"
                fill="none"
                stroke="#B87D4B"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeOpacity="0.4"
              />
            </g>
          </svg>
        </div>
      )}
    </div>
  );
};

interface RipplePoint {
  id: number;
  xPercent: number;
  yPercent: number;
}

export const PoolsideWaterRippleOverlay: React.FC<{
  heightClass?: string;
}> = ({ heightClass = 'h-[34%]' }) => {
  const [ripples, setRipples] = React.useState<RipplePoint[]>([]);

  const triggerWaterRipple = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
    const id = Date.now() + Math.random();

    setRipples((prev) => [...prev.slice(-4), { id, xPercent, yPercent }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 1600);
  };

  return (
    <div
      onMouseMove={(e) => {
        if (Math.random() < 0.14) triggerWaterRipple(e);
      }}
      onClick={triggerWaterRipple}
      className={`absolute bottom-0 left-0 right-0 ${heightClass} overflow-hidden cursor-pointer select-none`}
      title="Interactive Poolside Water — Hover or tap to create ripples"
    >
      {/* Continuous Turquoise Caustic Shimmer Waves */}
      <svg
        viewBox="0 0 600 140"
        preserveAspectRatio="none"
        className="w-full h-full pointer-events-none"
      >
        <defs>
          <linearGradient id="pool-caustic-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#A6ECEF" stopOpacity="0" />
            <stop offset="30%" stopColor="#D8F9FA" stopOpacity="0.55" />
            <stop offset="70%" stopColor="#8DE0E6" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#A6ECEF" stopOpacity="0" />
          </linearGradient>
        </defs>

        <g className="animate-water-caustic">
          <path
            d="M -40 38 Q 95 22, 230 38 T 500 35 T 660 40"
            fill="none"
            stroke="url(#pool-caustic-grad)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M -20 74 Q 140 58, 290 76 T 590 70"
            fill="none"
            stroke="url(#pool-caustic-grad)"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
        </g>

        <g className="animate-water-caustic-delayed">
          <path
            d="M -30 56 Q 120 72, 260 54 T 550 58 T 650 52"
            fill="none"
            stroke="url(#pool-caustic-grad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M 10 105 Q 180 88, 350 106 T 620 98"
            fill="none"
            stroke="url(#pool-caustic-grad)"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
        </g>

        {/* Ambient Autonomous Pool Ripples */}
        <ellipse
          cx="165"
          cy="68"
          rx="28"
          ry="9"
          fill="none"
          stroke="#E4FCFD"
          strokeWidth="1.5"
          strokeOpacity="0.6"
          className="animate-pool-ripple"
          style={{ transformOrigin: '165px 68px' }}
        />
        <ellipse
          cx="420"
          cy="86"
          rx="34"
          ry="10"
          fill="none"
          stroke="#E4FCFD"
          strokeWidth="1.5"
          strokeOpacity="0.55"
          className="animate-pool-ripple"
          style={{ transformOrigin: '420px 86px', animationDelay: '1.3s' }}
        />
      </svg>

      {/* Interactive User Cursor / Tap Water Ripples */}
      {ripples.map((r) => (
        <span
          key={r.id}
          style={{
            left: `${r.xPercent}%`,
            top: `${r.yPercent}%`,
          }}
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-16 h-6 rounded-full border-2 border-white/80 animate-pool-ripple"
        />
      ))}
    </div>
  );
};

interface GalleryVisualProps {
  theme: GalleryMediaItem['visualTheme'];
  imageUrl?: string;
  className?: string;
}

export const GalleryVisual: React.FC<GalleryVisualProps> = ({
  theme,
  imageUrl,
  className = '',
}) => {
  if (imageUrl || theme === 'poolside-oasis') {
    const src = imageUrl || '/assets/aistudio/img_e4630e8e.jpg';
    return (
      <div className={`relative overflow-hidden bg-[#E9EDE7] ${className}`}>
        <img
          src={src}
          alt="Garden House Cafe — Speciality Coffee Poolside Storefront at The Arc Tower 5th Floor"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <PoolsideWaterRippleOverlay heightClass="h-[32%]" />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#E9EDE7] ${className}`}>


      {theme === 'latte-art' && (
        <svg viewBox="0 0 400 280" className="w-full h-full object-cover">
          <rect width="400" height="280" fill="#EFECE6" />
          <path d="M0 0 L190 0 L130 280 L0 280 Z" fill="#FAF8F5" />
          <ellipse cx="210" cy="150" rx="88" ry="88" fill="#748470" fillOpacity="0.25" />
          <circle cx="200" cy="142" r="68" fill="#FFFFFF" stroke="#DED9CE" strokeWidth="4" />
          <circle cx="200" cy="142" r="56" fill="#8C5A36" />
          {/* Rosetta Latte Art */}
          <path d="M200 104 C182 118, 182 140, 200 156 C218 140, 218 118, 200 104 Z" fill="#FAF8F5" />
          <path d="M200 122 C186 134, 186 152, 200 168 C214 152, 214 134, 200 122 Z" fill="#8C5A36" />
          <path d="M200 132 C190 142, 192 158, 200 174 C208 158, 210 142, 200 132 Z" fill="#FAF8F5" />
        </svg>
      )}

      {theme === 'evening-terrace' && (
        <svg viewBox="0 0 400 280" className="w-full h-full object-cover">
          <defs>
            <linearGradient id="dusk-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2B3530" />
              <stop offset="100%" stopColor="#4A5D52" />
            </linearGradient>
          </defs>
          <rect width="400" height="280" fill="url(#dusk-grad)" />
          {/* Twinkling bistro string lights */}
          <path d="M0 45 Q200 95 400 35" fill="none" stroke="#F4D088" strokeWidth="1.5" strokeOpacity="0.5" />
          {[50, 105, 160, 215, 270, 325, 375].map((cx, i) => (
            <g key={cx}>
              <circle cx={cx} cy={52 + (i % 2) * 10} r="10" fill="#F9E0A2" fillOpacity="0.25" />
              <circle cx={cx} cy={52 + (i % 2) * 10} r="4" fill="#FFF7DF" />
            </g>
          ))}
          {/* Illuminated Cafe Arches */}
          <rect x="65" y="110" width="110" height="140" rx="55" fill="#F9E8C9" fillOpacity="0.2" stroke="#F9E8C9" strokeWidth="2" />
          <rect x="215" y="110" width="110" height="140" rx="55" fill="#F9E8C9" fillOpacity="0.2" stroke="#F9E8C9" strokeWidth="2" />
          {/* Lavender Mojito Glasses on foreground ledge */}
          <rect x="155" y="175" width="32" height="65" rx="6" fill="#C4B2E0" fillOpacity="0.85" stroke="#FFFFFF" strokeWidth="2" />
          <rect x="205" y="182" width="32" height="58" rx="6" fill="#E8998D" fillOpacity="0.85" stroke="#FFFFFF" strokeWidth="2" />
        </svg>
      )}

      {(theme === 'interior-window' || theme === 'pistachio-pastry' || theme === 'brunch-spread') && (
        <svg viewBox="0 0 400 280" className="w-full h-full object-cover">
          <rect width="400" height="280" fill="#FAF8F5" />
          <circle cx="200" cy="140" r="108" fill="#748470" />
          {/* Window Panes echoing the exact Garden House Cafe logo */}
          <rect x="115" y="48" width="44" height="52" fill="#FFFFFF" />
          <rect x="165" y="48" width="44" height="52" fill="#FFFFFF" />
          <rect x="115" y="106" width="44" height="62" fill="#FFFFFF" />
          <rect x="165" y="106" width="44" height="62" fill="#FFFFFF" />
          {/* Botanical sprig inside window */}
          <path d="M122 165 C120 142, 128 128, 134 118 C134 136, 130 152, 122 165 Z" fill="#748470" />
          <path d="M124 164 C132 150, 142 142, 148 142 C140 154, 132 160, 124 164 Z" fill="#748470" />
          {/* Cup & Saucer */}
          <ellipse cx="242" cy="195" rx="48" ry="12" fill="#FFFFFF" />
          <path d="M204 142 L286 142 C286 180 268 196 245 196 C222 196 204 180 204 142 Z" fill="#FFFFFF" />
          <ellipse cx="245" cy="144" rx="34" ry="7" fill="#322926" />
          <path d="M204 152 C190 152, 190 174, 208 176" fill="none" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
        </svg>
      )}
    </div>
  );
};
