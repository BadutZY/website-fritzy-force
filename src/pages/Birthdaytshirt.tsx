import { motion } from "framer-motion";
import { ShoppingCart, ExternalLink, Tag, Cake, Sparkles, Gift, Heart } from "lucide-react";
import bdayPlaceholder from "@/assets/merchandise/bdts-1.png";
const BIRTHDAY_ITEMS = [
  {
    id: 1,
    image: bdayPlaceholder,
    badge: "Pre-Order",
    badgeColor: "rose" as const,
    title: "Birthday T-Shirt Fritzy Rosmerian 2025",
    subtitle: "JKT48 Official Birthday",
    description:
      "Kaos ulang tahun resmi Fritzy Rosmerian tahun 2025. Edisi terbatas hanya untuk para Fritzy Force sejati yang ingin merayakan momen istimewa ini bersama!",
    shopUrl:
      "https://www.tokopedia.com/jkt48-official-store/pre-order-jkt48-birthday-t-shirt-fritzy-rosmerian-2025-1731846958635320439",
    tags: ["Official", "Pre-Order", "2025"],
  },
  // {
  //   id: 2,
  //   image: bdayShirt2,
  //   badge: "New",
  //   badgeColor: "pink" as const,
  //   title: "...",
  //   subtitle: "...",
  //   description: "...",
  //   price: "...",
  //   note: null,
  //   shopUrl: "...",
  //   tags: ["Official", "2025"],
  //   highlights: ["JKT48 Official Store", "Birthday Series"],
  // },
];

const BADGE_STYLES: Record<string, string> = {
  rose:  "bg-rose-500/20 text-rose-300 border border-rose-400/40",
  pink:  "bg-pink-500/20 text-pink-300 border border-pink-400/40",
  amber: "bg-amber-400/20 text-amber-300 border border-amber-400/40",
};

const BirthdayCard = ({
  item,
  index,
}: {
  item: (typeof BIRTHDAY_ITEMS)[0];
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.55, delay: index * 0.1, ease: "easeOut" }}
    className="group relative bg-card/50 backdrop-blur-sm border border-rose-500/20 rounded-xl overflow-hidden shadow-lg hover:shadow-rose-500/10 hover:shadow-2xl hover:border-rose-400/40 transition-all duration-300 flex flex-col"
  >
    {/* Glow hover */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-b from-rose-500/5 via-transparent to-transparent" />

    {/* ── Gambar 4:5 ── */}
    <div className="relative overflow-hidden bg-muted/30 w-full" style={{ aspectRatio: "4/5" }}>
      {item.badge && (
        <div className="absolute top-2 left-2 z-10">
          <span className={`text-[8px] sm:text-[9px] font-cinzel font-bold tracking-widest uppercase px-1.5 py-0.5 rounded-full backdrop-blur-sm ${BADGE_STYLES[item.badgeColor]}`}>
            {item.badge}
          </span>
        </div>
      )}
      <div className="absolute top-2 right-2 z-10 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-rose-500/20 backdrop-blur-sm border border-rose-400/30 flex items-center justify-center">
        <Cake className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-300" />
      </div>
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-card/60 to-transparent" />
    </div>

    {/* ── Konten ── */}
    <div className="flex flex-col flex-1 px-3 py-3 gap-2 sm:px-4 sm:py-4 sm:gap-3">

      {/* Label + Judul */}
      <div>
        <div className="flex items-center gap-1 mb-1">
          <Sparkles className="w-2 h-2 text-rose-400 shrink-0" />
          <p className="text-[8px] sm:text-[9px] font-cinzel tracking-[0.15em] uppercase text-rose-400 leading-none truncate">
            {item.subtitle}
          </p>
        </div>
        <h2 className="text-[11px] sm:text-sm font-cinzel font-bold text-foreground leading-snug line-clamp-2">
          {item.title}
        </h2>
        {/* Deskripsi hanya muncul di desktop */}
        <p className="hidden sm:block font-garamond text-muted-foreground text-xs leading-relaxed line-clamp-2 mt-1">
          {item.description}
        </p>
      </div>

      {/* Garis pemisah */}
      <div className="h-px bg-rose-500/15" />

      {/* Tags */}
      <div className="flex items-center gap-1 flex-wrap">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-0.5 text-[7px] sm:text-[9px] font-cinzel tracking-wider uppercase px-1.5 py-0.5 rounded-full bg-muted/60 text-muted-foreground border border-border/60 whitespace-nowrap"
          >
            <Tag className="w-1.5 h-1.5 sm:w-2 sm:h-2" />{tag}
          </span>
        ))}
      </div>

      {/* Tombol full width agar tidak terpotong */}
      <a
        href={item.shopUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full inline-flex items-center justify-center gap-1.5 bg-rose-500 text-white py-2 rounded-lg text-[9px] sm:text-[10px] font-cinzel font-semibold uppercase tracking-wide hover:bg-rose-600 hover:scale-[1.02] active:scale-[0.97] transition-all duration-200 shadow-md shadow-rose-500/30"
      >
        <ShoppingCart className="w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" />
        <span className="sm:hidden">Pre-Order</span>
        <span className="hidden sm:inline">Pre-Order Sekarang</span>
      </a>
    </div>
  </motion.div>
);

const BirthdayTShirtPage = () => {
  const itemCount = BIRTHDAY_ITEMS.length;

  return (
    <div className="min-h-screen">

      {/* Hero */}
      <div className="relative overflow-hidden py-24 px-4">
        {/* Background rose tint */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-rose-950/15 to-background" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-72 rounded-full bg-rose-500/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-pink-500/8 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">

          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "backOut" }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-rose-500/15 border border-rose-500/25 mb-6"
          >
            <Cake className="w-8 h-8 text-rose-400" />
          </motion.div>

          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm font-cinzel tracking-[0.3em] uppercase text-rose-400 mb-4"
          >
            Happy Birthday · Fritzy Rosmerian
          </motion.p>

          {/* Judul */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-5xl md:text-7xl font-cinzel font-bold text-foreground leading-none mb-6"
          >
            Birthday{" "}
            <span className="bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
              T-Shirt
            </span>
          </motion.h1>

          {/* Deskripsi */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-garamond text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed"
          >
            Rayakan ulang tahun Fritzy dengan mengenakan kaos resmi edisi terbatas.
            Hanya untuk Fritzy Force yang sejati!
          </motion.p>

          {/* Pill */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-rose-500/30 bg-rose-500/10 backdrop-blur-sm"
          >
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
            <span className="font-cinzel text-sm text-rose-300">
              {itemCount} Item · Pre-Order Resmi JKT48
            </span>
          </motion.div>
        </div>
      </div>

      {/* Grid Produk */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {BIRTHDAY_ITEMS.map((item, index) => (
            <BirthdayCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center py-16 px-4 border-t border-rose-500/15"
      >
        <p className="font-garamond text-muted-foreground text-base mb-5">
          Kunjungi toko resmi JKT48 di Tokopedia
        </p>
        <a
          href="https://www.tokopedia.com/jkt48-official-store"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-cinzel text-sm tracking-widest uppercase text-rose-400 hover:text-rose-300 underline underline-offset-4 transition-colors"
        >
          Kunjungi JKT48 Official Store
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </motion.div>

    </div>
  );
};

export default BirthdayTShirtPage;