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
      <div class="d-flex justify-center">
        <!-- <board /> -->
      </div>
      <frame />
    </v-main>
  </v-app>
</template>

<script>
// import Board from "./components/Board.vue";
import Frame from "./components/Frame.vue";

export default {
  name: "App",

  components: {
    Frame,
    // Board,
  },

  data: () => ({}),
};
</script>
