import React from 'react';
import { X, ChevronLeft, ChevronRight, Printer, ExternalLink } from 'lucide-react';
import { PHYSICAL_MENU_BOARDS, VENUE_INFO } from '../data/cafeData';

interface MenuBoardModalProps {
  boardIndex: number | null;
  onClose: () => void;
  onSelectIndex: (idx: number) => void;
}

export const MenuBoardModal: React.FC<MenuBoardModalProps> = ({
  boardIndex,
  onClose,
  onSelectIndex,
}) => {
  if (boardIndex === null) return null;
  const board = PHYSICAL_MENU_BOARDS[boardIndex];

  const handlePrev = () => {
    onSelectIndex((boardIndex - 1 + PHYSICAL_MENU_BOARDS.length) % PHYSICAL_MENU_BOARDS.length);
  };

  const handleNext = () => {
    onSelectIndex((boardIndex + 1) % PHYSICAL_MENU_BOARDS.length);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-xs p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={board.title}
    >
      <div className="relative w-full max-w-3xl bg-[#FAF8F5] border border-[#E3E7E1] rounded-xl shadow-2xl overflow-hidden my-8">
        {/* Top Action Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#EFF2EE] border-b border-[#E3E7E1]">
          <div className="flex items-center gap-3">
            <img
              src={VENUE_INFO.logoPath}
              alt="Garden House Cafe"
              referrerPolicy="no-referrer"
              className="w-9 h-9 rounded-full object-cover border border-[#748470]/30 bg-white"
            />
            <div>
              <p className="text-xs text-[#5C645A]">
                Cafe Menu Sheet {boardIndex + 1} of {PHYSICAL_MENU_BOARDS.length} · Garden House Cafe
              </p>
              <h3 className="text-lg font-semibold text-[#231F1D]">{board.title}</h3>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#231F1D] bg-white border border-[#E3E7E1] rounded-lg hover:bg-[#FAF8F5] transition-colors whitespace-nowrap shrink-0"
            >
              <Printer className="w-3.5 h-3.5" />
              Print Sheet
            </button>
            <button
              onClick={onClose}
              className="p-2 text-[#5C645A] hover:text-[#231F1D] bg-white border border-[#E3E7E1] rounded-lg transition-colors"
              aria-label="Close Menu Photo"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Physical Menu Board Sheet Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          <div className="text-center border-b border-[#E3E7E1] pb-5">
            <p className="text-xs text-[#5E7159] tracking-wide mb-1">
              THE ARC TOWER · 5TH FLOOR · AL REEM ISLAND · ABU DHABI
            </p>
            <h2 className="text-3xl font-display font-semibold text-[#231F1D]">
              Garden House Cafe — Speciality Coffee
            </h2>
            <p className="text-sm text-[#5C645A] mt-1">{board.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {board.sections.map((sec) => (
              <div
                key={sec.heading}
                className="bg-white border border-[#E3E7E1] rounded-lg p-5 space-y-3"
              >
                <h4 className="text-xl font-display font-semibold text-[#5E7159] border-b border-[#E3E7E1] pb-2">
                  {sec.heading}
                </h4>
                <div className="divide-y divide-[#E3E7E1]/60">
                  {sec.items.map((item) => (
                    <div
                      key={item.name}
                      className="py-2.5 flex items-baseline justify-between gap-4 text-sm"
                    >
                      <span className="font-medium text-[#231F1D]">{item.name}</span>
                      <span className="font-mono-tabular font-semibold text-[#5E7159] shrink-0">
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#E3E7E1] text-xs text-[#5C645A]">
            <span>All prices in UAE Dirhams (AED / dh) · AED 1–50 per person</span>
            <a
              href={VENUE_INFO.whatsappCatalogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-[#5E7159] hover:underline"
            >
              Open WhatsApp Catalog
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Bottom Switcher */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-[#EFF2EE] border-t border-[#E3E7E1]">
          <button
            onClick={handlePrev}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#231F1D] bg-white border border-[#E3E7E1] rounded-lg hover:bg-[#FAF8F5] transition-colors whitespace-nowrap shrink-0"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous Menu Photo
          </button>

          <div className="flex items-center gap-2">
            {PHYSICAL_MENU_BOARDS.map((b, idx) => (
              <button
                key={b.id}
                onClick={() => onSelectIndex(idx)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  idx === boardIndex
                    ? 'bg-[#5E7159] text-white'
                    : 'bg-white text-[#5C645A] hover:text-[#231F1D]'
                }`}
              >
                Photo {idx + 1}
              </button>
            ))}
          </div>

          <button
            onClick={handleNext}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#231F1D] bg-white border border-[#E3E7E1] rounded-lg hover:bg-[#FAF8F5] transition-colors whitespace-nowrap shrink-0"
          >
            Next Menu Photo
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
