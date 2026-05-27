<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Order;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $productsQuery = Product::query();
        $ordersQuery = Order::with('items.product');

        // Products Search & Filter
        if ($request->filled('search_products')) {
            $search = $request->input('search_products');
            $productsQuery->where('name', 'like', "%{$search}%")
                ->orWhere('description', 'like', "%{$search}%");
        }
        if ($request->filled('filter_product_status') && $request->input('filter_product_status') !== 'all') {
            $productsQuery->where('is_available', $request->input('filter_product_status') === 'available');
        }

        // Orders Search & Filter
        if ($request->filled('search_orders')) {
            $search = $request->input('search_orders');
            $ordersQuery->where(function ($q) use ($search) {
                $q->where('id', 'like', "%{$search}%")
                    ->orWhere('customer_name', 'like', "%{$search}%")
                    ->orWhere('customer_email', 'like', "%{$search}%");
            });
        }
        if ($request->filled('filter_order_status') && $request->input('filter_order_status') !== 'all') {
            $ordersQuery->where('status', $request->input('filter_order_status'));
        }

        $products = $productsQuery->orderBy('created_at', 'desc')->get();
        $orders = $ordersQuery->orderBy('created_at', 'desc')->get();

        return Inertia::render('Dashboard', [
            'initialProducts' => $products,
            'initialOrders' => $orders,
            'filters' => [
                'search_products' => $request->input('search_products', ''),
                'filter_product_status' => $request->input('filter_product_status', 'all'),
                'search_orders' => $request->input('search_orders', ''),
                'filter_order_status' => $request->input('filter_order_status', 'all'),
            ]
        ]);
    }
}
