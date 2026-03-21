import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import shonicihRkj from "@/assets/gallery/shonichi-rkj.jpg";
import firstSpvGoFight from "@/assets/gallery/first-spv-go-fight.jpg";
import setlistTwt from "@/assets/gallery/setlist-twt.jpg";
import showRamadhanPmdk from "@/assets/gallery/show-ramadhan-pmdk.jpg";
import showRamadhanDance from "@/assets/gallery/show-ramadhan-dance.jpg";
import lastShowPajama from "@/assets/gallery/last-show-pajama.jpg";
import lastShowAitakatta from "@/assets/gallery/last-show-aitakatta.jpg";
import shonicihPerform from "@/assets/timeline/promoted-full-member.jpg";
import shonicihGen13 from "@/assets/gallery/shonichi-gen13.jpg";
import shonicihRamune from "@/assets/timeline/cara-meminum-ramune.jpg";
import backstageAnniversary from "@/assets/timeline/first-anniversary.jpg";
import birthdayFritzy from "@/assets/timeline/birthday-celebration.jpg";
import shonicihPajama from "@/assets/timeline/pajama-drive-debut.jpg";
import shonicihAitakatta from "@/assets/timeline/first-theater.jpg";

const galleryImages = [
  { src: shonicihRkj, title: "Shonichi Setlist Renai Kinshi Jourei" },
  { src: firstSpvGoFight, title: "First SPV Go & Fight" },
  { src: setlistTwt, title: "Setlist Te wo Tsunaginagara" },
  { src: shonicihPerform, title: "Shonichi Perform Member Reguler" },
  { src: showRamadhanPmdk, title: "Show Ramadhan 2025 - Seleksi PMDK" },
  { src: showRamadhanDance, title: "Show Ramadhan 2025 - Battle Dance" },
  { src: lastShowPajama, title: "Last Show Pajama Drive" },
  { src: lastShowAitakatta, title: "Last Show Aitakatta" },
  { src: shonicihGen13, title: "Fritzy Show Theater Shonichi Generation 13" },
  { src: shonicihRamune, title: "Shonichi Show Reguler Cara Meminum Ramune" },
  { src: backstageAnniversary, title: "Backstage Preparation Anniversary Concert 2024" },
  { src: birthdayFritzy, title: "Perayaan Ulang Tahun Fritzy Rosmerian" },
  { src: shonicihPajama, title: "Shonichi Setlist Pajama Drive" },
  { src: shonicihAitakatta, title: "Shonichi Setlist Aitakatta" },
];

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

const GalleryPage = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useScrollLock(selectedIndex !== null);

  const goNext = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % galleryImages.length : null
    );
  }, []);

  const goPrev = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null
    );
  }, []);

  return (
    <div className="min-h-screen">
      <section className="py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary blur-[200px]" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-cinzel font-bold gradient-purple-text mb-4"
          >
            Photo Gallery
          </motion.h1>
          <p className="text-lg text-muted-foreground font-garamond italic">
            Explore Fritzy's memorable moments on and off stage
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.02 }}
                className="break-inside-avoid cursor-pointer gallery-item rounded-xl overflow-hidden border border-border"
                onClick={() => setSelectedIndex(i)}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full object-cover"
                  loading="lazy"
                />
                <div className="gallery-overlay">
                  <span className="text-primary-foreground font-garamond text-sm text-center px-2">
                    {img.title}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-background/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
          >
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-muted/60 hover:bg-muted transition-colors z-10"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={goPrev}
              className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 p-2 rounded-full bg-muted/60 hover:bg-muted transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6 text-foreground" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 p-2 rounded-full bg-muted/60 hover:bg-muted transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6 text-foreground" />
            </button>

            <div className="flex flex-col items-center max-w-full">
              <motion.img
                key={selectedIndex}
                src={galleryImages[selectedIndex].src}
                alt={galleryImages[selectedIndex].title}
                className="max-w-full max-h-[80vh] rounded-2xl shadow-2xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              />
              <p className="text-foreground font-garamond mt-4 text-center">
                {galleryImages[selectedIndex].title}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;