<script setup>
import { DrawerTrigger } from "@/components/ui/drawer";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import useUiStore from "@/stores/uiStore";
const uiStore = useUiStore();
</script>
<template>
  <DrawerTrigger v-if="uiStore.isMobile">
    <slot></slot>
  </DrawerTrigger>
  <DropdownMenuTrigger v-else>
    <slot></slot>
  </DropdownMenuTrigger>
</template>
