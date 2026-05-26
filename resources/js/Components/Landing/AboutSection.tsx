import { motion } from 'framer-motion';

export default function AboutSection() {
    return (
        <section
            id="about"
            className="border-t border-[#1a1a1a] bg-[#0F0F0F] px-6 py-32 text-[#FDF9F1] md:px-12"
        >
            <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 md:flex-row lg:gap-24">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="w-full md:w-1/2"
                >
                    <div className="relative aspect-square overflow-hidden md:aspect-[4/5]">
                        <img
                            src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=2070&auto=format&fit=crop"
                            alt="Chef preparing a dish"
                            className="absolute inset-0 h-full w-full object-cover opacity-80"
                        />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                    className="flex w-full flex-col items-start md:w-1/2"
                >
                    <span className="mb-8 border-b border-[#E5E1D8] pb-1 font-sans text-[10px] uppercase tracking-[0.2em] text-[#E5E1D8]">
                        Our Philosophy
                    </span>
                    <h2 className="mb-8 font-serif text-4xl leading-none md:text-5xl lg:text-7xl">
                        The Art of <br /> Minimalism
                    </h2>
                    <p className="mb-6 font-sans text-sm leading-relaxed text-[#E5E1D8]">
                        At cubelicious, we strip away the unnecessary. Every
                        ingredient on the plate serves a singular purpose: to
                        elevate the natural flavors of our local, organic
                        produce.
                    </p>
                    <p className="mb-12 font-sans text-sm leading-relaxed text-[#E5E1D8]">
                        Our culinary team works intimately with regional farmers
                        and foragers to curate a daily evolving menu, reflecting
                        the absolute pinnacle of the season. It is dining
                        reduced to its most beautiful essence.
                    </p>
                 
                </motion.div>
            </div>
        </section>
    );
}
