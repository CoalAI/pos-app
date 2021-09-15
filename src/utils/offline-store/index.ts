import { Product } from '@/store/models/product';
import { User } from '@/store/models/user';
import StoreInstance from './table';

class OfflineStore {

  private productStore: StoreInstance;
  private loggedInUserStore: StoreInstance;
  private invoiceIdStore: StoreInstance;
  private walkInCustomerStore: StoreInstance;


  // constants
  private CURENT_INVOICE = 'current-invoice';
  private START_INVOICE = 'start-invoice';
  private USER_DATA = 'user-data';


  constructor(pageSize: number) {
    this.productStore = new StoreInstance('product', 'product/', true, pageSize, 'bar_code');
    this.loggedInUserStore = new StoreInstance('user', 'user-data/', true, pageSize, 'user-data');
    this.invoiceIdStore = new StoreInstance('invoice-id', 'invoice-id/', true, pageSize, 'start-invoice-id');
    this.walkInCustomerStore = new StoreInstance('walk-in-customer', 'invoice-id/', true, pageSize, 'start-invoice-id');

  }

  async initialize() {
    await this.productStore.fetchData();
    const userData =  await this.loggedInUserStore.fetchRecordsPerPage();
    await this.loggedInUserStore.setItem(this.USER_DATA, userData.results[0]);
    const invoiceData =  await this.invoiceIdStore.fetchRecordsPerPage();
    await this.invoiceIdStore.setItem(this.START_INVOICE, invoiceData.results[0].InvoiceID);
    await this.invoiceIdStore.setItem(this.CURENT_INVOICE, invoiceData.results[0].InvoiceID);
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

  async getUserData() {
    let user = undefined;
    try {
      user = (await this.loggedInUserStore.getItem(this.USER_DATA)) as User;
    } catch (error) {
      console.log(error);
    }
    return user;
  }

  async getInvoiceId() {
    let invoiceId = undefined;
    try {
      invoiceId = (await this.invoiceIdStore.getItem(this.CURENT_INVOICE)) as string;
      const tokens = invoiceId.split('_');
      const count = Number(tokens[tokens.length - 1]) + 1;
      const newInvoiceId = `${tokens[0]}_${tokens[1]}_${count}`;
      await this.invoiceIdStore.setItem(this.CURENT_INVOICE, newInvoiceId);
    } catch (error) {
      console.log(error);
    }
    return invoiceId;
  }
  
}

const pageSize = process.env.VUE_APP_PAGE_SIZE as number || 30;
const offlineStoreService = new OfflineStore(pageSize);
export default offlineStoreService;