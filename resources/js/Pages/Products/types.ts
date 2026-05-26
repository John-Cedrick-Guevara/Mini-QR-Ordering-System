export interface Product {
    id: number;
    name: string;
    description: string;
    price: number | string;
    image_url: string | null;
    is_available: boolean;
    created_at?: string;
    updated_at?: string;
}
