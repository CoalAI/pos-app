import { Product } from '@/store/models/product';
import StoreInstance from './table';


class OfflineStore {

  private productStore: StoreInstance<Product>;


  constructor(pageSize: number) {
    this.productStore = new StoreInstance('product', 'product/', true, pageSize, 'bar_code');
  }

  async initialize() {
    this.productStore.fetchData();
  }

  async getProductByBarCode(barCode: string) {
    let product = undefined;
    try {
      product = (await this.productStore.getItem(barCode)) as Product;
    } catch (error) {
      console.log(error);
    }
    return product;
  }
  
}

const offlineStoreService = new OfflineStore(30);
export default offlineStoreService;