import api from './axoisWrapper'
import auth from '../auth'

export default {
  isUsernameAvailable(username) {
    console.log('isUsernameAvailable')
    return api.apiCall('get',`/public/username?username=${username}`, {})
  },
  registerNewAccount(registration) {
    return api.apiCall('post','/public/registration', registration)
  },
}
