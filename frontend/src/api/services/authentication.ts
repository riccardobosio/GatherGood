import {LoginResponse, RefreshResponse} from "../types";
import {AxiosResponse} from "axios";
import {api, refreshAccessTokenApi} from "../axios";

/**
 * Service that manages the authentication operations
 */
class AuthenticationService {
    endpoint = "/auth";

    async login(email: string, password: string): Promise<LoginResponse> {
        const response: AxiosResponse<LoginResponse> = await api.post(`${this.endpoint}/login/`, {email, password});
        return response.data;
    }

    async logout(): Promise<LoginResponse> {
        const response: AxiosResponse<LoginResponse> = await api.post(`${this.endpoint}/logout/`);
        return response.data;
    }

    async refreshAccessToken(): Promise<RefreshResponse> {
        const response: AxiosResponse<RefreshResponse> = await refreshAccessTokenApi.post(`${this.endpoint}/token/refresh/`);
        return response.data;
    }
}

const authenticationService = new AuthenticationService();
export default authenticationService;