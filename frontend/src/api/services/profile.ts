
import {AxiosResponse} from "axios";
import {api} from "../axios";
import AbstractService from "./abstract";
import {User} from "../types";

class ProfileService extends AbstractService<User> {

    async get() {
        const response: AxiosResponse<User> = await api.get(`${this.endpoint}/`);
        return response.data;
    }

    async update(user: Partial<User>) {
        const response: AxiosResponse = await api.patch(`${this.endpoint}/`, user);
        return response;
    }

    async deleteAccount(password: { password: string; }) {
        const response: AxiosResponse = await api.delete(`${this.endpoint}/`, {data: password});
        return response;
    }

    async sendDataByEmail() {
        const response: AxiosResponse = await api.post(`${this.endpoint}/personal-data-export/`);
        return response;
    }

}

const profileService = new ProfileService("/profile");
export default profileService;