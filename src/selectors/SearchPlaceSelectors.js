
function sSearchPlace(state) {
    return state.searchPlace;
}
export function sSearchPlaceText(state) {
    return sSearchPlace(state).searchPlaceText;
}

export function sMapRegion(state) {
    return sSearchPlace(state).region;
}

export function sMapLocation(state) {
    return sSearchPlace(state).location;
}