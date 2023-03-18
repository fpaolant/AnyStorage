import { getStorages } from "../services/firebase/Storages";
import { sMapRegion } from "../selectors/SearchPlaceSelectors";
import { GET_STORAGES_IN_MAP_REGION } from "./action-type";
import { replaceStorages } from "../reducers/StoragesReducer";


export function getStoragesInRegion() {
    return function(dispatch, getState) {
        const state = getState();
        const region = sMapRegion(state);
        //console.log("Action getStoragesInRegion region:", region);

        getStorages()
        .then((querySnapshot)=>{
            if(!querySnapshot.empty) {
                let storages = [];
                querySnapshot.docs.forEach(doc => {
                    //console.log("Action getStoragesInRegion :",doc.id, doc.data())
                    const docData = doc.data();
                    storages.push({ id: doc.id, ...docData});
                });
                
                dispatch({
                    type: GET_STORAGES_IN_MAP_REGION,
                    payload: storages
                })
                dispatch(replaceStorages({storages}));
            } else {
                dispatch({
                    type: GET_STORAGES_IN_MAP_REGION,
                    payload: []
                })
            } 
        })
        .catch((error) => {
            console.log('error', error);
        })
        


    }
}

