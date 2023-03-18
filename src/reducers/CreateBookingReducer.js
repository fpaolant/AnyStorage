import {createSlice} from '@reduxjs/toolkit';
import { maxBookingDays, maxBookingQty } from '../constants/Config';

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
      state.datetime = action.payload;
    },
    addBookingDays: (state) => {
      if(state.days<=maxBookingDays) Object.assign(state.days, state.days++);
    },
    subBookingDays: (state) => {
      if(state.days>1) Object.assign(state.days, state.days--);
    },
    addBookingQty: (state) => {
      if(state.qty<maxBookingQty) Object.assign(state.qty, state.qty++);
    },
    subBookingQty: (state) => {
      if(state.qty>1) Object.assign(state.qty, state.qty--);
    }
  },
});

export const {
  resetBookingForm,
  setBookingDate,
  addBookingDays,
  subBookingDays,
  addBookingQty,
  subBookingQty
} = CreateBookingSlice.actions;

export default CreateBookingSlice.reducer;
