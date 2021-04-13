import { DatesInterface } from './root';
export interface User extends DatesInterface {
  id?: number;
  firstname?: string;
  lastname?: string;
  companyID?: number;
  userType?: string;
  contactNumber?: number;
}

export interface Credentials {
  username?: string;
  password?: string;
}