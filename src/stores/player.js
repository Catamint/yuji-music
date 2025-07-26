import { reactive } from 'vue';
// import api from '@/stores/api.js';
import songService from '@/services/songService.js';

export const player = reactive({
    playlist: [], // 播放列表
    currentIndex: 0, // 当前播放的索引
    is_playing: false, // 是否正在播放
    dragging: false, // 是否正在拖动进度条
    currentTime: 0, // 当前播放时间
    duration: 0, // 当前歌曲总时长
    playmode: 0, // 播放模式：0 列表循环，1 单曲循环

    // 播放指定歌曲
    async play(music_details) {
        if (!music_details.album || !music_details.album.picId) {
            console.error('歌曲信息不完整');
            return;
        }

        // 调用 getAlbumPicUrl 获取专辑图片
        if (music_details.album.picId) {
            music_details.album.img = await songService.getAlbumPicUrl(music_details.album.picId);
        }

        try {
            // 调用 API 获取歌曲链接
            const songUrl = await songService.getSongUrl(music_details.id);

            if (songUrl) {
                music_details.url = songUrl;
                music_details.playing = true;
                this.playlist = [music_details]; // 设置为当前播放列表
                this.currentIndex = 0;
                this.set_play(); // 设置为播放状态
            } else {
                console.error('无法获取歌曲链接');
            }
            
        } catch (error) {
            console.error('Error fetching song URL:', error.message);
        }
    },
    async putMultiToPlaylist(songlist){
        if (!Array.isArray(songlist) || songlist.length === 0) {
            console.log(songlist);
            console.error('歌曲列表不正确');
            return;
        }

        this.playlist = await songlist.map(track => ({
            ...track,
            playing: false,
            url: track.url || songService.getSongUrl(track.id) || '' // 确保每首歌都有 url 属性
        }));

        this.currentIndex = 0;
        this.playlist[this.currentIndex].playing = true;
        this.set_play();
    },
    playAlbum(id) {
        // 获取专辑详情
        songService.getAlbum(id).then(album => {
            putMultiToPlaylist(album.songs).then(() => {
                console.log('专辑播放列表已设置');
            }).catch(error => {
                console.error('Error setting album playlist:', error.message);
            });
        }).catch(error => {
            console.error('Error fetching album details:', error.message);
        });
    },

    // 设置播放状态
    set_play() {
        this.is_playing = true;
    },

    // 设置暂停状态
    set_pause() {
        this.is_playing = false;
    },

    // 设置播放模式
    set_playmode(mode) {
        this.playmode = mode;
    },

    // 设置当前播放时间
    set_current_time(currentTime) {
        this.currentTime = currentTime;
    },

    // 设置当前歌曲总时长
    set_duration(duration) {
        this.duration = duration;
    },

    // 设置循环播放
    set_loop(mode) {
        this.playmode = mode; // 列表循环
    },

    // 检查歌曲是否在播放列表中
    is_in_list(id) {
        return this.playlist.some(item => item.id === id);
    },

    // 添加到播放列表（下一首）
    async put_in_playlist(music_details) {
        if (!music_details.album || !music_details.album.picId) {
            console.error('歌曲信息不完整');
            console.log('歌曲信息:', music_details);
            return;
        }

        // 调用 getAlbumPicUrl 获取专辑图片
        if (music_details.album.picId) {
            music_details.album.img = await songService.getAlbumPicUrl(music_details.album.picId);
        }

        try {
            // 如果歌曲链接不存在，则获取链接
            if (!music_details.url) {
                const response = await songService.getSongUrl(music_details.id);
                music_details.url = response || '';
                // console.log(response)
            }

            if (music_details.url && !this.is_in_list(music_details.id)) {
                this.playlist.splice(this.currentIndex + 1, 0, music_details);
                // this.playlist.push(music_details);
            } else {
                console.log('歌曲已存在或链接为空');
            }
        } catch (error) {
            console.error('Error adding song to playlist:', error.message);
        }
    },

    // 从播放列表中播放指定歌曲
    play_in_playlist(id) {
        const songIndex = this.playlist.findIndex(item => item.id === id);
        if (songIndex !== -1) {
            this.playlist[this.currentIndex].playing = false;
            this.currentIndex = songIndex;
            this.playlist[this.currentIndex].playing = true;
            this.set_play();
        } else {
            console.error('歌曲不在播放列表中');
        }
    },

    // 从播放列表中删除指定歌曲
    del_from_list(id) {
        const songIndex = this.playlist.findIndex(item => item.id === id);
        if (songIndex !== -1) {
            this.playlist.splice(songIndex, 1);
            if (this.playlist.length === 0) {
                this.currentIndex = -1; // 重置当前索引
                this.is_playing = false; // 停止播放
                this.audio.pause();
                this.audio.src = ''; // 清空音频源
            }
            else if (this.currentIndex >= this.playlist.length) {
                this.currentIndex = 0; // 如果删除的是当前播放的歌曲，自动播放最后一首
            } else {
                console.error('歌曲不在播放列表中');
            }
        }
    },

    // 播放下一首
    play_next() {
        if (this.playlist.length === 0) return;

        this.playlist[this.currentIndex].playing = false;
        if (this.currentIndex === this.playlist.length - 1) {
            this.currentIndex = 0; // 列表循环
        } else {
            this.currentIndex += 1;
        }
        this.playlist[this.currentIndex].playing = true;
        this.set_play();
    },

    // 播放上一首
    play_prev() {
        console.log('play_prev', this.playlist.length, this.currentIndex);
        if (this.playlist.length === 0) return;

        this.playlist[this.currentIndex].playing = false;
        if (this.currentIndex === 0) {
            this.currentIndex = this.playlist.length - 1; // 列表循环
        } else {
            this.currentIndex -= 1;
        }
        this.playlist[this.currentIndex].playing = true;
        this.set_play();
    },

    // 播放结束后自动播放下一首
    end_and_next() {
        this.playlist[this.currentIndex].playing = false;
        if (this.playlist.length === 1) {
            // 如果只有一首歌，重置播放时间并重新播放
            this.set_pause();
            this.currentTime = 0; // 重置播放时间
            this.playlist[this.currentIndex].playing = true;
            this.set_play();
            return;
        }
        if (this.playmode === 0) {
            this.play_next(); // 列表循环
        } else if (this.playmode === 1) {
            this.playlist[this.currentIndex].playing = true; // 单曲循环
            this.set_play();
        }
    }
});