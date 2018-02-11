<template>
  <div >

    <!-- Modal Component -->
    <b-modal id="modal2" title="Хеш транзакции" @ok="handlerOk2Modal">

      <a style="font-size: 16px;word-break: break-word;" v-bind:href="'https://rinkeby.etherscan.io/tx/'+buyHash" target="_blank">
        {{buyHash}}
      </a>
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
              <div v-if="game.period" class="col-sm-3">
                <h1>#{{roundId}}</h1>
                <div class="badge badge-success" v-if="game.currentPeriod == roundId">Текущий Раунд</div>
                <div class="badge badge-warning" v-else-if="game.currentPeriod > roundId">Раунд завершен</div>
                <div class="badge badge-error" v-else="">Раунд еще не начался</div>

                <div>от {{game.period.startDate | sdate}}</div>
              </div>
              <div class="col-sm-4">

                <div v-if="game.period">
                  <h3>Цена билета</h3>

                  <h5 class="card-title text-primary">{{game.ticketPrice | eth}}</h5>
                  <p class="card-text">На данный момент куплено <br/> <b>{{game.period.ticketAmount | int}} билета</b>
                    <!--<br/> Собрано<br/> <b>{{game.period.raised | eth}}</b>
                    -->
                    </p>

                </div>
                <form style="margin-top: 20px" class="form-inline">
                  <div>


                    <!-- Modal Component -->
                    <b-modal id="modal1" title="Купить билет" @ok="buyTicket" @shown="focusMyElement">
                      <div class="form-group">

                        <input ref="focusThis" style="width: 100%" type="email" class="form-control border-primary" v-model="nonce" aria-describedby="nonce" placeholder="i am winner!!!">
                        <!--<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>-->
                      </div>
                    </b-modal>
                  </div>

                  <b-btn v-b-modal.modal1 type="button" variant="primary" size="lg"
                          autocomplete="off">
                    Купить билет
                  </b-btn>
                </form>
                <div>

                </div>
              </div>
              <div class="col-sm-5">
                <div class="alert alert-success" v-if="game.period">

                  <h4>Осталось {{game.maxTicketAmount - game.period.ticketAmount | int}}/{{game.maxTicketAmount | int}} билета</h4>
                  <p>
                    Лучший хеш на данный момент:
                    <span style="word-break: break-word; font-weight: bold; font-size: 12px">
                      {{game.period.winnerHash}}
                    </span> <br/>
                    Обладатель:
                    <span style="word-break: break-word; font-weight: bold; font-size: 12px">

                      {{game.period.winnerAddress}}
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
                <div class="card-body">
                  <h5 class="card-title">#{{t.number | int}}</h5>
                  <h6 class="card-subtitle mb-2 text-muted"><span v-bind:style="{ color: '#'+t.hash.substring(2, 8) }">{{t.hash}}</span>
                  </h6>
                  <p class="card-text">Адрес владельца <span
                    v-bind:style="{ color: '#'+t.addr.substring(2, 8) }">{{t.addr}}</span></p>
                  <a href="#" class="card-link">Tранзакция</a>
                </div>
              </div>
              ModalLive
              <table class="table">
                <tbody>
                <!-- <tr class="bg-primary">...</tr>
  <tr class="bg-success">...</tr>
  <tr class="bg-warning">...</tr>
  <tr class="bg-danger">...</tr>
  <tr class="bg-info">...</tr>
  v-bind:class="{'bg-secondary': game.period.winnerHash == t.hash, 'bg-primary': game.period.winnerAddress != t.addr}"
  -->
                <!--  <div  v-for="t in game.tickets">
                    <td>{{t.number}}</td>
                    <td>{{t.addr}}</td>
                    <td>{{t.hash}}</td>
                  </div>-->
                </tbody>
              </table>

            </div>
          </div>
        </div>
      </div>


    </div>
  </div>
</template>
<script>
  import DownloadMetamask from 'components/DownloadMetamask'
  import Metamask from 'services/Metamask';
  import router from '../router';

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
        roundId: -1,
        game: {
          currentPeriod: -1
        },
        nonce: '',
        buyHash: ''

      }
    },


    methods: {
      handlerOk2Modal(){

        let url ='https://rinkeby.etherscan.io/tx/'+this.buyHash;
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

      init: function () {
        let self = this;
        self.level = MetamaskService.detectLevel();
        self.gameId = self.$route.params.gameId;
        self.roundId = self.$route.params.roundId;




        return MetamaskService.games().getGameFields(self.gameId).then(function (r) {

          for (var prop in r) {
            self.$set(self.game, prop, r[prop]);
          }


          return MetamaskService.games().getPeriodFields(self.gameId, self.game.currentPeriod).then(function (r) {

            self.$set(self.game, 'period', {});

            for (var prop in r) {
              self.$set(self.game.period, prop, r[prop]);
            }


            return MetamaskService.games().getTicketFields(self.gameId, self.game.currentPeriod, self.game.period.ticketAmount).then(function (r) {


              self.$set(self.game, 'tickets', []);

              r = r.sort(function (a,b) {
                if (a.number < b.number) {
                  return 1;
                }
                if (a.number > b.number) {
                  return -1;
                }
                // a должно быть равным b
                return 0;

              })

              for (var i = 0; i < r.length; i++) {
                self.$set(self.game.tickets, i, r[i]);
              }

              console.log('GAME', self.game);

              return MetamaskService.games().initWatcher(self.gameId, self.game.currentPeriod);


            }).catch(function (e) {
              console.error(e);
            });


          }).catch(function (e) {
            console.error(e);
          });
          ;


        }).catch(function (e) {
          console.error(e);
        });
        ;


      }
    }
  }


</script>

<style scoped="">
  h1 {
    font-size: 156px;
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

