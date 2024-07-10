<template>
    <div>
        <transition name="slide-down" mode="out-in">
            <div v-if="isDemo" class="infoBox warning thin-error">
                <p>Application is running in DEMO mode!</p>
            </div>
        </transition>
        <Header />
        <Sidebar @sidebartoggle="toggleSidebar()" :sidebarVisible="sidebarVisible" />
        <Content :sidebarVisible="sidebarVisible" />
    </div>
</template>

<script>
import Header from './Header.vue'
import Sidebar from './Sidebar.vue'
import Content from './Content.vue'

export default {
    data: function () {
        return {
            sidebarVisible: true,
            appInfo: appInfo
        }
    },
    components: {
        Header, Sidebar, Content
    },
    computed: {
        isDemo() {
            return this.appInfo.mode == 'local' || this.appInfo.mode == 'staging' || this.appInfo.mode == 'demo';
        }
    },
    methods: {
        toggleSidebar() {
            if (this.sidebarVisible === true) {
                this.sidebarVisible = false;
            } else {
                this.sidebarVisible = true;
            }
        },
    },
}
</script>
