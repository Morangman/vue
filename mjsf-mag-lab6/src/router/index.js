import VueRouter from 'vue-router';
import Login from "../views/login";
import Signup from "../views/signup";
import Forgot from "../views/forgot";
import Home from "../views/home";
import Layout from "../views/layout";

export const router = new VueRouter({
  routes: [
    {
      path: "/login",
      component: Login,
      name: "login",
      meta: {title: 'Login page'},
    },
    {
      path: "/signup",
      component: Signup,
      name: "signup",
      meta: {title: 'Signup page'},
    },
    {
      path: "/forgot",
      component: Forgot,
      name: "forgot",
      meta: {title: 'Forgot page'},
    },
    {
      path: '/',
      component: Layout,
      redirect: {name: 'home'},
      children: [
        {
          path: 'home',
          name: "home",
          component: Home,
          meta: {title: 'Home',  requiresAuth: true},
        },
      ],
    },
  ]
});

