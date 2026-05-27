import { router } from '@inertiajs/react';
import { Product } from '../../Pages/Products/types';

interface AdminProductsTabProps {
    products: Product[];
    onOpenModal: (product?: Product) => void;
}

export default function AdminProductsTab({
    products,
    onOpenModal,
}: AdminProductsTabProps) {
    const handleDeleteProduct = (id: number) => {
        if (confirm('Are you sure you want to delete this product?')) {
            router.delete(`/products/${id}`, { preserveScroll: true });
        }
    };

    return (
        <div className="space-y-6">
            {!products || products.length === 0 ? (
                <div className="border border-[#222] bg-[#111] p-12 text-center">
                    <p className="font-serif text-xl text-[#E5E1D8]">
                        No creations in the menu.
                    </p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left text-sm">
                        <thead>
                            <tr className="border-b border-[#333] font-sans text-[10px] uppercase tracking-[0.2em] text-[#888]">
                                <th className="pb-4 pl-4 font-normal">Image</th>
                                <th className="w-1/3 pb-4 font-normal">Name</th>
                                <th className="pb-4 font-normal">Price</th>
                                <th className="pb-4 text-center font-normal">
                                    Status
                                </th>
                                <th className="pb-4 pr-4 text-right font-normal">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr
                                    key={product.id}
                                    className="border-b border-[#222] transition-colors hover:bg-[#111]"
                                >
                                    <td className="py-4 pl-4">
                                        <div className="h-12 w-12 overflow-hidden bg-[#1a1a1a]">
                                            {product.image_url && (
                                                <img
                                                    src={product.image_url}
                                                    alt=""
                                                    className="h-full w-full object-cover opacity-80"
                                                />
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-4 font-serif text-lg leading-tight">
                                        {product.name}
                                    </td>
                                    <td className="py-4 text-[#C4A484]">
                                        ${Number(product.price).toFixed(2)}
                                    </td>
                                    <td className="py-4 text-center">
                                        <span
                                            className={`inline-block h-2 w-2 rounded-full ${product.is_available ? 'bg-green-500' : 'bg-red-500'}`}
                                        ></span>
                                    </td>
                                    <td className="space-x-4 py-4 pr-4 text-right">
                                        <button
                                            onClick={() => onOpenModal(product)}
                                            className="font-sans text-[10px] uppercase tracking-widest text-[#E5E1D8] transition-colors hover:text-[#C4A484]"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDeleteProduct(product.id)
                                            }
                                            className="font-sans text-[10px] uppercase tracking-widest text-red-500 transition-colors hover:text-red-400"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
