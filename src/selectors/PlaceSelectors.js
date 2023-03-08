
function sSearchPlace(state) {
    return state.home;
}
export function sSearchPlaceText(state) {
    return sSearchPlace(state).searchPlaceText;
}