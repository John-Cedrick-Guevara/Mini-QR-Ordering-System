import { motion, Variants } from 'framer-motion';
import { Product } from '../../Pages/Products/types';
import Pagination from '../Pagination';
import ProductCard from './ProductCard';

interface MenuListingProps {
    items: Product[];
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onSelectProduct: (id: number) => void;
    onAddToCart: (product: Product) => void;
    searchQuery?: string;
    onSearchChange?: (query: string) => void;
}

export default function MenuListing({
    items,
    currentPage,
    totalPages,
    onPageChange,
    onSelectProduct,
    onAddToCart,
    searchQuery = '',
    onSearchChange,
}: MenuListingProps) {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: 'easeOut' },
        },
    };

    return (
        <section
            id="menu"
            className="min-h-screen bg-[#0F0F0F] px-6 py-32 md:px-12"
        >
            <div className="mx-auto max-w-7xl">
                {/* Section Header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={itemVariants}
                    className="mb-14 text-center"
                >
                    <span className="mb-6 block font-sans text-[10px] uppercase tracking-[0.2em] text-[#E5E1D8]">
                        Our Masterpiece
                    </span>
                    <h2 className="font-serif text-5xl leading-none text-[#FDF9F1] md:text-7xl lg:text-8xl">
                        Truffle Reverie
                    </h2>
                </motion.div>

                {/* Search Bar */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={itemVariants}
                    className="mx-auto mb-16 max-w-md"
                >
                    <div className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => onSearchChange?.(e.target.value)}
                            placeholder="Experience our flavors..."
                            className="w-full border-b border-[#333] bg-transparent pb-3 pl-1 pr-10 font-sans text-sm text-[#FDF9F1] placeholder-[#555] transition-colors focus:border-[#C4A484] focus:outline-none focus:ring-0"
                        />
                        <div className="absolute right-2 top-0 bottom-0 flex items-center text-[#555]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </motion.div>

                {/* Grid */}
                {items.length > 0 ? (
                    <motion.div
                        key={currentPage}
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="grid grid-cols-1 gap-x-12 gap-y-20 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        {items.map((item) => (
                            <ProductCard
                                key={item.id}
                                product={item}
                                onSelect={onSelectProduct}
                                onAddToCart={onAddToCart}
                                variants={itemVariants}
                            />
                        ))}
                    </motion.div>
                ) : (
                    <div className="py-32 text-center font-serif text-2xl text-[#E5E1D8]">
                        No menu items available at the moment.
                    </div>
                )}

                {/* Pagination */}
                <div className="mt-32">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={onPageChange}
                    />
                </div>
            </div>
        </section>
    );
}
