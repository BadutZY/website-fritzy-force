import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import fritzyMain from "@/assets/hero/fritzy-main.jpg";

const slides = [fritzyMain];

const fullText = "Home of Fritzy's Biggest supporters";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (slides.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    let i = 0;
    setDisplayedText("");
    setIsTyping(true);
    const typeInterval = setInterval(() => {
      if (i < fullText.length) {
        setDisplayedText(fullText.slice(0, i + 1));
        i++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
      }
    }, 60);
    return () => clearInterval(typeInterval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-purple-dark">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center gap-12 relative z-10 py-20">
        {/* Text Panel */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-center lg:text-left"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-cinzel">
            <span className="text-foreground">Welcome to </span>
            <span className="gradient-purple-text">Fritzy Force!</span>
          </h1>

          <div className="text-xl md:text-2xl text-muted-foreground font-garamond mb-8 h-10">
            <span>{displayedText}</span>
            <span className={`typewriter-cursor ml-1 ${!isTyping ? 'opacity-0' : ''}`}>|</span>
          </div>

          <a
            href="#meet-fritzy"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full gradient-purple text-primary-foreground font-cinzel text-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/30"
          >
            Meet Fritzy?
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </a>
        </motion.div>

        {/* Image Panel - Arch Shape */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex-1 flex justify-center"
        >
          <div className="relative">
            {/* Arch border */}
            <div className="w-[300px] h-[420px] md:w-[350px] md:h-[480px] rounded-t-[175px] border-4 border-primary/50 p-2 relative overflow-hidden shadow-2xl shadow-primary/20">
              <div className="w-full h-full rounded-t-[170px] overflow-hidden relative">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentSlide}
                    src={slides[currentSlide]}
                    alt={`Fritzy Rosmerian`}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                  />
                </AnimatePresence>
              </div>
            </div>

            {/* Floating card */}
            <motion.div
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 gradient-purple px-6 py-3 rounded-xl shadow-xl shadow-primary/30 text-center animate-float"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <strong className="text-primary-foreground font-cinzel text-lg block">JKT48 Fritzy</strong>
              <span className="text-primary-foreground/80 text-sm flex items-center gap-1 justify-center">
                #BetterWithFritzy
              </span>
            </motion.div>

            {/* Slide indicators */}
            {slides.length > 1 && (
              <div className="flex gap-2 justify-center mt-10">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      i === currentSlide ? 'bg-primary w-8' : 'bg-muted-foreground/40'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Castle skyline gradient */}
      <div className="castle-skyline" />
    </section>
  );
};

export default HeroSection;
