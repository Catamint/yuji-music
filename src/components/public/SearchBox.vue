<script setup>
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import ComboboxAnchor from "../ui/combobox/ComboboxAnchor.vue";

const router = useRouter();

const query = ref("");
const options = [
  { label: "全部", type: "all" },
  { label: "音乐", type: "music" },
  { label: "专辑", type: "album" },
  { label: "艺术家", type: "artist" },
  { label: "歌单", type: "songlist" },
];

const showOptions = computed(() => query.value.trim() !== "");

function onSelect(option) {
  router.push({
    path: "/search",
    query: {
      kw: query.value,
      type: option.type,
    },
  });
}
</script>

<template>
  <Combobox :ignoreFilter="true">
    <ComboboxAnchor class="w-full">
      <div
        class="relative w-full items-center border rounded-md file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 focus-within:outline-2 focus-within:outline-primary"
      >
        <ComboboxInput
          class="w-full"
          v-model="query"
          placeholder="搜索音乐 / 专辑 / 创作者 / 歌单"
        />
      </div>
    </ComboboxAnchor>
    <ComboboxList>
      <!-- <ComboboxEmpty>
                No framework found.
            </ComboboxEmpty> -->

      <ComboboxGroup v-show="showOptions">
        <ComboboxItem
          v-for="option in options"
          :key="option.type"
          :value="option.label"
          @click="onSelect(option)"
        >
          query{{ option.label }}：“{{ query }}”
        </ComboboxItem>
      </ComboboxGroup>
    </ComboboxList>
  </Combobox>
</template>
