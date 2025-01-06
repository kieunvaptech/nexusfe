
import { Connection } from "models/Connection.model";
import { _DELETE, _GET,_POST, _PUT } from "../network";

function useConnectionActions() {

    return {
        getConnections,
        getConnectionName,
        addConnection,
        updateConnection,
        detailConnection,
        deleteConnection
    }

    function getConnections(param: any) {
        return _GET("Connection", param)
    }

    function getConnectionName(param: any) {
        return _GET("Connection/ConnectionName", param)
    }

    function addConnection(body: Connection) {
        return _POST("Connection", body)
    }

    function updateConnection(body: Connection) {
        return _PUT(`Connection/${body.connectionId}`, body)
    }

    function detailConnection(id: number) {
        return _GET(`Connection/${id}`)
    }

    function deleteConnection(id: number) {
        return _DELETE(`Connection/${id}`,)
    }
}

export { useConnectionActions };
