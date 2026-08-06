<script setup>
import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';
import { inputGroupButtonVariants } from ".";

const props = defineProps({
  variant: { type: null, required: false, default: "ghost" },
  size: { type: null, required: false, default: "xs" },
  class: { type: null, required: false },
  disabled: { type: Boolean, required: false, default: false },
});
</script>

<template>
  <Button
    :data-size="props.size"
    :variant="props.variant"
    :disabled="props.disabled"
    :class="cn(
      inputGroupButtonVariants({ size: props.size }),
      props.disabled && 'pointer-events-none opacity-50',
      props.class
    )"
  >
    <slot />
  </Button>
</template>
