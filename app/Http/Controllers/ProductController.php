<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;

class ProductController extends Controller
{
    //
    public function index()
    {
        $products = Product::all();
        return Inertia::render('Products/List', [
            'products' => $products,
        ]);
    }

    public function store()
    {
        $validatedData = request()->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'image_url' => 'nullable|url',
            'price' => 'required|numeric|min:0',
            'is_available' => 'required|boolean',
        ]);

        Product::create($validatedData);

        return Inertia::render('Products/Add');
    }

    public function update(Product $product)
    {
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
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return Inertia::render('Products/List');
    }
}
