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
  error: any;
  productsCount: number;
  totalCounts: {
    orders: number;
    products: number;
    batches: number;
    inventory: number;
    requests: number;
  };
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
  error: {},
  productsCount: 0,
  totalCounts: {
    orders: 0,
    products: 0,
    batches: 0,
    inventory: 0,
    requests: 0,
  }
};