import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/Dashboard")
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    meta: {
      requiresAuth: true,
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/Dashboard")
  },
  {
    path: "/doctors",
    name: "Doctors",
    meta: {
      requiresAuth: true,
    },
    component: () => import(/* webpackChunkName: "about" */ "../pages/Doctors")
  },
  {
    path: "/patients",
    name: "Patients",
    meta: {
      requiresAuth: true,
    },
    component: () => import(/* webpackChunkName: "about" */ "../pages/Patients")
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/Login/Login.vue")
  },
  {
    path: "/account/create",
    name: "CreateAccount",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/Login/CreateAccount.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    store.dispatch("valid");
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router;
