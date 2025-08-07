<!-- components/DetailLayout.vue -->
<template>
  <div class="flex flex-col">
    <!-- 顶部信息 -->
    <div class="flex my-8">
      <slot name="header" />
    </div>

    <!-- 标签栏（可选） -->
    <div class="tabs" v-if="$slots.tabs">
      <slot name="tabs" />
    </div>

    <!-- 主体内容 -->
    <div class="content rounded-t-4xl bg-card">
      <slot name="content" />
    </div>
  </div>
</template>
