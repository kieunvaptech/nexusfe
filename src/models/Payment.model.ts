import { Order } from "./Order.model";

interface Payment {
    paymentId?: number;
    orderId?: string;
    amount?: number;
    description?: string;
    order?: Order;
}



export { type Payment };