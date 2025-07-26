<!-- components/DetailLayout.vue -->
<template>
  <n-scrollbar>
    <div class="detail-layout">
        <!-- 顶部信息 -->
        <div class="header">
        <slot name="header" />
        </div>

        <!-- 标签栏（可选） -->
        <div class="tabs" v-if="$slots.tabs">
        <slot name="tabs" />
        </div>

        <!-- 主体内容 -->
        <div class="content">
        <slot name="content" />
        </div>
    </div>
  </n-scrollbar>
</template>

<style scoped>
.detail-layout {
  display: flex;
  flex-direction: column;
}
.header {
  display: flex;
  gap: 20px;
  padding: 24px;
  border-radius: 12px;
}
.content {
  padding: 16px;
}
</style>
