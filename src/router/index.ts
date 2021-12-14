import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Jokes from "../views/Jokes.vue";
import RandomJokes from "@/views/RandomJokes.vue";
import Joke from "@/views/Joke.vue";
import RandomJoke from "@/views/RandomJoke.vue";

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
  {
    path: "/jokes/:id",
    name: "Joke",
    component: Joke,
  },
  {
    path: "/random-jokes/:id",
    name: "Random joke",
    component: RandomJoke,
  },
  {
    path: "/",
    redirect: "/jokes",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
