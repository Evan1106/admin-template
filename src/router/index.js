import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "LoginView",
    component: () => import("@/views/LoginView")
  },
  {
    path: "/HomeView",
    name: "HomeView",
    component: () => import("@/views/HomeView"),
    redirect: "/HomeView/DashBoard",
    children: [
      {
        path: "/HomeView/DashBoard",
        name: "DashBoard",
        component: () => import("@/views/DashBoard")
      },
      {
        path: "/HomeView/CustomerTable",
        name: "CustomerTable",
        component: () => import("@/views/CustomerTable")
      },
      {
        path: "/HomeView/permission",
        name: "PermissionView",
        component: () => import('@/views/PermissionView')
      },
      {
        path: "/HomeView/gridview",
        name: "Gridview",
        component: () => import('@/views/GridView')
      },
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
