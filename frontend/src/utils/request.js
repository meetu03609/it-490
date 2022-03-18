import axios from 'axios';
import {CONFIG} from "../config";

export const api = async (path,type,body = null, params = null) => {
    let token = localStorage.getItem('token');
    let instance = axios.create({
        baseURL: CONFIG.API_BASE_URL,
        method: type,
        data: body,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization' : `Token ${token}`}
    });

    return instance(path);
};