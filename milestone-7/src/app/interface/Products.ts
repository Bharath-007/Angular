export interface Products {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface Response {
  limit: number;
  products: Products[];
  total: number;
  skip: number;
}

export interface limitedProducts {
  title: string;
  brand: string;
}
