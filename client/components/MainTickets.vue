<template>
  <table class="cap table table-sm table-striped">
    <thead>
    <tr class="ow font-blue">
      <th class="cursor-pointer" v-on:click="setSort('number')">
        <span class="float-right">
        <span>#</span>
        <span  class="tab-arrows">


          <div v-show="sort.name != 'number' || (sort.name == 'number' && sort.order == 'asc')" class="arrow-up"></div>
          <div v-show="sort.name != 'number' || (sort.name == 'number' && sort.order == 'desc')" class="arrow-down"></div>

        </span>
        </span>
      </th>
      <th></th>
      <th class="cursor-pointer" v-on:click="setSort('hash')">
        {{$lang.messages.hash}}
        <span  class="tab-arrows">


          <div v-show="sort.name != 'hash' || (sort.name == 'hash' && sort.order == 'asc')" class="arrow-up"></div>
          <div v-show="sort.name != 'hash' || (sort.name == 'hash' && sort.order == 'desc')" class="arrow-down"></div>

        </span>
      </th>
      <th>
        {{$lang.messages.player}}
      </th>
      <th>
        {{$lang.messages.ticketPrice}}
      </th>
    </tr>
    </thead>
    <tbody>

    <tr v-bind:class="{'winner': game.period.winnerHash == t.hash && game.period.finished}" v-if="t && t.hash"
        v-for="t in orderedTickets">
      <td><span v-if="t.number >= 0" style="float: right"> #{{t.number | int}}</span></td>
      <td>
        <div class="table-cube-padding">

          <cube :hash="t.hash"></cube>

        </div>
      </td>
      <td><span>{{t.hash | bytes}}</span></td>
      <td>
        {{t.addr}}
        <!--<a
          v-bind:href="'https://rinkeby.etherscan.io/address/'+t.addr">{{t.addr}}</a>-->
      </td>
      <td>
        {{game.ticketPrice | eth}}
      </td>
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

    </tr>

    </tbody>

  </table>
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
      let self = this;
      this.$root.$on('app::tickets::update', function (r) {
        self.init();
      });
    },

    computed: {
      orderedTickets: function () {
        if (this.game.tickets) {
          return this.lodash.orderBy(this.game.tickets, this.sort.name, this.sort.order);
        }
        return [];
      }
    },

    props: ['game', 'gameId', 'roundId'],

    data: function () {
      return {
        level: -1,
        sort: {
            name: 'number',
            order: 'desc'
        }
      }
    },


    methods: {
        setSort: function (name) {


          if (this.sort.name == name) {
              console.log('1')
            if (this.sort.order == 'asc') {
              console.log('3')

              this.sort.order ='desc'
            } else {
              console.log('4')

              this.sort.order = 'asc'
            }
          } else {
            console.log('2')

            this.sort.name = name;
              this.sort.order = 'asc';
          }
          console.log('set sort', this.sort)
        },
      init: function () {
        let self = this;
        return MetamaskService.games().getTicketFields(self.gameId, self.roundId, self.game.period.ticketAmount).then(function (r) {


          self.$set(self.game, 'tickets', []);

          /*r = r.sort(function (a, b) {

            if (parseInt(a.number) < parseInt(b.number)) {
              return 1;
            }
            if (parseInt(a.number) > parseInt(b.number)) {
              return -1;
            }
            // a должно быть равным b
            return 0;

          })*/

          for (var i = 0; i < r.length; i++) {
            r[i].number = parseInt(r[i].number);
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
