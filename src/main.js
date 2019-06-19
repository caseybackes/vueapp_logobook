// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import BootstrapVue from 'bootstrap-vue'

import './components/firebaseInit'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue  )
Vue.config.productionTip = false

let app;
firebase.auth().onAuthStateChanged(user => {
  if(!app){
    app = new Vue ({
      el: '#app',
      router, 
      components: { App },
      template: '<App/>'
    })
  }
})
