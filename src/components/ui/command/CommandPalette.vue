<script setup>
import { reactiveOmit } from "@vueuse/core";
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  useForwardPropsEmits,
} from "reka-ui";
import { cn } from "@/lib/utils";

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  open: { type: Boolean, required: false },
  defaultOpen: { type: Boolean, required: false },
  class: { type: null, required: false },
});
const emits = defineEmits(["update:open"]);

const delegatedProps = reactiveOmit(props, "class");
const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <DialogRoot v-bind="forwarded">
    <DialogPortal>
      <transition name="overlay-fade" appear>
        <DialogOverlay class="fixed z-4900 inset-0 bg-black/40 backdrop-blur-sm" />
      </transition>

      <transition name="cp-fade" appear>
        <DialogContent
          data-slot="command-content"
          class="fixed left-1/2 top-2/5 z-5000 w-[min(100vw-2rem,48rem)] max-h-[80vh] -translate-x-1/2 -translate-y-1/2 p-4 overflow-auto sm:mx-auto sm:w-full sm:max-w-lg"
          v-bind="$attrs"
        >
          <slot />
        </DialogContent>
      </transition>
    </DialogPortal>
  </DialogRoot>
</template>

<style scoped>
/* Overlay fade */
.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: opacity 220ms ease;
}
.overlay-fade-enter-from,
.overlay-fade-leave-to {
  opacity: 0;
}
.overlay-fade-enter-to,
.overlay-fade-leave-from {
  opacity: 1;
}

/* Command palette fade + slight scale/translate */
.cp-fade-enter-active,
.cp-fade-leave-active {
  transition: opacity 180ms cubic-bezier(.2,.8,.2,1), transform 180ms cubic-bezier(.2,.8,.2,1);
}
.cp-fade-enter-from {
  opacity: 0;
  transform: translateY(-6px) scale(.98);
}
.cp-fade-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.cp-fade-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.cp-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(.98);
}
</style>
