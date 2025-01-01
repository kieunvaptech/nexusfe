import { Package } from "models/Package.model";
import { _DELETE, _GET,_POST, _PUT } from "../connection"

function usePackageActions() {

    return {
        getPackages,
        addPackage,
        updatePackage,
        detailPackage,
        deletePackage
    }

    function getPackages(param: any) {
        return _GET("Package",param)
    }

    function addPackage(body: Package) {
        return _POST("Package", body)
    }

    function updatePackage(body: Package) {
        return _PUT(`Package/${body.packageId}`, body)
    }

    function detailPackage(id: number) {
        return _GET(`Package/${id}`)
    }

    function deletePackage(id: number) {
        return _DELETE(`Package/${id}`,)
    }

    
}

export { usePackageActions };
