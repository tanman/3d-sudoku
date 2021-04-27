<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <span class="">
          Sudoku Land
        </span>
      </div>
    </v-app-bar>

    <v-main>
      <welcome v-if="!difficultySelected" />
      <congrats v-if="cubeSolved" />
      <frame v-if="difficultySelected" />
      <num-pad v-if="!!selection.boardName" />
    </v-main>
  </v-app>
</template>

<script>
import Frame from "./components/Frame.vue";
import NumPad from "./components/NumPad.vue";
import { mapGetters } from "vuex";
import Congrats from "./components/Congrats.vue";
import Welcome from "./components/Welcome.vue";

export default {
  name: "App",

  components: {
    Frame,
    NumPad,
    Congrats,
    Welcome,
  },
  computed: {
    ...mapGetters(["selection", "cubeSolved", "difficultySelected"]),
  },
};
</script>

<style scoped>
.v-app-bar.v-toolbar {
  background-image: url("assets/Sunny-field.jpg");
}
</style>
