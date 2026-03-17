import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import logoFF from "@/assets/logo/logo-fritzyforce.png";

const OrgNode = ({ role, name, isPrimary = false, isBold = false }: { role: string; name?: string; isPrimary?: boolean; isBold?: boolean }) => (
  <div
    className={`org-node inline-block px-3 py-1.5 border text-center whitespace-nowrap ${
      isPrimary
        ? "border-primary/60 bg-card shadow-lg shadow-primary/10"
        : "border-border bg-card/80"
    } rounded-lg`}
    style={{ minWidth: 100 }}
  >
    <p className={`text-[9px] uppercase tracking-wider ${isPrimary ? "text-primary" : "text-muted-foreground"} font-cinzel leading-tight`}>
      {role}
    </p>
    {name !== undefined && (
      <p className={`text-[11px] font-cinzel text-foreground leading-tight ${isBold ? "font-bold" : "font-semibold"}`}>
        {name || "-"}
      </p>
    )}
  </div>
);

const CavalleryStructurePage = () => {
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [scrollStart, setScrollStart] = useState({ x: 0, y: 0 });

  const zoomIn = useCallback(() => setZoom((z) => Math.min(z + 0.15, 2)), []);
  const zoomOut = useCallback(() => setZoom((z) => Math.max(z - 0.15, 0.2)), []);
  const resetZoom = useCallback(() => setZoom(1), []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    const container = containerRef.current;
    if (!container) return;
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
    setScrollStart({ x: container.scrollLeft, y: container.scrollTop });
    container.setPointerCapture(e.pointerId);
    container.style.cursor = "grabbing";
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging || !containerRef.current) return;
    const dx = e.clientX - startPos.x;
    const dy = e.clientY - startPos.y;
    containerRef.current.scrollLeft = scrollStart.x - dx;
    containerRef.current.scrollTop = scrollStart.y - dy;
  }, [isDragging, startPos, scrollStart]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    setIsDragging(false);
    if (containerRef.current) {
      containerRef.current.releasePointerCapture(e.pointerId);
      containerRef.current.style.cursor = "grab";
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let lastDistance = 0;
    const getDistance = (touches: TouchList) => {
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      return Math.sqrt(dx * dx + dy * dy);
    };
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) { e.preventDefault(); lastDistance = getDistance(e.touches); }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const dist = getDistance(e.touches);
        const delta = dist - lastDistance;
        if (Math.abs(delta) > 3) { setZoom((z) => Math.min(Math.max(z + delta * 0.003, 0.2), 2)); lastDistance = dist; }
      }
    };
    container.addEventListener("touchstart", onTouchStart, { passive: false });
    container.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => { container.removeEventListener("touchstart", onTouchStart); container.removeEventListener("touchmove", onTouchMove); };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      requestAnimationFrame(() => {
        const scrollableWidth = container.scrollWidth - container.clientWidth;
        container.scrollLeft = scrollableWidth / 2;
      });
    }
  }, [zoom]);

  return (
    <div className="min-h-screen">
      <section className="py-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary blur-[200px]" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="mb-4">
            <img src={logoFF} alt="Fritzy Force" className="w-28 h-28 mx-auto object-contain" />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl md:text-3xl font-cinzel font-bold gradient-purple-text">
            ORGANIZATION STRUCTURE
          </motion.h1>
          <p className="text-muted-foreground font-garamond mt-2">The dedicated team behind Fritzy Force's success</p>
        </div>
      </section>

      <div className="sticky top-20 z-30 flex justify-center gap-2 pb-4">
        <button onClick={zoomOut} className="p-2 rounded-lg bg-card border border-border hover:bg-secondary transition-colors" title="Zoom Out">
          <ZoomOut className="w-4 h-4 text-foreground" />
        </button>
        <button onClick={resetZoom} className="px-3 py-2 rounded-lg bg-card border border-border hover:bg-secondary transition-colors text-xs font-cinzel text-foreground">
          {Math.round(zoom * 100)}%
        </button>
        <button onClick={zoomIn} className="p-2 rounded-lg bg-card border border-border hover:bg-secondary transition-colors" title="Zoom In">
          <ZoomIn className="w-4 h-4 text-foreground" />
        </button>
        <button onClick={() => setZoom(1)} className="p-2 rounded-lg bg-card border border-border hover:bg-secondary transition-colors" title="Full Size">
          <Maximize2 className="w-4 h-4 text-foreground" />
        </button>
      </div>

      <section
        className="pb-20 overflow-auto select-none touch-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        ref={containerRef}
        style={{ cursor: "grab", maxHeight: "80vh" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div style={{ display: "inline-block", minWidth: "100%" }}>
          <div
            className="org-chart"
            style={{ transform: `scale(${zoom})`, transformOrigin: "top left", transition: "transform 0.3s ease", display: "inline-block" }}
          >
            <ul>
              <li>
                <OrgNode role="Leader" name="Fritzy Rosmerian" isPrimary isBold />
                <ul>
                  <li>
                    <div className="flex gap-4 justify-center">
                      <OrgNode role="Vice Leader" name="Arya Arief" isPrimary />
                      <OrgNode role="Vice Leader" name="Dapa Putera" isPrimary />
                    </div>
                    <ul>
                      <li><OrgNode role="Member" name="Kezia" /></li>
                      <li><OrgNode role="Member" name="Amerta" /></li>
                      <li><OrgNode role="Member" name="Reno" /></li>
                      <li><OrgNode role="Member" name="Karisa" /></li>
                      <li><OrgNode role="Member" name="Lilu" /></li>
                      <li><OrgNode role="Member" name="Rezha" /></li>
                      <li><OrgNode role="Member" name="Riziq" /></li>
                      <li><OrgNode role="Member" name="Afee" /></li>
                      <li><OrgNode role="Member" name="Nath" /></li>
                      <li><OrgNode role="Member" name="Ilpi ilpi" /></li>
                      <li><OrgNode role="Member" name="Fran" /></li>
                      <li><OrgNode role="Member" name="Al21" /></li>
                      <li><OrgNode role="Member" name="caesario" /></li>
                      <li><OrgNode role="Member" name="Array" /></li>
                      <li><OrgNode role="Member" name="Nobody" /></li>
                      <li><OrgNode role="Member" name="Oink Parker" /></li>
                      <li><OrgNode role="Member" name="Naufal" /></li>
                      <li><OrgNode role="Member" name="Firmansyah" /></li>
                      <li><OrgNode role="Member" name="Doni" /></li>
                      <li><OrgNode role="Member" name="Qibo" /></li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CavalleryStructurePage;
