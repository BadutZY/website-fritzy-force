import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoFF from "@/assets/logo/logo-fritzyforce.png";

interface NavItem {
  label: string;
  path: string;
  children?: { label: string; path: string }[];
}

const navItems: NavItem[] = [
  { label: "HOME", path: "/" },
  {
    label: "PROFILE",
    path: "/about",
    children: [
      { label: "Profile", path: "/about" },
      { label: "News", path: "/news" },
      { label: "Gallery", path: "/gallery" },
    ],
  },
  {
    label: "TIMELINE",
    path: "/timeline",
  },
  {
    label: "SCHEDULE",
    path: "/schedule",
    children: [
      { label: "Schedule", path: "/schedule" },
      { label: "Live Status", path: "/live-status" },
      { label: "Video Call Schedule", path: "/video-call-schedule" },
      { label: "Calendar", path: "/calendar" },
    ],
  },
  {
    label: "CONTENT",
    path: "/playlist",
    children: [
      { label: "Playlist", path: "/playlist" },
      { label: "Setlist", path: "/setlist" },
    ],
  },
  { 
    label: "MERCHANDISE",
    path: "/merchandise",
    children:[
      { label: "Fritzy Force Merchandise", path: "/merchandise" },
      { label: "Birthday T-shirt", path: "/birthday-tshirt" },
    ] },
  {
    label: "ABOUT US",
    path: "/about-us",
    children: [
      { label: "About Us", path: "/about-us" },
      { label: "Filosofy", path: "/filosofy" },
      { label: "Organization Structure", path: "/organization-structure" },
    ],
  },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const location = useLocation();

  const isNavItemActive = (item: NavItem) => {
    if (location.pathname === item.path) return true;
    if (item.children) {
      return item.children.some((child) => location.pathname === child.path);
    }
    return false;
  };

  useEffect(() => {
    setMobileOpen(false);
    setMobileDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleMobileParentClick = (item: NavItem) => {
    if (item.children) {
      setMobileDropdown(mobileDropdown === item.label ? null : item.label);
    } else {
      setMobileOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 lg:px-16 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3">
          <img src={logoFF} alt="Fritzy Force" className="w-12 h-12 object-contain" />
          <div>
            <span className="font-cinzel text-xl font-bold gradient-purple-text">Fritzy Force</span>
            <p className="text-xs text-muted-foreground font-garamond">Fanbase of Fritzy Rosmerian</p>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative group"
              onMouseEnter={() => item.children && setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                to={item.path}
                className={`px-3 py-2 text-xs font-cinzel tracking-wider flex items-center gap-1 transition-colors hover:text-primary ${
                  isNavItemActive(item) ? "text-primary" : "text-foreground"
                }`}
              >
                {item.label}
                {item.children && (
                  <motion.span
                    animate={{ rotate: openDropdown === item.label ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-3 h-3" />
                  </motion.span>
                )}
              </Link>

              <AnimatePresence>
                {item.children && openDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 bg-card border border-border rounded-lg shadow-xl py-2 min-w-[200px]"
                  >
                    {item.children.map((child, i) => (
                      <motion.div
                        key={child.path}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.15, delay: i * 0.03 }}
                      >
                        <Link
                          to={child.path}
                          className={`block px-4 py-2 text-sm font-garamond transition-colors hover:bg-secondary hover:text-primary ${
                            location.pathname === child.path ? "text-primary bg-secondary/50" : "text-foreground"
                          }`}
                        >
                          {child.label}
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <button
          className="lg:hidden p-2 text-foreground relative w-10 h-10 flex items-center justify-center"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <motion.span className="absolute w-6 h-0.5 bg-current rounded-full" animate={mobileOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }} transition={{ duration: 0.3 }} />
          <motion.span className="absolute w-6 h-0.5 bg-current rounded-full" animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} transition={{ duration: 0.2 }} />
          <motion.span className="absolute w-6 h-0.5 bg-current rounded-full" animate={mobileOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }} transition={{ duration: 0.3 }} />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden fixed inset-0 top-20 bg-background/60 backdrop-blur-sm z-40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden bg-card border-t border-border overflow-hidden relative z-50"
            >
              <div className="py-4 px-6 max-h-[70vh] overflow-y-auto">
                {navItems.map((item) => (
                  <div key={item.label}>
                    {item.children ? (
                      <button
                        onClick={() => handleMobileParentClick(item)}
                        className={`w-full flex items-center justify-between py-3 text-sm font-cinzel tracking-wider transition-colors ${
                          isNavItemActive(item) ? "text-primary" : "text-foreground"
                        }`}
                      >
                        <span>{item.label}</span>
                        <motion.span animate={{ rotate: mobileDropdown === item.label ? 180 : 0 }} transition={{ duration: 0.2 }}>
                          <ChevronDown className="w-4 h-4" />
                        </motion.span>
                      </button>
                    ) : (
                      <Link
                        to={item.path}
                        onClick={() => setMobileOpen(false)}
                        className={`block py-3 text-sm font-cinzel tracking-wider ${
                          isNavItemActive(item) ? "text-primary" : "text-foreground"
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}

                    <AnimatePresence>
                      {item.children && mobileDropdown === item.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          {item.children.map((child, i) => (
                            <motion.div
                              key={child.path}
                              initial={{ opacity: 0, x: -12 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.15, delay: i * 0.04 }}
                            >
                              <Link
                                to={child.path}
                                onClick={() => setMobileOpen(false)}
                                className={`block py-2.5 pl-6 text-sm font-garamond transition-colors hover:text-primary ${
                                  location.pathname === child.path ? "text-primary" : "text-muted-foreground"
                                }`}
                              >
                                {child.label}
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
