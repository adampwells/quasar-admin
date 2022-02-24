import api from './axoisWrapper'
import auth from '../auth'

export default {
  findAllCompanies() {
    return api.apiCall('get','/secure/company', {})
  },
  findCompanyDetails(companyId) {
    if (!companyId) {
      companyId = auth.getMarksterData().company_id
    }
    return api.apiCall('get','/secure/company/' + companyId, {})
  },
  findPeopleByCompanyContext(companyId) {
    if (!companyId) {
      companyId = auth.getMarksterData().company_id
    }
    return api.apiCall('get',`/secure/person?companyId=${companyId}`, {})
  },
  findRolesByCompanyContext(companyId) {
    if (!companyId) {
      companyId = auth.getMarksterData().company_id
    }
    return api.apiCall('get',`/secure/role?companyId=${companyId}`, {})
  }
}
