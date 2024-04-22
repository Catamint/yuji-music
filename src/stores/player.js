import {reactive} from 'vue'

export const player = reactive({
    playlist:[], //播放列表
    current: 0,
    is_playing: false,

    play_in_playlist(num){
        if(num > 0 && num < this.playlist.length()){
            this.current = num;
        } else {
            console.log("num out of playlist.length");
        }
    },
    //直接播放
    play(music_detials){
        if(music_detials.url != ""){
            this.playlist = [music_detials];
            this.current = 0;
            this.is_playing = true;
        } else {
            console.log("歌曲url为空");
        }
    }
    //添加到播放列表(头/尾)
    //暂停
    //从播放列表删除(hash)
    //排序(hash, pre, after)
})