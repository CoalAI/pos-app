import { ProductResults } from '@/store/models/product';
import { Order } from '@/store/models/order';

export type State = {
    currentOrderStatus: string;
    order: Order;
    productResults: ProductResults[];
    recentProducts: ProductResults[];
    // eslint-disable-next-line
    error: any;
};

export const state: State = {
  currentOrderStatus: '',
  order: {},
  productResults: [],
  recentProducts: [],
  error: null
};