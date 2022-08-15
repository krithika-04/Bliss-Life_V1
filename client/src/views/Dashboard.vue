<template>
  <v-app id="inspire" >
    <v-navigation-drawer
      v-model="drawer"
      app
 permanent
 :mini-variant.sync="mini"
    >
     <v-list-item>
       <v-list-item-content>
         <v-list-item-title>
           <v-img v-show="!mini"
      
      src="../assets/BlissLife12.png"
    ></v-img>
         </v-list-item-title>
         <v-list-item-subtitle>
            <v-img v-show="mini"
      
      src="../assets/logo1.png"
    ></v-img>
         </v-list-item-subtitle>
       </v-list-item-content>
     </v-list-item>
     <v-divider></v-divider>
     <v-list dense>
      
      <v-list-item-group
        
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.link" link
        >
        
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/login" @click.prevent="logoutUser">
        <v-list-item-icon>
            <v-icon >mdi-account-minus</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title >Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
      </v-list-item-group>
    </v-list>
    </v-navigation-drawer>

    <v-app-bar app  color="cyan lighten-3">
      <v-app-bar-nav-icon @click="mini = !mini"></v-app-bar-nav-icon>

      <v-toolbar-title>Bliss Life Blogs</v-toolbar-title>
    </v-app-bar>

  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

  export default {
      name: 'Dashboard',

    data: () => ({ drawer: null,
     items: [
      { title: 'Home', icon: 'mdi-home',link:"/dashboard/home" },
        { title: 'Add Post', icon: 'mdi-note-plus',link:"/dashboard/add-post" },
        { title: 'About', icon: 'mdi-help-box',link:"/dashboard/about" },
        { title: 'Profile', icon: 'mdi-account-box-outline',link:"/dashboard/profile" },
        
        
      ],
      mini: true,
    }),
    computed: {
    ...mapGetters(["isLoggedIn"]),
    
  },
  methods: {
    ...mapActions(["logout"]),
    logoutUser() {
      this.logout();
    },
      
  }
    

  }
</script>
<style>
.v-application--wrap {
  min-height: 0;
}
</style>