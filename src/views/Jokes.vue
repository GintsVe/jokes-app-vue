<template>
  <div>
    <div class="jokes-page">
      <h1 class="headings1">Create a Joke</h1>
      <form @submit.prevent="submitForm()" class="add-joke">
        <h3 class="headings3">Question</h3>
        <input
          :style="[!uniqueQuestion && { border: `2px solid red` }]"
          v-model="newQuestion"
          placeholder="Enter the question"
          class="input"
          type="text"
        />
        <h3 class="headings3">Answer</h3>
        <input
          v-model="newAnswer"
          placeholder="Enter the punchline"
          class="input"
          type="text"
        />
        <button class="button" :disabled="clickable()">Create</button>
      </form>
      <input
        class="input"
        v-model="searchInput"
        placeholder="Search"
        type="text"
      />
      <div class="jokes">
        <div
          v-for="({ question, answer, showAnswer }, index) in filterJokes()"
          :key="question"
        >
          <div class="joke">
            <div>
              <h2 class="headings2">{{ question }}</h2>
            </div>
            <div v-if="showAnswer">
              <h3 class="headings3 headings3--color-dark">{{ answer }}</h3>
            </div>
            <div class="joke__buttons">
              <button
                @click="revealAnswer(index)"
                class="button button--color-yellow"
              >
                Show me
              </button>
              <button
                @click="deleteJoke(index)"
                class="button button--color-red"
              >
                Delete
              </button>
              <router-link
                class="router-link"
                :to="{ path: `/jokes/${index}` }"
              >
                <button class="button">Joke Info</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export type JokeType = {
  question: string;
  answer: string;
  showAnswer: boolean;
  timeStamp: Date;
};

export default defineComponent({
  name: "Home",
  data: () => ({
    jokes: [] as JokeType[],
    newQuestion: "",
    newAnswer: "",
    uniqueQuestion: true,
    searchInput: "",
  }),
  mounted() {
    if (localStorage.jokes) {
      this.jokes = JSON.parse(localStorage.jokes);
    }
  },
  watch: {
    jokes: {
      handler(newJokes) {
        localStorage.jokes = JSON.stringify(newJokes);
      },
      deep: true,
    },
  },
  methods: {
    clickable() {
      return !(this.newQuestion && this.newAnswer);
    },

    submitForm() {
      const uniqueQuestion = this.jokes.find(
        (joke) => joke.question.toLowerCase() === this.newQuestion.toLowerCase()
      );

      if (!uniqueQuestion) {
        const newJoke = {
          question: this.newQuestion,
          answer: this.newAnswer,
          showAnswer: false,
          timeStamp: new Date(),
        };

        this.jokes.push(newJoke);

        this.newAnswer = "";

        this.newQuestion = "";

        this.uniqueQuestion = true;
      } else {
        this.uniqueQuestion = false;
      }
    },

    revealAnswer(index: number) {
      this.jokes[index].showAnswer = !this.jokes[index].showAnswer;
    },

    deleteJoke(index: number) {
      this.jokes.splice(index, 1);
    },

    filterJokes() {
      if (!this.searchInput) {
        return this.jokes;
      } else {
        return this.jokes.filter((joke) =>
          joke.question.toLowerCase().includes(this.searchInput.toLowerCase())
        );
      }
    },
  },
});
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

body {
  background-color: #222730;
}

.jokes-page {
  margin: 0 auto;
  gap: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1100px;
  width: 100%;
  background-color: #2c3e50;
  padding: 20px;
}

.add-joke {
  border-radius: 5px;
  padding: 20px;
  width: 100%;
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: flex-start;
  background-color: #0dc0b0;
}

.headings1 {
  color: white;
  font-size: 30px;
}

.headings2 {
  font-size: 20px;
  color: black;
}

.headings3 {
  color: white;
  font-size: 16px;
  text-decoration: none;
}

.headings3--color-dark {
  color: #2c3e50;
}

.button {
  background-color: #256765;
  color: white;
  font-size: 16px;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  border: 2px solid transparent;

  &:disabled {
    background-color: rgba(37, 103, 101, 0.53);
    cursor: not-allowed;

    &:hover {
      background-color: rgba(37, 103, 101, 0.53);
    }
  }

  &:hover {
    background-color: #184241;
  }
}

.button--color-red {
  background-color: rgba(207, 0, 57);
  border: 2px solid transparent;

  &:hover {
    background-color: rgb(155, 5, 10);
    border: 2px solid red;
  }
}

.button--color-yellow {
  color: white;
  background-color: rgb(212, 180, 7);
  border: 2px solid transparent;

  &:hover {
    background-color: rgb(164, 140, 6);
    border: 2px solid rgb(224, 197, 49);
  }
}

.input {
  padding: 10px;
  border-radius: 5px;
  border: none;
  width: 100%;
}

.jokes {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.joke {
  border-radius: 5px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  background-color: white;
  width: 100%;
}

.joke__buttons {
  display: flex;
  gap: 10px;
}

.router-link {
  text-decoration: none;
}
</style>
