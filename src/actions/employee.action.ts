import { _DELETE, _GET, _POST, _PUT } from "../connection";
import { Employee } from "models/Employee.model";

function useEmployeeActions() {

    return {
        getEmployees,
        addEmployee,
        updateEmployee,
        detailEmployee,
        deleteEmployee
    }

    function getEmployees(param: any) {
        return _GET("Employee", param)
    }

    function addEmployee(body: Employee) {
        return _POST("Employee", body)
    }

    function updateEmployee(body: Employee) {
        return _PUT(`Employee/${body.storeId}`, body)
    }

    function detailEmployee(id: number) {
        return _GET(`Employee/${id}`)
    }

    function deleteEmployee(id: number) {
        return _DELETE(`Employee/${id}`,)
    }

}

export { useEmployeeActions };