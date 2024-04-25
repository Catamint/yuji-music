<template>
    <n-button text style="display: flex;">
        <h2>Top 100 ></h2>
        <!-- <template #icon>
        <n-icon> <ChevronRight16Filled /> </n-icon>
        </template> -->
    </n-button>

    <div class="cards-block">
        <SongCard class="item" :music_info="musicinfo" />
        <SongCard class="item" v-for="info in music_info_list" :music_info="info" />
    </div>
</template>

<script>
import { ChevronRight16Filled } from '@vicons/fluent/lib';
import SongCard from './SongCard.vue';

const musicinfo = {
    "last_sort": 62,
    "authors": [
        {
            "sizable_avatar": "http:\/\/singerimg.kugou.com\/uploadpic\/softhead\/{size}\/20230420\/20230420152007165811.jpg",
            "is_publish": 1,
            "author_id": 3801,
            "author_name": "赵雷"
        }
    ],
    "rank_count": 0,
    "rank_id_publish_date": "2018-11-06 16:08:53",
    "songname": "成都",
    "topic_url_320": "",
    "sqhash": "FA6816B99646D82EE86F9CD004D118E1",
    "fail_process": 4,
    "pkg_price": 1,
    "addtime": "2018-11-06 09:30:13",
    "rp_type": "audio",
    "album_id": "1946722",
    "privilege_high": 0,
    "topic_url_sq": "",
    "rank_cid": 0,
    "inlist": 1,
    "320filesize": 13124110,
    "pkg_price_320": 1,
    "feetype": 0,
    "filename": "赵雷 - 成都",
    "duration_high": 0,
    "fail_process_320": 4,
    "zone": "tx6_gz_kmr",
    "topic_url": "",
    "rp_publish": 1,
    "trans_obj": {
        "rank_show_sort": 1
    },
    "hash": "71194BC4C1F44C344774719CED11839B",
    "sqfilesize": 32009542,
    "sqprivilege": 10,
    "pay_type_sq": 3,
    "bitrate": 128,
    "pkg_price_sq": 1,
    "has_accompany": 1,
    "musical": null,
    "pay_type_320": 3,
    "extname_super": "",
    "duration_super": 0,
    "bitrate_super": 0,
    "hash_high": "",
    "duration": 328,
    "album_sizable_cover": "http:\/\/imge.kugou.com\/stdmusic\/{size}\/20240227\/20240227223902990164.jpg",
    "price_sq": 200,
    "mvdata": [
        {
            "id": "626468",
            "trk": "3",
            "hash": "F4A0CBA5A274059DCF4BDCBD87BA0802",
            "typ": 0
        }
    ],
    "old_cpy": 0,
    "filesize_super": 0,
    "m4afilesize": 0,
    "filesize_high": 0,
    "320privilege": 10,
    "remark": "无法长大",
    "isfirst": 0,
    "privilege": 8,
    "320hash": "1B6F021DA8CA2CEB2783661E7B1CF0CC",
    "price": 200,
    "extname": "mp3",
    "price_320": 200,
    "mvhash": "CC3CAA6CF44B9C00CDC78A8FEC01EFFD",
    "sort": 73,
    "trans_param": {
        "ipmap": {
            "attr0": 128
        },
        "language": "国语",
        "cpy_grade": 5,
        "classmap": {
            "attr0": 234885128
        },
        "qualitymap": {
            "attr0": 121159733
        },
        "pay_block_tpl": 1,
        "cid": 6195611,
        "display_rate": 1,
        "cpy_attr0": 0,
        "hash_multitrack": "42B7587230BEEA36F1FCC0E477E0E803",
        "appid_block": "3124",
        "musicpack_advance": 0,
        "display": 32,
        "cpy_level": 1
    },
    "recommend_reason": "",
    "album_audio_id": 53532136,
    "bitrate_high": 0,
    "issue": 103,
    "pay_type": 3,
    "filesize": 5249759,
    "hash_super": "",
    "audio_id": 1082841533,
    "first": 0,
    "privilege_super": 0,
    "fail_process_sq": 4
}
export default {
    name: 'Container',
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
                return ""
            }
        }
    },
    components: {
        SongCard
    },
    data() {
        return {
            musicinfo: musicinfo,
            ChevronRight16Filled
        }
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
