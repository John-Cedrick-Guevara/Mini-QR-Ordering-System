import { router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { CartItem } from './CartSidebar';

interface PaymentSimulationProps {
    totalAmount: number;
    cart: CartItem[];
    onSuccess: () => void;
    onCancel: () => void;
}

type PaymentStatus = 'idle' | 'processing' | 'success' | 'error';

type Order = {
    customer_name: string;
    customer_email: string;
    total_price: number;
    payment_status: 'completed' | 'failed';
    status: 'pending' | 'completed' | 'cancelled';
    items: {
        product_id: number;
        quantity: number;
        price: number;
    }[];
};


export default function PaymentSimulation({
    totalAmount,
    cart,
    onSuccess,
    onCancel,
}: PaymentSimulationProps) {
    const [status, setStatus] = useState<PaymentStatus>('idle');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Mock form states
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (
            !name ||
            !email ||
            !email.includes('@') ||
            cardNumber.replace(/\s/g, '').length < 15 ||
            expiry.length < 5 ||
            cvc.length < 3
        ) {
            setStatus('error');
            setErrorMessage('Please fill in all fields correctly.');
            return;
        }

        setStatus('processing');
        setErrorMessage(null);

        // Simulate network request
        setTimeout(() => {
            // Mock error conditions based on specific inputs for testing
            const cleanCardNumber = cardNumber.replace(/\s/g, '');

            if (cleanCardNumber.startsWith('4000000000000001')) {
                setStatus('error');
                setErrorMessage(
                    'Payment declined by the issuing bank. Insufficient funds.',
                );
            } else if (cleanCardNumber.startsWith('4000000000000002')) {
                setStatus('error');
                setErrorMessage(
                    'Your card has expired. Please use a different card.',
                );
            } else if (name.toLowerCase() === 'error') {
                setStatus('error');
                setErrorMessage(
                    'An unexpected error occurred during processing. Please try again.',
                );
            } else {
                // Post to API after successful simulation
                const payload: Order = {
                    customer_name: name,
                    customer_email: email,
                    total_price: totalAmount,
                    payment_status: 'completed',
                    status: 'pending',
                    items: cart.map((item) => ({
                        product_id: item.product.id,
                        quantity: item.quantity,
                        price: item.product.price as number,
                    })),
                };

                router.post('/orders', payload, {
                    preserveScroll: true,
                    onSuccess: () => {
                        setStatus('success');
                        setTimeout(() => {
                            onSuccess();
                        }, 2000);
                    },
                    onError: (errors: any) => {
                        setStatus('error');
                        setErrorMessage(
                            errors.message ||
                                'An error occurred while saving the order.',
                        );
                    },
                });
            }
        }, 2000); // 2 seconds processing simulation

    };

    const formatCardNumber = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = (matches && matches[0]) || '';
        const parts = [];

        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }

        if (parts.length) {
            return parts.join(' ');
        } else {
            return value;
        }
    };

    const formatExpiry = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        if (v.length >= 2) {
            return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
        }
        return v;
    };

    if (status === 'success') {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex h-full flex-col items-center justify-center p-8 text-center"
            >
                <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-[#C4A484] text-[#C4A484]">
                    <svg
                        className="h-10 w-10"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>
                <h3 className="mb-4 font-serif text-3xl text-[#FDF9F1]">
                    Payment Successful
                </h3>
                <p className="mb-8 font-sans text-sm text-[#E5E1D8]">
                    Thank you for your order. We are preparing it now.
                </p>
                <div className="h-[1px] w-16 bg-[#333]"></div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex h-full flex-col bg-[#0F0F0F] text-[#FDF9F1]"
        >
            <div className="flex items-center justify-between border-b border-[#222] p-8">
                <h2 className="font-serif text-3xl">Checkout</h2>
                <button
                    onClick={onCancel}
                    disabled={status === 'processing'}
                    className="rounded-full p-2 text-[#E5E1D8] transition-colors hover:bg-[#1a1a1a] hover:text-white disabled:opacity-50"
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

            <div className="flex-1 overflow-y-auto p-8">
                <form
                    id="payment-form"
                    onSubmit={handlePayment}
                    className="mx-auto max-w-md space-y-6"
                >
                    {/* Test Info Notice */}
                    <div className="mb-8 border border-[#333] bg-[#111] p-4 font-sans text-[10px] uppercase tracking-widest text-[#E5E1D8]">
                        <p className="mb-2 font-bold text-[#C4A484]">
                            Simulator Environment
                        </p>
                        <p>Use any valid-looking data.</p>
                        <p>To simulate decline: Card ending in "0001"</p>
                        <p>To simulate expired card: Card ending in "0002"</p>
                        <p>To simulate generic error: Name "Error"</p>
                    </div>

                    {status === 'error' && errorMessage && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="border border-red-900/50 bg-red-900/10 p-4 font-sans text-sm text-red-400"
                        >
                            <div className="flex items-start gap-3">
                                <svg
                                    className="mt-0.5 h-5 w-5 shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    ></path>
                                </svg>
                                <span>{errorMessage}</span>
                            </div>
                        </motion.div>
                    )}

                    <div>
                        <label className="mb-3 block font-sans text-[10px] uppercase tracking-[0.2em] text-[#E5E1D8]">
                            Name on Card
                        </label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={status === 'processing'}
                            placeholder="John Doe"
                            className="w-full border-b border-[#333] bg-transparent pb-3 text-sm placeholder-[#444] transition-colors focus:border-[#C4A484] focus:outline-none focus:ring-0 disabled:opacity-50"
                        />
                    </div>

                    <div>
                        <label className="mb-3 block font-sans text-[10px] uppercase tracking-[0.2em] text-[#E5E1D8]">
                            Email Address
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={status === 'processing'}
                            placeholder="john@example.com"
                            className="w-full border-b border-[#333] bg-transparent pb-3 text-sm placeholder-[#444] transition-colors focus:border-[#C4A484] focus:outline-none focus:ring-0 disabled:opacity-50"
                        />
                    </div>

                    <div>
                        <label className="mb-3 block font-sans text-[10px] uppercase tracking-[0.2em] text-[#E5E1D8]">
                            Card Number
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                required
                                maxLength={19}
                                value={cardNumber}
                                onChange={(e) =>
                                    setCardNumber(
                                        formatCardNumber(e.target.value),
                                    )
                                }
                                disabled={status === 'processing'}
                                placeholder="4000 0000 0000 0000"
                                className="w-full border-b border-[#333] bg-transparent pb-3 font-mono text-sm tracking-wider placeholder-[#444] transition-colors focus:border-[#C4A484] focus:outline-none focus:ring-0 disabled:opacity-50"
                            />
                            <div className="absolute right-0 top-0 text-[#666]">
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1"
                                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <label className="mb-3 block font-sans text-[10px] uppercase tracking-[0.2em] text-[#E5E1D8]">
                                Expiry Date
                            </label>
                            <input
                                type="text"
                                required
                                maxLength={5}
                                value={expiry}
                                onChange={(e) =>
                                    setExpiry(formatExpiry(e.target.value))
                                }
                                disabled={status === 'processing'}
                                placeholder="MM/YY"
                                className="w-full border-b border-[#333] bg-transparent pb-3 font-mono text-sm tracking-wider placeholder-[#444] transition-colors focus:border-[#C4A484] focus:outline-none focus:ring-0 disabled:opacity-50"
                            />
                        </div>
                        <div>
                            <label className="mb-3 block font-sans text-[10px] uppercase tracking-[0.2em] text-[#E5E1D8]">
                                Security Code (CVC)
                            </label>
                            <input
                                type="text"
                                required
                                maxLength={4}
                                value={cvc}
                                onChange={(e) =>
                                    setCvc(e.target.value.replace(/\D/g, ''))
                                }
                                disabled={status === 'processing'}
                                placeholder="123"
                                className="w-full border-b border-[#333] bg-transparent pb-3 font-mono text-sm tracking-wider placeholder-[#444] transition-colors focus:border-[#C4A484] focus:outline-none focus:ring-0 disabled:opacity-50"
                            />
                        </div>
                    </div>
                </form>
            </div>

            <div className="border-t border-[#222] bg-[#0A0A0A] p-8">
                <div className="mb-8 flex items-end justify-between">
                    <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#E5E1D8]">
                        Total
                    </span>
                    <span className="font-serif text-3xl leading-none">
                        ${totalAmount.toFixed(2)}
                    </span>
                </div>

                <button
                    form="payment-form"
                    type="submit"
                    disabled={status === 'processing'}
                    className="relative w-full overflow-hidden bg-[#FDF9F1] py-5 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#0F0F0F] transition-all hover:bg-white disabled:bg-[#333] disabled:text-[#888]"
                >
                    <span
                        className={`transition-opacity duration-300 ${status === 'processing' ? 'opacity-0' : 'opacity-100'}`}
                    >
                        Pay ${totalAmount.toFixed(2)}
                    </span>

                    {status === 'processing' && (
                        <div className="absolute inset-0 flex items-center justify-center text-[#FDF9F1]">
                            <svg
                                className="h-5 w-5 animate-spin"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                        </div>
                    )}
                </button>
                <div className="mt-4 text-center">
                    <span className="flex items-center justify-center gap-2 font-sans text-[9px] uppercase tracking-widest text-[#555]">
                        <svg
                            className="h-3 w-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            ></path>
                        </svg>
                        Secure Encrypted Transaction
                    </span>
                </div>
            </div>
        </motion.div>
    );
}
