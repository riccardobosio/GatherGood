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
    reviews: Review[];
}

export interface Event {
    id: string;
    name: string;
    creator: string;
    creator_name: string;
    location: string;
    max_people: number;
    date: string;
    description: string;
    participants: Participant[];
}

export interface Participant {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
}

export interface Review {
    id: string;
    reviewee: string;
    rate: number;
    description: string;
    created_at: string;
}