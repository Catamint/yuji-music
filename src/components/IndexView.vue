<template>
  <HeaderLayout />
  <div class="container">
    <SidebarLayout />
    <div class="col-8">
      <div class="model">
        <div class="col">
          <n-scrollbar>
            <!-- <keep-alive include="/"> -->
            <router-view v-if="isRefreshFlag"></router-view>
            <!-- </keep-alive> -->
          </n-scrollbar>
        </div>
      </div>
    </div>
  </div>
  <Play v-show="utils.play_component.showing" />
  <FooterLayout />

</template>

<script>

import FooterLayout from './layout/footer/FooterLayout.vue';
import HeaderLayout from './layout/header/HeaderLayout.vue';
import SidebarLayout from "./layout/sidebar/SidebarLayout.vue";
import Home from '../views/home/Home.vue';
import Play from '@/views/Play.vue';
import { utils } from '@/stores/utils';
import { NScrollbar } from 'naive-ui';
import {ref, nextTick, provide} from "vue";

export default {
  name: 'IndexView',
  components: {
    HeaderLayout,
    FooterLayout,
    SidebarLayout,
    Home,
    Play,
    NScrollbar
  },
  data() {
    return {
      utils,
      isRefreshFlag: true
    }
  },
  methods: {
    reloadPage() {
      this.isRefreshFlag = false
      nextTick(() => {
        this.isRefreshFlag = true
      })
    }
  },
  provide(){
    return {
      reloadPage: this.reloadPage
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  flex: 1 1 auto;
}

.col-8 {
  display: flex;
  /* padding: 1%; */
  /* padding-left: 0; */
  width: 100%;
}

.model {
  position: relative;
  top: 0;
  bottom: 0;
  width: 100%;
}

.col {
  display: block;
  box-sizing: border-box;
  position: absolute;
  /* background-color: rgba(255, 255, 255, 0.352); */
  padding-left: 20px;
  padding-right: 20px;
  /* border-radius: 20px; */
  border-top-left-radius: 20px;
  width: 100%;
  top: 0;
  bottom: 0;
  overflow: auto;
}
</style>
