import axios from "axios";
import { setUserInfo } from "Slice/userSlice";
import { store } from 'store'

export const TIMEOUT_SECOND = 180000
export const BASE_URL = "https://localhost:7222/api/"

const instance = axios.create({
    timeout: TIMEOUT_SECOND,
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

const handleCatch = (error: any) => {
    if(error?.response?.status == 401){
        localStorage.removeItem('token')
        store.dispatch(setUserInfo(null))
    }
}

export async function _GET(url: string,params?: any) {
    const token = localStorage.getItem('token')
    return instance.get(url, {
        params: params,
        headers: token ? {
            'Authorization': `Bearer ${token}`
        } : {}
    }).then(response => response.data).catch(error=> handleCatch(error));
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


