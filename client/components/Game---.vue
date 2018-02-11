<template>
  <div>


    <p v-if="level == -1">LOADING...</p>
    <p v-else-if="level == 0">
      <download-metamask></download-metamask>
    </p>
    <p v-else-if="level == 1">
      акк залочен!
    </p>

    <div v-else-if="level == 2">
      <!--<div class="row">
        <div class="col-sm-3">
          <h1>{{gameId}}</h1>
        </div>
        <div class="col-sm-9"></div>
      </div>-->
    </div>

  </div>
</template>
<script>
  import DownloadMetamask from 'components/DownloadMetamask'

  import router from '../router'

  import Metamask from 'services/Metamask';

  const MetamaskService = new Metamask();

  export default {
    components: {
      DownloadMetamask
    },
    created: function () {
      this.init();
    },

    data: function () {
      return {
        level: -1,
        gameId: 0,
        currentPeriod: -1
      }
    },


    methods: {
      init: function () {
        let self = this;
        self.level = MetamaskService.detectLevel();
        self.gameId = self.$route.params.gameId;
        MetamaskService.games(self.gameId).getCurRound().then(function (r) {
          self.currentPeriod = r;
          router.push({path: 'game/' + self.gameId + '/' + self.currentPeriod});

        });
      }
    }
  }
</script>
