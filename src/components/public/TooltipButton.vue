<template>
  <n-tooltip trigger="hover" :keep-alive-on-hover="false" :show-arrow="false">
    <template #trigger>
      <n-button class="n-button" :class="class" text @click.stop="$emit('click')">
        <template #icon>
          <n-icon :size="iconSize">
            <component :is="iconComponent" />
          </n-icon>
        </template>
      </n-button>
    </template>
    {{ tooltip }}
  </n-tooltip>
</template>

<script setup>
import { computed } from 'vue'
import * as Icons from '@vicons/fluent'

const props = defineProps({
  icon: String,             // 图标名，如 "Play24Regular"
  tooltip: String,          // 提示文字
  class: String,            // 可选样式类
  iconSize: {               // 图标大小（默认 24）
    type: [Number, String],
    default: 24
  }
})

const iconComponent = computed(() => Icons[props.icon])
</script>

<style scoped>
.n-button {
    min-width: 24px;
}

</style>