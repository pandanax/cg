<template>
  <div>


    <div class="container">


      <p v-if="level == -1">LOADING...</p>
      <p v-else-if="level == 0">
        <download-metamask></download-metamask>
      </p>
      <p v-else-if="level == 1">
        {{$lang.messages.m2}}
      </p>

      <div v-else-if="level == 2 && game.currentPeriod >= 0">
        <div class="row">
          <div class="col-sm-12">
            <game-header :game="game" :gameId="gameId" :roundId="roundId"></game-header>
          </div>
          <div class="col-sm-12" style="margin-top: 20px">
            <div v-if="game.tickets">

              <tickets :game="game"></tickets>


            </div>
          </div>
        </div>
        <footer>
          <hr/>
          <div v-if="game" style="white-space: nowrap; overflow: hidden; margin-bottom: 20px">
                    <span v-for="v in game.currentPeriod + 1">

                    <router-link :to="'/game/'+gameId+'/'+(game.currentPeriod-v+1)">
                      #{{game.currentPeriod-v+1}}
                    </router-link>
                    </span>


          </div>
          <!--<a v-bind:href="'#/game/'+gameId + '/0'">
            #0
          </a>
          <a v-if="game.currentPeriod" v-bind:href="'#/game/'+gameId + '/'+ game.currentPeriod"
             v-for="n in game.currentPeriod.c">
            #{{ n }}
          </a>-->
        </footer>
      </div>


    </div>
  </div>
</template>
<script>
  import DownloadMetamask from 'components/DownloadMetamask'
  import Metamask from 'services/Metamask';
  import router from '../router';
  import Cube from 'components/Cube'
  import Tickets from 'components/Tickets'
  import GameHeader from 'components/GameHeader'

  const MetamaskService = new Metamask();

  export default {
    components: {
      DownloadMetamask,
      Cube,
      Tickets,
      GameHeader
    },
    created: function () {
      this.init(true);
    },

    beforeDestroy: function () {
      let self = this;
      if (self.event.e1) {
        self.event.e1.stopWatching();
      }
      if (self.event.e2) {
        self.event.e2.stopWatching();
      }
    },
    data: function () {
      return {
        level: -1,
        gameId: 0,
        roundId: -1,
        game: {
          currentPeriod: -1
        },
        nonce: '',
        buyHash: '',
        event: {}

      }
    },


    methods: {
      /*handlerOk2Modal(){

        let url = 'https://rinkeby.etherscan.io/tx/' + this.buyHash;
        window.open(url, '_blank');
      },
*/
      /*focusMyElement (e) {
        this.$refs.focusThis.focus()
      },*/


      /*buyTicket: function () {
        let self = this;


        MetamaskService.games().byTicket(self.gameId, self.nonce, self.game.currentPeriod, self.game.ticketPrice).then(function (r) {

          self.buyHash = r;

          self.$root.$emit('bv::show::modal', 'modal2');

          self.nonce = '';

        }).catch(function (e) {
          console.error(e);
        });

        return false;
      },*/

      initWatcher: function (event) {
        let self = this;

        var tagged = 0;

        event.e1.watch(function (error, result) {

          if (result.args.periodNumber == self.roundId) {
            tagged++;
          }

          if (tagged > self.game.period.ticketAmount) {
            console.log('init');
            self.init();
          }
        })

        var finished = 0;

        /*event.e2.watch(function (error, result) {


         if (result.args.periodNumber == self.roundId) {
         if (finished > 0) {
         //TODO тут при 0 1 2 периодах если 1 есть и на него зайти
         //self.init();
         console.log('init 2');

         }
         }
         finished++;


         })*/

      },

      goToRound: function (gameId, roundId) {

        router.push({path: '/game/' + gameId + '/' + roundId});
        //router.go();

        return true;


      },

      init: function (addWatch) {
        let self = this;
        self.level = MetamaskService.detectLevel();
        self.gameId = self.$route.params.gameId;
        self.roundId = self.$route.params.roundId;


        return MetamaskService.games().getGameFields(self.gameId).then(function (r) {

          for (var prop in r) {
            self.$set(self.game, prop, r[prop]);
          }

          self.game.currentPeriod = parseInt(self.game.currentPeriod);

          return MetamaskService.games().getPeriodFields(self.gameId, self.roundId).then(function (r) {

            self.$set(self.game, 'period', {});

            for (var prop in r) {
              self.$set(self.game.period, prop, r[prop]);
            }


            return MetamaskService.games().getTicketFields(self.gameId, self.roundId, self.game.period.ticketAmount).then(function (r) {


              self.$set(self.game, 'tickets', []);

              r = r.sort(function (a, b) {

                if (parseInt(a.number) < parseInt(b.number)) {
                  return 1;
                }
                if (parseInt(a.number) > parseInt(b.number)) {
                  return -1;
                }
                // a должно быть равным b
                return 0;

              })

              for (var i = 0; i < r.length; i++) {
                self.$set(self.game.tickets, i, r[i]);
              }

              console.log('GAME', self.game);


              return MetamaskService.games().initWatcher(self.gameId, self.roundId).then(function (event) {
                event.e2.get(function (error, logs) {
                  for (var i = 0; i < logs.length; i++) {
                    if (logs[i].args.winnerHash == self.game.period.winnerHash) {
                      self.$set(self.game.period, 'tx', logs[i]);
                    }
                  }
                });


                event.e1.get(function (error, logs) {


                  for (var i = 0; i < logs.length; i++) {
                    for (var j = 0; j < self.game.tickets.length; j++) {
                      if (self.game.tickets[j].hash == logs[i].args.hash) {
                        self.$set(self.game.tickets[j], 'tx', logs[i]);
                      }
                    }
                  }


                  self.event = event;
                  if (addWatch && self.roundId == self.game.currentPeriod) {

                    self.initWatcher(event);

                  }


                });
              });


            }).catch(function (e) {
              console.error(e);
            });


          }).catch(function (e) {
            console.error(e);
          });


        }).catch(function (e) {
          console.error(e);
        });


      }
    }
  }


</script>

<style scoped="">
  h1 {
    font-size: 114px;
    line-height: 114px;
  }


</style>

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

не выкидывать с сайта при транзакции не уходить на etherscan
кнопки для публикации результатов в соцсети

//неизбежный выигрыш (слоган+)

//джекпоты

//язык

-->



