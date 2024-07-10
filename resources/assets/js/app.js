import './bootstrap'

import { createApp } from 'vue';

import mitt from 'mitt';
import router from './router';
import AppLayout from "./components/layouts/Layout.vue";
import TableComponent from './components/TableComponent.vue';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Toasted from "@hoppscotch/vue-toasted"
import "@hoppscotch/vue-toasted/style.css";

const app = createApp(AppLayout);

const emitter = mitt();
app.config.globalProperties.emitter = emitter;

app.use(router);

app.component('DataTable', TableComponent);

app.use(VueSweetalert2);
window.Swal = app.config.globalProperties.$swal;
app.use(Toasted);
window.toast = app.config.globalProperties.$toasted;

app.mount('#app');
