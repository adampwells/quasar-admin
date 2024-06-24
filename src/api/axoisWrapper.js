import axios from 'axios'
import auth from '../auth'
import router from '../router'

export default {
  apiCall (method, path, data) {

    console.log(`api call path ${path}`)

    if (!auth.isUserSignedIn() && !path.includes('/public')) {
      router.push('/login')
      return
    }
    let jwtToken = auth.auth.getSignInUserSession().getAccessToken().jwtToken;
    const baseUrl = process.env.API

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
