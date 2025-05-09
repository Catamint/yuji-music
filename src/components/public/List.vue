<template>
    <BaseMusicItem
        :musicInfo="music_info"
        :layout="'list'"
        @play="onPlay"
        @add-to-favorites="onAddToFavorites"
        @remove-from-favorites="onRemoveFromFavorites"
    />
</template>

<script>
import BaseMusicItem from './BaseMusicItem.vue';

export default {
    name: 'List',
    props: {
        music_info: {
            type: Object,
            required: true,
        },
    },
    methods: {
        onPlay(details) {
            console.log('Play:', details);
        },
        onAddToFavorites(details) {
            console.log('Add to Favorites:', details);
        },
        onRemoveFromFavorites(details) {
            console.log('Remove from Favorites:', details);
        },
    },
    components: {
        BaseMusicItem,
    },
};
</script>

