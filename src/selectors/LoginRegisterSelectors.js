function sLoginRegister(state) {
    return state.loginRegister;
  }
  
  export const sLoginRegisterLoginForm = (state) => sLoginRegister(state).loginForm;
  export const sLoginRegisterLoginFormEmail = (state) => sLoginRegister(state).loginForm.email;
  export const sLoginRegisterLoginFormPassword = (state) => sLoginRegister(state).loginForm.password;

  export const sLoginRegisterRegisterForm = (state) => sLoginRegister(state).registerForm;
  export const sLoginRegisterRegisterFormDisplayName = (state) => sLoginRegister(state).registerForm.displayName;
  export const sLoginRegisterRegisterFormEmail = (state) => sLoginRegister(state).registerForm.email;
  export const sLoginRegisterRegisterFormPassword = (state) => sLoginRegister(state).registerForm.password;
  
  export const sLoginRegisterRecoverPasswordForm = (state) => sLoginRegister(state).recoverPasswordForm;
  export const sLoginRegisterRecoverPasswordFormEmail = (state) => sLoginRegister(state).recoverPasswordForm.email;
  