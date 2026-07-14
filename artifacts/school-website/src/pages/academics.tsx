import { CheckCircle2, BookOpen, FlaskConical, Monitor, Music, Dumbbell, Trophy, Star, Award } from "lucide-react";
import { motion } from "framer-motion";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 35 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.65, delay, ease: "easeOut" },
});

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.09 } } };
const cv = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function Academics() {
  return (
    <div>
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-[#0F4F4B] to-[#0D9488] pt-28 pb-20 text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="absolute rounded-full border border-white/30" style={{ width: `${(i+1)*150}px`, height: `${(i+1)*150}px`, bottom: "-30%", right: "-10%" }} />
          ))}
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#99F6E4] text-xs font-bold uppercase tracking-widest mb-3">Home / Academics</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-4xl md:text-6xl font-bold mb-4">Academic Programs</motion.h1>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="text-[#99F6E4] max-w-xl mx-auto">
            Comprehensive education from LKG to Class 12 — building knowledge, character & career readiness.
          </motion.p>
        </div>
      </section>

      {/* OVERVIEW STATS */}
      <section className="py-14 bg-[#FEFCE8]">
        <motion.div className="container mx-auto px-4 md:px-8" {...fade()}>
          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-5" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {[
              { num: "LKG–XII", label: "Complete Education", icon: "🎓" },
              { num: "98%", label: "Board Pass Rate", icon: "📊" },
              { num: "60+", label: "Expert Teachers", icon: "👨‍🏫" },
              { num: "50+", label: "District Toppers", icon: "🏆" },
            ].map((s, i) => (
              <motion.div key={i} variants={cv} className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(13,148,136,0.09)] border border-[#99F6E4]/40 text-center hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                <div className="text-3xl mb-2">{s.icon}</div>
                <div className="text-2xl font-bold text-[#0D9488]">{s.num}</div>
                <div className="text-[#4B7B76] text-sm mt-0.5">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* PRIMARY */}
      <section className="py-20 bg-white">
        <motion.div className="container mx-auto px-4 md:px-8" {...fade()}>
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80" alt="Primary Education" className="rounded-2xl shadow-xl w-full aspect-[4/3] object-cover" />
                <div className="absolute top-4 left-4 bg-[#0D9488] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow">Classes I – V</div>
              </div>
            </div>
            <div className="md:w-1/2 space-y-5">
              <span className="text-[#0D9488] text-xs font-bold uppercase tracking-widest">FOUNDATION STAGE</span>
              <h2 className="text-3xl font-bold text-[#134E4A]">Primary Education</h2>
              <div className="w-10 h-[3px] bg-[#0D9488] rounded-full" />
              <p className="text-[#4B7B76] leading-relaxed">
                Our primary curriculum is designed to foster a love for learning. We focus on building strong foundational skills in literacy and numeracy while encouraging curiosity through activity-based, experiential learning.
              </p>
              <p className="text-[#4B7B76] leading-relaxed">
                Each classroom is a nurturing space where students feel safe to explore, ask questions, and express themselves. Our low student-to-teacher ratio ensures individual attention for every child.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "English & Hindi Languages", "Mathematics & Logic", "Environmental Studies (EVS)",
                  "Art, Craft & Creative Skills", "Basic Computer Education", "Value Education & Moral Science",
                  "Physical Education & Yoga", "Story-telling & Spoken English",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-[#4B7B76] text-sm">
                    <CheckCircle2 className="text-[#0D9488] w-4 h-4 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* MIDDLE SCHOOL (VI-VIII) */}
      <section className="py-20 bg-[#F0FDFA]">
        <motion.div className="container mx-auto px-4 md:px-8" {...fade()}>
          <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
            <div className="md:w-1/2">
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80" alt="Middle School" className="rounded-2xl shadow-xl w-full aspect-[4/3] object-cover" />
                <div className="absolute top-4 right-4 bg-[#0F766E] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow">Classes VI – VIII</div>
              </div>
            </div>
            <div className="md:w-1/2 space-y-5">
              <span className="text-[#0D9488] text-xs font-bold uppercase tracking-widest">MIDDLE SCHOOL</span>
              <h2 className="text-3xl font-bold text-[#134E4A]">Upper Primary Education</h2>
              <div className="w-10 h-[3px] bg-[#0D9488] rounded-full" />
              <p className="text-[#4B7B76] leading-relaxed">
                The middle school years are a time of rapid growth — academically, socially, and personally. Our program bridges the foundation years with secondary education through structured subject learning and critical thinking.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Mathematics (Algebra, Geometry)", "Science (Physics, Chemistry, Biology)", "Social Science", "English & Hindi Literature",
                  "Sanskrit / Third Language", "Computer Applications", "Drawing & Fine Arts", "National Service Orientation",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-[#4B7B76] text-sm">
                    <CheckCircle2 className="text-[#0D9488] w-4 h-4 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* SECONDARY (IX-X) */}
      <section className="py-20 bg-white">
        <motion.div className="container mx-auto px-4 md:px-8" {...fade()}>
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80" alt="Secondary Education" className="rounded-2xl shadow-xl w-full aspect-[4/3] object-cover" />
                <div className="absolute top-4 left-4 bg-[#0F4F4B] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow">Classes IX – X</div>
              </div>
            </div>
            <div className="md:w-1/2 space-y-5">
              <span className="text-[#0D9488] text-xs font-bold uppercase tracking-widest">BOARD LEVEL</span>
              <h2 className="text-3xl font-bold text-[#134E4A]">Secondary Education (HBSE)</h2>
              <div className="w-10 h-[3px] bg-[#0D9488] rounded-full" />
              <p className="text-[#4B7B76] leading-relaxed">
                Classes IX and X prepare students for the all-important HBSE Board Examinations. Our systematic approach, regular assessments, and expert coaching ensure students enter the board exams fully prepared and confident.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Mathematics (Boards Level)", "Science — Physics, Chemistry, Biology", "Social Science (H/E/G/Eco)",
                  "English & Hindi Core", "Information Technology (IT)", "Sample Paper Practice Sessions",
                  "Board Exam Strategy Classes", "One-on-One Doubt Sessions",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-[#4B7B76] text-sm">
                    <CheckCircle2 className="text-[#0D9488] w-4 h-4 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="bg-[#F0FDFA] rounded-xl p-4 border border-[#99F6E4]/50 flex items-center gap-3 mt-2">
                <Trophy size={22} className="text-amber-500 flex-shrink-0" />
                <p className="text-[#0F4F4B] text-sm font-medium"><strong>100% Pass Rate</strong> in HBSE Class X Board for last 3 consecutive years</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* SR. SECONDARY (XI-XII) */}
      <section className="py-20 bg-[#F0FDFA]">
        <motion.div className="container mx-auto px-4 md:px-8" {...fade()}>
          <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
            <div className="md:w-1/2">
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80" alt="Senior Secondary" className="rounded-2xl shadow-xl w-full aspect-[4/3] object-cover" />
                <div className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow">Classes XI – XII</div>
              </div>
            </div>
            <div className="md:w-1/2 space-y-5">
              <span className="text-[#0D9488] text-xs font-bold uppercase tracking-widest">SPECIALIZATION STAGE</span>
              <h2 className="text-3xl font-bold text-[#134E4A]">Senior Secondary Education</h2>
              <div className="w-10 h-[3px] bg-[#0D9488] rounded-full" />
              <p className="text-[#4B7B76] leading-relaxed">
                The final two years are crucial for future career paths. We offer two specialized streams with expert faculty who prepare students for both board excellence and competitive entrance exams like JEE, NEET, and CA Foundation.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-2">
                <div className="bg-white rounded-2xl p-5 border-t-4 border-[#0D9488] shadow-[0_4px_20px_rgba(13,148,136,0.08)] hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-3">
                    <FlaskConical size={18} className="text-[#0D9488]" />
                    <h4 className="font-bold text-[#0F4F4B]">Science Stream</h4>
                  </div>
                  <ul className="space-y-1.5 text-sm text-[#4B7B76]">
                    <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-[#0D9488]" /> Physics</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-[#0D9488]" /> Chemistry</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-[#0D9488]" /> Mathematics / Biology</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-[#0D9488]" /> Computer Science / IP</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-[#0D9488]" /> JEE / NEET Preparation</li>
                  </ul>
                </div>
                <div className="bg-white rounded-2xl p-5 border-t-4 border-[#0F766E] shadow-[0_4px_20px_rgba(13,148,136,0.08)] hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen size={18} className="text-[#0F766E]" />
                    <h4 className="font-bold text-[#0F4F4B]">Commerce Stream</h4>
                  </div>
                  <ul className="space-y-1.5 text-sm text-[#4B7B76]">
                    <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-[#0F766E]" /> Accountancy</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-[#0F766E]" /> Business Studies</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-[#0F766E]" /> Economics</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-[#0F766E]" /> Mathematics / IP</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-[#0F766E]" /> CA Foundation Guidance</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FACILITIES */}
      <section className="py-20 bg-white">
        <motion.div className="container mx-auto px-4 md:px-8" {...fade()}>
          <div className="text-center mb-12">
            <span className="text-[#0D9488] text-xs font-bold uppercase tracking-widest">INFRASTRUCTURE</span>
            <h2 className="text-3xl font-bold text-[#134E4A] mt-2">World-Class Facilities</h2>
            <div className="w-10 h-[3px] bg-[#0D9488] mx-auto mt-3 rounded-full" />
            <p className="text-[#4B7B76] mt-3 max-w-xl mx-auto text-sm">State-of-the-art resources that support learning inside and beyond the classroom.</p>
          </div>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {[
              { icon: FlaskConical, img: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=600&q=80", title: "Science Laboratories", desc: "Fully equipped Physics, Chemistry, and Biology labs with modern instruments for practical learning." },
              { icon: Monitor, img: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&w=600&q=80", title: "Computer Lab", desc: "40+ computers with broadband internet, programming tools, and MS Office suite for digital literacy." },
              { icon: BookOpen, img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80", title: "School Library", desc: "10,000+ books, educational journals, newspapers, and a quiet reading space to cultivate a love for reading." },
              { icon: Dumbbell, img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=600&q=80", title: "Sports Ground", desc: "Large multi-sport ground with cricket pitch, football field, kabaddi court, and athletics track." },
              { icon: Music, img: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80", title: "Activity & Art Room", desc: "Dedicated spaces for music, dance, fine arts, and dramatics — nurturing every creative talent." },
              { icon: Star, img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80", title: "Smart Classrooms", desc: "Interactive smart boards and projectors in all classrooms for engaging, technology-enhanced lessons." },
            ].map((f, i) => (
              <motion.div key={i} variants={cv} className="bg-[#F0FDFA] rounded-2xl overflow-hidden border border-[#99F6E4]/40 shadow-[0_4px_20px_rgba(13,148,136,0.07)] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group">
                <div className="h-44 overflow-hidden">
                  <img src={f.img} alt={f.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-[#0F4F4B] mb-2 flex items-center gap-2">
                    <f.icon size={16} className="text-[#0D9488]" /> {f.title}
                  </h3>
                  <p className="text-[#4B7B76] text-sm">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* CO-CURRICULAR */}
      <section className="py-20 bg-[#F0FDFA]">
        <motion.div className="container mx-auto px-4 md:px-8" {...fade()}>
          <div className="text-center mb-12">
            <span className="text-[#0D9488] text-xs font-bold uppercase tracking-widest">BEYOND BOOKS</span>
            <h2 className="text-3xl font-bold text-[#134E4A] mt-2">Co-Curricular Activities</h2>
            <div className="w-10 h-[3px] bg-[#0D9488] mx-auto mt-3 rounded-full" />
            <p className="text-[#4B7B76] mt-3 max-w-xl mx-auto text-sm">We believe education is complete only when a child is nurtured beyond academics.</p>
          </div>
          <motion.div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {[
              { icon: "🏏", label: "Cricket" },
              { icon: "⚽", label: "Football" },
              { icon: "🏃", label: "Athletics" },
              { icon: "🤸", label: "Kabaddi" },
              { icon: "🎨", label: "Fine Arts" },
              { icon: "🎵", label: "Music" },
              { icon: "💃", label: "Dance" },
              { icon: "🎭", label: "Drama" },
              { icon: "🗣️", label: "Debate" },
              { icon: "🔢", label: "Math Club" },
              { icon: "🔭", label: "Science Club" },
              { icon: "📸", label: "Photography" },
            ].map((a, i) => (
              <motion.div key={i} variants={cv} className="bg-white rounded-2xl p-4 text-center border border-[#99F6E4]/40 shadow-sm hover:border-[#0D9488]/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-default">
                <div className="text-3xl mb-2">{a.icon}</div>
                <p className="text-[#0F4F4B] text-xs font-semibold">{a.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* RESULTS BANNER */}
      <section className="py-20 bg-gradient-to-br from-[#0F4F4B] to-[#0D9488] text-white">
        <motion.div className="container mx-auto px-4 md:px-8 text-center" {...fade()}>
          <span className="text-[#99F6E4] text-xs font-bold uppercase tracking-widest">ACHIEVEMENTS</span>
          <h2 className="text-3xl font-bold mt-2 mb-3">Our Academic Track Record</h2>
          <div className="w-10 h-[3px] bg-[#99F6E4] mx-auto mb-12 rounded-full" />
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {[
              { num: "100%", label: "Pass Rate — Class X", sub: "Last 3 consecutive years" },
              { num: "98%", label: "Pass Rate — Class XII", sub: "Outstanding board results" },
              { num: "50+", label: "District Toppers", sub: "Science, Commerce & overall" },
              { num: "15+", label: "National Merit holders", sub: "Scholarship awardees" },
            ].map((s, i) => (
              <motion.div key={i} variants={cv} className="bg-white/10 backdrop-blur-sm rounded-2xl p-7 border border-white/20 hover:bg-white/20 hover:-translate-y-1 transition-all duration-300">
                <div className="text-4xl font-bold text-white mb-2">{s.num}</div>
                <div className="text-[#99F6E4] font-semibold text-sm mb-1">{s.label}</div>
                <div className="text-white/60 text-xs">{s.sub}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* TOPPERS */}
      <section className="py-20 bg-white">
        <motion.div className="container mx-auto px-4 md:px-8" {...fade()}>
          <div className="text-center mb-12">
            <span className="text-[#0D9488] text-xs font-bold uppercase tracking-widest">PRIDE OF LPS</span>
            <h2 className="text-3xl font-bold text-[#134E4A] mt-2">Our Toppers</h2>
            <div className="w-10 h-[3px] bg-[#0D9488] mx-auto mt-3 rounded-full" />
          </div>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {[
              { name: "Ananya Sharma", class: "Class XII – Science", score: "96.4%", year: "2024", color: "#0D9488" },
              { name: "Ravi Kumar", class: "Class XII – Commerce", score: "94.8%", year: "2024", color: "#0F766E" },
              { name: "Deepika Singh", class: "Class X", score: "97.2%", year: "2024", color: "#0F4F4B" },
              { name: "Mohit Yadav", class: "Class X", score: "95.6%", year: "2024", color: "#134E4A" },
            ].map((t, i) => (
              <motion.div key={i} variants={cv} className="text-center bg-[#F0FDFA] rounded-2xl p-6 border border-[#99F6E4]/40 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center font-bold text-white text-xl shadow-lg" style={{ backgroundColor: t.color }}>
                  {t.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex gap-0.5 justify-center mb-2">
                  {[...Array(5)].map((_, j) => <Star key={j} size={12} className="fill-amber-400 text-amber-400" />)}
                </div>
                <h3 className="font-bold text-[#0F4F4B] text-sm">{t.name}</h3>
                <p className="text-[#4B7B76] text-xs mt-0.5">{t.class}</p>
                <div className="text-2xl font-bold mt-2" style={{ color: t.color }}>{t.score}</div>
                <p className="text-[#4B7B76] text-xs">Board {t.year}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* EXAM SCHEDULE CTA */}
      <section className="py-14 bg-gradient-to-r from-amber-50 to-[#F0FDFA] border-t border-[#99F6E4]/40">
        <motion.div className="container mx-auto px-4 text-center" {...fade()}>
          <Award size={36} className="text-[#0D9488] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#0F4F4B] mb-3">Want to Know More About Our Programs?</h2>
          <p className="text-[#4B7B76] mb-7 max-w-lg mx-auto text-sm">Visit us or call our academic office. We'd be happy to guide you to the right stream for your child.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/admissions" className="bg-[#0D9488] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#0F766E] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300">
              Apply for Admission →
            </a>
            <a href="/contact" className="border-2 border-[#0D9488] text-[#0D9488] font-semibold px-8 py-3 rounded-full hover:bg-[#0D9488] hover:text-white transition-all duration-300">
              Talk to Our Team
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
