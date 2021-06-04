import { Order } from '@/store/models/order';
import { Product } from '@/store/models/product';
import { Unit } from '@/store/models/product';
import { Batch } from'@/store/models/batch';
import { Inventory } from '@/store/models/company';
import { Request } from '@/store/models/request';

export type State = {
    currentOrderStatus: string;
    order: Order;
    productResults: Product[];
    recentProducts: Product[];
    listOfOrders: Order[];
    OrderStatuses: {status: string}[];
    listOfProducts: Product[];
    listOfBatches: Batch[];
    inventory: Inventory[];
    listofRequests: Request[];
    units: Unit[];
    batch: Batch;
    invoice_id: string;
    request: Request;
};

export const state: State = {
  currentOrderStatus: '',
  order: {},
  productResults: [],
  recentProducts: [],
  listOfOrders: [],
  OrderStatuses: [],
  listOfProducts: [],
  listOfBatches: [],
  inventory: [],
  listofRequests: [],
  units: [],
  batch: {},
  invoice_id: '',
  request: {},
};