import { Order } from './order';
import { DatesInterface } from './root';
import { User } from './user';


export interface Transaction extends DatesInterface{
    id?: number;
    order?: null | number | Order;
    payor?: number | User; 
    payee?: number;
    amount?: string | null;
    payment_service?: string | null;
    transaction_id?: string | null;
    description?: string | null;
}