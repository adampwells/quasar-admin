var state = {
  cognitoInfo: {},
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

function setCognitoInfo(newValue){
  state.cognitoInfo = newValue;
}

function setMarksterInfo(newValue){
  console.log(`setting marksterInfor in store ${newValue}`)
  state.marksterInfo = newValue;
}

function getMarksterInfo(){
  return state.marksterInfo;
}

export default {
  state: state,
  setLoggedIn: setLoggedIn,
  setLoggedOut: setLoggedOut,
  setCognitoInfo: setCognitoInfo,
  setMarksterInfo: setMarksterInfo,
  getMarksterInfo: getMarksterInfo,
}
