import api from './axoisWrapper'
import auth from '../auth'

export default {
  findAllCompanies() {
    return api.apiCall('get','/company', {})
  },
  findPeopleByCompanyContext(companyId) {
    if (!companyId) {
      companyId = auth.getMarksterData().company_id
    }
    return api.apiCall('get',`/person?companyId=${companyId}`, {})
  },
  findRolesByCompanyContext(companyId) {
    if (!companyId) {
      companyId = auth.getMarksterData().company_id
    }
    return api.apiCall('get',`/role?companyId=${companyId}`, {})
  }
}
