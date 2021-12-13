import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Jokes from "../views/Jokes.vue";
import RandomJokes from "@/views/RandomJokes.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/jokes",
    name: "Jokes",
    component: Jokes,
  },
  {
    path: "/random-jokes",
    name: "Random jokes",
    component: RandomJokes,
  },
  { path: "/", redirect: "/jokes" },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
