import { useState } from 'react';
import { Product } from '../../Pages/Products/types';
import PaymentSimulation from './PaymentSimulation';

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

export default function CartSidebar({
    isOpen,
    onClose,
    cart,
    onUpdateQuantity,
    onRemove,
}: CartSidebarProps) {
    const total = cart.reduce(
        (sum, item) => sum + Number(item.product.price) * item.quantity,
        0,
    );
    const [isCheckout, setIsCheckout] = useState(false);

    // Reset checkout state when modal closes
    const handleClose = () => {
        setIsCheckout(false);
        onClose();
    };

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity"
                    onClick={handleClose}
                ></div>
            )}

            {/* Sidebar */}
            <div
                className={`fixed right-0 top-0 z-50 h-full w-full transform bg-[#0F0F0F] text-[#FDF9F1] shadow-2xl transition-transform duration-500 ease-in-out sm:w-[28rem] ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col border-l border-[#222]`}
            >
                {isCheckout ? (
                    <PaymentSimulation
                        totalAmount={total}
                        cart={cart}
                        onSuccess={handleClose}
                        onCancel={() => setIsCheckout(false)}
                    />
                ) : (
                    <>
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-[#222] p-8">
                            <h2 className="font-serif text-3xl">Your Order</h2>
                            <button
                                onClick={handleClose}
                                className="rounded-full p-2 text-[#E5E1D8] transition-colors hover:bg-[#1a1a1a] hover:text-white"
                                title="Close cart"
                            >
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1"
                                        d="M6 18L18 6M6 6l12 12"
                                    ></path>
                                </svg>
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 space-y-8 overflow-y-auto p-8">
                            {cart.length === 0 ? (
                                <div className="flex h-full flex-col items-center justify-center space-y-6 text-[#E5E1D8]">
                                    <svg
                                        className="h-16 w-16 opacity-30"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="0.5"
                                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                        ></path>
                                    </svg>
                                    <p className="font-sans text-sm uppercase tracking-widest">
                                        Your cart is empty.
                                    </p>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <div
                                        key={item.product.id}
                                        className="flex items-center gap-6"
                                    >
                                        {/* Image */}
                                        <div className="h-24 w-20 shrink-0 overflow-hidden bg-[#111]">
                                            {item.product.image_url ? (
                                                <img
                                                    src={item.product.image_url}
                                                    alt={item.product.name}
                                                    className="h-full w-full object-cover opacity-80"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center text-[10px] text-gray-700">
                                                    No Image
                                                </div>
                                            )}
                                        </div>

                                        {/* Info */}
                                        <div className="min-w-0 flex-1">
                                            <h4 className="mb-1 truncate font-serif text-lg leading-tight">
                                                {item.product.name}
                                            </h4>
                                            <div className="font-sans text-xs text-[#E5E1D8]">
                                                $
                                                {Number(
                                                    item.product.price,
                                                ).toFixed(2)}
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex shrink-0 flex-col items-end gap-3">
                                            <button
                                                onClick={() =>
                                                    onRemove(item.product.id)
                                                }
                                                className="font-sans text-[10px] uppercase tracking-widest text-gray-500 underline underline-offset-4 transition-colors hover:text-white"
                                            >
                                                Remove
                                            </button>
                                            <div className="flex items-center border border-[#333]">
                                                <button
                                                    onClick={() =>
                                                        onUpdateQuantity(
                                                            item.product.id,
                                                            Math.max(
                                                                1,
                                                                item.quantity -
                                                                    1,
                                                            ),
                                                        )
                                                    }
                                                    className="px-3 py-1 text-[#E5E1D8] transition-colors hover:bg-[#222]"
                                                >
                                                    -
                                                </button>
                                                <span className="w-8 px-3 text-center font-sans text-xs">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        onUpdateQuantity(
                                                            item.product.id,
                                                            item.quantity + 1,
                                                        )
                                                    }
                                                    className="px-3 py-1 text-[#E5E1D8] transition-colors hover:bg-[#222]"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer / Checkout */}
                        {cart.length > 0 && (
                            <div className="border-t border-[#222] bg-[#0A0A0A] p-8">
                                <div className="mb-8 flex items-end justify-between">
                                    <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#E5E1D8]">
                                        Total
                                    </span>
                                    <span className="font-serif text-3xl leading-none">
                                        ${total.toFixed(2)}
                                    </span>
                                </div>
                                <button
                                    onClick={() => setIsCheckout(true)}
                                    className="w-full bg-[#FDF9F1] py-5 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#0F0F0F] transition-colors hover:bg-white"
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
}
