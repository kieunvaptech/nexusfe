import { Store } from "models/Store.model";
import { _DELETE, _GET, _POST, _PUT } from "../connection"
import { ReportRequest } from "./ReportRequest";

function useStoreActions() {

    return {
        getStores,
        addStore,
        updateStore,
        detailStore,
        deleteStore
    }

    function getStores() {
        return _GET("Store")
    }

    function addStore(body: Store) {
        return _POST("Store", body)
    }

    function updateStore(body: Store) {
        return _PUT(`Store/${body.storeId}`, body)
    }

    function detailStore(id: number) {
        return _GET(`Store/${id}`)
    }

    function deleteStore(id: number) {
        return _DELETE(`Store/${id}`,)
    }


}

export { useStoreActions };
