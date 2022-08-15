import Vue from 'vue'
import App from './App.vue'
import Dashboard from './views/Dashboard.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import  store  from './store'
import axios from "axios";
// axios.interceptors.response.use(undefined, function (error) {
//   if (error) {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
  
//         // originalRequest._retry = true;
//         // store.dispatch('logout')
//         // return router.push('/token')
        
//     }
//   }
// })
import TokenService from "./services/token.service";
axios.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      // config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
      config.headers["x-access-token"] = token; // for Node.js Express back-end
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (originalConfig.url !== "/login" && err.response) {
      // Access Token or refresh token gets expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
         
          const user=TokenService.getUser();
          
          const rs = await axios.post("http://localhost:5000/api/post/token", {
            _id: user._id,
            username: user.username,
            name: user.name,
            email: user.email, 
          refreshToken: TokenService.getLocalRefreshToken()

          });
          console.log(rs)
         // const { accessToken } = rs.token;
          console.log(rs.data.token)
          //store.dispatch('/token', accessToken);
         TokenService.updateLocalAccessToken(rs.data.token);
         
          return axios(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  }
);

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App),
  
}).$mount('#app')
