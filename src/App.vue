<template>
    <!-- <div v-if="themeStore.currentTheme.backgroundActive" class="base-background-image" :style="{

      filter: `saturate(${themeStore.currentTheme.backgroundSaturation})`,
    }"></div> -->
    <div class="base-background-image bg-background font-misans relative flex min-h-svh flex-col overflow-hidden" 
    :style="
      themeStore.currentTheme.backgroundActive ? { backgroundImage: `url(${themeStore.currentTheme.backgroundImage})` } : {},
      {backdropFilter: `blur(${themeStore.currentTheme.containerBlur})`}
    ">
      <IndexView />
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
    </div>
</template>

<script setup>
import IndexView from '@/layout/IndexView.vue';
import { useThemeStore } from './stores/themeStore';
import MessageApi from './stores/MessageApi.vue';
import player2 from './stores/player2';
import { utils } from '@/stores/utils';
// import StorageManager from './stores/StorageManager';

const themeStore = useThemeStore();
// const storageManager = new StorageManager();
utils.initUtils(); // 初始化工具
themeStore.initDefaultTheme(); // 设置默认主题
player2.initAudio();

</script>

<style>

/* @import url('https://cdn.jsdelivr.net/npm/misans@4.1.0/lib/Normal/MiSans-Medium.min.css'); */
@import "@/index.css";

.base-background-image {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
  z-index: -1;
  background-size: cover; /* 背景图片覆盖容器 */
  background-repeat: no-repeat; /* 防止背景重复 */
  background-position: center; /* 背景居中显示 */
}

.n-icon {
  color: v-bind('themeStore.currentTheme.iconColor');
}

</style>
