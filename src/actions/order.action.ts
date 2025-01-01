
import { Order } from "models/Order.model";
import { _DELETE, _GET,_POST, _PUT, _UPLOAD } from "../connection";

function useOrderActions() {

    return {
        getOrders,
        addOrder,
        updateOrder,
        detailOrder,
        deleteOrder,
        addProductImage
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

    function addProductImage(id: number, formData: FormData) {
        return _UPLOAD(`products/uploads/${id}`, formData)
    }
    
}

export { useOrderActions };
