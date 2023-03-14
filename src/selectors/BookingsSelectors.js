function sStoreBookings(state) {
    return state.bookings;
  }
  
  export const sBookings = state => sStoreBookings(state).bookings;
  