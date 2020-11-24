import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Foods from "../views/Foods";
import FoodDetail from "../views/FoodDetail";
import Cart from "../views/Cart";
import CheckoutSuccess from "../views/CheckoutSuccess";
import Login from "../views/Login";
import { store } from "../store/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: (to, from, next) => {
      if (store.state.authenticated == false) {
        next();
      } else {
        next({ name: "Home" });
      }
    },
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/foods",
    name: "Foods",
    component: Foods,
    meta: { requiresAuth: true },
  },
  {
    path: "/food/:id",
    name: "FoodDetail",
    component: FoodDetail,
    meta: { requiresAuth: true },
  },

  {
    path: "/cart",
    name: "Cart",
    component: Cart,
    meta: { requiresAuth: true },
  },
  {
    path: "/checkout-success",
    name: "CheckoutSuccess",
    component: CheckoutSuccess,
    meta: { requiresAuth: true },
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (store.state.authenticated == false) {
      next({
        path: "/login",
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
