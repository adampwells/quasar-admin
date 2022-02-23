import axios from 'axios'
import auth from '../auth'
import router from '../router'

const publicpaths = [
  '/public/stripe/clientSecret',
  '/public/username',
  '/public/registration',
]

export default {
  apiCall (method, path, data) {

    if (!auth.isUserSignedIn() && !publicpaths.includes(path)) {
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
