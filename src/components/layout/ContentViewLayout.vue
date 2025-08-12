<!-- components/ContentViewLayout.vue -->
<template>
  <div v-if="loading" class="flex flex-1 flex-col min-h-full w-full p-1">
    <!-- 顶部信息 -->
    <div class="flex w-full mt-8 gap-2 my-8">
      <Skeleton class="h-32 w-32 rounded-xl" />
      <Skeleton class="h-32 flex-1 rounded-xl" />
    </div>
    <!-- 主体内容 -->
    <div class="content flex flex-col gap-4 w-full flex-1">
      <Skeleton class="h-16 w-full rounded-xl" />
      <Skeleton class="h-16 w-full rounded-xl" />
      <Skeleton class="h-16 w-full rounded-xl" />
    </div>
  </div>

  <div v-else class="flex flex-1 flex-col min-h-full w-full">
    <!-- 顶部信息 -->
    <div class="flex w-full mt-8 mb-2 p-2 box-border">
      <slot name="header" />
    </div>

    <!-- 标签栏（可选） -->
    <div class="tabs w-full p-2 mb-2" v-if="$slots.tabs">
      <slot name="tabs" />
    </div>

    <!-- 主体内容 -->
    <div
      class="content w-full flex-1 shadow-2xl min-h-full shadow-black md:shadow-none dark:shadow-none rounded-t-3xl backdrop-saturate-150 dark:backdrop-saturate-100 bg-card backdrop-blur-lg dark:backdrop-blur-none"
    >
      <slot name="content" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  loading: { type: Boolean, default: false },
});
</script>
