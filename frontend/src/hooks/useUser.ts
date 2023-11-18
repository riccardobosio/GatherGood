import {useContext} from "react";
import {UserContext, UserContextType} from "../contexts/UserProvider";

/**
 * User hook to provide user information to components wrapped by the user context.
 */
export function useUser() {
    return useContext(UserContext) as UserContextType;
}