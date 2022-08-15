<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height my-12 pb-0" fluid>
       
        <v-row align="center" justify="center">
          <v-col class="my-15" cols="12" sm="8" md="8">
            <v-card class="elevation-12">
             
                 
                      <v-card-text class="mt-12">
                        
                        <h1
                          class="text-center display-2 cyan--text text--lighten-3"
                        >Provide your E-mail id to reset password</h1>
                        
                        <v-form @submit.prevent="handleForgot" ref="myFormRef" v-model="valid"  lazy-validation>
                              <v-text-field
                            label="Email"
                            name="Email"
                            :rules="emailRules"
                            prepend-icon="email"
                            v-model="email"
                            type="text"
                            color="cyan lighten-3"
                             
                          />
                         
                        </v-form>
                       
                      </v-card-text>
                      <div class="text-center my-3">
                        <v-btn :disabled="!valid" type="submit" class="mb-3" rounded color="cyan lighten-3" @click="handleForgot" >Submit</v-btn>
                      </div>
                   
                
            </v-card>
          </v-col>
        </v-row>
         <v-snackbar
      v-model="snackbar"
      :multi-line="multiLine"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="red"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import axios from 'axios';
export default {
  data: () => ({
    step: 1,
    
      email:"",
    
     multiLine: true,
      snackbar: false,
      text: "",
    valid:false,
       
      emailRules: [
         v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
      ],
  }),
  
  props: {
    source: String
  },
  // mounted() {
  //   window.onpopstate = event => {
  //     if (
  //       window.localStorage.getItem("info") !== null &&
  //       this.$route.path == "/login"
  //     ) {
  //       this.$router.push("/"); // redirect to home, for example
  //     }
  //   };
  // },
  methods: {
  async  handleForgot()
    {
         if(!this.$refs.myFormRef.validate())
      {
        
  return;
      }
      const mailid=this.email;
let res = await axios.post(`api/post/forgot-password`, {email:mailid})
if(res.data.success){
           this.snackbar=true
            this.text=res.data.msg;
            //console.log(err)
             
          }
           else if(res.data.success==false)
    {
      this.snackbar=true
            this.text=res.data.msg;
    }
    }
   
    // ...mapActions(['login']),
    //   ...mapActions(["register"]),
    //    min6: function(value) {
    //   if (value.length >= 8) {
    //     return true;
    //   } else {
    //     return 'Password should have more than 8 characters.';
    //   }
    // },
    // matchingPasswords: function() {
    //   if (this.password === this.confirm_password) {
    //     return true;
    //   } else {
    //     return 'Passwords does not match.';
    //   }
    // },
  //   loginUser() {
  //     let user = {
  //       username: this.username,
  //       password: this.password
  //     };
  //     this.login(user)
  //       .then(res => {
  //         if (res.data.success) {
  //           this.$router.push("/dashboard/home");
  //         }
  //         else if(res.data.success==false){
  //          this.snackbar=true
  //           this.text=res.data.msg;
  //           //console.log(err)
             
  //         }
  //         //console.log(res);
  //       })
  //       .catch(err => {
  //         console.log(err);
  //         // console.log("123")
           
  //       });
  //   },
  //   registerUser() {
  //     let user = {
  //       username: this.username,
  //       password: this.password,
  //       confirm_password: this.confirm_password,
  //       email: this.email,
  //       name: this.name
  //     };
  //     this.register(user).then(res => {
  //       if (res.data.success) {
  //         window.location.reload();
  //       }
  //       else if(res.data.success==false){
  //          this.snackbar=true
  //           this.text=res.data.msg;
  //           //console.log(err)
             
  //         }
  //     });
  //   },
  //   forgotPage()
  //   {
  //     this.$router.push("/forgot");
  //   }
 }
};
</script>
<style>

</style>