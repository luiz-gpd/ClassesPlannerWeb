import 'nprogress/nprogress.css';
// import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css'

import Vue from 'vue';
import { BootstrapVue, BootstrapVueIcons, ModalPlugin } from 'bootstrap-vue';
import VueSession from 'vue-session';
import vSelect from 'vue-select';
import VModal from 'vue-js-modal';
import Pagination from 'vue-pagination-2';
import Notifications from 'vue-notification';
// import Loading from 'vue-loading-overlay';
import VueJwtDecode from 'vue-jwt-decode';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import variables from '@/variables';
import NProgressPlugin from '../src/plugins/nprogress.plugin';
import AxiosPlugin from '../src/plugins/axios.plugin';
import BaseInput from '@/components/inputs/BaseInput.vue';
import AuthMixin from '@/mixins/auth.mixin';
import UserProfileHeader from '@/components/UserProfileHeader.vue';
import { VueMaskDirective } from 'v-mask';
import Notification from './mixins/notification.mixin';

Vue.use(NProgressPlugin, { showSpinner: true });
Vue.use(AxiosPlugin, variables); // axios plugin depends on the Progress Bar

Vue.use(VueSession);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(ModalPlugin);
Vue.use(VModal, { dialog: true });
Vue.use(Notifications);
Vue.directive('mask', VueMaskDirective);

Vue.use(VueJwtDecode);

Vue.config.productionTip = false;
Vue.component('v-select', vSelect);
Vue.component(BaseInput.name, BaseInput);
Vue.component('Pagination', Pagination);
Vue.component(UserProfileHeader.name, UserProfileHeader);
Vue.component('validation-provider', ValidationProvider);
Vue.component('validation-observer', ValidationObserver);

// Mixins ------
const methods = {
  ...Notification.methods,
};
Vue.mixin({ methods });
Vue.mixin(AuthMixin);
// -------------

new Vue({
  router,
  store,
  render: (h) => h(App),
  beforeCreate() {
    this.$store.dispatch('auth/init');
  },
  created() {
    const token = this.$store.getters['auth/token'];
    const user = this.$store.getters['auth/user'];

    if (user && token) {
      this.$router.push({ name: 'home' }).catch(() => {});
    } else if (this.$router.app._route.name === 'recoverpassword') {
      this.$router.push({ name: 'recoverpassword' });
    } else {
      this.$router.push({ name: 'login' }).catch(() => {});
    }
  },
}).$mount('#app');
