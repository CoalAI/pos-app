import { DatesInterface } from './root';

export interface Notification extends DatesInterface {
  id?: number;
  receiver?: number;
  message?: string;
  read?: boolean;
  remove?: boolean;
}