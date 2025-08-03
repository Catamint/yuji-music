<template>
  <tooltip-provider>
    <tooltip>
      <tooltip-trigger>
        <Button
          class="max-w-[28px]"
          variant="ghost"
          :class="class"
          text
          @click.stop="$emit('click')"
        >
          <n-icon v-if="icon" :size="iconSize">
            <component :is="iconComponent" />
          </n-icon>
          <n-icon v-else :size="iconSize">
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
import * as Icons from "@vicons/fluent";
// import { Tooltip } from "../ui/tooltip";

const props = defineProps({
  icon: String, // 图标名，如 "Play24Regular"
  tooltipText: String, // 提示文字
  class: String, // 可选样式类
  iconSize: {
    // 图标大小（默认 24）
    type: [Number, String],
    default: 24,
  },
});

const iconComponent = computed(() => Icons[props.icon]);
</script>

<style scoped>
.n-button {
  min-width: 24px;
}
</style>
