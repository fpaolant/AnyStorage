
function sStoreStorages(state) {
    return state.storages;
}
export function sStorages(state) {
    return sStoreStorages(state).storages;
}

export function sSelectedStorage(state) {
    return sStoreStorages(state).selectedStorage;
}