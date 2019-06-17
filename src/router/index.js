import Vue from 'vue'
import Router from 'vue-router'
import Feed from '@/components/Feed'
import EditCard from '@/components/EditCard'
import NewCard from '@/components/NewCard'
import Login from '@/components/Login'
import Register from '@/components/Register'
import firebase from 'firebase'


Vue.use(Router)

let router = new Router({
  routes: [
    {
      path:'/',
      name:'feed',
      component:Feed,
      meta: {
        requiresAuth:true
      }
    },
    {
      path:'/login',
      name:'login',
      component:Login,
      meta: {
        requiresGuest:true
      }
    },
    {
      path:'/register',
      name:'register',
      component:Register,
      meta:{
        requiresGuest:true
      }
    },
    {
      path:'/feed',
      name:'feed',
      component:Feed,
      meta: {
        requiresAuth:true
      }
    },
    {
      path:'/edit/:cardID',
      name:'editcard',
      component:EditCard,
      meta: {
        requiresAuth:true
      }
    },
    {
      path:'/new',
      name:'newcard',
      component:NewCard,
      meta: {
        requiresAuth:true
      }
    }

  ]
})

// Navigation Guards that depend on login/user state
router.beforeEach( (to, from, next) => {
  // Check for required authentication guard
  if(to.matched.some(record => record.meta.requiresAuth)){
    // Check if not logged in
    if(!firebase.auth().currentUser){
      // and if not logged in, go to the login page
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    } else {
      // proceed to route
      next()
    }
  } else if(to.matched.some(record => record.meta.requiresGuest)){
    // Check if logged in
    if(firebase.auth().currentUser){
      // and if logged in, go to the feed page
      next({
        path: '/',
        query: {redirect: to.fullPath}
      })
  } else {
    // proceed to route
    next()
  }
}})

export default router;