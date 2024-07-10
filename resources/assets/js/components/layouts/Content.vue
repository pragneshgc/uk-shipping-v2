<template>
    <div class="contentWrapper" :class="{ 'fullWidth': !sidebarVisible }"> 
        <transition name="slide-left" mode="out-in">
            <div v-if="!$root.$data.online" class="infoBox warning">
                <p>Can't reach the server! Please check your internet connection.</p>
            </div>   
        </transition>

        <transition name="slide-left" mode="out-in">              
            <router-view></router-view>
        </transition>            
    </div>
</template>
<script>
    export default {
        props: ['sidebarVisible'],
        data: function () {
            return {
                
            }
        },
    }
</script>