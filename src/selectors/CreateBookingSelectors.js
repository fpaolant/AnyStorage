
function sCreateBooking(state) {
    return state.createBooking;
}
export function sCreateBookingDate(state) {
    return sCreateBooking(state).datetime;
}

export function sCreateBookingDays(state) {
    return sCreateBooking(state).days;
}

export function sCreateBookingQty(state) {
    return sCreateBooking(state).qty;
}