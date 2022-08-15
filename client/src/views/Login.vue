<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height my-12 pb-0" fluid>
       
        <v-row align="center" justify="center">
          <v-col class="my-15" cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1
                          class="text-center display-2 cyan--text text--lighten-3"
                        >Sign in to Bliss Life </h1>
                        
                        
                        <v-form @submit.prevent="loginUser">
                          <v-text-field
                            label="Username"
                            name="username"
                            v-model="username"
                            prepend-icon="person"
                            type="text"
                            color="cyan lighten-3"
                          />

                          <v-text-field
                            id="password"
                            label="Password"
                            name="password"
                            v-model="password"
                            prepend-icon="lock"
                            type="password"
                            color="cyan lighten-3"
                          />
                        </v-form>
                        <v-btn text class="text-center mt-4" @click="forgotPage">Forgot your password ?</v-btn>
                      </v-card-text>
                      <div class="text-center my-3">
                        <v-btn type="submit" rounded color="cyan lighten-3" @click="loginUser" dark>SIGN IN</v-btn>
                      </div>
                    </v-col>
                    <v-col cols="12" md="4" class="cyan lighten-3">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Hello, Friend!</h1>
                        <h5
                          class="text-center"
                        >Enter your personal details and start journay with us</h5>
                      </v-card-text>
                      <div class="text-center mb-5">
                        <v-btn rounded outlined dark @click="step++">SIGN UP</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="cyan lighten-3">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Welcome Back!</h1>
                        <h5
                          class="text-center"
                        >To Keep connected with us please login with your personnel info</h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step--">Sign in</v-btn>
                      </div>
                    </v-col>

                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1 class="text-center display-2 cyan--text text--lighten-3">Create Account</h1>
                        
                        <h4 class="text-center mt-4">Ensure your email for registration</h4>
                        <v-form @submit.prevent="registerUser" ref="myFormRef" v-model="canUserReg"  lazy-validation>
                          <v-text-field
                            label="Name"
                            name="Name"
                            v-model="name"
                            prepend-icon="person"
                            type="text"
                            color="cyan lighten-3"
                            :rules="[required]"
                          />
                          <v-text-field
                            label="Username"
                            name="username"
                            v-model="username"
                            prepend-icon="person"
                            type="text"
                            color="cyan lighten-3"
                             :rules="[required]"
                          />
                          <v-text-field
                            label="Email"
                            name="Email"
                            :rules="emailRules"
                            prepend-icon="email"
                            v-model="email"
                            type="text"
                            color="cyan lighten-3"
                             
                          />

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
                      <div class="text-center my-5">
                        <v-btn :disabled="!canUserReg" rounded color="cyan lighten-3" @click="registerUser">SIGN UP</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
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
export default {
  data: () => ({
    step: 1,
     value: String,
     username: "",
      password: "",
      confirm_password:"",
      email:"",
      name:"",
     multiLine: true,
      snackbar: false,
      text: "",
      canUserReg:false,
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
  mounted() {
    window.onpopstate = event => {
      if (
        window.localStorage.getItem("info") !== null &&
        this.$route.path == "/login"
      ) {
        this.$router.push("/"); // redirect to home, for example
      }
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  methods: {
    ...mapActions(['login']),
      ...mapActions(["register"]),
        required: function(value) {
      if (value) {
        this.canUserReg=true;
        return true;
      } else {
        this.canUserReg=false;
        return 'This field is required.';
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
    loginUser() {
      let user = {
        username: this.username,
        password: this.password
      };
      this.login(user)
        .then(res => {
          if (res.data.success) {
            this.$router.push("/dashboard/home");
          }
          else if(res.data.success==false){
           this.snackbar=true
            this.text=res.data.msg;
            //console.log(err)
             
          }
          //console.log(res);
        })
        .catch(err => {
          console.log(err);
          // console.log("123")
           
        });
    },
    registerUser() {
      console.log(this.$refs.myFormRef.validate())
      if(!this.$refs.myFormRef.validate())
      {
        
  return;
      }
    
      let user = {
        username: this.username,
        password: this.password,
        confirm_password: this.confirm_password,
        email: this.email,
        name: this.name
      };
      this.register(user).then(res => {
        if (res.data.success) {
          window.location.reload();
        }
        else if(res.data.success==false){
           this.snackbar=true
            this.text=res.data.msg;
            //console.log(err)
             
          }
      });
    },
    forgotPage()
    {
      this.$router.push("/forgot");
    }
  }
};
</script>
<style>

</style>