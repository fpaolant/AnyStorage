import { Alert } from 'react-native'
import { auth } from "../services/firebase/firebase";
import { sLoginRegisterLoginFormEmail, sLoginRegisterLoginFormPassword, sLoginRegisterRecoverPasswordFormEmail, sLoginRegisterRegisterFormDisplayName, sLoginRegisterRegisterFormEmail, sLoginRegisterRegisterFormPassword } from "../selectors/LoginRegisterSelectors";
import { LOGIN, LOGOUT, SIGNUP, RECOVER_PASSWORD } from "./action-type";
import { setActiveUser, setUserLoggedOut } from "../reducers/UserReducer";
import { resetLoginForm, resetRecoverPasswordForm, resetRegisterForm } from "../reducers/LoginRegisterReducer";
import { goBack } from '../navigation/NavigationService';


export const signIn = function() { 
    return function(dispatch, getState) {
        const state = getState();
        const email = sLoginRegisterLoginFormEmail(state);
        const password = sLoginRegisterLoginFormPassword(state);

        auth.signIn(email, password)
            .then((res) => {
                const { uid, displayName, email } = res.user;
                dispatch( setActiveUser({uid, displayName, email}) );
                dispatch(resetLoginForm);

                dispatch({
                    type: LOGIN,
                    payload: {uid, displayName, email}
                })

                Alert.alert('Accesso effettuato',
                    'Benvenuto ' + ((displayName!=null)? displayName: ''), [
                    {
                        text: 'OK', onPress: () => {
                            dispatch(resetLoginForm);
                            goBack();
                        },
                    },
                ]);
            })
            .catch((error) => {
                Alert.alert('Accesso non effettuato',
                    'Il login è fallito per il seguente motivo: ' + error.message + ' Verifica i dati e riprova', [
                    {
                        text: 'OK', onPress: () => {
                            
                        },
                    },
                ]);
            })

    };
};



export const signOut = () => {
    return function(dispatch, getState) {
        auth.signOut().then(() => {
            dispatch(setUserLoggedOut())
            dispatch({
                type: LOGOUT
            })
        }).catch((error) => {
            console.log("LOGOUT",error);
        })

    };
}

export const signUp = () => {
    return function(dispatch, getState) {
        const state = getState();
        const email = sLoginRegisterRegisterFormEmail(state);
        const password = sLoginRegisterRegisterFormPassword(state);
        const displayName = sLoginRegisterRegisterFormDisplayName(state);

        
        auth.signUp(email, password).then((res) => {
            const { uid, email } = res.user;
            auth.updateDisplayName(displayName);
            dispatch(setActiveUser(uid, displayName, email));
            dispatch({
                type: SIGNUP,
                payload: {uid, displayName, email}
            })
            Alert.alert('Registrazione Avvenuta',
            'La registrazione è avvenuta con successo! Sei gia loggato', [
              {
                text: 'OK', onPress: () => {
                  dispatch(resetRegisterForm);
                  goBack();
                },
              },
            ]);

      

        }).catch((error) => {
            Alert.alert('Registrazione non avvenuta',
            'La registrazione non è avvenuta per il seguente motivo: ' + error.message, [
              {
                text: 'OK', onPress: () => {
                },
              },
            ]);
        })

    };
}


export const recoverPassword = () => {
    return function(dispatch, getState) {
        const state = getState();
        const email = sLoginRegisterRecoverPasswordFormEmail(state);

        auth.recoverPasswordEmail(email).then(() => {
            dispatch({
                type: RECOVER_PASSWORD
            });
            Alert.alert('Recupero password',
            'l\'invio della mail con il link di recupero è avvenuto con successo. Controlla la tua casella di posta', [
              {
                text: 'OK', onPress: () => {
                  dispatch(resetRecoverPasswordForm);
                  goBack();
                },
              },
            ]);
        }).catch((error) => {
            console.log("RECOVER PASSWORD", error);
            Alert.alert('Recupero password fallito',
            'Il recupero della password non è avvenuto per il seguente motivo: ' + error.message, [
              {
                text: 'OK', onPress: () => {
                },
              },
            ]);
        })

    };
}