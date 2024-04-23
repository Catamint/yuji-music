<template>
    <div class="base-background-image"></div>
    <div class="base-container">
      <IndexView />
    </div>

    <!-- <PlayList /> -->

</template>

<script>

import { NMessageProvider, NConfigProvider } from "naive-ui";
import IndexView from './components/IndexView.vue';
// import MessageApi from "./stores/MessageApi";
// import PlayList from './components/layout/footer/PlayList.vue';

export default {
  name: 'App',
  components: {
    IndexView
    // PlayList
  }
}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
.base-container {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.5);
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;

}
.base-background-image {
  background-image: url(./assets/image/background.jpg);
  background-size: cover;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
  z-index: -1;
}
.n-icon{
  color:rgba(197, 255, 231, 0.64);
}
#app{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: white;
}
</style>
