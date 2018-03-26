<template>

  <div>
    <div class="game-container" v-if="game.$loaded">
      <div class="row">
        <div class="col-lg-6">

          <div class="game-full-header">


            <div class="clearfix">

              <div class="pull-left">

            <span v-bind:href="'#/game/' + gameId" class="game-header cap ow">
              {{$lang.messages.game}} {{gameId}}
            </span>
              </div>
              <div class="pull-left">

                <div class="game-address bold">
                  <a v-bind:href="'https://rinkeby.etherscan.io/address/'+game.address"
                     target="_blank">{{game.address}}</a>
                </div>
              </div>
            </div>

          </div>

          <div class="game-rule-header cap font-blue ow">
            {{$lang.messages.grules}}
          </div>


          <div class="game-description">
            <game-description v-bind:game-id="gameId" v-bind:game="game"></game-description>
          </div>

        </div>
        <div class="col-lg-6">
          <div class="game-bg">

            <div class="first-str">

              <div class="ticket-price cap ow bold font-yellow">
                {{$lang.messages.ticketPrice}}
              </div>
              <div class="ticket-price-val cap ow bold font-yellow">
                {{game.ticketPrice | eth}}
              </div>
            </div>
            <div class="sec-str">

              <div class="current-round cap ow bold font-white">
                {{$lang.messages.currentRound}} #{{game.currentPeriod}}
              </div>
              <div class="tickets-left cap ow bold font-white">
                {{$lang.messages.stock}}: {{game.maxTicketAmount - game.period.ticketAmount | int}}
              </div>
            </div>

            <div class="game-bank cap ow bold font-white">
              {{$lang.messages.bank}}: {{game.period.raised | eth}}
            </div>


            <form class="input-form ">
              <label class="ow cap font-blue">{{$lang.messages.hashPhrase}}:</label>
              <input type="text" v-model="hash"/>
              <a class="game-win-btn bg-yellow cap ow" href>
                {{$lang.messages.toWin}}
              </a>
            </form>

          </div>
        </div>
      </div>
      <div class="ticket-container">
        <main-tickets :game="game" :game-id="gameId" :roundId="game.currentPeriod"></main-tickets>
      </div>
      <!--<div class="maket"></div>-->
    </div>
  </div>
</template>
<script>


  import GameDescription from 'components/GameDescription';
  import MainTickets from 'components/MainTickets';

  import Metamask from 'services/Metamask';
  const MetamaskService = new Metamask();


  export default {
    components: {
      GameDescription,
      MainTickets
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
        },
        hash: ''
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


            self.$set(self.game, '$loaded', true);


            console.log('game', self.game.period);


          })
        })


      }
    }

  }


</script>
<style scoped="">

  .game-container {
    padding-top: 75px;
  }

  .game-header {
    display: block;
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
    padding: 18px 0 0 40px;

  }

  .game-address a {
    color: #111;
    font-size: 12px;
  }

  .game-bg {
    background: #3866b4;
    background: linear-gradient(to bottom, #3866b4, #fff);
    text-align: center;
    margin-top: 7px;
    padding: 12px 24px;
    overflow: hidden;

  }

  .ticket-price {
    font-size: 30px;
    padding-top: 0;
    display: inline-block;
  }

  .ticket-price-val {
    font-size: 47px;
    line-height: 43px;
    padding-top: 0;
    display: inline-block;
    margin-left: 40px;
  }

  .current-round {

    font-size: 18px;
    display: inline-block;
    padding-top: 9px;
  }

  .tickets-left {
    font-size: 18px;
    display: inline-block;
    margin-left: 40px;
    padding-top: 9px;

  }

  .game-bank {
    font-size: 56px;

  }

  a.game-win-btn {
    font-size: 48px;
    display: block;
    margin: 15px auto 0;
    height: 66px;
    color: #000;
    width: 245px;
    text-align: center;
  }

  .game-description {
    font-size: 12px;
    color: #111;
    font-weight: bold;
    padding-top: 7px;
    line-height: 15px;
  }

  .game-rule-header {
    padding-top: 20px;
    font-size: 18px;
  }

  .maket {
    background: url(/static/tmp/images/1_03.png);
    position: absolute;
    top: 401px;
    width: 100%;
    height: 10000px;
    opacity: 0.5;
    background-position: 85% 0;
  }

  .input-form {
    text-align: left;
    padding-top: 12px;
  }

  .input-form label {
    font-size: 18px;
    line-height: 20px;
    margin: 0;
  }

  .input-form input {
    display: block;
    width: 100%;
    border: none;
    margin: 0;
    padding: 0 9px;
    line-height: 30px;
  }

  .ticket-container {
    padding: 80px 0;
  }

</style>
