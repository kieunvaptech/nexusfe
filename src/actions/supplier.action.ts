import { Supplier } from "models/Supplier.model";
import { _DELETE, _GET,_POST, _PUT, _UPLOAD } from "../connection";

function useSupplierActions() {

    return {
        getSuppliers,
        addSupplier,
        updateSupplier,
        detailSupplier,
        deleteSupplier
    }

    function getSuppliers(param?: any) {
        return _GET("Supplier", param)
    }

    function addSupplier(body: Supplier) {
        return _POST("Supplier", body)
    }

    function updateSupplier(body: Supplier) {
        return _PUT(`Supplier/${body.supplierId}`, body)
    }

    function detailSupplier(id: number) {
        return _GET(`Supplier/${id}`)
    }

    function deleteSupplier(id: number) {
        return _DELETE(`Supplier/${id}`,)
    }
}

export { useSupplierActions };
