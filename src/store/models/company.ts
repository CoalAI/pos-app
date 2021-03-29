import { DatesInterface } from './root';

export interface Company extends DatesInterface {
  id?: number;
  parentID?: number;
  companyType?: string;
  companyName?: number;
}