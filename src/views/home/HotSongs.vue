<template>
    <SongCard :music_info="musicinfo"/>
</template>

<script>
import SongCard from './SongCard.vue';

const musicinfo = {
            "last_sort": 0,
            "authors": [
                {
                    "sizable_avatar": "http:\/\/singerimg.kugou.com\/uploadpic\/softhead\/{size}\/20230531\/20230531160722881.jpg",
                    "is_publish": 1,
                    "author_name": "\u5468\u6df1",
                    "author_id": 169967
                }
            ],
            "rank_count": 0,
            "rank_id_publish_date": "",
            "songname": "\u8bb0\u5f97",
            "topic_url_320": "",
            "sqhash": "FF6B6D4100D5A3E6176515EAAEF38179",
            "fail_process": 4,
            "pkg_price": 1,
            "addtime": "2021-12-25 22:00:00",
            "rp_type": "audio",
            "album_id": "90711299",
            "privilege_high": 10,
            "topic_url_sq": "",
            "rank_cid": 0,
            "inlist": 1,
            "320filesize": 7869314,
            "pkg_price_320": 1,
            "feetype": 0,
            "filename": "\u5468\u6df1 - \u8bb0\u5f97",
            "duration_high": 196,
            "fail_process_320": 4,
            "zone": "",
            "topic_url": "",
            "rp_publish": 1,
            "hash": "E3C691343EB63EFC4BED7D80AEC5C1C8",
            "sqfilesize": 20662887,
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
            "hash_high": "E23FEBED6E268AE430005A7848114540",
            "duration": 196,
            "album_sizable_cover": "https:\/\/imgessl.kugou.com\/stdmusic\/{size}\/20240403\/20240403152701280651.jpg",
            "price_sq": 200,
            "old_cpy": 0,
            "filesize_super": 0,
            "m4afilesize": 0,
            "filesize_high": 40686829,
            "320privilege": 10,
            "remark": "\u627f\u6b22\u8bb0 \u7535\u89c6\u5267\u5f71\u89c6\u539f\u58f0\u5e26",
            "isfirst": 0,
            "privilege": 8,
            "320hash": "DBC423AAF08757D81CF1D03555E54D7D",
            "price": 200,
            "extname": "mp3",
            "price_320": 200,
            "mvhash": "E48E523EC887986AEE38898D1D28A0C9",
            "sort": 2,
            "trans_param": {
                "cpy_level": 1,
                "pay_block_tpl": 1,
                "cpy_grade": 5,
                "classmap": {
                    "attr0": 234885128
                },
                "qualitymap": {
                    "attr0": 201326708
                },
                "cid": 379113960,
                "language": "\u56fd\u8bed",
                "free_limited": 1,
                "cpy_attr0": 0,
                "ipmap": {
                    "attr0": 4096
                },
                "hash_offset": {
                    "clip_hash": "148F6415A9DD3C71E4FD2012F550707D",
                    "start_byte": 0,
                    "end_ms": 30000,
                    "end_byte": 480294,
                    "file_type": 0,
                    "start_ms": 0,
                    "offset_hash": "D9BF490F3D9C244705E05EF85862BD5A"
                },
                "musicpack_advance": 0,
                "display": 32,
                "display_rate": 1
            },
            "recommend_reason": "",
            "album_audio_id": 619463091,
            "bitrate_high": 1654,
            "issue": 1,
            "pay_type": 3,
            "filesize": 3147838,
            "hash_super": "",
            "audio_id": 345778660,
            "first": 0,
            "privilege_super": 0,
            "fail_process_sq": 4,
            "song_url": "https:\/\/m.kugou.com\/mixsong\/a8t8s300.html",
            "singer_name": "\u5468\u6df1",
            "song_name": "\u8bb0\u5f97"
        }

export default {
    name: 'HotSongs',
    mounted() {
        // this.$axios.get("/kugou/?json=true").then(res => {
        //     var getted = res.data;
        //     this.music_info_list = getted;
        //     console.log(this.music_info_list);
        // })

        this.$axios.get("/kugou-api/v3/tag/list?pid=0&apiver=2&plat=0").then(res => {
            var getted = res.data;
            this.music_info_list = getted;
            console.log(this.music_info_list);
        })
    },
    components:{
        SongCard
    },
    data(){
    return {
        music_info_list: "",
        musicinfo: musicinfo
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
