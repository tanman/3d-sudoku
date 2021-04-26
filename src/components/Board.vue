<template>
  <div>
    <v-container
      v-for="rowIndex in 9"
      :key="rowIndex"
      class="grey lighten-5 pa-0"
      align="center"
    >
      <v-row align="center" no-gutters>
        <v-col v-for="colIndex in 9" align="center" :key="colIndex">
          <v-card
            :class="[
              '',
              highlightCheck(rowIndex, colIndex),
              ...getBorderClasses(rowIndex, colIndex),
            ]"
            outlined
            tile
            style="padding-top: 6.9px; padding-bot: 6.9px;"
            @click="highlight(rowIndex, colIndex)"
          >
            <span :class="hiddenClass(rowIndex, colIndex)">{{ matrixLookup(rowIndex, colIndex) }}</span>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Board",

  props: {
    color: {
      type: String,
      default: () => "",
    },
    board: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      // board: [
      //   1, 2, 3, 4, 5, 6, 7, 8, 9,
      //   1, 2, 3, 4, 5, 6, 7, 8, 9,
      //   1, 2, 3, 4, 5, 6, 7, 8, 9,
      //   1, 2, 3, 4, 5, 6, 7, 8, 9,
      //   1, 2, 3, 4, 5, 6, 7, 8, 9,
      //   1, 2, 3, 4, 5, 6, 7, 8, 9,
      //   1, 2, 3, 4, 5, 6, 7, 8, 9,
      //   1, 2, 3, 4, 5, 6, 7, 8, 9,
      //   1, 2, 3, 4, 5, 6, 7, 8, 9,
      // ],
      selectedRow: null,
      selectedCol: null,
    };
  },

  methods: {
    getBorderClasses(rowIndex, colIndex) {
      let borderClasses = [];
      if (rowIndex % 3 === 0) borderClasses.push("border-bottom");
      if (colIndex % 3 === 0 && colIndex % 9 !== 0)
        borderClasses.push("border-right");
      return borderClasses;
    },
    hiddenClass(rowIndex, colIndex) {
      if (this.matrixLookup(rowIndex, colIndex) === 0) return "hidden";
    },
    highlight(rowIndex, colIndex) {
      this.selectedRow = rowIndex;
      this.selectedCol = colIndex;
    },
    highlightCheck(rowIndex, colIndex) {
      if (rowIndex === this.selectedRow && colIndex === this.selectedCol)
        return "highlighted";
      return "";
    },
    matrixLookup(rowIndex, colIndex) {
      let index = (rowIndex - 1) * 9 + colIndex - 1;
      if (this.board.problem[index] === 0) return 0;
      return this.board.problem[index];
    },
  },
};
</script>

<style scoped>
.highlighted {
  background: lightblue !important;
}
.v-sheet.v-sheet--outlined.border-bottom {
  border-bottom: 2px solid black;
}
.v-sheet.v-sheet--outlined.border-right {
  border-right: 2px solid black;
}
.hidden {
  visibility: hidden !important;
}
</style>
