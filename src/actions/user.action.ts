import { _GET, _POST } from "../connection"
import { LoginRequest } from "./LoginRequest";

function useUserActions() {

    return {
        login,
        userDetail
    }

    function login(body: LoginRequest) {
        return _POST("Account/Login", body)
    }

    function userDetail() {
        return _POST("users/details", {})
    }
}

export { useUserActions };
