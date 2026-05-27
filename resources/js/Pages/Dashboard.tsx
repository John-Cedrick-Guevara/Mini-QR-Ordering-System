import { Head } from '@inertiajs/react';
import { useState } from 'react';
import AdminOrdersTab from '../Components/Admin/AdminOrdersTab';
import AdminProductModal from '../Components/Admin/AdminProductModal';
import AdminProductsTab from '../Components/Admin/AdminProductsTab';
import AdminQrCodesTab from '../Components/Admin/AdminQrCodesTab';
import AdminSidebar from '../Components/Admin/AdminSidebar';
import { Order } from '../types/admin';
import { Product } from './Products/types';

interface DashboardProps {
    initialProducts: Product[];
    initialOrders: Order[];
    initialQrLinks: any[];
    filters: {
        search_products: string;
        filter_product_status: string;
        search_orders: string;
        filter_order_status: string;
    };
}

export default function Dashboard({
    initialProducts,
    initialOrders,
    initialQrLinks,
    filters,
}: DashboardProps) {
    const [activeTab, setActiveTab] = useState<
        'orders' | 'products' | 'qrcodes'
    >('orders');

    // Product Modal State
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [productForm, setProductForm] = useState({
        name: '',
        description: '',
        price: '',
        image_url: '',
        is_available: true,
    });

    const handleOpenProductModal = (product?: Product) => {
        if (product) {
            setEditingProduct(product);
            setProductForm({
                name: product.name,
                description: product.description || '',
                price: product.price.toString(),
                image_url: product.image_url || '',
                is_available: product.is_available ?? true,
            });
        } else {
            setEditingProduct(null);
            setProductForm({
                name: '',
                description: '',
                price: '',
                image_url: '',
                is_available: true,
            });
        }
        setIsProductModalOpen(true);
    };

    return (
        <div className="flex min-h-screen bg-[#0F0F0F] font-sans text-[#FDF9F1] selection:bg-[#FDF9F1] selection:text-[#0F0F0F]">
            <Head title="Admin Dashboard | cubelicious" />

            {/* Sidebar */}
            <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <header className="flex items-center justify-between border-b border-[#222] bg-[#0C0C0C] p-8">
                    <h1 className="font-serif text-3xl">
                        {activeTab === 'orders'
                            ? 'Manage Orders'
                            : 'Menu Masterpiece'}
                    </h1>
                    {activeTab === 'products' && (
                        <button
                            onClick={() => handleOpenProductModal()}
                            className="bg-[#C4A484] px-6 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0F0F0F] transition-colors hover:bg-white"
                        >
                            + Add Creation
                        </button>
                    )}
                </header>

                <div className="p-8">
                    {/* Orders View */}
                    {activeTab === 'orders' && (
                        <AdminOrdersTab
                            orders={initialOrders}
                            filters={{
                                search: filters.search_orders,
                                status: filters.filter_order_status,
                            }}
                        />
                    )}

                    {/* Products View */}
                    {activeTab === 'products' && (
                        <AdminProductsTab
                            products={initialProducts}
                            filters={{
                                search: filters.search_products,
                                status: filters.filter_product_status,
                            }}
                            onOpenModal={handleOpenProductModal}
                        />
                    )}

                    {/* QR Codes View */}
                    {activeTab === 'qrcodes' && (
                        <AdminQrCodesTab qrLinks={initialQrLinks || []} />
                    )}
                </div>
            </main>

            {/* Product Modal */}
            <AdminProductModal
                isOpen={isProductModalOpen}
                onClose={() => setIsProductModalOpen(false)}
                editingProduct={editingProduct}
                productForm={productForm}
                setProductForm={setProductForm}
            />
        </div>
    );
}
