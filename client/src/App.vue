<template>
  <v-app id="inspire">
     
 
   <v-main>
      <router-view></router-view>
    </v-main>
      <!-- <Dashboard v-if="isLoggedIn"/> -->
     
 
  </v-app>
</template>

<script>
import { mapGetters} from "vuex";
//import Dashboard from './views/Dashboard.vue'
  export default {
    name: 'app',

    // components: {
    //   Dashboard
    // },
    computed: {
    ...mapGetters(["isLoggedIn"])
  },
  mounted() {
    window.onpopstate = event => {
      if (
        window.localStorage.getItem("info") !== null &&
        this.$route.path == "/login"
      ) {
        this.$router.push("/"); // redirect to home, for example
      }
    };
  }
  
    

  }
</script>