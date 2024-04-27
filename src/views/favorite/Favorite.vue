<template>
  <List :music_info="musicinfo"/>
</template>

<script>
import List from '@/components/public/List.vue';
const info = {
  hash: "71194BC4C1F44C344774719CED11839B"
}

export default {
  name: 'Favorite',
  components: {
    List
  },
  data(){
    return {
      musicinfo : {}
    }
  },
  created(){
    this.musicinfo=info
    console.log(this.musicinfo)
  },
  methods:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
