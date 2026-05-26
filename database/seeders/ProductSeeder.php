<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'name' => 'Filet Mignon with Herb Butter',
                'description' => 'A tender cut of prime filet mignon, seared to perfection and topped with aromatic herb butter and golden roasted garlic. Finished with a touch of sea salt and fresh rosemary for a rich, melt-in-your-mouth experience.',
                'price' => 499.99,
                'image_url' => 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1000&auto=format&fit=crop&q=80',
                'is_available' => true,
            ],
            [
                'name' => 'Ribeye Steak with Roasted Asparagus',
                'description' => 'Premium dry-aged ribeye steak grilled over open flame, served with garlic roasted asparagus and a rich red wine reduction. Tender, juicy, and packed with bold flavor.',
                'price' => 389.99,
                'image_url' => 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=1000&auto=format&fit=crop&q=80',
                'is_available' => true,
            ],
            [
                'name' => 'Italian Salad',
                'description' => 'Fresh lettuce, cherry tomatoes, olives, parmesan, and a light olive oil dressing. Crisp, clean, and nutritious.',
                'price' => 7.49,
                'image_url' => 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1000&auto=format&fit=crop&q=80',
                'is_available' => true,
            ],
            [
                'name' => 'Greek Salad',
                'description' => 'Crisp cucumbers, feta cheese, black olives, red onions, and oregano tossed in a zesty lemon-herb vinaigrette.',
                'price' => 6.89,
                'image_url' => 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1000&auto=format&fit=crop&q=80',
                'is_available' => true,
            ],
            [
                'name' => 'Caesar Salad',
                'description' => 'Romaine lettuce, crunchy herb croutons, grilled chicken, and creamy Caesar dressing topped with freshly shaved parmesan.',
                'price' => 8.99,
                'image_url' => 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=1000&auto=format&fit=crop&q=80',
                'is_available' => true,
            ],
            [
                'name' => 'Truffle Mushroom Tagliatelle',
                'description' => 'Artisanal pasta tossed in a luxurious truffle cream sauce, wild forest mushrooms, and freshly grated pecorino romano. Subtle notes of garlic and white wine.',
                'price' => 24.50,
                'image_url' => 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1000&auto=format&fit=crop&q=80',
                'is_available' => true,
            ],
            [
                'name' => 'Chocolate Fondant Lava Cake',
                'description' => 'Decadent dark chocolate cake with a warm, molten lava center. Served with a scoop of premium vanilla bean gelato and fresh raspberries.',
                'price' => 12.00,
                'image_url' => 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=1000&auto=format&fit=crop&q=80',
                'is_available' => true,
            ],
            [
                'name' => 'Matcha Green Tea Latte',
                'description' => 'Ceremonial grade Japanese Uji matcha whisked with velvety steamed oat milk and a touch of organic agave nectar. A calm, nourishing beverage.',
                'price' => 6.50,
                'image_url' => 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=1000&auto=format&fit=crop&q=80',
                'is_available' => true,
            ],
            [
                'name' => 'Classic Margherita Pizza',
                'description' => 'House-made sourdough base topped with rich San Marzano tomato sauce, fresh buffalo mozzarella, aromatic sweet basil leaves, and a drizzle of extra virgin olive oil.',
                'price' => 16.99,
                'image_url' => 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=1000&auto=format&fit=crop&q=80',
                'is_available' => true,
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
