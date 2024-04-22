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
            "songname": "\u548c\u5e73\u9882",
            "topic_url_320": "",
            "sqhash": "5342564A78DDEC4E075447E071B552AF",
            "fail_process": 4,
            "pkg_price": 1,
            "addtime": "2021-12-25 22:00:00",
            "rp_type": "audio",
            "album_id": "91827275",
            "privilege_high": 10,
            "topic_url_sq": "",
            "rank_cid": 0,
            "inlist": 1,
            "320filesize": 23521890,
            "pkg_price_320": 1,
            "feetype": 0,
            "filename": "\u5468\u6df1 - \u548c\u5e73\u9882",
            "duration_high": 587,
            "fail_process_320": 4,
            "zone": "",
            "topic_url": "",
            "rp_publish": 1,
            "hash": "053F3D976C48610D3C60226DBFDEAFE0",
            "sqfilesize": 57116362,
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
            "hash_high": "02A77D6F122D4B6B4D186E1D729B7878",
            "duration": 588,
            "album_sizable_cover": "https:\/\/imgessl.kugou.com\/stdmusic\/{size}\/20240418\/20240418173211756924.jpg",
            "price_sq": 200,
            "old_cpy": 0,
            "filesize_super": 0,
            "m4afilesize": 0,
            "filesize_high": 117114789,
            "320privilege": 10,
            "remark": "\u548c\u5e73\u9882",
            "isfirst": 0,
            "privilege": 8,
            "320hash": "1E752BF1CD56C972178F5F013B8AE1B6",
            "price": 200,
            "extname": "mp3",
            "price_320": 200,
            "mvhash": "1F27151A05CD7BBF21DFE2B0FD9F5DBB",
            "sort": 1,
            "trans_param": {
                "init_pub_day": 30,
                "cpy_level": 1,
                "cpy_grade": 5,
                "classmap": {
                    "attr0": 234885128
                },
                "qualitymap": {
                    "attr0": 116
                },
                "cid": 379646061,
                "language": "\u56fd\u8bed",
                "free_limited": 1,
                "cpy_attr0": 32,
                "pay_block_tpl": 1,
                "appid_block": "3124",
                "musicpack_advance": 0,
                "display": 32,
                "display_rate": 1
            },
            "recommend_reason": "",
            "album_audio_id": 624115583,
            "bitrate_high": 1593,
            "issue": 1,
            "pay_type": 3,
            "filesize": 9408871,
            "hash_super": "",
            "audio_id": 346109528,
            "first": 0,
            "privilege_super": 0,
            "fail_process_sq": 4,
            "song_url": "https:\/\/m.kugou.com\/mixsong\/abkynz3f.html",
            "singer_name": "\u5468\u6df1",
            "song_name": "\u548c\u5e73\u9882"
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
