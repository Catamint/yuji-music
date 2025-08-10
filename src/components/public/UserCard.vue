<template>
  <div
    class="backdrop-blur-lg bg-card rounded-xl shadow p-4 flex items-center space-x-4 dark:backdrop-blur-none"
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
    <div class="flex-1 min-w-0">
      <div class="flex items-center space-x-2">
        <h2 class="text-lg font-semibold truncate">{{ user.nickname }}</h2>
        <span v-if="!short" class="text-xs text-gray-500">UID: {{ user.uid }}</span>
      </div>
      <p class="text-sm text-gray-500 truncate">
        {{ user.signature || "什么都没写~" }}
      </p>
      <div class="mt-1">
        <span class="px-2 py-0.5 text-xs bg-blue-100 text-blue-600 rounded-full">
          IP: {{ user.IP }}
        </span>
      </div>
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
