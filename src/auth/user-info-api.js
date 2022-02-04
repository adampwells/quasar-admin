import axios from 'axios';
import auth from '.';

export default{
  getUserInfo(){
    var jwtToken = auth.auth.getSignInUserSession().getAccessToken().jwtToken;
    const USERINFO_URL = 'https://'+auth.auth.getAppWebDomain() + '/oauth2/userInfo';
    var requestData = {
      headers: {
        'Authorization': 'Bearer '+ jwtToken
      }
    }
    return axios.get(USERINFO_URL, requestData).then(response => {
      return response.data;
    });
  },
  getMarksterInfo(){
    var jwtToken = auth.auth.getSignInUserSession().getAccessToken().jwtToken;
    const USERINFO_URL = 'http://localhost:8888/v1/context';
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
