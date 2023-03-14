import { getUserBookings, addBooking as addApiBooking } from "../services/firebase/Bookings";
import { sUserInfo } from "../selectors";
import { sCreateBookingDate, sCreateBookingQty, sCreateBookingDays } from "../selectors";
import { GET_USER_BOOKINGS, ADD_BOOKING } from "./action-type";
import { addBookings } from "../reducers/BookingsReducer";
import { resetBookingForm } from "../reducers/CreateBookingReducer";
import { Alert } from "react-native";
import { navigate } from "../navigation/NavigationService";

export function getBookings() {
    return function(dispatch, getState) {
        const state = getState();
        const user = sUserInfo(state);
        // console.log("Action getBookings user:", user);

        getUserBookings(user.uid)
        .then((querySnapshot)=>{
            if(!querySnapshot.empty) {
                let bookings = [];
                querySnapshot.docs.forEach(doc => {
                    // console.log("Action getBookings :",doc.id, doc.data())
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
            Alert.alert('Errore',
            'Si è verificato un errore, si prega di riprovare.\n Errore: ' + error.message, [
              {
                text: 'OK', onPress: () => {
                },
              },
            ]);
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


        addApiBooking(datetime, days, amount, qty, storage.id, storage.name, user.uid)
        .then(()=>{
            dispatch(resetBookingForm());
            dispatch({ type: ADD_BOOKING })
            navigate('MyBookingsTab', {});
        })
        .catch((error) => {
            console.log('Action addBooking error', error);
            Alert.alert('Errore',
            'Si è verificato un errore, si prega di riprovare.\n Errore: ' + error.message, [
              {
                text: 'OK', onPress: () => {
                },
              },
            ]);
        })
        


    }
}

