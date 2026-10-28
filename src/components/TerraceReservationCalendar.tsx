import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Sparkles,
  Sun,
  Users,
  Check,
} from 'lucide-react';

export interface TerraceSlotInfo {
  time: string;
  periodLabel: string;
  tablesRemaining: number;
  status: 'available' | 'limited' | 'full';
  terraceNote: string;
}

interface TerraceReservationCalendarProps {
  selectedDate: string; // YYYY-MM-DD
  selectedTime: string;
  selectedZone: string;
  onSelectDate: (isoDate: string) => void;
  onSelectTime: (timeSlot: string) => void;
  onSelectZone: (zone: string) => void;
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const BASE_TIME_SLOTS = [
  { time: '07:30 AM', periodLabel: 'Early Espresso', defaultNote: 'Calm Poolside Morning' },
  { time: '09:00 AM', periodLabel: 'Morning Bakery', defaultNote: 'Fresh Croissant Batch' },
  { time: '10:00 AM', periodLabel: 'Peak Brunch', defaultNote: 'Popular 10 AM Window' },
  { time: '11:30 AM', periodLabel: 'Late Brunch', defaultNote: 'Shaded Podium Breeze' },
  { time: '01:00 PM', periodLabel: 'Midday Lunch', defaultNote: 'Quiet Study & Lunch' },
  { time: '03:30 PM', periodLabel: 'Afternoon Coffee', defaultNote: 'Iced Latte & Mojito Hour' },
  { time: '05:30 PM', periodLabel: 'Sunset Terrace', defaultNote: 'Golden Hour by the Pool' },
  { time: '07:00 PM', periodLabel: 'Evening Lounge', defaultNote: 'Lantern-Lit 5th Floor' },
  { time: '08:30 PM', periodLabel: 'Night Sanctuary', defaultNote: 'Serene Late Dessert & Tea' },
];

function formatIsoDate(year: number, monthIndex: number, day: number): string {
  const m = String(monthIndex + 1).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  return `${year}-${m}-${d}`;
}

function parseIsoDate(iso: string): Date {
  const parts = iso.split('-').map(Number);
  if (parts.length === 3 && !Number.isNaN(parts[0])) {
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }
  return new Date();
}

// Deterministic availability generator based on date + seating zone
export function getTerraceSlotsForDate(isoDate: string, seatingZone: string): TerraceSlotInfo[] {
  const dateObj = parseIsoDate(isoDate);
  const dayOfWeek = dateObj.getDay(); // 0 Sun ... 5 Fri, 6 Sat
  const dayOfMonth = dateObj.getDate();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 5 || dayOfWeek === 6;
  const zoneBonus =
    seatingZone === 'Poolside 5th Floor Terrace'
      ? 0
      : seatingZone === 'Quiet Indoor Study Nook'
      ? 2
      : 1;

  return BASE_TIME_SLOTS.map((slot, idx) => {
    const seed = (dayOfMonth * 7 + idx * 13 + dayOfWeek * 5 + zoneBonus) % 9;
    const isPeakSlot = slot.time === '10:00 AM' || slot.time === '05:30 PM';

    let tablesRemaining = 4;
    if (isPeakSlot && isWeekend) {
      tablesRemaining = seed % 3 === 0 ? 1 : 2;
    } else if (isPeakSlot) {
      tablesRemaining = (seed % 3) + 1; // 1 to 3
    } else if (seed === 0 && isWeekend && idx === 3) {
      tablesRemaining = 0; // 1 slot full on busy weekend days for realism
    } else {
      tablesRemaining = (seed % 5) + 2; // 2 to 6 tables
    }

    const status: 'available' | 'limited' | 'full' =
      tablesRemaining === 0 ? 'full' : tablesRemaining <= 2 ? 'limited' : 'available';

    return {
      time: slot.time,
      periodLabel: slot.periodLabel,
      tablesRemaining,
      status,
      terraceNote: slot.defaultNote,
    };
  });
}

function getDayAvailabilitySummary(isoDate: string, seatingZone: string): {
  totalTablesOpen: number;
  availableSlotCount: number;
  tier: 'high' | 'moderate' | 'limited';
} {
  const slots = getTerraceSlotsForDate(isoDate, seatingZone);
  const availableSlots = slots.filter((s) => s.status !== 'full');
  const totalTablesOpen = slots.reduce((sum, s) => sum + s.tablesRemaining, 0);

  let tier: 'high' | 'moderate' | 'limited' = 'high';
  if (totalTablesOpen <= 18) tier = 'limited';
  else if (totalTablesOpen <= 24) tier = 'moderate';

  return {
    totalTablesOpen,
    availableSlotCount: availableSlots.length,
    tier,
  };
}

export const TerraceReservationCalendar: React.FC<TerraceReservationCalendarProps> = ({
  selectedDate,
  selectedTime,
  selectedZone,
  onSelectDate,
  onSelectTime,
  onSelectZone,
}) => {
  const today = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }, []);

  const todayIso = useMemo(
    () => formatIsoDate(today.getFullYear(), today.getMonth(), today.getDate()),
    [today]
  );

  const initialParsed = useMemo(() => parseIsoDate(selectedDate), [selectedDate]);
  const [viewYear, setViewYear] = useState(initialParsed.getFullYear());
  const [viewMonth, setViewMonth] = useState(initialParsed.getMonth());

  const monthTitle = useMemo(() => {
    const d = new Date(viewYear, viewMonth, 1);
    return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }, [viewYear, viewMonth]);

  const calendarCells = useMemo(() => {
    const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

    const cells: Array<{
      day: number | null;
      isoDate: string | null;
      isPast: boolean;
      isToday: boolean;
      isSelected: boolean;
      summary: ReturnType<typeof getDayAvailabilitySummary> | null;
    }> = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      cells.push({
        day: null,
        isoDate: null,
        isPast: false,
        isToday: false,
        isSelected: false,
        summary: null,
      });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const cellDate = new Date(viewYear, viewMonth, day);
      const iso = formatIsoDate(viewYear, viewMonth, day);
      const isPast = cellDate < today;
      const isToday = iso === todayIso;
      const isSelected = iso === selectedDate;
      const summary = isPast ? null : getDayAvailabilitySummary(iso, selectedZone);

      cells.push({
        day,
        isoDate: iso,
        isPast,
        isToday,
        isSelected,
        summary,
      });
    }

    return cells;
  }, [viewYear, viewMonth, today, todayIso, selectedDate, selectedZone]);

  const activeDateSlots = useMemo(
    () => getTerraceSlotsForDate(selectedDate, selectedZone),
    [selectedDate, selectedZone]
  );

  const formattedSelectedDateLabel = useMemo(() => {
    const d = parseIsoDate(selectedDate);
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }, [selectedDate]);

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleJumpToday = () => {
    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth());
    onSelectDate(todayIso);
  };

  return (
    <div className="bg-[#FAF8F5] border border-[#E3E7E1] rounded-xl p-4 sm:p-5 space-y-5">
      {/* Top Zone Selector & Calendar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E3E7E1] pb-4">
        <div className="space-y-0.5">
          <p className="text-xs font-semibold text-[#5E7159] flex items-center gap-1.5">
            <CalendarIcon className="w-3.5 h-3.5" />
            5th-Floor Poolside Terrace & Sanctuary Calendar
          </p>
          <p className="text-xs text-[#5C645A]">
            Select a date on the month grid to inspect live table availability slots
          </p>
        </div>

        {/* Seating Zone Switcher */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'Poolside 5th Floor Terrace', short: '5th-Floor Terrace' },
            { id: 'Quiet Indoor Study Nook', short: 'Indoor Study' },
            { id: 'Family & Group Table', short: 'Family Table' },
          ].map((z) => {
            const active = selectedZone === z.id;
            return (
              <button
                key={z.id}
                type="button"
                onClick={() => onSelectZone(z.id)}
                className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-[#5E7159] text-white border-[#5E7159]'
                    : 'bg-white text-[#231F1D] border-[#E3E7E1] hover:border-[#748470]'
                }`}
              >
                {z.short}
              </button>
            );
          })}
        </div>
      </div>

      {/* Month Navigation Bar */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-display font-semibold text-[#231F1D]">{monthTitle}</h3>
          <button
            type="button"
            onClick={handleJumpToday}
            className="px-2.5 py-1 text-[11px] font-medium text-[#5E7159] bg-white hover:bg-[#EFF2EE] border border-[#E3E7E1] rounded-md transition-colors cursor-pointer"
          >
            Today
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handlePrevMonth}
            aria-label="Previous month"
            className="w-8 h-8 rounded-lg bg-white hover:bg-[#EFF2EE] border border-[#E3E7E1] flex items-center justify-center text-[#231F1D] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNextMonth}
            aria-label="Next month"
            className="w-8 h-8 rounded-lg bg-white hover:bg-[#EFF2EE] border border-[#E3E7E1] flex items-center justify-center text-[#231F1D] transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Month-View Calendar Grid */}
      <div className="bg-white border border-[#E3E7E1] rounded-xl p-3 sm:p-4 space-y-2">
        {/* Weekday Column Headers */}
        <div className="grid grid-cols-7 gap-1 text-center pb-1 border-b border-[#E3E7E1]">
          {WEEKDAYS.map((dayName) => (
            <div
              key={dayName}
              className="text-[11px] font-semibold uppercase tracking-wider text-[#5C645A] py-1"
            >
              {dayName}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-1 sm:gap-1.5 pt-1">
          {calendarCells.map((cell, idx) => {
            if (!cell.day || !cell.isoDate) {
              return <div key={`empty-${idx}`} className="h-12 sm:h-14 rounded-lg" />;
            }

            const tier = cell.summary?.tier || 'high';
            const dotColor =
              tier === 'high'
                ? 'bg-[#5E7159]'
                : tier === 'moderate'
                ? 'bg-[#B87D4B]'
                : 'bg-[#A65B3E]';

            return (
              <button
                key={cell.isoDate}
                type="button"
                disabled={cell.isPast}
                onClick={() => cell.isoDate && onSelectDate(cell.isoDate)}
                className={`relative h-12 sm:h-14 rounded-lg border p-1.5 flex flex-col items-center justify-between transition-all ${
                  cell.isPast
                    ? 'bg-[#FAF8F5]/60 border-transparent text-[#5C645A]/35 cursor-not-allowed'
                    : cell.isSelected
                    ? 'bg-[#5E7159] border-[#5E7159] text-white shadow-xs cursor-pointer'
                    : cell.isToday
                    ? 'bg-[#EFF2EE] border-[#5E7159]/60 text-[#231F1D] hover:border-[#5E7159] cursor-pointer'
                    : 'bg-white border-[#E3E7E1] text-[#231F1D] hover:border-[#748470] hover:bg-[#FAF8F5] cursor-pointer'
                }`}
              >
                <span className="text-xs font-mono-tabular font-semibold leading-none">
                  {cell.day}
                </span>

                {!cell.isPast && cell.summary && (
                  <div className="flex items-center gap-1">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        cell.isSelected ? 'bg-white' : dotColor
                      }`}
                    />
                    <span
                      className={`hidden sm:inline text-[10px] font-mono-tabular leading-none ${
                        cell.isSelected ? 'text-white/90' : 'text-[#5C645A]'
                      }`}
                    >
                      {cell.summary.availableSlotCount}s
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Availability Legend */}
        <div className="pt-2 border-t border-[#E3E7E1] flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#5C645A]">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#5E7159]" />
              Open Terrace Tables
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#B87D4B]" />
              Peak Brunch Demand
            </span>
          </div>
          <span className="font-mono-tabular text-[#231F1D] font-medium">
            Selected: {formattedSelectedDateLabel}
          </span>
        </div>
      </div>

      {/* Live 5th-Floor Terrace Availability Slots for Selected Date */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#5E7159]" />
            <h4 className="text-sm font-semibold text-[#231F1D]">
              Available Time Slots · {selectedZone}
            </h4>
          </div>
          <span className="text-xs font-mono-tabular text-[#5E7159] font-medium">
            {formattedSelectedDateLabel} · Active Slot: {selectedTime}
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedDate}-${selectedZone}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-2"
          >
            {activeDateSlots.map((slot) => {
              const isSelected = selectedTime === slot.time;
              const isFull = slot.status === 'full';

              return (
                <button
                  key={slot.time}
                  type="button"
                  disabled={isFull}
                  onClick={() => onSelectTime(slot.time)}
                  className={`text-left p-2.5 rounded-lg border transition-all flex flex-col justify-between gap-1 ${
                    isFull
                      ? 'bg-[#FAF8F5] border-[#E3E7E1] opacity-45 cursor-not-allowed'
                      : isSelected
                      ? 'bg-[#5E7159] text-white border-[#5E7159] shadow-xs cursor-pointer'
                      : 'bg-white text-[#231F1D] border-[#E3E7E1] hover:border-[#5E7159] cursor-pointer'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-mono-tabular font-semibold">{slot.time}</span>
                    {isSelected ? (
                      <Check className="w-3.5 h-3.5 text-white shrink-0" />
                    ) : (
                      <span
                        className={`text-[10px] font-mono-tabular font-medium ${
                          isFull
                            ? 'text-[#5C645A]'
                            : slot.status === 'limited'
                            ? 'text-[#B87D4B]'
                            : 'text-[#5E7159]'
                        }`}
                      >
                        {isFull ? 'Booked' : `${slot.tablesRemaining} left`}
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-[11px] truncate ${
                      isSelected ? 'text-white/85' : 'text-[#5C645A]'
                    }`}
                  >
                    {slot.terraceNote}
                  </p>
                </button>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
