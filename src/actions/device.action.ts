import { Device } from "models/Device.model"
import { _DELETE, _GET, _POST, _PUT } from "../connection"

function useDeviceActions() {

    return {
        getDevices,
        addDevice,
        updateDevice,
        detailDevice,
        deleteDevice
    }

    function getDevices(param: any) {
        return _GET("Device", param)
    }

    function addDevice(body: Device) {
        return _POST("Device", body)
    }

    function updateDevice(body: Device) {
        return _PUT(`Device/${body.deviceId}`, body)
    }

    function detailDevice(id: number) {
        return _GET(`Device/${id}`)
    }

    function deleteDevice(id: number) {
        return _DELETE(`Device/${id}`,)
    }


}

export { useDeviceActions };
