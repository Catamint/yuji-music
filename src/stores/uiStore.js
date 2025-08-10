import { defineStore } from 'pinia';
import { ref }  from 'vue';
import { useMediaQuery } from '@vueuse/core';
export const useUiStore = defineStore('ui', {
  state: () => ({
    isPlayerPageVisible: false,
    isPlayListVisible: false,
    isSidebarOpen: false,
    isSidebarOpenMobile: false,
    isContextListOpen: false,
  }),
  actions: {
    togglePlayerPage() {
      console.log("togglePlayerPage");
      // this.isPlayListVisible = false;
      // this.isSidebarVisible = false;
      this.isPlayerPageVisible = !this.isPlayerPageVisible;
    },
    togglePlayList(val) {
      console.log("togglePlayList");
      // this.isPlayerPageVisible = false;
      // this.isSidebarVisible = false;
      console.log("val", val);
      this.isPlayListVisible = val;
    },
    toggleSidebar() {
      console.log("toggleSidebar");
      // this.isPlayerPageVisible = false;
      // this.isPlayListVisible = false;
      if (useMediaQuery("(max-width: 768px)").value) {
        this.isSidebarOpenMobile = !this.isSidebarOpenMobile;
      } else {
        this.isSidebarOpen = !this.isSidebarOpen;
      }
    },
    toggleContextList() {
      console.log("toggleContextList");
      this.isContextListOpen = !this.isContextListOpen;
    },
  },
});