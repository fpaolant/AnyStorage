import {createSlice} from '@reduxjs/toolkit';

const INITIAL_STATE = {
  bookings: []
};

export const BookingsSlice = createSlice({
  name: 'bookings',
  initialState: INITIAL_STATE,
  reducers: {
    resetBookings: () => INITIAL_STATE,
    addBookings: function(state, action) {
      if (Array.isArray(action.payload.bookings)) {
        state.bookings = action.payload.bookings;
      }
    },
    
    // extraReducers: (builder) => {
    //   builder.addCase(logout, () => INITIAL_STATE);
    // },
  },
});

export const {
  resetBookings,
  addBookings,
} = BookingsSlice.actions;

export default BookingsSlice.reducer;
