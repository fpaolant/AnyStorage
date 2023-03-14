import { getUserBookings, addBooking as addApiBooking } from "../services/firebase/Bookings";
import { sUserInfo } from "../selectors";
import { sCreateBookingDate, sCreateBookingQty, sCreateBookingDays } from "../selectors";
import { GET_USER_BOOKINGS, ADD_BOOKING } from "./action-type";
import { addBookings } from "../reducers/BookingsReducer";
import { resetBookingForm } from "../reducers/CreateBookingReducer";

export function getBookings() {
    return function(dispatch, getState) {
        const state = getState();
        const user = sUserInfo(state);
        console.log("Action getBookings user:", user);

        getUserBookings(user.uid)
        .then((querySnapshot)=>{
            if(!querySnapshot.empty) {
                let bookings = [];
                querySnapshot.docs.forEach(doc => {
                    console.log("Action getBookings :",doc.id, doc.data())
                    const docData = doc.data();
                    bookings.push({ id: doc.id, ...docData});
                });
                
                dispatch({
                    type: GET_USER_BOOKINGS,
                    payload: bookings
                })
                dispatch(addBookings({bookings}));
            } else {
                dispatch({
                    type: GET_USER_BOOKINGS,
                    payload: []
                })
            } 
        })
        .catch((error) => {
            console.log('Action getBookings error', error);
        })
        


    }
}



export function addBooking(storage) {
    return function(dispatch, getState) {
        const state = getState();
        const user = sUserInfo(state);
        const datetime = sCreateBookingDate(state);
        const days = sCreateBookingDays(state);
        const qty = sCreateBookingQty(state);
        const amount = qty * storage.price * days;
        // console.log("Action addBooking user:", user);
        // console.log("Action addBooking datetime:", datetime);
        // console.log("Action addBooking days:", days);
        // console.log("Action addBooking amount:", amount);
        // console.log("Action addBooking qty:", qty);


        addApiBooking(datetime, days, amount, qty, storage.id, storage.name, user.uid)
        .then(()=>{
            dispatch(resetBookingForm());
            dispatch({ type: ADD_BOOKING })
            console.log("Action addBooking documento inserito")
        })
        .catch((error) => {
            console.log('Action addBooking error', error);
        })
        


    }
}

