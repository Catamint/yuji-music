<template>
  <ContentViewLayout :loading="loading">
    <template #header>
      <!-- <h1>专辑详情</h1> -->
      <album-header :album="album" />
    </template>

    <template #tabs>
      <!-- 可以添加标签页内容 -->
    </template>

    <template #content>
      <music-container layout="compact" :musicList="album?.musicList || []" />
    </template>
  </ContentViewLayout>
</template>

<script lang="ts">
import MusicContainer from "@/components/contents/MusicContainer.vue";
import ContentViewLayout from "@/components/layout/ContentViewLayout.vue";
import songService from "@/services/songService";
import AlbumHeader from "@/views/AlbumHeader.vue";

import type { Album } from "@/model";

export default {
  name: "album",
  components: {
    MusicContainer,
    AlbumHeader,
  },
  data() {
    return {
      album: {} as Album,
      loading: true,
    };
  },
  props: {
    id: {
      type: String,
      default: "",
    },
  },
  methods: {
    async getAlbum() {
      this.album = await songService.getAlbum(this.id) || {} as Album;
      console.log("获取到的专辑信息:", this.album);
    },
  },
  async created() {
    await this.getAlbum();
    this.loading = false;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
