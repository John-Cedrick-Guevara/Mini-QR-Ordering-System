import { router } from '@inertiajs/react';

interface AdminSidebarProps {
    activeTab: 'orders' | 'products' | 'qrcodes';
    setActiveTab: (tab: 'orders' | 'products' | 'qrcodes') => void;
}

export default function AdminSidebar({
    activeTab,
    setActiveTab,
}: AdminSidebarProps) {
    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <aside className="flex w-64 flex-col border-r border-[#222] bg-[#0A0A0A]">
            <div className="border-b border-[#222] p-8">
                <span className="block font-serif text-2xl font-bold tracking-[0.1em] text-[#FDF9F1]">
                    cubelicious
                </span>
                <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-[#C4A484]">
                    Admin Panel
                </span>
            </div>

            <nav className="flex-1 space-y-2 p-6">
                <button
                    onClick={() => setActiveTab('orders')}
                    className={`w-full px-4 py-3 text-left font-sans text-sm uppercase tracking-widest transition-colors ${
                        activeTab === 'orders'
                            ? 'bg-[#FDF9F1] text-[#0F0F0F]'
                            : 'text-[#E5E1D8] hover:bg-[#111] hover:text-white'
                    }`}
                >
                    Orders
                </button>
                <button
                    onClick={() => setActiveTab('products')}
                    className={`w-full px-4 py-3 text-left font-sans text-sm uppercase tracking-widest transition-colors ${
                        activeTab === 'products'
                            ? 'bg-[#FDF9F1] text-[#0F0F0F]'
                            : 'text-[#E5E1D8] hover:bg-[#111] hover:text-white'
                    }`}
                >
                    Products
                </button>
                <button
                    onClick={() => setActiveTab('qrcodes')}
                    className={`w-full px-4 py-3 text-left font-sans text-sm uppercase tracking-widest transition-colors ${
                        activeTab === 'qrcodes'
                            ? 'bg-[#FDF9F1] text-[#0F0F0F]'
                            : 'text-[#E5E1D8] hover:bg-[#111] hover:text-white'
                    }`}
                >
                    QR Codes
                </button>
            </nav>

            <div className="border-t border-[#222] p-6">
                <button
                    onClick={handleLogout}
                    className="w-full border border-transparent px-4 py-3 text-left font-sans text-xs uppercase tracking-widest text-[#E5E1D8] transition-all hover:border-red-900/50 hover:bg-[#111] hover:text-red-400"
                >
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
