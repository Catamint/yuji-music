<template>
  <Toaster class="font-misans" />
  <!-- 背景图片 -->
  <div
    v-if="themeStore.currentTheme.backgroundActive"
    class="fixed inset-0 h-dvh -z-10 base-background-image background-filter"
    :style="{
      backgroundImage: `url(${themeStore.currentTheme.backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }"
  >
    <div
      class="bg-body-background inset-0 h-dvh background-filter"
      :style="{ backdropFilter: `blur(${themeStore.currentTheme.containerBlur})` }"
    ></div>
  </div>

  <!-- 主体 -->
  <IndexView class="font-misans" />

  <!-- Play 浮层 -->
  <transition
    name="slide"
    class="font-misans z-[100] pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
  >
    <div
      v-if="uiStore.isPlayerPageVisible"
      class="fixed inset-0 h-dvh w-screen flex items-center justify-center pointer-events-none"
    >
      <Play />
    </div>
  </transition>
  <PlayListContainer class="fixed z-[5000]" />
</template>

<script setup>
import IndexView from "@/layout/IndexView.vue";
import player2 from "./stores/player2";
import { useThemeStore } from "./stores/themeStore";
import { useUiStore } from "./stores/uiStore";
import Play from "./layout/Play.vue";
import { Toaster } from "@/components/ui/sonner";
import "vue-sonner/style.css";
import { App as CapApp } from "@capacitor/app";
import { onBeforeUnmount, onMounted } from "vue";
import { useMusicStore } from "./stores/musicStore";
import { useSidebar } from "./components/ui/sidebar";
import { useMediaQuery } from "@vueuse/core";
import { useRouter } from "vue-router";
import PlayListContainer from "./components/playlist/PlayListContainer.vue";
import { useColorMode } from "@vueuse/core";
// import StorageManager from './stores/StorageManager';

const uiStore = useUiStore();
const themeStore = useThemeStore();
// 设置颜色模式
const mode = useColorMode();
function setColorMode() {
  mode.value = "dark";
}
const musicStore = useMusicStore();
const router = useRouter();
// const storageManager = new StorageManager();

themeStore.initDefaultTheme(); // 设置默认主题
player2.initAudio();

onMounted(() => {
  CapApp.addListener("backButton", ({ canGoBack }) => {
    if (uiStore.isContextListOpen) {
      // uiStore.toggleContextList(); // 上下文菜单 暂缓
      return;
    } else if (uiStore.isPlayListVisible) {
      uiStore.togglePlayList(false);
      return;
    } else if (uiStore.isPlayerPageVisible) {
      uiStore.togglePlayerPage();
      return;
    } else if (useMediaQuery("(max-width: 768px)").value && uiStore.isSidebarOpenMobile) {
      uiStore.toggleSidebar();
      return;
    } else if (router.currentRoute.value.name !== "home") {
      router.back();
      return;
    } else {
      // 例如显示退出确认对话框，或者直接退出应用
      CapApp.minimizeApp();
    }
  });
  musicStore.initLikeList();
});

onBeforeUnmount(() => {
  CapApp.removeAllListeners();
});
</script>

<style>
/* @import url('https://cdn.jsdelivr.net/npm/misans@4.1.0/lib/Normal/MiSans-Medium.min.css'); */
@import "@/index.css";

.base-background-image {
  /* top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  z-index: -1; */
  background-size: cover; /* 背景图片覆盖容器 */
  background-repeat: no-repeat; /* 防止背景重复 */
  background-position: center; /* 背景居中显示 */
}

.n-icon {
  color: v-bind("themeStore.currentTheme.iconColor");
}

.box {
  /* backdrop-filter: blur(20px); */
  height: 100%;
  width: 100%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  z-index: 9;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out;
}

/* 进入时的起始状态和离开时的结束状态 */
.slide-enter-from,
.slide-leave-to {
  transform: translateY(100%);
}

/* 进入时的结束状态和离开时的起始状态 */
.slide-enter-to,
.slide-leave-from {
  transform: translateY(0);
}
</style>
