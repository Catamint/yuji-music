<template>
  <div class="container">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <PlayerControl />
  </div>
</template>

<script>

import HelloWorld from './components/HelloWorld.vue'
import PlayerControl from './components/PlayerControl.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    PlayerControl
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.container {
  width: 100vh;
  height: 100vh;
}
</style>
