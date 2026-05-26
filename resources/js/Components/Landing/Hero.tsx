import React from 'react';
import { motion } from 'framer-motion';

interface HeroProps {
    cartCount: number;
    onOpenCart: () => void;
}

export default function Hero({ cartCount, onOpenCart }: HeroProps) {
    return (
        <section className="relative w-full h-[80vh] md:h-[95vh] bg-[#0F0F0F] text-[#FDF9F1] overflow-hidden">
            {/* Background Image Overlay */}
            <motion.div 
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 z-0"
            >
                <img 
                    src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2070&auto=format&fit=crop" 
                    alt="Restaurant Interior" 
                    className="w-full h-full object-cover opacity-40 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F0F]/80 via-transparent to-[#0F0F0F]"></div>
            </motion.div>

            {/* Header / Nav */}
            <motion.header 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                className="relative z-20 mx-auto px-6 lg:px-12 py-8 flex items-center justify-between"
            >
                <div className="flex items-center space-x-2 text-[10px] font-sans tracking-[0.2em] uppercase text-gray-400">
                    <span>OOO</span>
                    <span className="hidden sm:inline-block">World's 50 Best Restaurant</span>
                </div>

                <nav className="hidden md:flex items-center space-x-8 text-[10px] font-sans tracking-[0.2em] uppercase text-[#E5E1D8]">
                    <a href="#about" className="hover:text-white transition-colors">About</a>
                    <a href="#menu" className="hover:text-white transition-colors">Our Menu</a>
                    <a href="#location" className="hover:text-white transition-colors">Location</a>
                    <a href="#gallery" className="hover:text-white transition-colors">Gallery</a>
                    <a href="#reserve" className="hover:text-white transition-colors">Reserve a Table</a>
                </nav>

                <div className="flex items-center">
                    <button onClick={onOpenCart} className="flex items-center space-x-2 text-[#E5E1D8] hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                        </svg>
                        <span className="text-[10px] font-sans tracking-[0.2em]">({cartCount})</span>
                    </button>
                </div>
            </motion.header>

            {/* Main Hero Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-[calc(100%-100px)] text-center px-4">
                <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                    className="text-7xl sm:text-8xl md:text-[11rem] font-serif leading-none tracking-tight text-[#FDF9F1] mb-8"
                >
                    cubelicious
                </motion.h1>
                
                <div className="mt-8 md:mt-24 max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between px-4 md:px-12 gap-10">
              
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                        className="w-full flex flex-col md:items-start text-center w-fit mx-auto"
                    >
                        <p className="text-sm font-sans text-[#E5E1D8] leading-relaxed max-w-sm mb-8">
                            A Michelin-caliber dining experience where culinary mastery meets refined elegance. At cubelicious, we present a seasonal tasting menu that highlights the finest ingredients, expertly crafted to offer a balance of modern techniques and timeless flavors.
                        </p>
                        <a href="#menu" className="bg-[#FDF9F1] mx-auto text-[#0F0F0F] px-10 py-4 text-[10px] font-sans uppercase tracking-[0.2em] font-bold hover:bg-white transition-colors">
                            Explore Our Menu
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
