import { motion } from "framer-motion";

const videos = [
  { id: "117NSb42azE", title: "Oh my pumpkin! - Behind The Scenes", channel: "JKT48" },
  { id: "2rGeXz9IVfA", title: "[MV] Oh my pumpkin! - JKT48", channel: "JKT48" },
  { id: "V5t-MdoYhJM", title: "GO AND FIGHT! - JKT48 Special Performance Video", channel: "JKT48" },
  { id: "YQA_2D11IVw", title: "Selamat Hari Raya Idul Fitri 1 Syawal 1446 Hijriah", channel: "JKT48" },
  { id: "brOaB1BCrbY", title: "SELAMAT TAHUN BARU 2025!🎉", channel: "JKT48" },
  { id: "0rQc30BUCUM", title: "Fritzy Rosmerian (Trainee) - Pemilihan Member Single ke-26 JKT48", channel: "JKT48" },
  { id: "l7UGgGPAq4M", title: "[MV BEHIND THE SCENE] Belalang yang Membangkang - JKT48 Trainee", channel: "JKT48" },
  { id: "Ztg79dr34n4", title: "[MV] Belalang yang Membangkang - JKT48 Trainee", channel: "JKT48" },
  { id: "-YD1JdpnH2Y", title: "HAPPY NEW YEAR 2024!", channel: "JKT48" },
  { id: "jDHfbFuG3b4", title: "JKT48 12th Generation Profile: Fritzy", channel: "JKT48 TV" },
  { id: "FgSr-tSxRiA", title: "[SECRET CAM] JKT48 THE FIRST SNOW", channel: "JKT48 TV" },
  { id: "BtNC1SCC-XM", title: "[CEKIDOT] MEREKA LEBIH SUKA YANG MANA YA?", channel: "JKT48 TV" },
  { id: "Zt41KYWMQh8", title: "[BEHIND THE SCENES] JKT48 & AKB48 PERSONAL MEET AND GREET FESTIVAL \"SISTER REUNION\"", channel: "JKT48 TV" },
  { id: "9a2Z4eYOn7w", title: "[SECRET CAM] JKT48 & AKB48 PERSONAL MEET AND GREET FESTIVAL \"SISTER REUNION\"", channel: "JKT48 TV" },
  { id: "pSnxMAHTspk", title: "[WARTAK S2] ABRACADABRA... DUNIA MU AKAN BERUBAH!!", channel: "JKT48 TV" },
  { id: "YDrgG9Nkz1k", title: "The Journey of JKT48 ALL IN TOUR 2025 - Semarang, Cimahi, Yogyakarta, Solo & Surabaya", channel: "JKT48 TV" },
  { id: "538poibFOv8", title: "[CEKIDOT] MENUNTASKAN MISI BERSAMA", channel: "JKT48 TV" },
  { id: "zvjExiYwaxA", title: "[SEKOLAH JKT48] SIAPA MEMBER PALING JAGO JUMPSHOT?", channel: "JKT48 TV" },
  { id: "TKvwxi6zVh8", title: "[SEKOLAH JKT48] AKIBAT DAMAGE 43, MEMBER HARUS BELAJAR!", channel: "JKT48 TV" },
  { id: "iRKECqYMIgo", title: "[BEHIND THE SCENE] JKT48 SPECIAL PERFORMANCE VIDEO GO AND FIGHT!", channel: "JKT48 TV" },
  { id: "0bsBoNLKj70", title: "JKT48 RAMADAN SPECIAL SHOW 2025", channel: "JKT48 TV" },
  { id: "NiDen1GrWXc", title: "[SAHUR BOWL] Puasa, Takjil, THR, Maksudnya?!", channel: "JKT48 TV" },
  { id: "SzE-sXR253A", title: "[BEHIND THE SCENE] JKT48 26th Single Personal Meet and Greet Festival", channel: "JKT48 TV" },
  { id: "A_oJveTk21Q", title: "[CEKIDOT] TAHUN BARUAN EDISI JOGJA!", channel: "JKT48 TV" },
  { id: "z37JBEos2s4", title: "[SECRET CAM] JKT48 Wonderland - PART 2", channel: "JKT48 TV" },
  { id: "G00KYJ5nSQQ", title: "[SECRET CAM] JKT48 Wonderland - PART 1", channel: "JKT48 TV" },
  { id: "6fqJMH5KPmA", title: "Breakfast Time with Fritzy", channel: "JKT48 TV" },
  { id: "NS4I1MUX-Fk", title: "[BEHIND THE SCENE] Personal Meet and Greet Festival “Road to Sousenkyo 2024”", channel: "JKT48 TV" },
  { id: "qohAAH0OvEs", title: "[BEHIND THE SCENE] JKT48 THEATER 12TH ANNIVERSARY", channel: "JKT48 TV" },
  { id: "FxlMnw36WAw", title: "[MV REACTION] Belalang yang Membangkang - JKT48 Trainee", channel: "JKT48 TV" },
  { id: "jNjmLA9EnKY", title: "[SECRET CAM] SHANI GRADUATION CONCERT \"LAST VOYAGE\"", channel: "JKT48 TV" },
  { id: "-BMYbsT9KLY", title: "SECRET CAM JKT48 12th ANNIVERSARY CONCERT - FLOWERFUL", channel: "JKT48 TV" },
];

const PlaylistPage = () => {
  return (
    <div className="min-h-screen">
      <section className="py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary blur-[200px]" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-6xl font-cinzel font-bold gradient-purple-text mb-4">
            Playlist
          </motion.h1>
          <p className="text-lg text-muted-foreground font-garamond italic">
            A playlist featuring Fritzy's appearances, performances, and special moments in JKT48.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, i) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl shadow-primary/10"
              >
                <div className="aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-foreground font-cinzel text-sm font-bold truncate">{video.title}</h3>
                  <p className="text-muted-foreground text-xs mt-1">{video.channel}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlaylistPage;
