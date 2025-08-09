<template>
  <div class="grid grid-cols-[1fr_3fr_1fr] ml-2 items-center">
    <div class="flex items-center gap-2">
      <SidebarTrigger class="" />
    </div>
    <div class="flex w-full items-center justify-center">
      <SearchBox class="max-w-md py-1 flex-1"></SearchBox>
    </div>
  </div>
</template>

<script>
import SearchBox from "@/components/public/SearchBox.vue";

export default {
  name: "HeaderLayout",
  props: {
    msg: String,
  },
  components: {
    SearchBox,
  },
};
</script>
