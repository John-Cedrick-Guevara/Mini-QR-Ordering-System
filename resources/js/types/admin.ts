import { Product } from '../Pages/Products/types';

export interface QrLink {
    id: number;
    title: string | null;
    url: string;
    svg: string;
    created_at: string;
}

export interface OrderItem {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    price: string;
    product: Product;
}

export interface Order {
    id: number;
    customer_name: string;
    customer_email: string;
    total_price: string;
    status: 'pending' | 'completed' | 'cancelled';
    payment_status: 'pending' | 'completed' | 'failed';
    created_at: string;
    items: OrderItem[];
}
