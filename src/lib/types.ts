export type Product = {
  id: string;
  name: string;
  slug: string;
  brand: string;
  description: string;
  longDescription: string;
  price: number;
  tags: string[];
  sizes: number[];
  colors: { name: string; hex: string }[];
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
    hint: string;
  };
};

export type Brand = {
  id: string;
  name: string;
};

export type CartItem = {
  id: string; // Unique ID for cart item (product.id + size + color)
  product: Product;
  quantity: number;
  size: number;
  color: string;
};

export type Order = {
  id: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  total: number;
  items: CartItem[];
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    zip: string;
    country: string;
  };
  trackingNumber?: string;
};
