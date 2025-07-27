<template>
  <n-config-provider abstract :theme-overrides="themeStore.currentTheme.overrides">
    <n-global-style />
    <n-message-provider>
      <MessageApi />
    </n-message-provider>
    <div v-if="themeStore.currentTheme.backgroundActive" class="base-background-image" :style="{
      backgroundImage: `url(${themeStore.currentTheme.backgroundImage})`,
      filter: `saturate(${themeStore.currentTheme.backgroundSaturation})`,
    }"></div>
    <div class="base-container" :style="{
      backgroundColor: themeStore.currentTheme.containerBackgroundColor,
      backdropFilter: `blur(${themeStore.currentTheme.containerBlur})`,
    }">
      <IndexView />
    </div>
  </n-config-provider>
</template>

<script>
import IndexView from './components/IndexView.vue';
import { useThemeStore } from './stores/themeStore';
import { NConfigProvider, NMessageProvider, NGlobalStyle } from 'naive-ui';
import MessageApi from './stores/MessageApi.vue';
import player2 from './stores/player2';

export default {
  name: 'App',
  components: {
    IndexView,
    NMessageProvider,
    NConfigProvider,
    MessageApi,
  },
  setup() {
    const themeStore = useThemeStore();
    themeStore.setDefaultTheme(); // 设置默认主题
    player2.initAudio();
    return { themeStore };
  },
};
</script>

<style>

@import url('https://cdn.jsdelivr.net/npm/misans@4.1.0/lib/Normal/MiSans-Medium.min.css');

.base-container {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}

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

.theme-toggle {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.theme-toggle:hover {
  background-color: #0056b3;
}

.n-icon {
  color: v-bind('themeStore.currentTheme.iconColor');
}

#app {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.n-card {
  background-color: rgba(255, 255, 255, 0.247);
  border: none ! important;
}
</style>
