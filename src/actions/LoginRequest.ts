export interface LoginRequest {
    username?: string;
    password?: string;
}

export interface ChangePasswordRequest {
    username?: string;
    passwordOld?: string;
    passwordNew?: string;
}

