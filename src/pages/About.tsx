import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Twitter, Instagram, X } from "lucide-react";
import fritzyMain from "@/assets/hero/fritzy-main.jpg";
import idnLogo from "@/assets/logo/idn-logo.png";
import showroomLogo from "@/assets/logo/showroom-logo.png";

const bioTable = [
  ["Full Name", "Fritzy Rosmerian"],
  ["Nickname", "Fritzy (フリッツィー)"],
  ["Birthday", "July 28, 2008"],
  ["Hometown", "Jakarta, Indonesia"],
  ["Blood Type", "A"],
  ["Zodiac", "♌︎ Leo"],
  ["Height", "157 cm"],
  ["Joined", "November 18, 2023"],
];

const extraInfo = [
  ["Generation", "12th Generation"],
  ["Status", "Full Member (Promoted May 1, 2025)"],
  ["Special Talent", "Magic Performance"],
  ["Fans Name", "ZyFriends"],
  ["Hashtag", "#BetterWithFritzy"],
];

const hashtags = [
  { tag: "#BetterWithFritzy", desc: "Main support hashtag for Fritzy Rosmerian", url: "https://twitter.com/hashtag/BetterWithFritzy" },
  { tag: "#BaleZyin", desc: "Reply Private Message Fritzy Rosmerian", url: "https://twitter.com/hashtag/BaleZyin" },
  { tag: "#FritzCall", desc: "After Video Call with Fritzy Rosmerian", url: "https://twitter.com/hashtag/FritzCall" },
  { tag: "#FritzDay", desc: "Every Friday is Fritzy Day", url: "https://twitter.com/hashtag/FritzDay" },
  { tag: "#Mornzy", desc: "Ucapan selamat pagi khas Fritzy dan fansnya", url: "https://twitter.com/hashtag/Mornzy" },
  { tag: "#ZyFriends", desc: "Sebutan untuk para fans Fritzy Rosmerian", url: "https://twitter.com/hashtag/ZyFriends" },
  { tag: "#ZyPlay", desc: "Konten Fritzy saat bermain game", url: "https://twitter.com/hashtag/ZyPlay" },
  { tag: "#TheMiraculousRamadan", desc: "Kampanye khusus selama Ramadan 2025", url: "https://twitter.com/hashtag/TheMiraculousRamadan" },
  { tag: "#Motivazy", desc: "Kata-kata motivasi dari Fritzy di pagi hari", url: "https://twitter.com/hashtag/Motivazy" },
  { tag: "#ZyThisDate", desc: "Kenangan Fritzy di tanggal yang sama di tahun sebelumnya", url: "https://twitter.com/hashtag/ZyThisDate" },
  { tag: "#SweetZyDream", desc: "Ucapan selamat malam dari Fritzy", url: "https://twitter.com/hashtag/SweetZyDream" },
  { tag: "#Zyleep", desc: "Hashtag lucu ketika Fritzy tertidur", url: "https://twitter.com/hashtag/Zyleep" },
  { tag: "#MaleZyin", desc: "Momen Fritzy saat sedang iseng atau jail", url: "https://twitter.com/hashtag/MaleZyin" },
  { tag: "#Zymet", desc: "Saat Fritzy tampil ala jamet atau memakai helm", url: "https://twitter.com/hashtag/Zymet" },
  { tag: "#EmoZy", desc: "Fritzy saat emo atau ekspresi emosi yang dramatis", url: "https://twitter.com/hashtag/EmoZy" },
  { tag: "#helptutorpritji", desc: "Saat Fritzy butuh ditutorin", url: "https://twitter.com/hashtag/helptutorpritji" },
  { tag: "#fritzymtk", desc: "Fritzy jago matematika!", url: "https://twitter.com/hashtag/fritzymtk" },
  { tag: "#PramukaZy", desc: "Fritzy tampil dalam seragam pramuka", url: "https://twitter.com/hashtag/PramukaZy" },
  { tag: "#RamuneNoMagician", desc: "Fritzy si magician dengan ciri khas Ramune", url: "https://twitter.com/hashtag/RamuneNoMagician" },
  { tag: "#DSWFRITZY", desc: "Tutorial sulap dari Fritzy", url: "https://twitter.com/hashtag/DSWFRITZY" },
  { tag: "#AwalDariJanji", desc: "Shonichi performance in the Renai Kinshi Jourei setlist", url: "https://twitter.com/hashtag/AwalDariJanji" },
  { tag: "#BirthdayZyShirt", desc: "Fritzy birthday shirts", url: "https://twitter.com/hashtag/BirthdayZyShirt" },
  { tag: "#TogetherAsOneLight", desc: "Shonichi performance in Te wo Tsunaginagara setlist", url: "https://twitter.com/hashtag/TogetherAsOneLight" },
  { tag: "#ChasingNewHorizons", desc: "Documenting Fritzy's journey and achievements", url: "https://twitter.com/hashtag/ChasingNewHorizons" },
  { tag: "#FritzyTale16", desc: "Main hashtag for Birthday Project 2024", url: "https://twitter.com/hashtag/FritzyTale16" },
  { tag: "#FritzyTale17", desc: "Main hashtag for Birthday Project 2025", url: "https://twitter.com/hashtag/FritzyTale17" },
];

const achievements = [
  { title: "Promoted to Full Member", desc: "May 1, 2025 - From trainee to official JKT48 member" },
  { title: "Magic Performance Specialist", desc: "Unique talent bringing magic to JKT48 performances" },
  { title: "Fan Favorite", desc: "Rapidly growing fanbase since debut" },
  { title: "Academic Excellence", desc: "Outstanding student balancing idol career" },
  { title: "Theater Show Regular", desc: "Performed in 60+ theater shows across multiple setlists" },
  { title: "Community Builder", desc: "Inspiring dedicated fanbase \"Fritzy Force\"" },
  { title: "Multi-Setlist Performer", desc: "3 different theater setlists" },
  { title: "Rising Star", desc: "America's Got Talent Fantasy League 2024" },
];

const stats = [
  { value: "65", label: "Theater Shows" },
  { value: "3", label: "Setlists Performance" },
  { value: "1.5+", label: "Years in JKT48" },
  { value: "500+", label: "Dedicated Fans" },
];

const socialLinks = [
  { label: "X (Twitter) - 45.2K", url: "https://twitter.com/RFritzy_JKT48", icon: "x" },
  { label: "Instagram - 89.5K", url: "https://www.instagram.com/jkt48.fritzy.r", icon: "instagram" },
  { label: "Threads - 12.3K", url: "https://www.threads.com/jkt48.fritzy.r", icon: "threads" },
  { label: "TikTok - 156.7K", url: "https://www.tiktok.com/@jkt48.fritzy", icon: "tiktok" },
  { label: "IDN Live - 23.1K", url: "https://www.idn.app/jkt48_fritzy", icon: "idn" },
  { label: "ShowRoom - 18.9K", url: "http://www.showroom-live.com/JKT48_Fritzy", icon: "showroom" },
];

const AboutPage = () => {
  const [showAllHashtags, setShowAllHashtags] = useState(false);
  const displayedHashtags = showAllHashtags ? hashtags : hashtags.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary blur-[200px]" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-6xl font-cinzel font-bold gradient-purple-text mb-4">
            About Fritzy
          </motion.h1>
          <p className="text-lg text-muted-foreground font-garamond italic">
            Member of JKT48 12th Generation
          </p>
        </div>
      </section>

      {/* Profile Section */}
      <section className="py-12">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Bio Table */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex-1">
              <div className="bg-card border border-border rounded-2xl p-8 shadow-xl shadow-primary/10">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                  <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-foreground">Fritzy Rosmerian</h2>
                  <a href="#social" className="self-start px-4 py-1 rounded-full gradient-purple text-primary-foreground text-sm font-cinzel whitespace-nowrap">+ Follow</a>
                </div>
                <p className="text-muted-foreground font-garamond italic mb-6">Japan : フリッツィー</p>

                <table className="w-full">
                  <tbody>
                    {bioTable.map(([label, value]) => (
                      <tr key={label} className="border-b border-border">
                        <td className="py-3 pr-4 font-cinzel text-sm font-semibold text-foreground whitespace-nowrap">{label}</td>
                        <td className="py-3 font-garamond text-muted-foreground">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="mt-6 p-4 bg-secondary rounded-xl">
                  <span className="font-cinzel text-sm font-bold text-foreground">JIKOSHOUKAI</span>
                  <p className="font-garamond italic text-muted-foreground mt-2">
                    Abracadabra! si <span className="checkmate-anim font-bold not-italic">pesulap</span> yang siap membuat hatimu terpikat, halo semuanya it's me Fritzy! Mohon dukungannya!
                  </p>
                </div>

                {/* Social Media */}
                <div id="social" className="mt-6">
                  <p className="font-cinzel text-sm font-bold text-foreground mb-3">FRITZY'S SOCIAL MEDIA</p>
                  <div className="flex flex-wrap gap-3">
                    {socialLinks.map((s) => (
                      <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center w-10 h-10 rounded-full bg-secondary hover:bg-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-110 hover:-translate-y-1" title={s.label}>
                        {s.icon === "x" && <Twitter className="w-5 h-5 text-foreground group-hover:text-primary transition-colors duration-300" />}
                        {s.icon === "instagram" && <Instagram className="w-5 h-5 text-foreground group-hover:text-primary transition-colors duration-300" />}
                        {s.icon === "threads" && (
                          <svg className="w-5 h-5 text-foreground group-hover:text-primary transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.59 12c.025 3.086.718 5.496 2.057 7.164 1.432 1.781 3.632 2.695 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.281 3.263-.86 1.066-2.05 1.672-3.538 1.803-1.131.1-2.233-.1-3.1-.56-.944-.5-1.554-1.267-1.768-2.218-.36-1.612.476-3.122 2.18-3.935.994-.474 2.26-.72 3.763-.733.822 0 1.596.051 2.317.152-.107-.57-.308-1.044-.608-1.412-.44-.54-1.1-.84-1.962-.893-1.658-.101-3.348.39-3.348.39l-.544-1.895s2.092-.614 4.1-.479c1.34.09 2.388.553 3.114 1.382.652.744 1.06 1.727 1.216 2.926.511.122.99.28 1.432.476 1.678.748 2.895 1.87 3.424 3.156.837 2.037.793 5.39-2.09 8.216-2.032 1.99-4.482 2.85-7.71 2.874zM14.5 13.883c-.756 0-1.597.06-2.432.182-1.357.2-2.863.67-2.704 1.385.078.348.357.655.78.862.554.27 1.263.38 2.002.308 1.053-.103 1.882-.53 2.465-1.27.385-.488.664-1.12.85-1.882a9.57 9.57 0 0 0-.961-.085z"/></svg>
                        )}
                        {s.icon === "tiktok" && (
                          <svg className="w-5 h-5 text-foreground group-hover:text-primary transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.28 0 .56.04.82.11v-3.5a6.37 6.37 0 0 0-.82-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.76a8.28 8.28 0 0 0 4.76 1.5v-3.4a4.85 4.85 0 0 1-1-.17z"/></svg>
                        )}
                        {s.icon === "showroom" && <img src={showroomLogo} alt="SHOWROOM" className="w-6 h-6 rounded transition-transform duration-300 group-hover:scale-110" />}
                        {s.icon === "idn" && <img src={idnLogo} alt="IDN" className="w-6 h-6 rounded transition-transform duration-300 group-hover:scale-110" />}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Main photo */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex-1">
              <div className="rounded-2xl overflow-hidden border border-border shadow-xl shadow-primary/10 mb-4">
                <img src={fritzyMain} alt="Fritzy Rosmerian" className="w-full h-[500px] object-cover" />
              </div>
              <p className="text-center mt-3 text-muted-foreground font-garamond">
                See <a href="/gallery" className="text-primary font-bold hover:underline">gallery</a> for more!
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Introduction + Extra Info */}
      <section className="py-12">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex-1">
              <h3 className="text-2xl font-cinzel font-bold gradient-purple-text mb-4">About Fritzy</h3>
              <p className="font-garamond text-lg text-muted-foreground leading-relaxed mb-6">
                Fritzy joined JKT48 as part of the 12th Generation and quickly gained popularity thanks to her unique background. On May 1st, 2025, she was officially promoted from trainee to full member. Her idol persona blends her charm with her magician skills, offering something different to the group.
              </p>

              <table className="w-full bg-card border border-border rounded-xl overflow-hidden">
                <tbody>
                  {extraInfo.map(([label, value]) => (
                    <tr key={label} className="border-b border-border">
                      <td className="py-3 px-4 font-cinzel text-sm font-semibold text-foreground whitespace-nowrap">{label}</td>
                      <td className="py-3 px-4 font-garamond text-muted-foreground">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex-1">
              <h3 className="text-2xl font-cinzel font-bold gradient-purple-text mb-4">Achievements & Milestones</h3>
              <div className="space-y-3 mb-8">
                {achievements.map((a, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="bg-card border border-border rounded-xl px-4 py-3">
                    <span className="text-primary font-cinzel font-bold text-sm">{a.title}</span>
                    <p className="text-muted-foreground font-garamond text-sm mt-1">{a.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 relative">
        <div className="absolute inset-0 gradient-purple-dark opacity-30" />
        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          <div className="flex justify-center gap-8 flex-wrap">
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <span className="text-4xl font-cinzel font-bold text-primary">{s.value}</span>
                <p className="text-sm text-muted-foreground font-garamond">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Hashtags */}
      <section className="py-12">
        <div className="container mx-auto px-6 lg:px-16">
          <h2 className="text-3xl font-cinzel font-bold gradient-purple-text text-center mb-4">Trending Hashtags</h2>
          <p className="text-center text-muted-foreground font-garamond mb-8">Join the conversation and support Fritzy on X</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedHashtags.map((h, i) => (
              <motion.a
                key={h.tag}
                href={h.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="bg-card border border-border rounded-xl p-4 hover:border-primary/50 transition-colors group"
              >
                <span className="text-primary font-cinzel font-bold group-hover:underline">{h.tag}</span>
                <p className="text-xs text-muted-foreground font-garamond mt-1">{h.desc}</p>
              </motion.a>
            ))}
          </div>
          {hashtags.length > 6 && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setShowAllHashtags(!showAllHashtags)}
                className="px-6 py-2 rounded-full border border-primary text-primary font-cinzel text-sm hover:bg-primary/10 transition-colors"
              >
                {showAllHashtags ? "Show Less" : `Show All (${hashtags.length})`}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
