<template>
  <ContentViewLayout>
    <template #header>
      <img
        class="ratio-1-1 mr-4 h-40 rounded-xl"
        :src="artistBrief?.picUrl || null"
        alt="艺术家封面"
      />
      <div class="h-full flex flex-col gap-2">
        <h1 class="text-4xl font-bold mb-2">
          {{ artistBrief?.name }}
        </h1>
        <div class="album-meta">{{ artistBrief?.musicSize }}<span> 首音乐</span></div>
        <div class="album-meta">{{ artistBrief?.albumSize }}<span> 张专辑 </span></div>
      </div>
    </template>

    <template #tabs>
      <!-- 可以添加标签页内容 -->
    </template>

    <template #content>
      <album-card-container head="专辑" layout="card" :music_info_list="album" />
    </template>
  </ContentViewLayout>
</template>

<script>
import AlbumCardContainer from "@/components/public/AlbumCardContainer.vue";
import ContentViewLayout from "@/components/layout/ContentViewLayout.vue";
import songService from "@/services/songService.js";

export default {
  name: "artist",
  components: {
    AlbumCardContainer,
  },
  data() {
    return {
      artistBrief: [],
      album: [],
    };
  },
  props: {
    id: {
      type: String,
      default: "",
    },
  },
  async created() {
    this.artistBrief = await songService.getArtistBrief(this.id);
    this.album = await songService.getArtistAlbums(this.id);
    console.log("获取到的艺术家信息:", this.artistDetail);
    console.log("获取到的艺术家专辑信息:", this.album);
    this.getMusic();
  },
};
</script>
