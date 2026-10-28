import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
} from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { MenuItem } from '../data/cafeData';
import { MenuArtwork } from './MenuArtwork';

interface MagneticMenuCardProps {
  item: MenuItem;
  index: number;
  quantityInCart: number;
  onAddToCart: (item: MenuItem, e: React.MouseEvent<HTMLButtonElement>) => void;
  onUpdateQuantity: (
    id: string,
    delta: number,
    e?: React.MouseEvent<HTMLButtonElement>,
    item?: MenuItem
  ) => void;
}

export const MagneticMenuCard: React.FC<MagneticMenuCardProps> = ({
  item,
  index,
  quantityInCart,
  onAddToCart,
  onUpdateQuantity,
}) => {
  const cardRef = useRef<HTMLElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Normalized pointer coordinates (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 260, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 260, damping: 22 });

  // 3D Tilt Angles
  const rotateX = useTransform(springY, [-0.5, 0.5], [7.5, -7.5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-7.5, 7.5]);

  // Specular highlight position
  const glareX = useTransform(springX, [-0.5, 0.5], ['15%', '85%']);
  const glareY = useTransform(springY, [-0.5, 0.5], ['15%', '85%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(normX);
    mouseY.set(normY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{
        duration: 0.45,
        delay: (index % 3) * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 950,
        transformStyle: 'preserve-3d',
      }}
      className="group relative bg-white border border-[#E3E7E1] hover:border-[#748470]/60 rounded-xl overflow-hidden flex flex-col justify-between transition-shadow duration-200 hover:shadow-xl will-change-transform"
    >
      {/* Dynamic 3D Specular Glare Overlay */}
      {isHovered && (
        <motion.div
          aria-hidden="true"
          style={{
            background: `radial-gradient(circle at ${glareX.get()} ${glareY.get()}, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0) 68%)`,
          }}
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-200"
        />
      )}

      <div>
        <div
          className="relative h-44 w-full border-b border-[#E3E7E1] overflow-hidden"
          style={{ transform: 'translateZ(14px)' }}
        >
          <MenuArtwork
            type={item.artworkType}
            name={item.name}
            className="w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="p-5 space-y-2" style={{ transform: 'translateZ(18px)' }}>
          <div className="flex items-center gap-2 text-xs text-[#5C645A]">
            <span className="uppercase tracking-wider font-medium text-[#5E7159]">
              {item.category}
            </span>
            {item.highlightTag && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-[#B87D4B] font-medium">{item.highlightTag}</span>
              </>
            )}
          </div>

          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-lg font-semibold text-[#231F1D] leading-snug">{item.name}</h3>
            <span className="text-base font-mono-tabular font-semibold text-[#231F1D] shrink-0">
              dh {item.price.toFixed(2)}
            </span>
          </div>

          <p className="text-xs text-[#5C645A] leading-relaxed">{item.description}</p>
        </div>
      </div>

      <div
        className="px-5 pb-5 pt-2 flex items-center justify-between gap-3"
        style={{ transform: 'translateZ(22px)' }}
      >
        {quantityInCart > 0 ? (
          <div className="w-full flex items-center justify-between bg-[#EFF2EE] px-3 py-1.5 rounded-lg border border-[#5E7159]/30">
            <span className="text-xs font-medium text-[#5E7159]">
              In Order Bag ({quantityInCart})
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onUpdateQuantity(item.id, -1)}
                className="w-7 h-7 rounded bg-white text-[#231F1D] flex items-center justify-center hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                aria-label={`Decrease quantity of ${item.name}`}
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-mono-tabular font-semibold w-5 text-center">
                {quantityInCart}
              </span>
              <button
                type="button"
                onClick={(e) => onUpdateQuantity(item.id, 1, e, item)}
                className="w-7 h-7 rounded bg-[#5E7159] text-white flex items-center justify-center hover:bg-[#4D5E49] transition-colors cursor-pointer"
                aria-label={`Increase quantity of ${item.name}`}
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={(e) => onAddToCart(item, e)}
            className="w-full py-2.5 px-4 text-xs font-semibold text-[#231F1D] bg-[#FAF8F5] hover:bg-[#5E7159] hover:text-white border border-[#E3E7E1] hover:border-[#5E7159] rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add to Order · dh {item.price.toFixed(2)}</span>
          </button>
        )}
      </div>
    </motion.article>
  );
};

interface AnimatedCounterProps {
  target: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  decimals = 0,
  prefix = '',
  suffix = '',
  durationMs = 1500,
  className = '',
}) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.35 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // Cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(target * eased);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(target);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, target, durationMs]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayValue.toFixed(decimals)}
      {suffix}
    </span>
  );
};
