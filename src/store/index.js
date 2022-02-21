import Vue from 'vue';
import Vuex from 'vuex';
import variables from '../variables';
import LocalstorageStore from '../plugins/localstorage.store.plugin';

// #region modules
import AuthModule from './modules/authStore';
// #endregion modules

console.log(variables.auth.userdetails);
const storeUserPlugin = LocalstorageStore.create(
  'auth/setUser',
  variables.auth.userdetais,
  state => state.auth.user,
);
const storeTokenPlugin = LocalstorageStore.create(
  'auth/setToken',
  variables.auth.appToken,
  state => state.auth.token,
);

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [storeUserPlugin, storeTokenPlugin],
  modules: {
    auth: AuthModule,
  },
});
