import React from 'react';
import { Product } from '../../Pages/Products/types';

export interface CartItem {
    product: Product;
    quantity: number;
}

interface CartSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    cart: CartItem[];
    onUpdateQuantity: (productId: number, quantity: number) => void;
    onRemove: (productId: number) => void;
}

export default function CartSidebar({ isOpen, onClose, cart, onUpdateQuantity, onRemove }: CartSidebarProps) {
    const total = cart.reduce((sum, item) => sum + (Number(item.product.price) * item.quantity), 0);

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/60 z-40 transition-opacity backdrop-blur-sm"
                    onClick={onClose}
                ></div>
            )}

            {/* Sidebar */}
            <div className={`fixed top-0 right-0 h-full w-full sm:w-[28rem] bg-[#0F0F0F] text-[#FDF9F1] shadow-2xl z-50 transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col border-l border-[#222]`}>
                
                {/* Header */}
                <div className="flex items-center justify-between p-8 border-b border-[#222]">
                    <h2 className="text-3xl font-serif">Your Order</h2>
                    <button onClick={onClose} className="p-2 hover:bg-[#1a1a1a] rounded-full transition-colors text-[#E5E1D8] hover:text-white" title="Close cart">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-8 space-y-8">
                    {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-[#E5E1D8] space-y-6">
                            <svg className="w-16 h-16 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                            <p className="font-sans text-sm tracking-widest uppercase">Your cart is empty.</p>
                        </div>
                    ) : (
                        cart.map(item => (
                            <div key={item.product.id} className="flex gap-6 items-center">
                                {/* Image */}
                                <div className="w-20 h-24 bg-[#111] overflow-hidden shrink-0">
                                    {item.product.image_url ? (
                                        <img src={item.product.image_url} alt={item.product.name} className="w-full h-full object-cover opacity-80" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-700 text-[10px]">No Image</div>
                                    )}
                                </div>
                                
                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-serif text-lg leading-tight mb-1 truncate">{item.product.name}</h4>
                                    <div className="text-xs font-sans text-[#E5E1D8]">${Number(item.product.price).toFixed(2)}</div>
                                </div>
                                
                                {/* Actions */}
                                <div className="flex flex-col items-end gap-3 shrink-0">
                                    <button onClick={() => onRemove(item.product.id)} className="text-[10px] text-gray-500 hover:text-white transition-colors uppercase tracking-widest font-sans underline underline-offset-4">
                                        Remove
                                    </button>
                                    <div className="flex items-center border border-[#333]">
                                        <button 
                                            onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                                            className="px-3 py-1 hover:bg-[#222] text-[#E5E1D8] transition-colors"
                                        >-</button>
                                        <span className="px-3 text-xs font-sans w-8 text-center">{item.quantity}</span>
                                        <button 
                                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                            className="px-3 py-1 hover:bg-[#222] text-[#E5E1D8] transition-colors"
                                        >+</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer / Checkout */}
                {cart.length > 0 && (
                    <div className="p-8 border-t border-[#222] bg-[#0A0A0A]">
                        <div className="flex justify-between items-end mb-8">
                            <span className="font-sans text-xs tracking-[0.2em] uppercase text-[#E5E1D8]">Total</span>
                            <span className="font-serif text-3xl leading-none">${total.toFixed(2)}</span>
                        </div>
                        <button className="w-full bg-[#FDF9F1] text-[#0F0F0F] py-5 text-[10px] font-sans font-bold tracking-[0.2em] uppercase hover:bg-white transition-colors">
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
