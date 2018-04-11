<template>

  <div class="game-grid">
    <div class="container">
      <div class="row">
        <div class="col-sm">
          <game-preview game-id="1"></game-preview>
        </div>
        <div class="col-sm">
          <game-preview game-id="2"></game-preview>
        </div>
      </div>
      <!--<div class="row martop-game-row">
        <div class="col-sm">
          <game-preview game-id="3"></game-preview>
        </div>
        <div class="col-sm">
          <game-preview game-id="4"></game-preview>
        </div>
      </div>-->
    </div>
  </div>

</template>
<script>



  import GamePreview from 'components/GamePreview'
  export default {
    components: {
      GamePreview
    }
  }


</script>
<style>

  .game-grid {
    background: #fff;
    color: #000;
    padding: 75px 0;
  }

  .martop-game-row {
    margin-top: 32px;
  }

</style>
