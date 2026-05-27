<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ProductController extends Controller
{
    //
    public function index(Request $request)
    {
        try {
            $searchQuery = $request->input('search');
            $page = $request->input('page', 1);

            Log::info('Search Query:', ['search' => $searchQuery, 'page' => $page]);

            $products = Product::query()
                ->when($searchQuery, function ($query, $searchQuery) {
                    $query->where('name', 'like', "%{$searchQuery}%")
                        ->orWhere('description', 'like', "%{$searchQuery}%");
                })
                ->latest()
                ->paginate(6, ['*'], 'page', $page)
                ->withQueryString();

            return Inertia::render('Welcome', [
                'products' => $products,
                'filters' => [
                    'search' => $searchQuery,
                ],
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

            return redirect()->back()->with('success', 'Order created successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to create product');
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

            return redirect()->back()->with('success', 'Product updated successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to update product');
        }
    }

    public function destroy(Product $product)
    {
        try {
            $product->delete();

            return redirect()->back()->with('success', 'Product deleted successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to delete product');
        }
    }
}
