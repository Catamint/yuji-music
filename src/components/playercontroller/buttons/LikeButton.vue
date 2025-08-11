<script setup>
import TooltipButton from "@/components/public/TooltipButton.vue";
import songService from "@/services/songService";
import { computed, ref } from "vue";
import { toast } from "vue-sonner";
import { Heart28Regular, Heart28Filled } from "@vicons/fluent";
import { onMounted } from "vue";
import { useMusicStore } from "@/stores/musicStore";
const props = defineProps({
  id: { type: Number, required: true },
});

const loading = ref(false);

const toLike = ref(false);

onMounted(() => {
  toLike.value = !useMusicStore().likeList.includes(props.id);
});

async function like() {
  loading.value = true;
  try {
    await songService.likeSong(props.id, toLike.value);
    if (toLike.value) {
      useMusicStore().addToLikeList(props.id);
    } else {
      useMusicStore().removeFromLikeList(props.id);
    }
    toLike.value = !toLike.value;
    console.log("收藏结果:", toLike.value);
    toast.success(!toLike.value ? "收藏成功" : "取消收藏", {
      richColors: true,
    });
  } catch (error) {
    console.log(error);
    toLike.value = !toLike.value;
    toast.error("收藏失败。" + error, {
      richColors: true,
    });
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <TooltipButton v-if="loading" tooltip-text="喜欢" @click="">
    <template #icon>
      <Heart28Regular />
    </template>
  </TooltipButton>
  <TooltipButton v-else-if="toLike" tooltip-text="喜欢" @click="like">
    <template #icon>
      <Heart28Regular />
    </template>
  </TooltipButton>

  <TooltipButton v-else tooltip-text="取消喜欢" @click="like">
    <template #icon>
      <Heart28Filled />
    </template>
  </TooltipButton>
</template>
