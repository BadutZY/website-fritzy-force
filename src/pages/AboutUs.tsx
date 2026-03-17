import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import logoFF from "@/assets/logo/logo-fritzyforce.png";

import chasingNewHorizons from "@/assets/about/chasing-new-horizons.jpg";
import fritzytale17 from "@/assets/about/fritzytale17.jpg";
import awalDariJanji from "@/assets/about/awal-dari-janji.jpg";
import togetherAsOneLight from "@/assets/about/together-as-one-light.jpg";
import ramadanProject from "@/assets/about/ramadan-project.jpg";
import ramuneNoMagician from "@/assets/about/ramune-no-magician.jpg";
import firstAnniversary from "@/assets/about/1st-anniversary.jpg";
import newMagicalJourney from "@/assets/about/new-magical-journey.jpg";
import fritzytale16 from "@/assets/about/fritzytale16.jpg";

interface Project {
  image: string;
  status: "Ongoing" | "Completed" | "Upcoming";
  title: string;
  desc: string;
  started: string;
  participants: string;
  budget: string;
  details?: string;
}

const projects: Project[] = [
  {
    image: chasingNewHorizons,
    status: "Ongoing",
    title: "Chasing New Horizons",
    desc: "About the courage to go beyond your comfort zone. It's about the spirit to keep moving, learning, and growing to pursue new horizons that may have previously seemed distant or even impossible.",
    started: "Apr 30, 2025",
    participants: "29,3 rb participants",
    budget: "Volunteer-based",
    details: "Chasing New Horizons is a documentation-based project that captures Fritzy's growth and journey in JKT48. This project aims to highlight every milestone, every challenge overcome, and every new horizon Fritzy reaches. Through fan-made content, social media campaigns, and community storytelling, we celebrate the courage it takes to keep pushing forward.",
  },
  {
    image: fritzytale17,
    status: "Completed",
    title: "FritzyTale 17 — AETHERLIGHT💫",
    desc: "Light does not shout. It simply shines, quietly, persistently, until darkness forgets itself",
    started: "Jul 27, 2025",
    participants: "250 participants",
    budget: "Volunteer-based",
    details: "FritzyTale 17 — AETHERLIGHT is the second edition of the annual FritzyTale birthday series. In this 17th edition, the story follows the theme of light and ethereal magic. The project included a special birthday video, fan art compilation, themed merchandise, social media campaign with #FritzyTale17, and a surprise celebration for Fritzy's 17th birthday.",
  },
  {
    image: awalDariJanji,
    status: "Completed",
    title: "Awal Dari Janji",
    desc: "The moment Fritzy and Lana stood on this stage, it was not just the beginning of an ordinary performance, but also the beginning of a promise: to grow together, keep the rule of anti-love with all our hearts, and make this stage a place where hard work and loyalty can grow and bloom.",
    started: "Jun 26, 2025",
    participants: "32,6 rb participants",
    budget: "Collaboration-based",
    details: "Awal Dari Janji was a shonichi celebration project for Fritzy's debut in the Renai Kinshi Jourei setlist. This collaboration-based project united fans to celebrate Fritzy's first performance in this iconic setlist. The project featured a trending Twitter campaign (#AwalDariJanji), fanart contest, and support through digital banners displayed at the theater.",
  },
  {
    image: togetherAsOneLight,
    status: "Completed",
    title: "Together As One Light",
    desc: "We don't need to be the strongest light to shine, because in togetherness, our light becomes irreplaceable. With Fritzy, we learn that true strength grows when different hearts are lit in the same purpose.",
    started: "May 29, 2025",
    participants: "24,4 rb participants",
    budget: "Collaboration-based",
    details: "Together As One Light was a shonichi celebration project for Fritzy's debut in the Te wo Tsunaginagara setlist. The project symbolized unity among fans and their support for Fritzy. Activities included a Twitter space event, fan letter collection, coordinated light-stick support at the theater, and a trending campaign (#TogetherAsOneLight).",
  },
  {
    image: ramadanProject,
    status: "Completed",
    title: "Ramadan Project 2025",
    desc: "Indahnya Ramadan, Indahnya Berbagi! 🌙✨",
    started: "Mar 2, 2025",
    participants: "20 participants",
    budget: "Collaboration-based",
    details: "The Ramadan Project 2025 was a charity initiative during the holy month of Ramadan. Fritzy Force organized donations, iftar meal distributions, and community service activities. The project embodied the spirit of sharing and giving during Ramadan, with Fritzy's message of hope and kindness as its foundation.",
  },
  {
    image: ramuneNoMagician,
    status: "Completed",
    title: "Ramune no Magician",
    desc: "Symbolizing the new magic that comes with the Ramune no Nomikata setlist.",
    started: "Nov 23, 2024",
    participants: "250 participants",
    budget: "Volunteer-based",
    details: "Ramune no Magician was a celebration project for Fritzy's debut in the Cara Meminum Ramune (Ramune no Nomikata) setlist. This project combined Fritzy's magician persona with the Ramune theme, creating unique fan content, themed merchandise concepts, and a social media celebration campaign.",
  },
  {
    image: firstAnniversary,
    status: "Completed",
    title: "1st Anniversary Fritzy Force",
    desc: "A Year of Lustre: Reflecting on Beauty",
    started: "Nov 17, 2024",
    participants: "10,8 rb participants",
    budget: "Volunteer-based",
    details: "The 1st Anniversary of Fritzy Force celebrated one year since the fanbase was established. The project featured a retrospective video, fan testimonials, statistics of the community's growth, and a special anniversary event. It was a moment to reflect on the beauty of the journey and the bonds formed within the community.",
  },
  {
    image: newMagicalJourney,
    status: "Completed",
    title: "New Magical Journey",
    desc: "I can't do it alone. With your help, support, and encouragement, I believe nothing is impossible. Let's embark on this magical journey together!",
    started: "Sep 6, 2024",
    participants: "25 rb participants",
    budget: "Volunteer-based",
    details: "New Magical Journey was a support campaign project to rally fans behind Fritzy during the JKT48 Sousenkyo (General Election). The project included voting guides, fundraising campaigns, promotional materials, and a massive social media campaign to help Fritzy achieve the best possible ranking.",
  },
  {
    image: fritzytale16,
    status: "Completed",
    title: "FritzyTale 16 — PROSDOKÍA",
    desc: "This story is part of the annual FritzyTale series, depicting Fritzy's birthday in the form of a magical and symbolic narrative. In this 16th edition, Fritzy is depicted as a young Magician who gets lost in Prosdoche Town, a town where everyone loses the ability to hope.",
    started: "Jul 27, 2024",
    participants: "250 participants",
    budget: "Volunteer-based",
    details: "FritzyTale 16 — PROSDOKÍA is the first edition of the annual FritzyTale birthday series. The story follows Fritzy as a young Magician who arrives in Prosdoche Town—a place where hope has been lost. Through her magic and determination, Fritzy discovers the power to revive hope in the townspeople. The project included a full illustrated story, animated video, special birthday merchandise, and a celebration event.",
  },
];

const impactStats = [
  { value: "8+", label: "Total Projects" },
  { value: "1", label: "Active Projects" },
  { value: "10 rb", label: "Community Reach" },
  { value: "10+", label: "Events Supported" },
];

const aboutStats = [
  { value: "2023", label: "Since" },
  { value: "186+", label: "Members" },
  { value: "8+", label: "Project" },
];

// ─── useScrollLock hook ───────────────────────────────────────────────────────
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
// ─────────────────────────────────────────────────────────────────────────────

const AboutUsPage = () => {
  const [filter, setFilter] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useScrollLock(!!selectedProject);

  const filteredProjects = filter === "all"
    ? projects
    : projects.filter((p) => p.status.toLowerCase() === filter);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary blur-[200px]" />
        </div>
        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-purple mb-6 shadow-lg shadow-primary/30"
              >
                <img src={logoFF} alt="Fritzy Force Logo" className="w-16 h-16 object-contain" />
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-cinzel font-bold gradient-purple-text mb-4"
              >
                About Fritzy Force
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg font-garamond text-muted-foreground leading-relaxed mb-6"
              >
                Fritzy Force adalah fanbase resmi dari Fritzy Rosmerian, member JKT48 Generation 12.
                Kami hadir untuk mendukung perjalanan dan karier Fritzy di dunia hiburan.
              </motion.p>
              <div className="flex gap-8 justify-center lg:justify-start">
                {aboutStats.map((s, i) => (
                  <div key={i} className="text-center">
                    <span className="text-3xl font-cinzel font-bold text-primary">{s.value}</span>
                    <p className="text-xs text-muted-foreground font-garamond">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 rounded-full gradient-purple opacity-20 blur-3xl absolute inset-0 m-auto" />
                <img src={logoFF} alt="Fritzy Force" className="relative z-10 w-56 h-56 object-contain drop-shadow-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-12">
        <div className="container mx-auto px-6 lg:px-16">
          <h2 className="text-3xl font-cinzel font-bold gradient-purple-text text-center mb-3">Our Projects</h2>
          <p className="text-center text-muted-foreground font-garamond mb-8">
            Fan projects and initiatives by Fritzy Force to support Fritzy's journey
          </p>

          {/* Filter */}
          <div className="flex justify-center gap-3 mb-8 flex-wrap">
            {["all", "ongoing", "completed", "upcoming"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-full font-cinzel text-sm capitalize transition-all ${
                  filter === f
                    ? "gradient-purple text-primary-foreground shadow-lg shadow-primary/30"
                    : "bg-secondary text-secondary-foreground hover:bg-accent"
                }`}
              >
                {f === "all" ? "All Projects" : f}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-colors group flex flex-col"
              >
                <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                <div className="p-5 flex flex-col flex-1">
                  <span
                    className={`text-xs font-cinzel font-bold px-2 py-1 rounded-full self-start ${
                      project.status === "Ongoing"
                        ? "bg-green-500/20 text-green-400"
                        : project.status === "Completed"
                        ? "bg-primary/20 text-primary"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {project.status}
                  </span>
                  <h3 className="text-lg font-cinzel font-bold text-foreground mt-3 mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-garamond text-sm text-muted-foreground line-clamp-3 mb-3">{project.desc}</p>
                  <div className="space-y-1 text-xs text-muted-foreground font-garamond mb-4">
                    <p>📅 Started: {project.started}</p>
                    <p>👥 {project.participants}</p>
                    <p>💰 Budget: {project.budget}</p>
                  </div>
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="mt-auto w-full py-2 rounded-lg border border-primary text-primary font-cinzel text-sm hover:bg-primary/10 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-12 relative">
        <div className="absolute inset-0 gradient-purple-dark opacity-30" />
        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          <h3 className="text-2xl font-cinzel font-bold gradient-purple-text mb-6 text-center">Our Impact for Fritzy</h3>
          <p className="text-center text-muted-foreground font-garamond mb-8">
            Fritzy Force has been actively supporting Fritzy through various creative projects, community initiatives, and promotional activities since her debut in JKT48.
          </p>
          <div className="flex justify-center gap-8 flex-wrap">
            {impactStats.map((s, i) => (
              <div key={i} className="text-center">
                <span className="text-4xl font-cinzel font-bold text-primary">{s.value}</span>
                <p className="text-sm text-muted-foreground font-garamond">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section className="py-12">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="bg-card border border-border rounded-2xl p-8 text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-cinzel font-bold gradient-purple-text mb-4">Join Fritzy Force</h3>
            <p className="font-garamond text-muted-foreground mb-6">
              Become part of our growing community and get exclusive updates, event information, and opportunities to support Fritzy!
            </p>
            <div className="w-full rounded-xl overflow-hidden border border-border">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSd6pA6dOgtObCXmenX5TZLliZJ-06VSb7tai8odLACXyFRWUg/viewform?embedded=true"
                width="100%"
                height="600"
                className="border-0 bg-background"
                title="Join Fritzy Force Form"
              >
                Loading…
              </iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-lg w-full bg-card rounded-2xl overflow-hidden border border-border shadow-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-background/80 backdrop-blur flex items-center justify-center text-foreground hover:bg-background transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full object-contain max-h-[50vh]"
              />
              <div className="p-6">
                <span
                  className={`text-xs font-cinzel font-bold px-2 py-1 rounded-full ${
                    selectedProject.status === "Ongoing"
                      ? "bg-green-500/20 text-green-400"
                      : selectedProject.status === "Completed"
                      ? "bg-primary/20 text-primary"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {selectedProject.status}
                </span>
                <h4 className="font-cinzel font-bold text-xl text-foreground mt-3 mb-3">{selectedProject.title}</h4>
                <div className="space-y-1 text-sm text-muted-foreground font-garamond mb-4">
                  <p>📅 Started: {selectedProject.started}</p>
                  <p>👥 {selectedProject.participants}</p>
                  <p>💰 Budget: {selectedProject.budget}</p>
                </div>
                <p className="font-garamond text-muted-foreground leading-relaxed">
                  {selectedProject.details || selectedProject.desc}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AboutUsPage;