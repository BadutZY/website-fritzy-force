import { motion } from "framer-motion";
import { User, MessageCircle, Cake, MapPin, Droplet, Ruler, Star, IdCard } from "lucide-react";
import { Link } from "react-router-dom";
import profileVideo from "@/assets/video/video-fritzy.mp4"

const bioItems = [
  { icon: User, label: "Fritzy Rosmerian" },
  { icon: MessageCircle, label: "Fritzy (フリッツィー)" },
  { icon: Cake, label: "July 28, 2008" },
  { icon: MapPin, label: "Jakarta, Indonesia" },
  { icon: Droplet, label: "Blood Type A" },
  { icon: Ruler, label: "157 cm" },
  { icon: Star, label: "♌︎ Leo" },
  { icon: IdCard, label: "Member of JKT48 Gen 12" },
];

const BiodataSection = () => {
  return (
    <section id="meet-fritzy" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row gap-10 items-stretch">
          {/* Video Section */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex-1 rounded-2xl overflow-hidden border border-border shadow-2xl shadow-primary/10 aspect-[9/16] sm:aspect-video lg:min-h-[500px]"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source
                src={profileVideo}
                type="video/mp4"
              />
            </video>
          </motion.div>

          {/* Biodata Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-1"
          >
            <div className="bg-card border border-border rounded-2xl p-8 h-full shadow-2xl shadow-primary/10">
              <div className="mb-6">
                <h1 className="text-3xl md:text-4xl font-bold font-cinzel gradient-purple-text">
                  Fritzy's Biodata
                </h1>
                <div className="h-1 w-24 gradient-purple rounded-full mt-3" />
              </div>

              <ul className="space-y-4 mb-8">
                {bioItems.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i }}
                    className="flex items-center gap-3 text-lg"
                  >
                    <item.icon className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground font-garamond">{item.label}</span>
                  </motion.li>
                ))}
              </ul>

              <blockquote className="text-lg italic text-muted-foreground font-garamond mb-8 border-l-4 border-primary pl-4">
                "Abracadabra! si <span className="checkmate-anim font-bold not-italic">pesulap</span> yang siap membuat hatimu terpikat, halo semuanya it's me Fritzy! Mohon dukungannya!"
              </blockquote>

              <Link
                to="/about"
                className="inline-block px-6 py-3 rounded-full gradient-purple text-primary-foreground font-cinzel hover:opacity-90 transition-opacity shadow-lg shadow-primary/30"
              >
                About Fritzy
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BiodataSection;
