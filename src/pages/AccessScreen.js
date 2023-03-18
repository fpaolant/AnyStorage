import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Page from "../components/Page";
import Color from "../constants/Color";
import Title from "../components/typo/Title";
import SubTitle from "../components/typo/Subtitle";
import {
  sLoginRegisterLoginFormEmail,
  sLoginRegisterLoginFormPassword,
  sLoginRegisterRecoverPasswordFormEmail,
  sLoginRegisterRegisterFormDisplayName,
  sLoginRegisterRegisterFormEmail,
  sLoginRegisterRegisterFormPassword,
} from "../selectors/LoginRegisterSelectors";
import {
  loginFormChangeEmail,
  loginFormChangePassword,
  registerChangeEmail,
  registerChangePassword,
  registerChangeDisplayName,
  resetLoginForm,
  resetRecoverPasswordForm,
  resetRegisterForm,
  recoverPasswordFormChangeEmail
} from "../reducers/LoginRegisterReducer";
import { signIn, signUp, recoverPassword } from "../actions";







function AccessScreen({ navigation: { goBack } }) {
  const dispatch = useDispatch();

  // login form vars
  const loginEmail = useSelector(sLoginRegisterLoginFormEmail);
  const loginPassword = useSelector(sLoginRegisterLoginFormPassword);
  // register form vars
  const registerEmail = useSelector(sLoginRegisterRegisterFormEmail);
  const registerPassword = useSelector(sLoginRegisterRegisterFormPassword);
  const registerDisplayName = useSelector(
    sLoginRegisterRegisterFormDisplayName
  );
  // reciver password form vars
  const recoverPasswordEmail = useSelector(
    sLoginRegisterRecoverPasswordFormEmail
  );

  // change form view mode
  const [accessMode, setAccessMode] = useState("login");

  // change view handler
  function onChangeView(mode) {
    dispatch(resetLoginForm());
    dispatch(resetRegisterForm());
    dispatch(resetRecoverPasswordForm());
    setAccessMode(mode);
  }

  // login form handlers
  function handleLoginEmailChange(email) {
    dispatch(loginFormChangeEmail(email));
  }

  function handleLoginPasswordChange(password) {
    dispatch(loginFormChangePassword(password));
  }

  // register form handlers
  function handleRegisterEmailChange(email) {
    dispatch(registerChangeEmail(email));
  }

  function handleRegisterPasswordChange(password) {
    dispatch(registerChangePassword(password));
  }

  function handleRegisterDisplayNameChange(displayName) {
    dispatch(registerChangeDisplayName(displayName));
  }

  // recover password handlers
  function handleRecoverPasswordEmailChange(email) {
    dispatch(recoverPasswordFormChangeEmail(email));
  }


  // submit hanlders
  function onLoginPress() {
    dispatch(signIn());
  }

  function onSignupPress() {
    dispatch(signUp());
  }

  function onForgotPassword() {
    dispatch(recoverPassword());
    setAccessMode('login');
  }

  function onClose() {
    goBack();
  }

  return (
    <Page style={styles.container}>
      <Title text="Accedi"></Title>
      {accessMode == "login" && (
        <>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Email"
              placeholderTextColor={Color.muted}
              value={loginEmail}
              onChangeText={handleLoginEmailChange}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Password"
              placeholderTextColor={Color.muted}
              value={loginPassword}
              secureTextEntry={true}
              onChangeText={handleLoginPasswordChange}
            />
          </View>
          <TouchableOpacity onPress={() => onChangeView('forgotPassword')}>
            <Text style={styles.forgot_button}>Password dimenticata?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.mainActionBtn}
            disabled={
              !(
                loginEmail != null &&
                loginEmail !== "" &&
                loginPassword != null &&
                loginPassword !== ""
              )
            }
            onPress={onLoginPress}
          >
            <Text style={{color: Color.white}}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryActionBtn}
            onPress={() => onChangeView("signup")}
          >
            <Text style={{color: Color.white}}>REGISTRATI</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
            <Text>CHIUDI</Text>
          </TouchableOpacity>
        </>
      )}

      {accessMode == "signup" && (
        <>
          <SubTitle text="Registra un account" />
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Nominativo"
              placeholderTextColor={Color.muted}
              value={registerDisplayName}
              onChangeText={handleRegisterDisplayNameChange}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Email"
              value={registerEmail}
              placeholderTextColor={Color.muted}
              onChangeText={handleRegisterEmailChange}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Password"
              placeholderTextColor={Color.muted}
              value={registerPassword}
              secureTextEntry={true}
              onChangeText={handleRegisterPasswordChange}
            />
          </View>
          <TouchableOpacity
            style={styles.mainActionBtn}
            disabled={
              !(
                registerEmail != null &&
                registerEmail !== "" &&
                registerPassword != null &&
                registerPassword !== "" &&
                registerDisplayName != null &&
                registerDisplayName !== ""
              )
            }
            onPress={onSignupPress}
          >
            <Text style={{color: Color.white}}>Invia registrazione</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => onChangeView("login")}
          >
            <Text>Annulla</Text>
          </TouchableOpacity>
        </>
      )}

      {accessMode == "forgotPassword" && (
        <>
          <SubTitle text="Recupera password" />
          
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Email"
              placeholderTextColor={Color.muted}
              value={recoverPasswordEmail}
              onChangeText={handleRecoverPasswordEmailChange}
            />
            
          </View>
          <Text style={{marginBottom: 20, textAlign: 'center', color: Color.muted}}>
              verrà inviato un link per il reset della password sull'email registrata
            </Text>
          <TouchableOpacity
            style={styles.mainActionBtn}
            disabled={!(recoverPasswordEmail != null && recoverPasswordEmail !== "")}
            onPress={onForgotPassword}
          >
            <Text style={{color: Color.white}}>INVIA EMAIL LINK</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => onChangeView("login")}
          >
            <Text>CHIUDI</Text>
          </TouchableOpacity>
        </>
      )}
    </Page>
  );
}

export default AccessScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  inputView: {
    width: "100%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    width: "100%",
    borderColor: Color.lightGrey,
    borderWidth: 1,
    height: 50,
    flex: 1,
    padding: 10,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  cancelBtn: {
    width: "80%",
    borderColor: Color.primary,
    borderWidth: 1,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  mainActionBtn: {
    width: "80%",
    backgroundColor: Color.primary,
    color: Color.white,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  secondaryActionBtn: {
    width: "80%",
    backgroundColor: Color.secondary,
    color: Color.white,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
});
