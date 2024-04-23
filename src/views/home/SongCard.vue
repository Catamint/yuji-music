<template>
    <n-card>
        <template #cover>
            <img @click="player.play(music_detials);" :src="music_detials.album_img">
        </template>
        <h3>{{ music_detials.song_name }}</h3>
        <span>{{ music_detials.author_name }}</span>
        <p @click="player.put_in_playlist(music_detials)">添加到播放列表</p>
        <!-- <audio controls :src="music_detials.url">播放</audio> -->
        <!-- <p>地址: {{ music_detials.url }}</p> -->
    </n-card>
</template>

<script>
import { NCard } from 'naive-ui';
import { player } from '../../stores/player';


export default {
    name: 'SongCard',
    methods:{
        get_music_detials(hash){
            const url = '/kugou/app/i/getSongInfo.php?cmd=playInfo&hash=';
            this.$axios.get(url + hash).then(res => {
                console.log(res.data);
                this.music_detials.song_name = res.data.songName;
                this.music_detials.author_name = res.data.author_name;
                this.music_detials.url = res.data.url;
                this.music_detials.album_img = res.data.album_img.replace("{size}","240");
                this.music_detials.hash = res.data.hash;
            })
        }
    },
    mounted() {
        this.get_music_detials(this.music_info.hash);
    },
    data() {
        return{
            player,
            music_detials: {
                album_img: "../../assets/image/default_covor.jpg",
                song_name: " ",
                album_name: " ",
                album_id: " ",
                author_name: " ",
                url: " ",
                hash:" ",
                playing: false
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
        NCard,
        player
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.n-card {
    display: block;
    width: 30%;
    min-width: 100px;
    max-width: 180px;
    margin-right: 10px;
}

</style>
