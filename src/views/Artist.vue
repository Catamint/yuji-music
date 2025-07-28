<template>
  <detail-layout>
    <template #header>
        <img
        class="album-cover"
        :src="artistBrief?.picUrl || null"
        alt="艺术家封面"
        />
        <div class="album-info">
            <h1 class="album-name">
                {{ artistBrief?.name }}
            </h1>
            <div class="album-meta">
                {{ artistBrief?.musicSize }}<span> 首音乐</span>
            </div>
            <div class="album-meta">
                {{ artistBrief?.albumSize }}<span> 张专辑 </span>
            </div>
        </div>
    </template>

    <template #tabs>
      <!-- 可以添加标签页内容 -->
    </template>
    
    <template #content>
      <album-card-container head="专辑" layout="card" :music_info_list="album" />
    </template>
  </detail-layout>
</template>

<script>
import AlbumCardContainer from "@/components/public/AlbumCardContainer.vue";
import DetailLayout from "@/components/layout/DetailLayout.vue";
import songService from "@/services/songService.js";

export default {
  name: 'artist',
  components: {
    AlbumCardContainer,
  },
  data(){
    return {
        artistBrief:[],
        album: [],
    }
  },
  props:{
    id: {
        type: String,
        default: '',
    }
  },
  async created() {
    this.artistBrief = await songService.getArtistBrief(this.id);
    this.album  = await songService.getArtistAlbums(this.id)
    console.log("获取到的艺术家信息:", this.artistDetail);
    console.log("获取到的艺术家专辑信息:", this.album);
    this.getMusic();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.album-header {
  display: flex;
  gap: 20px;
  padding: 24px;
  /* background: linear-gradient(to right, #f9f9f9, #ffffff); */
  border-radius: 12px;
}

.album-cover {
  width: 180px;
  height: 180px;
  border-radius: 8px;
  object-fit: cover;
}

.album-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.album-name {
  font-size: 24px;
  font-weight: bold;
}

.translated-name {
  font-size: 16px;
  /* color: #999; */
  margin-left: 8px;
}

.album-meta {
  font-size: 14px;
  /* color: #555; */
}

.artist-name {
  /* color: #42b983; */
  text-decoration: none;
}

.album-desc {
  font-size: 14px;
  /* color: #666; */
  line-height: 1.4;
  margin-top: 8px;
}

.album-stats {
  margin-top: 12px;
  display: flex;
  gap: 12px;
}
</style>
