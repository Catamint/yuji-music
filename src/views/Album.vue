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
      <card-container layout="compact" :music_info_list="music_info_list" />
    </template>
  </ContentViewLayout>
</template>

<script>
import CardContainer from "@/components/public/CardContainer.vue";
import ContentViewLayout from "@/components/layout/ContentViewLayout.vue";
import songService from "@/services/songService.js";
import AlbumHeader from "@/views/AlbumHeader.vue";

export default {
  name: "album",
  components: {
    CardContainer,
    AlbumHeader,
  },
  data() {
    return {
      album: [],
      music_info_list: [],
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
    async getMusic() {
      try {
        this.music_info_list = this?.album?.songs || [];
      } catch (error) {
        console.error("Error fetching music:", error.message);
      }
    },
    async getAlbum() {
      this.album = await songService.getAlbum(this.id);
    },
  },
  async created() {
    await this.getAlbum();
    this.getMusic();
    this.loading = false;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
