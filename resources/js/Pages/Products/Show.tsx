import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Product } from './types';

interface ShowProps {
    product: Product;
    onBack: () => void;
    cartCount: number;
    onAddToCart: (product: Product, quantity: number) => void;
    onOpenCart: () => void;
}

export default function Show({ product, onBack, cartCount, onAddToCart, onOpenCart }: ShowProps) {
    const [quantity, setQuantity] = useState(1);
    
    return (
        <div className="min-h-screen bg-[#0F0F0F] text-[#FDF9F1] font-sans selection:bg-[#FDF9F1] selection:text-[#0F0F0F]">
            <Head title={`${product.name} - cubelicious`} />

            {/* Header Overlay */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 lg:px-12 py-8 bg-gradient-to-b from-[#0F0F0F]/80 to-transparent"
            >
                <button
                    onClick={onBack}
                    className="flex items-center space-x-2 text-[#E5E1D8] hover:text-white transition-colors uppercase tracking-[0.2em] text-[10px]"
                >
                    <svg className="h-4 w-4 stroke-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    <span>Back to Menu</span>
                </button>
                
                <span className="text-xl font-bold tracking-[0.2em] text-[#FDF9F1] font-serif uppercase hidden sm:block">
                    cubelicious
                </span>
                
                <button onClick={onOpenCart} className="flex items-center space-x-2 text-[#E5E1D8] hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                    </svg>
                    <span className="text-[10px] font-sans tracking-[0.2em]">({cartCount})</span>
                </button>
            </motion.div>

            {/* Content Area */}
            <div className="flex flex-col md:flex-row h-screen pt-24 md:pt-0">
                {/* Food Photo Container */}
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="w-full md:w-1/2 h-[50vh] md:h-screen relative bg-[#111]"
                >
                    {product.image_url ? (
                        <img
                            src={product.image_url}
                            alt={product.name}
                            className="h-full w-full object-cover opacity-90"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-700 text-sm font-serif">No Image</div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F0F]/20 to-[#0F0F0F] hidden md:block"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] to-transparent md:hidden block"></div>
                </motion.div>

                {/* Food Details Section */}
                <div className="w-full md:w-1/2 h-full flex items-center justify-center p-8 md:p-16 lg:p-24 relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                        className="max-w-md w-full"
                    >
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#E5E1D8] font-sans block mb-6">
                            // Signature Dish
                        </span>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight text-[#FDF9F1] mb-6">
                            {product.name}
                        </h1>

                        <p className="text-sm leading-relaxed text-[#E5E1D8] font-sans mb-12">
                            {product.description}
                        </p>
                        
                        <div className="flex items-center justify-between mb-12 border-y border-[#222] py-6">
                            <span className="text-3xl font-serif text-[#FDF9F1]">
                                ${Number(product.price).toFixed(2)}
                            </span>
                            
                            <div className="flex items-center border border-[#333]">
                                <button 
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-4 py-2 hover:bg-[#222] text-[#E5E1D8] transition-colors"
                                >-</button>
                                <span className="px-4 text-xs font-sans w-12 text-center">{quantity}</span>
                                <button 
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-4 py-2 hover:bg-[#222] text-[#E5E1D8] transition-colors"
                                >+</button>
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                onAddToCart(product, quantity);
                                onBack(); 
                            }}
                            className="w-full bg-[#FDF9F1] text-[#0F0F0F] py-5 text-[10px] font-sans uppercase font-bold tracking-[0.2em] hover:bg-white transition-colors"
                        >
                            Add to Cart
                        </button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
