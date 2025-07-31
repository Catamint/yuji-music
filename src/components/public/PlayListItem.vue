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
        <div class="flex gap-2">
            <button 
                :disabled="music_info.playing"
                @click="player.play_in_playlist(music_info.id)"
                class="p-2 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
                <Play24Regular class="w-5 h-5"/>
            </button>

            <button 
                class="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
                <Heart28Regular class="w-5 h-5"/>
            </button>

            <button 
                @click="player.del_from_list(music_info.id)"
                class="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
                <TextBulletListAdd24Filled class="w-5 h-5"/>
            </button>
        </div>
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
