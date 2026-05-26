import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '../../Pages/Products/types';

interface ProductCardProps {
    product: Product;
    onSelect: (id: number) => void;
    onAddToCart: (product: Product) => void;
    variants?: any;
}

export default function ProductCard({ product, onSelect, onAddToCart, variants }: ProductCardProps) {
    return (
        <motion.div 
            variants={variants}
            onClick={() => onSelect(product.id)}
            className="group cursor-pointer flex flex-col gap-5 w-full"
        >
            <div className="aspect-[4/5] bg-[#111111] overflow-hidden relative w-full">
                {product.image_url ? (
                    <img 
                        src={product.image_url} 
                        alt={product.name} 
                        className="w-full h-full object-cover opacity-70 group-hover:scale-105 group-hover:opacity-100 transition-all duration-1000 ease-out"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-700 font-serif text-sm">No Image</div>
                )}
                
                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500"></div>
                
                {/* Hover Add to Cart Button */}
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product);
                    }}
                    className="absolute bottom-6 right-6 bg-[#FDF9F1] text-[#0F0F0F] w-12 h-12 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:scale-110 shadow-xl z-10"
                    title="Add to Cart"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4"></path></svg>
                </button>
            </div>
            
            <div className="flex flex-col space-y-2">
                <div className="flex justify-between items-start gap-4">
                    <h3 className="text-xl md:text-2xl font-serif text-[#FDF9F1] group-hover:text-white transition-colors line-clamp-1">{product.name}</h3>
                    <span className="text-sm font-sans text-[#E5E1D8] whitespace-nowrap pt-1">${Number(product.price).toFixed(2)}</span>
                </div>
                <p className="text-[11px] font-sans text-gray-500 line-clamp-2 leading-relaxed tracking-wide">
                    {product.description}
                </p>
            </div>
        </motion.div>
    );
}
