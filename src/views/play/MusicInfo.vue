<template>
  <div class="flex flex-col sm:flex-row items-center sm:justify-between p-4 gap-4 rounded-2xl bg-white/70 dark:bg-neutral-800 shadow-md w-full">
    <!-- 左侧歌曲信息 -->
    <div class="flex items-center gap-4 w-full sm:w-auto">
      <!-- 专辑图 -->
      <img
        v-if="playlistNotNull"
        :src="songOnPlay.album_img"
        alt="Album"
        class="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover"
      />
      <!-- 歌曲标题与歌手 -->
      <div class="flex flex-col truncate">
        <h1 class="text-lg font-semibold truncate text-gray-800 dark:text-gray-100">
          {{ playlistNotNull ? songOnPlay.song_name : "正在播放" }}
        </h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 truncate">
          {{ playlistNotNull ? songOnPlay.author_name : "歌手" }}
        </p>
      </div>
    </div>

    <!-- 右侧操作按钮 -->
    <div class="flex gap-3">
      <n-button quaternary circle size="large">
        <template #icon>
          <n-icon><Heart28Regular /></n-icon>
        </template>
      </n-button>
      <n-button quaternary circle size="large">
        <template #icon>
          <n-icon><ChevronDoubleUp16Filled /></n-icon>
        </template>
      </n-button>
      <n-button quaternary circle size="large">
        <template #icon>
          <n-icon><Heart28Regular /></n-icon>
        </template>
      </n-button>
    </div>
  </div>
</template>

<script>
import player2 from '@/stores/player2'
import { utils } from '@/stores/utils'
import { Heart28Regular, ChevronDoubleUp16Filled } from '@vicons/fluent'
import { NButton, NIcon } from 'naive-ui'

export default {
  name: 'FooterLayout',
  components: {
    Heart28Regular,
    ChevronDoubleUp16Filled,
    NButton,
    NIcon
  },
  data() {
    return {
      utils,
      player: player2.state
    }
  },
  computed: {
    songOnPlay() {
      return this.player.playlist.at(this.player.currentIndex)
    },
    playlistNotNull() {
      return this.player.playlist.length !== 0
    }
  }
}
</script>
