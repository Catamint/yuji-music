<template>
  <tooltip-provider>
    <tooltip>
      <tooltip-trigger>
        <Button
          class="max-w-[28px] press-active"
          variant="ghost"
          :class="class"
          text
          @click="$emit('click')"
        >
          <n-icon :size="iconSize">
            <slot name="icon"></slot>
          </n-icon>
        </Button>
      </tooltip-trigger>
      <tooltip-content>{{ tooltipText }}</tooltip-content>
    </tooltip>
  </tooltip-provider>
</template>

<script setup>
import { computed } from "vue";
// import { Tooltip } from "../ui/tooltip";

const props = defineProps({
  tooltipText: String, // 提示文字
  class: String, // 可选样式类
  iconSize: {
    // 图标大小（默认 24）
    type: [Number, String],
    default: 24,
  },
});
</script>

<style scoped>
.n-button {
  min-width: 24px;
}
</style>
