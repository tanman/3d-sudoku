<template>
  <div>
    <v-container
      v-for="(row, rowIndex) of board"
      :key="rowIndex"
      class="grey lighten-5 pa-0"
      align="center"
    >
      <v-row align="center" no-gutters>
        <v-col v-for="(num, colIndex) of row" align="center" :key="colIndex">
          <v-card
            :class="highlightCheck(rowIndex, colIndex) ? 'highlighted mx-0' : 'mx-0'"
            outlined
            tile
            style="padding-top: 6.9px; padding-bot: 6.9px;"
            @click="highlight(rowIndex, colIndex)"
          >
            {{ num }}
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Board",
  
  // props() {
  //   // color: String
  // },
  
  data() {
    return {
      board: [
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
      ],
      selectedRow: null,
      selectedCol: null,
    };
  },

  methods: {
    highlight(rowIndex, colIndex) {
      console.log(rowIndex, colIndex);
      this.selectedRow = rowIndex;
      this.selectedCol = colIndex;
    },
    highlightCheck(rowIndex, colIndex) {
      if (rowIndex === this.selectedRow && colIndex === this.selectedCol)
        return true;
      return false;
    },
  },
};
</script>

<style scoped>
.highlighted {
  background: lightblue !important;
}
</style>
