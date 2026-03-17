import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Music } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

import aitakattaImg from "@/assets/setlist/aitakatta.jpg";
import pajamaImg from "@/assets/setlist/pajama-drive.jpg";
import ramuneImg from "@/assets/setlist/cara-meminum-ramune.jpg";
import twtImg from "@/assets/setlist/te-wo-tsunaginagara.jpg";
import rkjImg from "@/assets/setlist/aturan-anti-cinta.jpg";

interface SetlistItem {
  image: string;
  title: string;
  desc: string;
  totalShows: number;
  totalSongs: number;
  songs: string[];
}

const setlists: SetlistItem[] = [
  {
    image: aitakattaImg,
    title: "Aitakatta",
    desc: "The Aitakatta (Ingin Bertemu) setlist, performed by JKT48 12th Generation trainees, marks a significant chapter in the group's evolving legacy.",
    totalShows: 30,
    totalSongs: 11,
    songs: [
      "Nageki no Figure", "Aitakatta", "Nagisa no CHERRY", "Koi no PLAN",
      "Senaka Kara Dakishimete", "Rio no Kakumei", "Dakedo", "Dear my teacher",
      "Mirai no Tobira (Encore)", "JKT48 (Encore)", "Skirt, Hirari (Encore)",
    ],
  },
  {
    image: pajamaImg,
    title: "Pajama Drive",
    desc: "The Pajama Drive stage is known for its vibrant energy and diverse range of songs, allowing members to display various facets of their performance abilities.",
    totalShows: 28,
    totalSongs: 12,
    songs: [
      "Hari Pertama", "Jurus Rahasia Teleport", "Putri Duyung yang Sedang Sedih",
      "Bersepeda Berdua", "Ekor Malaikat", "Two Years Later", "Cara Menggunakan Hidup",
      "Rugi Sudah Dicium", "Bunga Sakuraku", "Wasshoi J!K!T!48 (Encore)",
      "Pelaut yang Melihat Mimpi di Tengah Badai (Encore)", "Baju Putih (Encore)",
    ],
  },
  {
    image: ramuneImg,
    title: "Cara Meminum Ramune",
    desc: "The Cara Meminum Ramune setlist, also known by its Japanese title Ramune no Nomikata, is JKT48's adaptation of SKE48 Team KII 3rd Stage.",
    totalShows: 4,
    totalSongs: 16,
    songs: [
      "Pertanda", "Schoolyard Puppy", "Disco di UKS", "Setlist yang Dinanti",
      "Cross", "Finland Miracle", "Menatapmu, Sayonara", "Burung Unta si Pembohong",
      "Nice to Meet You!", "Balerina Dalam Sepi", "Sekarang Ku Bersama Denganmu",
      "Winning Ball", "Cinta Dalam Handshake", "Harapan Bowling (Encore)",
      "16 Warna Krayon Mimpi (Encore)", "Ramune no Nomikata (Encore)",
    ],
  },
  {
    image: twtImg,
    title: "Sambil Menggandeng Erat Tanganku",
    desc: "This setlist was replaced by Tunas di Balik Seragam and began to be performed again on February 1-2, 2025 at JKT48 Theater.",
    totalShows: 2,
    totalSongs: 16,
    songs: [
      "Bokura no Kaze", "Mango No.2", "Te wo Tsunaginagara", "Chime wa Love Song",
      "Glory Days", "Kono Mune no Barcode", "Wimbledon e Tsuretette", "Ame no Pianist",
      "Choco no Yukue", "Innocence", "Romance Rocket", "Koi no Keikou to Taisaku",
      "Daisuki", "Rope no Yuujou (Encore)", "Kayoubi no Yoru, Suiyoubi no Asa (Encore)",
      "Tooku ni Ite mo (Encore)",
    ],
  },
  {
    image: rkjImg,
    title: "Aturan Anti Cinta",
    desc: "The Anti-Love Rule setlist is one of JKT48's theater pillars. With an atmospheric blend of love, rebellion, and deep emotion, this setlist has managed to remain relevant from its debut in 2012 to the current New Era.",
    totalShows: 1,
    totalSongs: 16,
    songs: [
      "Nagai Hikari", "Squall no Aida ni", "JK Nemurihime", "Kimi ni Au Tabi Koi wo Suru",
      "Kuroi Tenshi", "Heart Gata Virus", "Renai Kinshi Jourei", "Tsundere!",
      "Manatsu no Christmas Rose", "Switch", "109 (Marukyuu)", "Hikoukigumo",
      "Ano Koro no Sneakers", "JKT Sanjou! (Encore)", "Boku no Sakura (Encore)",
      "Renai Kinshi Jourei (Encore)",
    ],
  },
];

const SetlistSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden">
        <Skeleton className="w-full h-48" />
        <div className="p-5 space-y-3">
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-4/5" />
          <div className="flex gap-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-9 w-full rounded-lg" />
        </div>
      </div>
    ))}
  </div>
);

const SetlistPage = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
      <section className="py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary blur-[200px]" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-6xl font-cinzel font-bold gradient-purple-text mb-4">
            Theater Setlist
          </motion.h1>
          <p className="text-lg text-muted-foreground font-garamond italic">
            Experience Fritzy's performances in various JKT48 Theater Shows
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-6 lg:px-16">
          {isLoading ? (
            <SetlistSkeleton />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {setlists.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl shadow-primary/10 hover:border-primary/50 transition-colors"
                >
                  <img src={s.image} alt={s.title} className="w-full h-48 object-cover" loading="lazy" />
                  <div className="p-5">
                    <h3 className="text-foreground font-cinzel text-lg font-bold mb-2">{s.title}</h3>
                    <p className="text-muted-foreground text-sm font-garamond mb-4">{s.desc}</p>
                    <div className="flex gap-4 mb-4">
                      <span className="text-primary font-cinzel font-bold text-sm">Total {s.totalShows} Shows</span>
                      <span className="text-muted-foreground font-garamond text-sm">{s.totalSongs} Songs</span>
                    </div>

                    <button
                      onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                      className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-primary/30 text-primary font-cinzel text-sm hover:bg-primary/10 transition-colors"
                    >
                      <Music className="w-4 h-4" />
                      {expandedIndex === i ? "Hide Setlist" : "View Setlist"}
                      {expandedIndex === i ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    <AnimatePresence>
                      {expandedIndex === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 border-t border-border pt-4">
                            <h4 className="text-xs font-cinzel font-bold text-primary mb-3 uppercase tracking-wider">Song List</h4>
                            <ol className="space-y-1.5">
                              {s.songs.map((song, j) => (
                                <li key={j} className="flex items-center gap-2 text-sm font-garamond text-muted-foreground">
                                  <span className="text-primary/60 font-cinzel text-xs w-6 text-right flex-shrink-0">
                                    {String(j + 1).padStart(2, '0')}
                                  </span>
                                  <span className={song.includes("(Encore)") ? "text-primary/80 italic" : ""}>
                                    {song}
                                  </span>
                                </li>
                              ))}
                            </ol>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SetlistPage;
