import {reactive} from 'vue'

export const player = reactive({
    playlist:[], //播放列表
    current: 0,
    is_playing: false,
    playmode: 0, // 0: 列表循环 1：单曲循环

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
            music_detials.playing = true;
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
    is_in_list(hash){
        for(let item of this.playlist){
            if (hash == item.hash){
                return true;
            } else {
                return false;
            }
        }
    },
    //添加到播放列表(尾)
    put_in_playlist(music_detials){
        // 尾
        if(music_detials.url != ""){
            if(!this.is_in_list(music_detials.hash)){
                this.playlist.push(music_detials);
            } else {
                console.log("歌曲已存在")
            }
            
        }
    },
    //下一首播放（头）

    //从播放列表删除(hash)
    del_from_list(music_detials){
        //如果不是当前在播的歌曲(待定)
        if(1) {
            this.playlist.splice(this.playlist.indexOf(music_detials),1);
        } else {

        }
    },
    //排序(hash, pre, after)

    //下一首
    play_next(){
        var current = this.current; 
        this.playlist[this.current].playing = false;
        if(this.playmode == 0){
            if(this.current == this.playlist.length - 1){
                this.current = 0;
                this.playlist[0].playing = true;
            } else {
                this.current += 1;
                this.playlist[this.current].playing = true;
            }
        }
    }
    //上一首
    play_prev(){
        
    }
    //播完后播放下一首

    //进度条
})