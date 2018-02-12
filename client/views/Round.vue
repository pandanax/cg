<template>
  <div>

    <!-- Modal Component -->
    <b-modal id="modal2" title="Хеш транзакции" @ok="handlerOk2Modal">


      <a style="font-size: 16px;word-break: break-word;" v-bind:href="'https://rinkeby.etherscan.io/tx/'+buyHash"
         target="_blank">
        {{buyHash}}
      </a>
      <br/>
      <small>
        Ваш билет появится в списке, как только транзакция будет успешно завершена
      </small>
    </b-modal>

    <div class="container">


      <p v-if="level == -1">LOADING...</p>
      <p v-else-if="level == 0">
        <download-metamask></download-metamask>
      </p>
      <p v-else-if="level == 1">
        акк залочен!
      </p>

      <div v-else-if="level == 2 && game.currentPeriod >= 0">
        <div class="row">
          <div class="col-sm-12">
            <div class="row">
              <div v-if="game.period" class="col-sm-4">
                <h1 v-bind:style="{ color: '#'+game.period.winnerHash.substring(2, 8) }">#{{roundId}}</h1>
                <a v-bind:href="'https://rinkeby.etherscan.io/address/'+game.address" target="_blank"
                   style="word-break: break-word; font-size: 10px">{{game.address}}</a>
                <div class="badge badge-success" v-if="game.currentPeriod == roundId">Текущий Раунд</div>
                <div class="badge badge-warning" v-else-if="game.currentPeriod > roundId">Раунд завершен</div>
                <div class="badge badge-error" v-else="">Раунд еще не начался</div>

                <div>от {{game.period.startDate | sdate}}</div>

                <h5 v-if="game.currentPeriod != roundId">
                  <a
                    v-bind:href="'#/game/'+gameId + '/'+ game.currentPeriod">Перейти к текущему раунду #{{game.currentPeriod | int}}</a>
                </h5>
              </div>
              <div class="col-sm-3">

                <div v-if="game.period">
                  <h3>Цена билета</h3>

                  <h5 class="card-title text-primary">{{game.ticketPrice | eth}}</h5>



                </div>
                <form v-if="game.currentPeriod == roundId" style="margin-top: 20px" class="form-inline">
                  <div>


                    <!-- Modal Component -->
                    <b-modal id="modal1" title="Купить билет" @ok="buyTicket" @shown="focusMyElement">
                      <div class="form-group">

                        <input ref="focusThis" style="width: 100%" type="email" class="form-control border-primary"
                               v-model="nonce" aria-describedby="nonce" placeholder="i am winner!!!">
                        <!--<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>-->
                      </div>
                    </b-modal>
                  </div>

                  <b-btn v-b-modal.modal1 type="button" variant="primary" size="lg"
                         autocomplete="off">
                    Купить билет
                  </b-btn>

                </form>

                <p class="card-text"><!--Куплено <br/> <b>{{game.period.ticketAmount | int}} билета</b>-->
                  <br/> Банк<br/> <b>{{game.period.raised | eth}}</b>
                </p>

                <div>

                </div>
              </div>
              <div class="col-sm-5">

                <div class=" " v-if="game.period">

                  <h4 v-if="game.currentPeriod == roundId">
                    Осталось {{game.maxTicketAmount - game.period.ticketAmount | int}}/{{game.maxTicketAmount | int}} билета</h4>
                  <h4 v-if="game.currentPeriod > roundId">Победил хеш</h4>
                  <p v-if="game.tickets && !game.tickets.length">
                    В этом раунде еще не приобретались билеты! Купи первый!
                  </p>
                  <p v-if="game.tickets && game.tickets.length">
                    <!--Лучший хеш на данный момент:-->
                    <span v-if="game.currentPeriod == roundId">
                      Лучший хеш на данный момент:
                    <br/>
                    <br/>
                    </span>
                                          <cube style="float: left" :hash="game.period.winnerHash"></cube>
                    <span style="word-break: break-word; font-weight: bold; font-size: 12px">



                    <span  style="vertical-align: top" v-bind:style="{ color: '#'+game.period.winnerHash.substring(2, 8) }">
                      {{game.period.winnerHash}}
                    </span>
                    </span><br/>
                    Владелец:<br/>
                    <span style="word-break: break-word;  font-size: 12px">
                      <a
                        v-bind:href="'https://rinkeby.etherscan.io/address/'+game.period.winnerAddress"
                      >{{game.period.winnerAddress}}</a>
                    </span>
                  </p>


                </div>
              </div>
              <div class="col-sm-12">


              </div>

            </div>
          </div>
          <div class="col-sm-12" style="margin-top: 20px">
            <div>
              <div class="card" v-for="t in game.tickets">
                <div class="card-body" v-bind:class="{'bg-light-gray': game.period.winnerHash == t.hash}">
                  <h5 class="card-title">
                    <cube :hash="t.hash"></cube>
                    <span style="float: right"> #{{t.number | int}}</span>
                    <span v-bind:style="{ color: '#'+t.hash.substring(2, 8) }">{{t.hash}}</span>
                  </h5>
                  <!--<h6 class="card-subtitle mb-2 text-muted">
                  </h6>-->
                  <hr/>
                  <p v-if="t.tx" style="font-size: 12px" class="card-text">Владелец: <a
                    v-bind:href="'https://rinkeby.etherscan.io/address/'+t.addr"
                  >{{t.addr}}</a> <br/>

                    Транзакция: <a v-bind:href="'https://rinkeby.etherscan.io/tx/'+t.tx.transactionHash"
                                   target="_blank">{{t.tx.transactionHash}}</a></p>


                </div>
              </div>


            </div>
          </div>
        </div>
        <footer>
          <hr/>
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

  const MetamaskService = new Metamask();

  export default {
    components: {
      DownloadMetamask,
      Cube
    },
    created: function () {
      this.init();
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
      handlerOk2Modal(){

        let url = 'https://rinkeby.etherscan.io/tx/' + this.buyHash;
        window.open(url, '_blank');
      },

      focusMyElement (e) {
        this.$refs.focusThis.focus()
      },


      buyTicket: function () {
        let self = this;


        MetamaskService.games().byTicket(self.gameId, self.nonce, self.game.currentPeriod, self.game.ticketPrice).then(function (r) {


          self.buyHash = r;

          self.$root.$emit('bv::show::modal', 'modal2');

          self.nonce = '';

        }).catch(function (e) {
          console.error(e);
        });

        return false;
      },

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

        event.e2.watch(function (error, result) {


          if (result.args.periodNumber == self.roundId) {
            if (finished > 0) {
              self.init();
            }
          }
          finished++;

        })


        /* if (self.interval1) {
         clearInterval(self.interval1);
         }
         self.interval1 = setInterval(function () {


         event.e1.get(function (error, logs) {

         var count = 0;

         for (var i = 0; i < logs.length; i++) {
         if (logs[i].args.periodNumber == self.roundId) {
         count++;
         }
         }
         console.log('ebve1', self.game.period.ticketAmount, count)


         if (self.game.period.ticketAmount != count) {

         console.log('ebve2')

         self.init();

         }


         });

         }, 3000);


         if (self.interval2) {
         clearInterval(self.interval2);
         }
         self.interval2 = setInterval(function () {


         event.e2.get(function (error, logs) {

         var count = logs[logs.length - 1].args.periodNumber;

         console.log('ebve1');

         if (self.game.currentPeriod == count) {

         console.log('ebve2');

         self.init();

         }


         });

         }, 3000);*/

      },

      init: function () {
        let self = this;
        self.level = MetamaskService.detectLevel();
        self.gameId = self.$route.params.gameId;
        self.roundId = self.$route.params.roundId;


        return MetamaskService.games().getGameFields(self.gameId).then(function (r) {

          for (var prop in r) {
            self.$set(self.game, prop, r[prop]);
          }


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

                event.e1.get(function (error, logs) {


                  for (var i = 0; i < logs.length; i++) {
                    for (var j = 0; j < self.game.tickets.length; j++) {
                      if (self.game.tickets[j].hash == logs[i].args.hash) {
                        self.$set(self.game.tickets[j], 'tx', logs[i]);
                      }
                    }
                  }

                  self.event = event;
                  self.initWatcher(event);


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
    font-size: 156px;
  }

  .bg-light-gray {
    background-color: #dadada;
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
-->

