import { User } from '@/store/models/user';
import { Company } from '@/store/models/company';
import { Transaction } from '@/store/models/transaction';

export type State = {
    user: User;
    token: string;
    listOfUsers: User[];
    ListOfVendors: User[];
    // eslint-disable-next-line
    types: any[];
    companies: Company[];
    transactions: Transaction[];
    expense: Transaction;
    notifications: Notification[];
    error: any;
    totalCounts: {
      users: number;
      vendors: number;
      companies: number;
      transactions: number;
    };
};

export const state: State = {
  user: {},
  token: '',
  listOfUsers: [],
  ListOfVendors: [],
  types: [],
  companies: [],
  transactions: [],
  expense: {},
  notifications: [],
  error: {},
  totalCounts: {
    users: 0,
    vendors: 0,
    companies: 0,
    transactions: 0,
  }
};