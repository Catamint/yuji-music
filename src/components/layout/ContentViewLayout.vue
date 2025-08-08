<!-- components/ContentViewLayout.vue -->
<template>
  <div class="flex flex-1 flex-col min-h-full w-full">
    <!-- 顶部信息 -->
    <div class="flex my-6">
      <slot name="header" />
    </div>

    <!-- 标签栏（可选） -->
    <div class="tabs w-full p-2 mb-2" v-if="$slots.tabs">
      <slot name="tabs" />
    </div>

    <!-- 主体内容 -->
    <div
      class="content w-full flex-1 shadow-2xl min-h-full shadow-black md:shadow-none dark:shadow-none rounded-t-3xl bg-card backdrop-blur-lg dark:backdrop-blur-none"
    >
      <slot name="content" />
    </div>
  </div>
</template>
