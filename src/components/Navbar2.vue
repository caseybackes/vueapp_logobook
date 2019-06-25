<template >
<div>
  <b-navbar toggleable="lg" type="dark" variant="primary">
    <b-navbar-brand href="#">Katalize</b-navbar-brand>

    <b-navbar-toggle v-if="isLoggedIn" target="nav-collapse"></b-navbar-toggle>

    <b-collapse v-if="isLoggedIn" id="nav-collapse" is-nav>
      <b-navbar-nav v-if="isLoggedIn">
        <b-nav-item href="#">Link</b-nav-item>
        <b-nav-item href="#" disabled>Disabled</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav v-if="isLoggedIn" class="ml-auto">
        <!-- TEMPORARILY MUTING THE SEARCH BAR UNTIL IT'S FUNCTIONALITY AND DESIGN CAN BE FOCUSED ON  -->
        <!-- <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form> -->    

        <b-nav-item-dropdown v-if="isLoggedIn" right>
          <!-- Using 'button-content' slot -->
          <template slot="button-content"><em>{{currentUser}}</em></template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
import firebase from 'firebase' 

export default {
    name: 'navbar2',
    data() {
        return {
            isLoggedIn: false,
            currentUser: false
        }
    },
    created() {
        if(firebase.auth().currentUser){
            this.isLoggedIn = true;
            this.currentUser = firebase.auth().currentUser.displayName ?  firebase.auth().currentUser.displayName : firebase.auth().currentUser.email 
        }
    },
    methods: {
        logout: function(){
            firebase.auth().signOut().then( () => {
            this.$router.go({path: this.$router.path})
            })
        }
    }
}
</script>

<style scoped>
.float-left{
    margin-left:10px;
}
.email{
    padding-right:10px;
}
</style>
