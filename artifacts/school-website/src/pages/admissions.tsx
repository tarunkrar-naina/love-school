import { useState } from "react";
import { CheckCircle2, Send, FileText, Users, GraduationCap, Phone } from "lucide-react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { apiUrl } from "@/lib/api";

const CURRENT_YEAR = new Date().getFullYear();
const FULL_YEAR = `${CURRENT_YEAR}-${CURRENT_YEAR + 1}`;

const CLASS_OPTIONS = [
  "LKG", "UKG",
  "Class 1", "Class 2", "Class 3", "Class 4", "Class 5",
  "Class 6", "Class 7", "Class 8", "Class 9", "Class 10",
  "Class 11 – Science", "Class 11 – Commerce",
  "Class 12 – Science", "Class 12 – Commerce",
];

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

type FormData = {
  studentName: string; dob: string; gender: string; aadhar: string;
  fatherName: string; motherName: string; phone: string; altPhone: string; email: string;
  address: string; city: string; pincode: string;
  classApplying: string; prevSchool: string; prevClass: string; prevMarks: string;
  transport: string; hostel: string; category: string;
};

export default function Admissions() {
  const [activeTab, setActiveTab] = useState<"info" | "form">("info");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState<FormData>({
    studentName: "", dob: "", gender: "", aadhar: "",
    fatherName: "", motherName: "", phone: "", altPhone: "", email: "",
    address: "", city: "", pincode: "",
    classApplying: "", prevSchool: "", prevClass: "", prevMarks: "",
    transport: "No", hostel: "No", category: "General",
  });

  const set = (field: keyof FormData, val: string) => {
    setForm((f) => ({ ...f, [field]: val }));
    setErrors((e) => { const ne = { ...e }; delete ne[field]; return ne; });
  };

  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!form.studentName.trim()) e.studentName = "Student name is required";
    if (!form.dob) e.dob = "Date of birth is required";
    if (!form.gender) e.gender = "Please select gender";
    return e;
  };
  const validateStep2 = () => {
    const e: Record<string, string> = {};
    if (!form.fatherName.trim()) e.fatherName = "Father's name is required";
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone)) e.phone = "Valid 10-digit phone required";
    if (!form.address.trim()) e.address = "Address is required";
    return e;
  };
  const validateStep3 = () => {
    const e: Record<string, string> = {};
    if (!form.classApplying) e.classApplying = "Please select class";
    return e;
  };

  const nextStep = () => {
    let errs: Record<string, string> = {};
    if (step === 1) errs = validateStep1();
    if (step === 2) errs = validateStep2();
    if (step === 3) errs = validateStep3();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setStep((s) => s + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateStep3();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    try {
      const res = await fetch(apiUrl("/api/admission"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrors({ classApplying: data.error || "Form submit karne mein error aaya. Dobara try karein." });
        setLoading(false);
        return;
      }
      setSubmitted(true);
    } catch {
      setErrors({ classApplying: "Network error. Apna internet connection check karein aur dobara try karein." });
    } finally {
      setLoading(false);
    }
  };

  const inputCls = (field: string) =>
    `w-full border rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#0D9488]/30 focus:border-[#0D9488] transition-all bg-white ${errors[field] ? "border-red-400" : "border-[#99F6E4]"}`;

  return (
    <div>
      {/* HERO */}
      <section className="bg-gradient-to-br from-[#0F4F4B] to-[#0D9488] pt-28 pb-16 text-white text-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-amber-400/90 text-[#0F4F4B] px-5 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider mb-4"
          >
            🎓 Admissions Open {FULL_YEAR}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-3"
          >
            School Admissions {FULL_YEAR}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#99F6E4] text-base max-w-xl mx-auto mb-8"
          >
            Admissions open for LKG to Class 12. Limited seats — apply early!
          </motion.p>
          {/* TAB SWITCHER */}
          <div className="inline-flex bg-white/10 rounded-full p-1 gap-1">
            <button
              onClick={() => setActiveTab("info")}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === "info" ? "bg-white text-[#0F4F4B]" : "text-white hover:bg-white/10"}`}
            >
              Admission Info
            </button>
            <button
              onClick={() => setActiveTab("form")}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === "form" ? "bg-white text-[#0F4F4B]" : "text-white hover:bg-white/10"}`}
            >
              Apply Online ✍️
            </button>
          </div>
        </div>
      </section>

      <AnimatePresence mode="wait">
        {activeTab === "info" ? (
          <motion.div
            key="info"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
          >
            {/* PROCESS STEPS */}
            <section className="py-16 bg-white">
              <motion.div
                className="container mx-auto px-4 md:px-8"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="text-center mb-12">
                  <span className="text-[#0D9488] text-xs font-bold uppercase tracking-widest">STEPS</span>
                  <h2 className="text-3xl font-bold text-[#134E4A] mt-2 mb-3">Admission Process</h2>
                  <div className="w-10 h-[3px] bg-[#0D9488] mx-auto rounded-full" />
                </div>

                <div className="relative max-w-5xl mx-auto">
                  <div className="hidden md:block absolute top-10 left-8 right-8 h-[2px] border-t-2 border-dashed border-[#0D9488]/40 z-0" />
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-4 gap-8"
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {[
                      { step: "01", icon: <FileText size={20}/>, title: "Fill Application", desc: "Fill the online form with student details" },
                      { step: "02", icon: <FileText size={20}/>, title: "Submit Documents", desc: "Birth cert, TC, Aadhar, photos, marksheet" },
                      { step: "03", icon: <Users size={20}/>, title: "Interaction", desc: "Brief interaction with principal & team" },
                      { step: "04", icon: <GraduationCap size={20}/>, title: "Enroll & Pay", desc: "Pay fee and confirm your child's seat" },
                    ].map((item, i) => (
                      <motion.div key={i} variants={cardVariant} className="flex flex-col items-center text-center relative z-10">
                        <div className="w-20 h-20 bg-[#0D9488] rounded-full text-white flex items-center justify-center font-bold text-2xl mb-4 shadow-lg ring-8 ring-white hover:bg-[#0F766E] transition-colors cursor-default">
                          {item.step}
                        </div>
                        <h3 className="text-base font-bold text-[#134E4A] mb-1">{item.title}</h3>
                        <p className="text-[#4B7B76] text-sm">{item.desc}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                <div className="text-center mt-10">
                  <button
                    onClick={() => setActiveTab("form")}
                    className="bg-[#0D9488] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#0F766E] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 inline-flex items-center gap-2"
                  >
                    Apply Online Now <Send size={15} />
                  </button>
                </div>
              </motion.div>
            </section>

            {/* DOCUMENTS + ELIGIBILITY */}
            <section className="py-16 bg-[#F0FDFA]">
              <motion.div
                className="container mx-auto px-4 md:px-8"
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  <motion.div variants={cardVariant} className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(13,148,136,0.09)] hover:-translate-y-1 transition-all duration-300">
                    <h3 className="text-xl font-bold text-[#0F4F4B] mb-5 border-b border-[#99F6E4]/50 pb-3">📋 Documents Required</h3>
                    <ul className="space-y-3">
                      {[
                        "Birth Certificate (Govt. issued)",
                        "Transfer Certificate (from previous school)",
                        "Previous Year Marksheet / Report Card",
                        "4 Passport-size photos of student",
                        "Aadhar Card — student & both parents",
                        "Caste Certificate (if applicable)",
                        "Medical Fitness Certificate",
                      ].map((d, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 size={16} className="text-[#0D9488] mt-0.5 flex-shrink-0" />
                          <span className="text-[#4B7B76] text-sm">{d}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div variants={cardVariant} className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(13,148,136,0.09)] hover:-translate-y-1 transition-all duration-300">
                    <h3 className="text-xl font-bold text-[#0F4F4B] mb-5 border-b border-[#99F6E4]/50 pb-3">✅ Eligibility Criteria</h3>
                    <ul className="space-y-3">
                      {[
                        "LKG: Age 3.5 – 4.5 years as of 1st April",
                        "UKG: Age 4.5 – 5.5 years as of 1st April",
                        "Class 1: Age 5.5 – 6.5 years as of 1st April",
                        "Class 2–10: Based on previous class performance",
                        "Class 11 admission based on Class 10 HBSE result",
                        "Interaction session required for Class 6 & above",
                        "Seats are limited — first come, first served",
                      ].map((c, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 size={16} className="text-[#0D9488] mt-0.5 flex-shrink-0" />
                          <span className="text-[#4B7B76] text-sm">{c}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            </section>

            {/* FEE STRUCTURE */}
            <section className="py-16 bg-white">
              <motion.div
                className="container mx-auto px-4 md:px-8 text-center"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <span className="text-[#0D9488] text-xs font-bold uppercase tracking-widest">INVESTMENT</span>
                <h2 className="text-3xl font-bold text-[#134E4A] mt-2 mb-3">Fee Structure {FULL_YEAR}</h2>
                <div className="w-10 h-[3px] bg-[#0D9488] mx-auto rounded-full mb-4" />
                <p className="text-[#4B7B76] mb-10">Transparent, affordable quality education for every child</p>

                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
                  variants={stagger}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {[
                    {
                      img: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=600&q=80",
                      level: "Nursery / KG", classes: "LKG & UKG", fee: "Contact School", border: "#0D9488",
                      tag: "Age 3–6 yrs"
                    },
                    {
                      img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80",
                      level: "Primary", classes: "Class 1 – 5", fee: "Contact School", border: "#0F766E",
                      tag: "Age 6–11 yrs"
                    },
                    {
                      img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80",
                      level: "Secondary", classes: "Class 6 – 10", fee: "Contact School", border: "#0F4F4B",
                      tag: "Age 11–16 yrs"
                    },
                    {
                      img: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=600&q=80",
                      level: "Sr. Secondary", classes: "Class 11 – 12", fee: "Contact School", border: "#134E4A",
                      tag: "Age 16–18 yrs"
                    },
                  ].map((tier, i) => (
                    <motion.div key={i} variants={cardVariant}>
                      <div className="bg-white rounded-2xl border-t-4 shadow-[0_4px_20px_rgba(13,148,136,0.10)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(13,148,136,0.20)] transition-all duration-300 overflow-hidden" style={{ borderTopColor: tier.border }}>
                        <div className="relative h-44 overflow-hidden">
                          <img
                            src={tier.img}
                            alt={tier.level}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${i + 20}/600/400`;
                            }}
                          />
                          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[#0F4F4B] text-xs font-bold px-2.5 py-1 rounded-full shadow">
                            {tier.tag}
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0F4F4B]/50 to-transparent" />
                        </div>
                        <div className="p-5 text-left">
                          <h3 className="text-lg font-bold text-[#134E4A] mb-0.5">{tier.level}</h3>
                          <p className="text-[#4B7B76] text-sm mb-3">{tier.classes}</p>
                          <div className="text-sm font-semibold text-[#0D9488]">{tier.fee}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                <p className="text-[#4B7B76] text-sm mt-6">
                  For exact fee details, call{" "}
                  <a href="tel:+919876543210" className="text-[#0D9488] font-semibold hover:underline">+91-9876543210</a>
                </p>
              </motion.div>
            </section>
          </motion.div>
        ) : (
          /* ────────────── ONLINE APPLICATION FORM ────────────── */
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
          >
            <section className="py-16 bg-[#F0FDFA]">
              <div className="container mx-auto px-4 md:px-8 max-w-4xl">

                {/* Success */}
                <AnimatePresence>
                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(13,148,136,0.12)] p-12 text-center"
                    >
                      <div className="w-20 h-20 bg-[#0D9488] rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={38} className="text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-[#0F4F4B] mb-3">Application Submitted!</h2>
                      <p className="text-[#4B7B76] mb-2 max-w-md mx-auto">
                        Thank you, <strong>{form.studentName}</strong>! Your application for{" "}
                        <strong>{form.classApplying}</strong> has been received.
                      </p>
                      <p className="text-[#4B7B76] text-sm mb-8">
                        Our admissions team will call you on <strong>{form.phone}</strong> within 1–2 working days.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                          onClick={() => { setSubmitted(false); setStep(1); setForm({ studentName:"",dob:"",gender:"",aadhar:"",fatherName:"",motherName:"",phone:"",altPhone:"",email:"",address:"",city:"",pincode:"",classApplying:"",prevSchool:"",prevClass:"",prevMarks:"",transport:"No",hostel:"No",category:"General" }); }}
                          className="bg-[#0D9488] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#0F766E] transition-all hover:-translate-y-0.5"
                        >
                          Submit Another Application
                        </button>
                        <Link
                          href="/contact"
                          className="border border-[#0D9488] text-[#0D9488] font-semibold px-6 py-3 rounded-full hover:bg-[#0D9488] hover:text-white transition-all"
                        >
                          Contact Us
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!submitted && (
                  <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(13,148,136,0.12)] overflow-hidden">
                    {/* Form Header */}
                    <div className="bg-[#0F4F4B] px-8 py-6 text-white">
                      <h2 className="text-2xl font-bold">Student Admission Form {FULL_YEAR}</h2>
                      <p className="text-[#99F6E4] text-sm mt-1">Love Public Sr. Sec. School, Dhons, Kaithal</p>
                    </div>

                    {/* Step Indicator */}
                    <div className="flex items-center px-3 sm:px-8 py-3 sm:py-4 border-b border-[#99F6E4]/30 bg-[#F0FDFA]">
                      {["Student Details", "Parent & Contact", "Academic Details", "Review & Submit"].map((label, i) => (
                        <div key={i} className="flex items-center flex-1">
                          <div className={`flex flex-col items-center ${i < 3 ? "flex-1" : ""}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${step > i + 1 ? "bg-[#0D9488] text-white" : step === i + 1 ? "bg-[#0F4F4B] text-white ring-4 ring-[#99F6E4]/50" : "bg-gray-200 text-gray-500"}`}>
                              {step > i + 1 ? "✓" : i + 1}
                            </div>
                            <span className={`text-[10px] mt-1 font-medium hidden sm:block ${step === i + 1 ? "text-[#0F4F4B]" : "text-gray-400"}`}>{label}</span>
                          </div>
                          {i < 3 && <div className={`h-0.5 flex-1 mx-1 transition-colors duration-300 ${step > i + 1 ? "bg-[#0D9488]" : "bg-gray-200"}`} />}
                        </div>
                      ))}
                    </div>

                    <form onSubmit={handleSubmit} className="p-4 sm:p-6 md:p-8">
                      <AnimatePresence mode="wait">
                        {/* STEP 1: Student Details */}
                        {step === 1 && (
                          <motion.div key="s1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                            <h3 className="text-lg font-bold text-[#0F4F4B] mb-5 pb-2 border-b border-[#99F6E4]/40">
                              👦 Student Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                              <div className="md:col-span-2">
                                <label className="block text-xs font-semibold text-[#0F4F4B] mb-1.5">Student Full Name *</label>
                                <input value={form.studentName} onChange={(e) => set("studentName", e.target.value)} placeholder="As per birth certificate" className={inputCls("studentName")} />
                                {errors.studentName && <p className="text-red-500 text-xs mt-1">{errors.studentName}</p>}
                              </div>
                              <div>
                                <label className="block text-xs font-semibold text-[#0F4F4B] mb-1.5">Date of Birth *</label>
                                <input type="date" value={form.dob} onChange={(e) => set("dob", e.target.value)} className={inputCls("dob")} />
                                {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
                              </div>
                              <div>
                                <label className="block text-xs font-semibold text-[#0F4F4B] mb-1.5">Gender *</label>
                                <select value={form.gender} onChange={(e) => set("gender", e.target.value)} className={inputCls("gender")}>
                                  <option value="">Select gender</option>
                                  <option>Male</option>
                                  <option>Female</option>
                                  <option>Other</option>
                                </select>
                                {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                              </div>
                              <div>
                                <label className="block text-xs font-semibold text-[#0F4F4B] mb-1.5">Student Aadhar No. (Optional)</label>
                                <input value={form.aadhar} onChange={(e) => set("aadhar", e.target.value)} placeholder="12-digit Aadhar number" maxLength={12} className={inputCls("aadhar")} />
                              </div>
                              <div>
                                <label className="block text-xs font-semibold text-[#0F4F4B] mb-1.5">Category</label>
                                <select value={form.category} onChange={(e) => set("category", e.target.value)} className={inputCls("category")}>
                                  <option>General</option>
                                  <option>OBC</option>
                                  <option>SC</option>
                                  <option>ST</option>
                                  <option>EWS</option>
                                </select>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* STEP 2: Parent & Contact */}
                        {step === 2 && (
                          <motion.div key="s2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                            <h3 className="text-lg font-bold text-[#0F4F4B] mb-5 pb-2 border-b border-[#99F6E4]/40">
                              👨‍👩‍👧 Parent / Guardian Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                              <div>
                                <label className="block text-xs font-semibold text-[#0F4F4B] mb-1.5">Father's Full Name *</label>
                                <input value={form.fatherName} onChange={(e) => set("fatherName", e.target.value)} placeholder="Father's full name" className={inputCls("fatherName")} />
                                {errors.fatherName && <p className="text-red-500 text-xs mt-1">{errors.fatherName}</p>}
                              </div>
                              <div>
                                <label className="block text-xs font-semibold text-[#0F4F4B] mb-1.5">Mother's Full Name</label>
                                <input value={form.motherName} onChange={(e) => set("motherName", e.target.value)} placeholder="Mother's full name" className={inputCls("motherName")} />
                              </div>
                              <div>
                                <label className="block text-xs font-semibold text-[#0F4F4B] mb-1.5">Mobile Number *</label>
                                <input value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="10-digit mobile" maxLength={10} className={inputCls("phone")} />
                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                              </div>
                              <div>
                                <label className="block text-xs font-semibold text-[#0F4F4B] mb-1.5">Alternate Phone</label>
                                <input value={form.altPhone} onChange={(e) => set("altPhone", e.target.value)} placeholder="Alternate number" className={inputCls("altPhone")} />
                              </div>
                              <div className="md:col-span-2">
                                <label className="block text-xs font-semibold text-[#0F4F4B] mb-1.5">Email (Optional)</label>
                                <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="parent@email.com" className={inputCls("email")} />
                              </div>
                              <div className="md:col-span-2">
                                <label className="block text-xs font-semibold text-[#0F4F4B] mb-1.5">Home Address *</label>
                                <textarea rows={2} value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="House no., street, village/city" className={`${inputCls("address")} resize-none`} />
                                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                              </div>
                              <div>
                                <label className="block text-xs font-semibold text-[#0F4F4B] mb-1.5">City / Village</label>
                                <input value={form.city} onChange={(e) => set("city", e.target.value)} placeholder="City or village name" className={inputCls("city")} />
                              </div>
                              <div>
                                <label className="block text-xs font-semibold text-[#0F4F4B] mb-1.5">PIN Code</label>
                                <input value={form.pincode} onChange={(e) => set("pincode", e.target.value)} placeholder="6-digit PIN" maxLength={6} className={inputCls("pincode")} />
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* STEP 3: Academic Details */}
                        {step === 3 && (
                          <motion.div key="s3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                            <h3 className="text-lg font-bold text-[#0F4F4B] mb-5 pb-2 border-b border-[#99F6E4]/40">
                              📚 Academic Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                              <div>
                                <label className="block text-xs font-semibold text-[#0F4F4B] mb-1.5">Class Applying For *</label>
                                <select value={form.classApplying} onChange={(e) => set("classApplying", e.target.value)} className={inputCls("classApplying")}>
                                  <option value="">Select class</option>
                                  {CLASS_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                                </select>
                                {errors.classApplying && <p className="text-red-500 text-xs mt-1">{errors.classApplying}</p>}
                              </div>
                              <div>
                                <label className="block text-xs font-semibold text-[#0F4F4B] mb-1.5">Previous School Name</label>
                                <input value={form.prevSchool} onChange={(e) => set("prevSchool", e.target.value)} placeholder="Name of previous school" className={inputCls("prevSchool")} />
                              </div>
                              <div>
                                <label className="block text-xs font-semibold text-[#0F4F4B] mb-1.5">Last Class Passed</label>
                                <input value={form.prevClass} onChange={(e) => set("prevClass", e.target.value)} placeholder="e.g. Class 5" className={inputCls("prevClass")} />
                              </div>
                              <div>
                                <label className="block text-xs font-semibold text-[#0F4F4B] mb-1.5">Marks / Percentage Obtained</label>
                                <input value={form.prevMarks} onChange={(e) => set("prevMarks", e.target.value)} placeholder="e.g. 85%" className={inputCls("prevMarks")} />
                              </div>
                              <div>
                                <label className="block text-xs font-semibold text-[#0F4F4B] mb-1.5">Need School Transport?</label>
                                <select value={form.transport} onChange={(e) => set("transport", e.target.value)} className={inputCls("transport")}>
                                  <option>No</option>
                                  <option>Yes</option>
                                </select>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* STEP 4: Review */}
                        {step === 4 && (
                          <motion.div key="s4" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                            <h3 className="text-lg font-bold text-[#0F4F4B] mb-5 pb-2 border-b border-[#99F6E4]/40">
                              ✅ Review Your Application
                            </h3>
                            <div className="space-y-4">
                              {[
                                { label: "Student Name", value: form.studentName },
                                { label: "Date of Birth", value: form.dob },
                                { label: "Gender", value: form.gender },
                                { label: "Father's Name", value: form.fatherName },
                                { label: "Mother's Name", value: form.motherName || "—" },
                                { label: "Contact", value: form.phone },
                                { label: "Address", value: `${form.address}${form.city ? ", " + form.city : ""}${form.pincode ? " – " + form.pincode : ""}` },
                                { label: "Class Applying", value: form.classApplying },
                                { label: "Previous School", value: form.prevSchool || "—" },
                                { label: "Transport Needed", value: form.transport },
                                { label: "Category", value: form.category },
                              ].map((row, i) => (
                                <div key={i} className="flex gap-4 py-2.5 border-b border-[#99F6E4]/30 last:border-0">
                                  <span className="text-xs font-semibold text-[#4B7B76] w-36 flex-shrink-0">{row.label}</span>
                                  <span className="text-sm text-[#0F4F4B] font-medium">{row.value}</span>
                                </div>
                              ))}
                            </div>
                            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
                              ⚠️ Please verify all details before submitting. Our team will contact you within 1–2 working days.
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Navigation Buttons */}
                      <div className="flex justify-between mt-8 pt-5 border-t border-[#99F6E4]/30">
                        {step > 1 ? (
                          <button type="button" onClick={() => setStep((s) => s - 1)}
                            className="px-6 py-2.5 rounded-full border border-[#0D9488] text-[#0D9488] font-semibold text-sm hover:bg-[#0D9488] hover:text-white transition-all duration-300"
                          >
                            ← Back
                          </button>
                        ) : (
                          <div />
                        )}

                        {step < 4 ? (
                          <button type="button" onClick={nextStep}
                            className="px-7 py-2.5 rounded-full bg-[#0D9488] text-white font-semibold text-sm hover:bg-[#0F766E] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
                          >
                            Next Step →
                          </button>
                        ) : (
                          <button
                            type="submit"
                            disabled={loading}
                            className="px-8 py-2.5 rounded-full bg-[#0F4F4B] text-white font-bold text-sm hover:bg-[#0D9488] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 flex items-center gap-2 disabled:opacity-70"
                          >
                            {loading
                              ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              : <><Send size={15} /> Submit Application</>
                            }
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONTACT CTA */}
      <section className="py-14 bg-[#0F4F4B] text-white text-center">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="container mx-auto px-4"
        >
          <h2 className="text-2xl font-bold mb-3">Need Help with Admissions?</h2>
          <p className="text-[#99F6E4] text-sm mb-6">Our team is ready to assist — Mon to Sat, 8 AM to 4 PM</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+919876543210"
              className="inline-flex items-center gap-2 bg-[#0D9488] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#0F766E] hover:-translate-y-0.5 transition-all duration-300"
            >
              <Phone size={16} /> Call +91-9876543210
            </a>
            <Link href="/contact"
              className="inline-flex items-center gap-2 border border-white/40 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/10 transition-all duration-300"
            >
              Visit Contact Page
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
