import { User } from '@/store/models/user';
import { Company } from '@/store/models/company';

export type State = {
    user: User;
    token: string;
    listOfUsers: User[];
    ListOfVendors: User[];
    roles: any[];
    companies: Company[];
};

export const state: State = {
  user: {},
  token: '',
  listOfUsers: [],
  ListOfVendors: [],
  roles: [],
  companies: [],
};