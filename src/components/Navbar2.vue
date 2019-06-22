<template >
    <div >
        <b-navbar toggleable="lg" type="dark" variant="primary" style="height:80px">
            <b-navbar-brand href="#">LogoBook</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav style="background:#007BFF;z-index:99;opacity:0.8">
            <b-navbar-nav>
                <b-nav-item href="#">Home</b-nav-item>
                <b-nav-item href="#" >Add a Card</b-nav-item>
                <b-nav-item href="#" >How it Works</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <!-- <b-nav-form>
                <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                </b-nav-form> -->

                

                <b-nav-item-dropdown  right>
                <!-- Using 'button-content' slot -->
                <template  slot="button-content"><em>{{currentUser}}</em></template>
                <b-dropdown-item  href="#">Profile</b-dropdown-item>
                <b-dropdown-item  v-on:click="logout">Sign Out<router-link to="/login" ></router-link></b-dropdown-item>
                
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
