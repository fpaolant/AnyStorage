import { SET_PLACE_NAME } from "../actions/action-type";

const INITIAL_STATE = {
    searchPlaceText: ""
}

export default function SearchPlaceReducer(state=INITIAL_STATE, action) {
    switch (action.type) {
        case SET_PLACE_NAME:
            return{
                ...state,
                searchPlaceText: action.payload.searchPlaceText
            }
            break;
    
        default:
            return state;
    }
}