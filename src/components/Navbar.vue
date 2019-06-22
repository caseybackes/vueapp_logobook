<template>
    <nav>
        <div class="nav-wrapper blue">
            <div class="container">
                <router-link to="/" class="">
                    <div class="float-left mt-3 ml-auto" > <h2>LogoBook</h2></div> 
                </router-link>
                <ul class="right flex mr-4" >
                    <li v-if="isLoggedIn" ><span class="email"> Welcome, {{currentUser}}! </span></li>
                    <li v-if="isLoggedIn" ><router-link to="/">Feed</router-link></li>
                    <li v-if="isLoggedIn" ><router-link to="/mycards">My Cards</router-link></li>
                    <li v-if="!isLoggedIn"><router-link to="/login">Login</router-link></li>
                    <li v-if="!isLoggedIn"><router-link to="/register">Register</router-link></li>
                    <!-- <li v-if="isLoggedIn"><button v-on:click="logout" class="btn black">Logout</button></li> -->
                    <li v-if="isLoggedIn" v-on:click="logout"><router-link to="/login">Logout</router-link></li>
                </ul>
                
            </div>
        </div>
    </nav>
</template>

<script>
import firebase from 'firebase' 

export default {
    name: 'navbar',
    data() {
        return {
            isLoggedIn: false,
            currentUser: false,
            isPrincipal: false
        }
    },
    created() {
        if(firebase.auth().currentUser){
            this.isLoggedIn = true;
            // if user established a display name on registration, show it in the nav bar. Otherwise, show their registered email. 
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
*:hover{
    text-decoration: none;
    color: aliceblue;
}

</style>
