<template>
  <ContentViewLayout>
    <template #header>
      <div class="flex flex-col justify-center mx-2">
        <h1 class="text-4xl font-bold">{{ head }}</h1>
        <p class="text-lg text-muted-foreground">{{ route.query.kw }}</p>
      </div>
    </template>

    <template #tabs>
      <div class="tabs">
        <Tabs :default-value="$route.query.type" class="w-full">
          <TabsList>
            <TabsTrigger value="all" @click="reSearch('all')">ALL</TabsTrigger>
            <TabsTrigger value="music" @click="reSearch('music')">音乐</TabsTrigger>
            <TabsTrigger value="album" @click="reSearch('album')">专辑</TabsTrigger>
            <TabsTrigger value="songlist" @click="reSearch('songlist')">歌单</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </template>

    <template #content>
      <div class="w-full flex flex-col flex-1 space-x-4 p-4 gap-4" v-if="searching">
        <Skeleton class="h-16 w-full rounded-xl" />
        <Skeleton class="h-16 w-full rounded-xl" />
        <Skeleton class="h-16 w-full rounded-xl" />
      </div>
      <div class="w-full flex flex-col flex-1" v-else>
        <AlbumCardContainer
          v-if="all_info.album?.albums"
          class="detail"
          :music_info_list="all_info.album.albums"
          :head="route.query.type === 'all' ? '专辑' : ''"
          layout="list"
        />
        <CardContainer
          v-if="all_info.song?.songs"
          class="detail"
          :music_info_list="all_info.song?.songs"
          :head="route.query.type === 'all' ? '音乐' : ''"
          layout="compact"
        />
        <SonglistCardContainer
          v-if="all_info.playList?.playLists"
          class="detail"
          :music_info_list="all_info.playList.playLists"
          :head="route.query.type === 'all' ? '歌单' : ''"
          layout="card"
        />
      </div>
    </template>
  </ContentViewLayout>
</template>

<script setup>
import CardContainer from "@/components/public/CardContainer.vue";
import AlbumCardContainer from "@/components/public/AlbumCardContainer.vue";
import SonglistCardContainer from "@/components/public/SonglistCardContainer.vue";
import songService from "@/services/songService.js";
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";
import { Skeleton } from "@/components/ui/skeleton";

const all_info = ref({});
const route = useRoute();

const searching = ref(true);
async function search(kw, type) {
  if (!kw) return;
  searching.value = true;
  console.log("搜索关键词:", kw, type);
  try {
    all_info.value = await songService.searchNetease(kw, 30, 0, type);
    searching.value = false;
    console.log("搜索结果:", all_info.value);
  } catch (error) {
    console.error("搜索失败:", error);
    all_info.value = {};
  }
}

function reSearch(type) {
  if (router.currentRoute.value.query.type === type) return;
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
