import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

const GALLERY_IMAGES = [
  // Classrooms
  { id: 1, url: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80", category: "Classrooms", title: "Modern Classroom" },
  { id: 2, url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80", category: "Classrooms", title: "School Library" },
  { id: 3, url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80", category: "Classrooms", title: "Smart Board Class" },
  { id: 4, url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80", category: "Classrooms", title: "Lecture Hall" },
  { id: 5, url: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=800&q=80", category: "Classrooms", title: "Science Lab" },
  { id: 6, url: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&w=800&q=80", category: "Classrooms", title: "Computer Lab" },
  { id: 7, url: "https://images.unsplash.com/photo-1453733190371-0a9bedd82893?auto=format&fit=crop&w=800&q=80", category: "Classrooms", title: "Reading Room" },
  { id: 8, url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80", category: "Classrooms", title: "Group Study" },
  // Sports
  { id: 9, url: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80", category: "Sports", title: "Athletics Track" },
  { id: 10, url: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80", category: "Sports", title: "Basketball Court" },
  { id: 11, url: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80", category: "Sports", title: "Football Field" },
  { id: 12, url: "https://images.unsplash.com/photo-1526676537331-7747bf8278fc?auto=format&fit=crop&w=800&q=80", category: "Sports", title: "Sports Day" },
  { id: 13, url: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&w=800&q=80", category: "Sports", title: "Outdoor Games" },
  { id: 14, url: "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=800&q=80", category: "Sports", title: "Running Race" },
  { id: 15, url: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?auto=format&fit=crop&w=800&q=80", category: "Sports", title: "Yoga & Fitness" },
  { id: 16, url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80", category: "Sports", title: "Physical Training" },
  // Events
  { id: 17, url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80", category: "Events", title: "Annual Day" },
  { id: 18, url: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80", category: "Events", title: "Science Exhibition" },
  { id: 19, url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80", category: "Events", title: "Graduation Ceremony" },
  { id: 20, url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80", category: "Events", title: "Cultural Program" },
  // Facilities
  { id: 21, url: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80", category: "Facilities", title: "School Building" },
  { id: 22, url: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80", category: "Facilities", title: "School Office" },
  { id: 23, url: "https://images.unsplash.com/photo-1543877087-ebf71fde2be1?auto=format&fit=crop&w=800&q=80", category: "Facilities", title: "Assembly Ground" },
  { id: 24, url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80", category: "Facilities", title: "Medical Room" },
];

const CATEGORIES = ["All", "Classrooms", "Sports", "Events", "Facilities"];

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<null | typeof GALLERY_IMAGES[0]>(null);

  const filteredImages = filter === "All"
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter((img) => img.category === filter);

  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section className="bg-gradient-to-br from-[#0F4F4B] to-[#0D9488] pt-28 pb-16 text-white text-center">
        <div className="container mx-auto px-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[#99F6E4] text-xs font-bold uppercase tracking-widest mb-3"
          >
            MEMORIES & MOMENTS
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-3"
          >
            School Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#99F6E4] text-base max-w-xl mx-auto"
          >
            Explore life at Love Public Sr. Sec. School — classrooms, sports, events, and more.
          </motion.p>
        </div>
      </section>

      <section className="py-14">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          {/* FILTER TABS */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 ${
                  filter === cat
                    ? "bg-[#0D9488] text-white shadow-lg shadow-teal-200"
                    : "border border-[#0D9488] text-[#0D9488] hover:bg-[#0D9488]/10"
                }`}
              >
                {cat}
                <span className="ml-1.5 text-xs opacity-70">
                  ({cat === "All" ? GALLERY_IMAGES.length : GALLERY_IMAGES.filter(i => i.category === cat).length})
                </span>
              </button>
            ))}
          </motion.div>

          {/* IMAGE GRID */}
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            <AnimatePresence>
              {filteredImages.map((img, idx) => (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: Math.min(idx * 0.04, 0.4) }}
                  onClick={() => setLightbox(img)}
                  className="group cursor-pointer relative aspect-square overflow-hidden rounded-2xl bg-[#e2f8f4] shadow-[0_2px_12px_rgba(13,148,136,0.12)] hover:shadow-[0_8px_30px_rgba(13,148,136,0.25)] hover:-translate-y-1 transition-all duration-300"
                >
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${img.id}/800/800`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F4F4B]/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-4">
                    <ZoomIn size={22} className="text-white mb-2 opacity-80" />
                    <span className="text-white font-bold text-sm text-center">{img.title}</span>
                    <span className="text-[#99F6E4] text-xs mt-0.5">{img.category}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* LIGHTBOX with Prev/Next */}
      <AnimatePresence>
        {lightbox && (() => {
          const currentIndex = filteredImages.findIndex(img => img.id === lightbox.id);
          const goPrev = (e: React.MouseEvent) => {
            e.stopPropagation();
            const prevIdx = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
            setLightbox(filteredImages[prevIdx]);
          };
          const goNext = (e: React.MouseEvent) => {
            e.stopPropagation();
            const nextIdx = (currentIndex + 1) % filteredImages.length;
            setLightbox(filteredImages[nextIdx]);
          };
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/93 z-[200] flex items-center justify-center p-4"
              onClick={() => setLightbox(null)}
            >
              {/* PREV BUTTON */}
              <button
                onClick={goPrev}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/25 border border-white/20 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 z-10"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
              </button>

              <motion.div
                key={lightbox.id}
                initial={{ scale: 0.88, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.88, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative max-w-5xl w-full mx-16"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={lightbox.url}
                  alt={lightbox.title}
                  className="w-full max-h-[78vh] object-contain rounded-2xl"
                />
                <div className="flex items-center justify-between mt-4 px-2">
                  <div>
                    <p className="text-white font-semibold text-lg">{lightbox.title}</p>
                    <p className="text-[#99F6E4] text-sm">{lightbox.category}</p>
                  </div>
                  <p className="text-white/50 text-sm">{currentIndex + 1} / {filteredImages.length}</p>
                </div>
                <button
                  onClick={() => setLightbox(null)}
                  className="absolute -top-4 -right-4 w-10 h-10 bg-white/15 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors border border-white/20"
                >
                  <X size={18} />
                </button>
              </motion.div>

              {/* NEXT BUTTON */}
              <button
                onClick={goNext}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/25 border border-white/20 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 z-10"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
