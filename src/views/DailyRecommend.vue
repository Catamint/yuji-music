<template>
  <ContentViewLayout>
    <template #header>
      <div class="flex flex-col justify-center mx-2">
        <h1 class="text-4xl font-bold">每日推荐</h1>
        <p class="">欲买桂花同载酒AAA徒步协会钟老板</p>
        <TooltipButton tooltipText="播放全部" @click="musicStore.playAll(DailyRecommend)">
          <template #icon>
            <Play20Regular />
          </template>
        </TooltipButton>
      </div>
    </template>
    <template #content>
      <CardContainer layout="list" :music_info_list="DailyRecommend" />
    </template>
  </ContentViewLayout>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useMusicStore } from "@/stores/musicStore";
import { useUserStore } from "@/stores/userStore";
import ContentViewLayout from "@/components/layout/ContentViewLayout.vue";
import CardContainer from "@/components/public/CardContainer.vue";
import TooltipButton from "@/components/public/TooltipButton.vue";
import { Play20Regular } from "@vicons/fluent";

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
