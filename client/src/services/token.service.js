class TokenService {
    getLocalRefreshToken() {
      const user =localStorage.getItem("refreshToken");
      console.log(user)
      return user;
    }
    getLocalAccessToken() {
      const user = localStorage.getItem("refreshToken");
      return user;
    }
    getUser() {
      const user = JSON.parse(localStorage.getItem("user"));
      //const str = "key:value";
     // let items = 'key1:value1;key2:value2;key3:value3';
      // let items_array = user.split(',');
      // let final_items = items_array.map(item => item.split(':'));
      // // [ [ key1, value1 ], [ key2, value2 ], [ key3, value3 ] ]
      
      // let final_result = Object.fromEntries(final_items);
     //console.log(user._id)
      return user;
    }
    updateLocalAccessToken(token) {
      let user = localStorage.getItem("token");
      user = token;
      localStorage.setItem('token',user);
      console.log(user);
      //token: localStorage.getItem('refreshToken') ;
    }
    // getUser() {
    //   return localStorage.getItem("refreshToken");
    // }
    setUser(user) {
      console.log(JSON.stringify(user));
      localStorage.setItem("user", JSON.stringify(user));
    }
    removeUser() {  localStorage.removeItem("user");
}
}
export default new TokenService();