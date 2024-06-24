import api from './axoisWrapper'
import auth from '../auth'

export default {
  addUserToRole(roleId, personId) {
    return api.apiCall('post',`/secure/role/${roleId}/person/${personId}`, {})
  },
  removeUserFromRole(roleId, personId) {
    return api.apiCall('delete',`/secure/role/${roleId}/person/${personId}`, {})
  },
}
