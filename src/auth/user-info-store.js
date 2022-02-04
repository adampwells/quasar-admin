var state = {
  marksterInfo: {},
  loggedIn: false,
  loadingState: true,
  errorLoadingState: false
}

function setLoggedIn(newValue) {
  state.loggedIn = newValue;
}

function setLoggedOut() {
  state.loggedIn = false;
  state.cognitoInfo = {};
}

function setMarksterInfo(newValue){
  state.marksterInfo = newValue;
}

function getMarksterInfo(){
  return state.marksterInfo;
}

export default {
  state: state,
  setLoggedIn: setLoggedIn,
  setLoggedOut: setLoggedOut,
  setMarksterInfo: setMarksterInfo,
  getMarksterInfo: getMarksterInfo,
}
