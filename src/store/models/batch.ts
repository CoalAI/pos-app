import { DatesInterface } from './root';
import { ProductVariant } from './product';

export interface Batch extends DatesInterface {
  id?: number;
  manufacturing_date?: string;
  expiry_date?: string;
  product_variant?: number | ProductVariant;
  quantity?: string;
  in_stock?: boolean;
}

export const isBatch = (batch: Batch | number): batch is Batch => {
  return (batch as Batch).id !== undefined;
}