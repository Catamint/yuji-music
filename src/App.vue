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
  },
  setup(){
    return {

    }
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
  /* width: 100vw; */
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
}
.base-background-image {
  background-image: url(./assets/image/background.jpg);
  filter: saturate(1.5); /* 饱和度，与遮罩透明度搭配使用，避免遮罩后背景变灰 */
  background-size: cover;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
  z-index: -1;
  /* overflow: hidden; */
}
.n-icon{
  color:rgba(170, 40, 40, 0.64);
}
#app{
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  /* color: white; */
}
.n-card {
  background-color: rgba(255, 255, 255, 0.247);
  border: none ! important;
}

</style>
