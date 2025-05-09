import { reactive } from 'vue';
import api from '@/stores/api.js';
import { getAlbumPicUrl } from '@/services/songService.js';

export const player = reactive({
    playlist: [], // 播放列表
    current: 0, // 当前播放的索引
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
            music_details.album.img = await getAlbumPicUrl(music_details.album.picId);
        }

        try {
            // 调用 API 获取歌曲链接
            const response = await api.gdstudioGetSong('netease', music_details.id);
            const songUrl = response?.url;

            if (songUrl) {
                music_details.url = songUrl;
                music_details.playing = true;
                this.playlist = [music_details]; // 设置为当前播放列表
                this.current = 0;
                this.set_play(); // 设置为播放状态
            } else {
                console.error('无法获取歌曲链接');
            }
            
        } catch (error) {
            console.error('Error fetching song URL:', error.message);
        }

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

    // 检查歌曲是否在播放列表中
    is_in_list(id) {
        return this.playlist.some(item => item.id === id);
    },

    // 添加到播放列表（尾部）
    async put_in_playlist(music_details) {
        if (!music_details.album || !music_details.album.picId) {
            console.error('歌曲信息不完整');
            console.log('歌曲信息:', music_details);
            return;
        }

        // 调用 getAlbumPicUrl 获取专辑图片
        if (music_details.album.picId) {
            music_details.album.img = await getAlbumPicUrl(music_details.album.picId);
        }

        try {
            // 如果歌曲链接不存在，则获取链接
            if (!music_details.url) {
                const response = await api.gdstudioGetSong('netease', music_details.id);
                music_details.url = response?.url || '';
            }

            if (music_details.url && !this.is_in_list(music_details.id)) {
                this.playlist.push(music_details);
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
            this.playlist[this.current].playing = false;
            this.current = songIndex;
            this.playlist[this.current].playing = true;
            this.set_play();
        } else {
            console.error('歌曲不在播放列表中');
        }
    },

    // 从播放列表中删除指定歌曲
    del_from_list(id) {
        const songIndex = this.playlist.findIndex(item => item.id === id);
        if (songIndex !== -1) {
            const isCurrent = this.current === songIndex;
            this.playlist.splice(songIndex, 1);

            if (isCurrent) {
                if (this.playlist.length > 0) {
                    this.current = 0;
                    this.playlist[this.current].playing = true;
                } else {
                    this.current = 0;
                    this.is_playing = false;
                }
            }
        } else {
            console.error('歌曲不在播放列表中');
        }
    },

    // 播放下一首
    play_next() {
        if (this.playlist.length === 0) return;

        this.playlist[this.current].playing = false;
        if (this.current === this.playlist.length - 1) {
            this.current = 0; // 列表循环
        } else {
            this.current += 1;
        }
        this.playlist[this.current].playing = true;
        this.set_play();
    },

    // 播放上一首
    play_prev() {
        if (this.playlist.length === 0) return;

        this.playlist[this.current].playing = false;
        if (this.current === 0) {
            this.current = this.playlist.length - 1; // 列表循环
        } else {
            this.current -= 1;
        }
        this.playlist[this.current].playing = true;
        this.set_play();
    },

    // 播放结束后自动播放下一首
    end_and_next() {
        this.playlist[this.current].playing = false;
        if (this.playlist.length === 1) {
            // 如果只有一首歌，重置播放时间并重新播放
            this.set_pause();
            this.currentTime = 0; // 重置播放时间
            this.playlist[this.current].playing = true;
            this.set_play();
            return;
        }
        if (this.playmode === 0) {
            this.play_next(); // 列表循环
        } else if (this.playmode === 1) {
            this.playlist[this.current].playing = true; // 单曲循环
            this.set_play();
        }
    },
});