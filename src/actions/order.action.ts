// import { _DELETE, _GET,_POST, _PUT } from "../connection"
// import { OrdersRequest } from "./OrdersRequest";
// import { ProductAddRequest } from "./ProductAddRequest";
// import { ReportRequest } from "./ReportRequest";

// function useOrderActions() {

//     return {
//         getOrders,
//         updateOrder,
//         detailOrder,
//         deleteOrder
//     }

//     function getOrders(param: OrdersRequest) {
//         return _GET("orders/get-orders-by-keyword", param)
//     }

//     function updateOrder(body: any) {
//         return _PUT(`orders/${body.id}`, body)
//     }

//     function detailOrder(id: number) {
//         return _GET(`orders/${id}`)
//     }

//     function deleteOrder(id: number) {
//         return _DELETE(`orders/${id}`,)
//     }

    
// }

// export { useOrderActions };
