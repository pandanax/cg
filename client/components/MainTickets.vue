<template>
  <div v-if="game && game.tickets && game.tickets.length">
    <div v-if="t && t.hash" class="card" style="margin-bottom: 10px" v-for="t in game.tickets">
      <div class="card-body" v-bind:class="{'winner': game.period.winnerHash == t.hash && game.period.finished}">
        <h5 class="card-title">

          <cube :hash="t.hash"></cube>
          <span v-if="t.number >= 0" style="float: right"> #{{t.number | int}}</span>
          <span>{{t.hash}}</span>
        </h5>
        <span>{{$lang.messages.owner}}:</span>
        <a
          v-bind:href="'https://rinkeby.etherscan.io/address/'+t.addr">{{t.addr}}</a>
        <!--<hr/>
        <div v-if="t.tx && t.tx.args">

          <div style="float: right">{{t.tx.args.when | sdate}} {{t.tx.args.when | stime}}</div>
          <div style="font-size: 12px" class="card-text">        {{$lang.messages.owner}}:
            <a
            v-bind:href="'https://rinkeby.etherscan.io/address/'+t.addr">{{t.addr}}</a>
            <br/>

            {{$lang.messages.transaction}}:
            <a v-bind:href="'https://rinkeby.etherscan.io/tx/'+t.tx.transactionHash"
                           target="_blank">{{t.tx.transactionHash}}</a>
          </div>

        </div>-->

      </div>
    </div>
  </div>
</template>
<script>
  import Cube from 'components/Cube'

  import Metamask from 'services/Metamask';

  const MetamaskService = new Metamask();

  export default {
    components: {
      Cube
    },
    created: function () {
      this.init();
    },

    props: ['game', 'gameId', 'roundId'],

    data: function () {
      return {
        level: -1
      }
    },


    methods: {
      init: function () {
        let self = this;
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


          /*return MetamaskService.games().initWatcher(self.gameId, self.roundId).then(function (event) {
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


            });
          });*/


        });
      },

    }
  }
</script>
<style>
  .winner:before {
    content: 'Winner';
    position: absolute;
    z-index: 1;
    right: 20px;
    top: -7px;
    font-size: 26px;
    line-height: 120px;
    opacity: 0.2;
  }
</style>
