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
    <div
      class="content shadow-2xl shadow-black md:shadow-none dark:shadow-none rounded-t-3xl bg-card backdrop-blur-lg dark:backdrop-blur-none"
    >
      <slot name="content" />
    </div>
  </div>
</template>
