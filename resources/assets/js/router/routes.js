//Pages
import Dashboard from "../components/pages/Dashboard.vue";
import ImportTracking from "../components/pages/ImportTracking.vue";
import Order from "../components/pages/Order.vue";
import { canUserAccessModule } from "../helpers";

let hidden = appInfo.hidden;

const routes = [
    {
        path: "/",
        name: "home",
        component: Dashboard,
    },
    {
        path: "/order/:id",
        name: "order",
        component: Order,
    },
    {
        path: "/info",
        name: "App Info",
        //meta: { minRole: 20 },
        // component: FMD
        component: () =>
            import(
                /* webpackChunkName: "Info" */ "../components/pages/general/Info.vue"
            ),
    },
    {
        path: "/404",
        name: "404",
        //component: NotFound
        component: () =>
            import(
                /* webpackChunkName: "NotFound" */ "../components/pages/generic/NotFound.vue"
            ),
    },
    {
        path: "/notallowed",
        name: "not allowed",
        //component: NotAllowed
        component: () =>
            import(
                /* webpackChunkName: "NotAllowed" */ "../components/pages/generic/NotAllowed.vue"
            ),
    },
    {
        path: "/:catchAll(.*)",
        redirect: "/404"
    },
];

if (
    canUserAccessModule(
        appInfo.active_modules,
        appInfo.module_roles,
        "Import Tracking",
        userInfo.shipping_role_id
    )
) {
    routes.push({
        path: "/import-tracking",
        name: "import tracking",
        component: ImportTracking,
    });
}

if (
    canUserAccessModule(
        appInfo.active_modules,
        appInfo.module_roles,
        "Shipping Reports",
        userInfo.shipping_role_id
    )
) {
    routes.push({
        path: "/reports",
        name: "reports",
        component: () =>
            import(
                /* webpackChunkName: "Reports" */ "../components/pages/Reports.vue"
            ),
    });
}

//module.exports = routes;
export default routes;
