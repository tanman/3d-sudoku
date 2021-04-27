<template>
  <div class="banner">
    <div class="d-flex justify-center mt-12">
      <h1>WELCOME TO SUDOKU LAND!</h1>
    </div>
    <div class="d-flex justify-center pt-0 mt-n4">
      <h2>SELECT YOUR DIFFICULTY</h2>
    </div>
    <div class="d-flex justify-center hand pt-0">
      <h3 @click="selectDifficulty('turboEasy')">TURBO EASY</h3>
    </div>
    <div class="d-flex justify-center hand pt-0 mt-n2">
      <h3 @click="selectDifficulty('easy')">EASY</h3>
    </div>
    <div class="d-flex justify-center hand pt-0 mt-n2">
      <h3 @click="selectDifficulty('medium')" class="px-2">MEDIUM</h3>
    </div>
    <div class="d-flex justify-center hand pt-0 mt-n2">
      <h3 @click="selectDifficulty('hard')">HARD</h3>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "Welcome",

  methods: {
    ...mapMutations(["setDifficulty"]),

    selectDifficulty(difficulty) {
      this.setDifficulty(difficulty);
    },
  },
};
</script>

<style scoped>
.hand {
  cursor: pointer;
}
</style>
