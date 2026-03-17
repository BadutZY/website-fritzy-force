import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

import joinedJkt48 from "@/assets/timeline/joined-jkt48.jpg";
import firstTheater from "@/assets/timeline/first-theater.jpg";
import pajamaDriveDebut from "@/assets/timeline/pajama-drive-debut.jpg";
import birthdayCelebration from "@/assets/timeline/birthday-celebration.jpg";
import firstAnniversary from "@/assets/timeline/first-anniversary.jpg";
import caraMeminum from "@/assets/timeline/cara-meminum-ramune.jpg";
import promotedMember from "@/assets/timeline/promoted-full-member.jpg";
import firstSpv from "@/assets/timeline/first-spv.jpg";
import shonicihTwt from "@/assets/timeline/shonichi-twt.jpg";
import shonicihRkj from "@/assets/timeline/shonichi-rkj.jpg";
import tourSemarang from "@/assets/timeline/tour-semarang.jpg";
import tourJogja from "@/assets/timeline/tour-jogja.jpg";
import tourSurabaya from "@/assets/timeline/tour-surabaya.jpg";
import fullHouseConcert from "@/assets/timeline/full-house-concert.jpg";

interface TimelineItem {
  date: string;
  title: string;
  desc: string;
  image: string;
}

const timeline: TimelineItem[] = [
  { date: "November 17, 2023", title: "Joined JKT48", desc: "Fritzy officially joined JKT48 as part of the 12th Generation trainee", image: joinedJkt48 },
  { date: "March 1, 2024", title: "First Theater Performance", desc: "Debut performance in JKT48 Theater with Aitakatta setlist", image: firstTheater },
  { date: "May 30, 2024", title: "Pajama Drive Debut", desc: "First performance in the Pajama Drive setlist", image: pajamaDriveDebut },
  { date: "July 27, 2024", title: "Birthday Celebration", desc: "Special birthday celebration with fans and members", image: birthdayCelebration },
  { date: "November 14, 2024", title: "First Anniversary Concert", desc: "Participated in JKT48 Anniversary Concert 2024", image: firstAnniversary },
  { date: "November 23, 2024", title: "Cara Meminum Ramune", desc: "Started performing in Cara Meminum Ramune setlist", image: caraMeminum },
  { date: "April 30, 2025", title: "Promoted to Full Member", desc: "Official promotion from trainee to full JKT48 member", image: promotedMember },
  { date: "May 21, 2025", title: "First SPV Go & Fight", desc: "Debut performance in the SPV Go & Fight", image: firstSpv },
  { date: "May 29, 2025", title: "Shonichi Setlist Te wo Tsunaginagara", desc: "Shonichi performance of the setlist Te wo Tsunaginagara", image: shonicihTwt },
  { date: "June 26, 2025", title: "Shonichi Setlist Renai Kinshi Jourei", desc: "Shonichi performance of the setlist Renai Kinshi Jourei", image: shonicihRkj },
  { date: "July 4, 2025", title: "Tour 2025 - Semarang", desc: "First time participating in 2-Shot & Meet & Greet event in Semarang city", image: tourSemarang },
  { date: "July 7, 2025", title: "Tour 2025 - Jogja", desc: "First time participating in 2-Shot & Meet & Greet event in Jogja city", image: tourJogja },
  { date: "July 11, 2025", title: "Tour 2025 - Surabaya", desc: "First time participating in 2-Shot & Meet & Greet event in Surabaya city", image: tourSurabaya },
  { date: "July 25, 2025", title: "JKT48 Special Concert FULL HOUSE", desc: "Participated in JKT48 Special Concert FULL HOUSE at Istora Senayan", image: fullHouseConcert },
];

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

const TimelinePage = () => {
  const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null);

  useScrollLock(!!selectedItem);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary blur-[200px]" />
        </div>
        <div className="container mx-auto px-6 lg:px-16 relative z-10 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-cinzel font-bold gradient-purple-text mb-4"
          >
            Fritzy's Career Timeline
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg font-garamond text-muted-foreground leading-relaxed"
          >
            Journey of Fritzy Rosmerian in JKT48
          </motion.p>
        </div>
      </section>

      {/* Timeline */}
      <section className="pb-20">
        <div className="container mx-auto px-6 lg:px-16 max-w-5xl">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 md:-translate-x-px w-0.5 h-full bg-primary/30" />

            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className={`relative flex items-start mb-10 
                  justify-start pl-12
                  md:pl-0 ${i % 2 === 0 ? "md:justify-start" : "md:justify-end"}`}
              >
                {/* Card */}
                <div
                  className={`w-full md:w-5/12 cursor-pointer group ${
                    i % 2 === 0 ? "md:pr-8" : "md:pl-8"
                  }`}
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="bg-card rounded-xl border border-border shadow-lg shadow-primary/5 overflow-hidden hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
                    <div className="overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-36 sm:h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-3 sm:p-4">
                      <span className="inline-block text-[10px] font-cinzel font-bold text-primary-foreground bg-primary px-2 py-0.5 rounded-full mb-1.5">
                        {item.date}
                      </span>
                      <h4 className="font-cinzel font-bold text-foreground text-sm leading-tight group-hover:text-primary transition-colors mb-1">
                        {item.title}
                      </h4>
                      <p className="font-garamond text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Dot on timeline */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-4 w-3.5 h-3.5 rounded-full gradient-purple border-[3px] border-background shadow-md shadow-primary/30 z-10" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-lg w-full bg-card rounded-2xl overflow-hidden border border-border shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-background/80 backdrop-blur flex items-center justify-center text-foreground hover:bg-background transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center justify-center bg-black/20">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="max-w-full max-h-[50vh] object-contain"
                />
              </div>
              <div className="p-5">
                <span className="inline-block text-xs text-primary-foreground bg-primary font-cinzel font-bold px-2.5 py-1 rounded-full mb-2">
                  {selectedItem.date}
                </span>
                <h4 className="font-cinzel font-bold text-lg text-foreground mt-1 mb-2">
                  {selectedItem.title}
                </h4>
                <p className="font-garamond text-muted-foreground">{selectedItem.desc}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TimelinePage;