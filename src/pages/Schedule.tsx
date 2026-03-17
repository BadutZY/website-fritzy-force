import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Clock, ExternalLink, Sparkles, MapPin, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { schedules, ScheduleCategory } from "@/data/schedule-data";

const categories: { label: string; value: string }[] = [
  { label: "All", value: "all" },
  { label: "Theater", value: "Theater" },
  { label: "Video Call", value: "VideoCall" },
  { label: "Concert", value: "Concert" },
  { label: "2Shot", value: "2Shot" },
  { label: "Meet&Greet", value: "Meet&Greet" },
];

const ScheduleSkeleton = () => (
  <div className="flex flex-col gap-3">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="rounded-xl border border-border p-4 bg-card">
        <div className="flex items-start gap-4 mt-2">
          <Skeleton className="w-16 h-16 rounded-xl flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

const SchedulePage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const displaySchedules = useMemo(() => {
    let filtered = schedules;
    if (activeCategory !== "all") {
      filtered = schedules.filter(s => s.category === activeCategory);
    }
    return filtered.sort((a, b) => b.show_date.localeCompare(a.show_date));
  }, [activeCategory]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  };

  const getDayNumber = (dateStr: string) => new Date(dateStr + 'T00:00:00').getDate();
  const getMonthShort = (dateStr: string) =>
    new Date(dateStr + 'T00:00:00').toLocaleDateString('id-ID', { month: 'short' }).toUpperCase();
  const isToday = (dateStr: string) => dateStr === new Date().toISOString().split('T')[0];

  const getCategoryColor = (cat: ScheduleCategory) => {
    switch (cat) {
      case "Theater": return "bg-primary/20 text-primary";
      case "VideoCall": return "bg-blue-500/20 text-blue-400";
      case "Concert": return "bg-yellow-500/20 text-yellow-400";
      case "2Shot": return "bg-pink-500/20 text-pink-400";
      case "Meet&Greet": return "bg-green-500/20 text-green-400";
      case "Birthday": return "bg-orange-500/20 text-orange-400";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen">
      <section className="py-16 md:py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary blur-[200px]" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-cinzel font-bold gradient-purple-text mb-4">
            Schedule
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-base md:text-lg text-muted-foreground font-garamond italic max-w-xl mx-auto">
            Catch Fritzy's performances and events. Don't miss your chance to see her live!
          </motion.p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 pb-20">
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 rounded-full font-cinzel text-xs md:text-sm transition-all ${
                activeCategory === cat.value
                  ? 'gradient-purple text-primary-foreground shadow-lg shadow-primary/30'
                  : 'bg-secondary text-secondary-foreground hover:bg-accent'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {isLoading ? (
          <ScheduleSkeleton />
        ) : (
          <>
            {displaySchedules.length === 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <CalendarDays className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-lg font-cinzel text-foreground mb-2">Belum Ada Jadwal</p>
                <p className="text-sm text-muted-foreground font-garamond max-w-md mx-auto">
                  Belum ada jadwal untuk kategori ini.
                </p>
              </motion.div>
            )}

            <AnimatePresence mode="wait">
              {displaySchedules.length > 0 && (
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-3"
                >
                  {displaySchedules.map((schedule, i) => (
                    <motion.div
                      key={schedule.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className={`group relative rounded-xl border p-4 transition-all hover:shadow-lg ${
                        schedule.has_fritzy
                          ? "bg-primary/5 border-primary/30 hover:border-primary/50 shadow-primary/5"
                          : "bg-card border-border hover:border-primary/20"
                      }`}
                    >
                      <div className="absolute -top-2 left-4 flex gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getCategoryColor(schedule.category)}`}>
                          {schedule.category === "VideoCall" ? "Video Call" : schedule.category}
                        </span>
                        {schedule.status === "Completed" && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-muted text-muted-foreground">Completed</span>
                        )}
                      </div>
                      {schedule.has_fritzy && (
                        <div className="absolute -top-2 right-4">
                          <span className="inline-flex items-center gap-1 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">
                            <Sparkles className="w-3 h-3" /> FRITZY
                          </span>
                        </div>
                      )}

                      <div className="flex items-start gap-4 mt-2">
                        <div className={`flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-xl flex flex-col items-center justify-center border ${
                          isToday(schedule.show_date) ? "bg-primary/20 border-primary/40" : schedule.has_fritzy ? "bg-primary/10 border-primary/20" : "bg-muted border-border"
                        }`}>
                          <span className={`text-lg md:text-xl font-bold font-cinzel ${isToday(schedule.show_date) ? "text-primary" : "text-foreground"}`}>
                            {getDayNumber(schedule.show_date)}
                          </span>
                          <span className="text-[9px] md:text-[10px] text-muted-foreground font-cinzel uppercase">
                            {getMonthShort(schedule.show_date)}
                          </span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-cinzel font-bold text-sm md:text-base text-foreground group-hover:text-primary transition-colors">
                            {schedule.show_title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                            <span className="text-xs text-muted-foreground font-garamond">{formatDate(schedule.show_date)}</span>
                            {schedule.show_time && (
                              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" /> {schedule.show_time} WIB
                              </span>
                            )}
                            {isToday(schedule.show_date) && (
                              <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">HARI INI</span>
                            )}
                          </div>
                          {schedule.location && (
                            <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                              <MapPin className="w-3 h-3" /> {schedule.location}
                            </div>
                          )}
                          {schedule.performers && (
                            <div className="flex items-start gap-1 mt-1 text-xs text-muted-foreground">
                              <Users className="w-3 h-3 mt-0.5 flex-shrink-0" />
                              <span className="line-clamp-1">{schedule.performers}</span>
                            </div>
                          )}
                        </div>

                        {schedule.show_url && (
                          <a href={schedule.show_url} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors" title="View Details">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

      </div>
    </div>
  );
};

export default SchedulePage;
