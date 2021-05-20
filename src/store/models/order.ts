import { DatesInterface } from './root';
import { OrderItem } from './orderItem';

export interface Order extends DatesInterface {
  id?: number;
  seller?: number;
  buyer?: number;
  total?: string;
  cash_payment?: boolean;
  amount_received?: string;
  total_discount?: string;
  order_item?: OrderItem[];
  amount_discount?: boolean;
  transaction_id?:string;
  payment_service?:string;
  invoice_id?:string;
}