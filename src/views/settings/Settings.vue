<template>
  <!-- <div class="settings">
    <button @click="themeStore.toggleTheme">切换主题</button>
  </div> -->
  <n-card title="设置" size="large" bordered>
    <n-space vertical size="large">
      <!-- 背景开关 -->
      <n-space align="center">
        <span>背景</span>
        <n-switch v-model:value="backgroundActive" />
      </n-space>

      <!-- 主题选择 -->
      <n-space vertical>
        <span>主题</span>
        <n-select
          :value="themeStore.currentTheme.key"
          :options="themeStore.getThemeList()"
          placeholder="选择主题"
          @update:value="themeStore.setTheme"
        />
      </n-space>

      <!-- 背景模糊度设置 -->
      <n-space vertical>
        <span>背景模糊</span>
        <n-select
          :value="themeStore.currentTheme.containerBlur"
          :options="[{ label: '0px', value: '0px' }, { label: '10px', value: '10px' }, { label: '50px', value: '50px' }, { label: '100px', value: '100px' }]"
          placeholder="模糊度"
          @update:value="themeStore.setContainerBlur"
        />
      </n-space>
    </n-space>
  </n-card>
</template>

<script>
import { NCard, NSelect, NSwitch, NSpace } from 'naive-ui';
import { ref, inject } from 'vue';
import { utils } from '@/stores/utils';
import { useThemeStore } from '@/stores/themeStore';
import { computed } from 'vue';

export default {
  name: 'Settings',
  components: {
    NCard,
    NSelect,
    NSwitch,
    NSpace,
  },
  inject: ["currentTheme", "themes"], // 从父组件注入 currentTheme 和 themes
  setup() {
    // 从父组件注入 currentTheme 和 themes
    let currentTheme = inject('currentTheme');
    const themes = inject('themes');

    // 当前选中的主题
    const selectedTheme = ref('light');

    // 主题选项
    const themeOptions = [
      { label: '浅色', value: 'light' },
      { label: '深色', value: 'dark' },
    ];

    // 切换主题
    const changeTheme = (value) => {
      currentTheme = themes[value];
    };

    const themeStore = useThemeStore();

    const backgroundActive = computed({
      get: () => themeStore.currentTheme.backgroundActive,
      set: (value) => {
        themeStore.currentTheme.backgroundActive = value;
      },
    });

    return {
      utils,
      selectedTheme,
      themeOptions,
      changeTheme,
      themeStore,
      backgroundActive,
    };
  },
};
</script>

<style scoped>
/* 样式优化 */
.n-card {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
}

.n-space {
  width: 100%;
}

.n-select {
  width: 100%;
}
</style>

<style>
.settings {
  padding: 20px;
}
</style>
