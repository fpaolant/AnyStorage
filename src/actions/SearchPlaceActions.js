import { SET_PLACE_NAME } from "./action-type";


export function setPlaceName(placeName) {
    console.log("setplace ACTIONS", placeName);
    return {
        type: SET_PLACE_NAME,
        payload: {
            searchPlaceText: placeName
        }
    }
}