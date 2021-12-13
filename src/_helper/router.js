import Vue from "vue";
import Router from "vue-router";

// import { authenticationService } from "../_services/authentication.service";
import Login from "../components/Login";
import PlanCreator from "../components/PlanCreator";
import TrackView from "../components/TrackView";

Vue.use(Router);

export const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      component: Login,
    },
    {
      path: "/plano",
      component: PlanCreator,
    },
    {
      path: "/track",
      component: TrackView,
    },
    // otherwise redirect to home
    { path: "*", redirect: "/" },
  ],
});

// router.beforeEach((to, from, next) => {
//   // redirect to login page if not logged in and trying to access a restricted page
//   const { authorize } = to.meta;
// //   const currentUser = authenticationService.currentUserValue;

//   if (authorize) {
//     // if (!currentUser) {
//     //   // not logged in so redirect to login page with the return url
//     //   return next({ path: "/login", query: { returnUrl: to.path } });
//     // }

//     // check if route is restricted by role
//     // if (authorize.length && !authorize.includes(currentUser.role)) {
//     //   // role not authorised so redirect to home page
//     //   return next({ path: "/" });
//     // }
//   }

//   next();
// });
