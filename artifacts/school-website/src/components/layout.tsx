import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { MapPin, Phone, Mail, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ChatWidget from "./ChatWidget";

const InstagramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="ig-grad2" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f09433"/>
        <stop offset="50%" stopColor="#dc2743"/>
        <stop offset="100%" stopColor="#bc1888"/>
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#ig-grad2)"/>
    <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.8" fill="none"/>
    <circle cx="17.2" cy="6.8" r="1.2" fill="white"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="5" fill="#1877F2"/>
    <path d="M16 8h-2a1 1 0 0 0-1 1v2h3l-.5 3H13v7h-3v-7H8v-3h2V9a4 4 0 0 1 4-4h2v3z" fill="white"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="5" fill="#FF0000"/>
    <path d="M19.6 8.2a2 2 0 0 0-1.4-1.4C16.9 6.5 12 6.5 12 6.5s-4.9 0-6.2.3a2 2 0 0 0-1.4 1.4C4.1 9.5 4.1 12 4.1 12s0 2.5.3 3.8a2 2 0 0 0 1.4 1.4c1.3.3 6.2.3 6.2.3s4.9 0 6.2-.3a2 2 0 0 0 1.4-1.4c.3-1.3.3-3.8.3-3.8s0-2.5-.3-3.8z" fill="white"/>
    <polygon points="10,9.5 15,12 10,14.5" fill="#FF0000"/>
  </svg>
);

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      {/* TOP ADDRESS BAR — fixed, single row on all screens */}
      <div className="fixed top-0 left-0 right-0 bg-[#0A3330] text-white text-[11px] py-1.5 px-3 md:px-8 flex flex-row justify-between items-center z-[60]">
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
          <div className="flex items-center gap-2">
            <a href="#" aria-label="Instagram" className="hover:opacity-75 transition-opacity"><InstagramIcon /></a>
            <a href="#" aria-label="Facebook" className="hover:opacity-75 transition-opacity"><FacebookIcon /></a>
            <a href="#" aria-label="Youtube" className="hover:opacity-75 transition-opacity"><YoutubeIcon /></a>
          </div>
        </div>
      </div>

      {/* NAVBAR — transparent at top, glass on scroll */}
      <header
        className={`fixed top-[28px] left-0 right-0 z-50 h-[64px] transition-all duration-500 ${
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

      {/* PAGE CONTENT */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
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
            <div className="flex items-center gap-3">
              <a href="#" aria-label="Instagram" className="hover:opacity-75 transition-opacity"><InstagramIcon /></a>
              <a href="#" aria-label="Facebook" className="hover:opacity-75 transition-opacity"><FacebookIcon /></a>
              <a href="#" aria-label="Youtube" className="hover:opacity-75 transition-opacity"><YoutubeIcon /></a>
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
