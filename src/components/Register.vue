<template>
  <div class="login-bg">
    <div class="container">
      <div class="row">
        <div class="col s12 m8 offset-m2">
          <div class="login card-panel white black-text center" style="margin-top:3rem; ">
            <h3>Register with LogoBook</h3>
            <form id="registration-form">
              <div class="input-field">
                  <input type="text" id="email" required v-model="email" >
                  <label for="email">Email</label>
              </div>
              <div class="input-field">
                  <input type="text" id="displayName"  v-model="displayName">
                  <label for="userName">Display Name (optional, will be public)</label>
              </div>
              <div class="input-field">
                <input type="password" id="password" required v-model="password">
                <label for="password">Password</label>
              </div>
              <div class="input-field">
                <input type="password" id="confPassword" required v-model="confPassword">
                <label for="confPassword">Confirm Password</label>
              </div>
              <button class="btn btn-large btn-primary  black-text" v-on:click="register">Sign Up</button>
              
            </form>
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
    methods:{
        register: function(e) {
            // ensure the user knows their password, with a confrim password field
            if(this.password !== this.confPassword){
                alert('Password and Confirm Password need to match.')
                document.getElementById('password').reset()
                document.getElementById('confPassword').reset()
            } else {
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                .then(userCred => {
                    // if a display name was declared during registration, 
                    // update the newly created user profile with the given display name.  
                    if(displayName){
                        firebase.auth().currentUser.updateProfile({displayName:this.displayName})}
                    // once registered and logged in, redirect to the feed page
                    this.$router.go({path: this.$router.path})
                },
                err => {
                    alert(err.message)
                })
            // prevent page refresh on submit of registration form
            e.preventDefault()
        }}
    }
  }

</script>

<style scoped>
    .login-bg{
        background-image:url("https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,h_645,q_50,w_1600/v1/clients/denver/4f616c91_3217_4da7_807e_ede1e41bf98e_276dbd3a-8822-49ba-9246-41767b077386.jpg");
        background-size:cover;
        height:90vh;
    }
</style>
