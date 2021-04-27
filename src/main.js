import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    difficulty: "",
    cubeSolved: false,
    selection: {
      boardName: "",
      rowIndex: "none",
      colIndex: "none",
    },
    cube: {},
    currentFace: "",
  },
  getters: {
    cube: (state) => {
      return state.cube;
    },
    difficultySelected: (state) => {
      return !!state.difficulty;
    },
    difficulty: (state) => {
      return state.difficulty;
    },
    solved: (state) => (boardName) => {
      return state.cube[boardName].solved;
    },
    cubeSolved: (state) => {
      return state.cubeSolved;
    },
    currentFace: (state) => {
      return state.currentFace;
    },
    selection: (state) => {
      return state.selection;
    },
    getBoardByName: (state) => (boardName) => {
      return state.cube[`${boardName}`];
    },
    isUserInputtedNumber: (state) => (payload) => {
      // expected payload
      // {
      //   boardName: "",
      //   rowIndex: 0,
      //   colIndex: 0
      // }
      const { boardName, rowIndex, colIndex } = payload;
      if (state.cube[boardName].userInputs[`${rowIndex}${colIndex}`] > 0)
        return true;
      return false;
    },
    boardIsValid: (state) => (boardName) => {
      let problem = state.cube[boardName].problem;
      let solution = state.cube[boardName].solution;
      let valid = true;
      solution.forEach((num, index) => {
        if (num !== problem[index]) valid = false;
      });
      return valid;
    },
    cubeIsValid: (state) => {
      if (!state.cube.front.solved) return false;
      if (!state.cube.back.solved) return false;
      if (!state.cube.left.solved) return false;
      if (!state.cube.right.solved) return false;
      if (!state.cube.top.solved) return false;
      if (!state.cube.bottom.solved) return false;
      return true;
    },
  },
  mutations: {
    setDifficulty(state, difficulty){
      state.difficulty = difficulty;
    },
    overrideCube(state, payload) {
      state.cube = payload;
    },
    setSolved(state, payload) {
      // expected payload
      // {
      //   boardName: "",
      //   solved: false,
      // }
      const { boardName, solved } = payload;
      state.cube[boardName].solved = solved;
    },
    setCubeSolved(state, solved) {
      state.cubeSolved = solved;
    },
    select(state, payload) {
      state.selection.boardName = payload.boardName;
      state.selection.rowIndex = payload.rowIndex;
      state.selection.colIndex = payload.colIndex;
    },
    writeToSelection(state, num) {
      const { boardName, rowIndex, colIndex } = state.selection;
      state.cube[boardName].problem[(rowIndex - 1) * 9 + colIndex - 1] = num;
    },
    clearSelection(state) {
      state.selection.boardName = "";
      state.selection.rowIndex = "none";
      state.selection.colIndex = "none";
    },
    setCurrentFace(state, face) {
      state.currentFace = face;
    },

    // recordUserInput(state, num) {
    //   const { boardName, rowIndex, colIndex } = state.selection;
    //   state.cube[boardName].userInputs[`${rowIndex}${colIndex}`] = num;
    // },
  },

  actions: {
    handleInput({ commit }, num) {
      // commit("recordUserInput", num);
      commit("writeToSelection", num);
      commit("clearSelection");
    },
  },
});

new Vue({
  vuetify,
  store,
  render: (h) => h(App),
}).$mount("#app");
