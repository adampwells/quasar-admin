import axios from 'axios';
import auth from '.';

export default{
  getMarksterInfo(){
    var jwtToken = auth.auth.getSignInUserSession().getAccessToken().jwtToken;
    const USERINFO_URL = process.env.DEV ? 'http://localhost:8888/v1/secure/context' : 'https://saas-api.markster.com.au/v1/secure/context'
    var requestData = {
      headers: {
        'Authorization': 'Bearer '+ jwtToken
      }
    }
    return axios.get(USERINFO_URL, requestData).then(response => {
      return response.data;
    });
  }
}
