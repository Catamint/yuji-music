<template>
    <HeaderLayout />
    <div class="container">
      <SidebarLayout />
      <div class="col-8"> <router-view></router-view> </div>
    </div>
    <Play v-show="utils.play_component.showing"/>
    <FooterLayout />

</template>

<script>

import FooterLayout from './layout/footer/FooterLayout.vue';
import HeaderLayout from './layout/header/HeaderLayout.vue';
import SidebarLayout from "./layout/sidebar/SidebarLayout.vue";
import Home from '../views/home/Home.vue';
import Play from './Play.vue';
import { utils } from '@/stores/utils';

export default {
  name: 'IndexView',
  components: {
    HeaderLayout,
    FooterLayout,
    SidebarLayout,
    Home,
    Play
  },
  data(){
    return {
      utils
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  display: flex;
  justify-content:space-between;
  flex: 1 1 auto;
}
.col-8 {
  display: flex;
  /* padding: 1%; */
  /* padding-left: 0; */
  width:100%;
}
</style>
