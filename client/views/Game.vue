<template>
  <div>

    <small-header></small-header>

    <main-nav></main-nav>

    <div class="bg-white">

    <div class="container">
      <game-full :game-id="gameId"></game-full>
    </div>

    </div>
    <main-footer></main-footer>


  </div>
</template>
<script>
  import SmallHeader from 'components/SmallHeader'
  import MainNav from 'components/MainNav'
  import MainFooter from 'components/MainFooter'
  import GameFull from 'components/GameFull'

  export default {
    components: {
      SmallHeader,
      MainNav,
      MainFooter,
      GameFull
    },
    created: function () {
      this.init();
    },

    data: function () {
      return {
        level: -1,
        gameId: -1,
        currentPeriod: -1
      }
    },


    methods: {
      init: function () {
        let self = this;
        self.gameId = self.$route.params.gameId;
      }
    }
  }
</script>


<!--
<template>


    <div class="container">


        <game></game>


    </div>

</template>

<script>

  import Game from 'components/Game'

  export default {
    components: {
      Game
    },
    created: function() {
    }

  }
</script>
-->
