import { _DELETE, _GET,_POST, _PUT, _UPLOAD } from "../connection"
import { ProductAddRequest } from "./ProductAddRequest";
import { ReportRequest } from "./ReportRequest";

function useProductActions() {

    return {
        getAllProduct,
        addProduct,
        updateProduct,
        detailProduct,
        deleteProduct,
        addProductImage
    }

    function getAllProduct(param: any) {
        return _GET("products", param)
    }

    function addProduct(body: ProductAddRequest) {
        return _POST("products", body)
    }

    function updateProduct(body: ProductAddRequest) {
        return _PUT(`products/${body.id}`, body)
    }

    function detailProduct(id: number) {
        return _GET(`products/${id}`)
    }

    function deleteProduct(id: number) {
        return _DELETE(`products/${id}`,)
    }

    function addProductImage(id: number, formData: FormData) {
        return _UPLOAD(`products/uploads/${id}`, formData)
    }
    
}

export { useProductActions };
