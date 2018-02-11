<template>
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
        <div class="col-sm-3">
          <h1>#{{roundId}}</h1>
          <small v-if="game.currentPeriod == roundId">Текущий Раунд</small>
          <small v-else-if="game.currentPeriod > roundId">Раунд завершен</small>
          <small v-else="">Раунд еще не начался</small>
        </div>
        <div class="col-sm-9">
          <form>
            <h4>Купить билет</h4>

            <form class="form-inline">
              <input placeholder="Введите любое число" class="input" v-model="nonce">
              <button class="btn" v-on:click="buyTicket()">Купить билет</button>
            </form>

            <table class="table">
              <tbody>
              <tr v-for="t in game.tickets">
                <td>{{t.number}}</td>
                <td>{{t.addr}}</td>
                <td>{{t.hash}}</td>
              </tr>
              </tbody>
            </table>

          </form>
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

      }
    },


    methods: {

      buyTicket: function () {
        let self = this;

        MetamaskService.games().byTicket(self.gameId, self.nonce, self.game.currentPeriod, self.game.ticketPrice).then(function (r) {

          console.log('RR', r);
          self.nonce = '';

        }).catch(function (e) {
          console.error(e);
        })
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

              for (var i = 0; i < r.length; i++) {
                self.$set(self.game.tickets, i, r[i]);
              }

              console.log('GAME', self.game)


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
