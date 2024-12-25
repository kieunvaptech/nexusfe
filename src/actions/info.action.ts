import { _GET,_POST } from "../connection"
// import { InfoRequest } from "./ProductAddRequest";

function useInfoActions() {

    return {
        _dsKyBC,
        // _dsDonVi,
        _dsBoNganh
    }

    function _dsKyBC() {
        return _GET("qlnv-category/dmuc-chung/danh-sach/KY_BAO_CAO")
    }

    // function _dsDonVi(body: InfoRequest) {
    //     return _POST("qlnv-category/dmuc-donvi/search-kho", body)
    // }

    function _dsBoNganh() {
        return _GET("qlnv-category/dmuc-donvi/tat-ca/0")
    }
}

export { useInfoActions };