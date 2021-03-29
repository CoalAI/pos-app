import { DatesInterface } from './root';
import { Batch } from './batch';
export interface ProductVarient extends DatesInterface {
  id?: number;
  product?: number | Product;
  color?: string;
  size?: string;
  description?: string;
  price?: string;
  batch?: number | Batch[];
  total_quantity?: number;
}

export interface Unit extends DatesInterface {
  id?: number;
  name?: string;
}

export interface Product extends DatesInterface {
  id?: number;
  unit?: number | Unit;
  name?: string;
  bar_code?: string;
  total_quantity?: string;
}

export interface ProductResults extends Product {
  product_varient?: ProductVarient[];
}