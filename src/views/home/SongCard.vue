<template>
    <n-card>
        <template #cover>
            <img :src="music_detials.album_img">
        </template>
        <h3>{{ music_info.song_name }}</h3>
        <p>{{ music_info.singer_name }}</p>
        <p>地址: {{ music_info.song_url }}</p>
    </n-card>
</template>

<script>
import { NCard } from 'naive-ui';


export default {
    name: 'SongCard',
    mounted() {
        var url = '/kugou/app/i/getSongInfo.php?cmd=playInfo&hash=' + this.music_info.hash;
        // console.log(url);
        this.$axios.get(url).then(res => {
            // console.log(res.data)
            this.music_detials = res.data
            this.music_detials.album_img = this.music_detials.album_img.replace("{size}","240")
        })
    },
    data() {
        return{
            music_detials: {
                album_img:" "
            }
        }
    },
    props:{
        music_info:{
            type:Object,
            default: function(){
                return {}
            }
        }
    },
    components:{
        NCard
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.n-card {
    width: 180px;
}
.n-card.div{
    padding: 5px;
}

</style>
