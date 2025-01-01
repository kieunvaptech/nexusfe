import axios from "axios";

export const TIMEOUT_SECOND = 180000
export const BASE_URL = "https://localhost:7222/api/"
export const BASE_IMAGE = BASE_URL+'products/images/'

const instance = axios.create({
    timeout: TIMEOUT_SECOND,
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export async function _GET(url: string,params?: any) {
    const token = localStorage.getItem('token')
    return instance.get(url, {
        params: params,
        headers: token ? {
            'Authorization': `Bearer ${token}`
        } : {}
    }).then(response => response.data);
}

export async function _POST(url: string, body?: object) {
    const token = localStorage.getItem('token')
    return instance.post(url, body, {
        headers: token ? {
            'Authorization': `Bearer ${token}`
        } : {}
    }).then(response => response.data);
}

export async function _PUT(url: string, body?: object) {
    const token = localStorage.getItem('token')
    return instance.put(url, body, {
        headers: token ? {
            'Authorization': `Bearer ${token}`
        } : {}
    }).then(response => response.data);
}

export async function _DELETE(url: string) {
    const token = localStorage.getItem('token')
    return instance.delete(url, {
        headers: token ? {
            'Authorization': `Bearer ${token}`
        } : {}
    }).then(response => response.data);
}


export async function _UPLOAD(url: string, formData: FormData) {
    const token = localStorage.getItem('token')
    return instance.post(url, formData, {
        headers: token ? {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        } : {}
    }).then(response => response.data);
}


