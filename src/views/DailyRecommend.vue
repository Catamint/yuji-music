<template>
  <ContentViewLayout>
    <template #header>
      <div class="flex flex-col justify-center mx-2 gap-2">
        <h1 class="text-4xl font-bold">每日推荐</h1>
        <p class="">云 销 雨 霁， 彩 彻 区 明</p>
        <div class="flex mb-4 gap-2">
          <Button @click="playAll"> <Play20Regular /> 播放全部 </Button>
          <Button @click="fresh"> <ArrowSync24Filled /> 刷新 </Button>
        </div>
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
import TooltipButton from "@/components/layout/TooltipButton.vue";
import { Play20Regular, ArrowSync24Filled } from "@vicons/fluent";
import player2 from "@/stores/player2.js";
import { toast } from "vue-sonner";

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
function playAll() {
  console.log("播放全部操作");
  console.log("专辑歌曲列表:", DailyRecommend.value);
  try {
    player2.playMulti(DailyRecommend.value || []);
  } catch (error) {
    console.error("播放失败:", error);
    toast.error("播放失败,请检查网络连接");
  }
}
async function fresh() {
  try {
    DailyRecommend.value = await musicStore.freshDailyRecommend();
    toast.success("刷新成功");
  } catch (error) {
    console.error("刷新失败:", error);
    toast.error("刷新失败,请检查网络连接");
  }
}
onMounted(async () => {
  DailyRecommend.value = await getDailyRecommend();
});
</script>
