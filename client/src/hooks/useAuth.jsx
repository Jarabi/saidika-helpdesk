import { AUTH_TOKEN } from "../api/constants";

export const useAuth = () => {
    const isLoggedIn = () => {
        const token = localStorage.getItem(AUTH_TOKEN);
        
        return token !== null;
    };

    return {isLoggedIn};
}   