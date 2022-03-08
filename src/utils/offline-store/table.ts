import localForage from 'localforage';
import serverRequest, { isAxiosError, isAxiosResponse } from '@/utils/request';

// class StoreInstance<Type>
export default class StoreInstance {

    // eslint-disable-next-line
    private instance: any;
    private apiUrl: string;
    private authenticated: boolean;
    private pageSize: number;
    private indexKey: string;
  
  constructor(instanceName: string, apiUrl: string, authenticated: boolean, pageSize: number, indexKey: string){
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
    if (data.count > 0) {
      this.insertRecords(data.results);
      this.instance
      let num = 2;
      while (num <= Math.ceil(data.count/this.pageSize)) {
        this.apiUrl = this.apiUrl + '?page'
        data = await this.fetchRecordsPerPage({page: num});
        if (data.count > 0) {
          this.insertRecords(data.results);
        }
        num += 1;
      }
    }
  }

  async fetchRecordsPerPage(params: any = {}) {
    const response = await serverRequest('get', this.apiUrl, this.authenticated, undefined, params);
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

  private async insertRecords(data: any[]) {
    for(const item of data) {
      const key: string = item[this.indexKey] as string;
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