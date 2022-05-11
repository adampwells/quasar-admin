import api from './axoisWrapper'
import auth from '../auth'

export default {
  enableDisablePerson(personId) {
    return api.apiCall('put','/secure/person/' + personId + '/enableDisable', {})
  },
  upsertUser(personDto) {
    return api.apiCall('post','/secure/person', personDto)
  },
  findCurrentUser() {
    return api.apiCall('get','/secure/currentUser', {})
  },
}
