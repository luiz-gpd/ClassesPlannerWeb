import Vue from "vue";
import VueMaterial from "vue-material";
import App from "./App.vue";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
import { router } from "./_helper/router";

Vue.config.productionTip = false;
Vue.use(VueMaterial);
new Vue({
  el: "#app",
  router,
  render: (h) => h(App),
}).$mount("#app");
