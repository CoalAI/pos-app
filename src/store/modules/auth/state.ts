import { User } from '@/store/models/user';
import { Company } from '@/store/models/company';

export type State = {
    user: User;
    token: string;
    listOfUsers: User[];
    ListOfVendors: User[];
    types: any[];
    companies: Company[];
};

export const state: State = {
  user: {},
  token: '',
  listOfUsers: [],
  ListOfVendors: [],
  types: [],
  companies: [],
};