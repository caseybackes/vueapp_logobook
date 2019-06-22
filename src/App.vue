<template>
  <div id="app">
    <Navbar2 />
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Navbar2 from './components/Navbar2'
export default {
  name: 'App',
  components : {
    Navbar,
    Navbar2
  }
}
</script>


