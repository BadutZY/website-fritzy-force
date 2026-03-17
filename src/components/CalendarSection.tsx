import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, List, X } from "lucide-react";
import vcFebPoster from "@/assets/another/vc-feb-poster.jpg";

interface CalendarEvent {
  date: number;
  time: string;
  title: string;
  link: string;
  description?: string;
  image?: string;
}

const events: CalendarEvent[] = [
];

const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

// ─── useScrollLock hook ───────────────────────────────────────────────────────
const useScrollLock = (isLocked: boolean) => {
  const scrollYRef = useRef<number>(0);

  useEffect(() => {
    if (isLocked) {
      scrollYRef.current = window.scrollY;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      const targetScrollY = scrollYRef.current;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.paddingRight = "";
      window.scrollTo({ top: targetScrollY, behavior: "instant" as ScrollBehavior });
    }
  }, [isLocked]);
};
// ─────────────────────────────────────────────────────────────────────────────

const CalendarSection = () => {
  const [currentMonth] = useState(new Date().getMonth());
  const [currentYear] = useState(new Date().getFullYear());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [viewMode, setViewMode] = useState<"calendar" | "agenda">("calendar");

  useScrollLock(!!selectedEvent);

  const now = new Date();
  const realToday = now.getDate();
  const realMonth = now.getMonth();
  const realYear = now.getFullYear();

  const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const prevMonthDays = getDaysInMonth(currentMonth - 1, currentYear);

  const monthName = new Date(currentYear, currentMonth).toLocaleDateString("id-ID", { month: "long", year: "numeric" });

  const calendarDays: { day: number; isCurrentMonth: boolean; isToday: boolean }[] = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    calendarDays.push({ day: prevMonthDays - i, isCurrentMonth: false, isToday: false });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push({ day: d, isCurrentMonth: true, isToday: d === realToday && currentMonth === realMonth && currentYear === realYear });
  }

  const remaining = 42 - calendarDays.length;
  for (let d = 1; d <= remaining; d++) {
    calendarDays.push({ day: d, isCurrentMonth: false, isToday: false });
  }

  const weeks = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7));
  }

  const getEventsForDay = (day: number, isCurrentMonth: boolean) => {
    if (!isCurrentMonth) return [];
    return events.filter((e) => e.date === day);
  };

  const getDayName = (date: number) => {
    const d = new Date(currentYear, currentMonth, date);
    return d.toLocaleDateString("id-ID", { weekday: "long" });
  };

  const sortedEvents = [...events].sort((a, b) => a.date - b.date);

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 gradient-purple-dark opacity-60" />
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary blur-[200px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold font-cinzel gradient-purple-text mb-4">
            Calendar
          </h1>
          <h4 className="text-lg text-muted-foreground font-garamond italic">
            See what Erine's up to events, activities, and upcoming moments.
          </h4>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-3 md:p-6 shadow-2xl shadow-primary/10"
        >
          {/* Calendar header */}
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-sm md:text-2xl font-bold font-cinzel text-foreground capitalize">{monthName}</h2>
            <button
              onClick={() => setViewMode(viewMode === "calendar" ? "agenda" : "calendar")}
              className={`flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-cinzel transition-colors ${
                viewMode === "agenda"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-accent"
              }`}
            >
              {viewMode === "calendar" ? (
                <>
                  <List className="w-4 h-4" />
                  <span>Agenda</span>
                </>
              ) : (
                <>
                  <CalendarDays className="w-4 h-4" />
                  <span>Kalender</span>
                </>
              )}
            </button>
          </div>

          <AnimatePresence mode="wait">
            {viewMode === "calendar" ? (
              <motion.table
                key="calendar"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="calendar-grid w-full table-fixed"
              >
                <thead>
                  <tr>
                    {dayNames.map((d) => (
                      <th key={d} className="font-cinzel text-[10px] md:text-sm py-1 md:py-3">{d}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {weeks.map((week, wi) => (
                    <tr key={wi}>
                      {week.map((cell, ci) => {
                        const dayEvents = getEventsForDay(cell.day, cell.isCurrentMonth);
                        return (
                          <td
                            key={ci}
                            className={`relative h-14 md:h-24 p-0.5 md:p-1 align-top ${cell.isToday ? "today" : ""} ${!cell.isCurrentMonth ? "other-month" : ""}`}
                          >
                            <span className={`text-[10px] md:text-sm font-bold ${cell.isToday ? "text-primary" : "text-foreground"}`}>
                              {cell.day}
                            </span>
                            {dayEvents.map((ev, ei) => (
                              <button
                                key={ei}
                                onClick={() => setSelectedEvent(ev)}
                                className="block w-full mt-0.5 md:mt-1 text-[8px] md:text-xs bg-primary/20 text-left rounded px-0.5 md:px-1 py-0.5 hover:bg-primary/30 transition-colors truncate cursor-pointer"
                                style={{ color: "hsl(var(--purple-light))" }}
                              >
                                <span className="font-bold">{ev.time}</span>{" "}
                                <span className="hidden md:inline">{ev.title}</span>
                              </button>
                            ))}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </motion.table>
            ) : (
              <motion.div
                key="agenda"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-3"
              >
                {sortedEvents.map((ev, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedEvent(ev)}
                    className="flex items-center gap-4 p-4 rounded-xl bg-secondary/60 hover:bg-secondary border border-border/50 hover:border-primary/30 transition-all text-left cursor-pointer group"
                  >
                    <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-xl bg-primary/15 flex flex-col items-center justify-center border border-primary/20">
                      <span className="text-lg md:text-xl font-bold font-cinzel text-primary">{ev.date}</span>
                      <span className="text-[9px] md:text-[10px] text-muted-foreground font-cinzel uppercase">{getDayName(ev.date).slice(0, 3)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-cinzel font-bold text-sm md:text-base text-foreground group-hover:text-primary transition-colors truncate">
                        {ev.title}
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground mt-0.5">
                        Pukul {ev.time} WIB
                      </p>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Event Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-2xl p-6 max-w-md w-full shadow-2xl shadow-primary/20"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-cinzel font-bold text-foreground">{selectedEvent.title}</h3>
                  <p className="text-sm text-primary font-cinzel mt-1">
                    {selectedEvent.date}{" "}
                    {new Date(currentYear, currentMonth).toLocaleDateString("id-ID", { month: "long" })}{" "}
                    {currentYear} • {selectedEvent.time} WIB
                  </p>
                </div>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="p-1 rounded-lg hover:bg-secondary transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {selectedEvent.image && (
                <div className="rounded-xl overflow-hidden mb-4">
                  <img
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}

              {selectedEvent.description && (
                <p className="font-garamond text-muted-foreground mb-6 leading-relaxed">
                  {selectedEvent.description}
                </p>
              )}

              <div className="flex gap-3">
                <a
                  href={selectedEvent.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-2.5 rounded-xl gradient-purple text-primary-foreground font-cinzel text-sm text-center hover:opacity-90 transition-opacity"
                >
                  Lihat Detail
                </a>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="px-4 py-2.5 rounded-xl bg-secondary text-secondary-foreground font-cinzel text-sm hover:bg-accent transition-colors"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CalendarSection;