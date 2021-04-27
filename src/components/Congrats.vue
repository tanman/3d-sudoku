<template>
  <div class="banner">
    <div class="d-flex justify-center mt-12">
      <h1>CONGRATULATIONS!</h1>
    </div>
    <div class="d-flex justify-center pt-0 mt-n4">
      <h2>YOU HAVE SOLVED THE CUBE</h2>
    </div>
    <div class="d-flex justify-center hand pt-0">
      <h3 @click="restart">PLAY AGAIN?</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "Congrats",

  methods: {
    restart(){
      location.reload();
    }
  },
};
</script>

<style scoped>
.hand{
  cursor: pointer;
}
</style>
