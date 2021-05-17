import { DatesInterface } from './root';
import { Product, ProductVariant } from './product';
import { Batch } from './batch';

export interface OrderItem extends DatesInterface {
  id?: number;
  batch?: number | Batch;
  batch_id?: number;
  order?: number;
  price?: string;
  discount?: string;
  quantity?: string;
  totalPrice?: number;
  product?: Product;
  productVariant?: ProductVariant;
}