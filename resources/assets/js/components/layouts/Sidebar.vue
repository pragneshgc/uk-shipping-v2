<template>
    <div class="sidebarWrapper" :class="{ 'collapsed': !sidebarVisible }">
        <ul class="sidebar">
            <li class="sidebarSection parentActive">
                <ul class="nav">
                    <li title="Pharmacy" style="background: #3ca5a8;" v-if="userInfo.pharmacy_role > 0">
                        <a class="sidebar-link" :href="appInfo.esa">
                            <i class="fa fa-user-md"></i>
                            Pharmacy
                        </a>
                    </li>

                    <li title="Inventory" style="background: #006855;" v-if="userInfo.inventory_role > 0">
                        <a class="sidebar-link" :href="appInfo.inventory">
                            <i class="fa fa-barcode"></i>
                            Inventory
                        </a>
                    </li>

                    <li>
                        <router-link to="/" class="sidebar-link">
                            <i class="fa fa-home"></i>
                            Home
                        </router-link>
                    </li>

                    <li>
                        <router-link v-if="canUserAccessModule(
                            appInfo.active_modules,
                            appInfo.module_roles,
                            'Import Tracking',
                            userInfo.shipping_role_id
                        )" to="/import-tracking" class="sidebar-link">
                            <i class="fa fa-upload"></i>
                            Import Tracking
                        </router-link>
                    </li>

                    <li>
                        <router-link v-if="canUserAccessModule(
                            appInfo.active_modules,
                            appInfo.module_roles,
                            'Shipping Reports',
                            userInfo.shipping_role_id
                        )" to="/reports" class="sidebar-link">
                            <i class="fa fa-file-text-o"></i>
                            Reports
                        </router-link>
                    </li>
                </ul>
            </li>

            <li class="collapse-menu-section">
                <a class="sidebar-link collapse-menu-link" title="Collapse menu" @click="$emit('sidebartoggle')"
                    href="javascript:;">
                    <i class="fa fa-caret-left" :class="{ 'fa-caret-right': !sidebarVisible }"></i>
                    Collapse menu
                </a>
            </li>
        </ul>
        <!-- <a @click="$emit('sidebartoggle')" href="javascript:;" class="collapseToggler">Collapse menu</a> -->
    </div>
</template>
<script>
import { canUserAccessModule } from '../../helpers';
export default {
    props: ['sidebarVisible'],
    data: function () {
        return {
            userInfo: userInfo,
            appInfo: appInfo,
            canUserAccessModule
        }
    },
}
</script>
