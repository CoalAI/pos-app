import localForage from 'localforage';
import serverRequest, { isAxiosError, isAxiosResponse } from '@/utils/request';

// class StoreInstance<Type>
export default class StoreInstance<Type> {

    private instance;
    private apiUrl: string;
    private authenticated: boolean;
    private pageSize: number;
    private indexKey: keyof Type;
  
  constructor(instanceName: string, apiUrl: string, authenticated: boolean, pageSize: number, indexKey: keyof Type){
    this.config();
    this.instance = localForage.createInstance({name: instanceName});
    this.apiUrl = apiUrl;
    this.authenticated = authenticated;
    this.pageSize = pageSize;
    this.indexKey = indexKey;
  }

  private config () {
    localForage.config({
      driver: [
        localForage.INDEXEDDB,
        localForage.LOCALSTORAGE,
        localForage.WEBSQL,
      ],
      name: 'pos',
      version: 1.0,
    });
  }

  async fetchData() {
    let data = await this.fetchRecordsPerPage();
    if (data.count > this.pageSize) {
      this.insertRecords(data.results);
      this.instance
      let num = 2;
      while (num <= Math.ceil(data.count/this.pageSize)) {
        data = await this.fetchRecordsPerPage();
        if (data.count > 0) {
          this.insertRecords(data.results);
        }
        num += 1;
      }
    }
  }

  private async fetchRecordsPerPage() {
    const response = await serverRequest('get', this.apiUrl, this.authenticated, undefined, undefined);
    if (isAxiosResponse(response)) {
      return response.data;
    }
    if(isAxiosError(response)) {
      // TODO: Log error
    }
    return {
      count: 0,
      results: []
    }
  }

  private async insertRecords(data: Type[]) {
    for(const item of data) {
      const key: string = String(item[this.indexKey]);
      await this.instance.setItem(key, item);
    }
  }

  async getItem(key: string) {
    return await this.instance.getItem(key);
  }

  async setItem(key: string, value: unknown) {
    return await this.instance.setItem(key, value);
  }

  async removeItem(key: string) {
    return await this.instance.removeItem(key);
  }

  async clear() {
    return await this.instance.clear();
  }

  async length() {
    return await this.instance.length();
  }

  async key(index: number) {
    return await this.instance.key(index);
  }

  async keys() {
    return await this.instance.keys();
  }
}