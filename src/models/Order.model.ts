import { Customer } from "./Customer.model";
import { Employee } from "./Employee.model";

interface Order {
    orderId?: number;
    customerId?: number;
    employeeId?: number;
    totalPrice?: number;
    status?: number;
    customer?: Customer;
    employee?: Employee
}



export { type Order };