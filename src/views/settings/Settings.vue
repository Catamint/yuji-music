<template>
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
          :value="currentThemeKey"
          :options="themeStore.getThemeList()"
          placeholder="选择主题"
          @update:value="handleThemeChange"
        />
      </n-space>

      <!-- 背景模糊度设置 -->
      <n-space vertical>
        <span>背景模糊</span>
        <n-select
          :value="currentContainerBlur"
          :options="blurOptions"
          placeholder="模糊度"
          @update:value="handleBlurChange"
        />
      </n-space>

      <!-- 上传背景图片 -->
      <n-space vertical>
        <span>背景图片</span>
        <n-button 
          @click="setBackgroundImage" 
          type="primary" 
          secondary
        >
          上传背景图片
        </n-button>
      </n-space>

      <!-- 重置按钮 -->
      <n-space>
        <n-button @click="handleResetTheme" type="warning" secondary>
          重置为默认主题
        </n-button>
        <n-button 
          @click="handleDeleteCustomTheme" 
          type="error" 
          secondary
          :disabled="!hasCustomTheme"
        >
          删除自定义主题
        </n-button>
      </n-space>
    </n-space>
  </n-card>
</template>

<script>
import { NCard, NSelect, NSwitch, NSpace, NButton } from 'naive-ui';
import { computed, onMounted } from 'vue';
import { useThemeStore } from '@/stores/themeStore';

export default {
  name: 'Settings',
  components: {
    NCard,
    NSelect,
    NSwitch,
    NSpace,
    NButton,
  },
  setup() {
    const themeStore = useThemeStore();

    // 初始化默认主题
    onMounted(() => {
      if (!themeStore.currentTheme.key) {
        themeStore.setDefaultTheme();
      }
    });

    // 背景开关的计算属性
    const backgroundActive = computed({
      get: () => themeStore.currentTheme.backgroundActive || false,
      set: (value) => {
        themeStore.setBackgroundActive(value);
      },
    });

    // 当前主题 key 的计算属性
    const currentThemeKey = computed({
      get: () => themeStore.currentTheme.key || 'light',
      set: (value) => {
        themeStore.setTheme(value);
      }
    });

    // 当前容器模糊度的计算属性
    const currentContainerBlur = computed({
      get: () => themeStore.currentTheme.containerBlur || '0px',
      set: (value) => {
        themeStore.setContainerBlur(value);
      }
    });

    // 是否有自定义主题
    const hasCustomTheme = computed(() => {
      return themeStore.themes.custom !== undefined;
    });

    // 模糊度选项
    const blurOptions = [
      { label: '无模糊', value: '0px' },
      { label: '10px', value: '10px' },
      { label: '50px', value: '50px' },
      { label: '80px', value: '80px' },
      { label: '100px', value: '100px' }
    ];

    // 处理主题切换
    const handleThemeChange = (themeKey) => {
      themeStore.setTheme(themeKey);
    };

    // 处理模糊度切换
    const handleBlurChange = (blurValue) => {
      themeStore.setContainerBlur(blurValue);
    };

    // 处理重置主题
    const handleResetTheme = () => {
      themeStore.resetTheme();
    };

    // 处理删除自定义主题
    const handleDeleteCustomTheme = () => {
      themeStore.deleteCustomTheme();
    };
    
    // 设置背景图片
    const setBackgroundImage = () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            themeStore.setBackgroundImage(e.target.result);
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
    };
    return {
      themeStore,
      backgroundActive,
      currentThemeKey,
      currentContainerBlur,
      hasCustomTheme,
      blurOptions,
      handleThemeChange,
      handleBlurChange,
      handleResetTheme,
      handleDeleteCustomTheme,
      setBackgroundImage,
    };
  },
};
</script>

<style scoped>
/* 样式优化 */
.n-card {
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
}

.n-space {
  width: 100%;
}

.n-select {
  width: 100%;
}

.n-button {
  flex: 1;
}
</style>
