<template>
  <div v-if="Object.keys(jokes).length > 0">
    <h1 class="headings1">Question: {{ jokes.question }}</h1>
    <h1 class="headings1">Answer: {{ jokes.answer }}</h1>
    <h3 class="headings3">{{ jokes.timeStamp }}</h3>
  </div>
  <div v-else>
    <h1>Joke Not Found</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { JokeType } from "@/views/Jokes.vue";

export default defineComponent({
  name: "Joke",
  data: () => ({
    jokes: {} as JokeType,
  }),
  mounted() {
    if (localStorage.jokes !== null) {
      this.jokes = JSON.parse(localStorage.jokes)[
        Number(this.$route.params.id)
      ];
    }
  },
});
</script>
