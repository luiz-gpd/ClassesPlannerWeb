import Vue from 'vue';
import Router from 'vue-router';
import DefaultLayout from './layouts/TracksLayout.vue';
import Login from './views/Login.vue';
import Home from './views/Home.vue';
import Admin from './views/Admin.vue';
// import meuPerfil from './views/meuPerfil.vue';

import Blank from './views/Blank.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: 'login',
          name: 'login',
          component: Login,
        },
        {
          path: 'home',
          name: 'home',
          component: Home,
        },
        {
          path: '/admin',
          name: 'admin',
          component: Admin,
        },
        // {
        //   path: '/meuPerfil',
        //   name: 'meuPerfil',
        //   component: meuPerfil,
        // },
      ],
    },
    {
      path: '/blank',
      name: 'blank',
      component: Blank,
    },
  ],
});