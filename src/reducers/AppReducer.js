import { CHANGE_PAGE, FIRST_ACCESS } from "../actions/action-type";
const INITIAL_STATE = {
    page: 'splash',
    isFirstAccess: true,
    loading: false
}


export default function AppReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FIRST_ACCESS:
            return {
                ...state,
                isFirstAccess: false
            }
        case CHANGE_PAGE:
            return {
                ...state,
                page: action.payload.page
            }
    }
    // crea un nuovo stato con lo stato copiato e la modifica da effettuare
    return state;
}

 