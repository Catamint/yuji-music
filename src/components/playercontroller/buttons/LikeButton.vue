<script setup>
import TooltipButton from "@/components/public/TooltipButton.vue";
import songService from "@/services/songService";
import { ref } from "vue";
import { toast } from "vue-sonner";
import { Heart28Regular, Heart28Filled } from "@vicons/fluent";

const props = defineProps({
  id: { type: Number, required: true },
  toLike: { type: Boolean, default: true },
});

const loading = ref(false);

async function like() {
  loading.value = true;
  try {
    props.toLike = !props.toLike;
    await songService.likeSong(props.id, props.toLike);
    console.log("收藏结果:", props.toLike);
    toast.success("收藏成功");
  } catch (error) {
    console.log(error);
    props.toLike = !props.toLike;
    toast.error("收藏失败。" + error, {
      richColors: true,
    });
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <TooltipButton v-if="toLike" tooltip-text="喜欢" @click="like">
    <template #icon>
      <Heart28Filled />
    </template>
  </TooltipButton>

  <TooltipButton v-else tooltip-text="取消喜欢" @click="like">
    <template #icon>
      <Heart28Regular />
    </template>
  </TooltipButton>
</template>
