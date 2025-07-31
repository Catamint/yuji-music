<template>
  <SidebarProvider class="flex h-screen">
    <AppSidebar/>
    <div class="flex flex-1 flex-col min-h-full">
      <div class="h-18 pr-1 border-grid inline-flex items-center sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" >

        <HeaderLayout class="w-full" />
      </div>      

      <div class="h-full w-full py-6 lg:py-8 overflow-y-auto custom-scrollbar">
          <router-view v-if="isRefreshFlag" v-slot="{ Component }">          
        <transition name="slide-up">
          <component :is="Component" />
        </transition>
          </router-view>
      </div>

      <div class="h-26 sticky bottom-0 z-[999] w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <FooterLayout />
      </div>   
    </div>
  </SidebarProvider>

  <!-- Play 浮层 -->
  <transition name="slide">
    <div
      v-show="utils.play_component.showing"
      class="fixed inset-0 z-[1000] flex items-center justify-center pointer-events-none"
      style="background: transparent;"
    >
      <div class="pointer-events-auto">
        <Play />
      </div>
    </div>
  </transition>
</template>

<script>
import FooterLayout from '@/components/footer/FooterLayout.vue';
import HeaderLayout from '@/layout/HeaderLayout.vue';
import AppSidebar from '@/layout/AppSidebar.vue';
import Play from '@/views/play/Play.vue';
import { utils } from '@/stores/utils';
import { nextTick } from 'vue';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { NScrollbar } from 'naive-ui';
export default {
  name: 'IndexView',
  components: {
    HeaderLayout,
    FooterLayout,
    AppSidebar,
    Play,
    SidebarProvider, 
    SidebarTrigger,
    NScrollbar,
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
.custom-scrollbar {
  scrollbar-width: thin;  /* Firefox */
  scrollbar-color: rgba(155, 155, 155, 0.5) transparent;  /* Firefox */
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;  /* Chrome, Edge, Safari */
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(155, 155, 155, 0.5);
  border-radius: 3px;
  opacity: 0;
  transition: opacity 0.2s;
}

.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  opacity: 1;
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
