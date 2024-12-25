import { _DELETE, _GET, _POST, _PUT } from "../connection"
import { ReportRequest } from "./ReportRequest";

function useCategoryActions() {

    return {
        getCategories,
        addCategory,
        updateCategory,
        detailCategory,
        deleteCategory
    }

    function getCategories() {
        return _GET("categories")
    }

    function addCategory(body: any) {
        return _POST("categories", body)
    }

    function updateCategory(body: any) {
        return _PUT(`categories/${body.id}`, { name: body.name })
    }

    function detailCategory(id: number) {
        return _GET(`categories/${id}`)
    }

    function deleteCategory(id: number) {
        return _DELETE(`categories/${id}`,)
    }


}

export { useCategoryActions };
