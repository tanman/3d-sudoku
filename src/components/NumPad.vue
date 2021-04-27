<template>
  <div v-if="show === true">
    <div class="d-flex justify-center">
      <div>
        <v-btn outlined @click="sendNum(1)">1</v-btn>
        <v-btn outlined class="mx-2" @click="sendNum(2)">2</v-btn>
        <v-btn outlined @click="sendNum(3)">3</v-btn>
      </div>
    </div>
    <div class="d-flex justify-center pt-4">
      <div>
        <v-btn outlined @click="sendNum(4)">4</v-btn>
        <v-btn outlined class="mx-2" @click="sendNum(5)">5</v-btn>
        <v-btn outlined @click="sendNum(6)">6</v-btn>
      </div>
    </div>
    <div class="d-flex justify-center pt-4">
      <div>
        <v-btn outlined @click="sendNum(7)">7</v-btn>
        <v-btn outlined class="mx-2" @click="sendNum(8)">8</v-btn>
        <v-btn outlined @click="sendNum(9)">9</v-btn>
      </div>
    </div>
    <div class="d-flex justify-center pt-4">
      <div>
        <v-btn outlined @click="sendNum('close')">close</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "NumPad",

  data() {
    return {
      show: true,
    };
  },

  computed: {
    ...mapGetters(["selection", "boardIsValid", "currentFace", "cubeIsValid"]),
  },

  methods: {
    ...mapActions(["handleInput"]),
    ...mapMutations(["setSolved", "setCubeSolved", "clearSelection"]),

    sendNum(num) {
      if (num === "close") {
        this.show = false;
        this.clearSelection();
        return;
      } else {
        this.show = true;
      }
      this.handleInput(num);
      // do a check for board validation
      if (this.boardIsValid(this.currentFace.name))
        this.setSolved({
          boardName: this.currentFace.name,
          solved: true,
        });
      // then a full cube check
      if (this.cubeIsValid) {
        this.setCubeSolved(true);
      }
    },
  },
};
</script>

<style scoped>
.v-btn {
  border-radius: 0 !important;
}
</style>
