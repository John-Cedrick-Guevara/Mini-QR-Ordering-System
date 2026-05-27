import { PageProps } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import Show from './Products/Show';
import { Product } from './Products/types';

// New Components
import AboutSection from '@/Components/Landing/AboutSection';
import CartSidebar, { CartItem } from '@/Components/Landing/CartSidebar';
import GallerySection from '@/Components/Landing/GallerySection';
import Hero from '@/Components/Landing/Hero';
import LocationSection from '@/Components/Landing/LocationSection';
import MenuListing from '@/Components/Landing/MenuListing';
import ReserveSection from '@/Components/Landing/ReserveSection';
import RulesSection from '@/Components/Landing/RulesSection';

// High-fidelity fallback mock products if the database is empty
const FALLBACK_PRODUCTS: Product[] = [
    {
        id: 1,
        name: 'Filet Mignon with Herb Butter',
        description:
            'A tender cut of prime filet mignon, seared to perfection and topped with aromatic herb butter and golden roasted garlic. Finished with a touch of sea salt and fresh rosemary for a rich, melt-in-your-mouth experience.',
        price: 499.99,
        image_url:
            'https://images.unsplash.com/photo-1544025162-d76694265947?w=1000&auto=format&fit=crop&q=80',
        is_available: true,
    },
    {
        id: 2,
        name: 'Ribeye Steak with Roasted Asparagus',
        description:
            'Premium dry-aged ribeye steak grilled over open flame, served with garlic roasted asparagus and a rich red wine reduction. Tender, juicy, and packed with bold flavor.',
        price: 389.99,
        image_url:
            'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=1000&auto=format&fit=crop&q=80',
        is_available: true,
    },
    {
        id: 3,
        name: 'Italian Salad',
        description:
            'Fresh lettuce, cherry tomatoes, olives, parmesan, and a light olive oil dressing. Crisp, clean, and nutritious.',
        price: 7.49,
        image_url:
            'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1000&auto=format&fit=crop&q=80',
        is_available: true,
    },
    {
        id: 4,
        name: 'Greek Salad',
        description:
            'Crisp cucumbers, feta cheese, black olives, red onions, and oregano tossed in a zesty lemon-herb vinaigrette.',
        price: 6.89,
        image_url:
            'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1000&auto=format&fit=crop&q=80',
        is_available: true,
    },
    {
        id: 5,
        name: 'Caesar Salad',
        description:
            'Romaine lettuce, crunchy herb croutons, grilled chicken, and creamy Caesar dressing topped with freshly shaved parmesan.',
        price: 8.99,
        image_url:
            'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=1000&auto=format&fit=crop&q=80',
        is_available: true,
    },
    {
        id: 6,
        name: 'Truffle Mushroom Tagliatelle',
        description:
            'Artisanal pasta tossed in a luxurious truffle cream sauce, wild forest mushrooms, and freshly grated pecorino romano. Subtle notes of garlic and white wine.',
        price: 24.5,
        image_url:
            'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1000&auto=format&fit=crop&q=80',
        is_available: true,
    },
    {
        id: 7,
        name: 'Chocolate Fondant Lava Cake',
        description:
            'Decadent dark chocolate cake with a warm, molten lava center. Served with a scoop of premium vanilla bean gelato and fresh raspberries.',
        price: 12.0,
        image_url:
            'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=1000&auto=format&fit=crop&q=80',
        is_available: true,
    },
    {
        id: 8,
        name: 'Matcha Green Tea Latte',
        description:
            'Ceremonial grade Japanese Uji matcha whisked with velvety steamed oat milk and a touch of organic agave nectar. A calm, nourishing beverage.',
        price: 6.5,
        image_url:
            'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=1000&auto=format&fit=crop&q=80',
        is_available: true,
    },
    {
        id: 9,
        name: 'Classic Margherita Pizza',
        description:
            'House-made sourdough base topped with rich San Marzano tomato sauce, fresh buffalo mozzarella, aromatic sweet basil leaves, and a drizzle of extra virgin olive oil.',
        price: 16.99,
        image_url:
            'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=1000&auto=format&fit=crop&q=80',
        is_available: true,
    },
];

interface WelcomePageProps extends PageProps {
    products?: { data?: Product[]; total?: number } | null;
    filters?: {
        search?: string;
    };
}

export default function Welcome({
    products = { data: [] },
    filters,
}: WelcomePageProps) {
    console.log('Products:', products);
    console.log('Products Count:', products?.data?.length);
    console.log('Filters:', filters);
    const menuItems = useMemo(() => {
        const list = Array.isArray(products)
            ? products
            : ((products as { data?: Product[] } | null | undefined)?.data ??
              []);
        return list && list.length > 0 ? list : FALLBACK_PRODUCTS;
    }, [products]);

    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState(filters?.search || '');
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // URL-based page sync for the specific food view
    const [selectedProductId, setSelectedProductId] = useState<number | null>(
        () => {
            if (typeof window !== 'undefined') {
                const params = new URLSearchParams(window.location.search);
                const foodId = params.get('food');
                return foodId ? parseInt(foodId) : null;
            }
            return null;
        },
    );

    const itemsPerPage = 6;

    // Synchronize details page back button with browser history
    useEffect(() => {
        const handlePopState = () => {
            const params = new URLSearchParams(window.location.search);
            const foodId = params.get('food');
            setSelectedProductId(foodId ? parseInt(foodId) : null);
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    // search query debounce
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            router.get(
                '/',
                {
                    search: searchQuery,
                },
                { preserveState: true, replace: true, preserveScroll: true },
            ); // Keeps the input focused while typing
        }, 500);
        return () => clearTimeout(delayDebounce);
    }, [searchQuery]);

    // page change sync
    useEffect(() => {
        router.get(
            '/',
            {
                page: currentPage,
                search: searchQuery,
            },
            { preserveState: true, replace: true, preserveScroll: true },
        );
    }, [currentPage]);

    const handleSelectProduct = (id: number) => {
        setSelectedProductId(id);
        const url = new URL(window.location.href);
        url.searchParams.set('food', id.toString());
        window.history.pushState({}, '', url.toString());
    };

    const handleBackToMenu = () => {
        setSelectedProductId(null);
        const url = new URL(window.location.href);
        url.searchParams.delete('food');
        window.history.pushState({}, '', url.toString());
    };

    // Cart Logic
    const handleAddToCart = (product: Product, quantity: number = 1) => {
        setCart((prev) => {
            const existing = prev.find(
                (item) => item.product.id === product.id,
            );
            if (existing) {
                return prev.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item,
                );
            }
            return [...prev, { product, quantity }];
        });
        setIsCartOpen(true); // Auto-open cart to show feedback
    };

    const handleUpdateQuantity = (productId: number, quantity: number) => {
        setCart((prev) =>
            prev.map((item) =>
                item.product.id === productId ? { ...item, quantity } : item,
            ),
        );
    };

    const handleRemoveFromCart = (productId: number) => {
        setCart((prev) => prev.filter((item) => item.product.id !== productId));
    };

    const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    const selectedProduct = useMemo(() => {
        if (!selectedProductId) return null;
        return menuItems.find((p) => p.id === selectedProductId) || null;
    }, [selectedProductId, menuItems]);

    // Single menu view render
    if (selectedProduct) {
        return (
            <>
                <Show
                    product={selectedProduct}
                    onBack={handleBackToMenu}
                    cartCount={totalCartItems}
                    onAddToCart={handleAddToCart}
                    onOpenCart={() => setIsCartOpen(true)}
                />
                <CartSidebar
                    isOpen={isCartOpen}
                    onClose={() => setIsCartOpen(false)}
                    cart={cart}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemoveFromCart}
                />
            </>
        );
    }

    return (
        <div className="min-h-screen overflow-x-hidden scroll-smooth bg-[#0F0F0F] font-sans text-[#FDF9F1] selection:bg-[#FDF9F1] selection:text-[#0F0F0F]">
            <Head title="cubelicious" />

            <Hero
                cartCount={totalCartItems}
                onOpenCart={() => setIsCartOpen(true)}
            />

            <AboutSection />

            <RulesSection />

            <MenuListing
                items={products?.data || []}
                currentPage={currentPage}
                totalPages={
                    products?.total
                        ? Math.ceil(products.total / itemsPerPage)
                        : 1
                }
                onPageChange={setCurrentPage}
                onSelectProduct={handleSelectProduct}
                onAddToCart={(product) => handleAddToCart(product, 1)}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
            />

            <GallerySection />

            <LocationSection />

            <ReserveSection />

            <CartSidebar
                isOpen={isCartOpen}
                onClose={() => {
                    setIsCartOpen(false);
                    setCart([]); 
                }}
                cart={cart}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemoveFromCart}
            />

            <footer className="border-t border-[#222] bg-[#0A0A0A] py-16 text-center">
                <span className="mb-4 block font-serif text-xl font-bold uppercase tracking-[0.2em] text-[#FDF9F1]">
                    cubelicious
                </span>
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#E5E1D8]">
                    © 2026 cubelicious. All rights reserved.
                </span>
            </footer>
        </div>
    );
}
