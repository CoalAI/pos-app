import { Product } from '@/store/models/product';
import { User } from '@/store/models/user';
import { Order } from '@/store/models/order';
import StoreInstance from './table';

class OfflineStore {

  private productStore: StoreInstance;
  private loggedInUserStore: StoreInstance;
  private invoiceIdStore: StoreInstance;
  private customerStore: StoreInstance;
  private orderStore: StoreInstance;


  // constants
  private CURENT_INVOICE = 'current-invoice';
  private START_INVOICE = 'start-invoice';
  private USER_DATA = 'user-data';
  private REGULAR_CUSTOMER = 'REGULAR_CUSTOMER';
  private WALK_IN_CUSTOMER = 'WALK_IN_CUSTOMER';


  constructor(pageSize: number) {
    this.productStore = new StoreInstance('product', 'product/', true, pageSize, 'bar_code');
    this.loggedInUserStore = new StoreInstance('user', 'user-data/', true, pageSize, 'user-data');
    this.invoiceIdStore = new StoreInstance('invoice-id', 'invoice-id/', true, pageSize, 'start-invoice-id');
    this.customerStore = new StoreInstance('customers', 'user/', true, pageSize, 'username');
    this.orderStore = new StoreInstance('order', 'order/', true, pageSize, 'id');

  }

  async initialize() {
    await this.productStore.fetchData();
    const userData =  await this.loggedInUserStore.fetchRecordsPerPage();
    await this.loggedInUserStore.setItem(this.USER_DATA, userData.results[0]);
    const invoiceData =  await this.invoiceIdStore.fetchRecordsPerPage();
    await this.invoiceIdStore.setItem(this.START_INVOICE, invoiceData.results[0].InvoiceID);
    await this.invoiceIdStore.setItem(this.CURENT_INVOICE, invoiceData.results[0].InvoiceID);
    await this.customerStore.fetchData();
    await this.orderStore.fetchData();
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

  async getProductByName(name: string) {
    let product = undefined;
    let result: Product | undefined = undefined;
    const length= this.productStore.length();
    let nam = "";
      for (let i = 0; i < await length; i++) {
            product = (await this.productStore.key(i));
            product = (await this.productStore.getItem(product)) as Product;
            nam = product.name as string;
                if(nam.includes(name)){
                  result=product;
                }
      }
    return result;
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

  async getWalkInCustomers() {
    const customers: User[] = [];
    try {
      const customerKeys = await this.customerStore.keys();
      for (const key of customerKeys) {
        const data = (await this.customerStore.getItem(key)) as User;
        if (data.user_type === this.WALK_IN_CUSTOMER) {
          customers.push(data);
        }
      }
    } catch (error) {
      console.log(error);
    }
    return customers;
  }

  async getRegularCustomerByUsername(username: string) {
    let user = undefined;
    try {
      user = (await this.customerStore.getItem(username)) as User;
    } catch (error) {
      console.log(error);
    }
    return user;
  }

  async getAllRegularCustomers() {
    const customers: User[] = [];
    try {
      const customerKeys = await this.customerStore.keys();
      for (const key of customerKeys) {
        const data = (await this.customerStore.getItem(key)) as User;
        if (data.user_type === this.REGULAR_CUSTOMER) {
          customers.push(data);
        }
      }
    } catch (error) {
      console.log(error);
    }
    return customers;
  }

  async setOrder(order: Order) {
    let product = undefined;
    let max = 0;
    const length= this.orderStore.length();
      for (let i = 0; i < await length; i++) {
            product = (await this.orderStore.key(i));
            if(product>max){
              max=product
            }
      }
    const id = max.toString();
    this.orderStore.setItem(id, order);
  }

  async clear() {
    await this.productStore.clear();
    await this.loggedInUserStore.clear();
    await this.invoiceIdStore.clear();
    await this.customerStore.clear();
  }
  
}

const pageSize = process.env.VUE_APP_PAGE_SIZE as number || 30;
const offlineStoreService = new OfflineStore(pageSize);
export default offlineStoreService;