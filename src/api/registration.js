import api from './axoisWrapper'
import auth from '../auth'

export default {
  isUsernameAvailable() {
    return api.apiCall('get','/username', {})
  },
}
