import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import fritzyMain from "@/assets/hero/fritzy-main.jpg";
import galleryPreview from "@/assets/about/gallery-preview.jpg";
import schedulePreview from "@/assets/about/schedule-preview.jpg";
import setlistPreview from "@/assets/about/setlist-preview.jpg";
import aboutusPreview from "@/assets/about/aboutus-preview.jpg";

interface ContentItem {
  image: string;
  title: string;
  desc: string;
  link: string;
}

const contentItems: ContentItem[] = [
  {
    image: fritzyMain,
    title: "Profile",
    desc: "Kenali lebih dekat Fritzy Rosmerian, biodata, fakta unik, dan perjalanan karier di JKT48.",
    link: "/about",
  },
  {
    image: schedulePreview,
    title: "Schedule",
    desc: "Jadwal terbaru event, teater, dan aktivitas Fritzy Rosmerian yang bisa kamu ikuti.",
    link: "/schedule",
  },
  {
    image: galleryPreview,
    title: "Gallery",
    desc: "Kumpulan foto dan momen spesial Fritzy, baik di atas maupun di luar panggung.",
    link: "/gallery",
  },
  {
    image: setlistPreview,
    title: "Content",
    desc: "Video youtube dan pertunjukan yang pernah dibawakan Fritzy bersama JKT48.",
    link: "/playlist",
  },
  {
    image: aboutusPreview,
    title: "About Us",
    desc: "Kenali komunitas Fritzy Force, visi, misi, dan cara bergabung bersama kami.",
    link: "/about-us",
  },
];

const ContentSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-accent blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold font-cinzel gradient-purple-text mb-4">
            Explore
          </h1>
          <h4 className="text-lg text-muted-foreground font-garamond italic">
            Discover everything about Fritzy Rosmerian and Fritzy Force
          </h4>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {contentItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={item.link} className="block gallery-item group">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-56 object-cover"
                  loading="lazy"
                />
                <div className="gallery-overlay">
                  <strong className="text-primary-foreground font-cinzel text-lg">{item.title}</strong>
                  <span className="text-primary-foreground/70 text-sm text-center px-4">{item.desc}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex justify-center gap-4 mb-16">
          <Link
            to="/gallery"
            className="px-6 py-3 rounded-full gradient-purple text-primary-foreground font-cinzel hover:opacity-90 transition-opacity shadow-lg shadow-primary/30"
          >
            See Gallery
          </Link>
          <Link
            to="/playlist"
            className="px-6 py-3 rounded-full border border-primary text-primary font-cinzel hover:bg-primary/10 transition-colors"
          >
            See Playlist
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
