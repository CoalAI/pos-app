import { Product } from '@/store/models/product';
import { User } from '@/store/models/user';
import { Order } from '@/store/models/order';
import StoreInstance from './table';
import localForage from 'localforage';
import serverRequest from '@/utils/request'
import { OrderItem } from '@/store/models/orderItem';
class OfflineStore {

  private productStore: StoreInstance;
  private loggedInUserStore: StoreInstance;
  private invoiceIdStore: StoreInstance;
  private customerStore: StoreInstance;
  private orderStore: LocalForage;
  private syncOrder: LocalForage;
  private latestOrder: Order;

  // constants
  private CURENT_INVOICE = 'current-invoice';
  private START_INVOICE = 'start-invoice';
  private USER_DATA = 'user-data';
  private REGULAR_CUSTOMER = 'REGULAR_CUSTOMER';
  private WALK_IN_CUSTOMER = 'WALK_IN_CUSTOMER';


  constructor(pageSize: number) {
    this.productStore = new StoreInstance('product', 'product/', true, pageSize, 'bar_code');
    this.loggedInUserStore = new StoreInstance('user', 'user-data/', true, pageSize, 'username');
    this.invoiceIdStore = new StoreInstance('invoice-id', 'invoice-id/', true, pageSize, 'start-invoice-id');
    this.customerStore = new StoreInstance('customers', 'user/', true, pageSize, 'username');
    this.orderStore = localForage.createInstance({name: "order"});
    this.syncOrder = localForage.createInstance({name: "syncOrder"});
    this.latestOrder = {};
  }

  async initialize() {
    await this.productStore.fetchData();
    const userData =  await this.loggedInUserStore.fetchRecordsPerPage();
    await this.loggedInUserStore.setItem(this.USER_DATA, userData.results[0]);
    const invoiceData =  await this.invoiceIdStore.fetchRecordsPerPage();
    await this.invoiceIdStore.setItem(this.START_INVOICE, invoiceData.results[0].InvoiceID);
    await this.invoiceIdStore.setItem(this.CURENT_INVOICE, invoiceData.results[0].InvoiceID);
    await this.customerStore.fetchData();
  }

  async intializeSync(){
    this.syncOrder.setItem("bool", false);
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
    this.latestOrder = order;
    let product = undefined;
    let max = 0;
    const length= this.orderStore.length();
      {for (let i = 0; i < await length; i++) {
            product = parseInt(await this.orderStore.key(i));
            if(product>max){
              max=product;
            }
      }
      max=max+1;
    }
    const id = max.toString();
    if(order.order_item){
      for (const pro of order.order_item) {
        if(pro.batch){
          this.orderStore.setItem(id+"to", order);
        }
        else{
          this.orderStore.setItem(id+"from", order);
        }
      }
    }
  }

  getLatestOrder(){
    return this.latestOrder;
  }


  setsyncOrder(sync: boolean){
    this.syncOrder.setItem("bool", sync);
  }

  async getsyncOrder(){
    return this.syncOrder.getItem("bool") 
  }

  async Order(){
    const length= this.orderStore.length();
      for (let i = 0; i < await length; i++) {
        const product = await this.orderStore.key(i);
        if(product.includes("from")){
          const order = await this.orderStore.getItem(product) as Order;
          await serverRequest('post', 'orderoffline/', true, order);
        }
        else if(product.includes("to")){
          const order = await this.orderStore.getItem(product) as Order;
          await serverRequest('post', 'order/', true, order);
        }
      }
    await this.orderStore.clear();
  }

  async clear() {
    await this.productStore.clear();
    await this.loggedInUserStore.clear();
    await this.invoiceIdStore.clear();
    await this.customerStore.clear();
    await this.orderStore.clear();
  }
  
}

const pageSize = process.env.VUE_APP_PAGE_SIZE as number || 30;
const offlineStoreService = new OfflineStore(pageSize);
export default offlineStoreService;