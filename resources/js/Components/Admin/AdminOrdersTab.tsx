import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Order } from '../../types/admin';

interface AdminOrdersTabProps {
    orders: Order[];
    filters: { search: string; status: string };
}

export default function AdminOrdersTab({
    orders,
    filters,
}: AdminOrdersTabProps) {
    const [search, setSearch] = useState(filters.search);
    const [status, setStatus] = useState(filters.status);

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(
                '/dashboard',
                { search_orders: search, filter_order_status: status },
                { preserveState: true, preserveScroll: true, replace: true },
            );
        }, 300);
        return () => clearTimeout(timeout);
    }, [search, status]);

    const handleUpdateOrderStatus = (id: number, orderStatus: string) => {
        router.put(
            `/orders/${id}`,
            { status: orderStatus },
            { preserveScroll: true },
        );
    };

    return (
        <div className="space-y-6">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <input
                    type="text"
                    placeholder="Search by ID, name or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border-b border-[#333] bg-transparent pb-2 text-sm transition-colors focus:border-[#C4A484] focus:outline-none focus:ring-0 sm:max-w-md"
                />
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="cursor-pointer appearance-none border border-[#333] bg-transparent px-4 py-2 font-sans text-xs uppercase tracking-[0.1em] text-[#E5E1D8] transition-colors focus:border-[#C4A484] focus:outline-none"
                >
                    <option value="all" className="bg-[#111] text-[#E5E1D8]">
                        All Statuses
                    </option>
                    <option
                        value="cancelled"
                        className="bg-[#111] text-[#E5E1D8]"
                    >
                        Cancelled
                    </option>
                    <option
                        value="preparing"
                        className="bg-[#111] text-[#E5E1D8]"
                    >
                        Preparing
                    </option>

                    <option
                        value="completed"
                        className="bg-[#111] text-[#E5E1D8]"
                    >
                        Completed
                    </option>
                </select>
            </div>

            {!orders || orders.length === 0 ? (
                <div className="border border-[#222] bg-[#111] p-12 text-center">
                    <p className="font-serif text-xl text-[#E5E1D8]">
                        No orders received yet.
                    </p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="border border-[#333] bg-[#111] p-6 transition-colors hover:border-[#444]"
                        >
                            <div className="mb-6 flex items-start justify-between border-b border-[#222] pb-6">
                                <div>
                                    <h3 className="mb-1 mt-0 font-serif text-xl">
                                        Order #{order.id}
                                    </h3>
                                    <p className="font-sans text-xs uppercase tracking-widest text-[#C4A484]">
                                        {order.customer_name} &middot;{' '}
                                        {order.customer_email}
                                    </p>
                                    <p className="mt-2 font-sans text-[10px] uppercase tracking-widest text-[#666]">
                                        {new Date(
                                            order.created_at,
                                        ).toLocaleString()}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="font-serif text-2xl">
                                        ${Number(order.total_price).toFixed(2)}
                                    </div>
                                    <div className="mt-2 flex items-center justify-end gap-2">
                                        <span
                                            className={`border px-2 py-1 font-sans text-[10px] uppercase tracking-[0.1em] ${order.payment_status === 'completed' ? 'border-green-800 bg-green-900/20 text-green-400' : 'border-[#444] text-[#888]'}`}
                                        >
                                            {order.payment_status}
                                        </span>
                                        <select
                                            value={order.status}
                                            onChange={(e) =>
                                                handleUpdateOrderStatus(
                                                    order.id,
                                                    e.target.value,
                                                )
                                            }
                                            className="cursor-pointer appearance-none border border-[#C4A484] bg-transparent px-2 py-1 font-sans text-[10px] uppercase tracking-[0.1em] text-[#C4A484] transition-colors focus:border-white focus:outline-none focus:ring-0"
                                        >
                                            <option
                                                value="prepering"
                                                className="bg-[#111] text-[#E5E1D8]"
                                            >
                                                Prepering
                                            </option>

                                            <option
                                                value="completed"
                                                className="bg-[#111] text-[#E5E1D8]"
                                            >
                                                Completed
                                            </option>
                                            <option
                                                value="cancelled"
                                                className="bg-[#111] text-[#E5E1D8]"
                                            >
                                                Cancelled
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                {order.items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center justify-between text-sm"
                                    >
                                        <span className="text-[#E5E1D8]">
                                            {item.quantity}x{' '}
                                            <span className="font-serif tracking-wide">
                                                {item.product?.name ||
                                                    'Unknown Product'}
                                            </span>
                                        </span>
                                        <span className="font-sans text-xs text-[#888]">
                                            ${Number(item.price).toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
