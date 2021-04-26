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
      <frame />
    </v-main>
  </v-app>
</template>

<script>
import Frame from "./components/Frame.vue";

export default {
  name: "App",

  components: {
    Frame,
  },

  data: () => ({}),
};
</script>
