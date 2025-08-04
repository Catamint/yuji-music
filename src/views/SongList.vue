<template>
  <detail-layout>
    <template #header>
      <!-- <h1>专辑详情</h1> -->
      <img
        class="ratio-1-1 ml-2 mr-4 h-40 rounded-xl"
        :src="details?.coverImgUrl + '?param=300y300' || null"
        alt="艺术家封面"
      />
      <div class="h-full flex flex-col gap-4">
        <h1 class="text-4xl font-bold">
          {{ details?.name }}
        </h1>
        <div class="album-meta">{{ songList?.total }}<span> 首音乐</span></div>
      </div>
    </template>

    <template #tabs>
      <!-- 可以添加标签页内容 -->
    </template>

    <template #content>
      <card-container layout="compact" :music_info_list="songList.songs" />
    </template>
  </detail-layout>
</template>

<script>
import CardContainer from "@/components/public/CardContainer.vue";
import DetailLayout from "@/components/layout/DetailLayout.vue";
import songService from "@/services/songService.js";

export default {
  name: "songList",
  components: {
    CardContainer,
  },
  data() {
    return {
      details: {},
      songList: {},
    };
  },
  props: {
    id: {
      type: String,
      default: "",
    },
  },
  async created() {
    this.details = await songService.getPlaylistDetail(this.id);
    console.log("获取到的歌单详情:", this.details);
    this.songList = await songService.getSonglistContent(this.id);
    console.log("获取到的歌单信息:", this.songList);
  },
};
</script>
