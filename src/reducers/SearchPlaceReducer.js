import {createSlice} from '@reduxjs/toolkit';
import Config from '../constants/Config';

const INITIAL_STATE = {
    searchPlaceText: "",
    historySearchPlaceText: ['Milano', 'Roma', 'Torino', 'Bologna'],
    region: Config.mapDefaultRegion,
    location: {}
}

export const  SearchPlaceSlice = createSlice({
  name: 'searchPlace',
  initialState: INITIAL_STATE,
  reducers: {
    resetPlaceText: (state) => {
      state.searchPlaceText = INITIAL_STATE.searchPlaceText;
    },
    searchPlaceTextChange: (state, action) => {
      state.searchPlaceText = action.payload;

      // add to history if not exist
      const index = state.historySearchPlaceText.findIndex(pt => {
        return pt.toLowerCase() === action.payload.toLowerCase();
      });
      
      if (index === -1) {
        if (state.historySearchPlaceText.length===4) state.historySearchPlaceText.shift();
        state.historySearchPlaceText.push(action.payload);
      }

    },
    mapRegionChange: (state, action) => {
      state.region = action.payload;
    },
    mapLocationChange: (state, action) => {
      state.location = action.payload;
    },

  },
});

export const {
    resetPlaceText,
    searchPlaceTextChange,
    mapRegionChange,
    mapLocationChange,
} = SearchPlaceSlice.actions;

export default SearchPlaceSlice.reducer;
