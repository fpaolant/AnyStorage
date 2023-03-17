import { deleteDoc, addDoc, doc, collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from './firebase';
import { Storage } from './Storages'



export class Booking {
    constructor (datetime, days, amount, qty, storage, uid) {
        this.datetime = datetime;
        this.days = days;
        this.amount = amount;
        this.qty = qty;
        this.storage = storage;
        this.uid = uid;
    }
    toString() {
        return 'datetime='+this.datetime + ', days=' + this.days + 
                ', amount=' + this.amount + ', qty=' + this.qty + 
                ', storage=' + this.storage + ', uid=' + this.uid + ', ' 
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
            storage: {
                id: booking.storage.id,
                name: booking.storage.name,
                city: booking.storage.city,
                latitude: booking.storage.latitude,
                longitude: booking.storage.longitude
            },
            uid: booking.uid
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        
        return new Booking(data.datetime, data.days, data.amount, data.qty, data.storage, data.uid);
    }
};


export function getUserBookings(uid) {
    const q = query(collection(db, "bookings"), where("uid", "==", uid), orderBy("datetime", "desc")).withConverter(BookingConverter);
    return getDocs(q);
}

export function addBooking(datetime, days, amount, qty, storage, uid) {
    const ref = collection(db, "bookings").withConverter(BookingConverter);
    const booking = new Booking(datetime, days, amount, qty, storage, uid);
    return addDoc(ref,  booking);
}

export function deleteBooking(bookingId) {
    const colRef = collection(db, "bookings");
    const docRef = doc(colRef, bookingId)
    return deleteDoc(docRef);
}