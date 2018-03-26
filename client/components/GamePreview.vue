<template>

  <div class="row">
    <div class="col-lg-5">
      <div class="game-header cap ow">
        {{$lang.messages.game}} {{gameId}}
      </div>

      <div class="game-address bold">
        <a v-bind:href="'https://rinkeby.etherscan.io/address/'+game.address" target="_blank">{{game.address}}</a>
      </div>
      <div class="game-description">
        <game-description v-bind:game-id="gameId" v-bind:game="game"></game-description>
      </div>

    </div>
    <div class="col-lg-7">
      <div class="game-bg">

        <div class="ticket-price cap ow bold font-yellow">
          {{$lang.messages.ticketPrice}}
        </div>
        <div class="ticket-price-val cap ow bold font-yellow">
          {{game.ticketPrice | eth}}
        </div>
        <div class="current-round cap ow bold font-white">
          {{$lang.messages.currentRound}} #{{game.currentPeriod}}
        </div>
        <div class="tickets-left cap ow bold font-white">
          {{$lang.messages.stock}}: {{game.maxTicketAmount - game.period.ticketAmount | int}}
        </div>

        <div class="game-bank cap ow bold font-white">
          {{$lang.messages.bank}}: {{game.period.raised | eth}}
        </div>

        <a class="game-win-btn bg-yellow cap ow" href>
          {{$lang.messages.toWin}}
        </a>

      </div>
    </div>
  </div>
</template>
<script>


  import GameDescription from 'components/GameDescription';

  import Metamask from 'services/Metamask';
  const MetamaskService = new Metamask();


  export default {
    components: {
      GameDescription

    },
    props: ['gameId'],

    created: function () {
      this.init();
    },

    data: function () {
      return {
        level: -1,
        currentPeriod: -1,
        game: {
          period: {}
        }
      }
    },


    methods: {
      init: function () {

        let self = this;

        return MetamaskService.games().getGameFields(self.gameId).then(function (r) {

          for (var prop in r) {
            self.$set(self.game, prop, r[prop]);
          }

          console.log('game', self.game);

          self.game.currentPeriod = parseInt(self.game.currentPeriod);

          return MetamaskService.games().getPeriodFields(self.gameId, self.game.currentPeriod).then(function (r) {

            self.$set(self.game, 'period', {});

            for (var prop in r) {
              self.$set(self.game.period, prop, r[prop]);
            }

            console.log('game', self.game.period);


          })
        })


      }
    }

  }


</script>
<style>

  .game-header {
    font-size: 29px;
    color: #1c335a;
    font-weight: bold;
  }

  .game-address {
    width: 100%;
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 16px;
  }

  .game-address a {
    color: #111;
    font-size: 12px;
  }

  .game-bg {
    background-image: url(/static/game/g.png);
    background-repeat: no-repeat;
    text-align: center;
    margin-top: 7px;
    padding: 11px;

    max-width: 271px;
    height: 411px;
    overflow: hidden;

  }

  .ticket-price {
    font-size: 30px;
    padding-top: 34px;
    line-height: 30px;
  }

  .ticket-price-val {
    font-size: 47px;
    line-height: 47px;
    padding-top: 6px;
  }

  .current-round {
    padding-top: 8px;
    font-size: 18px;
  }

  .tickets-left {
    font-size: 18px;
  }

  .game-bank {
    font-size: 38px;
    padding-top: 60px;
  }

  a.game-win-btn {
    olor: #000;
    font-size: 48px;
    display: block;
    margin: 25px 0 0;
    height: 66px;
    color: #000;
  }

  .game-description {
    font-size: 12px;
    color: #111;
    font-weight: bold;
    padding-top: 29px;
    line-height: 15px;
  }

</style>
