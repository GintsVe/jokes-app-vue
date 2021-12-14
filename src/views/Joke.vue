<template>
  <div v-if="jokes.length > 0">
    <h1 class="headings1 headings1--color-black">
      Question: {{ jokes[id].question }}
    </h1>
    <h1 class="headings1 headings1--color-black">
      Answer: {{ jokes[id].answer }}
    </h1>
    <h1>{{ jokes[id].timeStamp }}</h1>
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
    jokes: [] as JokeType[],
    id: 0,
  }),
  mounted() {
    if (
      localStorage.jokes !== null &&
      Number(this.$route.params.id) !== undefined
    ) {
      this.jokes = JSON.parse(localStorage.jokes);
      this.id = Number(this.$route.params.id);
    }
  },
});
</script>

<style>
.headings1--color-black {
  color: black;
}
</style>
