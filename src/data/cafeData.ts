export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number; // in AED (dh)
  description: string;
  featuredInGlance?: boolean;
  highlightTag?: string;
  artworkType:
    | 'espresso'
    | 'iced-latte'
    | 'matcha'
    | 'orange-espresso'
    | 'croissant'
    | 'pistachio-croissant'
    | 'toast-avocado'
    | 'toast-egg'
    | 'french-toast'
    | 'pancake'
    | 'crepe'
    | 'quesadilla'
    | 'omelette'
    | 'sandwich'
    | 'burger'
    | 'pasta'
    | 'noodle'
    | 'salad'
    | 'mojito-lavender'
    | 'mojito-berry'
    | 'iced-tea'
    | 'hot-tea'
    | 'muffin'
    | 'truffle';
  customizationOptions?: {
    milk?: string[];
    sweetness?: string[];
    extras?: { label: string; price: number }[];
  };
}

export interface ReviewItem {
  id: string;
  author: string;
  roleOrBadge: string;
  timeAgo: string;
  rating: number;
  text: string;
  topics: string[];
  mediaTag?: string;
}

export interface GalleryMediaItem {
  id: string;
  title: string;
  contributor: string;
  source: string;
  timeAgo: string;
  type: 'video' | 'photo' | 'menu-board';
  duration?: string;
  category: 'Poolside & Ambience' | 'Specialty Coffee & Smoothies' | 'Croissants & Brunch' | 'Menu Boards';
  caption: string;
  imageUrl?: string;
  visualTheme: 'poolside-oasis' | 'latte-art' | 'interior-window' | 'pistachio-pastry' | 'brunch-spread' | 'evening-terrace' | 'menu-1' | 'menu-2' | 'menu-3';
}

export interface AmenityGroup {
  category: string;
  items: string[];
}

export interface NearbyPlace {
  name: string;
  rating: number;
  reviewsCount: string;
  priceRange: string;
  type: string;
  group: 'Cafes' | 'Coffee shops' | 'Coffee and dessert';
  location: string;
}

export const VENUE_INFO = {
  name: 'Garden House Cafe',
  arabicName: 'جاردن هاوس كافيه',
  subBrand: 'Speciality coffee',
  tagline:
    'Welcome to Garden House Cafe. Our café is a haven for coffee enthusiasts and food lovers, offering a serene and quiet environment perfect for both relaxation and productivity.',
  rating: 4.9,
  reviewCount: 541,
  priceRange: 'AED 1–50',
  priceReportedBy: 16,
  category: 'Cafe · Specialty Coffee · All-Day Brunch',
  statusText: 'Open · Closes 10 pm',
  hoursDaily: '7:00 AM – 10:00 PM (Monday – Sunday)',
  address:
    'The Arc Tower - A 5th Floor - Al Reem Island - The Gate District - Abu Dhabi - United Arab Emirates',
  shortAddress: 'The Arc Tower, 5th Floor · The Gate District, Al Reem Island',
  phoneDisplay: '+971 58 283 5070',
  phoneHref: 'tel:+971582835070',
  whatsappCatalogUrl: 'https://wa.me/c/244044638740501',
  whatsappDirectUrl: 'https://wa.me/971582835070',
  googleMapsUrl: 'https://maps.app.goo.gl/AvZqySUfEktAZ9gA6',
  menuSourceLabel: 'Garden House Cafe Kitchen & Espresso Bar',
  logoPath: '/assets/garden-house-logo.png',
  storefrontPhotoPath: '/assets/garden-house-storefront.jpg',
};

export const MENU_CATEGORIES = [
  'All Menu',
  'At a Glance',
  'Specialty Coffee',
  'Latte Special',
  'Croissants',
  'Toast',
  'All Day Breakfast',
  'Pancake',
  'Crepe',
  'Sandwich',
  'Mojito',
  'Iced Tea',
  'Tea',
  'Muffin & Cake',
  'Dessert',
  'Salad',
  'Burger',
  'Pasta',
  'Noodle',
] as const;

export type MenuCategory = (typeof MENU_CATEGORIES)[number];

export const MENU_ITEMS: MenuItem[] = [
  // Specialty Coffee
  {
    id: 'sc-iced-espresso-machiato',
    name: 'Iced Espresso Machiato',
    category: 'Specialty Coffee',
    price: 26.0,
    description: 'Rich espresso, steamed milk, and a touch of foam create a bold coffee experience.',
    highlightTag: 'Barista Signature',
    artworkType: 'espresso',
    customizationOptions: {
      milk: ['Full Cream', 'Oat Milk (+dh 4)', 'Almond Milk (+dh 4)', 'Skim Milk'],
      sweetness: ['Unsweetened', 'Light Raw Sugar', 'Standard'],
    },
  },
  {
    id: 'sc-iced-orange-espresso',
    name: 'Iced Orange Espresso',
    category: 'Specialty Coffee',
    price: 35.0,
    description: 'Rich espresso blended with fresh orange juice and a hint of citrus zest.',
    highlightTag: 'House Favorite',
    artworkType: 'orange-espresso',
  },
  {
    id: 'sc-iced-cafe-latte',
    name: 'Iced Cafe Latte',
    category: 'Specialty Coffee',
    price: 36.0,
    description: 'Rich espresso, steamed milk, creamy foam.',
    artworkType: 'iced-latte',
    customizationOptions: {
      milk: ['Full Cream', 'Oat Milk (+dh 4)', 'Coconut Milk (+dh 4)', 'Skim Milk'],
    },
  },
  {
    id: 'sc-iced-flat-white',
    name: 'Iced Flat White',
    category: 'Specialty Coffee',
    price: 30.0,
    description: 'Rich espresso, steamed milk, velvety microfoam.',
    artworkType: 'iced-latte',
  },
  {
    id: 'sc-iced-espresso',
    name: 'Iced Espresso',
    category: 'Specialty Coffee',
    price: 23.0,
    description: 'Rich coffee brewed under pressure, delivering a bold and intense flavor.',
    artworkType: 'espresso',
  },
  {
    id: 'sc-iced-americano',
    name: 'Iced Americano',
    category: 'Specialty Coffee',
    price: 24.0,
    description: 'Rich espresso, hot water, served chilled over crystal ice.',
    artworkType: 'espresso',
  },
  {
    id: 'sc-iced-cappuccino',
    name: 'Iced Cappuccino',
    category: 'Specialty Coffee',
    price: 36.0,
    description: 'Rich espresso, steamed milk, and a light layer of frothy milk foam.',
    artworkType: 'iced-latte',
  },

  // Latte Special
  {
    id: 'ls-iced-pistachio',
    name: 'Iced Pistachio',
    category: 'Latte Special',
    price: 34.0,
    description: 'Creamy blend of nuts, sugar, and a hint of salt for a delightful treat.',
    highlightTag: 'Most Ordered',
    artworkType: 'matcha',
  },
  {
    id: 'ls-iced-hazelnut',
    name: 'Iced Hazelnut',
    category: 'Latte Special',
    price: 34.0,
    description: 'Rich, creamy spread made with ground nuts, sugar, and cocoa for a delightful flavor.',
    artworkType: 'iced-latte',
  },
  {
    id: 'ls-iced-toffee-nuts',
    name: 'Iced Toffee Nuts',
    category: 'Latte Special',
    price: 34.0,
    description: 'Sweet toffee blended with crunchy nuts for a delightful, chewy treat.',
    artworkType: 'iced-latte',
  },
  {
    id: 'ls-iced-matcha',
    name: 'Iced Matcha',
    category: 'Latte Special',
    price: 34.0,
    description: 'Finely ground green tea leaves, water, and a touch of sweetness create a vibrant flavor.',
    highlightTag: 'Ceremonial Grade',
    artworkType: 'matcha',
  },

  // Croissants
  {
    id: 'cr-pistachio-nutella-kinda',
    name: 'Pistachio/Nutella/Kinda Croissant',
    category: 'Croissants',
    price: 22.0,
    description: 'Rich cream, nutty pistachios, smooth chocolate hazelnut spread, and a hint of sweetness.',
    highlightTag: '4.9★ Reviewer Favorite',
    artworkType: 'pistachio-croissant',
  },
  {
    id: 'cr-cheesy-turkey',
    name: 'Cheesy Turkey Delight',
    category: 'Croissants',
    price: 27.0,
    description: 'A delicious combination of turkey, cheese, and savory seasonings in a delightful dish.',
    artworkType: 'croissant',
  },
  {
    id: 'cr-zaatar',
    name: 'Zaatar Croissant',
    category: 'Croissants',
    price: 18.0,
    description: 'Flaky golden-baked French pastry layered with aromatic Levantine wild thyme, sesame, and olive oil.',
    artworkType: 'croissant',
  },
  {
    id: 'cr-chocolate',
    name: 'Chocolate Croissant',
    category: 'Croissants',
    price: 18.0,
    description: 'Sweet, creamy blend of cocoa, sugar, and milk, perfect for indulgence.',
    artworkType: 'croissant',
  },
  {
    id: 'cr-cheese',
    name: 'Cheese Croissant',
    category: 'Croissants',
    price: 18.0,
    description: 'Blend of cheese, herbs, and spices spread on warm, fluffy bread.',
    artworkType: 'croissant',
  },

  // Toast
  {
    id: 'tst-egg-benedict-avocado',
    name: 'Egg Benedict With Avocado',
    category: 'Toast',
    price: 60.0,
    description: 'Creamy avocado paired with a perfectly cooked egg, offering a delicious and nutritious combination.',
    highlightTag: 'Chef Signature',
    artworkType: 'toast-avocado',
  },
  {
    id: 'tst-avocado',
    name: 'Avocado Toast',
    category: 'Toast',
    price: 50.0,
    description: 'Toasted bread topped with mashed avocado, salt, and pepper.',
    artworkType: 'toast-avocado',
  },
  {
    id: 'tst-poached-egg-mushroom',
    name: 'Poached Egg And Mashroom',
    category: 'Toast',
    price: 48.0,
    description: 'Soft egg, sauteed mushrooms, served together for a rich and creamy experience.',
    artworkType: 'toast-egg',
  },
  {
    id: 'tst-halloumi-heaven',
    name: 'Halloumi Heaven Toast',
    category: 'Toast',
    price: 47.0,
    description: 'Toasted bread with romaine lettuce, topped with grilled halloumi cheese, seasoned with honey, fresh nuts and baby tomatoes.',
    highlightTag: 'Mediterranean',
    artworkType: 'toast-avocado',
  },
  {
    id: 'tst-eggcellent',
    name: 'Eggcellent Toast Treat',
    category: 'Toast',
    price: 46.0,
    description: 'Toasted bread topped with creamy egg, butter, and a sprinkle of seasoning.',
    artworkType: 'toast-egg',
  },

  // All Day Breakfast
  {
    id: 'adb-french-toast',
    name: 'French Toast',
    category: 'All Day Breakfast',
    price: 45.0,
    description: 'Golden-brown bread soaked in eggs and milk, served with syrup and powdered sugar.',
    highlightTag: 'Brunch Classic',
    artworkType: 'french-toast',
  },
  {
    id: 'adb-cheesy-veggie-omelette',
    name: 'Cheesy Veggie Omelette',
    category: 'All Day Breakfast',
    price: 50.0,
    description: 'Fried eggs, sliced cheese, mushrooms, krafkan bread and vegetables.',
    artworkType: 'omelette',
  },
  {
    id: 'adb-tortilla-pie',
    name: 'Tortilla Pie',
    category: 'All Day Breakfast',
    price: 50.0,
    description: 'Tortilla bread, eggs, mozzarella cheese, spinach, turkey ham and tomatoes.',
    artworkType: 'quesadilla',
  },
  {
    id: 'adb-chicken-quesadilla',
    name: 'Chicken Quesadilla',
    category: 'All Day Breakfast',
    price: 45.0,
    description: 'A grilled tortilla filled with mixed cheese and chicken.',
    artworkType: 'quesadilla',
  },
  {
    id: 'adb-quesadilla',
    name: 'Quesadilla',
    category: 'All Day Breakfast',
    price: 44.0,
    description: 'A grilled tortilla filled with mixed cheese, eggs, spinach and often served with salads.',
    artworkType: 'quesadilla',
  },
  {
    id: 'adb-cheese-manakish',
    name: "Cheese Lover's Manakish",
    category: 'All Day Breakfast',
    price: 30.0,
    description: 'A delicious tortilla bread filled with melted mixed cheese.',
    artworkType: 'quesadilla',
  },
  {
    id: 'adb-create-your-crepe',
    name: 'Create-Your-Crepe',
    category: 'All Day Breakfast',
    price: 30.0,
    description: 'Thin pancake filled with cheese, vegetables, and choice of meat or seafood.',
    artworkType: 'crepe',
  },

  // Pancake
  {
    id: 'pnc-nutella-dream',
    name: 'Nutella Dream Pancake',
    category: 'Pancake',
    price: 34.0,
    description: 'Fluffy pancakes filled with creamy chocolate-hazelnut spread, topped with whipped cream and chocolate drizzle.',
    artworkType: 'pancake',
  },
  {
    id: 'pnc-petit-treats',
    name: 'Petit Pancakes Treats',
    category: 'Pancake',
    price: 31.0,
    description: 'Fluffy pancakes made with flour, eggs, milk, and a hint of vanilla.',
    artworkType: 'pancake',
  },
  {
    id: 'pnc-classic-treat',
    name: 'Classic Pancake Treat',
    category: 'Pancake',
    price: 26.0,
    description: 'Fluffy rounds made with flour, eggs, milk, and a hint of sweetness.',
    artworkType: 'pancake',
  },

  // Crepe
  {
    id: 'crp-nutella-dream',
    name: 'Nutella Dream Crepe',
    category: 'Crepe',
    price: 24.0,
    description: 'Delicious crepe filled with creamy chocolate-hazelnut spread, topped with whipped cream and fresh fruits.',
    artworkType: 'crepe',
  },

  // Sandwich
  {
    id: 'snd-chicken-club',
    name: 'Chicken Club Sandwich With Fries',
    category: 'Sandwich',
    price: 47.0,
    description: 'Grilled chicken, lettuce, tomato, mayonnaise, toasted bread, served with crispy fries.',
    highlightTag: 'Includes Crispy Fries',
    artworkType: 'sandwich',
  },
  {
    id: 'snd-cheesy-turkey-crunch',
    name: 'Cheesy Turkey Crunch Sandwich',
    category: 'Sandwich',
    price: 31.0,
    description: 'Delicious blend of cheese, turkey, and crispy textures for a satisfying crunch.',
    artworkType: 'sandwich',
  },
  {
    id: 'snd-veggie',
    name: 'Veggie Sandwich',
    category: 'Sandwich',
    price: 26.0,
    description: 'A wholesome blend of fresh vegetables, lettuce, tomatoes, cucumbers, and whole grain bread.',
    artworkType: 'sandwich',
  },

  // Mojito
  {
    id: 'moj-lavender',
    name: 'Lavender Majito',
    category: 'Mojito',
    price: 27.0,
    description: 'Refreshing blend of lavender, mint, lime, and soda for a vibrant, aromatic experience.',
    featuredInGlance: true,
    highlightTag: 'Botanical Signature',
    artworkType: 'mojito-lavender',
  },
  {
    id: 'moj-classic',
    name: 'Classic Mojito',
    category: 'Mojito',
    price: 27.0,
    description: 'Refreshing mix of mint, lime, sugar, and soda water.',
    artworkType: 'mojito-berry',
  },
  {
    id: 'moj-strawberry',
    name: 'Strawberry Mojito',
    category: 'Mojito',
    price: 30.0,
    description: 'Refreshing combination of strawberries, mint, lime, and sugar served over crushed ice.',
    artworkType: 'mojito-berry',
  },
  {
    id: 'moj-raspberry',
    name: 'Raspberry Mojito',
    category: 'Mojito',
    price: 30.0,
    description: 'A refreshing blend of raspberries, mint, lime, and soda water.',
    artworkType: 'mojito-berry',
  },
  {
    id: 'moj-passion',
    name: 'Passion Mojito',
    category: 'Mojito',
    price: 30.0,
    description: 'Refreshing blend of mint, lime, and passion fruit served over crushed ice.',
    artworkType: 'mojito-berry',
  },

  // Iced Tea
  {
    id: 'it-peach',
    name: 'Peach Ice Tea',
    category: 'Iced Tea',
    price: 26.0,
    description: 'Juicy and sweet, this fruit features a fuzzy skin, vibrant color, and tender flesh.',
    featuredInGlance: true,
    highlightTag: 'Poolside Refreshment',
    artworkType: 'iced-tea',
  },
  {
    id: 'it-raspberry',
    name: 'Raspberry Ice Tea',
    category: 'Iced Tea',
    price: 26.0,
    description: 'Fresh, tart berries with a vibrant red hue and a juicy, sweet flavor.',
    artworkType: 'iced-tea',
  },
  {
    id: 'it-lemon',
    name: 'Lemon Ice Tea',
    category: 'Iced Tea',
    price: 26.0,
    description: 'Bright yellow citrus fruit with a tangy flavor, high in vitamin C and juice.',
    artworkType: 'iced-tea',
  },

  // Tea
  {
    id: 'tea-earl-grey-flora',
    name: 'Earl Grey Flora Tea',
    category: 'Tea',
    price: 26.0,
    description: 'Fragrant black tea infused with bergamot, floral notes, and creamy milk.',
    artworkType: 'hot-tea',
  },
  {
    id: 'tea-green',
    name: 'Green Tea',
    category: 'Tea',
    price: 26.0,
    description: 'Made from finely ground tea leaves and hot water, offering a refreshing and earthy flavor.',
    artworkType: 'hot-tea',
  },
  {
    id: 'tea-hibiscus',
    name: 'Hibiscus Tea',
    category: 'Tea',
    price: 26.0,
    description: 'Bright, tart petals made with water, sugar, and spices for a refreshing infusion.',
    artworkType: 'hot-tea',
  },
  {
    id: 'tea-masala-chai',
    name: 'Masala Chai',
    category: 'Tea',
    price: 26.0,
    description: 'A spiced tea made with black tea, milk, ginger, cardamom, and sugar.',
    artworkType: 'hot-tea',
  },
  {
    id: 'tea-ginger-zest',
    name: 'Ginger Zest Tea',
    category: 'Tea',
    price: 26.0,
    description: 'Zesty blend of ginger, sugar, and citrus, adding a refreshing kick to any dish.',
    artworkType: 'hot-tea',
  },

  // Muffin & Cake
  {
    id: 'mc-chocolate-muffin',
    name: 'Chocolate Muffin',
    category: 'Muffin & Cake',
    price: 22.0,
    description: 'Moist cake made with cocoa, sugar, eggs, flour, and chocolate chips.',
    artworkType: 'muffin',
  },
  {
    id: 'mc-apple-muffin',
    name: 'Apple Muffin',
    category: 'Muffin & Cake',
    price: 22.0,
    description: 'A moist baked treat made with apples, flour, sugar, eggs, and cinnamon.',
    artworkType: 'muffin',
  },
  {
    id: 'mc-blueberry-muffin',
    name: 'Blueberry Muffin',
    category: 'Muffin & Cake',
    price: 22.0,
    description: 'A soft, baked treat made with flour, sugar, blueberries, eggs, and butter.',
    artworkType: 'muffin',
  },
  {
    id: 'mc-chocolate-cookie',
    name: 'Chocolate Cookie',
    category: 'Muffin & Cake',
    price: 14.0,
    description: 'Rich chocolate, flour, sugar, butter, eggs, and vanilla create a delightful sweet treat.',
    artworkType: 'truffle',
  },
  {
    id: 'mc-brownies',
    name: 'Brownies',
    category: 'Muffin & Cake',
    price: 14.0,
    description: 'A rich, fudgy dessert made with chocolate, sugar, eggs, and flour.',
    artworkType: 'truffle',
  },

  // Dessert
  {
    id: 'dst-french-toast-desert',
    name: 'French Toast Desert',
    category: 'Dessert',
    price: 40.0,
    description: 'Bread, eggs, milk, sugar, cinnamon caramelized to golden perfection.',
    artworkType: 'french-toast',
  },
  {
    id: 'dst-oreo-truffles',
    name: 'Oreo Truffles',
    category: 'Dessert',
    price: 7.0,
    description: 'Balls made with cream cheese, chocolate, and crushed chocolate sandwich cookies.',
    featuredInGlance: true,
    highlightTag: 'Quick Sweet Bite',
    artworkType: 'truffle',
  },

  // Salad
  {
    id: 'sld-caesar',
    name: 'Caesar Salad',
    category: 'Salad',
    price: 24.0,
    description: 'Romaine lettuce, croutons, Parmesan cheese, dressing made with garlic, lemon, and anchovies.',
    artworkType: 'salad',
  },
  {
    id: 'sld-garden',
    name: 'Garden Salads',
    category: 'Salad',
    price: 16.0,
    description: 'Crisp lettuce, ripe tomatoes, cucumbers, bell peppers, and a light dressing.',
    artworkType: 'salad',
  },

  // Burger
  {
    id: 'brg-meal-burger',
    name: 'Meal Burger',
    category: 'Burger',
    price: 35.0,
    description: 'Juicy chicken patty, fresh lettuce, ripe tomatoes, sliced cheese, and a soft potato bun. It comes with a soft drink of your choice.',
    highlightTag: 'Includes Soft Drink',
    artworkType: 'burger',
  },

  // Pasta
  {
    id: 'pst-shrimp-pasta',
    name: 'Shrimp Pasta',
    category: 'Pasta',
    price: 47.0,
    description: 'Succulent seafood sauteed with garlic, butter, and a hint of lemon.',
    artworkType: 'pasta',
  },

  // Noodle
  {
    id: 'ndl-classic-noodle',
    name: 'Classic Noodle Treat',
    category: 'Noodle',
    price: 29.0,
    description: 'Delicious noodles tossed with savory meat, vegetables, and a rich, flavorful sauce.',
    artworkType: 'noodle',
  },
];

export const REVIEW_TOPICS = [
  { id: 'All', label: 'All', count: 541 },
  { id: 'smoothies', label: 'smoothies', count: 68 },
  { id: 'kind staff', label: 'kind staff', count: 142 },
  { id: 'poolside', label: 'poolside', count: 89 },
  { id: 'pistachio croissant', label: 'pistachio croissant', count: 94 },
  { id: 'quick service', label: 'quick service', count: 76 },
  { id: 'french toast', label: 'french toast', count: 53 },
  { id: 'egg toast', label: 'egg toast', count: 47 },
  { id: 'croissants', label: 'croissants', count: 112 },
];

export const RATING_DISTRIBUTION = [
  { stars: 5, percentage: 92, count: 498 },
  { stars: 4, percentage: 6, count: 32 },
  { stars: 3, percentage: 1, count: 6 },
  { stars: 2, percentage: 0.5, count: 3 },
  { stars: 1, percentage: 0.5, count: 2 },
];

export const GOOGLE_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Shaira Villa-Alvina',
    roleOrBadge: 'Local Guide · Verified Guest',
    timeAgo: '8 months ago',
    rating: 5,
    text: 'An absolute hidden oasis on the 5th floor of The Arc Tower! The poolside seating with lush greenery makes you forget you are in the middle of the city. Their pistachio croissant and iced pistachio latte are unmatched, and the smoothies are so fresh and aesthetic.',
    topics: ['poolside', 'pistachio croissant', 'smoothies', 'croissants'],
    mediaTag: 'Poolside Terrace Visit',
  },
  {
    id: 'rev-2',
    author: 'Judrani Design',
    roleOrBadge: 'Verified Guest',
    timeAgo: '1 year ago',
    rating: 5,
    text: 'My go-to sanctuary for quiet morning focus and design work. Super calm atmosphere, reliable Wi-Fi, and the kind staff always greet you with a genuine smile. The Egg Benedict with Avocado and Eggcellent Toast Treat are perfection.',
    topics: ['kind staff', 'egg toast', 'quick service'],
    mediaTag: 'Morning Study & Brunch',
  },
  {
    id: 'rev-3',
    author: 'Akram Marzouk',
    roleOrBadge: 'Local Guide · Verified Guest',
    timeAgo: '1 year ago',
    rating: 5,
    text: 'Best French toast and specialty coffee in Al Reem Island! Very reasonable prices (AED 1–50 per person) for the quality and portion sizes. Shoutout to the wonderful team—always attentive and delivering quick service whether dine-in or takeaway.',
    topics: ['french toast', 'kind staff', 'quick service'],
    mediaTag: 'All-Day Breakfast',
  },
  {
    id: 'rev-4',
    author: 'Tina Fan',
    roleOrBadge: 'Local Guide · Verified Guest',
    timeAgo: '2 years ago',
    rating: 5,
    text: 'Lovely poolside cafe in The Gate District. Freshly baked croissants every morning—especially the Pistachio/Nutella and Zaatar croissants—paired with Lavender Mojito or Peach Ice Tea on sunny afternoons.',
    topics: ['poolside', 'croissants', 'pistachio croissant'],
    mediaTag: 'Afternoon Refreshers',
  },
  {
    id: 'rev-5',
    author: 'Martin Harich',
    roleOrBadge: 'Verified Guest',
    timeAgo: '1 year ago',
    rating: 5,
    text: 'Peaceful ambience right by the Arc Tower podium deck. Great smoothies, Iced Orange Espresso, and healthy egg toast options after a morning swim or workout. Highly recommended!',
    topics: ['smoothies', 'poolside', 'egg toast', 'quick service'],
    mediaTag: 'Morning Coffee & Toast',
  },
  {
    id: 'rev-6',
    author: 'Noura Al Mansoori',
    roleOrBadge: 'Al Reem Resident',
    timeAgo: '3 months ago',
    rating: 5,
    text: 'Such kind staff and cozy vibes! We ordered the French Toast, Halloumi Heaven Toast, and Iced Matcha. Everything arrived warm and beautifully plated within 10 minutes.',
    topics: ['kind staff', 'french toast', 'quick service'],
  },
];

export const POPULAR_TIMES_DATA: Record<
  'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun',
  {
    summary: string;
    peakNote: string;
    hours: { label: string; hour24: number; busyness: number; live?: number }[];
  }
> = {
  Mon: {
    summary: 'Quiet morning study hours · Moderate evening breeze',
    peakNote: 'Usually most peaceful between 11 AM and 3 PM',
    hours: [
      { label: '7a', hour24: 7, busyness: 28 },
      { label: '8a', hour24: 8, busyness: 45 },
      { label: '9a', hour24: 9, busyness: 58 },
      { label: '10a', hour24: 10, busyness: 64, live: 76 },
      { label: '11a', hour24: 11, busyness: 48 },
      { label: '12p', hour24: 12, busyness: 52 },
      { label: '1p', hour24: 13, busyness: 55 },
      { label: '2p', hour24: 14, busyness: 42 },
      { label: '3p', hour24: 15, busyness: 38 },
      { label: '4p', hour24: 16, busyness: 46 },
      { label: '5p', hour24: 17, busyness: 60 },
      { label: '6p', hour24: 18, busyness: 72 },
      { label: '7p', hour24: 19, busyness: 75 },
      { label: '8p', hour24: 20, busyness: 68 },
      { label: '9p', hour24: 21, busyness: 45 },
    ],
  },
  Tue: {
    summary: 'Steady remote-work & coffee flow',
    peakNote: 'Popular for solo dining and laptop work all morning',
    hours: [
      { label: '7a', hour24: 7, busyness: 30 },
      { label: '8a', hour24: 8, busyness: 48 },
      { label: '9a', hour24: 9, busyness: 62 },
      { label: '10a', hour24: 10, busyness: 66 },
      { label: '11a', hour24: 11, busyness: 50 },
      { label: '12p', hour24: 12, busyness: 58 },
      { label: '1p', hour24: 13, busyness: 60 },
      { label: '2p', hour24: 14, busyness: 45 },
      { label: '3p', hour24: 15, busyness: 40 },
      { label: '4p', hour24: 16, busyness: 50 },
      { label: '5p', hour24: 17, busyness: 64 },
      { label: '6p', hour24: 18, busyness: 74 },
      { label: '7p', hour24: 19, busyness: 78 },
      { label: '8p', hour24: 20, busyness: 65 },
      { label: '9p', hour24: 21, busyness: 42 },
    ],
  },
  Wed: {
    summary: 'Mid-week brunch & specialty coffee hours',
    peakNote: 'Popular around mid-morning brunch & sunset poolside hours',
    hours: [
      { label: '7a', hour24: 7, busyness: 32 },
      { label: '8a', hour24: 8, busyness: 52 },
      { label: '9a', hour24: 9, busyness: 65 },
      { label: '10a', hour24: 10, busyness: 70, live: 86 },
      { label: '11a', hour24: 11, busyness: 56 },
      { label: '12p', hour24: 12, busyness: 62 },
      { label: '1p', hour24: 13, busyness: 64 },
      { label: '2p', hour24: 14, busyness: 48 },
      { label: '3p', hour24: 15, busyness: 44 },
      { label: '4p', hour24: 16, busyness: 54 },
      { label: '5p', hour24: 17, busyness: 68 },
      { label: '6p', hour24: 18, busyness: 80 },
      { label: '7p', hour24: 19, busyness: 82 },
      { label: '8p', hour24: 20, busyness: 70 },
      { label: '9p', hour24: 21, busyness: 48 },
    ],
  },
  Thu: {
    summary: 'Lively evening terrace & dessert gatherings',
    peakNote: 'Evening poolside tables fill up between 6 PM and 9 PM',
    hours: [
      { label: '7a', hour24: 7, busyness: 30 },
      { label: '8a', hour24: 8, busyness: 50 },
      { label: '9a', hour24: 9, busyness: 64 },
      { label: '10a', hour24: 10, busyness: 68 },
      { label: '11a', hour24: 11, busyness: 58 },
      { label: '12p', hour24: 12, busyness: 65 },
      { label: '1p', hour24: 13, busyness: 66 },
      { label: '2p', hour24: 14, busyness: 52 },
      { label: '3p', hour24: 15, busyness: 48 },
      { label: '4p', hour24: 16, busyness: 60 },
      { label: '5p', hour24: 17, busyness: 74 },
      { label: '6p', hour24: 18, busyness: 86 },
      { label: '7p', hour24: 19, busyness: 90 },
      { label: '8p', hour24: 20, busyness: 84 },
      { label: '9p', hour24: 21, busyness: 62 },
    ],
  },
  Fri: {
    summary: 'Weekend All-Day Breakfast & Poolside Socials',
    peakNote: 'Table reservation recommended for Friday brunch & evening',
    hours: [
      { label: '7a', hour24: 7, busyness: 35 },
      { label: '8a', hour24: 8, busyness: 58 },
      { label: '9a', hour24: 9, busyness: 76 },
      { label: '10a', hour24: 10, busyness: 85, live: 92 },
      { label: '11a', hour24: 11, busyness: 82 },
      { label: '12p', hour24: 12, busyness: 74 },
      { label: '1p', hour24: 13, busyness: 68 },
      { label: '2p', hour24: 14, busyness: 64 },
      { label: '3p', hour24: 15, busyness: 60 },
      { label: '4p', hour24: 16, busyness: 70 },
      { label: '5p', hour24: 17, busyness: 82 },
      { label: '6p', hour24: 18, busyness: 92 },
      { label: '7p', hour24: 19, busyness: 95 },
      { label: '8p', hour24: 20, busyness: 88 },
      { label: '9p', hour24: 21, busyness: 68 },
    ],
  },
  Sat: {
    summary: 'Peak Weekend Brunch & Family Croissant Mornings',
    peakNote: 'Highest demand for Egg Benedict, French Toast & Pistachio Croissants',
    hours: [
      { label: '7a', hour24: 7, busyness: 40 },
      { label: '8a', hour24: 8, busyness: 68 },
      { label: '9a', hour24: 9, busyness: 88 },
      { label: '10a', hour24: 10, busyness: 94, live: 96 },
      { label: '11a', hour24: 11, busyness: 90 },
      { label: '12p', hour24: 12, busyness: 84 },
      { label: '1p', hour24: 13, busyness: 78 },
      { label: '2p', hour24: 14, busyness: 70 },
      { label: '3p', hour24: 15, busyness: 65 },
      { label: '4p', hour24: 16, busyness: 72 },
      { label: '5p', hour24: 17, busyness: 84 },
      { label: '6p', hour24: 18, busyness: 90 },
      { label: '7p', hour24: 19, busyness: 92 },
      { label: '8p', hour24: 20, busyness: 82 },
      { label: '9p', hour24: 21, busyness: 60 },
    ],
  },
  Sun: {
    summary: 'Relaxed Sunday Sanctuary & Sunset Iced Teas',
    peakNote: 'Serene afternoon atmosphere ideal for reading and solo dining',
    hours: [
      { label: '7a', hour24: 7, busyness: 36 },
      { label: '8a', hour24: 8, busyness: 60 },
      { label: '9a', hour24: 9, busyness: 80 },
      { label: '10a', hour24: 10, busyness: 86 },
      { label: '11a', hour24: 11, busyness: 82 },
      { label: '12p', hour24: 12, busyness: 76 },
      { label: '1p', hour24: 13, busyness: 70 },
      { label: '2p', hour24: 14, busyness: 60 },
      { label: '3p', hour24: 15, busyness: 55 },
      { label: '4p', hour24: 16, busyness: 62 },
      { label: '5p', hour24: 17, busyness: 74 },
      { label: '6p', hour24: 18, busyness: 80 },
      { label: '7p', hour24: 19, busyness: 78 },
      { label: '8p', hour24: 20, busyness: 66 },
      { label: '9p', hour24: 21, busyness: 45 },
    ],
  },
};

export const GALLERY_MEDIA: GalleryMediaItem[] = [
  {
    id: 'gal-1',
    title: 'Poolside Storefront & Sanctuary View (جاردن هاوس كافيه)',
    contributor: 'Shaira Villa-Alvina',
    source: 'Guest Highlight',
    timeAgo: '8mo',
    type: 'video',
    duration: '0:17',
    category: 'Poolside & Ambience',
    caption: 'View of Garden House Cafe — Speciality Coffee right by the 5th Floor Arc Tower pool deck and lush tropical palms.',
    imageUrl: '/assets/garden-house-storefront.jpg',
    visualTheme: 'poolside-oasis',
  },
  {
    id: 'gal-2',
    title: 'Artisanal Pour & Quiet Study Corner',
    contributor: 'Judrani Design',
    source: 'Guest Highlight',
    timeAgo: '1y',
    type: 'video',
    duration: '0:06',
    category: 'Specialty Coffee & Smoothies',
    caption: 'Velvety microfoam pour and serene botanical window framing at Garden House Cafe.',
    visualTheme: 'latte-art',
  },
  {
    id: 'gal-3',
    title: 'Sunset Breeze & Botanical Terrace',
    contributor: 'Martin Harich',
    source: 'Guest Highlight',
    timeAgo: '1y',
    type: 'video',
    duration: '0:08',
    category: 'Poolside & Ambience',
    caption: 'Evening twinkling lights and refreshing Lavender & Passion Mojitos by the podium deck.',
    visualTheme: 'evening-terrace',
  },
  {
    id: 'gal-4',
    title: 'Garden House Cafe Poolside Facade & Terrace',
    contributor: 'Garden House Cafe',
    source: 'Official',
    timeAgo: 'Al Reem Island',
    type: 'photo',
    category: 'Poolside & Ambience',
    caption: 'Our poolside storefront at The Arc Tower 5th Floor surrounded by plumeria blossoms and palm trees.',
    imageUrl: '/assets/garden-house-storefront.jpg',
    visualTheme: 'interior-window',
  },
  {
    id: 'gal-5',
    title: 'Pistachio Croissant & French Toast Spread',
    contributor: 'Akram Marzouk',
    source: 'Guest Highlight',
    timeAgo: '1y',
    type: 'photo',
    category: 'Croissants & Brunch',
    caption: 'Freshly baked Pistachio/Nutella/Kinda croissant alongside golden Brioche French Toast.',
    visualTheme: 'pistachio-pastry',
  },
  {
    id: 'gal-6',
    title: 'All-Day Egg Benedict & Smoothies',
    contributor: 'Tina Fan',
    source: 'Guest Highlight',
    timeAgo: '2y',
    type: 'photo',
    category: 'Croissants & Brunch',
    caption: 'Creamy avocado poached egg toast paired with fresh Peach Ice Tea and artisanal smoothies.',
    visualTheme: 'brunch-spread',
  },
];

export const PHYSICAL_MENU_BOARDS = [
  {
    id: 'board-1',
    title: 'Open Menu Photo 1 — Specialty Coffee, Lattes & Refreshers',
    subtitle: 'Espresso Bar · Latte Specials · Mojitos · Artisanal Teas',
    sections: [
      {
        heading: 'Specialty Coffee (Iced & Hot)',
        items: [
          { name: 'Iced Espresso', price: 'dh 23.00' },
          { name: 'Iced Americano', price: 'dh 24.00' },
          { name: 'Iced Espresso Machiato', price: 'dh 26.00' },
          { name: 'Iced Flat White', price: 'dh 30.00' },
          { name: 'Iced Orange Espresso', price: 'dh 35.00' },
          { name: 'Iced Cafe Latte', price: 'dh 36.00' },
          { name: 'Iced Cappuccino', price: 'dh 36.00' },
        ],
      },
      {
        heading: 'Latte Special',
        items: [
          { name: 'Iced Hazelnut Latte', price: 'dh 34.00' },
          { name: 'Iced Pistachio Latte', price: 'dh 34.00' },
          { name: 'Iced Toffee Nuts Latte', price: 'dh 34.00' },
          { name: 'Iced Matcha Latte', price: 'dh 34.00' },
        ],
      },
      {
        heading: 'Mojito & Iced Tea Bar',
        items: [
          { name: 'Lavender Majito / Classic Mojito', price: 'dh 27.00' },
          { name: 'Strawberry / Raspberry / Passion Mojito', price: 'dh 30.00' },
          { name: 'Peach / Raspberry / Lemon Ice Tea', price: 'dh 26.00' },
          { name: 'Earl Grey Flora / Green / Hibiscus / Masala Chai / Ginger Zest', price: 'dh 26.00' },
        ],
      },
    ],
  },
  {
    id: 'board-2',
    title: 'Open Menu Photo 2 — All-Day Breakfast, Artisanal Toasts & Croissants',
    subtitle: 'Freshly Baked Morning Pastries · Poached Egg Toasts · Griddle Favorites',
    sections: [
      {
        heading: 'Artisanal Toasts',
        items: [
          { name: 'Eggcellent Toast Treat', price: 'dh 46.00' },
          { name: 'Halloumi Heaven Toast', price: 'dh 47.00' },
          { name: 'Poached Egg And Mashroom', price: 'dh 48.00' },
          { name: 'Avocado Toast', price: 'dh 50.00' },
          { name: 'Egg Benedict With Avocado', price: 'dh 60.00' },
        ],
      },
      {
        heading: 'All Day Breakfast',
        items: [
          { name: "Cheese Lover's Manakish", price: 'dh 30.00' },
          { name: 'Create-Your-Crepe (Savory)', price: 'dh 30.00' },
          { name: 'Quesadilla (Cheese, Egg & Spinach)', price: 'dh 44.00' },
          { name: 'Chicken Quesadilla', price: 'dh 45.00' },
          { name: 'French Toast', price: 'dh 45.00' },
          { name: 'Cheesy Veggie Omelette', price: 'dh 50.00' },
          { name: 'Tortilla Pie', price: 'dh 50.00' },
        ],
      },
      {
        heading: 'Fresh Croissants',
        items: [
          { name: 'Zaatar / Chocolate / Cheese Croissant', price: 'dh 18.00' },
          { name: 'Pistachio / Nutella / Kinda Croissant', price: 'dh 22.00' },
          { name: 'Cheesy Turkey Delight Croissant', price: 'dh 27.00' },
        ],
      },
    ],
  },
  {
    id: 'board-3',
    title: 'Open Menu Photo 3 — Savory Plates, Pancakes, Crepes & Bakery',
    subtitle: 'Club Sandwiches · Pasta & Noodles · Sweet Pancakes · Muffins & Truffles',
    sections: [
      {
        heading: 'Sandwiches, Burger, Pasta & Noodle',
        items: [
          { name: 'Veggie Sandwich', price: 'dh 26.00' },
          { name: 'Classic Noodle Treat', price: 'dh 29.00' },
          { name: 'Cheesy Turkey Crunch Sandwich', price: 'dh 31.00' },
          { name: 'Meal Burger (with Soft Drink)', price: 'dh 35.00' },
          { name: 'Chicken Club Sandwich With Fries', price: 'dh 47.00' },
          { name: 'Shrimp Pasta', price: 'dh 47.00' },
        ],
      },
      {
        heading: 'Pancakes, Crepes & Desserts',
        items: [
          { name: 'Oreo Truffles', price: 'dh 7.00' },
          { name: 'Chocolate Cookie / Fudgy Brownies', price: 'dh 14.00' },
          { name: 'Chocolate / Apple / Blueberry Muffin', price: 'dh 22.00' },
          { name: 'Nutella Dream Crepe', price: 'dh 24.00' },
          { name: 'Classic Pancake Treat', price: 'dh 26.00' },
          { name: 'Petit Pancakes Treats', price: 'dh 31.00' },
          { name: 'Nutella Dream Pancake', price: 'dh 34.00' },
          { name: 'French Toast Desert', price: 'dh 40.00' },
        ],
      },
      {
        heading: 'Crisp Salads',
        items: [
          { name: 'Garden Salads', price: 'dh 16.00' },
          { name: 'Caesar Salad', price: 'dh 24.00' },
        ],
      },
    ],
  },
];

export const AMENITIES_MATRIX: AmenityGroup[] = [
  {
    category: 'Service options',
    items: [
      'Outdoor seating (Poolside 5th Floor Terrace)',
      'No-contact delivery',
      'Delivery',
      'On-site services',
      'Takeaway',
      'Dine-in',
    ],
  },
  {
    category: 'Highlights',
    items: ['Great coffee', 'Great dessert', 'Great tea selection'],
  },
  {
    category: 'Popular for',
    items: ['Breakfast', 'Lunch', 'Solo dining & Laptop work'],
  },
  {
    category: 'Accessibility',
    items: ['Wheelchair-accessible car park', 'Wheelchair-accessible entrance'],
  },
  {
    category: 'Offerings',
    items: ['Coffee', 'Healthy options', 'Quick bite', 'Small plates'],
  },
  {
    category: 'Dining options',
    items: ['Breakfast', 'Brunch', 'Lunch', 'Catering', 'Dessert', 'Seating', 'Table service'],
  },
  {
    category: 'Atmosphere',
    items: ['Casual', 'Cozy', 'Quiet', 'Trendy'],
  },
  {
    category: 'Crowd & Planning',
    items: ['Family friendly', 'Groups', 'Accepts reservations'],
  },
  {
    category: 'Payments',
    items: ['Credit cards', 'Debit cards', 'NFC mobile payments'],
  },
  {
    category: 'Children & Family',
    items: ['Good for kids', 'High chairs', "Kids' menu"],
  },
  {
    category: 'Amenities & Parking',
    items: ['Restroom', 'Free parking lot'],
  },
];

export const NEARBY_ABU_DHABI_CAFES: NearbyPlace[] = [
  // Cafes
  {
    name: 'House of Ritual',
    rating: 4.5,
    reviewsCount: '1.2k',
    priceRange: 'AED 50–100',
    type: 'Cafe',
    group: 'Cafes',
    location: 'Abu Dhabi - United Arab Emirates',
  },
  {
    name: 'Third Place - A Community Cafe',
    rating: 4.3,
    reviewsCount: '1.2k',
    priceRange: 'AED 50–100',
    type: 'Cafe',
    group: 'Cafes',
    location: 'Abu Dhabi - United Arab Emirates',
  },
  {
    name: 'Café Bateel and Bateel Boutique, Reem Mall',
    rating: 4.8,
    reviewsCount: '898',
    priceRange: 'AED 50–150',
    type: 'Cafe',
    group: 'Cafes',
    location: 'Abu Dhabi - United Arab Emirates',
  },
  {
    name: 'Art House Cafe',
    rating: 4.6,
    reviewsCount: '3.1k',
    priceRange: 'AED 50–100',
    type: 'Cafe',
    group: 'Cafes',
    location: 'Abu Dhabi - United Arab Emirates',
  },
  // Coffee shops
  {
    name: 'Save Our Souls cafe',
    rating: 4.3,
    reviewsCount: '373',
    priceRange: 'AED 50–100',
    type: 'Coffee shop',
    group: 'Coffee shops',
    location: 'Abu Dhabi - United Arab Emirates',
  },
  {
    name: 'Café Marina Home',
    rating: 3.9,
    reviewsCount: '23',
    priceRange: 'AED 1–50',
    type: 'Coffee shop',
    group: 'Coffee shops',
    location: 'Abu Dhabi - United Arab Emirates',
  },
  {
    name: 'Caffè Nero',
    rating: 4.2,
    reviewsCount: '76',
    priceRange: 'AED 1–50',
    type: 'Coffee shop',
    group: 'Coffee shops',
    location: 'Abu Dhabi - United Arab Emirates',
  },
  {
    name: 'Tim Hortons',
    rating: 4.6,
    reviewsCount: '454',
    priceRange: 'AED 1–50',
    type: 'Coffee shop',
    group: 'Coffee shops',
    location: 'Abu Dhabi - United Arab Emirates',
  },
  {
    name: 'GLADIO CAFE',
    rating: 4.4,
    reviewsCount: '42',
    priceRange: 'AED 1–50',
    type: 'Coffee shop',
    group: 'Coffee shops',
    location: 'Abu Dhabi - United Arab Emirates',
  },
  // Coffee and dessert
  {
    name: 'La Zona Cafe',
    rating: 4.6,
    reviewsCount: '1k',
    priceRange: 'AED 50–100',
    type: 'Restaurant',
    group: 'Coffee and dessert',
    location: 'Abu Dhabi - United Arab Emirates',
  },
  {
    name: 'Santorini Cafe',
    rating: 4.5,
    reviewsCount: '869',
    priceRange: 'AED 50–100',
    type: 'Restaurant',
    group: 'Coffee and dessert',
    location: 'Abu Dhabi - United Arab Emirates',
  },
  {
    name: 'Cafe James',
    rating: 4.6,
    reviewsCount: '856',
    priceRange: 'AED 50–100',
    type: 'Restaurant',
    group: 'Coffee and dessert',
    location: 'Abu Dhabi - United Arab Emirates',
  },
  {
    name: 'Le Cafio Cafe Restaurant Reem Branch',
    rating: 4.7,
    reviewsCount: '107',
    priceRange: 'AED 1–50',
    type: 'Restaurant',
    group: 'Coffee and dessert',
    location: 'Abu Dhabi - United Arab Emirates',
  },
  {
    name: 'The Brothers Restaurant & Café',
    rating: 4.6,
    reviewsCount: '973',
    priceRange: 'AED 50–100',
    type: 'Restaurant',
    group: 'Coffee and dessert',
    location: 'Abu Dhabi - United Arab Emirates',
  },
];
