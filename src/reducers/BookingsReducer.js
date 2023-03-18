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
    removeBooking: function(state, action) {
      const bookings = [];
      Object.assign(bookings, state.bookings);
      
      const bookingIndex = bookings.findIndex((b) => {
        return b.id === action.payload.id});
      
      if (bookingIndex > -1) {
        bookings.splice(bookingIndex, 1);
        state.bookings = bookings;
      }
    }
    
    // extraReducers: (builder) => {
    //   builder.addCase(logout, () => INITIAL_STATE);
    // },
  },
});

export const {
  resetBookings,
  addBookings,
  removeBooking,
} = BookingsSlice.actions;

export default BookingsSlice.reducer;
