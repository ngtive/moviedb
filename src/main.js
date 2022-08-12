import Vue from "vue";
import VueRouter from "vue-router";
import router from "./router";
import store from "./store/default";

import axios from "axios";

window.axios = axios;

Vue.use(VueRouter);

const app = new Vue({
  router,
  store,
});
app.$mount("#app");
