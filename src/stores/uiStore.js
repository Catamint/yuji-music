import { defineStore } from 'pinia';

export const useUiStore = defineStore('ui', {
  state: () => ({
    isPlayerPageVisible: false,
  }),
  actions: {
    togglePlayerPage() {
      console.log("togglePlayerPage");
      this.isPlayerPageVisible = !this.isPlayerPageVisible;
    }
  }
});