import {createSlice} from '@reduxjs/toolkit';
import {logout} from './AppReducer';

const INITIAL_STATE = {
  futureBookings: [],
  pastBookings: [],
};

export const BookingsSlice = createSlice({
  name: 'bookings',
  initialState: INITIAL_STATE,
  reducers: {
    resetBookings: () => INITIAL_STATE,
    addBookings: function(state, action) {
     
    },
    toggleBookingState: function(state, action) {
      const objWithIdIndex = state.futureBookings.findIndex(
          p => p.id === action.payload.id);
      if (objWithIdIndex != null && objWithIdIndex > -1) {
        let pren = state.futureBookings.find(p => p.id === action.payload.id);
        if (pren != null) {
          pren.statoPrenotazione = 2;
          state.pastBookings.unshift(pren);
        }
        state.futureBookings.splice(objWithIdIndex, 1);
      }
    },
    extraReducers: (builder) => {
      builder.addCase(logout, () => INITIAL_STATE);
    },
  },
});

export const {
  resetBookings,
  addBookings,
  toggleBookingState,
} = BookingsSlice.actions;

export default BookingsSlice.reducer;
