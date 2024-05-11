<template>
    <n-card content-style="padding: 0; display: flex; align-items: center;">
        <img class="cover-img" @click="player.play(music_detials);" :src="music_detials.album_img">
        <n-flex style="width:100%; justify-content: space-between; padding-right: 10px;">
            <div class="text">
                <n-ellipsis style="font-size: 1.5rem; font-weight: bold;">
                    {{ music_detials.song_name }}
                </n-ellipsis>
                <span class="info" style="padding-left: 20px;">{{ music_detials.author_name }}</span>
                <!-- <span class="info">{{ music_detials.song_name }}</span> -->
            </div>
            <n-flex>
                <n-button round style="font-size: 18px"  @click="put_in_favorites(music_detials)">
                    <template #icon>
                        <n-icon><Heart28Regular /></n-icon>
                    </template>
                </n-button>
                <n-button round style="font-size: 18px" @click="player.put_in_playlist(music_detials)">
                    <template #icon>
                        <n-icon><TextBulletListAdd24Filled /></n-icon>
                    </template>
                </n-button>
            </n-flex>
        </n-flex>
    </n-card>
</template>

<script>
import { NButton, NCard, NEllipsis, NFlex, NIcon } from 'naive-ui';
import { player } from '@/stores/player';
import { Heart28Regular, Play24Regular, TextBulletListAdd24Filled } from '@vicons/fluent/lib';
import { utils } from '@/stores/utils';
import querystring from 'querystring';

export default {
    name: 'HalfList',
    methods:{
        get_music_detials(hash){
            const url = '/host/get_song_info';
            this.$axios.get(url, {params:{
                hash: hash
            }}).then(res => {
                // console.log(res.data);
                this.music_detials.song_name = res.data.songName;
                this.music_detials.author_name = res.data.author_name;
                this.music_detials.url = res.data.url;
                this.music_detials.album_img = res.data.album_img.replace("{size}","240");
                this.music_detials.hash = res.data.hash;
            })
        },
        get_music_detials_props(){
            // console.log(this.music_info)
            this.music_detials.song_name = this.music_info.songname;
            this.music_detials.author_name = this.music_info.author_name;
            this.music_detials.url = this.music_info.url;
            this.music_detials.album_img = this.music_info.album_img;
            this.music_detials.hash = this.music_info.hash;
        },
        put_in_playlist(detials){
            var message = this.player.put_in_playlist(detials);
            if(message != 0){
                console.log("???")
            }
        },
        put_in_favorites(detials){
            if (this.utils.user_config.uid == "") {
                window.$message.warning("未登录");
                console.log("未登录")
            } else {
                this.onError = false;
                var url = "/host/collect";
                this.$axios.post(url, querystring.stringify({
                    id: this.utils.user_config.uid,
                    name: detials.song_name,
                    singer: detials.author_name,
                    hash: detials.hash,
                    url: detials.url,
                    album: detials.song_name
                    // album_url: detials.song_name
                })).then(res => {
                var data = res.data;
                // console.log(data.status)
                }).catch(function (error) {
                console.log(error);
                })
            }
        }
    },
    mounted() {
        // console.log(this.music_info)
        this.get_music_detials(this.music_info.hash);
        // this.get_music_detials_props();
    },
    data() {
        return{
            player,
            utils,
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
                    // hash: "71194BC4C1F44C344774719CED11839B"
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
        NButton,
        NIcon
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.n-card {
    display: flex;
    flex-direction: row;
    width: 40%;
    min-width: 40%;
    padding: 10px;
    height: 100px;
    margin-right: 20px;
    border-radius: 12px;
    box-shadow: rgba(0, 0, 0, 0.1) 2px 8px 12px;
    transition: transform 0.3s
}
.n-card:hover{
    transform: scale(1.02);
}
.n-card img{
    height: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 12px;
    position: relative;
    transition: filter 0.3s ease;
    /* box-shadow: inset; */
}
/* .cover-img:hover::before{
    content: "播放";
    position: absolute;
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
    filter: brightness(80%);
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
    /* padding-left: 2px; */
    padding-right: 2px;
}

</style>
