import { DatesInterface } from './root';
import { Company } from './company';
export interface User extends DatesInterface {
  id?: number;
  username?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  is_staff?: boolean;
  is_active?: boolean;
  is_superuser?: boolean;
  groups?: any;
  user_permissions?: any;
  company?: number | Company;
  user_type?: string;
  contact_number?: string;
  credit?: number;
  user_extra?: UserExtra
}

export interface UserExtra extends DatesInterface {
  id?: number;
  description?: string;
}

export interface Credentials {
  username?: string;
  password?: string;
}