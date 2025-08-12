<template>
  <div
    class="backdrop-blur-lg bg-card backdrop-saturate-150 dark:backdrop-saturate-100 rounded-xl shadow p-4 flex items-center space-x-4 dark:backdrop-blur-none"
  >
    <!-- 头像 -->
    <div class="flex-shrink-0">
      <img
        :src="user.avatarUrl"
        alt="avatar"
        class="w-16 h-16 rounded-full object-cover border border-gray-200"
      />
    </div>

    <!-- 用户信息 -->
    <div class="flex-1 min-w-0 gap-2">
      <div class="flex items-center space-x-2">
        <h2 class="text-lg font-semibold truncate">{{ user.nickname }}</h2>
        <span v-if="!short" class="text-xs text-gray-500">UID: {{ user.uid }}</span>
      </div>
      <p v-if="!short" class="text-sm text-gray-500 truncate overflow-ellipsis">
        {{ user.signature || "悄悄地路过, 什么都没写~" }}
      </p>
      <p
        class="px-2 py-0.5 text-xs bg-blue-100 text-blue-600 rounded-full truncate overflow-ellipsis max-w-fit"
      >
        IP: {{ user.IP }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  user: {
    type: Object,
    required: true,
    default: () => ({
      avatarUrl: "",
      nickname: "",
      signature: "",
      IP: "未知", // 时间戳
      uid: "",
    }),
  },
  short: {
    type: Boolean,
    default: false,
  },
});

// 注册天数计算
const registerDays = computed(() => {
  if (!props.user.createTime) return 0;
  const days =
    (Date.now() - new Date(props.user.createTime).getTime()) / (1000 * 60 * 60 * 24);
  return Math.floor(days);
});
</script>
