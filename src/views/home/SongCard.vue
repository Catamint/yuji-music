<template>
    <n-card>
        <template #cover>
            <img class="cover-img" @click="player.play(music_detials);" :src="music_detials.album_img">
        </template>
        <n-ellipsis style="font-size: 1.2rem; max-width: 100%; font-weight: bold;">
            {{ music_detials.song_name }}
        </n-ellipsis>
        <n-space>
            <n-button circle  v-if="music_detials.url != ''" style="font-size: 18px" @click="player.play(music_detials)">
                <template #icon>
                    <n-icon><Play24Regular/></n-icon>
                </template>
            </n-button>
            <n-button circle  disabled v-else style="font-size: 18px" @click="player.play(music_detials)">
                <template #icon>
                    <n-icon><Play24Regular/></n-icon>
                </template>
            </n-button>
            <n-button circle style="font-size: 24px">
            <template #icon>
                <n-icon><Heart28Regular /></n-icon>
            </template>
            </n-button>
            <n-button circle style="font-size: 24px" @click="player.put_in_playlist(music_detials)">
                <template #icon>
                    <n-icon><TextBulletListAdd24Filled /></n-icon>
                </template>
            </n-button>
        </n-space>
    </n-card>
</template>

<script>
import { NCard, NEllipsis, NSpace } from 'naive-ui';
import { player } from '../../stores/player';
import { Heart28Regular, Play24Regular, TextBulletListAdd24Filled } from '@vicons/fluent/lib';

export default {
    name: 'SongCard',
    methods:{
        get_music_detials(hash){
            const url = '/kugou/app/i/getSongInfo.php?cmd=playInfo&hash=';
            this.$axios.get(url + hash).then(res => {
                // console.log(res.data);
                this.music_detials.song_name = res.data.songName;
                this.music_detials.author_name = res.data.author_name;
                this.music_detials.url = res.data.url;
                this.music_detials.album_img = res.data.album_img.replace("{size}","240");
                this.music_detials.hash = res.data.hash;
            })
        },
        put_in_playlist(detials){
            var message = this.player.put_in_playlist(detials);
            if(message != 0){
                console.log("???")
            }
        }
    },
    mounted() {
        this.get_music_detials(this.music_info.hash);
    },
    data() {
        return{
            player,
            music_detials: {
                album_img: "../../assets/image/default_covor.jpg", //专辑背景
                song_name: " ", //歌名
                album_name: " ", //专辑名
                album_hash: " ", //专辑hash
                author_name: " ", //歌手名
                author_hash: " ", //歌手hash
                url: " ", //url
                hash:" ", //歌曲hash
                playing: false //一律设为false (或"false")
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
        player,
        Heart28Regular,
        Play24Regular,
        TextBulletListAdd24Filled,
        NEllipsis,
        NSpace
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.n-card {
    /* display: block; */
    width: 40%;
    min-width: 180px;
    width: 22%;
    max-width: 250px;
    max-height: 300px;
    margin-right: 20px;
    border-radius: 12px;
    box-shadow: rgba(0, 0, 0, 0.1) 2px 8px 12px;
    transition: transform 0.3s;
}
.n-card:hover{
    transform: scale(1.04);
}
.n-card img{
    border-radius: 12px;
    position: relative;
    transition: filter 0.3s ease;
    /* box-shadow: inset; */
}
/* .cover-img:hover::before{
    content: "播放";
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 10px;
    border-radius: 5px;
    transition: opacity 0.3s ease;
    opacity: 1;
} */
.cover-img:hover {
    filter: brightness(50%);
}
n-button{
    padding-right: 2px;
}
</style>
