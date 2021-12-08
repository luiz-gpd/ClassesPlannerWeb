import Vue from 'vue';
import Router from 'vue-router';
// import Login from './views/Login.vue';
import Blank from './Blank.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
    //   component: DefaultLayout,
      children: [
        // {
        //   path: 'login',
        //   name: 'login',
        //   component: Login,
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

