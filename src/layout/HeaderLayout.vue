<template>
  <div class="grid grid-cols-[1fr_3fr_1fr] ml-2 items-center">
    <div class="flex items-center gap-2">
      <SidebarTrigger class="" />
      <TooltipButton :icon-size="18" tooltipText="首页" @click="$router.push('/')">
        <template #icon>
          <Home24Regular />
        </template>
      </TooltipButton>
    </div>
    <div class="flex w-full items-center justify-center">
      <SearchBox class="max-w-md py-1 flex-1"></SearchBox>
    </div>
  </div>
</template>

<script>
import SearchBox from "@/components/public/SearchBox.vue";
import { Home24Regular } from "@vicons/fluent";
import TooltipButton from "@/components/public/TooltipButton.vue";
export default {
  name: "HeaderLayout",
  props: {
    msg: String,
  },
  components: {
    SearchBox,
    Home24Regular,
    TooltipButton,
  },
};
</script>
