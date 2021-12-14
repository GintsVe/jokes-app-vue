<template>
  <div>
    <div class="jokes-page">
      <input
        class="input"
        placeholder="Search"
        type="text"
        v-model="searchInput"
      />
      <div class="jokes">
        <div v-for="{ joke, id } in filter()" :key="id">
          <router-link
            class="router-link"
            :to="{ path: `/random-jokes/${id}` }"
          >
            <div class="joke center">
              <h2 class="headings2">{{ joke }}</h2>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

type RandomJokeType = {
  joke: string;
  id: number;
};

type JokesType = {
  error: boolean;
  amount: number;
  jokes: RandomJokeType[];
};

export default defineComponent({
  name: "Random jokes",
  data: () => ({
    allJokesData: {} as JokesType,
    searchInput: "",
  }),
  mounted() {
    axios
      .get("https://v2.jokeapi.dev/joke/Programming?type=single&amount=10")
      .then((result) => {
        this.allJokesData = result.data as JokesType;
      });
  },
  methods: {
    filter() {
      if (!this.searchInput) {
        return this.allJokesData.jokes;
      } else {
        return this.allJokesData.jokes.filter(({ joke }) =>
          joke.toLowerCase().includes(this.searchInput.toLowerCase())
        );
      }
    },
  },
});
</script>

<style>
.center {
  align-items: center;
}
</style>
