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
            // this.set_play(); //dom开启了自动播放所以无需setplay
        } else {
            console.log("歌曲url为空");
        }
    },
    set_play(){
        this.is_playing = true;
    },
    set_pause(){
        this.is_playing = false;
    },
    //添加到播放列表(头/尾)
    put_in_playlist(music_detials, location){
        // 尾
        if(music_detials.url != ""){
            this.playlist.append(music_detials);
        }
    }
    //暂停
    //从播放列表删除(hash)
    //排序(hash, pre, after)

    //下一首
    //上一首
    //播完后播放下一首
    //进度条
})