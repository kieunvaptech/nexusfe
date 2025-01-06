
import { Order } from "models/Order.model";
import { _DELETE, _GET,_POST, _PUT } from "../network";

function useOrderActions() {

    return {
        getOrders,
        addOrder,
        updateOrder,
        detailOrder,
        deleteOrder
    }

    function getOrders(param: any) {
        return _GET("Order", param)
    }

    function addOrder(body: Order) {
        return _POST("Order", body)
    }

    function updateOrder(body: Order) {
        return _PUT(`Order/${body.orderId}`, body)
    }

    function detailOrder(id: number) {
        return _GET(`Order/${id}`)
    }

    function deleteOrder(id: number) {
        return _DELETE(`Order/${id}`,)
    }
}

export { useOrderActions };
