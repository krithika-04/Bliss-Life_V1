<template> 
<div>
<Dashboard />
    <v-container>
        <v-row no-gutters>
            <v-col sm="10" class="mx-auto">
                <v-card class="pa-5">
                    <v-card-title>Add New Post</v-card-title>
                    <v-divider></v-divider>
                    <v-form ref="form" @submit.prevent="submitForm" class="pa-5" enctype="multipart/form-data">
                    <v-text-field label="Title" v-model="post.title" prepend-icon="mdi-note" :rules="rules">
                    </v-text-field>
                    <v-text-field label="Category"  v-model="post.category" prepend-icon="mdi-view-list" :rules="rules">
                    </v-text-field>
                    <v-textarea label="Content"  v-model="post.content" prepend-icon="mdi-note-plus" :rules="rules"></v-textarea>
                    <v-file-input @change="selectFile" :rules="rules" show-size counter multiple label="Select Image"></v-file-input>
                    <v-btn type="submit" class="mt-3" color="primary">Add Post</v-btn>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</div>
</template>
<script>
import Dashboard from './Dashboard.vue'
import API from '../api'
import { mapActions, mapGetters } from "vuex";
export default {
      name: 'add-post',
    data(){
        return{
            rules:[(value)=>!!value || "This is a required field"],
            post:{
                title:"",
                category:"",
                content:"",
                image:"",
               
            },
            image:"",
        };
    },
    components: {
     Dashboard,
    },
    computed: mapGetters(["user"]),
  
    methods:{
         ...mapActions(["getProfile"]),
        selectFile(file){
            this.image=file[0];
        },
        async submitForm(){
            const formData = new FormData();
            const user=  await this.getProfile();
            //console.log(user.data.user.username);
            formData.append('image',this.image);
            formData.append('title',this.post.title);
            formData.append('category',this.post.category);
            formData.append('content',this.post.content);
            formData.append('username',user.data.user.username);
            if(this.$refs.form.validate())
            {
                const response = await API.addPost(formData);
                this.$router.push({name:'Home',params:{message:response.message}})
            }
        }
    },
   
};
</script>