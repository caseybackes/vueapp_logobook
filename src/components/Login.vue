<template>
  <div class="login-bg" style="">
    
    <div class="container " >
      <div class="row">
        <div class="card ml-auto mr-auto col col-sm-6 col-md-6 col-lg-6 mt-5 " >


          <h5 class="mt-4 text-center">Welcome to </h5>
          <h1 class="text-center">LogoBook</h1>
          <h5 class="text-center mt-4"> Sign In </h5>

          <b-input-group class="mt-1">
            <b-input-group-text slot="prepend"> <i class="fas fa-user"></i></b-input-group-text>
            <b-form-input type="text" v-model="email" placeholder="Email"></b-form-input>
          </b-input-group>

         

          <b-input-group class="mt-2" type="submit">
            <b-input-group-text slot="prepend"><i class="fas fa-lock"></i></b-input-group-text>
            <b-form-input type="password" v-model="password" v-on:keyup.enter="login"  placeholder="Password"></b-form-input>
          </b-input-group>


          <div class=" container-fluid text-center mt-3 mb-2 justify-content-between">
            <b-button 
              type="submit" 
              variant="primary" 
              v-on:click="login">
              Login
            </b-button>
            <b-button 
              type="reset"  
              variant="success" 
              v-on:click="redirectRegister"> 
                Register
            </b-button>
          </div>
          




        </div>
      </div>

    </div>


  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'login',
    data: function () {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      login: function (e) {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          .then(userCred => {
              //alert(`signed in as ${userCred.user.email} with display name of ${userCred.user.displayName}`)
              console.log('user data: ', userCred)
              this.$router.go({
                path: this.$router.path
              })
            },
            err => {
              alert(err.message)
            })
        e.preventDefault()
      },
      redirectRegister: function (e) {
        this.$router.push("register")
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
