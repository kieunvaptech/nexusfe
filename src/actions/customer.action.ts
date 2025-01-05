import { Customer } from "models/Customer.model";
import { _DELETE, _GET, _POST, _PUT } from "../connection";

function useCustomerActions() {

    return {
        getCustomers,
        addCustomer,
        updateCustomer,
        detailCustomer,
        deleteCustomer
    }

    function getCustomers(param: any) {
        return _GET("Customer", param)
    }

    function addCustomer(body: Customer) {
        return _POST("Customer", body)
    }

    function updateCustomer(body: Customer) {
        return _PUT(`Customer/${body.customerId}`, body)
    }

    function detailCustomer(id: number) {
        return _GET(`Customer/${id}`)
    }

    function deleteCustomer(id: number) {
        return _DELETE(`Customer/${id}`,)
    }

}

export { useCustomerActions };