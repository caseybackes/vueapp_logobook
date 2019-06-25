<template>
  <div class="login-bg">
        <div class="login-bg" style="">

      <div class="container ">
        <div class="row">
          <div class="card ml-auto mr-auto col col-sm-6 col-md-6 col-lg-6 mt-5 ">


            <h5 class="mt-4 text-center">Welcome to </h5>
            <h1 class="text-center">LogoBook</h1>
            <h5 class="text-center mt-4"> Sign Up </h5>

            <b-input-group class="mt-1">
              <b-input-group-text slot="prepend"> <i class="fas fa-user"></i></b-input-group-text>
              <b-form-input type="text" v-model="email" aria-required="true" placeholder="Email"></b-form-input>
            </b-input-group>

            <b-input-group class="mt-1">
              <b-input-group-text slot="prepend"> <i class="fas fa-user-circle"></i></b-input-group-text>
              <b-form-input type="text" v-model="displayName" aria-required="true" placeholder="Display Name"></b-form-input>
            </b-input-group>

            <b-input-group class="mt-1">
              <b-input-group-text slot="prepend"><i class="fas fa-lock"></i></b-input-group-text>
              <b-form-input type="password" v-model="password" aria-required="true" placeholder="Password"></b-form-input>
            </b-input-group>
            
            <b-input-group class="mt-1">
              <b-input-group-text slot="prepend"><i class="fas fa-lock"></i></b-input-group-text>
              <b-form-input type="password" v-model="confPassword" aria-required="true" placeholder="Confirm Password"></b-form-input>
            </b-input-group>


            <div class="container-fluid text-center mt-3  justify-content-between">
              <b-button type="submit" variant="primary" v-on:click="register">
                Submit
              </b-button>
              <p class="text-center mt-2" style="font-size:1rem" >Already have an account?
                <router-link to="/login">
                  Sign In
                </router-link>
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase'
  export default {
    name: 'register',
    data: function () {
      return {
        email: '',
        displayName: '',
        password: '',
        confPassword: '',

      }
    },
    methods: {
      register: function (e) {
        // ensure the user knows their password, with a confrim password field
        if (this.password !== this.confPassword) {
          alert('Password and Confirm Password need to match.')
          document.getElementById('password').reset()
          document.getElementById('confPassword').reset()
        } else {
          firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then(userCred => {
                // if a display name was declared during registration, 
                // update the newly created user profile with the given display name.  
                if (displayName) {
                  firebase.auth().currentUser.updateProfile({
                    displayName: this.displayName
                  })
                }
                // once registered and logged in, redirect to the feed page
                this.$router.go({
                  path: this.$router.push({name: 'feed'})
                })
              },
              err => {
                alert(err.message)
              })
          // prevent page refresh on submit of registration form
          e.preventDefault()
        }
      }
    }
  }

</script>

<style scoped>
  .login-bg {
    background-image: url("https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,h_645,q_50,w_1600/v1/clients/denver/4f616c91_3217_4da7_807e_ede1e41bf98e_276dbd3a-8822-49ba-9246-41767b077386.jpg");
    background-size: cover;
    height: 93vh;
  }

</style>
