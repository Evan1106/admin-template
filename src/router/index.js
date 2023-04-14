import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "LoginView",
    component: () => import("@/views/LoginView.vue")
  },
  {
    path: "/HomeView",
    name: "HomeView",
    component: () => import("@/views/HomeView.vue"),
    redirect: "/HomeView/DashBoard",
    children: [
      {
        path: "/HomeView/DashBoard",
        name: "DashBoard",
        component: () => import("@/views/DashBoard")
      },
      {
        path: "/HomeView/second",
        name: "Second",
        component: () => import("@/views/PageB_Second")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
