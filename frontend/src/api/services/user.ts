import AbstractService from "./abstract.js";
import {User} from "../types";

class UserService extends AbstractService<User> {}

const userService = new UserService("/users");
export default userService;