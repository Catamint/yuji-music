<template>
    <base-card
        :title="music_info.name"
        :subtitle="music_info.artist.name"
        :description="music_info.album.name"
        :image="music_info.album.img"
        layout="compact"
        @title-click="player.play_in_playlist(music_info.id)"
        @subtitle-click="goToArtist"
        @description-click="goToAlbum"
    >
        <template #actions>
            <n-button :disabled="music_info.playing" style="font-size: 18px" @click="player.play_in_playlist(music_info.id)">
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
            <n-button style="font-size: 18px" @click="player.del_from_list(music_info.id)">
                <template #icon>
                    <n-icon><TextBulletListAdd24Filled /></n-icon>
                </template>
                从播放列表移除
            </n-button>
        </template>
    </base-card>
</template>

<script>
import { NButton, NCard, NEllipsis, NFlex, NIcon } from 'naive-ui';
import  player2  from '@/stores/player2';
import { Heart28Regular, Play24Regular, TextBulletListAdd24Filled } from '@vicons/fluent/lib';
import BaseCard from '@/components/layout/BaseCardLayout.vue';
export default {
    name: 'PlayListItem',
    methods:{
        put_in_playlist(detials){
            var message = this.player.put_in_playlist(detials);
            if(message != 0){
                console.log("???")
            }
        },
        goToArtist() {
            this.$router.push({ name: 'artist', params: { id: this.music_info.artist.id } });
        },
        goToAlbum() {
            this.$router.push({ name: 'album', params: { id: this.music_info.album.id } });
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
        Heart28Regular,
        TextBulletListAdd24Filled,
        NEllipsis,
        NFlex,
        Play24Regular,
        NIcon,
        NButton,
        BaseCard
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
