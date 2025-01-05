import { Store } from "./Store.model";
import { Supplier } from "./Supplier.model";

interface Device {
    deviceId?: number;
    deviceName?: string;
    supplierId?: number;
    storeId?: number;
    quantity?: number;
    supplier?: Supplier;
    store?: Store
}



export { type Device };