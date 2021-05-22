import { DatesInterface } from './root';
import { OrderItem } from './orderItem';

export interface Order extends DatesInterface {
  id?: number;
  seller?: number;
  buyer?: number;
  total?: string;
  payment_method?: boolean;
  amount_received?: string;
  total_discount?: string;
  order_item?: OrderItem[];
  amount_discount?: boolean;
  invoice_id?: string;
  internal_order?: boolean;
}