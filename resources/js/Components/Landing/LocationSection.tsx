import React from 'react';
import { motion } from 'framer-motion';

export default function LocationSection() {
    return (
        <section id="location" className="bg-[#0F0F0F] text-[#FDF9F1] py-32 px-6 md:px-12">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 lg:gap-24">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="w-full md:w-1/3 flex flex-col"
                >
                    <span className="text-[10px] font-sans tracking-[0.2em] text-[#E5E1D8] uppercase border-b border-[#E5E1D8] pb-1 mb-8 w-fit">
                        Find Us
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif leading-none mb-8">
                        Our Location
                    </h2>
                    
                    <div className="space-y-8 mt-4">
                        <div>
                            <h4 className="text-xs font-sans tracking-widest text-gray-500 uppercase mb-2">Address</h4>
                            <p className="text-sm font-sans leading-relaxed text-[#E5E1D8]">
                                128 Culinary Avenue,<br />
                                Gastronomy District<br />
                                Paris, France 75008
                            </p>
                        </div>
                        
                        <div>
                            <h4 className="text-xs font-sans tracking-widest text-gray-500 uppercase mb-2">Contact</h4>
                            <p className="text-sm font-sans leading-relaxed text-[#E5E1D8]">
                                reservations@cubelicious.com<br />
                                +33 1 42 68 53 00
                            </p>
                        </div>

                        <div>
                            <h4 className="text-xs font-sans tracking-widest text-gray-500 uppercase mb-2">Hours</h4>
                            <p className="text-sm font-sans leading-relaxed text-[#E5E1D8]">
                                Wed - Sun: 13:30 - 15:30 (Lunch)<br />
                                Wed - Sun: 19:30 - 22:30 (Dinner)<br />
                                Mon & Tue: Closed
                            </p>
                        </div>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="w-full md:w-2/3 aspect-video md:aspect-auto bg-[#1a1512] relative overflow-hidden group"
                >
                    {/* Placeholder for a map or atmospheric exterior shot */}
                    <img 
                        src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1500&auto=format&fit=crop" 
                        alt="Restaurant Exterior" 
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 border-[1px] border-[#FDF9F1]/10 m-4 pointer-events-none"></div>
                </motion.div>
            </div>
        </section>
    );
}
