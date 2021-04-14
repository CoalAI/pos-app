import { Order } from '@/store/models/order';
import { Product } from '@/store/models/product';
import { Unit } from '@/store/models/product';

export type State = {
    currentOrderStatus: string;
    order: Order;
    productResults: Product[];
    recentProducts: Product[];
    listOfProducts: Product[];
    units: Unit[];
};

export const state: State = {
  currentOrderStatus: '',
  order: {},
  productResults: [],
  recentProducts: [],
  listOfProducts: [],
  units: [],
};