<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">{{ head + " : " + route.query.kw }}</h1>
    <CardContainer
      v-if="all_info.song?.songs || music_info_list.length"
      class="detail"
      :music_info_list="all_info.song?.songs || music_info_list"
      head="歌曲"
      layout="compact"
      @header-click="reSearch('music')"
    />
    <AlbumCardContainer
      v-if="all_info.album?.albums"
      class="detail"
      :music_info_list="all_info.album.albums"
      head="专辑"
      layout="card"
      @header-click="reSearch('album')"
    />
    <SonglistCardContainer
      v-if="all_info.playList?.playLists"
      class="detail"
      :music_info_list="all_info.playList.playLists"
      head="歌单"
      layout="card"
      @header-click="reSearch('songlist')"
    />
  </div>
</template>

<script setup>
import CardContainer from "@/components/public/CardContainer.vue";
import AlbumCardContainer from "@/components/public/AlbumCardContainer.vue";
import SonglistCardContainer from "@/components/public/SonglistCardContainer.vue";
import songService from "@/services/songService.js";
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";

const music_info_list = ref([]);
const all_info = ref({});
const route = useRoute();

async function search(kw, type) {
  if (!kw) return;

  console.log("搜索关键词:", kw, type);
  try {
    all_info.value = await songService.searchNetease(kw, 30, 0, type);
    // console.log("搜索结果:", all_info.value);
  } catch (error) {
    console.error("搜索失败:", error);
    all_info.value = {};
  }
}

function reSearch(type) {
  router.push({
    path: "/search",
    query: {
      kw: router.currentRoute.value.query.kw,
      type: type,
    },
  });
}

const props = defineProps({
  head: {
    type: String,
    default: "搜索结果",
  },
});

onMounted(() => {
  if (route.query.kw) {
    search(route.query.kw, route.query.type);
  }
});

watch(
  () => route.query,
  (newQuery, oldQuery) => {
    // 查询参数变化时，重新执行搜索逻辑
    search(route.query.kw, route.query.type);
  },
  { immediate: true }
);
</script>
