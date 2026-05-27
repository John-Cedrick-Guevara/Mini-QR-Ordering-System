import { router } from '@inertiajs/react';
import React, { useState } from 'react';
import { QrLink } from '../../types/admin';

interface AdminQrCodesTabProps {
    qrLinks: QrLink[];
}

export default function AdminQrCodesTab({ qrLinks }: AdminQrCodesTabProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingQr, setEditingQr] = useState<QrLink | null>(null);
    const [form, setForm] = useState({ title: '', url: '' });

    const handleOpenModal = (qr?: QrLink) => {
        if (qr) {
            setEditingQr(qr);
            setForm({ title: qr.title || '', url: qr.url });
        } else {
            setEditingQr(null);
            setForm({ title: '', url: '' });
        }
        setIsModalOpen(true);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingQr) {
            router.put(`/qr-links/${editingQr.id}`, form as any, {
                onSuccess: () => setIsModalOpen(false),
                preserveScroll: true,
            });
        } else {
            router.post('/qr-links', form as any, {
                onSuccess: () => setIsModalOpen(false),
                preserveScroll: true,
            });
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this QR Configuration?')) {
            router.delete(`/qr-links/${id}`, { preserveScroll: true });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-end">
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-[#C4A484] px-6 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0F0F0F] transition-colors hover:bg-white"
                >
                    + Add QR Link
                </button>
            </div>

            {!qrLinks || qrLinks.length === 0 ? (
                <div className="border border-[#222] bg-[#111] p-12 text-center">
                    <p className="font-serif text-xl text-[#E5E1D8]">
                        No active QR codes available.
                    </p>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {qrLinks.map((qr) => (
                        <div
                            key={qr.id}
                            className="flex flex-col border border-[#333] bg-[#111] transition-colors hover:border-[#444]"
                        >
                            <div className="flex items-center justify-center border-b border-[#222] bg-white p-6">
                                <div
                                    className="h-[150px] w-[150px]"
                                    dangerouslySetInnerHTML={{ __html: qr.svg }}
                                />
                            </div>
                            <div className="flex flex-1 flex-col justify-between p-6">
                                <div>
                                    <h3 className="font-serif text-lg text-[#FDF9F1]">
                                        {qr.title || 'Untitled Link'}
                                    </h3>
                                    <a
                                        href={qr.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-2 block truncate font-sans text-xs text-[#C4A484] hover:underline"
                                    >
                                        {qr.url}
                                    </a>
                                </div>
                                <div className="mt-6 flex items-center justify-end space-x-4 border-t border-[#222] pt-4">
                                    <button
                                        onClick={() => handleOpenModal(qr)}
                                        className="font-sans text-[10px] uppercase tracking-widest text-[#E5E1D8] transition-colors hover:text-[#C4A484]"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(qr.id)}
                                        className="font-sans text-[10px] uppercase tracking-widest text-red-500 transition-colors hover:text-red-400"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
                    <div className="flex w-full max-w-lg flex-col overflow-hidden border border-[#333] bg-[#0F0F0F] shadow-2xl">
                        <div className="flex items-center justify-between border-b border-[#222] bg-[#0A0A0A] p-6">
                            <h2 className="font-serif text-2xl">
                                {editingQr ? 'Edit QR Code' : 'New QR Code'}
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-[#888] hover:text-white"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="p-8">
                            <form
                                id="qr-form"
                                onSubmit={handleSave}
                                className="space-y-6"
                            >
                                <div>
                                    <label className="mb-2 block font-sans text-[10px] uppercase tracking-[0.2em] text-[#E5E1D8]">
                                        Title (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        value={form.title}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                title: e.target.value,
                                            })
                                        }
                                        className="w-full border-b border-[#333] bg-transparent pb-3 text-sm transition-colors focus:border-[#C4A484] focus:outline-none focus:ring-0"
                                        placeholder="e.g. Table 5 Menu"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block font-sans text-[10px] uppercase tracking-[0.2em] text-[#E5E1D8]">
                                        Target URL
                                    </label>
                                    <input
                                        type="url"
                                        required
                                        value={form.url}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                url: e.target.value,
                                            })
                                        }
                                        className="w-full border-b border-[#333] bg-transparent pb-3 text-sm transition-colors focus:border-[#C4A484] focus:outline-none focus:ring-0"
                                        placeholder="https://example.com"
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="flex justify-end space-x-4 border-t border-[#222] bg-[#0A0A0A] p-6">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="px-6 py-3 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#888] transition-colors hover:text-white"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                form="qr-form"
                                className="bg-[#FDF9F1] px-8 py-3 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#0F0F0F] transition-colors hover:bg-white"
                            >
                                Save Configuration
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
