interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex items-center justify-center space-x-4 py-8">
            {/* Previous Button */}
            <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#333] bg-transparent text-[#E5E1D8] transition-all hover:border-[#FDF9F1] hover:text-[#FDF9F1] disabled:opacity-30 disabled:hover:border-[#333] disabled:hover:text-[#E5E1D8]"
                aria-label="Previous page"
            >
                <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
            </button>

            {/* Page Numbers */}
            <div className="flex items-center space-x-2">
                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => {
                            onPageChange(page);
                        }}
                        className={`flex h-10 w-10 items-center justify-center rounded-full font-sans text-xs transition-all duration-300 ${
                            currentPage === page
                                ? 'bg-[#FDF9F1] font-bold text-[#0F0F0F]'
                                : 'text-[#E5E1D8] hover:bg-[#222] hover:text-[#FDF9F1]'
                        }`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            {/* Next Button */}
            <button
                onClick={() =>
                    onPageChange(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#333] bg-transparent text-[#E5E1D8] transition-all hover:border-[#FDF9F1] hover:text-[#FDF9F1] disabled:opacity-30 disabled:hover:border-[#333] disabled:hover:text-[#E5E1D8]"
                aria-label="Next page"
            >
                <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </button>
        </div>
    );
}
