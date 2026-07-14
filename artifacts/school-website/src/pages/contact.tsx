import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "General Inquiry", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone.replace(/\s/g, ""))) e.phone = "Valid 10-digit phone required";
    if (!form.message.trim()) e.message = "Please write your message";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1400);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* HERO */}
      <section className="bg-gradient-to-br from-[#0F4F4B] to-[#0D9488] pt-28 pb-16 text-white text-center">
        <div className="container mx-auto px-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[#99F6E4] text-xs font-bold uppercase tracking-widest mb-3"
          >
            GET IN TOUCH
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-3"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#99F6E4] text-base max-w-lg mx-auto"
          >
            We're here to help. Reach out for admissions, queries, or feedback.
          </motion.p>
        </div>
      </section>

      {/* INFO CARDS */}
      <section className="py-14 bg-[#F0FDFA]">
        <motion.div
          className="container mx-auto px-4 md:px-8"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: <MapPin size={22} />, title: "Our Location",
                lines: ["Love Public Sr. Sec. School", "Dhons, Kaithal (Haryana)"],
              },
              {
                icon: <Phone size={22} />, title: "Call / WhatsApp",
                lines: ["+91-9876543210", "+91-9876543211"],
              },
              {
                icon: <Mail size={22} />, title: "Email",
                lines: ["info@lovepublicschool.edu.in", "admissions@lovepublicschool.edu.in"],
              },
              {
                icon: <Clock size={22} />, title: "Working Hours",
                lines: ["Mon – Sat: 8:00 AM – 2:30 PM", "Office: 8:00 AM – 4:00 PM"],
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(13,148,136,0.09)] border-t-4 border-[#0D9488] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(13,148,136,0.16)] transition-all duration-300"
              >
                <div className="w-10 h-10 bg-[#0D9488]/10 rounded-lg flex items-center justify-center text-[#0D9488] mb-4">
                  {card.icon}
                </div>
                <h3 className="font-bold text-[#134E4A] mb-2">{card.title}</h3>
                {card.lines.map((l, j) => (
                  <p key={j} className="text-[#4B7B76] text-sm">{l}</p>
                ))}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* FORM + MAP */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* CONTACT FORM */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(13,148,136,0.10)] border border-[#99F6E4]/40 p-4 sm:p-7 md:p-9"
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-14 text-center"
                  >
                    <div className="w-16 h-16 bg-[#0D9488] rounded-full flex items-center justify-center mb-5">
                      <CheckCircle2 size={32} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#0F4F4B] mb-2">Message Sent!</h3>
                    <p className="text-[#4B7B76] text-sm max-w-xs">
                      Thank you for contacting us. Our team will get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", subject: "General Inquiry", message: "" }); }}
                      className="mt-6 text-[#0D9488] font-semibold hover:underline text-sm"
                    >
                      Send another message →
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h2 className="text-2xl font-bold text-[#0F4F4B] mb-1">Send Us a Message</h2>
                    <p className="text-[#4B7B76] text-sm mb-6">Fill the form below and we'll respond soon</p>

                    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#0F4F4B] mb-1.5">Full Name *</label>
                          <input
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="Your full name"
                            className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#0D9488]/30 focus:border-[#0D9488] transition-all ${errors.name ? "border-red-400" : "border-[#99F6E4]"}`}
                          />
                          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#0F4F4B] mb-1.5">Phone Number *</label>
                          <input
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            placeholder="10-digit mobile no."
                            className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#0D9488]/30 focus:border-[#0D9488] transition-all ${errors.phone ? "border-red-400" : "border-[#99F6E4]"}`}
                          />
                          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#0F4F4B] mb-1.5">Email (Optional)</label>
                          <input
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            placeholder="your@email.com"
                            className="w-full border border-[#99F6E4] rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#0D9488]/30 focus:border-[#0D9488] transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#0F4F4B] mb-1.5">Subject</label>
                          <select
                            value={form.subject}
                            onChange={(e) => setForm({ ...form, subject: e.target.value })}
                            className="w-full border border-[#99F6E4] rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#0D9488]/30 focus:border-[#0D9488] transition-all bg-white"
                          >
                            <option>General Inquiry</option>
                            <option>Admission Enquiry</option>
                            <option>Fee Related</option>
                            <option>Transport</option>
                            <option>Careers / Jobs</option>
                            <option>Feedback / Complaint</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#0F4F4B] mb-1.5">Your Message *</label>
                        <textarea
                          rows={4}
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          placeholder="Write your message here..."
                          className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#0D9488]/30 focus:border-[#0D9488] transition-all resize-none ${errors.message ? "border-red-400" : "border-[#99F6E4]"}`}
                        />
                        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#0D9488] text-white font-semibold py-3 rounded-lg hover:bg-[#0F766E] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
                      >
                        {loading
                          ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          : <><Send size={16} /> Send Message</>
                        }
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* GOOGLE MAP */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(13,148,136,0.10)] border border-[#99F6E4]/40 min-h-[260px] md:min-h-[440px]"
            >
              <iframe
                title="Love Public School Location"
                src="https://maps.google.com/maps?q=Dhons,+Kaithal,+Haryana,+India&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "260px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>

          </div>
        </div>
      </section>

      {/* QUICK CONTACT CTA */}
      <section className="py-14 bg-gradient-to-br from-[#0F4F4B] to-[#0D9488] text-white text-center">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="container mx-auto px-4"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Prefer to Call Directly?</h2>
          <p className="text-[#99F6E4] mb-6 text-sm">Our admissions team is available Mon–Sat, 8 AM to 4 PM</p>
          <a
            href="tel:+919876543210"
            className="inline-flex items-center gap-2 bg-white text-[#0F4F4B] font-bold px-8 py-3 rounded-full hover:bg-[#CCFBF1] hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300"
          >
            <Phone size={17} /> Call +91-9876543210
          </a>
        </motion.div>
      </section>
    </div>
  );
}
