<template>
  <CardContainer head="每日推荐" layout="list" :music_info_list="DailyRecommend" />
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useMusicStore } from "@/stores/musicStore";
import { useUserStore } from "@/stores/userStore";

const musicStore = useMusicStore();
const userStore = useUserStore();

const DailyRecommend = ref([]);

const getDailyRecommend = async () => {
  if (!userStore?.cookies) {
    console.log("未登录");
    return [];
  }
  try {
    const songs = await musicStore.getDailyRecommend();
    console.log("获取到的每日推荐歌曲:", songs);
    return songs;
  } catch (err) {
    console.error("获取每日推荐失败:", err);
    return [];
  }
};

onMounted(async () => {
  DailyRecommend.value = await getDailyRecommend();
});
</script>
