import {createSlice} from '@reduxjs/toolkit';

const INITIAL_STATE = {
  loginForm: {
    email: '',
    password: '',
  },
  registerForm: {
    displayName: '',
    email: '',
    password: '',
  },
  recoverPasswordForm: {
    email: '',
  }
};

export const LoginRegisterSlice = createSlice({
  name: 'loginRegister',
  initialState: INITIAL_STATE,
  reducers: {
    resetLoginForm: (state) => {
      state.loginForm = INITIAL_STATE.loginForm;
    },
    loginFormChangeEmail: (state, action) => {
      state.loginForm.email = action.payload;
    },
    loginFormChangePassword: (state, action) => {
      state.loginForm.password = action.payload;
    },
    resetRegisterForm: (state) => {
      state.registerForm = INITIAL_STATE.registerForm;
    },
    registerChangeDisplayName: (state, action) => {
      state.registerForm.displayName = action.payload;
    },
    registerChangeEmail: (state, action) => {
      state.registerForm.email = action.payload;
    },
    registerChangePassword: (state, action) => {
      state.registerForm.password = action.payload;
    },
    resetRecoverPasswordForm: (state) => {
      state.recoverPasswordForm = INITIAL_STATE.recoverPasswordForm;
    },
    recoverPasswordFormChangeEmail: (state, action) => {
      state.recoverPasswordForm.email = action.payload;
    },
  },
});

export const {
  resetLoginForm,
  loginFormChangeEmail,
  loginFormChangePassword,
  resetRegisterForm,
  registerChangeDisplayName,
  registerChangeEmail,
  registerChangePassword,
  resetRecoverPasswordForm,
  recoverPasswordFormChangeEmail
} = LoginRegisterSlice.actions;

export default LoginRegisterSlice.reducer;
