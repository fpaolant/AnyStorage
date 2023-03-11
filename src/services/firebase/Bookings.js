import moment from 'moment';
import { doc, setDoc, collection, getDocs, query, where, orderBy, Timestamp } from "firebase/firestore";
import { db } from './firebase';



class Booking {
    constructor (datetime, price, qty, storageId, storageName, uid ) {
        this.storageName = storageName,
        this.datetime = datetime;
        this.price = price;
        this.qty = qty;
        this.storageId = storageId;
        this.uid = uid;
    }
    toString() {
        return this.storageName + ', ' 
            + this.datetime + ', ' + this.price + ', ' 
            + this.qty + ', ' + this.storageId + ', ' 
            + this.uid;
    }
}

// Firestore data converter
const BookingConverter = {
    toFirestore: (booking) => {
        return {
            storageName: booking.storageName,
            datetime: booking.datetime,
            price: booking.price,
            qty: booking.qty,
            storageId: booking.storageId,
            uid: booking.uid
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        
        const readableDate = moment.unix(data.datetime.seconds).format("DD/MM/YYYY HH:mm");


        return new Booking(data.storageName, readableDate, data.price, data.qty, data.storageId, data.uid);
    }
};
/*
AbbDQjHHacEu6orjoPaY  =>  {
    "datetime": {"nanoseconds": 138000000, "seconds": 1680292979}, 
    "price": 15, 
    "qty": 1, 
    "storageId": {"_key": {"path": [ut]}, 
    "converter": null, 
    "firestore": [Object], 
    "type": "document"}, 
    "uid": "h8XeYF1hVUSaic5c9opkgox1EJ03"}
*/



export function getUserBookings(uid) {
    const q = query(collection(db, "bookings"), where("uid", "==", uid), orderBy("datetime", "desc")).withConverter(BookingConverter);
    return getDocs(q);
}

export function addBooking(datetime, price, qty, storageId, storageName, uid) {
    const ref = doc(db, "bookings").withConverter(BookingConverter);
    return setDoc(ref, new Booking(datetime, price, qty, storageId, storageName, uid) );
}






