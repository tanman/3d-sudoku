<template>
  <div class="d-flex justify-center">
    <div class="scene">
      <div :class="['cube', currentFace.show]">
        <div class="cube__face cube__face--front">
          <board :board="builder.processedCube.front"/>
        </div>
        <div class="cube__face cube__face--back">
          <board :board="cube.back"/>
        </div>
        <div class="cube__face cube__face--right">
          <board :board="cube.right"/>
        </div>
        <div class="cube__face cube__face--left">
          <board :board="cube.left"/>
        </div>
        <div class="cube__face cube__face--top">
          <board :board="cube.top"/>
        </div>
        <div class="cube__face cube__face--bottom">
          <board :board="cube.bottom"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Board from "./Board.vue";
import * as cube from '../assets/cubeSeed.js' 
import {cubeBuilder} from '../helpers/cubeBuilder.js'
export default {
  name: "Frame",

  components: {
    Board,
  },

  data() {
    return {
      currentFace: {},
      cube: {},
      builder: {},
    };
  },

  methods: {
  },

  created: function() {
    this.cube = cube.default;
    this.builder = new cubeBuilder();
    this.currentFace = this.faces["cube__face--front"];
    window.addEventListener("keyup", (event) => {
      switch (event.key) {
        case "ArrowUp":
          this.currentFace = this.faces[this.currentFace.up];
          break;
        case "ArrowDown":
          this.currentFace = this.faces[this.currentFace.down];
          break;
        case "ArrowLeft":
          this.currentFace = this.faces[this.currentFace.left];
          break;
        case "ArrowRight":
          this.currentFace = this.faces[this.currentFace.right];
          break;
      }
    });
  },

  computed: {
    faces: function() {
      return {
        "cube__face--front": {
          show: "show-front",
          up: "cube__face--top",
          right: "cube__face--right",
          down: "cube__face--bottom",
          left: "cube__face--left",
        },
        "cube__face--back": {
          show: "show-back",
          up: "cube__face--top",
          right: "cube__face--left",
          down: "cube__face--bottom",
          left: "cube__face--right",
        },
        "cube__face--right": {
          show: "show-right",
          up: "cube__face--top",
          right: "cube__face--back",
          down: "cube__face--bottom",
          left: "cube__face--front",
        },
        "cube__face--left": {
          show: "show-left",
          up: "cube__face--top",
          right: "cube__face--front",
          down: "cube__face--bottom",
          left: "cube__face--back",
        },
        "cube__face--top": {
          show: "show-top",
          up: "cube__face--back",
          right: "cube__face--right",
          down: "cube__face--front",
          left: "cube__face--left",
        },
        "cube__face--bottom": {
          show: "show-bottom",
          up: "cube__face--front",
          right: "cube__face--right",
          down: "cube__face--back",
          left: "cube__face--left",
        },
      };
    },
  },
};
</script>

<style scoped>
.scene {
  width: 300px;
  height: 300px;
  border: 1px solid #ccc;
  margin: 80px;
  perspective: 300px;
}

.cube {
  width: 300px;
  height: 300px;
  position: relative;
  transform-style: preserve-3d;
  transform: translateZ(-100px);
  transition: transform 1s;
}

.cube.show-front {
  transform: translateZ(-100px) rotateY(0deg);
}
.cube.show-right {
  transform: translateZ(-100px) rotateY(-90deg);
}
.cube.show-back {
  transform: translateZ(-100px) rotateY(-180deg);
}
.cube.show-left {
  transform: translateZ(-100px) rotateY(90deg);
}
.cube.show-top {
  transform: translateZ(-100px) rotateX(-90deg);
}
.cube.show-bottom {
  transform: translateZ(-100px) rotateX(90deg);
}

.cube__face {
  position: absolute;
  width: 300px;
  height: 300px;
  border: 2px solid black;
  /* line-height: 200px;
  font-size: 40px; */
  font-weight: bold;
  color: white;
  text-align: center;
}

.cube__face--front {
  /* background: hsla(0, 100%, 50%, 0.7); */
  background: red;
}
.cube__face--right {
  /* background: hsla(60, 100%, 50%, 0.7); */
  background: yellow;
}
.cube__face--back {
  /* background: hsla(120, 100%, 50%, 0.7); */
  background: green;
}
.cube__face--left {
  /* background: hsla(180, 100%, 50%, 0.7); */
  background: cyan;
}
.cube__face--top {
  /* background: hsla(240, 100%, 50%, 0.7); */
  background: blue;
}
.cube__face--bottom {
  /* background: hsla(300, 100%, 50%, 0.7); */
  background: magenta;
}

.cube__face--front {
  transform: rotateY(0deg) translateZ(150px);
}
.cube__face--right {
  transform: rotateY(90deg) translateZ(150px);
}
.cube__face--back {
  transform: rotateY(180deg) translateZ(150px);
}
.cube__face--left {
  transform: rotateY(-90deg) translateZ(150px);
}
.cube__face--top {
  transform: rotateX(90deg) translateZ(150px);
}
.cube__face--bottom {
  transform: rotateX(-90deg) translateZ(150px);
}

label {
  margin-right: 10px;
}
</style>
