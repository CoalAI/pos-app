import { User } from '@/store/models/user';
import { Company } from '@/store/models/company';

export type State = {
    user: User;
    token: string;
    listOfUsers: User[];
    roles: any[];
    companies: Company[];
    errors: any;
};

export const state: State = {
  user: {},
  token: '',
  listOfUsers: [],
  roles: [],
  companies: [],
  errors: null,
};