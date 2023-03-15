import { addDoc, collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from './firebase';



export class Booking {
    constructor (datetime, days, amount, qty, storageId, storageName, storageCity, uid) {
        this.datetime = datetime;
        this.days = days;
        this.amount = amount;
        this.qty = qty;
        this.storageId = storageId;
        this.storageName = storageName,
        this.storageCity = storageCity,
        this.uid = uid;
    }
    toString() {
        return this.storageName + ', ' + this.storageCity + ', ' 
            + this.datetime + ', ' + this.days + ', ' 
            + this.amount + ', ' + this.qty + ', ' 
            + this.storageId + ', ' + this.uid;
    }
}

// Firestore data converter
const BookingConverter = {
    toFirestore: (booking) => {
        return {
            datetime: booking.datetime,
            days: booking.days,
            amount: booking.amount,
            qty: booking.qty,
            storageId: booking.storageId,
            storageName: booking.storageName,
            storageCity: booking.storageCity,
            uid: booking.uid
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        
        return new Booking(data.datetime, data.days, data.amount, data.qty, data.storageId, data.storageName, data.storageCity, data.uid);
    }
};


export function getUserBookings(uid) {
    const q = query(collection(db, "bookings"), where("uid", "==", uid), orderBy("datetime", "desc")).withConverter(BookingConverter);
    return getDocs(q);
}

export function addBooking(datetime, days, amount, qty, storageId, storageName, uid) {
    const ref = collection(db, "bookings").withConverter(BookingConverter);
    const booking = new Booking(datetime, days, amount, qty, storageId, storageName, uid);
    return addDoc(ref,  booking);
}