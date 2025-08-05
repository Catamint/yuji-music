<template>
  <div class="album-header flex flex-col md:flex-row">
    <!-- 专辑封面 -->
    <img
      class="aspect-square mx-2 w-40 h-40 rounded-xl"
      :src="album?.picUrl || null"
      alt="专辑封面"
    />

    <!-- 信息区域 -->
    <div class="h-full flex flex-col gap-2 ml-2">
      <h1 class="text-4xl font-bold mb-2">
        {{ album?.name }}
        <span v-if="album?.translatedName" class="translated-name"></span>
      </h1>

      <div class="album-meta">
        <!-- <span>艺人：</span> -->
        <router-link class="artist-name" :to="`/artist/${album?.artist?.id}`">
          {{ album?.artist?.name }}
        </router-link>
      </div>

      <div class="album-meta">
        <!-- <span>发行时间：</span> -->
        {{ album?.publishDate }}
      </div>

      <!-- <div class="album-meta" v-if="album?.company">
        <span>发行公司：</span>
        {{ album?.company }}
      </div>

      <div class="album-meta" v-if="album?.type || album?.subType">
        <span>专辑类型：</span>
        {{ album?.type }}<span v-if="album?.subType"> / {{ album?.subType }}</span>
      </div> -->

      <!-- 描述 -->
      <!-- <div v-if="album?.briefDesc || album?.description" class="album-desc">
        <p>{{ album?.briefDesc || album?.description }}</p>
      </div> -->

      <!-- 操作统计 -->
      <div class="album-stats">
        <TooltipButton icon="Play20Regular" tooltipText="播放全部" @click="playAll">
          <template #icon>
            <Play20Regular />
          </template>
        </TooltipButton>
        <TooltipButton icon="Heart20Regular" tooltipText="收藏">
          <template #icon>
            <Heart20Regular />
          </template>
        </TooltipButton>
        <TooltipButton icon="Share20Regular" tooltipText="分享">
          <template #icon>
            <Share20Regular />
          </template>
        </TooltipButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import TooltipButton from "@/components/public/TooltipButton.vue"; // 根据你的路径调整
import { useRouter } from "vue-router";
import player2 from "@/stores/player2.js";
import { Play20Regular, Heart20Regular, Share20Regular } from "@vicons/fluent";

const props = defineProps({
  album: {
    type: Object,
    required: true,
  },
});

const playAll = async () => {
  console.log("播放全部操作");
  console.log("专辑歌曲列表:", props.album);
  await player2.playMulti(props.album.songs || []);
};

const toggleFavorite = () => {
  // TODO: 收藏/取消收藏逻辑
  console.log("收藏操作");
};
</script>

<style scoped>
.album-header {
  display: flex;
  gap: 20px;
  padding: 9px;
  /* background: linear-gradient(to right, #f9f9f9, #ffffff); */
  border-radius: 12px;
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
