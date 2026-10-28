import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { GalleryMediaItem } from '../data/cafeData';
import { GalleryVisual } from './MenuArtwork';

interface GalleryLightboxProps {
  items: GalleryMediaItem[];
  activeIndex: number | null;
  onClose: () => void;
  onSelectIndex: (idx: number) => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  items,
  activeIndex,
  onClose,
  onSelectIndex,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    setIsPlaying(true);
  }, [activeIndex]);

  useEffect(() => {
    if (activeIndex === null) return;
    const current = items[activeIndex];
    if (current.type !== 'video' || !isPlaying) return;

    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 4));
    }, 300);

    return () => clearInterval(timer);
  }, [activeIndex, isPlaying, items]);

  if (activeIndex === null) return null;
  const media = items[activeIndex];

  const handlePrev = () => {
    onSelectIndex((activeIndex - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    onSelectIndex((activeIndex + 1) % items.length);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4"
      role="dialog"
      aria-modal="true"
      aria-label={media.title}
    >
      <div className="relative w-full max-w-3xl bg-[#FAF8F5] border border-[#E3E7E1] rounded-xl overflow-hidden shadow-2xl">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-[#E3E7E1]">
          <div>
            <p className="text-xs text-[#5C645A]">
              {media.contributor} · {media.source} · {media.timeAgo}
              {media.duration ? ` · Video (${media.duration})` : ' · Photo'}
            </p>
            <h3 className="text-lg font-display font-semibold text-[#231F1D]">{media.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#5C645A] hover:text-[#231F1D] rounded-lg hover:bg-[#EFF2EE] transition-colors"
            aria-label="Close Gallery Viewer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Visual Stage */}
        <div className="relative aspect-16/10 bg-[#231F1D] overflow-hidden">
          <div
            className={`w-full h-full transition-transform duration-700 ${
              media.type === 'video' && isPlaying ? 'scale-105' : 'scale-100'
            }`}
          >
            <GalleryVisual
              theme={media.visualTheme}
              imageUrl={media.imageUrl}
              className="w-full h-full"
            />
          </div>

          {/* Video playback overlay controls if video */}
          {media.type === 'video' && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex flex-col gap-2">
              <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#9AB589] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-white text-xs">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying((p) => !p)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/15 hover:bg-white/25 transition-colors"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{isPlaying ? 'Playing Clip' : 'Paused'}</span>
                  </button>
                  <span className="font-mono-tabular">
                    {media.duration} · Contributed by {media.contributor}
                  </span>
                </div>
                <button
                  onClick={() => setIsMuted((m) => !m)}
                  className="p-1.5 rounded bg-white/15 hover:bg-white/25 transition-colors"
                  aria-label="Toggle Mute"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Caption & Navigation */}
        <div className="p-6 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-sm text-[#5C645A] max-w-xl">{media.caption}</p>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handlePrev}
              className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-[#231F1D] bg-[#EFF2EE] hover:bg-[#E3E7E1] rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <ChevronLeft className="w-4 h-4" />
              Prev
            </button>
            <span className="text-xs font-mono-tabular text-[#5C645A] px-2">
              {activeIndex + 1} / {items.length}
            </span>
            <button
              onClick={handleNext}
              className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-[#231F1D] bg-[#EFF2EE] hover:bg-[#E3E7E1] rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
