import { Supplier } from "./Supplier.model";

interface Device {
    deviceId?: number;
    deviceName?: string;
    supplierId?: number;
    storeId?: number;
    quantity?: number;
    supplier?: Supplier;
}



export { type Device };