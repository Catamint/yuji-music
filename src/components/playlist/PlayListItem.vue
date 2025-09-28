<template>
  <base-card
    :title="music_info.name"
    :subtitle="music_info.artist.name"
    :description="music_info.album.name"
    :image="music_info.album.picUrl"
    layout="compact"
    @title-click="player2.play_in_playlist(music_info.id)"
    @subtitle-click="goToArtist"
    @description-click="goToAlbum"
  >
    <template #actions>
      <div class="flex gap-2">
        <button
          :disabled="music_info.playing"
          @click="player2.play_in_playlist(music_info.id)"
          class="p-2 rounded-full back-hover press-active transition-colors disabled:opacity-50"
        >
          <Play24Regular class="w-5 h-5" />
        </button>

        <button
          @click="player2.del_from_list(music_info.id)"
          class="p-2 rounded-full back-hover press-active transition-colors"
        >
          <SubtractCircle20Regular class="w-5 h-5" />
        </button>

        <ContextList :music-info="music_info" :id="music_info.id" />
      </div>
    </template>
  </base-card>
</template>

<script setup>
import player2 from "@/stores/player2";
import { Heart28Regular, Play24Regular, SubtractCircle20Regular } from "@vicons/fluent";
import BaseCard from "@/components/layout/BaseCardLayout.vue";
import { computed, onMounted } from "vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import ContextList from "@/components/public/DetailMenu.vue";

const router = useRouter();

function goToArtist() {
  router.push({ name: "artist", params: { id: props.music_info.artist.id } });
}

function goToAlbum() {
  router.push({ name: "album", params: { id: props.music_info.album.id } });
}

const props = defineProps({
  music_info: {
    type: Object,
    default: function () {
      return {};
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
