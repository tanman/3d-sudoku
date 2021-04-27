<template>
  <div>
    <v-container
      v-for="rowIndex in 9"
      :key="rowIndex"
      class="pa-0"
      align="center"
    >
      <v-row align="center" no-gutters>
        <v-col v-for="colIndex in 9" align="center" :key="colIndex">
          <v-card
            :class="[
              '',
              highlightCheck(rowIndex, colIndex),
              solvedClasses,
              ...getBorderClasses(rowIndex, colIndex),
            ]"
            outlined
            tile
            style="padding-top: 6.9px; padding-bot: 6.9px;"
            @click="highlight(rowIndex, colIndex)"
          >
            <span :class="['', ...getNumClasses(rowIndex, colIndex)]">{{
              matrixLookup(rowIndex, colIndex)
            }}</span>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "Board",

  props: {
    color: {
      type: String,
      default: () => "",
    },
    boardName: {
      type: String,
      default: () => "",
    },
  },

  data() {
    return {
      emptyIndexes: [],
    };
  },

  mounted() {
    this.getBoardByName(this.boardName).problem.forEach((num, index) => {
      if (num === 0) this.emptyIndexes.push(index);
    });
  },

  computed: {
    ...mapGetters([
      "selection",
      "getBoardByName",
      "isUserInputtedNumber",
      "solved",
    ]),

    solvedClasses() {
      if (this.solved(this.boardName)) return "solved";
      return "";
    },
  },

  methods: {
    ...mapMutations(["select"]),

    getBorderClasses(rowIndex, colIndex) {
      let borderClasses = [];
      if (rowIndex % 3 === 0) borderClasses.push("border-bottom");
      if (colIndex % 3 === 0 && colIndex % 9 !== 0)
        borderClasses.push("border-right");
      return borderClasses;
    },
    getNumClasses(rowIndex, colIndex) {
      let classes = [];
      if (this.matrixLookup(rowIndex, colIndex) === 0) classes.push("hidden");
      let index = (rowIndex - 1) * 9 + colIndex - 1;
      if (this.emptyIndexes.includes(index)) classes.push("black--text");
      // let payload = {
      //   boardName: this.boardName,
      //   rowIndex: rowIndex,
      //   colIndex: colIndex,
      // };
      // if (this.isUserInputtedNumber(payload)) classes.push("inputted");
      return classes;
    },
    highlight(rowIndex, colIndex) {
      let index = (rowIndex - 1) * 9 + colIndex - 1;
      if (!this.emptyIndexes.includes(index)) return;
      this.select({
        boardName: this.boardName,
        rowIndex: rowIndex,
        colIndex: colIndex,
      });
    },
    highlightCheck(rowIndex, colIndex) {
      if (this.selection.boardName !== this.boardName) return "";
      if (
        rowIndex === this.selection.rowIndex &&
        colIndex === this.selection.colIndex
      )
        return "highlighted";
      return "";
    },
    matrixLookup(rowIndex, colIndex) {
      let board = this.getBoardByName(this.boardName);
      let index = (rowIndex - 1) * 9 + colIndex - 1;
      if (board.problem[index] === 0) return 0;
      return board.problem[index];
    },
  },
};
</script>

<style scoped>
.v-sheet.v-sheet--outlined.solved {
  background-color: #abffbc !important;
}
.v-sheet.v-sheet--outlined {
  color: #5c5c5c;
}
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
