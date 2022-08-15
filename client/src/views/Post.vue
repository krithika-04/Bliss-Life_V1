<template>
<v-app>
    <Dashboard />
  <v-container>
      <v-row no-gutters>
          <v-col sm="10" class="pa-4 mx-auto">
              <v-card class="pa-2">
                  <v-img :src="`${post.image}`"> </v-img>
                  <v-card-actions class="pb-0">
                      <v-row class="mt-1 mx-1">
                          <v-col sm="2">
                              <v-btn small outlined color="primary">{{post.category}}</v-btn>
                          </v-col>
                          <v-col sm="10" class="d-flex justify-end">
                              <v-btn color="success" :disabled='isDisabled()' text :to="{name:'edit-post',params:{id:post._id}}">Edit</v-btn>
                              <v-btn color="error" :disabled='isDisabled()' text @click="removePost(post._id)"> Delete</v-btn>
                          </v-col>
                      </v-row>
                  </v-card-actions>
                  <v-card-subtitle class="headline">
                      <h3>{{post.title}}</h3>
                  </v-card-subtitle>
                  <v-card-text class="grey--text">
                      <p>{{post.content}}</p>
                      <p>{{post.created}}</p>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
  </v-container> 
</v-app> 
</template>
<script>
import API from '../api'
import Dashboard from './Dashboard.vue'
import { mapActions, mapGetters } from "vuex";
export default {
     name: 'Post',
   components: {
     Dashboard,
    },
     computed: mapGetters(["user"]),
    data(){
        return{
            post:{},
            username:"",
           
        };
    },
    async created(){
        const response = await API.getPostByID(this.$route.params.id);
        const user=  await this.getProfile();
        this.username=user.data.user.username;
        this.post = response;
        //console.log(this.post);
    },
    methods:{
         ...mapActions(["getProfile"]),
        async removePost(id){
            const response = await API.deletePost(id);
            this.$router.push({name:'Home',params:{message:response.message}})
        },
       isDisabled()
        {
            //console.log(this.username);
            //console.log(this.post.username);
            if(this.username==this.post.username)
            return false;
            else 
            return true;
        }
    }
};
</script>