import { motion } from 'framer-motion';

interface HeroProps {
    cartCount: number;
    onOpenCart: () => void;
}

export default function Hero({ cartCount, onOpenCart }: HeroProps) {
    return (
        <section className="relative h-[80vh] w-full overflow-hidden bg-[#0F0F0F] text-[#FDF9F1] md:h-[95vh]">
            {/* Background Image Overlay */}
            <motion.div
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="absolute inset-0 z-0"
            >
                <img
                    src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2070&auto=format&fit=crop"
                    alt="Restaurant Interior"
                    className="h-full w-full object-cover opacity-40 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F0F]/80 via-transparent to-[#0F0F0F]"></div>
            </motion.div>

            {/* Header / Nav */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                className="relative z-20 mx-auto flex items-center justify-between px-6 py-8 lg:px-12"
            >
                <div className="flex items-center space-x-2 font-sans text-[10px] uppercase tracking-[0.2em] text-gray-400">
                    <span>OOO</span>
                    <span className="hidden sm:inline-block">
                        World's 50 Best Restaurant
                    </span>
                </div>

                <nav className="hidden items-center space-x-8 font-sans text-[10px] uppercase tracking-[0.2em] text-[#E5E1D8] md:flex">
                    <a
                        href="#about"
                        className="transition-colors hover:text-white"
                    >
                        About
                    </a>
                    <a
                        href="#menu"
                        className="transition-colors hover:text-white"
                    >
                        Our Menu
                    </a>
                    <a
                        href="#location"
                        className="transition-colors hover:text-white"
                    >
                        Location
                    </a>
                    <a
                        href="#gallery"
                        className="transition-colors hover:text-white"
                    >
                        Gallery
                    </a>
                    <a
                        href="#reserve"
                        className="transition-colors hover:text-white"
                    >
                        Reserve a Table
                    </a>
                </nav>

                <div className="flex items-center">
                    <button
                        onClick={onOpenCart}
                        className="flex items-center space-x-2 text-[#E5E1D8] transition-colors hover:text-white"
                    >
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                            ></path>
                        </svg>
                        <span className="font-sans text-[10px] tracking-[0.2em]">
                            ({cartCount})
                        </span>
                    </button>
                </div>
            </motion.header>

            {/* Main Hero Content */}
            <div className="relative z-10 flex h-[calc(100%-100px)] flex-col items-center justify-center px-4 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
                    className="mb-8 font-serif text-7xl leading-none tracking-tight text-[#FDF9F1] sm:text-8xl md:text-[11rem]"
                >
                    cubelicious
                </motion.h1>

                <div className="mx-auto mt-8 flex w-full max-w-7xl flex-col items-center justify-between gap-10 px-4 md:mt-24 md:flex-row md:px-12">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            duration: 1,
                            delay: 0.8,
                            ease: 'easeOut',
                        }}
                        className="mx-auto flex w-fit w-full flex-col text-center md:items-start"
                    >
                        <p className="mb-8 max-w-md mx-auto font-sans text-sm leading-relaxed text-[#E5E1D8]">
                            A Michelin-caliber dining experience where culinary
                            mastery meets refined elegance. At cubelicious, we
                            present a seasonal tasting menu that highlights the
                            finest ingredients, expertly crafted to offer a
                            balance of modern techniques and timeless flavors.
                        </p>
                        <a
                            href="#menu"
                            className="mx-auto bg-[#FDF9F1] px-10 py-4 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#0F0F0F] transition-colors hover:bg-white"
                        >
                            Explore Our Menu
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
