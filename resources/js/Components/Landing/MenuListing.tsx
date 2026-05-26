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
}

export default function MenuListing({
    items,
    currentPage,
    totalPages,
    onPageChange,
    onSelectProduct,
    onAddToCart,
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

    console.log(items);

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
                    className="mb-24 text-center"
                >
                    <span className="mb-6 block font-sans text-[10px] uppercase tracking-[0.2em] text-[#E5E1D8]">
                        Our Masterpiece
                    </span>
                    <h2 className="font-serif text-5xl leading-none text-[#FDF9F1] md:text-7xl lg:text-8xl">
                        Truffle Reverie
                    </h2>
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
