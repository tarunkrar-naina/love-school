import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { MapPin, Phone, Mail, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ChatWidget from "./ChatWidget";

/* ── Small icons for top address bar ── */
const InstagramIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="ig-sm" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f09433" />
        <stop offset="50%" stopColor="#dc2743" />
        <stop offset="100%" stopColor="#bc1888" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#ig-sm)" />
    <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.8" fill="none" />
    <circle cx="17.2" cy="6.8" r="1.2" fill="white" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="5" fill="#1877F2" />
    <path d="M16 8h-2a1 1 0 0 0-1 1v2h3l-.5 3H13v7h-3v-7H8v-3h2V9a4 4 0 0 1 4-4h2v3z" fill="white" />
  </svg>
);

const YoutubeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="5" fill="#FF0000" />
    <path d="M19.6 8.2a2 2 0 0 0-1.4-1.4C16.9 6.5 12 6.5 12 6.5s-4.9 0-6.2.3a2 2 0 0 0-1.4 1.4C4.1 9.5 4.1 12 4.1 12s0 2.5.3 3.8a2 2 0 0 0 1.4 1.4c1.3.3 6.2.3 6.2.3s4.9 0 6.2-.3a2 2 0 0 0 1.4-1.4c.3-1.3.3-3.8.3-3.8s0-2.5-.3-3.8z" fill="white" />
    <polygon points="10,9.5 15,12 10,14.5" fill="#FF0000" />
  </svg>
);

/* ── Large animated icons for footer ── */
const FooterMailIcon = () => (
  <div className="w-9 h-9 rounded-full bg-[#0D9488] flex items-center justify-center shadow-md">
    <Mail size={17} className="text-white" />
  </div>
);

const FooterFacebookIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect width="36" height="36" rx="18" fill="#1877F2" />
    <path d="M22 10h-3a2 2 0 0 0-2 2v3h-3v4h3v9h4v-9h3l1-4h-4v-2a1 1 0 0 1 1-1h3v-2z" fill="white" />
  </svg>
);

const FooterYoutubeIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect width="36" height="36" rx="18" fill="#FF0000" />
    <path d="M28.1 13.8a2.5 2.5 0 0 0-1.75-1.75C24.9 11.5 18 11.5 18 11.5s-6.9 0-8.35.55A2.5 2.5 0 0 0 7.9 13.8C7.3 15.3 7.3 18.5 7.3 18.5s0 3.2.6 4.7a2.5 2.5 0 0 0 1.75 1.75C11.1 25.5 18 25.5 18 25.5s6.9 0 8.35-.55a2.5 2.5 0 0 0 1.75-1.75c.6-1.5.6-4.7.6-4.7s0-3.2-.6-4.7z" fill="white" />
    <polygon points="15.5,22 22.5,18.5 15.5,15" fill="#FF0000" />
  </svg>
);

const FooterInstagramIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <defs>
      <linearGradient id="ig-footer" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f09433" />
        <stop offset="50%" stopColor="#dc2743" />
        <stop offset="100%" stopColor="#bc1888" />
      </linearGradient>
    </defs>
    <rect width="36" height="36" rx="18" fill="url(#ig-footer)" />
    <rect x="9" y="9" width="18" height="18" rx="5" stroke="white" strokeWidth="2" fill="none" />
    <circle cx="18" cy="18" r="5" stroke="white" strokeWidth="2" fill="none" />
    <circle cx="23.5" cy="12.5" r="1.5" fill="white" />
  </svg>
);

const FOOTER_SOCIALS = [
  { href: "mailto:info@lovepublicschool.edu.in", label: "Email", icon: <FooterMailIcon /> },
  { href: "https://facebook.com/lovepublicschool", label: "Facebook", icon: <FooterFacebookIcon /> },
  { href: "https://youtube.com/@lovepublicschool", label: "YouTube", icon: <FooterYoutubeIcon /> },
  { href: "https://instagram.com/lovepublicschool", label: "Instagram", icon: <FooterInstagramIcon /> },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0 });
  }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Academics", path: "/academics" },
    { name: "Admissions", path: "/admissions" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* TOP ADDRESS BAR — hides on scroll */}
      <div
        className={`fixed top-0 left-0 right-0 bg-[#0A3330] text-white text-[11px] py-1.5 px-3 md:px-8 flex flex-row justify-between items-center z-[60] transition-transform duration-300 ${
          scrolled ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="hidden sm:flex items-center gap-1.5">
          <MapPin size={11} className="text-[#5EEAD4]" />
          <span>Dhons, Kaithal (Haryana)</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Phone size={11} className="text-[#5EEAD4]" />
            <span>+91-9876543210</span>
          </div>
          <div className="hidden md:flex items-center gap-1.5">
            <Mail size={11} className="text-[#5EEAD4]" />
            <span>info@lovepublicschool.edu.in</span>
          </div>
          <div className="w-px h-3 bg-white/20 mx-1" />
          {/* 4 social icons in address bar */}
          <div className="flex items-center gap-2">
            <a href="mailto:info@lovepublicschool.edu.in" aria-label="Email" className="hover:opacity-75 transition-opacity text-[#5EEAD4]">
              <Mail size={13} />
            </a>
            <a href="https://facebook.com/lovepublicschool" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:opacity-75 transition-opacity">
              <FacebookIcon />
            </a>
            <a href="https://youtube.com/@lovepublicschool" target="_blank" rel="noopener noreferrer" aria-label="Youtube" className="hover:opacity-75 transition-opacity">
              <YoutubeIcon />
            </a>
            <a href="https://instagram.com/lovepublicschool" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:opacity-75 transition-opacity">
              <InstagramIcon />
            </a>
          </div>
        </div>
      </div>

      {/* NAVBAR — moves to top-0 when address bar hides */}
      <header
        className={`fixed ${scrolled ? "top-0" : "top-[28px]"} left-0 right-0 z-50 h-[64px] transition-all duration-300 ${
          scrolled
            ? "bg-[#0F4F4B]/95 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.25)] border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 h-full flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 cursor-pointer">
            <div className="w-9 h-9 bg-[#0D9488] rounded-full flex items-center justify-center text-white font-bold text-xs ring-2 ring-white/30 flex-shrink-0 shadow-lg">
              LPS
            </div>
            <span className="font-bold text-sm md:text-base text-white hidden md:block whitespace-nowrap leading-tight drop-shadow-md">
              Love Public Sr. Sec. School
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
            {navLinks.map((link) => {
              const isActive = location === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-3 py-1 rounded-full border text-[11px] font-medium transition-all duration-200 ${
                    isActive
                      ? "border-[#5EEAD4] bg-[#0D9488] text-white"
                      : "border-white/40 text-white hover:border-white hover:bg-white/15 drop-shadow-sm"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link
              href="/admissions"
              className="ml-1 px-4 py-1.5 rounded-full bg-white text-[#0F4F4B] font-semibold text-[11px] hover:bg-[#CCFBF1] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 shadow-md"
            >
              Apply Now
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white drop-shadow-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#0F4F4B]/97 backdrop-blur-md border-t border-white/10 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block text-sm font-medium py-2.5 px-3 rounded-lg transition-colors ${
                      location === link.path
                        ? "bg-[#0D9488] text-white"
                        : "text-white/90 hover:bg-white/10"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  href="/admissions"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center bg-white text-[#0F4F4B] px-4 py-3 rounded-lg font-semibold mt-3 hover:bg-[#CCFBF1] transition-colors"
                >
                  Apply Now
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* PAGE CONTENT — instant fade, no y-shift */}
      <main className="flex-1">
        <AnimatePresence mode="sync">
          <motion.div
            key={location}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.12 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <ChatWidget />

      {/* FOOTER */}
      <footer className="bg-[#0F4F4B] text-white pt-14">
        <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-10 pb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#0D9488] ring-2 ring-[#CCFBF1]/30 rounded-full flex items-center justify-center text-white font-bold text-xs">
                LPS
              </div>
              <span className="font-bold text-lg">Love Public School</span>
            </div>
            <p className="text-[#99F6E4] text-sm leading-relaxed mb-5">
              Shaping future leaders since 2005. Committed to academic excellence, holistic development, and nurturing lifelong learners.
            </p>

            {/* 4 Animated Social Icons */}
            <div className="flex items-center gap-3">
              {FOOTER_SOCIALS.map(({ href, label, icon }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.35, type: "spring", stiffness: 180 }}
                  whileHover={{ scale: 1.22, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="block"
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-base font-semibold mb-4 border-b border-[#4B7B76]/40 pb-2">Quick Links</h4>
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className="text-[#99F6E4] hover:text-white transition-colors duration-200 hover:translate-x-1 text-sm w-fit inline-block"
                >
                  → {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-base font-semibold mb-4 border-b border-[#4B7B76]/40 pb-2">Contact Info</h4>
            <div className="space-y-3 text-sm text-[#99F6E4]">
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="mt-0.5 flex-shrink-0" />
                <p>Love Public Sr. Sec. School,<br />Dhons, Kaithal (Haryana)</p>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={15} />
                <p>+91-9876543210</p>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={15} />
                <p>info@lovepublicschool.edu.in</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#0A3330] py-4 text-center text-[#99F6E4] text-xs">
          <p>&copy; {new Date().getFullYear()} Love Public Sr. Sec. School, Dhons, Kaithal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
