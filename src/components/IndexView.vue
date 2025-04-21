<template>
  <HeaderLayout v-show="!utils.play_component.showing" />
  <div class="container" v-show="!utils.play_component.showing">
    <SidebarLayout />
    <div class="col-8">
      <div class="model">
        <div class="col">
          <router-view v-if="isRefreshFlag" v-slot="{ Component }">
            <transition name="slide-up">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </div>
    </div>
  </div>
  <Transition name="slide">
    <Play v-show="utils.play_component.showing" />
  </Transition>
  <FooterLayout />
</template>

<script>
import FooterLayout from './footer/FooterLayout.vue';
import HeaderLayout from './header/HeaderLayout.vue';
import SidebarLayout from './sidebar/SidebarLayout.vue';
import Play from '@/views/play/Play.vue';
import { utils } from '@/stores/utils';
import { ref, nextTick, provide } from 'vue';

export default {
  name: 'IndexView',
  components: {
    HeaderLayout,
    FooterLayout,
    SidebarLayout,
    Play,
  },
  data() {
    return {
      utils,
      isRefreshFlag: true,
    };
  },
  methods: {
    reloadPage() {
      this.isRefreshFlag = false;
      nextTick(() => {
        this.isRefreshFlag = true;
      });
    },
  },
  provide() {
    return {
      reloadPage: this.reloadPage,
    };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  flex: 1 1 auto;
}

.col-8 {
  display: flex;
  width: 100%;
}

.model {
  position: relative;
  width: 100%;
}

.col {
  display: block;
  box-sizing: border-box;
  position: absolute;
  padding: 0 20px;
  border-top-left-radius: 20px;
  width: 100%;
  top: 0;
  bottom: 0;
}

@keyframes slideDown {
  0% {
    transform: translateY(0);
    opacity: 1;
  }

  100% {
    transform: translateY(100%);
    opacity: 0;
  }
}

@keyframes slideup {
  0% {
    transform: translateY(100%);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.slide-enter-active {
  animation: slideup 0.5s;
}

.slide-leave-active {
  animation: slideDown 0.5s;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
