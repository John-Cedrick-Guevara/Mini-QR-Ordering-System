<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// public routes
Route::get('/', [\App\Http\Controllers\ProductController::class, 'index'])->name('products.home');
// order creation
Route::post('/orders', [\App\Http\Controllers\OrderController::class, 'store'])->name('orders.store');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])
        ->name('dashboard');

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

    // qr links routes
    Route::post('/qr-links', [\App\Http\Controllers\QrLinkController::class, 'store'])->name('qr-links.store');
    Route::put('/qr-links/{qrLink}', [\App\Http\Controllers\QrLinkController::class, 'update'])->name('qr-links.update');
    Route::delete('/qr-links/{qrLink}', [\App\Http\Controllers\QrLinkController::class, 'destroy'])->name('qr-links.destroy');
});

require __DIR__ . '/auth.php';
