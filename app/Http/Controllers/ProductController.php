<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;

class ProductController extends Controller
{
    //
    public function index()
    {
        try {
            $products = Product::all();

            return Inertia::render('Products/List', [
                'products' => $products,
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to retrieve products'], 500);
        }
    }

    public function store()
    {
        try {
            $validatedData = request()->validate([
                'name' => 'required|string|max:255',
                'description' => 'required|string',
                'image_url' => 'nullable|url',
                'price' => 'required|numeric|min:0',
                'is_available' => 'required|boolean',
            ]);

            Product::create($validatedData);

            return redirect()->route('products.index');
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to create product'], 500);
        }
    }

    public function update(Product $product)
    {
        try {
            $validatedData = request()->validate([
                'name' => 'required|string|max:255',
                'description' => 'required|string',
                'image_url' => 'nullable|url',
                'price' => 'required|numeric|min:0',
                'is_available' => 'required|boolean',
            ]);

            $product->update($validatedData);

            return Inertia::render('Products/Edit', [
                'product' => $product,
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update product'], 500);
        }
    }

    public function destroy(Product $product)
    {
        try {
            $product->delete();

            return Inertia::render('Products/List');
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete product'], 500);
        }
    }
}
