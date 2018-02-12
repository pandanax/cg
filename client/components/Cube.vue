<template>
  <div class="cube-outer">
    <div class="cube">
      <div v-bind:style="{ 'background-color': '#'+hash.substring(20, 26) }" class="cube-in"></div>
      <div v-bind:style="{ 'background-color': '#'+hash.substring(2, 8) }" class="cube-in"></div>
      <div v-bind:style="{ 'background-color': '#'+hash.substring(14, 20) }" class="cube-in"></div>

      <div v-bind:style="{ 'background-color': '#'+hash.substring(8, 14) }" class="cube-in"></div>
    </div>
    <div class="cube">
      <div v-bind:style="{ 'background-color': '#'+hash.substring(2, 8) }" class="cube-in"></div>
      <div v-bind:style="{ 'background-color': '#'+hash.substring(20, 26) }" class="cube-in"></div>
      <div v-bind:style="{ 'background-color': '#'+hash.substring(8, 14) }" class="cube-in"></div>
      <div v-bind:style="{ 'background-color': '#'+hash.substring(14, 20) }" class="cube-in"></div>
      <div v-bind:style="{ 'background-color': '#'+hash.substring(26, 32) }" class="circle-in"></div>
    </div>
  </div>
</template>
<script>
  export default {

    props: ['hash'],

    created: function () {
       this.init();
    },
    methods: {
        init: function () {
           console.log(this.hash);
        }
    }
  }
</script>
<style>
  .cube-outer {
    width: 64px;
    height:32px;
    display: inline-block;
    margin-right: 20px;
    vertical-align: middle;
  }
  .cube {
    width: 32px;
    height: 32px;
    float: left;
    position: relative;

  }

  .cube-in {
    width: 16px;
    height: 16px;
    float: left;
    box-shadow: inset 0px 0px 10px rgba(0,0,0,0.2);

  }

  .circle-in {
    position: absolute;
    top:8px;
    left: -8px;
    border-radius: 16px;
    z-index: 1;
    width: 16px;
    height: 16px;
    box-shadow: inset 0px 0px 10px rgba(0,0,0,0.2);

  }

</style>
