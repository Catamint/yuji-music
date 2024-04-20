<template>
    <HeaderLayout />
    <div class="container">
      <Home />
    </div>
    <FooterLayout />
</template>

<script>

import FooterLayout from './layout/footer/FooterLayout.vue';
import HeaderLayout from './layout/header/HeaderLayout.vue';
import Home from './views/home/Home.vue';

export default {
  name: 'IndexView',
  props: {
    msg: String
  },
  components: {
    HeaderLayout,
    FooterLayout,
    Home
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  display: flex;
  justify-content: center;
  flex: 1 1 auto;
}
</style>
