<template>
    <n-button text style="display: flex;">
        <h2>{{ head }}</h2>
        <template #icon>
        <n-icon> <ChevronRight16Filled /> </n-icon>
        </template>
    </n-button>

    <div class="cards-block">
        <!-- <Card class="item" :music_info="musicinfo" /> -->
        <template v-if="subcomponent == 'card'">
            <SongCard class="item" v-for="info in music_info_list" :music_info="info" />
        </template>
        <template v-else-if="subcomponent == 'list'">
            <List class="item" v-for="info in music_info_list" :music_info="info" />
        </template>
        <template v-else-if="subcomponent == 'halflist'">
            <HalfList class="item" v-for="info in music_info_list" :music_info="info" />
        </template>
    </div>
</template>

<script>
import { ChevronRight16Filled } from '@vicons/fluent/lib';

import List from './List.vue';
import HalfList from './HalfList.vue';
import SongCard from '@/views/home/SongCard.vue';

export default {
    name: 'CardContainer',
    methods: {

    },
    props:{
        music_info_list:{
            type:Object,
            default: function(){
                return []
            }
        },
        head:{
            type:String,
            default: function(){
                return "Top 100"
            }
        },
        subcomponent:{
            type: String,
            default: function(){
                return "card"
            }
        }
    },
    components: {
        SongCard,
        List,
        HalfList,
        ChevronRight16Filled
    },
    data() {
        return {

        }
    },
    mounted() {
        console.log(this.subcomponent);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cards-block{
    display: flex;
    box-sizing: border-box;
    padding: 20px; 
    border-radius: 10px;
    width: 100%;
    max-width: 100%;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none; /* firefox */
}
.cards-block .item{
    scroll-snap-align: start;
}
</style>
