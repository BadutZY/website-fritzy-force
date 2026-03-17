import { Link } from "react-router-dom";
import logoFF from "@/assets/logo/logo-fritzyforce.png";

const footerLinks = [
  { label: "Home", path: "/" },
  { label: "Profile", path: "/about" },
  { label: "Schedule", path: "/schedule" },
  { label: "Content", path: "/playlist" },
  { label: "Gallery", path: "/gallery" },
  { label: "About Us", path: "/about-us" },
];

const socialLinks = [
  { label: "TikTok", url: "https://www.tiktok.com/@jkt48.fritzy", icon: "tiktok" },
  { label: "X", url: "https://twitter.com/RFritzy_JKT48", icon: "x" },
  { label: "Instagram", url: "https://www.instagram.com/jkt48.fritzy.r", icon: "instagram" },
  { label: "YouTube", url: "https://youtube.com", icon: "youtube" },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-border">
      {/* Decorative background */}
      <div className="absolute inset-0 gradient-purple-dark opacity-30" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-primary blur-[150px]" />
        <div className="absolute top-0 right-1/4 w-[300px] h-[300px] rounded-full bg-accent blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        {/* Top section */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <Link to="/" className="flex items-center gap-3">
              <img src={logoFF} alt="Fritzy Force" className="w-10 h-10 object-contain" />
              <span className="font-cinzel font-bold text-lg text-foreground">Fritzy Force</span>
            </Link>
            <p className="text-sm text-muted-foreground font-garamond text-center md:text-left max-w-xs">
              Dedicated to supporting Fritzy Rosmerian in her journey as a JKT48 member. Together we shine brighter.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center gap-3">
            <h4 className="font-cinzel font-bold text-sm text-foreground uppercase tracking-wider mb-1">Quick Links</h4>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-muted-foreground hover:text-primary font-garamond transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <h4 className="font-cinzel font-bold text-sm text-foreground uppercase tracking-wider mb-1">Follow Us</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-secondary/80 flex items-center justify-center text-muted-foreground hover:text-primary-foreground hover:bg-primary transition-all duration-300 shadow-md hover:shadow-primary/30"
                  aria-label={social.label}
                >
                  {social.icon === "tiktok" && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.78a8.18 8.18 0 003.76.92V6.27a4.77 4.77 0 01-.01.42z"/></svg>
                  )}
                  {social.icon === "x" && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  )}
                  {social.icon === "instagram" && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  )}
                  {social.icon === "youtube" && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  )}
                </a>
              ))}
            </div>
            <p className="text-xs text-muted-foreground font-garamond italic text-center md:text-right">
              #BetterWithFritzy
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        {/* Bottom */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground font-garamond">
            © 2026 Fritzy Force. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/60 font-garamond">
            Made with 💜 for Fritzy Rosmerian
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
