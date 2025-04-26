<template>
  <n-card :content-style="cardStyle">
    <img
      v-if="musicInfo.album_img"
      class="cover-img"
      :src="musicInfo.album_img"
      @click="onPlay"
    />
    <n-flex style="width: 100%; justify-content: space-between; padding-right: 10px;">
      <div class="text">
        <n-ellipsis style="font-size: 1.5rem; font-weight: bold;">
          {{ musicInfo.song_name }}
        </n-ellipsis>
        <span class="info" style="padding-left: 20px;">{{ musicInfo.author_name }}</span>
      </div>
      <n-flex>
        <slot name="actions">
          <n-button v-if="musicInfo.url" style="font-size: 15px" @click="onPlay">
            <template #icon>
              <n-icon><Play24Regular /></n-icon>
            </template>
            播放
          </n-button>
        </slot>
      </n-flex>
    </n-flex>
  </n-card>
</template>

<script>
import { NCard, NFlex, NButton, NIcon, NEllipsis } from 'naive-ui';
import { Play24Regular } from '@vicons/fluent';

export default {
  name: 'BaseMusicItem',
  props: {
    musicInfo: {
      type: Object,
      required: true,
    },
    cardStyle: {
      type: Object,
      default: () => ({
        padding: '0',
        display: 'flex',
        alignItems: 'center',
      }),
    },
  },
  methods: {
    onPlay() {
      this.$emit('play', this.musicInfo);
    },
  },
  mounted() {
    console.log(this.musicInfo);
  },
};
</script>

<style scoped>
.cover-img {
  height: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 12px;
  position: relative;
}

.text {
  display: flex;
  align-items: center;
  padding-left: 10px;
}

.text .info {
  font-size: medium;
  padding-left: 10px;
}
</style>