import React, {createContext, useEffect, useState} from "react";
import profileService from "../api/services/profile";
import {User} from "../api/types";
import authenticationService from "../api/services/authentication";

export type UserContextType = {
    user: User | null | undefined;
    login: (email: string, password: string) => Promise<void>;
    getUser: () => Promise<void>;
}

export const UserContext = createContext<UserContextType | null>(null);

/**
 * Context function to provide information regarding the logged-in user to its children components. Contains a
 * state with the user object and a login function.
 * @param children
 */
export default function UserProvider({ children }: React.PropsWithChildren) {
    const [user, setUser] = useState<User | null | undefined>();

    const getUser = async () => {
        await profileService.get()
            .then(user => setUser(user))
            .catch(() => setUser(null))
    }

    useEffect(() => {
        void getUser()
    }, []);

    const login = async (email: string, password: string) => {
        return authenticationService.login(email, password)
            .then(() => getUser());
    }

    return (
        <UserContext.Provider value={{ user, login, getUser }}>
            {children}
        </UserContext.Provider>
    );
}