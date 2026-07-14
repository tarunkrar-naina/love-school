import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Users, GraduationCap, Calendar, Trophy, Award, ArrowRight,
  ChevronRight, Star, Send, CheckCircle2, BookOpen, Layers
} from "lucide-react";

const CURRENT_YEAR = new Date().getFullYear();
const ADMISSION_YEAR = `${CURRENT_YEAR}-${String(CURRENT_YEAR + 1).slice(-2)}`;
const FULL_ADMISSION_YEAR = `${CURRENT_YEAR}-${CURRENT_YEAR + 1}`;

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1400",
  "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1400",
  "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1400",
];

const CLASS_OPTIONS = [
  "LKG", "UKG",
  "Class 1", "Class 2", "Class 3", "Class 4", "Class 5",
  "Class 6", "Class 7", "Class 8", "Class 9", "Class 10",
  "Class 11 (Science)", "Class 11 (Commerce)", "Class 12 (Science)", "Class 12 (Commerce)",
];

const REVIEWS = [
  {
    name: "Ramesh Kumar",
    role: "Parent — Class 10",
    text: "Bahut achhi school hai. Teachers bahut mehnat karte hain. Mera beta is saal 95% le aaya. Dil se shukriya!",
    stars: 5, color: "#0D9488", avatar: "RK",
  },
  {
    name: "Sunita Devi",
    role: "Parent — Class 8",
    text: "School ka mahaul bahut saaf aur shurakshit hai. Bachi khushi khushi school jaati hai. Highly recommended!",
    stars: 5, color: "#0F766E", avatar: "SD",
  },
  {
    name: "Anil Sharma",
    role: "Parent — Class 12",
    text: "Meri beti ne is school se padhkar engineering entrance clear kiya. Teachers ka dedication kaabil-e-tarif hai!",
    stars: 5, color: "#0F4F4B", avatar: "AS",
  },
  {
    name: "Meena Rani",
    role: "Parent — Class 6",
    text: "Bacche ka confidence badh gaya hai. Sports aur academics dono mein dhyan diya jaata hai. Bahut khush hain hum.",
    stars: 5, color: "#0D9488", avatar: "MR",
  },
  {
    name: "Suresh Yadav",
    role: "Parent — Class 9",
    text: "School ki facilities excellent hain. Labs aur library bahut acchi hain. Fees bhi reasonable hai. Best choice!",
    stars: 5, color: "#0F766E", avatar: "SY",
  },
  {
    name: "Kavita Singh",
    role: "Parent — UKG",
    text: "Chhote bachon ke liye bahut caring environment hai. Teachers bahut patient aur friendly hain. Love this school!",
    stars: 5, color: "#0F4F4B", avatar: "KS",
  },
];

function CountUp({ end, label, icon: Icon, desc, suffix = "" }: {
  end: number; label: string; icon: any; desc: string; suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2200;
    const steps = 60;
    const increment = end / steps;
    const interval = duration / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) { setCount(end); clearInterval(timer); return; }
      setCount(Math.floor(start));
    }, interval);
    return () => clearInterval(timer);
  }, [isInView, end]);

  return (
    <motion.div
      ref={ref}
      variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
      className="bg-gradient-to-br from-[#F0FDFA] to-white rounded-2xl p-5 md:p-8 border border-[#99F6E4]/60 hover:shadow-[0_8px_40px_rgba(13,148,136,0.18)] hover:-translate-y-2 hover:border-[#0D9488]/40 transition-all duration-300 group cursor-pointer"
    >
      <div className="w-12 h-12 bg-[#0D9488] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
        <Icon className="text-white" size={20} />
      </div>
      <h3 className="text-5xl font-bold text-[#0D9488]" style={{ fontFamily: "Playfair Display, serif" }}>
        {count}{suffix}
      </h3>
      <p className="text-[#4B7B76] font-semibold text-lg mt-1">{label}</p>
      <p className="text-[#134E4A] text-sm mt-1">{desc}</p>
    </motion.div>
  );
}

function ParentsReviews() {
  const [startIdx, setStartIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const n = REVIEWS.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setStartIdx((prev) => (prev + 1) % n);
    }, 3000);
    return () => clearInterval(timer);
  }, [n]);

  const visibleIndices = [0, 1, 2].map((i) => (startIdx + i) % n);

  return (
    <section className="py-20 bg-gradient-to-br from-[#F0FDFA] to-[#CCFBF1]/30">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-[#0D9488]/10 text-[#0D9488] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
            Parent Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl text-[#0F4F4B]">What Parents Say</h2>
          <div className="w-12 h-[3px] bg-[#0D9488] mx-auto mt-3 rounded-full" />
        </motion.div>

        {/* 3 cards, 1 changes every 3s */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden">
          <AnimatePresence mode="popLayout" custom={direction}>
            {visibleIndices.map((reviewIdx) => {
              const r = REVIEWS[reviewIdx];
              return (
                <motion.div
                  key={`review-${reviewIdx}`}
                  custom={direction}
                  variants={{
                    hidden: (d: number) => ({ opacity: 0, x: d > 0 ? 80 : -80 }),
                    visible: { opacity: 1, x: 0 },
                    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -80 : 80 }),
                  }}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                  className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(13,148,136,0.10)] border border-[#99F6E4]/40 p-7 flex flex-col"
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: r.stars }).map((_, i) => (
                      <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-[#134E4A] text-sm leading-relaxed italic flex-1">"{r.text}"</p>
                  <div className="flex items-center gap-3 mt-6">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                      style={{ backgroundColor: r.color }}
                    >
                      {r.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-[#0F4F4B] text-sm">{r.name}</p>
                      <p className="text-xs text-[#4B7B76]">{r.role}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > startIdx ? 1 : -1); setStartIdx(i); }}
              className={`transition-all duration-300 rounded-full ${
                i === startIdx ? "w-6 h-2.5 bg-[#0D9488]" : "w-2.5 h-2.5 bg-[#0D9488]/25"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function MapAndForm() {
  const [form, setForm] = useState({ name: "", parent: "", phone: "", cls: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1200);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-[#0D9488]/10 text-[#0D9488] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
            📍 Find Us & Apply
          </span>
          <h2 className="text-3xl md:text-4xl text-[#0F4F4B]">Location & Admission Form</h2>
          <div className="w-12 h-[3px] bg-[#0D9488] mx-auto mt-3 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* MAP */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(13,148,136,0.12)] border border-[#99F6E4]/40 min-h-[260px] md:min-h-[400px]"
          >
            <iframe
              title="School Location"
              src="https://maps.google.com/maps?q=Dhons,+Kaithal,+Haryana,+India&t=&z=14&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "260px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-[#F0FDFA] to-white rounded-2xl shadow-[0_8px_30px_rgba(13,148,136,0.12)] border border-[#99F6E4]/40 p-4 sm:p-7 md:p-8"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full py-12 text-center"
                >
                  <div className="w-16 h-16 bg-[#0D9488] rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0F4F4B] mb-2">Application Submitted!</h3>
                  <p className="text-[#4B7B76] text-sm mb-6">
                    Thank you! Our team will contact you within 24 hours on your phone number.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", parent: "", phone: "", cls: "", message: "" }); }}
                    className="text-[#0D9488] font-semibold hover:underline text-sm"
                  >
                    Submit another application →
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="mb-2">
                    <h3 className="text-xl font-bold text-[#0F4F4B]">
                      Admission Enquiry {FULL_ADMISSION_YEAR}
                    </h3>
                    <p className="text-[#4B7B76] text-sm mt-1">Fill the form and we'll call you back</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#0F4F4B] mb-1.5">Student Name *</label>
                      <input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Enter student name"
                        className="w-full border border-[#99F6E4] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]/40 focus:border-[#0D9488] bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#0F4F4B] mb-1.5">Parent / Guardian Name *</label>
                      <input
                        required
                        value={form.parent}
                        onChange={(e) => setForm({ ...form, parent: e.target.value })}
                        placeholder="Enter parent name"
                        className="w-full border border-[#99F6E4] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]/40 focus:border-[#0D9488] bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#0F4F4B] mb-1.5">Mobile Number *</label>
                      <input
                        required
                        type="tel"
                        pattern="[0-9]{10}"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="10-digit mobile no."
                        className="w-full border border-[#99F6E4] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]/40 focus:border-[#0D9488] bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#0F4F4B] mb-1.5">Class Applying For *</label>
                      <select
                        required
                        value={form.cls}
                        onChange={(e) => setForm({ ...form, cls: e.target.value })}
                        className="w-full border border-[#99F6E4] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]/40 focus:border-[#0D9488] bg-white transition-all"
                      >
                        <option value="">Select class</option>
                        {CLASS_OPTIONS.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0F4F4B] mb-1.5">Message (Optional)</label>
                    <textarea
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Any specific query or message..."
                      className="w-full border border-[#99F6E4] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]/40 focus:border-[#0D9488] bg-white transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#0D9488] text-white font-semibold py-3 rounded-lg hover:bg-[#0F766E] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    ) : (
                      <><Send size={16} /> Submit Application</>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-screen pt-[92px] flex flex-col justify-center overflow-hidden bg-[#0F4F4B]">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 z-0"
          >
            <div
              className="absolute inset-0 bg-cover bg-center animate-kenburns"
              style={{ backgroundImage: `url(${HERO_IMAGES[currentSlide]})` }}
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-[rgba(15,60,56,0.72)] z-10" />

        <div className="relative z-20 container mx-auto px-4 md:px-6 lg:px-8 text-center text-white py-12">
          {/* Admission Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="inline-flex items-center gap-2 bg-amber-400/90 text-[#0F4F4B] px-5 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider mb-4 shadow-lg"
          >
            🎓 Open Admissions {FULL_ADMISSION_YEAR}
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-[#0D9488]/80 backdrop-blur-sm text-white px-5 py-1.5 rounded-full font-semibold text-sm mb-5 tracking-wider shadow"
            style={{ fontFamily: "Playfair Display, serif", fontStyle: "italic" }}
          >
            <Award size={14} /> Affiliated to HBSE Board
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-bold text-4xl md:text-5xl lg:text-7xl leading-tight mb-5 max-w-5xl mx-auto tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
          >
            LOVE PUBLIC SR. SEC. SCHOOL
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-[#99F6E4] text-lg md:text-xl mb-10 max-w-2xl mx-auto"
          >
            Dhons, Kaithal (Haryana) — Shaping Future Leaders Since 2005
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/admissions"
              className="bg-[#0D9488] text-white font-semibold px-8 py-4 rounded-full hover:bg-[#0F766E] hover:scale-105 hover:shadow-[0_8px_20px_rgba(13,148,136,0.5)] hover:-translate-y-1 transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              Apply for Admission {ADMISSION_YEAR} <ArrowRight size={18} />
            </Link>
            <Link
              href="/about"
              className="bg-transparent border-2 border-white/70 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/15 hover:-translate-y-1 transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              Explore School <ChevronRight size={18} />
            </Link>
          </motion.div>

          {/* Slide dots */}
          <div className="flex gap-2 justify-center mt-10">
            {HERO_IMAGES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`rounded-full transition-all duration-300 ${
                  currentSlide === idx ? "bg-white w-7 h-2.5" : "bg-white/40 w-2.5 h-2.5"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* STATS ROW */}
      <section className="py-20 bg-[#FEFCE8]">
        <motion.div
          className="container mx-auto px-4 md:px-6 lg:px-8"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="text-center mb-12">
            <span className="inline-block bg-[#0D9488]/10 text-[#0D9488] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
              Our Achievements
            </span>
            <h2 className="text-3xl md:text-4xl text-[#134E4A]">Numbers That Speak</h2>
            <div className="w-12 h-[3px] bg-gradient-to-r from-[#0D9488] to-[#CCFBF1] mx-auto mt-3 rounded-full" />
          </div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <CountUp end={1200} label="Students Enrolled" icon={Users} desc="Active learners" suffix="+" />
            <CountUp end={60} label="Expert Teachers" icon={GraduationCap} desc="Experienced faculty" suffix="+" />
            <CountUp end={20} label="Years of Excellence" icon={Calendar} desc="Est. 2005" suffix="+" />
            <CountUp end={98} label="Board Results" icon={Trophy} desc="Pass percentage" suffix="%" />
          </motion.div>
        </motion.div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="py-20 bg-[#F0FDFA]">
        <motion.div
          className="container mx-auto px-4 md:px-6 lg:px-8"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="flex flex-col lg:flex-row gap-14 items-center">
            <div className="lg:w-7/12">
              <span className="text-[#0D9488] text-xs font-bold uppercase tracking-[0.2em]">DISCOVER</span>
              <h2 className="text-4xl font-bold text-[#134E4A] mt-2 mb-4">Who We Are</h2>
              <div className="w-10 h-[3px] bg-[#0D9488] mb-6 rounded-full" />
              <div className="space-y-4 text-[#4B7B76] text-base leading-relaxed">
                <p>
                  Love Public Sr. Sec. School is a premier institution in Dhons, Kaithal (Haryana), 
                  committed to nurturing the potential of every child from LKG to Class 12 through a 
                  combination of academic excellence and holistic development.
                </p>
                <p>
                  Our dedicated faculty, comprehensive curriculum spanning from kindergarten to senior 
                  secondary, and state-of-the-art facilities ensure students are well-prepared for 
                  tomorrow's challenges while staying rooted in their cultural heritage.
                </p>
              </div>
              <div className="mt-8 flex gap-4">
                <Link
                  href="/about"
                  className="bg-[#0D9488] text-white font-semibold px-6 py-2.5 rounded-full hover:bg-[#0F766E] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 inline-flex items-center gap-2 text-sm"
                >
                  Learn More <ArrowRight size={15} />
                </Link>
                <Link
                  href="/contact"
                  className="border border-[#0D9488] text-[#0D9488] font-semibold px-6 py-2.5 rounded-full hover:bg-[#0D9488] hover:text-white hover:-translate-y-0.5 transition-all duration-300 text-sm"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="lg:w-5/12 grid grid-cols-2 gap-3">
              {[
                "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600",
                "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600",
                "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600",
                "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600",
              ].map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.93 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="rounded-xl overflow-hidden aspect-[4/3] group"
                >
                  <img src={src} alt="School" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* CLASS LEVELS */}
      <section className="py-20 bg-white">
        <motion.div
          className="container mx-auto px-4 md:px-6 lg:px-8"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="text-center mb-12">
            <span className="text-[#0D9488] text-xs font-bold uppercase tracking-[0.2em]">PROGRAMS</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#134E4A] mt-2 mb-3">Academic Excellence</h2>
            <div className="w-10 h-[3px] bg-[#0D9488] mx-auto rounded-full" />
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {[
              { icon: "🧒", title: "Nursery / KG", range: "LKG & UKG", desc: "Play-based early learning, creativity, and foundational skills in a joyful environment.", color: "#0D9488" },
              { icon: "📖", title: "Primary", range: "Class 1 – 5", desc: "Foundational literacy, numeracy, and character building with experienced teachers.", color: "#0F766E" },
              { icon: "🔬", title: "Secondary", range: "Class 6 – 10", desc: "Comprehensive HBSE curriculum developing critical thinking and problem-solving.", color: "#0F4F4B" },
              { icon: "🎓", title: "Sr. Secondary", range: "Class 11 – 12", desc: "Science & Commerce streams preparing students for competitive exams and careers.", color: "#134E4A" },
            ].map((item, i) => (
              <motion.div key={i} variants={cardVariant}>
                <Link href="/academics" className="block bg-white p-7 rounded-xl shadow-[0_4px_20px_rgba(13,148,136,0.08)] border-t-4 hover:shadow-[0_8px_30px_rgba(13,148,136,0.16)] hover:-translate-y-2 transition-all duration-300 group cursor-pointer h-full" style={{ borderTopColor: item.color }}>
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3 className="text-xl font-bold text-[#0F4F4B] mb-1">{item.title}</h3>
                  <span className="text-xs font-semibold text-[#0D9488] bg-[#0D9488]/10 px-2.5 py-0.5 rounded-full">{item.range}</span>
                  <p className="text-[#4B7B76] mt-3 text-sm leading-relaxed">{item.desc}</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-10">
            <Link
              href="/academics"
              className="inline-flex items-center gap-2 text-[#0D9488] font-semibold hover:gap-3 transition-all duration-200"
            >
              View Full Academic Details <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* FACILITIES */}
      <section className="py-20 bg-[#0F4F4B]">
        <motion.div
          className="container mx-auto px-4 md:px-6 lg:px-8"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="text-center mb-12">
            <span className="text-[#99F6E4] text-xs font-bold uppercase tracking-[0.2em]">INFRASTRUCTURE</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-3">World-Class Facilities</h2>
            <div className="w-10 h-[3px] bg-[#0D9488] mx-auto rounded-full" />
          </div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {[
              { icon: "🖥️", title: "Smart Classrooms", desc: "Interactive digital boards and multimedia content for engaging learning." },
              { icon: "🔬", title: "Science Labs", desc: "Well-equipped physics, chemistry, and biology labs for practical experiments." },
              { icon: "💻", title: "Computer Lab", desc: "Modern computing facility with high-speed internet and latest software." },
              { icon: "⚽", title: "Sports Ground", desc: "Expansive grounds for cricket, football, kabaddi, and athletics." },
              { icon: "📚", title: "Library", desc: "Extensive books, journals, and digital resources for research and reading." },
              { icon: "🚌", title: "Safe Transport", desc: "School buses covering all major routes with trained drivers and conductors." },
            ].map((fac, i) => (
              <motion.div key={i} variants={cardVariant}>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-7 rounded-2xl group hover:bg-white/10 hover:-translate-y-2 hover:border-[#0D9488]/50 transition-all duration-300 cursor-pointer">
                  <div className="w-14 h-14 bg-[#0D9488] rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {fac.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{fac.title}</h3>
                  <p className="text-[#99F6E4] text-sm leading-relaxed">{fac.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="py-20 bg-[#F0FDFA]">
        <motion.div
          className="container mx-auto px-4 md:px-6 lg:px-8"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="text-center mb-12">
            <span className="text-[#0D9488] text-xs font-bold uppercase tracking-[0.2em]">GALLERY</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#134E4A] mt-2 mb-3">Life at LPS</h2>
            <div className="w-10 h-[3px] bg-[#0D9488] mx-auto rounded-full" />
          </div>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {[
              "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500",
              "https://images.unsplash.com/photo-1613896527026-f195d5c818ed?w=500",
              "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=500",
              "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=500",
              "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=500",
              "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=500",
              "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=500",
              "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500",
            ].map((src, i) => (
              <motion.div
                key={i}
                variants={cardVariant}
                className="aspect-square rounded-xl overflow-hidden group cursor-pointer"
              >
                <img src={src} alt="Gallery" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </motion.div>
            ))}
          </motion.div>
          <div className="text-center mt-8">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 bg-[#0D9488] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#0F766E] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 text-sm"
            >
              View Full Gallery <ArrowRight size={15} />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* MAP + ADMISSION FORM */}
      <MapAndForm />

      {/* PARENTS REVIEWS */}
      <ParentsReviews />

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#0F4F4B] to-[#0D9488] text-white text-center">
        <motion.div
          className="container mx-auto px-4 md:px-6 lg:px-8"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="text-4xl mb-4">🎓</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join the LPS Family — {FULL_ADMISSION_YEAR}
          </h2>
          <p className="text-[#99F6E4] text-lg mb-8 max-w-2xl mx-auto">
            Admissions open for LKG to Class 12. Limited seats available. Apply today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 bg-white text-[#0F4F4B] font-bold px-8 py-4 rounded-full hover:bg-[#CCFBF1] hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              Apply Now <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border-2 border-white text-white font-semibold px-8 py-4 rounded-full hover:bg-white/15 hover:-translate-y-1 transition-all duration-300"
            >
              Contact Us <ChevronRight size={18} />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
