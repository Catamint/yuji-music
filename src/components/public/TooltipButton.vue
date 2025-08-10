<template>
  <tooltip-provider>
    <tooltip>
      <tooltip-trigger
        class=""
        :style="`--icon-size: ${iconSize}px; max-width: ${4 + iconSize}px;`"
      >
        <Button
          class="press-active"
          variant="ghost"
          :style="`max-width: ${4 + iconSize}px;`"
          text
          @click="$emit('click')"
        >
          <span
            class="icon-wrapper inline-flex items-center justify-center w-[var(--icon-size)] h-[var(--icon-size)]"
          >
            <slot name="icon"></slot>
          </span>
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
    // 图标大小（默认 22）
    type: [Number, String],
    default: 22,
  },
});
</script>

<style scoped>
.icon-wrapper :deep(svg) {
  width: var(--icon-size);
  height: var(--icon-size);
}
</style>
