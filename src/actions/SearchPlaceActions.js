import { SET_PLACE_NAME } from "./action-type";


export function setPlaceName(placeName) {
    return {
        type: SET_PLACE_NAME,
        payload: {
            searchPlaceText: placeName
        }
    }
}