import { doc, getDoc, collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { geofire } from "geofire-common";
import { db } from './firebase';



class Storage {
    constructor (name, h24, note, latitude, longitude, price ) {
        this.name = name,
        this.h24 = h24;
        this.note = note;
        this.latitude = latitude;
        this.longitude = longitude;
        this.price = price;
    }
    toString() {
        return this.name + ', ' 
            + this.h24 + ', ' + this.note + ', ' 
            + this.latitude + ', ' + this.longitude
            + ', ' + this.price;
    }
}

// Firestore data converter
const StorageConverter = {
    toFirestore: (storage) => {
        return {
            name: storage.name,
            h24: storage.h24,
            note: storage.note,
            position:  { latitude: storage.latitude, longitude: storage.longitude  },
            price: storage.price
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        const latitude = data.position.latitude;
        const longitude = data.position.longitude;
        return new Storage(data.name, data.h24, data.note, latitude, longitude, data.price);
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






