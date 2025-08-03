import { defineStore } from 'pinia';

export const useUiStore = defineStore('ui', {
  state: () => ({
    isPlaylistVisible: false,
    isPlayerPageVisible: false,
  }),
  actions: {
    togglePlaylist() {
      this.isPlaylistVisible = !this.isPlaylistVisible;
    },
    togglePlayerPage() {
      console.log("togglePlayerPage");
      this.isPlayerPageVisible = !this.isPlayerPageVisible;
    },
    closeAll() {
      this.isPlaylistVisible = false;
      this.isPlayerPageVisible = false;
    }
  }
});