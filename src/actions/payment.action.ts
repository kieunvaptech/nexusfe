import { Payment } from "models/Payment.model";
import { _DELETE, _GET,_POST, _PUT, _UPLOAD } from "../connection";

function usePaymentActions() {

    return {
        getPayments,
        addPayment,
        updatePayment,
        detailPayment,
        deletePayment
    }

    function getPayments(param: any) {
        return _GET("Payment", param)
    }

    function addPayment(body: Payment) {
        return _POST("Payment", body)
    }

    function updatePayment(body: Payment) {
        return _PUT(`Payment/${body.paymentId}`, body)
    }

    function detailPayment(id: number) {
        return _GET(`Payment/${id}`)
    }

    function deletePayment(id: number) {
        return _DELETE(`Payment/${id}`,)
    }
}

export { usePaymentActions };
