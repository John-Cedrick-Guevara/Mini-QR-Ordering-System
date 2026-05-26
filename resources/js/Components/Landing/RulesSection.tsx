import React from 'react';
import { motion, Variants } from 'framer-motion';

export default function RulesSection() {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        <section className="bg-[#FDF9F1] text-[#0F0F0F] py-24 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={itemVariants}
                    className="text-center mb-16"
                >
                    <span className="text-[10px] font-sans tracking-[0.2em] uppercase border-b border-[#0F0F0F] pb-1">Our Rules</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mt-8 mb-6 leading-tight">
                        What you need to know<br />before a reservation
                    </h2>
                    <p className="text-xs md:text-sm font-sans text-gray-700 max-w-lg mx-auto leading-relaxed">
                        To ensure a seamless and extraordinary experience for every guest, we ask that you kindly adhere to the following guidelines.
                    </p>
                </motion.div>

                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {/* Card 1 */}
                    <motion.div variants={itemVariants} className="relative aspect-[4/5] bg-[#1a1512] overflow-hidden group">
                        <img
                            src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1600"
                            alt="Meat and Fish Only"
                            className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-opacity duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/20 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-8 text-[#FDF9F1]">
                            <h3 className="text-2xl lg:text-3xl font-serif mb-4">Meat and Fish Only</h3>
                            <p className="text-[11px] font-sans leading-relaxed text-[#E5E1D8]">
                                We do not offer vegetarian or vegan options. Our tasting menu or a la carte service is available for the entire table.
                            </p>
                        </div>
                    </motion.div>

                    {/* Card 2 */}
                    <motion.div variants={itemVariants} className="relative aspect-[4/5] overflow-hidden group">
                        <img
                            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1600"
                            alt="Noon Service"
                            className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-opacity duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/20 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-8 text-[#FDF9F1]">
                            <div className="absolute top-10 left-10">
                                <svg className="w-16 h-16 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
                                    <path d="M4 14l4-4 4 4 4-4 4 4" strokeLinecap="round" strokeLinejoin="round"/>
                                    <rect x="3" y="14" width="18" height="6" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <h3 className="text-2xl lg:text-3xl font-serif mb-4">Noon Service</h3>
                            <p className="text-[11px] font-sans leading-relaxed text-[#E5E1D8]">
                                Lunch service begins at 1:30 PM. We are closed for holidays from December 24th to January 10th and throughout August.
                            </p>
                        </div>
                    </motion.div>

                    {/* Card 3 */}
                    <motion.div variants={itemVariants} className="relative aspect-[4/5] overflow-hidden group">
                        <img
                            src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=1600"
                            alt="Dinner Service"
                            className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-opacity duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/20 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-8 text-[#FDF9F1]">
                            <div className="absolute top-10 left-10">
                                 <svg className="w-16 h-16 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
                                    <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12 8v4l3 3" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <h3 className="text-2xl lg:text-3xl font-serif mb-4">Dinner Service</h3>
                            <p className="text-[11px] font-sans leading-relaxed text-[#E5E1D8]">
                                A minimum booking is required for dinner. Children are welcome, but we kindly ask that all guests enjoy our full menu.
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
