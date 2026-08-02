<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useUiStore } from "@/stores/uiStore";
import { Heart28Regular, Heart28Filled } from "@vicons/fluent";
import BaseCard from "@/components/layout/BaseCardLayout.vue";
import { toast } from "vue-sonner";
import songService from "@/services/songService";
import { useMusicStore } from "@/stores/musicStore";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import type { Music } from "@/model";

const uiStore = useUiStore();
const musicStore = useMusicStore() as any;
const router = useRouter();

const payload = computed(() => uiStore.detailMenuPayload as { music: any; id: string } | null);
const open = ref(false);

watch(
  () => uiStore.domVisible.detailMenu,
  (value) => {
    open.value = value;
  },
  { immediate: true }
);

watch(open, (value) => {
  uiStore.setDomVisible("detailMenu", value);
});

const img = ref("");
const toLike = ref(true);

watch(payload, async (next) => {
  if (!next) return;
  img.value = next.music.getPicUrl() || "";
  toLike.value = !musicStore.likeList.includes(next.id);
}, { immediate: true });

function closeMenu() {
  open.value = false;
}

async function loadImageIfNeeded() {
  const current = payload.value;
  if (!current) return;
  if (!img.value) {
    img.value = await current.music.updatePicUrl(300);
  }
}

async function like() {
  const current = payload.value;
  if (!current) return;
  try {
    await songService.likeSong(current.id, toLike.value);
    toLike.value = !toLike.value;
    if (toLike.value) {
      musicStore.removeFromLikeList(current.id);
    } else {
      musicStore.addToLikeList(current.id);
    }
  } catch (error) {
    toast.error("收藏失败。" + error, { richColors: true });
  }
}

function goToAlbum() {
  const current = payload.value;
  if (!current) return;
  router.push(`/album/${current.music.albumInfo.id}`);
}

function goToArtist() {
  const current = payload.value;
  if (!current) return;
  router.push(`/artist/${current.music.getArtistInfo().id}`);
}
</script>

<template>
  <Drawer v-model:open="open">
    <DrawerContent class="bg-popover z-8000" @open="loadImageIfNeeded()">
      <DrawerHeader>
        <DrawerTitle></DrawerTitle>
        <BaseCard
          :image="img"
          :title="payload?.music?.name"
          :subtitle="payload?.music?.getArtistInfo().name"
          :description="payload?.music?.albumInfo.name"
          layout="list"
        />
      </DrawerHeader>

      <div class="flex flex-col gap-2 p-4">
        <Button @click="goToAlbum">查看专辑：{{ payload?.music?.albumInfo.name }}</Button>
        <Button @click="goToArtist">查看歌手：{{ payload?.music?.getArtistInfo().name }}</Button>
        <Button v-if="toLike" @click="like">
          <Heart28Regular /> 收藏到我喜欢
        </Button>
        <Button v-else @click="like">
          <Heart28Filled /> 取消收藏
        </Button>
        <DrawerClose>
          <Button variant="outline">取消</Button>
        </DrawerClose>
      </div>
    </DrawerContent>
  </Drawer>
</template>
