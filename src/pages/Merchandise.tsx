import { motion } from "framer-motion";
import { ShoppingCart, ExternalLink, Tag, Star } from "lucide-react";
import merchBanner from "@/assets/merchandise/merchandise-1.png";
// Tambah gambar baru di sini:
// import merchBanner2 from "@/assets/merchandise/merchandise-2.png";
// import merchBanner3 from "@/assets/merchandise/merchandise-3.png";

// ============================================================
// KONFIGURASI MERCHANDISE — Tambah / hapus item di sini saja!
// ============================================================
const MERCHANDISE_ITEMS = [
  {
    id: 1,
    image: merchBanner,
    badge: "Best Seller",
    badgeColor: "gold" as const,   // "gold" | "purple" | "green"
    title: "No Hesitation Bundle",
    subtitle: "Cavallery Collection",
    description:
      "Bundle eksklusif Fritzy Force yang menggabungkan kenyamanan dan gaya. Tunjukkan semangat tanpa ragu!",
    price: "Rp 299.000",
    originalPrice: "Rp 399.000",
    shopUrl: "https://bit.ly/MerchFRITZYTALE17",
    tags: ["Bundle", "Eksklusif", "Limited"],
    rating: 5,
  },
  // {
  //   id: 2,
  //   image: merchBanner2,
  //   badge: "New",
  //   badgeColor: "purple" as const,
  //   title: "Fritzy Hoodie",
  //   subtitle: "Streetwear Series",
  //   description: "Hoodie premium dengan logo Fritzy Force bordir. Nyaman dipakai sehari-hari.",
  //   price: "Rp 249.000",
  //   originalPrice: null,
  //   shopUrl: "https://bit.ly/MerchFRITZYTALE17",
  //   tags: ["Hoodie", "Premium"],
  //   rating: 4,
  // },
  // {
  //   id: 3,
  //   image: merchBanner3,
  //   badge: null,
  //   badgeColor: "green" as const,
  //   title: "Fritzy Cap",
  //   subtitle: "Accessories Line",
  //   description: "Topi snapback eksklusif. Cocok untuk semua aktivitas.",
  //   price: "Rp 149.000",
  //   originalPrice: null,
  //   shopUrl: "https://bit.ly/MerchFRITZYTALE17",
  //   tags: ["Topi", "Unisex"],
  //   rating: 4,
  // },
];
// ============================================================

const BADGE_STYLES: Record<string, string> = {
  gold:   "bg-amber-400/20 text-amber-300 border border-amber-400/40",
  purple: "bg-violet-500/20 text-violet-300 border border-violet-400/40",
  green:  "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40",
};

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-3.5 h-3.5 ${
          i < rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"
        }`}
      />
    ))}
  </div>
);

// ── Kartu Merchandise ─────────────────────────────────────────
const MerchCard = ({
  item,
  index,
}: {
  item: (typeof MERCHANDISE_ITEMS)[0];
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
    className="group relative bg-card/60 backdrop-blur-sm border border-border/60 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:border-primary/40 transition-all duration-300 flex flex-col sm:flex-row"
  >
    {/* Shimmer hover */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-r from-primary/5 via-transparent to-transparent" />

    {/* ── Gambar: atas di mobile, kiri di desktop ── */}
    <div className="relative overflow-hidden bg-muted/30 w-full h-48 sm:w-52 sm:h-auto sm:shrink-0">
      {item.badge && (
        <div className="absolute top-3 left-3 z-10">
          <span className={`text-[10px] font-cinzel font-bold tracking-widest uppercase px-2.5 py-1 rounded-full backdrop-blur-sm ${BADGE_STYLES[item.badgeColor]}`}>
            {item.badge}
          </span>
        </div>
      )}
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-card/40 to-transparent sm:hidden" />
      <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-r from-transparent to-card/30 hidden sm:block" />
    </div>

    {/* ── Konten: bawah di mobile, kanan di desktop ── */}
    <div className="flex flex-col flex-1 min-w-0 px-5 py-4 sm:px-7 sm:py-5 justify-between gap-3">

      {/* Judul + Deskripsi */}
      <div>
        <p className="text-[10px] font-cinzel tracking-[0.2em] uppercase text-primary mb-1">
          {item.subtitle}
        </p>
        <h2 className="text-base font-cinzel font-bold text-foreground leading-snug">
          {item.title}
        </h2>
        <p className="font-garamond text-muted-foreground text-sm leading-relaxed line-clamp-2 mt-1.5">
          {item.description}
        </p>
      </div>

      {/* Rating + Tags + Harga + Tombol */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">

        <div className="flex items-center gap-1.5 shrink-0">
          <StarRating rating={item.rating} />
          <span className="text-xs text-muted-foreground font-garamond">{item.rating}.0</span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 text-[10px] font-cinzel tracking-wider uppercase px-2 py-0.5 rounded-full bg-muted/60 text-muted-foreground border border-border/60 whitespace-nowrap"
            >
              <Tag className="w-2.5 h-2.5" />{tag}
            </span>
          ))}
        </div>

        <div className="flex-1" />
        <div className="hidden sm:block w-px h-8 bg-border/50 shrink-0" />

        <div className="flex items-baseline gap-2 shrink-0">
          <span className="text-base font-cinzel font-bold text-foreground whitespace-nowrap">
            {item.price}
          </span>
          {item.originalPrice && (
            <span className="text-xs font-garamond text-muted-foreground/50 line-through whitespace-nowrap">
              {item.originalPrice}
            </span>
          )}
        </div>

        <a
          href={item.shopUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2 rounded-xl text-xs font-cinzel font-semibold uppercase tracking-wider hover:bg-primary/90 hover:scale-[1.04] active:scale-[0.97] transition-all duration-200 shadow-md shadow-primary/20 whitespace-nowrap shrink-0"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          Beli Sekarang
        </a>
      </div>
    </div>
  </motion.div>
);

// ── Halaman Merchandise ───────────────────────────────────────
const MerchandisePage = () => {
  const itemCount = MERCHANDISE_ITEMS.length;

  return (
    <div className="min-h-screen">

      {/* Hero */}
      <div className="relative overflow-hidden py-24 px-4">
        <div className="absolute inset-0 gradient-purple-dark" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-primary/8 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-cinzel tracking-[0.3em] uppercase text-primary mb-4"
          >
            Official Store
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-cinzel font-bold text-foreground leading-none mb-6"
          >
            <span className="gradient-purple-text">Fritzy Force's</span>
            <br />Merchandise
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-garamond text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed"
          >
            Tunjukkan kebersamaan dan dukunganmu. Setiap produk dibuat dengan
            cinta untuk komunitas Fritzy Force.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border/60 bg-card/40 backdrop-blur-sm"
          >
            <ShoppingCart className="w-4 h-4 text-primary" />
            <span className="font-cinzel text-sm text-muted-foreground">
              {itemCount} Produk Tersedia
            </span>
          </motion.div>
        </div>
      </div>

      {/* Daftar */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="flex flex-col gap-4">
          {MERCHANDISE_ITEMS.map((item, index) => (
            <MerchCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center py-16 px-4 border-t border-border/30"
      >
        <p className="font-garamond text-muted-foreground text-base mb-5">
          Butuh bantuan atau ingin tahu info terbaru?
        </p>
        <a
          href={MERCHANDISE_ITEMS[0]?.shopUrl ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-cinzel text-sm tracking-widest uppercase text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
        >
          Kunjungi Official Store
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </motion.div>

    </div>
  );
};

export default MerchandisePage;