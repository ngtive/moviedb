import VueRouter from "vue-router";

const routes = [
  {
    path: "/",
    component: require("./views/movies/List").default,
    name: "movie-list",
  },
  {
    path: "/movie/:id",
    component: require("./views/movies/Detail").default,
    name: "movie-detail",
  },
];

const router = new VueRouter({
  mode: "hash",
  routes,
});

export default router;
