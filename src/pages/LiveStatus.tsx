import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import fritzyProfile from "@/assets/timeline/joined-jkt48.jpg";

const IDN_USERNAME = "jkt48_fritzy";
const SHOWROOM_KEY = "JKT48_Fritzy";
const DISPLAY_NAME = "Fritzy Rosmerian";
const FOLLOWERS = "182.1K";
const FOLLOWING = "0";

type PlatformStatus = {
  isLive: boolean;
  isChecking: boolean;
  lastChecked: string | null;
  liveUrl: string | null;
  streamUrl: string | null;
  slug: string | null;
};

const HlsPlayer = ({
  streamUrl,
  liveRoomUrl,
  platformName,
  onClose,
  onRefresh,
}: {
  streamUrl: string;
  liveRoomUrl: string;
  platformName: string;
  onClose: () => void;
  onRefresh: () => Promise<string | null>;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<any>(null);
  const [playerState, setPlayerState] = useState<"loading" | "playing" | "error" | "refreshing">("loading");
  const [errorMsg, setErrorMsg] = useState("");

  const loadStream = useCallback(async (url: string) => {
    const video = videoRef.current;
    if (!video) return;
    setPlayerState("loading");

    // Safari / iOS: support HLS native
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = url;
      video.play().catch(() => {});
      setPlayerState("playing");
      return;
    }

    try {
      const { default: Hls } = await import("hls.js");

      if (!Hls.isSupported()) {
        setErrorMsg("Browser tidak mendukung HLS playback.");
        setPlayerState("error");
        return;
      }

      if (hlsRef.current) hlsRef.current.destroy();

      const hls = new Hls({ enableWorker: true, lowLatencyMode: true, backBufferLength: 90 });
      hlsRef.current = hls;

      hls.loadSource(url);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
        setPlayerState("playing");
      });

      hls.on(Hls.Events.ERROR, (_: any, data: any) => {
        if (data.fatal) {
          setErrorMsg(
            data.type === "networkError"
              ? "Stream tidak dapat dimuat. Token mungkin sudah expire."
              : "Terjadi kesalahan saat memutar stream."
          );
          setPlayerState("error");
        }
      });
    } catch {
      setErrorMsg("Gagal memuat HLS player. Pastikan hls.js sudah terinstall.");
      setPlayerState("error");
    }
  }, []);

  useEffect(() => {
    loadStream(streamUrl);
    return () => { if (hlsRef.current) { hlsRef.current.destroy(); hlsRef.current = null; } };
  }, [streamUrl, loadStream]);

  const handleRefresh = useCallback(async () => {
    setPlayerState("refreshing");
    const newUrl = await onRefresh();
    if (newUrl) {
      await loadStream(newUrl);
    } else {
      setErrorMsg("Gagal refresh stream. Coba buka langsung di platform.");
      setPlayerState("error");
    }
  }, [onRefresh, loadStream]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4"
      >
        {/* Header */}
        <div className="w-full max-w-2xl flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
            <span className="text-white font-semibold text-sm">
              Live {platformName}
            </span>
          </div>
          <div className="flex gap-2">
            <a href={liveRoomUrl} target="_blank" rel="noopener noreferrer"
              className="text-xs text-white/60 hover:text-white border border-white/20 px-3 py-1.5 rounded-full transition-colors">
              Buka di {platformName} ↗
            </a>
            <button onClick={onClose}
              className="text-xs text-white/60 hover:text-white border border-white/20 px-3 py-1.5 rounded-full transition-colors">
              ✕
            </button>
          </div>
        </div>

        {/* Video */}
        <div className="w-full max-w-2xl aspect-video bg-black rounded-xl overflow-hidden relative">
          <video ref={videoRef} className="w-full h-full" controls autoPlay playsInline />

          {(playerState === "loading" || playerState === "refreshing") && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70">
              <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mb-3" />
              <p className="text-white/70 text-sm">
                {playerState === "refreshing" ? "Refresh stream..." : "Memuat stream..."}
              </p>
            </div>
          )}

          {playerState === "error" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 p-6 text-center">
              <p className="text-red-400 font-semibold mb-2">⚠ Stream Error</p>
              <p className="text-white/60 text-sm mb-5">{errorMsg}</p>
              <div className="flex gap-3 flex-wrap justify-center">
                <button onClick={handleRefresh}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors">
                  Refresh Stream
                </button>
                <a href={liveRoomUrl} target="_blank" rel="noopener noreferrer"
                  className="border border-white/30 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-white/10 transition-colors">
                  Buka di {platformName} ↗
                </a>
              </div>
            </div>
          )}
        </div>

        <p className="text-white/30 text-xs mt-3 text-center max-w-md">
          Stream langsung dari {platformName}. Jika tidak bisa diputar tekan "Refresh Stream"
          atau buka langsung di {platformName}.
        </p>
      </motion.div>
    </AnimatePresence>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const LiveStatusPage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [idn, setIdn] = useState<PlatformStatus>({
    isLive: false, isChecking: true, lastChecked: null, liveUrl: null, streamUrl: null, slug: null,
  });
  const [showroom, setShowroom] = useState<PlatformStatus>({
    isLive: false, isChecking: true, lastChecked: null, liveUrl: null, streamUrl: null, slug: null,
  });

  // Player state
  const [activePlayer, setActivePlayer] = useState<null | "idn" | "showroom">(null);
  const [activeStreamUrl, setActiveStreamUrl] = useState<string | null>(null);
  const [isLoadingStream, setIsLoadingStream] = useState<"idn" | "showroom" | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // ── Check IDN status ────────────────────────────────────────────────────────
  const checkIdnStatus = useCallback(async () => {
    setIdn(prev => ({ ...prev, isChecking: true }));
    try {
      const { data, error } = await supabase.functions.invoke('check-idn-live', {
        body: { username: IDN_USERNAME },
      });
      if (error) throw error;
      const slugMatch = data?.live_url?.match(/\/live\/([\w-]+)/);
      setIdn({
        isLive: data?.is_live ?? false,
        isChecking: false,
        lastChecked: data?.checked_at ?? new Date().toISOString(),
        liveUrl: data?.live_url ?? `https://www.idn.app/${IDN_USERNAME}`,
        streamUrl: data?.stream_url ?? null,
        slug: slugMatch ? slugMatch[1] : null,
      });
    } catch (err) {
      console.error('Failed to check IDN live status:', err);
      setIdn(prev => ({ ...prev, isLive: false, isChecking: false }));
    }
  }, []);

  // ── Check Showroom status ───────────────────────────────────────────────────
  const checkShowroomStatus = useCallback(async () => {
    setShowroom(prev => ({ ...prev, isChecking: true }));
    try {
      const { data, error } = await supabase.functions.invoke('check-showroom-live', {
        body: { room_url_key: SHOWROOM_KEY },
      });
      if (error) throw error;
      setShowroom({
        isLive: data?.is_live ?? false,
        isChecking: false,
        lastChecked: data?.checked_at ?? new Date().toISOString(),
        liveUrl: `https://www.showroom-live.com/r/${SHOWROOM_KEY}`,
        streamUrl: data?.stream_url ?? null,  // <-- langsung dari API Showroom
        slug: null,
      });
    } catch (err) {
      console.error('Failed to check Showroom live status:', err);
      setShowroom(prev => ({ ...prev, isLive: false, isChecking: false }));
    }
  }, []);

  useEffect(() => {
    checkIdnStatus();
    checkShowroomStatus();
  }, [checkIdnStatus, checkShowroomStatus]);

  // ── Buka IDN Player ─────────────────────────────────────────────────────────
  const handleWatchIDN = useCallback(async () => {
    if (idn.streamUrl) {
      setActiveStreamUrl(idn.streamUrl);
      setActivePlayer("idn");
      return;
    }
    if (idn.slug) {
      setIsLoadingStream("idn");
      try {
        const { data, error } = await supabase.functions.invoke('get-idn-stream', {
          body: { username: IDN_USERNAME, slug: idn.slug },
        });
        if (!error && data?.stream_url) {
          setActiveStreamUrl(data.stream_url);
          setActivePlayer("idn");
        } else {
          window.open(idn.liveUrl ?? `https://www.idn.app/${IDN_USERNAME}`, '_blank');
        }
      } catch {
        window.open(idn.liveUrl ?? `https://www.idn.app/${IDN_USERNAME}`, '_blank');
      } finally {
        setIsLoadingStream(null);
      }
      return;
    }
    window.open(idn.liveUrl ?? `https://www.idn.app/${IDN_USERNAME}`, '_blank');
  }, [idn]);

  // Refresh IDN stream (dipanggil dari HlsPlayer saat error)
  const handleRefreshIDN = useCallback(async (): Promise<string | null> => {
    if (!idn.slug) return null;
    try {
      const { data, error } = await supabase.functions.invoke('get-idn-stream', {
        body: { username: IDN_USERNAME, slug: idn.slug },
      });
      return (!error && data?.stream_url) ? data.stream_url : null;
    } catch { return null; }
  }, [idn.slug]);

  // ── Buka Showroom Player ────────────────────────────────────────────────────
  const handleWatchShowroom = useCallback(async () => {
    if (showroom.streamUrl) {
      setActiveStreamUrl(showroom.streamUrl);
      setActivePlayer("showroom");
      return;
    }
    // Tidak ada stream_url → re-check untuk dapat stream terbaru
    setIsLoadingStream("showroom");
    try {
      const { data, error } = await supabase.functions.invoke('check-showroom-live', {
        body: { room_url_key: SHOWROOM_KEY },
      });
      if (!error && data?.stream_url) {
        setShowroom(prev => ({ ...prev, streamUrl: data.stream_url }));
        setActiveStreamUrl(data.stream_url);
        setActivePlayer("showroom");
      } else {
        window.open(`https://www.showroom-live.com/r/${SHOWROOM_KEY}`, '_blank');
      }
    } catch {
      window.open(`https://www.showroom-live.com/r/${SHOWROOM_KEY}`, '_blank');
    } finally {
      setIsLoadingStream(null);
    }
  }, [showroom.streamUrl]);

  // Refresh Showroom stream (dipanggil dari HlsPlayer saat error)
  const handleRefreshShowroom = useCallback(async (): Promise<string | null> => {
    try {
      const { data, error } = await supabase.functions.invoke('check-showroom-live', {
        body: { room_url_key: SHOWROOM_KEY },
      });
      return (!error && data?.stream_url) ? data.stream_url : null;
    } catch { return null; }
  }, []);

  const formatDate = (date: Date) => {
    const d = date.getDate(), mo = date.getMonth() + 1, y = date.getFullYear();
    const h = String(date.getHours()).padStart(2, "0");
    const m = String(date.getMinutes()).padStart(2, "0");
    const s = String(date.getSeconds()).padStart(2, "0");
    return `${d}/${mo}/${y}, ${h}.${m}.${s}`;
  };

  const isAnyLive = idn.isLive || showroom.isLive;
  const idnProfileUrl = `https://www.idn.app/${IDN_USERNAME}`;
  const showroomProfileUrl = `https://www.showroom-live.com/r/${SHOWROOM_KEY}`;

  return (
    <div className="min-h-screen">

      {/* ── HLS Player Modal ── */}
      {activePlayer === "idn" && activeStreamUrl && (
        <HlsPlayer
          streamUrl={activeStreamUrl}
          liveRoomUrl={idn.liveUrl ?? idnProfileUrl}
          platformName="IDN Live"
          onClose={() => { setActivePlayer(null); setActiveStreamUrl(null); }}
          onRefresh={handleRefreshIDN}
        />
      )}
      {activePlayer === "showroom" && activeStreamUrl && (
        <HlsPlayer
          streamUrl={activeStreamUrl}
          liveRoomUrl={showroom.liveUrl ?? showroomProfileUrl}
          platformName="Showroom"
          onClose={() => { setActivePlayer(null); setActiveStreamUrl(null); }}
          onRefresh={handleRefreshShowroom}
        />
      )}

      {/* Header Banner */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <div className="absolute inset-0 gradient-purple-dark" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-3xl md:text-5xl font-cinzel font-bold gradient-purple-text">
            Live Status
          </h1>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 mt-6 pb-16">

        {/* Profile Card */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-border bg-card p-6 shadow-lg">

          {/* Mobile */}
          <div className="flex flex-col gap-4 md:hidden">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 relative">
                <div className={`w-16 h-16 rounded-full overflow-hidden border-4 ${isAnyLive ? 'border-red-500' : 'border-border'} transition-colors`}>
                  <img src={fritzyProfile} alt={DISPLAY_NAME} className="w-full h-full object-cover" />
                </div>
                {isAnyLive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">LIVE</span>
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-base font-cinzel font-bold text-foreground uppercase tracking-wide">{DISPLAY_NAME}</h2>
                <p className="text-xs text-muted-foreground font-garamond mt-0.5">{formatDate(currentTime)}</p>
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

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex-shrink-0 relative">
              <div className={`w-20 h-20 rounded-full overflow-hidden border-4 ${isAnyLive ? 'border-red-500' : 'border-border'} transition-colors`}>
                <img src={fritzyProfile} alt={DISPLAY_NAME} className="w-full h-full object-cover" />
              </div>
              {isAnyLive && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-red-500 text-white text-xs font-bold px-3 py-0.5 rounded-full animate-pulse">LIVE</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-cinzel font-bold text-foreground uppercase tracking-wide truncate">{DISPLAY_NAME}</h2>
              <p className="text-sm text-muted-foreground font-garamond mt-0.5">{formatDate(currentTime)}</p>
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

          {/* ── IDN Live Card ── */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-2xl border border-border bg-card p-5 shadow-lg flex flex-col">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3 text-center">IDN Live</h3>

            {idn.isChecking ? (
              <div className="flex items-center justify-center gap-3 py-4 flex-1">
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-muted-foreground font-garamond">Memuat...</p>
              </div>
            ) : idn.isLive ? (
              <div className="text-center py-3 flex-1 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 bg-red-500/20 text-red-400 px-4 py-2 rounded-full mb-3 mx-auto">
                  <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  <span className="font-semibold text-sm">Sedang LIVE</span>
                </div>
                <p className="text-foreground font-garamond text-sm mb-4">{DISPLAY_NAME} sedang live di IDN Live!</p>
                <div className="flex flex-col gap-2 items-center">
                  <button onClick={handleWatchIDN} disabled={isLoadingStream === "idn"}
                    className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-60 w-full max-w-[200px]">
                    {isLoadingStream === "idn" ? (
                      <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Memuat...</>
                    ) : "▶ Tonton Sekarang"}
                  </button>
                  <a href={idn.liveUrl ?? idnProfileUrl} target="_blank" rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    Buka di IDN ↗
                  </a>
                </div>
              </div>
            ) : (
              <div className="text-center py-3 flex-1 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 bg-muted text-muted-foreground px-4 py-2 rounded-full mb-3 mx-auto">
                  <span className="w-3 h-3 bg-muted-foreground rounded-full" />
                  <span className="font-semibold text-sm">Tidak Live</span>
                </div>
                <p className="text-muted-foreground font-garamond text-sm mb-4">Tidak sedang live di IDN Live.</p>
                <a href={idnProfileUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-muted transition-colors mx-auto">
                  Kunjungi Profil IDN
                </a>
              </div>
            )}
          </motion.div>

          {/* ── Showroom Card ── */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-2xl border border-border bg-card p-5 shadow-lg flex flex-col">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3 text-center">Showroom</h3>

            {showroom.isChecking ? (
              <div className="flex items-center justify-center gap-3 py-4 flex-1">
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-muted-foreground font-garamond">Memuat...</p>
              </div>
            ) : showroom.isLive ? (
              <div className="text-center py-3 flex-1 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 bg-red-500/20 text-red-400 px-4 py-2 rounded-full mb-3 mx-auto">
                  <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  <span className="font-semibold text-sm">Sedang LIVE</span>
                </div>
                <p className="text-foreground font-garamond text-sm mb-4">{DISPLAY_NAME} sedang live di Showroom!</p>
                <div className="flex flex-col gap-2 items-center">
                  <button onClick={handleWatchShowroom} disabled={isLoadingStream === "showroom"}
                    className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-60 w-full max-w-[200px]">
                    {isLoadingStream === "showroom" ? (
                      <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Memuat...</>
                    ) : "▶ Tonton Sekarang"}
                  </button>
                  <a href={showroom.liveUrl ?? showroomProfileUrl} target="_blank" rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    Buka di Showroom ↗
                  </a>
                </div>
              </div>
            ) : (
              <div className="text-center py-3 flex-1 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 bg-muted text-muted-foreground px-4 py-2 rounded-full mb-3 mx-auto">
                  <span className="w-3 h-3 bg-muted-foreground rounded-full" />
                  <span className="font-semibold text-sm">Tidak Live</span>
                </div>
                <p className="text-muted-foreground font-garamond text-sm mb-4">Tidak sedang live di Showroom.</p>
                <a href={showroomProfileUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-muted transition-colors mx-auto">
                  Kunjungi Profil Showroom
                </a>
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default LiveStatusPage;