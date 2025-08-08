<template>
  <div>
    <div
      v-if="player.state.playlist.length == 0"
      class="w-full h-[300px] flex justify-center items-center"
    >
      <div class="flex flex-col h-full gap-2 items-center justify-center">
        <TextBulletListSquare24Filled class="text-primary size-12" />
        <span class="text-xl text-secondary-foreground">空空如也</span>
      </div>
    </div>

    <template v-else>
      <ScrollArea class="h-[60vh]">
        <PlayListItem
          class="item"
          v-for="info in player.state.playlist"
          :music_info="info"
          :key="info.id"
        />
      </ScrollArea>
    </template>
  </div>
</template>

<script>
import PlayListItem from "@/components/playlist/PlayListItem.vue";
import player2 from "../../stores/player2";
import { TextBulletListSquare24Filled } from "@vicons/fluent";
import ScrollArea from "../ui/scroll-area/ScrollArea.vue";
export default {
  name: "PlayList",
  components: {
    PlayListItem,
    TextBulletListSquare24Filled,
    ScrollArea,
  },
  data() {
    return {
      player: player2,
    };
  },
  mounted() {
    console.log(this.player.state);
  },
  methods: {
    // play()
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  display: flex;
  height: 100%;
  border: 50px;
  border-radius: 10px;
  /* background-color: rgba(0,0,0,0.5); */
  justify-content: center;
}
.no-login-box {
  display: flex;
  height: 60vh;
  width: 100%;
  align-items: center;
  justify-content: center;
}
</style>
