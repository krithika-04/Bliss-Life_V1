import axios from 'axios';
const API_URL = 'api/post/';
class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'login', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem('user');
  }
  register(user) {
    return axios.post(API_URL + 'register', {
        username: user.username,
        password: user.password,
        email:user.email,
        _id:user._id
    });
}
}
export default new AuthService();