import { CHANGE_PAGE, FIRST_ACCESS } from "./action-type";

export const changePage = function(page) { 
    return {
        type: CHANGE_PAGE,
        payload: {
            page
        }
        
    };
};

export const firstAccess = () => {
    return {
        type : FIRST_ACCESS
    }
}