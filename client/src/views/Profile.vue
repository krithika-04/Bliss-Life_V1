<template>
<v-app>
  <Dashboard />
  <v-container fluid  class="my-5 pa-0 fill-width" v-if="hasData">
    <v-row justify="center" class="pa-0 ma-0">
      <v-card class="pa-0 ma-0" >
        <!-- <v-img
          height="200px"
          src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
        > -->
        <v-sheet
  color="grey darken-4"
  elevation="1"
  class="ma-0 pa-0"
  
>
          <v-app-bar
            flat
            color="rgba(0, 0, 0, 0)"
          >
            

            <v-toolbar-title class="text-h3 white--text pl-0">
              Profile
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn
              color="white"
              icon
            >
              <!-- <v-icon>mdi-dots-vertical</v-icon> -->
            </v-btn>
          </v-app-bar>

          <v-card-title class="white--text mt-8">
            <v-avatar size="56">
              <img
                alt="user"
                src="https://picsum.photos/200/300?random=1"
              >
            </v-avatar>
            <p class="ml-3">
               {{ user.name}}
            </p>
          </v-card-title>
        <!-- </v-img> -->
        </v-sheet>
        <v-card-text>
          <div class="font-weight-bold ml-8 mb-2">
          Username : {{user.username}}  
          </div>
          <div class="font-weight-bold ml-8 mb-2">
          E-mail : {{user.email}}  
          </div>

<v-container>
  <v-banner rounded class="grey darken-4 white--text font-weight-bold ">My Posts</v-banner>
 
  <v-row no-gutters>
    <v-col sm="4" class="pa-3" v-for="post in posts" :key="post._id">
<v-card class="pa-1" :to="{name: 'post',params:{id:post._id}}">
  <v-img height="250" :src="`${post.image}`"></v-img>
  <v-btn class="ml-4 mt-3" small outlined color="indigo">
    {{post.category}}
  </v-btn>
  <v-card-title class="headline">
    {{post.title}}
  </v-card-title>
  <v-card-text class="py-0">
    <p>{{post.content.substring(0,100)+"..." }}</p>
  </v-card-text>
</v-card>
    </v-col>
  </v-row>
</v-container>
          
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</v-app>
</template>
<script>
  import { mapActions, mapGetters } from "vuex";
  import Dashboard from './Dashboard.vue'
  import API from '../api'
export default {
  name: 'Profile',
  components: {
     Dashboard,
    },
  data(){
return {
  hasData:false,
   posts:[],
}
  },
 
  computed: {
    ...mapGetters(["user"]),
      width () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 220
          case 'sm': return 500
          case 'md': return 600
          case 'lg': return 700
          case 'xl': return 900
        }
      },
    },
  methods: {
    ...mapActions(["getProfile"])
  },
 async created() {
  const user=  await this.getProfile();
  this.hasData=true
  this.posts = await API.getAllUserPost(user.data.user.username);
  }
};
</script>