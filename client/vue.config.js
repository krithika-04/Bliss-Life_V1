module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer:{
       proxy: "http://localhost:5000/"
    //  proxy: "https://bliss-life.herokuapp.com/"
  }
}
