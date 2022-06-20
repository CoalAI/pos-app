import { Order } from '@/store/models/order';
import { Category, Product } from '@/store/models/product';
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
  singleProduct: Product;
  listOfBatches: Batch[];
  inventory: Inventory[];
  listofRequests: Request[];
  units: Unit[];
  categories: Category[];
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
  analytics: any;
  salesanalytics: any;
  totalpayablereceivable: any;
  totalinventoryamount: number;
};


export const state: State = {
  currentOrderStatus: '',
  order: {},
  productResults: [],
  recentProducts: [],
  listOfOrders: [],
  OrderStatuses: [],
  listOfProducts: [],
  singleProduct: {},
  listOfBatches: [],
  inventory: [],
  listofRequests: [],
  units: [],
  categories: [],
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
  },
  analytics: {},
  salesanalytics: {},
  totalpayablereceivable: {},
  totalinventoryamount: 0,
};