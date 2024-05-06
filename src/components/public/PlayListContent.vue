<template>
    <n-card content-style="padding: 0; display: flex; align-items: center;">
        <img class="cover-img" @click="player.play_in_playlist(music_info.hash);" :src="music_info.album_img">
        <n-flex style="width:100%; justify-content: space-between; padding-right: 10px;">
            <div class="text">
                <n-ellipsis style="font-size: 1.5rem; font-weight: bold;">
                    {{ music_info.song_name }}
                </n-ellipsis>
                <span class="info" style="padding-left: 20px;">{{ music_info.author_name }}</span>
                <span class="info">{{ music_info.song_name }}</span>
            </div>
            <n-flex>
                <n-button :disabled="music_info.playing" style="font-size: 18px" @click="player.play_in_playlist(music_info.hash)">
                    <template #icon>
                        <n-icon><Play24Regular/></n-icon>
                    </template>
                    播放
                </n-button>
                <n-button style="font-size: 18px">
                    <template #icon>
                        <n-icon><Heart28Regular /></n-icon>
                    </template>
                    收藏
                </n-button>
                <n-button style="font-size: 18px" @click="player.del_from_list(music_info.hash)">
                    <template #icon>
                        <n-icon><TextBulletListAdd24Filled /></n-icon>
                    </template>
                    从播放列表移除
                </n-button>
            </n-flex>
        </n-flex>
    </n-card>
</template>

<script>
import { NButton, NCard, NEllipsis, NFlex, NIcon } from 'naive-ui';
import { player } from '@/stores/player';
import { Heart28Regular, Play24Regular, TextBulletListAdd24Filled } from '@vicons/fluent/lib';

export default {
    name: 'PlayListContent',
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
        // console.log(this.music_info)
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
                return {
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
        }
    },
    components:{
        NCard,
        player,
        Heart28Regular,
        TextBulletListAdd24Filled,
        NEllipsis,
        NFlex,
        Play24Regular,
        NIcon,
        NButton
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.n-card {
    display: flex;
    flex-direction: row;
    width: 100%;
    min-width: 100%;
    padding: 10px;
    /* max-width: 260px; */
    height: 100px;
    margin-right: 20px;
    margin-bottom: 10px;
    border-radius: 12px;
    box-shadow: rgba(0, 0, 0, 0.1) 2px 8px 12px;
    transition: transform 0.3s;
    /* transition: filter 0.3s ease; */
}
.n-card:hover{
    transform: scale(1.02);
    /* filter: brightness(5%); */
}
.n-card img{
    height: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 12px;
    position: relative;
    /* box-shadow: inset; */
}

.text {
    display: flex;
    align-items: center;
    padding-left: 10px;
}
.text .info {
    font-size: medium;
    padding-left: 10px;
}
n-button{
    padding-right: 2px;
}

</style>
