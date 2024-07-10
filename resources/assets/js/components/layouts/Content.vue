<template>
    <div class="contentWrapper" :class="{ 'fullWidth': !sidebarVisible }">
        <Online />

        <router-view></router-view>
    </div>
</template>
<script>
import Online from '../Online.vue';

export default {
    props: ['sidebarVisible'],
    components: {
        Online
    },
    data: function () {
        return {

        }
    },
}
</script>
