<template>
  <div class="login-bg">
    <div class="container">
      <div class="row">
        <div class="col s12 m8 offset-m2">
          <div class="login card-panel white black-text center" style="margin-top:3rem; ">
            <h3>Login to LogoBook</h3>
            <form>
              <div class="input-field">
                  <input type="text" id="email" v-model="email">
                  <label for="email">Email</label>
              </div>
              <div class="input-field">
                <input type="password" id="password" v-model="password">
                <label for="password">Password</label>
              </div>
              <button class="btn btn-large btn-primary  black-text" v-on:click="login">Login</button>
              <button class="btn btn-large grey lighten-4 black-text">Register</button>
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
    name: 'login',
    data: function () {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      login: function(e) {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(userCred => {
          alert(`signed in as ${userCred.user.email} with display name of ${userCred.user.displayName}`)
          this.$router.go({path: this.$router.path})
        },
        err => {
          alert(err.message)
        })
        e.preventDefault()
      }
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
