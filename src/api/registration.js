import api from './axoisWrapper'
import auth from '../auth'

export default {
  isUsernameAvailable() {
    return api.apiCall('get','/public/username', {})
  },
  registerNewAccount(registration) {
    return api.apiCall('post','/public/registration', registration)
  },
}
