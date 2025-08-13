<script setup>
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { MoreVertical20Filled } from "@vicons/fluent";
import TooltipButton from "./TooltipButton.vue";
import { Heart28Regular, Heart28Filled } from "@vicons/fluent";
import BaseCard from "@/components/layout/BaseCardLayout.vue";
import { computed, onMounted } from "vue";
import { ref } from "vue";
import songService from "@/services/songService";
import { useMusicStore } from "@/stores/musicStore";
import { toast } from "vue-sonner";
import router from "@/router";
import { useUiStore } from "@/stores/uiStore";

const musicStore = useMusicStore();
const uiStore = useUiStore();
const props = defineProps({
  musicInfo: { type: Object, required: true },
  id: { type: Number, required: true },
});

const img = ref("");

onMounted(async () => {
  img.value = await songService.getPicUrl(props.musicInfo);
});

const toLike = ref(true);

onMounted(() => {
  if (musicStore.likeList.includes(props.id)) {
    toLike.value = false;
    console.log("之前已收藏");
  } else {
    toLike.value = true;
    console.log("之前未收藏");
  }
});

async function like() {
  try {
    await songService.likeSong(props.id, toLike.value);
    console.log("收藏结果:", toLike.value);
    toLike.value = !toLike.value;
    if (toLike.value) {
      musicStore.removeFromLikeList(props.id);
    } else {
      musicStore.addToLikeList(props.id);
    }
  } catch (error) {
    console.log(error);
    toast.error("收藏失败。" + error, {
      richColors: true,
    });
  }
}
</script>

<template>
  <Drawer
    @update:open="
      (event) => {
        uiStore.isContextListOpen = event;
      }
    "
  >
    <DrawerTrigger>
      <TooltipButton tooltipText="更多操作">
        <template #icon>
          <MoreVertical20Filled />
        </template>
      </TooltipButton>
    </DrawerTrigger>
    <DrawerContent class="bg-popover z-8000">
      <DrawerHeader>
        <DrawerTitle></DrawerTitle>
        <BaseCard
          :image="img"
          :title="props.musicInfo?.name"
          :subtitle="props.musicInfo?.artist?.name"
          :description="props.musicInfo?.album?.name"
          layout="list"
        />
        <!-- <DrawerDescription>This action cannot be undone.</DrawerDescription> -->
      </DrawerHeader>

      <DrawerFooter>
        <Button @click="router.push(`/album/${props.musicInfo.album.id}`)">
          查看专辑：{{ props.musicInfo.album.name }}
        </Button>
        <Button @click="router.push(`/artist/${props.musicInfo.artist.id}`)">
          查看歌手：{{ props.musicInfo.artist.name }}
        </Button>
        <Button v-if="toLike" @click="like"> <Heart28Regular /> 收藏到我喜欢 </Button>
        <Button v-else @click="like"> <Heart28Filled />取消收藏 </Button>
        <!-- <Button>收藏</Button> -->
        <DrawerClose>
          <!-- <Button variant="outline"> 取消 </Button> -->
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>
