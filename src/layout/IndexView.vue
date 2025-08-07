<template>
  <SidebarProvider class="md:grid md:grid-cols-[auto_1fr] min-h-dvh w-full">
    <AppSidebar />
    <div class="flex flex-1 flex-col min-w-0">
      <div
        class="pr-1 border-grid inline-flex items-center sticky top-0 z-50 w-full border-b backdrop-blur-lg glass-filter pt-[env(safe-area-inset-top)] box-border"
      >
        <HeaderLayout class="h-12 w-full" />
      </div>

      <div class="h-full w-full flex flex-1 justify-center py-4 md:py-6 lg:py-8">
        <div class="h-full w-full max-w-7xl box-border px-2 md:px-4">
          <router-view v-if="isRefreshFlag" v-slot="{ Component }">
            <transition name="slide-up">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </div>

      <div
        class="sticky bottom-0 h-15 md:h-15 z-50 w-full border-t backdrop-blur-lg glass-filter flex items-center justify-center"
      >
        <FooterDesektop class="hidden h-15 md:block pb-[env(safe-area-inset-bottom)]" />
        <FooterMobile class="md:hidden h-15 pb-[env(safe-area-inset-bottom)]" />
      </div>
    </div>
  </SidebarProvider>
</template>

<script>
import FooterDesektop from "@/layout/footerbar/FooterbarDesktop.vue";
import FooterMobile from "@/layout/footerbar/FooterbarMobile.vue";
import HeaderLayout from "@/layout/HeaderLayout.vue";
import AppSidebar from "@/layout/AppSidebar.vue";
import Play from "@/layout/Play.vue";
import { nextTick } from "vue";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
export default {
  name: "IndexView",
  components: {
    HeaderLayout,
    FooterDesektop,
    FooterMobile,
    AppSidebar,
    Play,
    SidebarProvider,
    SidebarTrigger,
  },
  data() {
    return {
      isRefreshFlag: true,
    };
  },
};
</script>

<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  /* Firefox */
  scrollbar-color: rgba(155, 155, 155, 0.5) transparent;
  /* Firefox */
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  /* Chrome, Edge, Safari */
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
