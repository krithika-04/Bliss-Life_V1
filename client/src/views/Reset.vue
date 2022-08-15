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
                        >Reset Your Password </h1>
                        
                        <v-form @submit.prevent="handleReset" ref="myFormRef" v-model="valid"  lazy-validation>
                              <v-text-field
                            id="password"
                            label="Password"
                            name="password"
                            v-model="password"
                            :rules="passwordRules"
                            prepend-icon="lock"
                            
                            color="cyan lighten-3"
                            :value="password"
                            
                             :append-icon="value ? 'visibility' : 'visibility_off'"
                             @click:append="() => (value = !value)"
                             :type="value ? 'password' : 'text'"
                          />
                          <v-text-field
                            id="cpassword"
                            label="Confirm Password"
                            name="cpassword"
                            v-model="confirm_password"
                             :rules="[required, min8, matchingPasswords ]"
                            prepend-icon="lock"
                           :value="confirm_password"
                            color="cyan lighten-3"
                             :append-icon="value ? 'visibility' : 'visibility_off'"
                             @click:append="() => (value = !value)"
                             :type="value ? 'password' : 'text'"
                          />
                         
                        </v-form>
                       
                      </v-card-text>
                      <div class="text-center my-3">
                        <v-btn :disabled="!valid" type="submit" class="mb-3" rounded color="cyan lighten-3" @click="handleReset" >Submit</v-btn>
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
    id:'',
      password: "",
      confirm_password:"",
      value: String,
     multiLine: true,
      snackbar: false,
      text: "",
    valid:false,
    password: "",
      confirm_password:"",
       passwordRules: [ 
    v => !!v || 'Password is required', 
    v => (v && v.length >= 8) || 'Password must have 8+ characters',
    v => /(?=.*[A-Z])/.test(v) || 'Must have one uppercase character', 
    v => /(?=.*\d)/.test(v) || 'Must have one number', 
    v => /([!@$%])/.test(v) || 'Must have one special character [!@#$%]' 
],
       
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
    


//function definition

redirect() {
  //console.log("freeCodeCamp");
   this.$router.push("/");
},
  async  handleReset()
    {
         if(!this.$refs.myFormRef.validate())
      {
       //console.log( this.$route.params.token) 
  return;
      }
      const pass=this.password;
     const id= this.$route.params.id;
     const token= this.$route.params.token
let res = await axios.post(`/api/post/resetPassword/${id}/${token}`, {password:pass})
if(res.data.success){
           this.snackbar=true
            this.text=res.data.msg;
            //console.log(err)
            setTimeout(this.redirect, 5000);
         
             
          }
    },
     min8: function(value) {
      if (value.length >= 8) {
        this.canUserReg=true;
        return true;
      } else {
        this.canUserReg=false;
        return 'Password should have more than 8 characters.';
      }
    },
      matchingPasswords: function() {
      if (this.password === this.confirm_password) {
        this.canUserReg=true;
        return true;
      } else {
         this.canUserReg=false;
        return 'Passwords does not match.';
      }
    },
     required: function(value) {
      if (value) {
        this.canUserReg=true;
        return true;
      } else {
        this.canUserReg=false;
        return 'This field is required.';
      }
    },
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