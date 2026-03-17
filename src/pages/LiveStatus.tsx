import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import fritzyProfile from "@/assets/timeline/joined-jkt48.jpg"

const IDN_USERNAME = "jkt48_cathy";
const SHOWROOM_KEY = "48_KOKOHA_FUJINO";
const DISPLAY_NAME = "Fritzy Rosmerian";
const FOLLOWERS = "181.8K";
const FOLLOWING = "0";

type PlatformStatus = {
  isLive: boolean;
  isChecking: boolean;
  lastChecked: string | null;
};

const LiveStatusPage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [idn, setIdn] = useState<PlatformStatus>({ isLive: false, isChecking: true, lastChecked: null });
  const [showroom, setShowroom] = useState<PlatformStatus>({ isLive: false, isChecking: true, lastChecked: null });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const checkIdnStatus = useCallback(async () => {
    setIdn(prev => ({ ...prev, isChecking: true }));
    try {
      const { data, error } = await supabase.functions.invoke('check-idn-live', {
        body: { username: IDN_USERNAME },
      });
      if (error) throw error;
      setIdn({ isLive: data?.is_live ?? false, isChecking: false, lastChecked: data?.checked_at ?? new Date().toISOString() });
    } catch (err) {
      console.error('Failed to check IDN live status:', err);
      setIdn(prev => ({ ...prev, isLive: false, isChecking: false }));
    }
  }, []);

  const checkShowroomStatus = useCallback(async () => {
    setShowroom(prev => ({ ...prev, isChecking: true }));
    try {
      const { data, error } = await supabase.functions.invoke('check-showroom-live', {
        body: { room_url_key: SHOWROOM_KEY },
      });
      if (error) throw error;
      setShowroom({ isLive: data?.is_live ?? false, isChecking: false, lastChecked: data?.checked_at ?? new Date().toISOString() });
    } catch (err) {
      console.error('Failed to check Showroom live status:', err);
      setShowroom(prev => ({ ...prev, isLive: false, isChecking: false }));
    }
  }, []);

  useEffect(() => {
    checkIdnStatus();
    checkShowroomStatus();
  }, [checkIdnStatus, checkShowroomStatus]);

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${day}/${month}/${year}, ${hours}.${minutes}.${seconds}`;
  };

  const isAnyLive = idn.isLive || showroom.isLive;
  const idnProfileUrl = `https://www.idn.app/${IDN_USERNAME}`;
  const showroomProfileUrl = `https://www.showroom-live.com/r/${SHOWROOM_KEY}`;

  return (
    <div className="min-h-screen">
      {/* Header Banner */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <div className="absolute inset-0 gradient-purple-dark" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 flex items-center justify-center h-full"
        >
          <h1 className="text-3xl md:text-5xl font-cinzel font-bold gradient-purple-text">
            Live Status
          </h1>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 mt-6 pb-16">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-border bg-card p-6 shadow-lg"
        >
          {/* Mobile layout */}
          <div className="flex flex-col gap-4 md:hidden">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 relative">
                <div className={`w-16 h-16 rounded-full overflow-hidden border-4 ${isAnyLive ? 'border-red-500' : 'border-border'} transition-colors`}>
                  <img src={fritzyProfile} alt={DISPLAY_NAME} className="w-full h-full object-cover" />
                </div>
                {isAnyLive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                    LIVE
                  </span>
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-base font-cinzel font-bold text-foreground uppercase tracking-wide">
                  {DISPLAY_NAME}
                </h2>
                <p className="text-xs text-muted-foreground font-garamond mt-0.5">
                  {formatDate(currentTime)}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-6 pt-2 border-t border-border">
              <div className="text-center">
                <p className="text-lg font-bold text-foreground">{FOLLOWING}</p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Following</p>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <p className="text-lg font-bold text-foreground">{FOLLOWERS}</p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Followers</p>
              </div>
            </div>
          </div>

          {/* Desktop layout */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex-shrink-0 relative">
              <div className={`w-20 h-20 rounded-full overflow-hidden border-4 ${isAnyLive ? 'border-red-500' : 'border-border'} transition-colors`}>
                <img src={fritzyProfile} alt={DISPLAY_NAME} className="w-full h-full object-cover" />
              </div>
              {isAnyLive && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-red-500 text-white text-xs font-bold px-3 py-0.5 rounded-full animate-pulse">
                  LIVE
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-cinzel font-bold text-foreground uppercase tracking-wide truncate">
                {DISPLAY_NAME}
              </h2>
              <p className="text-sm text-muted-foreground font-garamond mt-0.5">
                {formatDate(currentTime)}
              </p>
            </div>
            <div className="flex items-center gap-6 flex-shrink-0">
              <div className="text-center">
                <p className="text-xl font-bold text-foreground">{FOLLOWING}</p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Following</p>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <p className="text-xl font-bold text-foreground">{FOLLOWERS}</p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Followers</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Platform Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {/* IDN Live Status */}
          <PlatformCard
            platformName="IDN Live"
            status={idn}
            displayName={DISPLAY_NAME}
            profileUrl={idnProfileUrl}
            watchUrl={idnProfileUrl}
            delay={0.4}
          />

          {/* Showroom Status */}
          <PlatformCard
            platformName="Showroom"
            status={showroom}
            displayName={DISPLAY_NAME}
            profileUrl={showroomProfileUrl}
            watchUrl={showroomProfileUrl}
            delay={0.5}
          />
        </div>
      </div>
    </div>
  );
};

const PlatformCard = ({
  platformName,
  status,
  displayName,
  profileUrl,
  watchUrl,
  delay,
}: {
  platformName: string;
  status: PlatformStatus;
  displayName: string;
  profileUrl: string;
  watchUrl: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="rounded-2xl border border-border bg-card p-5 shadow-lg flex flex-col"
  >
    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3 text-center">
      {platformName}
    </h3>

    {status.isChecking ? (
      <div className="flex items-center justify-center gap-3 py-4 flex-1">
        <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-muted-foreground font-garamond">Memuat...</p>
      </div>
    ) : status.isLive ? (
      <div className="text-center py-3 flex-1 flex flex-col justify-center">
        <div className="inline-flex items-center gap-2 bg-red-500/20 text-red-400 px-4 py-2 rounded-full mb-3 mx-auto">
          <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          <span className="font-semibold text-sm">Sedang LIVE</span>
        </div>
        <p className="text-foreground font-garamond text-sm mb-4">
          {displayName} sedang live di {platformName}!
        </p>
        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-primary/90 transition-colors mx-auto"
        >
          Tonton Sekarang
        </a>
      </div>
    ) : (
      <div className="text-center py-3 flex-1 flex flex-col justify-center">
        <div className="inline-flex items-center gap-2 bg-muted text-muted-foreground px-4 py-2 rounded-full mb-3 mx-auto">
          <span className="w-3 h-3 bg-muted-foreground rounded-full" />
          <span className="font-semibold text-sm">Tidak Live</span>
        </div>
        <p className="text-muted-foreground font-garamond text-sm mb-4">
          Tidak sedang live di {platformName}.
        </p>
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-muted transition-colors mx-auto"
        >
          Kunjungi Profil {platformName}
        </a>
      </div>
    )}
  </motion.div>
);

export default LiveStatusPage;
