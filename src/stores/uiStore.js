import { defineStore } from 'pinia';

export const useUiStore = defineStore('ui', {
  state: () => ({
    isPlayerPageVisible: false,
    isPlayListVisible: false,
    isSideberVisible: false,
    isMobile: false
  }),
  actions: {
    togglePlayerPage() {
      console.log("togglePlayerPage");
      this.isPlayListVisible = false;
      this.isSideberVisible = false;
      this.isPlayerPageVisible = !this.isPlayerPageVisible;
    }
  }
});