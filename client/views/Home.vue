<template>
  <div class="body">
    <big-header></big-header>

    <main-nav></main-nav>

    <jackpot></jackpot>

    <div class="games bg-white">

      <game-grid></game-grid>

      <div class="more-games"></div>

    </div>

    <main-footer></main-footer>


    <!--<div class="maket"></div>-->
  </div>


</template>

<script>
  import DownloadMetamask from 'components/DownloadMetamask'
  import GameGrid from 'components/GameGrid'
  import BigHeader from 'components/BigHeader'
  import MainNav from 'components/MainNav'
  import Jackpot from 'components/Jackpot'
  import MainFooter from 'components/MainFooter'

  export default {
    components: {
      DownloadMetamask,
      GameGrid,
      BigHeader,
      MainNav,
      Jackpot,
      MainFooter
    }
  }
</script>

<style scoped="">



  .more-games {
    height: 84px;
  }




</style>
