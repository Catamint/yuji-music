import { defineStore } from 'pinia';

export const useUiStore = defineStore('ui', {
  state: () => ({
    isPlayerPageVisible: false,
    isPlayListVisible: true,
    isSideberVisible: false,
    isMobile: false
  }),
  actions: {
    togglePlayerPage() {
      console.log("togglePlayerPage");
      this.isPlayListVisible = false;
      this.isSideberVisible = false;
      this.isPlayerPageVisible = !this.isPlayerPageVisible;
    },
    togglePlayList(val) {
      console.log("togglePlayList");
      // this.isPlayerPageVisible = false;
      // this.isSideberVisible = false;
      console.log("val", val);
      this.isPlayListVisible = val;
    },
    toggleSideber() {
      console.log("toggleSideber");
      // this.isPlayerPageVisible = false;
      // this.isPlayListVisible = false;
      this.isSideberVisible = !this.isSideberVisible;
    }
  },
});