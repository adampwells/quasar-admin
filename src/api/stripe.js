import api from './axoisWrapper'
import auth from '../auth'

export default {
  findClientSecret() {
    return api.apiCall('get','/stripe/clientSecret', {})
  },
}
