<template>
    <tooltip-button tooltipText="下一首播放" class="next" @click="addToPlayNext">
        <template #icon>
            <ReceiptPlay24Regular />
        </template>
    </tooltip-button>

</template>

<script setup lang="ts">
import { Music } from "@/model";
import { ReceiptPlay24Regular } from "@vicons/fluent";
import player2 from "@/stores/player2";
import { toast } from "vue-sonner";

const props = defineProps({
    music: {
        type: Object as () => Music,
        required: true,
    }
});
const emit = defineEmits(["add-to-play-next"]);
function addToPlayNext() {
    player2.put_in_playlist(props.music);
    emit("add-to-play-next", props.music);
}
</script>