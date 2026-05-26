import React from 'react';
import { motion } from 'framer-motion';

export default function ReserveSection() {
    return (
        <section id="reserve" className="relative bg-[#0F0F0F] text-[#FDF9F1] py-40 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img 
                    src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2000&auto=format&fit=crop" 
                    alt="Reserve Background" 
                    className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-[#0F0F0F]"></div>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative z-10 text-center px-6 max-w-2xl mx-auto"
            >
                <span className="text-[10px] font-sans tracking-[0.2em] text-gray-400 uppercase block mb-6">
                    Join Us
                </span>
                <h2 className="text-5xl md:text-7xl font-serif leading-tight mb-8">
                    An unforgettable <br /> culinary journey.
                </h2>
                <p className="text-sm font-sans text-gray-400 leading-relaxed mb-12 max-w-md mx-auto">
                    Reservations open 30 days in advance. For parties larger than 6, please contact us directly via phone or email.
                </p>
                <button className="bg-[#FDF9F1] text-[#0F0F0F] px-12 py-5 text-xs font-sans uppercase tracking-[0.2em] font-bold hover:bg-white hover:scale-105 transition-all duration-300">
                    Book a Table
                </button>
            </motion.div>
        </section>
    );
}
