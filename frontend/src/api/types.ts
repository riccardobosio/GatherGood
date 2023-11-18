import { InternalAxiosRequestConfig } from 'axios';


export interface LoginResponse {
    access: string;
    refresh: string;
    user: {
        pk: string;
        email: string;
        first_name: string;
        last_name: string;
    };
}
export interface RefreshResponse {
    access: string;
    access_expiration: string;
}

export interface AxiosRequestConfigExtended extends InternalAxiosRequestConfig {
    _retry: boolean;
}

export interface ListParams {
    page?: number;
    per_page?: number;
    sort?: string;
    search?: object;
}

export interface User {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    is_superuser: boolean;
}