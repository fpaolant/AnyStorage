
function sApp(state) { return state.app; }
export function sAppActivePage(state) { return sApp(state).page; }
export function sAppIsFirstAccess(state) { return sApp(state).isFirstAccess; }
