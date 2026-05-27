import { router } from '@inertiajs/react';
import React from 'react';
import { Product } from '../../Pages/Products/types';

interface ProductFormState {
    name: string;
    description: string;
    price: string;
    image_url: string;
    is_available: boolean;
}

interface AdminProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    editingProduct: Product | null;
    productForm: ProductFormState;
    setProductForm: React.Dispatch<React.SetStateAction<ProductFormState>>;
}

export default function AdminProductModal({
    isOpen,
    onClose,
    editingProduct,
    productForm,
    setProductForm,
}: AdminProductModalProps) {
    if (!isOpen) return null;

    const handleSaveProduct = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingProduct) {
            router.put(`/products/${editingProduct.id}`, productForm as any, {
                onSuccess: () => onClose(),
                preserveScroll: true,
            });
        } else {
            router.post('/products', productForm as any, {
                onSuccess: () => onClose(),
                preserveScroll: true,
            });
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
            <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden border border-[#333] bg-[#0F0F0F] shadow-2xl">
                <div className="flex items-center justify-between border-b border-[#222] bg-[#0A0A0A] p-6">
                    <h2 className="font-serif text-2xl">
                        {editingProduct ? 'Refine Creation' : 'New Creation'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-[#888] hover:text-white"
                    >
                        ✕
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-8">
                    <form
                        id="product-form"
                        onSubmit={handleSaveProduct}
                        className="space-y-6"
                    >
                        <div>
                            <label className="mb-2 block font-sans text-[10px] uppercase tracking-[0.2em] text-[#E5E1D8]">
                                Name
                            </label>
                            <input
                                type="text"
                                required
                                value={productForm.name}
                                onChange={(e) =>
                                    setProductForm({
                                        ...productForm,
                                        name: e.target.value,
                                    })
                                }
                                className="w-full border-b border-[#333] bg-transparent pb-3 text-sm transition-colors focus:border-[#C4A484] focus:outline-none focus:ring-0"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block font-sans text-[10px] uppercase tracking-[0.2em] text-[#E5E1D8]">
                                Description
                            </label>
                            <textarea
                                rows={3}
                                value={productForm.description}
                                onChange={(e) =>
                                    setProductForm({
                                        ...productForm,
                                        description: e.target.value,
                                    })
                                }
                                className="w-full resize-none border-b border-[#333] bg-transparent pb-3 text-sm transition-colors focus:border-[#C4A484] focus:outline-none focus:ring-0"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="mb-2 block font-sans text-[10px] uppercase tracking-[0.2em] text-[#E5E1D8]">
                                    Price
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    required
                                    value={productForm.price}
                                    onChange={(e) =>
                                        setProductForm({
                                            ...productForm,
                                            price: e.target.value,
                                        })
                                    }
                                    className="w-full border-b border-[#333] bg-transparent pb-3 font-mono text-sm transition-colors focus:border-[#C4A484] focus:outline-none focus:ring-0"
                                />
                            </div>
                            <div>
                                <label className="mb-2 block font-sans text-[10px] uppercase tracking-[0.2em] text-[#E5E1D8]">
                                    Availability
                                </label>
                                <label className="mt-4 flex cursor-pointer items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        checked={productForm.is_available}
                                        onChange={(e) =>
                                            setProductForm({
                                                ...productForm,
                                                is_available: e.target.checked,
                                            })
                                        }
                                        className="h-4 w-4 rounded-sm border-[#333] bg-[#111] text-[#C4A484] focus:ring-0 focus:ring-offset-0"
                                    />
                                    <span className="font-sans text-sm tracking-widest text-[#E5E1D8]">
                                        Available on Menu
                                    </span>
                                </label>
                            </div>
                        </div>
                        <div>
                            <label className="mb-2 block font-sans text-[10px] uppercase tracking-[0.2em] text-[#E5E1D8]">
                                Image URL
                            </label>
                            <input
                                type="url"
                                value={productForm.image_url}
                                onChange={(e) =>
                                    setProductForm({
                                        ...productForm,
                                        image_url: e.target.value,
                                    })
                                }
                                placeholder="https://"
                                className="w-full border-b border-[#333] bg-transparent pb-3 font-mono text-sm transition-colors focus:border-[#C4A484] focus:outline-none focus:ring-0"
                            />
                        </div>
                    </form>
                </div>
                <div className="flex justify-end space-x-4 border-t border-[#222] bg-[#0A0A0A] p-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-3 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#888] transition-colors hover:text-white"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        form="product-form"
                        className="bg-[#FDF9F1] px-8 py-3 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#0F0F0F] transition-colors hover:bg-white"
                    >
                        {editingProduct ? 'Save Changes' : 'Create Masterpiece'}
                    </button>
                </div>
            </div>
        </div>
    );
}
