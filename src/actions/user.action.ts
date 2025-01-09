import { _GET, _POST } from "../network"
import { ChangePasswordRequest, LoginRequest } from "./LoginRequest";

function useUserActions() {

    return {
        login,
        changePassword,
        userDetail
    }

    function login(body: LoginRequest) {
        return _POST("Account/Login", body)
    }

    function changePassword(body: ChangePasswordRequest) {
        return _POST("Account/ChangePassword", body)
    }

    function userDetail() {
        return _POST("users/details", {})
    }
}

export { useUserActions };
