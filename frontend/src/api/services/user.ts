import AbstractService from "./abstract.js";
import {User, UserCreate} from "../types";
import {AxiosResponse} from "axios";
import {api} from "../axios";

class UserService extends AbstractService<User> {
    async create(item: UserCreate) {
        const response: AxiosResponse = await api.post('/registration/', item);
        return response;
    }
}

const userService = new UserService("/users");
export default userService;