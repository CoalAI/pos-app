import { DatesInterface } from './root';
import { Product, ProductVarient } from './product';
import { Batch } from './batch';

export interface OrderItem extends DatesInterface {
  id?: number;
  batch?: number | Batch;
  order?: number;
  price?: string;
  discount?: string;
  quantity?: string;
  totalPrice?: number;
  product?: Product;
  productVarient?: ProductVarient;
}