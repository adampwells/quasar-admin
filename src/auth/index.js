import {CognitoAuth, StorageHelper} from 'amazon-cognito-auth-js'
import router from '../router'
import UserInfoStore from './user-info-store'
import UserInfoApi from './user-info-api'

const authData = process.env.DEV ? {
  ClientId: '6f2q5e3mnth4a409hhp3q7e8m3',
  AppWebDomain: 'markster-web.auth.ap-southeast-2.amazoncognito.com',
  TokenScopesArray: ['openid', 'email'],
  RedirectUriSignIn: 'http://localhost:8082/login/oauth2/code/cognito',
  RedirectUriSignOut: 'http://localhost:8082/logout',
  UserPoolId: 'ap-southeast-2_dsv4zXtn8'
} : process.env.DEST_ENV === 'prod' ? {
  ClientId: '6f2q5e3mnth4a409hhp3q7e8m3',
  AppWebDomain: 'markster-web.auth.ap-southeast-2.amazoncognito.com',
  TokenScopesArray: ['openid', 'email'],
  RedirectUriSignIn: 'https://saas.markster.com.au/login/oauth2/code/cognito',
  RedirectUriSignOut: 'https://saas.markster.com.au/logout',
  UserPoolId: 'ap-southeast-2_dsv4zXtn8'
} :
  {
    ClientId: '6f2q5e3mnth4a409hhp3q7e8m3',
    AppWebDomain: 'markster-web.auth.ap-southeast-2.amazoncognito.com',
    TokenScopesArray: ['openid', 'email'],
    RedirectUriSignIn: 'https://saas-staging.markster.com.au/login/oauth2/code/cognito',
    RedirectUriSignOut: 'https://saas-staging.markster.com.au/logout',
    UserPoolId: 'ap-southeast-2_dsv4zXtn8'
  }
;

const auth = new CognitoAuth(authData);
auth.userhandler = {
  onSuccess: function () {
    UserInfoStore.setLoggedIn(true)
    // we have got a valid Token, but we don't know if we have a valid user
    UserInfoApi.getMarksterInfo().then((result) => {
      console.log('got markster info: ' + JSON.stringify(result.data))
      UserInfoStore.setMarksterInfo(result.data)
      router.push('/secure/dashboard')
    })
  },
  onFailure: function (err) {
    UserInfoStore.setLoggedOut()
    router.go({
      path: '/error',
      query: {message: 'Login failed due to ' + err}
    })
  }
}

function getUserInfoStorageKey() {
  const keyPrefix = 'CognitoIdentityServiceProvider.' + auth.getClientId();
  const tokenUserName = auth.signInUserSession.getAccessToken().getUsername();
  return keyPrefix + '.' + tokenUserName + '.userInfo'
}

const storageHelper = new StorageHelper();
const storage = storageHelper.getStorage();
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
  getMarksterInfo() {
    return UserInfoApi.getMarksterInfo()
  },
  getMarksterData() {
    return UserInfoStore.getMarksterInfo()
  }
}
