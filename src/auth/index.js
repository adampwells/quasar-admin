import {CognitoAuth, StorageHelper} from 'amazon-cognito-auth-js'
import router from '../router'
import UserInfoStore from './user-info-store'
import UserInfoApi from './user-info-api'

var authData = {
  ClientId: '6f2q5e3mnth4a409hhp3q7e8m3',
  AppWebDomain: 'markster-web.auth.ap-southeast-2.amazoncognito.com',
  TokenScopesArray: ['openid', 'email'],
  RedirectUriSignIn: 'http://localhost:8080/login/oauth2/code/cognito',
  RedirectUriSignOut: 'http://localhost:8080/logout',
  UserPoolId: 'ap-southeast-2_dsv4zXtn8'
}

var auth = new CognitoAuth(authData)
auth.userhandler = {
  onSuccess: function() {
    UserInfoStore.setLoggedIn(true)
    UserInfoApi.getUserInfo().then(() => {
      router.push('/secure/dashboard')
    })
  },
  onFailure: function(err) {
    UserInfoStore.setLoggedOut()
    router.go({
      path: '/error',
      query: { message: 'Login failed due to ' + err }
    })
  }
}

function getUserInfoStorageKey() {
  var keyPrefix = 'CognitoIdentityServiceProvider.' + auth.getClientId()
  var tokenUserName = auth.signInUserSession.getAccessToken().getUsername()
  return keyPrefix + '.' + tokenUserName + '.userInfo'
}

var storageHelper = new StorageHelper()
var storage = storageHelper.getStorage()
export default {
  auth: auth,
  isUserSignedIn() {
    return auth.isUserSignedIn()
  },
  login() {
    auth.getSession()
  },
  logout() {
    if (auth.isUserSignedIn()) {
      var userInfoKey = this.getUserInfoStorageKey()
      auth.signOut()

      storage.removeItem(userInfoKey)
    }
  },
  getUserInfoStorageKey,
  getUserInfo() {
    return UserInfoApi.getUserInfo()
  }
}
