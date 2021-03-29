import { DatesInterface } from './root';
import { ProductVarient } from './product';

export interface Batch extends DatesInterface {
  id?: number;
  manufacturing_date?: Date;
  expiry_date?: Date;
  product_varient?: number | ProductVarient;
  quantity?: string;
  in_stock?: boolean;
}

export const isBatch = (batch: Batch | number): batch is Batch => {
  return (batch as Batch).id !== undefined;
}