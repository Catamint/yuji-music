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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useUiStore } from "@/stores/uiStore";
const uiStore = useUiStore();
</script>

<template>
  <Drawer v-if="uiStore.isMobile">
    <slot></slot>
  </Drawer>
  <DropdownMenu v-else>
    <slot></slot>
  </DropdownMenu>
</template>
