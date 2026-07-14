import { motion } from "framer-motion";
import { Eye, Target, Award, ShieldCheck, Heart, BookOpen, Users, Star, Trophy, CheckCircle2, Quote } from "lucide-react";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 35 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.12 },
  transition: { duration: 0.65, delay, ease: "easeOut" },
});

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const cardVariant = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function About() {
  return (
    <div>
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-[#0F4F4B] to-[#0D9488] pt-28 pb-20 text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="absolute rounded-full border border-white/30" style={{ width: `${(i+1)*120}px`, height: `${(i+1)*120}px`, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
          ))}
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#99F6E4] text-xs font-bold uppercase tracking-widest mb-3">Home / About</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-4xl md:text-6xl font-bold mb-4">About Our School</motion.h1>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="text-[#99F6E4] text-base max-w-xl mx-auto">
            Two decades of shaping minds, building character, and creating futures in Haryana.
          </motion.p>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="py-20 bg-white">
        <motion.div className="container mx-auto px-4 md:px-8" {...fade()}>
          <div className="flex flex-col lg:flex-row gap-14 items-center">
            <div className="lg:w-1/2">
              <span className="text-[#0D9488] text-xs font-bold uppercase tracking-widest">OUR HISTORY</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#134E4A] mt-2 mb-4">Our Story</h2>
              <div className="w-10 h-[3px] bg-[#0D9488] rounded-full mb-6" />
              <div className="space-y-4 text-[#4B7B76] text-base leading-relaxed">
                <p>Established in <strong className="text-[#0F4F4B]">2005</strong>, Love Public Sr. Sec. School began with a simple yet profound vision: to provide quality education that empowers students from Dhons and surrounding villages to excel on a regional and national stage.</p>
                <p>Over two decades, we have grown from a modest primary school into a premier senior secondary institution, proudly affiliated with the <strong className="text-[#0F4F4B]">Haryana Board of School Education (HBSE)</strong>.</p>
                <p>Our journey has been marked by continuous innovation in teaching, expansion of state-of-the-art facilities, and most importantly — the countless success stories of our 5,000+ alumni who are today doctors, engineers, teachers, and entrepreneurs.</p>
                <p>We believe every child carries a unique potential. Our role is to discover it, nurture it, and help it bloom.</p>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { num: "2005", label: "Year Established" },
                  { num: "5000+", label: "Alumni Worldwide" },
                  { num: "60+", label: "Expert Teachers" },
                  { num: "1200+", label: "Students Enrolled" },
                ].map((s, i) => (
                  <div key={i} className="bg-[#F0FDFA] rounded-xl p-4 border border-[#99F6E4]/50">
                    <div className="text-2xl font-bold text-[#0D9488]">{s.num}</div>
                    <div className="text-xs text-[#4B7B76] mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80" alt="School Building" className="rounded-2xl shadow-xl w-full aspect-[4/3] object-cover" />
                <div className="absolute -bottom-5 -left-5 bg-[#0D9488] text-white rounded-2xl p-5 shadow-xl">
                  <div className="text-3xl font-bold">20+</div>
                  <div className="text-xs text-[#99F6E4]">Years of Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* PRINCIPAL'S MESSAGE */}
      <section className="py-20 bg-[#F0FDFA]">
        <motion.div className="container mx-auto px-4 md:px-8" {...fade()}>
          <div className="text-center mb-12">
            <span className="text-[#0D9488] text-xs font-bold uppercase tracking-widest">FROM THE DESK</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#134E4A] mt-2">Principal's Message</h2>
            <div className="w-10 h-[3px] bg-[#0D9488] mx-auto mt-3 rounded-full" />
          </div>
          <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-[0_8px_40px_rgba(13,148,136,0.10)] overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 bg-gradient-to-br from-[#0F4F4B] to-[#0D9488] p-10 flex flex-col items-center justify-center text-white text-center">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80" alt="Principal" className="w-28 h-28 rounded-full border-4 border-white/30 object-cover mb-5" />
                <h3 className="font-bold text-xl">Mr. Dharampal Singh</h3>
                <p className="text-[#99F6E4] text-sm mt-1">Principal & Founder</p>
                <p className="text-[#99F6E4] text-xs mt-2">M.A., B.Ed. — 25 years experience</p>
              </div>
              <div className="md:w-2/3 p-10">
                <Quote size={36} className="text-[#0D9488]/20 mb-4" />
                <div className="space-y-4 text-[#4B7B76] leading-relaxed">
                  <p>Dear Parents, Students, and Well-Wishers,</p>
                  <p>It is my great privilege to lead this institution that has been a beacon of learning and values for over twenty years. At Love Public Sr. Sec. School, we believe that education is not merely about academic marks — it is about shaping responsible, compassionate, and capable human beings.</p>
                  <p>We are committed to blending traditional values with modern pedagogy. Our teachers are not just instructors — they are mentors who invest in every student's personal growth.</p>
                  <p>I invite every parent to partner with us in this beautiful journey of education. Together, we can unlock the infinite potential in every child.</p>
                  <p className="font-semibold text-[#0F4F4B] italic">— With warm regards, Mr. Dharampal Singh</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* VISION & MISSION */}
      <section className="py-20 bg-white">
        <motion.div className="container mx-auto px-4 md:px-8" {...fade()}>
          <div className="text-center mb-12">
            <span className="text-[#0D9488] text-xs font-bold uppercase tracking-widest">PURPOSE</span>
            <h2 className="text-3xl font-bold text-[#134E4A] mt-2">Vision & Mission</h2>
            <div className="w-10 h-[3px] bg-[#0D9488] mx-auto mt-3 rounded-full" />
          </div>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {[
              { icon: Eye, title: "Our Vision", color: "#0D9488", text: "To be a center of excellence that nurtures holistic development — creating lifelong learners who are compassionate, responsible, and capable of leading positive change in society. We envision every student walking out of our gates fully equipped to face the world with confidence, integrity, and wisdom." },
              { icon: Target, title: "Our Mission", color: "#0F766E", text: "To provide a stimulating learning environment with a technological orientation, promoting intellectual, physical, and emotional growth through a well-rounded curriculum. We commit to personalized attention, teacher training, community engagement, and creating an atmosphere where every student feels valued and inspired." },
            ].map((item, i) => (
              <motion.div key={i} variants={cardVariant} className="bg-[#F0FDFA] p-10 rounded-2xl border-t-4 hover:-translate-y-1 hover:shadow-xl transition-all duration-300" style={{ borderTopColor: item.color }}>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: item.color + "20" }}>
                  <item.icon size={28} style={{ color: item.color }} />
                </div>
                <h3 className="text-2xl font-bold text-[#0F4F4B] mb-4">{item.title}</h3>
                <p className="text-[#4B7B76] leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* CORE VALUES */}
      <section className="py-20 bg-gradient-to-br from-[#0F4F4B] to-[#0D9488] text-white">
        <motion.div className="container mx-auto px-4 md:px-8 text-center" {...fade()}>
          <span className="text-[#99F6E4] text-xs font-bold uppercase tracking-widest">PRINCIPLES</span>
          <h2 className="text-3xl font-bold mt-2 mb-3">Core Values</h2>
          <div className="w-10 h-[3px] bg-[#99F6E4] mx-auto mb-12 rounded-full" />
          <motion.div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {[
              { icon: ShieldCheck, title: "Integrity", desc: "Honesty in all actions" },
              { icon: Award, title: "Excellence", desc: "Highest quality always" },
              { icon: BookOpen, title: "Discipline", desc: "Focused dedication" },
              { icon: Heart, title: "Compassion", desc: "Care for community" },
              { icon: Users, title: "Teamwork", desc: "Growing together" },
              { icon: Trophy, title: "Achievement", desc: "Celebrating success" },
            ].map((val, i) => (
              <motion.div key={i} variants={cardVariant} className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 hover:bg-white/20 hover:-translate-y-1 transition-all duration-300">
                <val.icon size={28} className="text-[#99F6E4] mx-auto mb-3" />
                <h3 className="font-bold text-white mb-1">{val.title}</h3>
                <p className="text-[#99F6E4] text-xs">{val.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* MILESTONES TIMELINE */}
      <section className="py-20 bg-white">
        <motion.div className="container mx-auto px-4 md:px-8" {...fade()}>
          <div className="text-center mb-14">
            <span className="text-[#0D9488] text-xs font-bold uppercase tracking-widest">JOURNEY</span>
            <h2 className="text-3xl font-bold text-[#134E4A] mt-2">Our Milestones</h2>
            <div className="w-10 h-[3px] bg-[#0D9488] mx-auto mt-3 rounded-full" />
          </div>
          <div className="max-w-3xl mx-auto relative">
            {[
              { year: "2005", title: "Foundation", desc: "School established with 3 classrooms and 80 students in Dhons, Kaithal." },
              { year: "2008", title: "Primary Wing Expanded", desc: "Added Classes 6–8. New building block constructed. Faculty grew to 20 teachers." },
              { year: "2012", title: "Secondary Section", desc: "Classes 9 & 10 introduced. First batch appeared for HBSE Board Exam with 100% pass rate." },
              { year: "2016", title: "Computer Lab", desc: "State-of-the-art computer lab with 40 systems installed. Digital education begins." },
              { year: "2019", title: "Sr. Secondary", desc: "Classes 11 & 12 (Science & Commerce) launched. School crosses 800 students enrolled." },
              { year: "2023", title: "Smart Classrooms", desc: "Smart boards and projectors installed in all classrooms. Science labs upgraded." },
              { year: "2025", title: "20 Years of Excellence", desc: "Celebrating two decades! 5000+ alumni. New sports ground and library wing inaugurated." },
            ].map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className={`flex gap-6 mb-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} flex-row`}
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-[#0D9488] rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg flex-shrink-0 z-10">{m.year.slice(-2)}</div>
                  <div className="flex-1 w-0.5 bg-transparent" />
                </div>
                <div className={`bg-[#F0FDFA] rounded-2xl p-5 flex-1 border border-[#99F6E4]/40 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ${i % 2 === 0 ? "md:mr-8" : "md:ml-8"}`}>
                  <span className="text-[#0D9488] text-xs font-bold">{m.year}</span>
                  <h3 className="font-bold text-[#0F4F4B] mt-0.5 mb-1">{m.title}</h3>
                  <p className="text-[#4B7B76] text-sm">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ACHIEVEMENTS & AWARDS */}
      <section className="py-20 bg-[#F0FDFA]">
        <motion.div className="container mx-auto px-4 md:px-8" {...fade()}>
          <div className="text-center mb-12">
            <span className="text-[#0D9488] text-xs font-bold uppercase tracking-widest">RECOGNITION</span>
            <h2 className="text-3xl font-bold text-[#134E4A] mt-2">Awards & Achievements</h2>
            <div className="w-10 h-[3px] bg-[#0D9488] mx-auto mt-3 rounded-full" />
          </div>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {[
              { icon: "🏆", title: "Best School Award", year: "2023", org: "Kaithal District Education Dept." },
              { icon: "🎖️", title: "100% Board Results", year: "2022 & 2024", org: "HBSE Recognition" },
              { icon: "⭐", title: "Sports Excellence", year: "2023", org: "Haryana State School Games" },
              { icon: "📚", title: "Academic Topper", year: "2024", org: "District Level Science Fair" },
              { icon: "🌱", title: "Green Campus Award", year: "2023", org: "District Administration" },
              { icon: "💡", title: "Digital School", year: "2024", org: "State Education Dept." },
              { icon: "👨‍🏫", title: "Best Teacher Award", year: "2023", org: "3 teachers felicitated" },
              { icon: "🥇", title: "District Champions", year: "2024", org: "Inter-School Quiz Competition" },
            ].map((award, i) => (
              <motion.div key={i} variants={cardVariant} className="bg-white rounded-2xl p-5 shadow-[0_4px_20px_rgba(13,148,136,0.08)] border border-[#99F6E4]/30 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 text-center">
                <div className="text-4xl mb-3">{award.icon}</div>
                <h3 className="font-bold text-[#0F4F4B] mb-1 text-sm">{award.title}</h3>
                <p className="text-[#0D9488] text-xs font-semibold">{award.year}</p>
                <p className="text-[#4B7B76] text-xs mt-1">{award.org}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* FACULTY */}
      <section className="py-20 bg-white">
        <motion.div className="container mx-auto px-4 md:px-8 text-center" {...fade()}>
          <span className="text-[#0D9488] text-xs font-bold uppercase tracking-widest">OUR TEAM</span>
          <h2 className="text-3xl font-bold text-[#134E4A] mt-2 mb-3">Meet Our Faculty</h2>
          <div className="w-10 h-[3px] bg-[#0D9488] mx-auto mb-4 rounded-full" />
          <p className="text-[#4B7B76] max-w-xl mx-auto mb-12 text-sm">60+ experienced educators — mentors, guides, and facilitators of learning who go beyond the textbook.</p>
          <motion.div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {[
              { img: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?auto=format&fit=crop&w=300&q=80", name: "Mr. Rajesh Sharma", sub: "Mathematics", exp: "15 yrs" },
              { img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80", name: "Mrs. Priya Mehta", sub: "Science", exp: "12 yrs" },
              { img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80", name: "Mr. Anil Kumar", sub: "English", exp: "18 yrs" },
              { img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80", name: "Mrs. Sunita Rao", sub: "Social Studies", exp: "10 yrs" },
              { img: "https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?auto=format&fit=crop&w=300&q=80", name: "Mr. Vikram Negi", sub: "Physics", exp: "14 yrs" },
              { img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80", name: "Mrs. Kavya Reddy", sub: "Chemistry", exp: "11 yrs" },
              { img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80", name: "Mr. Suresh Yadav", sub: "Computer Science", exp: "9 yrs" },
              { img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80", name: "Mrs. Anita Sharma", sub: "Hindi & Sanskrit", exp: "16 yrs" },
            ].map((teacher, i) => (
              <motion.div key={i} variants={cardVariant} className="bg-[#F0FDFA] rounded-2xl p-5 shadow-[0_4px_20px_rgba(13,148,136,0.07)] border border-[#99F6E4]/30 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                <img src={teacher.img} alt={teacher.name} className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-white shadow mb-4 hover:scale-105 transition-transform duration-300" />
                <h3 className="font-bold text-[#134E4A] text-sm">{teacher.name}</h3>
                <p className="text-[#0D9488] text-xs font-semibold mt-0.5">{teacher.sub}</p>
                <p className="text-[#4B7B76] text-xs mt-1">Exp: {teacher.exp}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* INFRASTRUCTURE */}
      <section className="py-20 bg-[#F0FDFA]">
        <motion.div className="container mx-auto px-4 md:px-8" {...fade()}>
          <div className="text-center mb-12">
            <span className="text-[#0D9488] text-xs font-bold uppercase tracking-widest">CAMPUS</span>
            <h2 className="text-3xl font-bold text-[#134E4A] mt-2">Our Infrastructure</h2>
            <div className="w-10 h-[3px] bg-[#0D9488] mx-auto mt-3 rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
            <div>
              <img src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80" alt="Campus" className="rounded-2xl shadow-xl w-full aspect-[4/3] object-cover" />
            </div>
            <div>
              <motion.div className="grid grid-cols-1 gap-3" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                {[
                  { icon: "🏫", label: "30+ Spacious Classrooms with natural light" },
                  { icon: "🔬", label: "Physics, Chemistry & Biology Labs" },
                  { icon: "💻", label: "Computer Lab with 40+ systems & high-speed internet" },
                  { icon: "📚", label: "Library with 10,000+ books, journals & e-resources" },
                  { icon: "⚽", label: "Multi-sport ground: cricket, football, kabaddi" },
                  { icon: "🎨", label: "Art, Music & Dance rooms" },
                  { icon: "🏥", label: "Medical room with first-aid facility" },
                  { icon: "🚌", label: "School transport covering nearby villages" },
                  { icon: "📹", label: "CCTV-monitored secure campus" },
                ].map((f, i) => (
                  <motion.div key={i} variants={cardVariant} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-[#99F6E4]/40 hover:border-[#0D9488]/40 hover:-translate-x-0.5 transition-all duration-200">
                    <span className="text-xl flex-shrink-0">{f.icon}</span>
                    <span className="text-[#4B7B76] text-sm">{f.label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* TESTIMONIALS FROM STUDENTS */}
      <section className="py-20 bg-gradient-to-br from-[#0F4F4B] to-[#0D9488] text-white">
        <motion.div className="container mx-auto px-4 md:px-8" {...fade()}>
          <div className="text-center mb-12">
            <span className="text-[#99F6E4] text-xs font-bold uppercase tracking-widest">ALUMNI SPEAK</span>
            <h2 className="text-3xl font-bold mt-2">What Our Alumni Say</h2>
            <div className="w-10 h-[3px] bg-[#99F6E4] mx-auto mt-3 rounded-full" />
          </div>
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {[
              { name: "Rohit Kumar", batch: "Batch 2020 — Engineer", text: "This school gave me the foundation to crack JEE Mains. The physics and math teachers here are exceptional. Forever grateful!", avatar: "RK" },
              { name: "Priya Singh", batch: "Batch 2021 — Medical Student", text: "The biology lab and dedicated science faculty helped me score 94% in boards and secure MBBS admission. Best years of my life!", avatar: "PS" },
              { name: "Amit Yadav", batch: "Batch 2019 — CA Student", text: "Commerce stream with such dedicated teachers — I cleared CA Foundation in first attempt! Proud to be an LPS alumnus.", avatar: "AY" },
            ].map((t, i) => (
              <motion.div key={i} variants={cardVariant} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, j) => <Star key={j} size={14} className="fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-white/90 text-sm leading-relaxed italic mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#0D9488] rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0">{t.avatar}</div>
                  <div>
                    <p className="font-bold text-sm">{t.name}</p>
                    <p className="text-[#99F6E4] text-xs">{t.batch}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-white text-center">
        <motion.div className="container mx-auto px-4" {...fade()}>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F4F4B] mb-3">Ready to Be Part of Our Family?</h2>
          <p className="text-[#4B7B76] mb-7">Admissions open for {new Date().getFullYear()}–{new Date().getFullYear()+1} session. Limited seats available.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/admissions" className="bg-[#0D9488] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#0F766E] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300">
              Apply for Admission →
            </a>
            <a href="/contact" className="border-2 border-[#0D9488] text-[#0D9488] font-semibold px-8 py-3 rounded-full hover:bg-[#0D9488] hover:text-white transition-all duration-300">
              Contact Us
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
