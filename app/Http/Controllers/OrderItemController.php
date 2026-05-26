<?php

namespace App\Http\Controllers;

use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderItemController extends Controller
{
    //
    public function store()
    {
        try {
            //
            $validatedData = request()->validate([
                'order_id' => 'required|exists:orders,id',
                'product_id' => 'required|exists:products,id',
                'quantity' => 'required|integer|min:1',
                'price' => 'required|numeric|min:0',
            ]);

            OrderItem::create($validatedData);

            return redirect()->route('orders.index');
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to create order item'], 500);
        }
    }
}
