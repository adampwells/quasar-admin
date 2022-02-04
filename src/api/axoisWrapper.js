import axios from 'axios'
import auth from '../auth'
import router from '../router'

export default {
  apiCall (method, path, data) {

    if (!auth.isUserSignedIn()) {
      router.push('/login')
      return
    }
    let jwtToken = auth.auth.getSignInUserSession().getAccessToken().jwtToken;
    const baseUrl = process.env.DEV ? 'http://localhost:8888/v1' : 'https://saas-api.markster.com.au/v1'

    return axios({
      method: method,
      url: baseUrl + path,
      headers: {
        'Authorization': "Bearer " + jwtToken,
        'content-type': 'application/json'
      },
      data: data
    })
  }
}
