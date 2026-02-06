import type { Product, Brand, Order } from '@/lib/types';

export const brands: Brand[] = [
  { id: 'nike', name: 'Nike' },
  { id: 'adidas', name: 'Adidas' },
  { id: 'puma', name: 'Puma' },
  { id: 'reebok', name: 'Reebok' },
  { id: 'new-balance', name: 'New Balance' },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Velocity Runner',
    slug: 'velocity-runner',
    brand: 'Nike',
    description: 'Lightweight and responsive for your daily runs.',
    longDescription:
      'Experience the pinnacle of running technology with the Velocity Runner. Featuring a breathable mesh upper and our patented foam sole, this shoe provides unparalleled comfort and support. The durable rubber outsole offers excellent traction on various surfaces. Made with genuine leather accents.',
    price: 120,
    tags: ['running', 'men'],
    sizes: [8, 9, 10, 11, 12],
    colors: [
      { name: 'Ocean Blue', hex: '#0077b6' },
      { name: 'Volcanic Red', hex: '#d90429' },
    ],
    image: {
      src: 'https://picsum.photos/seed/shoe1/800/600',
      alt: 'A stylish running shoe in blue and orange.',
      width: 800,
      height: 600,
      hint: 'running shoe',
    },
  },
  {
    id: '2',
    name: 'Heritage Boot',
    slug: 'heritage-boot',
    brand: 'Reebok',
    description: 'Classic leather boot with a timeless design.',
    longDescription:
      'Crafted from premium full-grain leather, the Heritage Boot is built to last. Its rugged construction and comfortable insole make it perfect for both work and weekend adventures. A true classic that never goes out of style.',
    price: 180,
    tags: ['boots', 'men', 'leather'],
    sizes: [9, 10, 11],
    colors: [{ name: 'Dark Brown', hex: '#5c4033' }],
    image: {
      src: 'https://picsum.photos/seed/shoe2/800/600',
      alt: 'A classic leather boot in dark brown.',
      width: 800,
      height: 600,
      hint: 'leather boot',
    },
  },
  {
    id: '3',
    name: 'Pure White Sneaker',
    slug: 'pure-white-sneaker',
    brand: 'Adidas',
    description: 'Minimalist white sneaker for a clean look.',
    longDescription:
      'The Pure White Sneaker is the epitome of minimalist design. Its clean lines and premium materials make it a versatile addition to any wardrobe. Perfect for casual outings or dressing down a formal look.',
    price: 95,
    tags: ['sneakers', 'unisex'],
    sizes: [7, 8, 9, 10, 11],
    colors: [{ name: 'White', hex: '#ffffff' }],
    image: {
      src: 'https://picsum.photos/seed/shoe3/800/600',
      alt: 'A minimalist white sneaker for everyday wear.',
      width: 800,
      height: 600,
      hint: 'white sneaker',
    },
  },
  {
    id: '4',
    name: 'Air Dunk High',
    slug: 'air-dunk-high',
    brand: 'Nike',
    description: 'Iconic high-top for the court and the street.',
    longDescription:
      'A legend in basketball history, the Air Dunk High is back with its classic look. The high-top design provides excellent ankle support, while the air-cushioned sole delivers all-day comfort. Features a bold colorway that makes a statement.',
    price: 150,
    tags: ['basketball', 'men'],
    sizes: [9, 10, 11, 12, 13],
    colors: [{ name: 'Bred', hex: '#000000' }],
    image: {
      src: 'https://picsum.photos/seed/shoe4/800/600',
      alt: 'A high-top basketball shoe in black and red.',
      width: 800,
      height: 600,
      hint: 'basketball shoe',
    },
  },
  {
    id: '5',
    name: 'Summer Breeze Sandal',
    slug: 'summer-breeze-sandal',
    brand: 'Puma',
    description: 'Open-toe comfort for the warmest days.',
    longDescription:
      'Keep your feet cool and comfortable with the Summer Breeze Sandal. Made with soft, quick-drying materials and a cushioned footbed, these sandals are perfect for the beach, pool, or just relaxing in the sun.',
    price: 60,
    tags: ['sandals', 'women'],
    sizes: [6, 7, 8, 9],
    colors: [{ name: 'Teal', hex: '#008080' }],
    image: {
      src: 'https://picsum.photos/seed/shoe5/800/600',
      alt: 'A comfortable pair of sandals for summer.',
      width: 800,
      height: 600,
      hint: 'summer sandals',
    },
  },
  {
    id: '6',
    name: 'Executive Oxford',
    slug: 'executive-oxford',
    brand: 'New Balance',
    description: 'Sleek dress shoe for the modern professional.',
    longDescription:
      'Make a powerful impression with the Executive Oxford. This dress shoe combines traditional craftsmanship with modern comfort technology. The sleek silhouette is crafted from polished black leather, making it the perfect choice for any formal occasion.',
    price: 220,
    tags: ['dress', 'men', 'leather'],
    sizes: [8, 9, 10, 11],
    colors: [{ name: 'Black', hex: '#000000' }],
    image: {
      src: 'https://picsum.photos/seed/shoe6/800/600',
      alt: 'A sleek, modern dress shoe in black leather.',
      width: 800,
      height: 600,
      hint: 'dress shoe',
    },
  },
  {
    id: '7',
    name: 'Trail Blazer',
    slug: 'trail-blazer',
    brand: 'New Balance',
    description: 'Rugged hiking boot for any terrain.',
    longDescription:
      'Conquer any trail with the Trail Blazer hiking boot. Featuring a waterproof membrane, aggressive outsole lugs for superior grip, and a cushioned midsole for comfort, this boot is ready for your next adventure.',
    price: 165,
    tags: ['hiking', 'boots', 'unisex'],
    sizes: [8, 9, 10, 11, 12],
    colors: [{ name: 'Earth', hex: '#a0522d' }],
    image: {
      src: 'https://picsum.photos/seed/shoe7/800/600',
      alt: 'A rugged hiking boot ready for the trail.',
      width: 800,
      height: 600,
      hint: 'hiking boot',
    },
  },
  {
    id: '8',
    name: 'Cali Slip-On',
    slug: 'cali-slip-on',
    brand: 'Puma',
    description: 'Casual canvas slip-on for easy wear.',
    longDescription:
      'Effortless style meets all-day comfort. The Cali Slip-On features a durable canvas upper and a flexible rubber sole. Just slip them on and go, perfect for your relaxed, on-the-move lifestyle.',
    price: 75,
    tags: ['casual', 'sneakers', 'unisex'],
    sizes: [7, 8, 9, 10],
    colors: [{ name: 'Navy', hex: '#000080' }],
    image: {
      src: 'https://picsum.photos/seed/shoe8/800/600',
      alt: 'A casual canvas slip-on shoe.',
      width: 800,
      height: 600,
      hint: 'slip-on shoe',
    },
  },
  {
    id: '9',
    name: 'Volt Trainer',
    slug: 'volt-trainer',
    brand: 'Adidas',
    description: 'High-energy trainers for your workout.',
    longDescription:
      'Energize your gym session with the Volt Trainer. Designed for high-intensity workouts, this shoe provides stability for lifting and flexibility for cardio. The breathable upper keeps you cool, while the vibrant color keeps you motivated.',
    price: 130,
    tags: ['training', 'gym', 'women'],
    sizes: [6, 7, 8, 9, 10],
    colors: [{ name: 'Neon Green', hex: '#39ff14' }],
    image: {
      src: 'https://picsum.photos/seed/shoe9/800/600',
      alt: 'Neon green athletic trainers for the gym.',
      width: 800,
      height: 600,
      hint: 'athletic trainers',
    },
  },
  {
    id: '10',
    name: 'Retro Suede',
    slug: 'retro-suede',
    brand: 'Reebok',
    description: 'Vintage-style suede sneaker.',
    longDescription:
      'Throw it back with the Retro Suede sneaker. This shoe captures the essence of 70s style with its premium suede upper and classic silhouette. A gum rubber outsole completes the vintage look. Contains real suede.',
    price: 85,
    tags: ['sneakers', 'casual', 'unisex'],
    sizes: [8, 9, 10, 11],
    colors: [{ name: 'Mustard Yellow', hex: '#ffdb58' }],
    image: {
      src: 'https://picsum.photos/seed/shoe10/800/600',
      alt: 'A vintage-style suede sneaker in a muted tone.',
      width: 800,
      height: 600,
      hint: 'suede sneaker',
    },
  },
  {
    id: '11',
    name: 'Stiletto Heel',
    slug: 'stiletto-heel',
    brand: 'Puma',
    description: 'Elegant high-heels for a special night.',
    longDescription:
      'Turn heads with the elegant Stiletto Heel. Its sleek design and sky-high heel create a stunning silhouette. Perfect for formal events, weddings, or a glamorous night out on the town.',
    price: 140,
    tags: ['heels', 'formal', 'women'],
    sizes: [6, 7, 8, 9],
    colors: [{ name: 'Classic Red', hex: '#e60026' }],
    image: {
      src: 'https://picsum.photos/seed/shoe11/800/600',
      alt: 'An elegant high-heel shoe for formal events.',
      width: 800,
      height: 600,
      hint: 'high heels',
    },
  },
  {
    id: '12',
    name: 'Aqua Dash',
    slug: 'aqua-dash',
    brand: 'Adidas',
    description: 'Lightweight water shoes for aquatic adventures.',
    longDescription:
      'From kayaking to exploring tide pools, the Aqua Dash is your perfect companion. The mesh upper drains water quickly, and the rubber sole provides grip on wet surfaces. Protect your feet without sacrificing comfort.',
    price: 65,
    tags: ['water-sports', 'unisex'],
    sizes: [7, 8, 9, 10, 11, 12],
    colors: [{ name: 'Aqua', hex: '#00ffff' }],
    image: {
      src: 'https://picsum.photos/seed/shoe12/800/600',
      alt: 'A lightweight water shoe for beach activities.',
      width: 800,
      height: 600,
      hint: 'water shoe',
    },
  },
];

export const orders: Order[] = [
    {
      id: 'SNEAKER-7890',
      date: '2023-10-26',
      status: 'Delivered',
      total: 120,
      items: [{
        id: '1-9-Ocean Blue',
        product: products[0],
        quantity: 1,
        size: 9,
        color: 'Ocean Blue',
      }],
      shippingAddress: {
        name: 'Jane Doe',
        address: '123 Main St',
        city: 'Anytown',
        zip: '12345',
        country: 'USA'
      },
      trackingNumber: '1Z9999W99999999999'
    },
    {
      id: 'SNEAKER-4567',
      date: '2023-11-15',
      status: 'Shipped',
      total: 245,
      items: [
        {
          id: '3-8-White',
          product: products[2],
          quantity: 1,
          size: 8,
          color: 'White'
        },
        {
          id: '4-11-Bred',
          product: products[3],
          quantity: 1,
          size: 11,
          color: 'Bred'
        }
      ],
      shippingAddress: {
        name: 'Jane Doe',
        address: '123 Main St',
        city: 'Anytown',
        zip: '12345',
        country: 'USA'
      },
      trackingNumber: '1Z9999W88888888888'
    },
    {
      id: 'SNEAKER-1234',
      date: '2023-12-01',
      status: 'Processing',
      total: 75,
      items: [{
        id: '8-10-Navy',
        product: products[7],
        quantity: 1,
        size: 10,
        color: 'Navy'
      }],
      shippingAddress: {
        name: 'Jane Doe',
        address: '123 Main St',
        city: 'Anytown',
        zip: '12345',
        country: 'USA'
      }
    }
];
