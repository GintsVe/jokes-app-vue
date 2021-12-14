<template>
  <div>
    <h1>yes</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

type RandomJokeType = {
  joke: string;
};

export default defineComponent({
  name: "Random jokes",
  data: () => ({
    jokes: [] as RandomJokeType[],
  }),
});
</script>
