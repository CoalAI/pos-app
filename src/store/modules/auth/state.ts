import { User } from '@/store/models/user';

export type State = {
    user: User;
    token: string;
};

export const state: State = {
  user: {},
  token: '',
};