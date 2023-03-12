import {createSlice} from '@reduxjs/toolkit';

const INITIAL_STATE = {
  storages: [],
  selectedStorage: null
};

export const StoragesSlice = createSlice({
  name: 'storages',
  initialState: INITIAL_STATE,
  reducers: {
    resetStorages: () =>  {
      state.storages = INITIAL_STATE.storages;
    },
    replaceStorages: function(state, action) {
      if (Array.isArray(action.payload.storages)) {
        state.storages = action.payload.storages;
      }
    },
    selectStorage: function(state, action) {
      console.log("action", action)
      state.selectedStorage = action.payload;
      console.log(state.selectedStorage);
    },
    unSelectStorage: function(state) {
      state.selectedStorage = INITIAL_STATE.selectedStorage;
    }
  },
});

export const {
  resetStorages,
  replaceStorages,
  selectStorage,
  unSelectStorage,
} = StoragesSlice.actions;

export default StoragesSlice.reducer;
