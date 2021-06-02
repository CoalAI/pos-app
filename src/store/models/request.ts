import { DatesInterface } from './root';
import { User } from './user';

export interface Request extends DatesInterface {
    id?: number;
    requester?: number | User;
    requestee?: number | User;
    request_type?: string;
    status?: string;
    expected_delivery_date?: string;
    description?: string;
}