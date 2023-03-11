import { doc, getDoc, collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { geofire } from "geofire-common";
import { db } from './firebase';



class Storage {
    constructor (name, h24, note, position, price ) {
        this.name = name,
        this.h24 = h24;
        this.note = note;
        this.position = position;
        this.price = price;
    }
    toString() {
        return this.name + ', ' 
            + this.h24 + ', ' + this.note + ', ' 
            + this.position + ', ' + this.price;
    }
}

// Firestore data converter
const StorageConverter = {
    toFirestore: (storage) => {
        return {
            name: storage.name,
            h24: storage.h24,
            note: storage.note,
            position: storage.position,
            price: storage.price
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Booking(data.name, data.h24, data.note, data.position, data.price);
    }
};




export function getStorages() {
    const q = query(collection(db, "storages"))
                    .withConverter(StorageConverter);
    return getDocs(q);
}

export function getStorage(id) {
    const docRef = doc(db, "storages", id)
                        .withConverter(StorageConverter);
    return getDoc(docRef);
}






