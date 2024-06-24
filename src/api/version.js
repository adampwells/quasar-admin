import api from './axoisWrapper'
import auth from '../auth'

export default {
  findApiVersionInfo() {
    return api.apiCall('get','/public/version', {})
  },
}
