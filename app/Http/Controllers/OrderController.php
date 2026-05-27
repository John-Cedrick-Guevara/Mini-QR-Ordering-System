<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderController extends Controller
{
    //
    public function index()
    {
        //
        try {
            $orders = Order::with('items')->get();
            return Inertia::render('Orders/Index', compact('orders'));
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to retrieve orders'], 500);
        }
    }

    public function store(Request $request)
    {
        //
        $validatedData = $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email|max:255',
            'total_price' => 'required|numeric|min:0',
            'status' => 'required|string|max:50',
            'payment_status' => 'required|string|max:50',

            // validate order items
            'items' => 'required|array',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0',
        ]);

        // Use a Database Transaction for safety
        DB::beginTransaction();

        try {
            // create order to be referenced by order items
            $orderData = collect($validatedData)->except(['items'])->toArray();
            $order = Order::create($orderData);

            // if order fails to create, return error response
            if (!$order) {
                return response()->json(['error' => 'Failed to create order'], 500);
            }

            // create order items
            foreach ($request->input('items') as $itemData) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $itemData['product_id'],
                    'quantity' => $itemData['quantity'],
                    'price' => $itemData['price'],
                ]);
            }
            // If everything runs perfectly, commit changes to MySQL
            DB::commit();

            // Instead of redirecting to a different route, redirect back to the current view
            return redirect()->back()->with('success', 'Order created successfully!');
        } catch (\Exception $e) {
            // If any error occurs, rollback changes to MySQL
            DB::rollBack();

            return redirect()->back()->with('error', 'Failed to create order');
        }
    }



    public function update(Request $request, Order $order)
    {
        $validatedData = $request->validate([
            'status' => 'required|string|in:pending,preparing,ready,completed',
        ]);

        try {
            $order->update($validatedData);
            return redirect()->back()->with('success', 'Order status updated successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to update order status');
        }
    }
}
