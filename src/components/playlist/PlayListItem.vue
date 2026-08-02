<template>
  <base-card
    :title="music.name"
    :subtitle="music.getArtistInfo().name"
    :description="music.albumInfo.name"
    :image="music.getPicUrl()"
    layout="compact"
    @title-click="player2.play_in_playlist(music.id)"
    @subtitle-click="goToArtist"
    @description-click="goToAlbum"
  >
    <template #actions>
      <div class="flex gap-2">
        <button
          :disabled="isPlaying"
          @click="player2.play_in_playlist(music.id)"
          class="p-2 rounded-full back-hover press-active transition-colors disabled:opacity-50"
        >
          <Play24Regular class="w-5 h-5" />
        </button>

        <button
          @click="player2.del_from_list(music.id)"
          class="p-2 rounded-full back-hover press-active transition-colors"
        >
          <SubtractCircle20Regular class="w-5 h-5" />
        </button>

        <ContextList :music="music" :id="music.id" />
      </div>
    </template>
  </base-card>
</template>

<script setup lang="ts">
import player2 from "@/stores/player2";
import { Heart28Regular, Play24Regular, SubtractCircle20Regular } from "@vicons/fluent";
import BaseCard from "@/components/layout/BaseCardLayout.vue";
import { computed, onMounted } from "vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import ContextList from "@/components/public/DetailMenu.vue";
import type { Music } from "@/model";

const router = useRouter();

function goToArtist() {
  router.push({ name: "artist", params: { id: props.music.getArtistInfo().id } });
}

function goToAlbum() {
  router.push({ name: "album", params: { id: props.music.albumInfo.id } });
}

const props = defineProps({
  music: {
    type: Object as () => Music,
    default: function () {
      return {};
    },
  },
  isPlaying: {
    type: Boolean,
    default: false,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
