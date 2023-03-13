import {createSlice} from '@reduxjs/toolkit';

const INITIAL_STATE = {
  datetime: new Date().getTime(),
  days: 1,
  qty: 1
};

export const CreateBookingSlice = createSlice({
  name: 'createBooking',
  initialState: INITIAL_STATE,
  reducers: {
    resetBookingForm: (state) => {
      Object.assign(state, INITIAL_STATE);
    },
    setBookingDate: (state, action) => {
      console.log("date",action)
      state.datetime = action.payload;
    },
    setBookingDays: (state, action) => {
      console.log(action)
      state.days = action.payload;
    },
    setBookingQty: (state, action) => {
      state.qty = action.payload;
    }
  },
});

export const {
  resetBookingForm,
  setBookingDate,
  setBookingDays,
  setBookingQty
} = CreateBookingSlice.actions;

export default CreateBookingSlice.reducer;
