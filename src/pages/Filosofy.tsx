import { motion } from "framer-motion";
import filosofy1 from "@/assets/filosofy/filosofy.png";

const images = [filosofy1];

const CavalleryFilosofyPage = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary blur-[200px]" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-cinzel font-bold gradient-purple-text"
          >
            Our Filosofy
          </motion.h1>
        </div>
      </section>

      {/* Images */}
      <section className="pb-20">
        <div className="container mx-auto px-6 lg:px-16 max-w-3xl">
          <div className="space-y-6">
            {images.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl overflow-hidden border border-border shadow-xl shadow-primary/10"
              >
                <img
                  src={img}
                  alt={`Filosofy ${i + 1}`}
                  className="w-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CavalleryFilosofyPage;
