import { Order } from '@/store/models/order';
import { Product } from '@/store/models/product';
import { Unit } from '@/store/models/product';
import { Batch } from'@/store/models/batch';

export type State = {
    currentOrderStatus: string;
    order: Order;
    productResults: Product[];
    recentProducts: Product[];
    listOfOrders: Order[];
    OrderStatuses: {status: string}[];
    listOfProducts: Product[];
    listOfBatches: Batch[];
    units: Unit[];
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
  units: [],
};