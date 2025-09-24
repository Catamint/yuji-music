<template>
  <ContentViewLayout>
    <template #header>
      <div class="flex flex-col justify-center mx-2">
        <h1 class="text-4xl font-bold">搜索结果</h1>
        <p class="text-lg text-muted-foreground">{{ route.query.kw }}</p>
      </div>
    </template>

    <template #tabs>
      <div class="tabs">
        <Tabs v-model="type" class="w-full">
          <TabsList>
            <TabsTrigger value="all">ALL</TabsTrigger>
            <TabsTrigger value="music">音乐</TabsTrigger>
            <TabsTrigger value="album">专辑</TabsTrigger>
            <TabsTrigger value="songlist">歌单</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </template>

    <template #content>
      <div class="w-full flex flex-col flex-1">
        <AlbumCardContainer
          v-if="results.album?.albums"
          class="detail"
          :music_info_list="results.album.albums"
          :head="type === 'all' ? '专辑' : ''"
          layout="list"
        />
        <CardContainer
          v-if="results.song?.songs"
          class="detail"
          :music_info_list="results.song?.songs"
          :head="type === 'all' ? '音乐' : ''"
          layout="compact"
        />
        <SonglistCardContainer
          v-if="results.playList?.playLists"
          class="detail"
          :music_info_list="results.playList.playLists"
          :head="type === 'all' ? '歌单' : ''"
          layout="card"
        />
      </div>
      <div class="w-full flex flex-col flex-1 space-x-4 p-4 gap-4" v-if="searching">
        <Skeleton class="h-12 w-full rounded-xl" />
        <Skeleton class="h-12 w-full rounded-xl" />
        <Skeleton class="h-12 w-full rounded-xl" />
      </div>
      <div ref="loadMoreRef"></div>
      <div v-if="!hasMore" class="text-center text-muted-foreground p-4">没有更多了</div>
    </template>
  </ContentViewLayout>
</template>

<script setup>
import CardContainer from "@/components/public/CardContainer.vue";
import AlbumCardContainer from "@/components/public/AlbumCardContainer.vue";
import SonglistCardContainer from "@/components/public/SonglistCardContainer.vue";
import songService from "@/services/songService.js";
import { ref, onMounted, onBeforeUnmount, watch, computed } from "vue";
import { useRoute } from "vue-router";
import { Skeleton } from "@/components/ui/skeleton";

const route = useRoute();
const searching = ref(false);

const kw = ref(route.query.kw || "");
const type = ref(route.query.type || "all");
const offset = ref(0); // 偏移
const limit = 30; // 每页数量

const results = ref({
  song: { songs: [], songCount: 0 },
  album: { albums: [], albumCount: 0 },
  playList: { playLists: [], playListCount: 0 },
});
const count = ref(-1); // 总数，-1 表示未知
const hasMore = computed(() => count.value > offset.value || count.value === -1);

async function search(reset = false) {
  if (searching.value) return;
  searching.value = true;

  if (reset) {
    offset.value = 0;
    results.value = {
      song: { songs: [], songCount: 0 },
      album: { albums: [], albumCount: 0 },
      playList: { playLists: [], playListCount: 0 },
    };
    count.value = -1;
  }
  if (!kw.value) return;

  console.log("搜索关键词:", kw.value, type.value);

  try {
    const res = await songService.searchNetease(
      kw.value,
      type.value,
      limit,
      offset.value
    );

    switch (type.value) {
      case "all":
        results.value = res;
        break;
      case "music":
        results.value.song.songs.push(...res.song.songs);
        count.value = res.song.songCount;
        break;
      case "album":
        results.value.album.albums.push(...res.album.albums);
        count.value = res.album.albumCount;
        break;
      case "songlist":
        results.value.playList.playLists.push(...res.playList.playLists);
        count.value = res.playList.playlistCount;
        break;
      default:
        console.warn("未知搜索类型:", type.value);
    }
    offset.value += limit;

    console.log("搜索结果:", results.value);
  } catch (error) {
    console.error("搜索失败:", error);
    toast.error("搜索失败,请检查网络连接");
    // results.value = {};
  } finally {
    searching.value = false;
  }
}

watch(
  () => route.query,
  (q) => {
    kw.value = q.kw || "";
    type.value = q.type || "all";
    console.log("路由查询参数变化:", q);
    search(true);
  },
  { immediate: true }
);

watch(type, () => {
  console.log("类型切换:", type.value);
  search(true);
});

function onScrollToBottom() {
  if (type.value === "all") {
    return;
  }
  if (!searching.value && hasMore.value) {
    console.log("加载更多, 当前页:", offset.value);
    search();
  }
}

const loadMoreRef = ref(null);
let observer;

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      onScrollToBottom();
    }
  });
  if (loadMoreRef.value) {
    observer.observe(loadMoreRef.value);
  }
});

onBeforeUnmount(() => {
  if (loadMoreRef.value) {
    observer.unobserve(loadMoreRef.value);
  }
});
</script>
