import { DatesInterface } from './root';
import { Batch } from './batch';
export interface ProductVariant extends DatesInterface {
  id?: number;
  product?: number | Product;
  color?: string;
  size?: string;
  description?: string;
  price?: string;
  sale_price?: string;
  batch?: number | Batch[];
  total_quantity?: number;
}

export interface Unit extends DatesInterface {
  id?: number;
  name?: string;
}

export interface Category extends DatesInterface {
  id?: number;
  name?: string;
  description?: string;
}

export interface Product extends DatesInterface {
  id?: number;
  unit?: null | Unit;
  name?: string;
  bar_code?: string;
  total_quantity?: string;
  token?: boolean;
  category?: number;
  product_variant?: ProductVariant[];
}