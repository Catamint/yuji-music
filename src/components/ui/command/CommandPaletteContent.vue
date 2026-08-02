<script setup>
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useUiStore } from "@/stores/uiStore";
import { SearchIcon } from "@lucide/vue";
import CommandPalette from "./CommandPalette.vue";

const uiStore = useUiStore();
const router = useRouter();

const payload = computed(() => uiStore.commandPalettePayload || {});
const open = computed({
  get: () => uiStore.domVisible.commandPalette,
  set: (value) => {
    if (value) {
      uiStore.setDomVisible("commandPalette", true);
    } else {
      uiStore.closeCommandPalette();
    }
  },
});

const query = ref("");
const options = computed(() => payload.value.options || [
  { label: "音乐", type: "music" },
  { label: "专辑", type: "album" },
  { label: "艺术家", type: "artist" },
  { label: "歌单", type: "songlist" },
]);

const showOptions = computed(() => query.value.trim().length > 0);

watch(payload, (next) => {
  query.value = next.query || "";
}, { immediate: true });

function submitSearch() {
  const keyword = query.value.trim();
  if (!keyword) return;
  open.value = false;
  router.push({
    path: "/search",
    query: {
      kw: keyword,
      type: "all",
    },
  });
}

function onSelect(option) {
  const keyword = query.value.trim();
  if (!keyword) return;
  open.value = false;
  router.push({
    path: "/search",
    query: {
      kw: keyword,
      type: option.type,
    },
  });
}
</script>

<template>
  <CommandPalette v-model:open="open">
    <div class="rounded-xl border border-border bg-popover p-4 shadow-lg">
      <div class="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2">
        <!-- <SearchIcon class="size-4 opacity-50" /> -->
        <input
          autofocus
          v-model="query"
          @keydown.enter.prevent="submitSearch"
          class="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          :placeholder="payload.placeholder || '搜索...'"
        />
        <button
          type="button"
          class="rounded-md bg-background px-3 py-1 text-sm font-medium text-white hover:bg-primary/20"
          @click="submitSearch"
        >
          <SearchIcon class="size-4" />
        </button>
      </div>

      <div v-if="showOptions" class="mt-3 space-y-2">
        <div class="grid grid-cols-4 gap-4">
          <button
            v-for="option in options"
            :key="option.type"
            type="button"
            class="rounded-lg border border-border bg-background px-2 py-2 text-center text-sm hover:border-primary hover:bg-primary/5"
            @click="onSelect(option)"
          >
            <div class="font-medium">{{ option.label }}</div>
          </button>
        </div>
      </div>
    </div>
  </CommandPalette>
</template>
