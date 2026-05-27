<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// public routes
Route::get('/', [\App\Http\Controllers\ProductController::class, 'index'])->name('products.home');
// order creation
Route::post('/orders', [\App\Http\Controllers\OrderController::class, 'store'])->name('orders.store');

Route::get('/dashboard', function () {
    $products = \App\Models\Product::orderBy('created_at', 'desc')->get();
    $orders = \App\Models\Order::with('items.product')->orderBy('created_at', 'desc')->get();

    return Inertia::render('Dashboard', [
        'initialProducts' => $products,
        'initialOrders' => $orders,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // products routes
    Route::post('/products', [\App\Http\Controllers\ProductController::class, 'store'])->name('products.store');
    Route::put('/products/{product}', [\App\Http\Controllers\ProductController::class, 'update'])->name('products.update');
    Route::delete('/products/{product}', [\App\Http\Controllers\ProductController::class, 'destroy'])->name('products.destroy');

    // orders routes
    Route::get('/orders', [\App\Http\Controllers\OrderController::class, 'index'])->name('orders.index');
    Route::put('/orders/{order}', [\App\Http\Controllers\OrderController::class, 'update'])->name('orders.update');
});

require __DIR__ . '/auth.php';
