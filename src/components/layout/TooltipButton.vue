<template>
  <tooltip-provider>
    <tooltip>
      <tooltip-trigger :style="`--icon-size: ${iconSize}px;`">
        <Button
          class="press-active aspect-square w-fit h-fit p-2"
          :variant="variant"
          text
          @click="$emit('click')"
        >
          <span class="icon-wrapper inline-flex items-center justify-center">
            <slot name="icon"></slot>
          </span>
        </Button>
      </tooltip-trigger>
      <tooltip-content>{{ tooltipText }}</tooltip-content>
    </tooltip>
  </tooltip-provider>
</template>

<script setup>
const props = defineProps({
  tooltipText: String, // 提示文字
  variant: {
    type: String,
    default: "ghost",
  }, // 可选样式类
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
