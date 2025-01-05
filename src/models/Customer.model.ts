import { Store } from "./Store.model";
import { Supplier } from "./Supplier.model";

interface Customer {
    customerId?: number;
    fullName?: string;
    email?: string;
    phoneNumber?: string;
    address?: string;
}



export { type Customer };