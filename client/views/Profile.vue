<template>
  <div class="container">


    <p v-if="level == -1">LOADING...</p>
    <p v-else-if="level == 0">
      <download-metamask></download-metamask>
    </p>
    <p v-else-if="level == 1">
      акк залочен!
    </p>
    <div v-else-if="level == 2">
      <h3>{{address}}</h3>

      <div v-if="log.length" v-for="(log, i) in logs">
        <h4 >#Игра {{i}}</h4>
        <tickets :game="{period: {}, tickets: log}"></tickets>
      </div>

    </div>
  </div>
</template>
<script>
  import DownloadMetamask from 'components/DownloadMetamask'
  import Cube from 'components/Cube'

  import Tickets from 'components/Tickets'

  import Metamask from 'services/Metamask';

  const MetamaskService = new Metamask();

  export default {
    components: {
      DownloadMetamask,
      Cube,
      Tickets
    },
    created: function () {
      this.init();
    },

    data: function () {
      return {
        level: -1,
        logs: {1: [], 2: [], 3: [], 4: []},
        winners: {},
        address: ''
      }
    },


    methods: {
      init: function () {
        let self = this;
        self.level = MetamaskService.detectLevel();

        function createWatcher(id) {

          self.address = web3.eth.accounts[0];

          MetamaskService.games().initWatcher(id).then(function (event) {

            event.e1.get(function (error, logs) {

              for (var i = 0; i < logs.length; i++) {
                if (logs[i].args.from == web3.eth.accounts[0]) {

                    var el = logs[i].args;
                    el.tx = logs[i];
                  self.$set(self.logs[id], i, el);
                }

              }

              event.e2.get(function (error, logs) {
                for (var k = 0; k < logs.length; k++) {
                  for (var m = 0; m < self.logs[id].length; m++) {
                    //console.log(self.logs[id][m],logs[k])
                    /*if (self.logs[id][m].args.hash == logs[k].args.winnerHash) {
                      self.logs[id][m].isWinner = true;
                      console.log('self.logs[id][m]',self.logs[id][m]);
                    }*/
                  }
                }
              });


            });
          });
        }


        for (let id = 1; id < 5; id++) {
          createWatcher(id);
        }


      }
    }
  }
</script>


<!--
<template>


    <div class="container">


        <profile></profile>


    </div>

</template>

<script>

  import Profile from 'components/Profile'

  export default {
    components: {
      Profile
    },
    created: function() {
    }

  }
</script>
-->
