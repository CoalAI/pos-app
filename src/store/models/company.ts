import { Batch } from './batch';
import { DatesInterface } from './root';

export interface Company extends DatesInterface {
  id?: number;
  parent?: number | null;
  company_type?: string;
  company_name?: string;
  credit?: string;
  address?: string;
  contact_number?: string;
}

export interface Inventory extends DatesInterface {
  id?: number;
  company?: Company;
  batch?: Batch;
  quantity?: string;
  is_active?: boolean;
}