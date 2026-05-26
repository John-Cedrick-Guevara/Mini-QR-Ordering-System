import React from 'react';
import { motion } from 'framer-motion';

export default function GallerySection() {
    const images = [
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=1000&auto=format&fit=crop"
    ];

    return (
        <section id="gallery" className="bg-[#FDF9F1] py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 flex flex-col md:flex-row items-end justify-between gap-8">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-[10px] font-sans tracking-[0.2em] text-[#0F0F0F] uppercase border-b border-[#0F0F0F] pb-1 block mb-6 w-fit">
                        The Atmosphere
                    </span>
                    <h2 className="text-4xl md:text-6xl font-serif text-[#0F0F0F] leading-none">
                        Glimpses of <br /> cubelicious
                    </h2>
                </motion.div>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-sm font-sans text-gray-700 max-w-sm leading-relaxed pb-2"
                >
                    Explore our beautifully designed dining room and signature dishes before you arrive. An ambiance carefully curated for the perfect evening.
                </motion.p>
            </div>

            {/* Scrolling Gallery or Masonry (simplified horizontal scroll for elegance) */}
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: 0.4 }}
                className="flex gap-6 overflow-x-auto pb-8 px-6 md:px-12 snap-x snap-mandatory hide-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {images.map((src, idx) => (
                    <div key={idx} className="min-w-[70vw] md:min-w-[40vw] lg:min-w-[30vw] aspect-[3/4] snap-center shrink-0">
                        <img 
                            src={src} 
                            alt={`Gallery image ${idx + 1}`} 
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </div>
                ))}
            </motion.div>
        </section>
    );
}
