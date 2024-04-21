<template>
    <HeaderLayout />
    <div class="container">
      <div class="col-2"><SidebarLayout /></div>
      <div class="col-8"> <router-view></router-view> </div>
    </div>
    <FooterLayout />
</template>

<script>

import FooterLayout from './layout/footer/FooterLayout.vue';
import HeaderLayout from './layout/header/HeaderLayout.vue';
import SidebarLayout from "./layout/sidebar/SidebarLayout.vue";
import Home from '../views/home/Home.vue';

export default {
  name: 'IndexView',
  props: {
    msg: String
  },
  components: {
    HeaderLayout,
    FooterLayout,
    SidebarLayout,
    Home
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
.col-2 {
  display: flex;
  width: 20%;
}
.col-8 {
  display: flex;
  width:100%;
}
</style>
