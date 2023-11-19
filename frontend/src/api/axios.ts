
import axios, {AxiosError} from "axios";
import {AxiosRequestConfigExtended} from "./types";
import authenticationService from "./services/authentication";
import { CapacitorHttp } from "@capacitor/core";


export const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true,
})

/**
 * This interceptor catches 401 errors, calls the refresh token route and retries the request one single time. All other
 * errors are displayed in an alert window.
 * @param error
 */
api.interceptors.response.use(undefined, async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfigExtended;
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
            await authenticationService.refreshAccessToken()
            return api(originalRequest);
        } catch (err) {
            console.error(err);
        }
    }
    return Promise.reject(error)
})

/**
 * Axios Instance with no interceptor for 401 errors. It just displays the error in an alert window.
 * This instance is used for calls to refresh the access token in order to avoid an infinite loop.
 */
export const refreshAccessTokenApi = axios.create(api.defaults);
refreshAccessTokenApi.interceptors.response.use(undefined, (error: AxiosError) => {
    return Promise.reject(error)
})
