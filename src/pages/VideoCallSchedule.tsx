import { motion } from "framer-motion";
import vcPoster from "@/assets/another/vc-feb-poster.jpg";

const ENABLE_SCHEDULE = false;

const videoCallSchedules = [
  {
    date: "Kamis, 12 Februari 2026",
    sessions: [
      { label: "Sesi 1", time: "16.30 – 17.30" },
      { label: "Sesi 2", time: "18.00 – 19.00" },
      { label: "Sesi 3", time: "19.30 – 20.30" },
    ],
  },
  {
    date: "Kamis, 26 Februari 2026",
    sessions: [
      { label: "Sesi 1", time: "15.15 – 16.15" },
      { label: "Sesi 2", time: "16.45 – 17.45" },
      { label: "Sesi 3", time: "19.00 – 20.00" },
    ],
  },
];

const VideoCallSchedulePage = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <div className="absolute inset-0 gradient-purple-dark" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 flex items-center justify-center h-full"
        >
          <h1 className="text-2xl md:text-4xl font-cinzel font-bold uppercase tracking-[0.15em] gradient-gold-text">
            Jadwal Video Call
          </h1>
        </motion.div>
      </div>

      {!ENABLE_SCHEDULE ? (
        <div className="max-w-4xl mx-auto px-4 mt-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl border border-border bg-card py-24 text-center shadow-lg"
          >
            <h2 className="text-xl md:text-2xl font-cinzel text-foreground">
              Belum ada jadwal video call
            </h2>
          </motion.div>
        </div>
      ) : (

        <div className="max-w-6xl mx-auto px-4 mt-6 pb-16">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Schedule List */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex-1 rounded-2xl border border-border bg-card p-6 md:p-8 shadow-lg"
            >
              {videoCallSchedules.map((schedule, idx) => (
                <div key={idx} className={idx > 0 ? "mt-8" : ""}>
                  <h2 className="text-xl md:text-2xl font-cinzel font-bold text-foreground mb-1">
                    {schedule.date}
                  </h2>

                  <div className="w-full h-px bg-gradient-to-r from-primary/60 via-primary/30 to-transparent mb-4" />

                  <div className="space-y-3">
                    {schedule.sessions.map((session, sIdx) => (
                      <div
                        key={sIdx}
                        className="rounded-lg bg-muted px-5 py-3.5 text-foreground font-garamond text-base md:text-lg"
                      >
                        {session.label}: {session.time}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Poster */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:w-[380px] flex-shrink-0"
            >
              <div className="rounded-2xl border border-border bg-card p-3 shadow-lg sticky top-24">
                <img
                  src={vcPoster}
                  alt="Poster Video Call Erine"
                  className="w-full rounded-xl object-cover"
                />
              </div>
            </motion.div>

          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCallSchedulePage;