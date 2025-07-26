// player.js

export const PlayMode = {
    SEQUENTIAL: 'sequential', // 顺序播放
    RANDOM: 'random',         // 随机播放
    REPEAT_ONE: 'repeat-one'  // 单曲循环
};

class Player {
    constructor(audio, songService) {
        this.audio = audio;
        this.songService = songService;
        this.playlist = [];
        this.currentIndex = -1;
        this.mode = PlayMode.SEQUENTIAL;
        this.audio.addEventListener('ended', () => {
            this.next();
        });
        this.is_playing = false; // 是否正在播放
        this.dragging = false; // 是否正在拖动进度条
        this.currentTime = 0; // 当前播放时间
        this.duration = 0; // 当前歌曲总时长
    }

    setPlaylist(playlist) {
        this.playlist = playlist;
        this.currentIndex = 0;
    }

    async play(index = this.currentIndex) {
        if (!this.playlist.length) return;
        this.currentIndex = index;

        const track = this.playlist[this.currentIndex];
        if (!track.url) {
            // 懒加载 URL
            track.url = await this.songService.getSongUrl(track.id);
        }
        if (!track.url) {
            console.error('无法获取歌曲链接');
            return;
        }

        this.audio.src = track.url;
        this.audio.play();
        this.audio.is_playing = true;
        this.is_playing = true;
    }

    async playMulti(songlist) {
        if (!Array.isArray(songlist) || songlist.length === 0) {
            console.log(songlist);
            console.error('歌曲列表不正确');
            return;
        }

        this.playlist = await songlist.map(track => ({
            ...track,
            playing: false,
            url: track.url || '' // 确保每首歌都有 url 属性
        }));

        this.currentIndex = 0;
        this.play();
    }

    pause() {
        this.audio.pause();
        this.is_playing = false;
    }

    toggle() {
        if (this.audio.paused) {
            this.audio.play();
        } else {
            this.audio.pause();
        }
    }

    async next() {
        if (this.mode === PlayMode.REPEAT_ONE) {
            return this.play(this.currentIndex);
        }

        if (this.mode === PlayMode.RANDOM) {
            this.currentIndex = Math.floor(Math.random() * this.playlist.length);
        } else {
            this.currentIndex = (this.currentIndex + 1) % this.playlist.length;
        }

        await this.play();
    }

    async prev() {
        if (this.mode === PlayMode.RANDOM) {
            this.currentIndex = Math.floor(Math.random() * this.playlist.length);
        } else {
            this.currentIndex = (this.currentIndex - 1 + this.playlist.length) % this.playlist.length;
        }

        await this.play();
    }

    setMode(mode) {
        if (Object.values(PlayMode).includes(mode)) {
            this.mode = mode;
        }
    }

    addNextSong(song) {
        this.playlist.splice(this.currentIndex + 1, 0, song);
    }

    insertNext(track) {
        this.playlist.splice(this.currentIndex + 1, 0, track);
    }

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
    }

    on(event, handler) {
        document.addEventListener(`player:${event}`, e => handler(e.detail));
    }
}

export default Player;
