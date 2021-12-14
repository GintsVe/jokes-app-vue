<template>
  <div>
    <div class="jokes-page">
      <div v-if="!jokeData.error">
        <div class="add-bottom-padding">
          <h1 class="headings1">{{ jokeData.joke }}</h1>
        </div>
        <div class="joke">
          <h2 class="headings2">Category: {{ jokeData.category }}</h2>
          <h2 class="headings2">NSFW: {{ jokeData.flags?.nsfw }}</h2>
          <h2 class="headings2">Religious: {{ jokeData.flags?.religious }}</h2>
          <h2 class="headings2">Political: {{ jokeData.flags?.political }}</h2>
          <h2 class="headings2">Racist: {{ jokeData.flags?.racist }}</h2>
          <h2 class="headings2">Sexist: {{ jokeData.flags?.sexist }}</h2>
          <h2 class="headings2">Explicit: {{ jokeData.flags?.explicit }}</h2>
          <h2 class="headings2">Safe: {{ jokeData.safe }}</h2>
        </div>
      </div>
      <div v-else>
        <h1 class="headings1">One big ERROR</h1>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

type JokeType = {
  error: boolean;
  category?: string;
  joke?: string;
  flags?: {
    nsfw?: boolean;
    religious?: boolean;
    political?: boolean;
    racist?: boolean;
    sexist?: boolean;
    explicit?: boolean;
  };
  safe?: boolean;
};

export default defineComponent({
  name: "Random joke",
  data: () => ({
    jokeData: {} as JokeType,
  }),
  mounted() {
    const param = Number(this.$route.params.id);
    axios
      .get(`https://v2.jokeapi.dev/joke/Any?type=single&idRange=${param}`)
      .then((result) => {
        this.jokeData = result.data as JokeType;
      });
  },
});
</script>

<style>
.add-bottom-padding {
  padding-bottom: 10px;
}
</style>
