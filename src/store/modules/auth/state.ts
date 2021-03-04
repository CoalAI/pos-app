import { User } from '@/store/models/user';

export type State = {
    user: User;
    token: string;
    errors: any;
};

export const state: State = {
  user: {},
  token: '',
  errors: null,
};