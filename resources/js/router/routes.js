export default [
  {
    path: "/",
    redirect: "/en-gb",
    meta: {
      layout: "PersonalPortalDefault",
      requiresAuth: true,
    },
  },
  {
    path: "/en-gb/login",
    name: "login",
    meta: {
      layout: "DefaultLayout",
      title: "Shpock  | The Joy of Selling",
      requiresAuth: false,
    },
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/en-gb",
    name: "home",
    meta: {
      layout: "DefaultLayout",
      title: "Shpock  | The Joy of Selling",
      requiresAuth: true,
    },
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/en-gb/results",
    name: "result",
    meta: {
      layout: "DefaultLayout",
      title: "Shpock  | The Joy of Selling",
      requiresAuth: true,
    },
    component: () => import("../views/ResultView.vue"),
  },
];
