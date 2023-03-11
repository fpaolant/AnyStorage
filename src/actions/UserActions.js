import { LOGIN, LOGOUT } from "./action-type";

export const login = function(username, password) { 
    return {
        type: LOGIN,
        payload: {
            username, password
        }
        
    };
};

export const logout = () => {
    return {
        type: LOGOUT
    }
}

