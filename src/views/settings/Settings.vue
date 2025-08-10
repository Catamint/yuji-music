<template>
  <ContentViewLayout>
    <template #header>
      <h1 class="text-4xl font-bold p-4 mb-8">设置</h1>
    </template>
    <template #content>
      <div class="flex flex-col p-4 gap-4 w-full">
        <!-- 背景开关 -->
        <div class="flex items-center justify-between w-full gap-2">
          <span>背景</span>
          <Switch v-model="backgroundActive" />
        </div>

        <!-- 主题选择 -->
        <div class="flex items-center justify-between w-full gap-2">
          <span>主题</span>
          <Select @update:modelValue="setColorMode" class="w-full">
            <SelectTrigger>
              <SelectValue :placeholder="mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="auto"> 跟随系统 </SelectItem>
                <SelectItem value="light"> 浅色 </SelectItem>
                <SelectItem value="dark"> 深色 </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <!-- 背景模糊度设置 -->
        <div class="flex items-center justify-between w-full gap-2">
          <span>背景模糊</span>
          <Select class="w-full" @update:modelValue="handleBlurChange">
            <SelectTrigger>
              <SelectValue :placeholder="currentContainerBlur" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>模糊度 (px)</SelectLabel>
                <SelectItem value="0px"> 0px </SelectItem>
                <SelectItem value="10px"> 10px </SelectItem>
                <SelectItem value="50px"> 50px </SelectItem>
                <SelectItem value="80px"> 80px </SelectItem>
                <SelectItem value="100px"> 100px </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <!-- 上传背景图片 -->
        <div class="grid grid-cols-1 gap-2">
          <Label for="picture">背景图片</Label>
          <Button @click="setBackgroundImage" id="picture" type="file"> 上传图片 </Button>
        </div>

        <!-- 重置按钮 -->
        <div class="grid grid-cols-1 gap-2">
          <Button @click="handleResetTheme" type="warning" secondary>
            重置为默认主题
          </Button>
          <Button
            @click="handleDeleteCustomTheme"
            type="error"
            secondary
            :disabled="!hasCustomTheme"
          >
            删除自定义主题
          </Button>
        </div>
      </div>
    </template>
  </ContentViewLayout>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useThemeStore } from "@/stores/themeStore";
// import Switch from "@/components/ui/switch/Switch.vue";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useColorMode } from "@vueuse/core";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const themeStore = useThemeStore();

// 初始化默认主题
onMounted(() => {
  if (!themeStore.currentTheme.key) {
    themeStore.initDefaultTheme();
  }
});

// 背景开关的计算属性
const backgroundActive = computed({
  get: () => themeStore.currentTheme.backgroundActive || false,
  set: (value) => {
    themeStore.setBackgroundActive(value);
  },
});

// 当前容器模糊度的计算属性
const currentContainerBlur = computed({
  get: () => themeStore.currentTheme.containerBlur || "0px",
  set: (value) => {
    themeStore.setContainerBlur(value);
  },
});

// 是否有自定义主题
const hasCustomTheme = computed(() => {
  return themeStore.themes.custom !== undefined;
});

// 模糊度选项
const blurOptions = [
  { label: "无模糊", value: "0px" },
  { label: "10px", value: "10px" },
  { label: "50px", value: "50px" },
  { label: "80px", value: "80px" },
  { label: "100px", value: "100px" },
];

// 设置颜色模式
const mode = useColorMode();
function setColorMode(modeToSet) {
  mode.value = modeToSet;
}

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
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
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
