<template>
  <div :id="frameId"></div>
</template>

<script>
import * as Three from 'three'

export default {
  name: "Frame",

  data() {
    return {
      frameId: 'frameContainer',
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
    };
  },

  methods: {
    init: function() {
      let container = document.getElementById(this.frameId);

      this.camera = new Three.PerspectiveCamera(
        70,
        container.clientWidth / container.clientHeight,
        0.01,
        10
      );
      this.camera.position.z = .40;

      this.scene = new Three.Scene();

      let geometry = new Three.BoxGeometry(0.2, 0.2, 0.2);
      let material = new Three.MeshNormalMaterial();

      this.box = new Three.Mesh(geometry, material);
      this.box.rotation.x += 1.1;
      this.scene.add(this.box);

      this.renderer = new Three.WebGLRenderer({ antialias: true });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);

      // enable responsiveness
      window.addEventListener('resize', ()=>{
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
      })
    },

    animate: function() {
      requestAnimationFrame(this.animate);
      // this.box.rotation.x += 0.01;
      // this.box.rotation.y += 0.02;
      this.renderer.render(this.scene, this.camera);
    },
  },

  mounted() {
    this.init();
    this.animate();
  },
};
</script>

<style scoped>
  #frameContainer {
    width: 100%;
    height: 100%;
  }
</style>
