
function sUser(state) { return state.user; }
export function sUserInfo(state) {
    return {
        uid: sUser(state).uid,
        displayName: sUser(state).displayName,
        email: sUser(state).email 
      }
}
export function sLoggedIn(state) { return sUser(state).loggedIn; }

