<template>
  <n-card title="设置" size="large" bordered>
    <n-space vertical size="large">
      <!-- 背景开关 -->
      <n-space align="center">
        <span>背景</span>
        <n-switch v-model:value="utils.user_config.backgroundActive" />
      </n-space>

      <!-- 主题选择 -->
      <n-space vertical>
        <span>主题</span>
        <n-select
          v-model:value="selectedTheme"
          :options="themeOptions"
          placeholder="选择主题"
          @update:value="changeTheme"
        />
      </n-space>
    </n-space>
  </n-card>
</template>

<script>
import { NCard, NSelect, NSwitch, NSpace } from 'naive-ui';
import { ref, inject } from 'vue';
import { utils } from '@/stores/utils';

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
    const currentTheme = inject('currentTheme');
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

    return {
      utils,
      selectedTheme,
      themeOptions,
      changeTheme,
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
