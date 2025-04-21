<template>
  <n-config-provider abstract :theme-overrides="currentTheme.overrides">
    <n-global-style />
    <n-message-provider>
      <MessageApi />
    </n-message-provider>
    <div class="base-background-image" :style="{
      backgroundImage: `url(${currentTheme.backgroundImage})`,
      filter: `saturate(${currentTheme.backgroundSaturation})`,
    }"></div>
    <div class="base-container" :style="{
      backgroundColor: currentTheme.containerBackgroundColor,
      backdropFilter: `blur(${currentTheme.containerBlur})`,
    }">
      <IndexView />
    </div>
    <button class="theme-toggle" @click="toggleTheme">
      切换主题
    </button>
  </n-config-provider>
</template>

<script>
import IndexView from './components/IndexView.vue';
import { NConfigProvider, NMessageProvider, NGlobalStyle } from 'naive-ui';
import { utils } from './stores/utils';
import MessageApi from './stores/MessageApi.vue';

export default {
  name: 'App',
  components: {
    IndexView,
    NMessageProvider,
    NConfigProvider,
    MessageApi,
  },
  created() {
    this.utils.user_config.onFlush();
  },
  data() {
    return {
      utils,
      // 主题配置
      themes: {
        light: {
          backgroundImage: './src/assets/image/background.jpg', // 背景图片路径
          backgroundSaturation: 1.6, // 背景饱和度
          containerBackgroundColor: 'rgba(255, 255, 255, 0.6)', // 容器背景颜色
          containerBlur: '80px', // 容器模糊度
          iconColor: 'rgba(170, 40, 40, 0.64)', // 图标颜色
          overrides: {
            common: {
              primaryColor: 'rgba(170, 40, 40, 0.64)', // 主色
              primaryColorHover: 'rgba(220, 70, 70, 0.64)', // 主色悬停
              primaryColorPressed: 'rgba(170, 40, 40, 0.64)', // 主色按下
              textColor: '#333333', // 文本颜色
              textColorDisabled: '#BFBFBF', // 禁用文本颜色
              borderColor: 'rgba(170, 40, 40, 0.64)', // 边框颜色
              iconColor: 'rgba(170, 40, 40, 0.64)', // 图标颜色
              iconColorHover: 'rgba(170, 40, 40, 0.64)', // 图标悬停颜色
            },
            Button: {
              textColor: '#FFFFFF', // 按钮文本颜色
              color: 'rgba(170, 40, 40, 0.44)', // 按钮背景颜色
              colorHover: 'rgba(170, 40, 40, 0.64)', // 按钮悬停背景颜色
              colorPressed: 'rgba(170, 40, 40, 0.64)', // 按钮按下背景颜色
            },
            Menu: {
              itemColorActive: 'rgba(255, 77, 79, 0.1)', // 菜单项激活背景颜色
              textColor: '#333333', // 菜单文本颜色
              textColorActive: 'rgba(170, 40, 40, 0.64)', // 菜单激活文本颜色
              itemTextColorActive: '#rgba(170, 40, 40, 0.64)', // 子菜单激活文本颜色
              itemTextColorChildActive: 'rgba(170, 40, 40, 0.64)', // 子菜单激活文本颜色
            },
            Icon: {
              color: 'rgba(170, 40, 40, 0.64)', // 图标颜色
            },
            Empty: {
              textColor: '#999999', // 空状态文本颜色
            },
            Select: {
              peers: {
                InternalSelection: {},
              },
            }
          },
        },
        dark: {
          backgroundImage: './src/assets/image/background.jpg', // 背景图片路径
          backgroundSaturation: 2, // 背景饱和度
          containerBackgroundColor: 'rgba(15, 15, 15, 0.6)', // 容器背景颜色
          containerBlur: '100px', // 容器模糊度
          iconColor: 'rgba(225, 120, 120, 0.9)', // 图标颜色
          overrides: {
            common: {
              primaryColor: 'rgba(225, 120, 120, 0.9)', // 主色
              primaryColorHover: 'rgba(225, 120, 120, 0.6)', // 主色悬停
              primaryColorPressed: 'rgba(225, 120, 120, 0.9)', // 主色按下
              textColor: '#FFFFFF', // 文本颜色
              textColorDisabled: '#666666', // 禁用文本颜色
              borderColor: 'rgba(225, 120, 120, 0.9)', // 边框颜色
              iconColor: 'rgba(225, 120, 120, 0.3)', // 图标颜色
              iconColorHover: 'rgba(225, 120, 120, 0.6)', // 图标悬停颜色
            },
            Button: {
              textColor: '#FFFFFF', // 按钮文本颜色
              color: 'rgba(225, 120, 120, 0.3)', // 按钮背景颜色
              colorHover: 'rgba(225, 120, 120, 0.6)', // 按钮悬停背景颜色
              colorPressed: 'rgba(225, 120, 120, 0.9)', // 按钮按下背景颜色
            },
            Menu: {
              itemColorActive: 'rgba(255, 77, 79, 0.1)', // 菜单项激活背景颜色
              textColor: '#FFFFFF', // 菜单文本颜色
              textColorActive: 'rgba(225, 120, 120, 0.9)', // 菜单激活文本颜色
              itemTextColorActive: 'rgba(225, 120, 120, 0.9)', // 子菜单激活文本颜色
              itemTextColorChildActive: 'rgba(225, 120, 120, 0.9)', // 子菜单激活文本颜色
            },
            Icon: {
              color: 'rgba(225, 120, 120, 0.9)', // 图标颜色
            },
            Empty: {
              textColor: '#666666', // 空状态文本颜色
            },
            Select: {
              peers: {
                InternalSelection: {},
              },
            },
            // Input: {
            //   backgroundColor: 'rgba(255, 255, 255, 0)',
            // }
          },
        },
      },
      currentTheme: {}, // 当前主题
    };
  },
  mounted() {
    // 默认使用明亮主题
    this.currentTheme = this.themes.light;
  },
  provide() {
    return {
      currentTheme: this.currentTheme,
      themes: this.themes,
    };
  },
  methods: {
    toggleTheme() {
      // 切换主题
      this.currentTheme =
        this.currentTheme === this.themes.light
          ? this.themes.dark
          : this.themes.light;
    },
  },
};
</script>

<style>
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
  color: v-bind('currentTheme.iconColor');
}

#app {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.n-card {
  background-color: rgba(255, 255, 255, 0.247);
  border: none ! important;
}
</style>
