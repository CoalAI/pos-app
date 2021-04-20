import { DatesInterface } from './root';

export interface Company extends DatesInterface {
  id?: number;
  parent?: number | null;
  company_type?: string;
  company_name?: string;
}