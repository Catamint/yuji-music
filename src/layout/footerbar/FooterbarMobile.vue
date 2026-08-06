<template>
  <div class="flex h-full w-full items-center px-2 mb-4 pt-1 box-border">
    <div class="flex h-14 w-full items-center gap-2">
      <div
        class="flex h-full min-w-0 flex-[1.3] items-center gap-2 overflow-hidden rounded-[22px] border border-white/20 bg-background/70 px-2 py-2 shadow-[0_0_0_1px_rgba(255,255,255,0.16),inset_0_1px_0_rgba(255,255,255,0.24)] backdrop-blur-xl transition hover:bg-muted/80"
        @click="uiStore.toggleDomVisible('playingPage')">
        <MusicInfo :imgSize="12" :animation="false" class="flex min-w-0 flex-1 items-center justify-start" />
        <div @click.stop class="relative grid size-12 flex-none place-items-center">
          <CircularProgress :size="44" :stroke-width="3" class="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          <PlayToggle class="relative" />
        </div>
      </div>
      <button
        class="flex h-14 w-14 flex-none items-center justify-center rounded-[22px] border border-white/20 bg-background/70 p-2 text-foreground shadow-[0_0_0_1px_rgba(255,255,255,0.16),inset_0_1px_0_rgba(255,255,255,0.24)] backdrop-blur-xl transition hover:bg-muted/80">
        <PlaylistToggle />
      </button>
      <button @click.stop="goToHome"
        class="flex h-14 w-14 flex-none items-center justify-center rounded-[22px] border border-white/20 bg-background/70 p-2 text-foreground shadow-[0_0_0_1px_rgba(255,255,255,0.16),inset_0_1px_0_rgba(255,255,255,0.24)] backdrop-blur-xl transition hover:bg-muted/80">
        <Home class="h-5 w-5" />
        <!-- <span>主页</span> -->
      </button>
    </div>
  </div>
</template>

<script setup>
import { Heart, Home } from "@lucide/vue";
import { useRouter } from "vue-router";
import MusicInfo from "@/components/playercontroller/MusicInfo.vue";
import PlayModeButton from "@/components/playercontroller/buttons/PlayMode.vue";
import PlaylistToggle from "@/components/playercontroller/buttons/PlaylistToggle.vue";
import PlayToggle from "@/components/playercontroller/buttons/PlayToggle.vue";
import CircularProgress from "@/components/playercontroller/CircularProgress.vue";
import { useUiStore } from "@/stores/uiStore";

const uiStore = useUiStore();
const router = useRouter();

function goToHome() {
  router.push("/");
}

function goToFavorite() {
  router.push("/favorite");
}
</script>
