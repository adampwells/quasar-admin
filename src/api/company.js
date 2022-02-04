import api from './axoisWrapper'

export default {
  findAllCompanies() {
    return api.apiCall('get','/company', {})
  }
}
