import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, RefreshCw, Download, Search, GraduationCap } from "lucide-react";
import { apiUrl } from "@/lib/api";

type Admission = {
  id: number;
  studentName: string;
  dob: string;
  gender: string;
  fatherName: string;
  motherName: string | null;
  phone: string;
  email: string | null;
  address: string;
  city: string | null;
  classApplying: string;
  category: string | null;
  transport: string | null;
  hostel: string | null;
  prevSchool: string | null;
  prevMarks: string | null;
  status: string;
  submittedAt: string;
};

export default function AdminAdmissions() {
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Admission | null>(null);

  const fetchAdmissions = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(apiUrl("/api/admissions"));
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load");
      setAdmissions(data.admissions);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Data load karne mein error aaya");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAdmissions(); }, []);

  const filtered = admissions.filter((a) =>
    a.studentName.toLowerCase().includes(search.toLowerCase()) ||
    a.phone.includes(search) ||
    a.classApplying.toLowerCase().includes(search.toLowerCase())
  );

  const downloadCSV = () => {
    const headers = ["ID", "Student Name", "Father Name", "Phone", "Email", "Class", "DOB", "Gender", "Category", "Address", "City", "Transport", "Hostel", "Prev School", "Prev Marks", "Status", "Submitted At"];
    const rows = admissions.map((a) => [
      a.id, a.studentName, a.fatherName, a.phone, a.email ?? "", a.classApplying,
      a.dob, a.gender, a.category ?? "", a.address, a.city ?? "",
      a.transport ?? "", a.hostel ?? "", a.prevSchool ?? "", a.prevMarks ?? "",
      a.status, new Date(a.submittedAt).toLocaleString("en-IN"),
    ]);
    const csv = [headers, ...rows].map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `admissions_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#F0FDFA]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0F4F4B] to-[#0D9488] text-white px-4 md:px-8 py-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <GraduationCap size={22} />
            </div>
            <div>
              <h1 className="text-xl font-bold">Admission Forms</h1>
              <p className="text-[#99F6E4] text-xs">Love Public Sr. Sec. School — Admin Panel</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
              {admissions.length} Total
            </span>
            <button
              onClick={fetchAdmissions}
              className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
              title="Refresh"
            >
              <RefreshCw size={16} />
            </button>
            {admissions.length > 0 && (
              <button
                onClick={downloadCSV}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-[#0F4F4B] rounded-full text-xs font-semibold hover:bg-[#CCFBF1] transition-colors"
              >
                <Download size={14} /> CSV Download
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Search */}
        <div className="relative mb-6">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4B7B76]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Naam, phone ya class se search karein..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#99F6E4] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]/30 focus:border-[#0D9488] shadow-sm"
          />
        </div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-[#0D9488]/30 border-t-[#0D9488] rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-4 text-sm">
            ⚠️ {error}
          </div>
        )}

        {!loading && !error && admissions.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-16 h-16 bg-[#0D9488]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users size={28} className="text-[#0D9488]" />
            </div>
            <h3 className="text-lg font-semibold text-[#0F4F4B] mb-1">Koi application nahi aayi abhi tak</h3>
            <p className="text-[#4B7B76] text-sm">Jab koi admission form submit karega, wo yahan dikhega.</p>
          </motion.div>
        )}

        {!loading && filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {[
                { label: "Total Applications", val: admissions.length, color: "text-[#0D9488]" },
                { label: "Pending", val: admissions.filter(a => a.status === "pending").length, color: "text-amber-600" },
                { label: "Aaj ki applications", val: admissions.filter(a => new Date(a.submittedAt).toDateString() === new Date().toDateString()).length, color: "text-blue-600" },
                { label: "Class 11-12", val: admissions.filter(a => a.classApplying.includes("11") || a.classApplying.includes("12")).length, color: "text-purple-600" },
              ].map((s, i) => (
                <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-[#99F6E4]/40 text-center">
                  <p className={`text-2xl font-bold ${s.color}`}>{s.val}</p>
                  <p className="text-xs text-[#4B7B76] mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#99F6E4]/40 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-[#0F4F4B] text-white">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-xs">#</th>
                      <th className="px-4 py-3 text-left font-semibold text-xs">Student Name</th>
                      <th className="px-4 py-3 text-left font-semibold text-xs">Father Name</th>
                      <th className="px-4 py-3 text-left font-semibold text-xs">Phone</th>
                      <th className="px-4 py-3 text-left font-semibold text-xs">Class</th>
                      <th className="px-4 py-3 text-left font-semibold text-xs">Gender</th>
                      <th className="px-4 py-3 text-left font-semibold text-xs">Category</th>
                      <th className="px-4 py-3 text-left font-semibold text-xs">Status</th>
                      <th className="px-4 py-3 text-left font-semibold text-xs">Date</th>
                      <th className="px-4 py-3 text-left font-semibold text-xs">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((a, i) => (
                      <tr key={a.id} className={`border-b border-[#F0FDFA] hover:bg-[#F0FDFA] transition-colors ${i % 2 === 0 ? "bg-white" : "bg-[#FAFFFE]"}`}>
                        <td className="px-4 py-3 text-[#4B7B76] font-mono text-xs">{a.id}</td>
                        <td className="px-4 py-3 font-semibold text-[#0F4F4B]">{a.studentName}</td>
                        <td className="px-4 py-3 text-[#4B7B76]">{a.fatherName}</td>
                        <td className="px-4 py-3 font-mono text-[#0D9488]">{a.phone}</td>
                        <td className="px-4 py-3">
                          <span className="bg-[#0D9488]/10 text-[#0D9488] px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap">{a.classApplying}</span>
                        </td>
                        <td className="px-4 py-3 text-[#4B7B76]">{a.gender}</td>
                        <td className="px-4 py-3 text-[#4B7B76]">{a.category ?? "General"}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${a.status === "pending" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>
                            {a.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-[#4B7B76] text-xs whitespace-nowrap">
                          {new Date(a.submittedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => setSelected(a)}
                            className="text-[#0D9488] hover:underline text-xs font-medium"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-4 py-3 bg-[#F0FDFA] text-xs text-[#4B7B76] border-t border-[#99F6E4]/30">
                {filtered.length} results {search && `for "${search}"`}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto"
          >
            <div className="bg-gradient-to-r from-[#0F4F4B] to-[#0D9488] text-white px-6 py-4 rounded-t-2xl flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">{selected.studentName}</h3>
                <p className="text-[#99F6E4] text-xs">Application #{selected.id}</p>
              </div>
              <button onClick={() => setSelected(null)} className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30">✕</button>
            </div>
            <div className="p-6 space-y-3">
              {[
                ["Student Name", selected.studentName],
                ["Date of Birth", selected.dob],
                ["Gender", selected.gender],
                ["Class Applying", selected.classApplying],
                ["Category", selected.category ?? "General"],
                ["Father Name", selected.fatherName],
                ["Mother Name", selected.motherName ?? "—"],
                ["Phone", selected.phone],
                ["Email", selected.email ?? "—"],
                ["Address", selected.address],
                ["City", selected.city ?? "—"],
                ["Transport", selected.transport ?? "No"],
                ["Hostel", selected.hostel ?? "No"],
                ["Previous School", selected.prevSchool ?? "—"],
                ["Previous Marks", selected.prevMarks ?? "—"],
                ["Submitted At", new Date(selected.submittedAt).toLocaleString("en-IN")],
                ["Status", selected.status],
              ].map(([label, value]) => (
                <div key={label} className="flex gap-3 text-sm border-b border-[#F0FDFA] pb-2">
                  <span className="w-36 font-semibold text-[#0F4F4B] flex-shrink-0">{label}</span>
                  <span className="text-[#4B7B76]">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
