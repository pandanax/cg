<template>
  <div>
  <div v-if="!loaded">
    <div class="page-loading">
      <img src="/static/loader.gif"/>
    </div>
  </div>
  <div v-if="loaded">

    <div v-if="!orderedTickets.length" class="cap ow font-blue">
      {{$lang.messages.m5}}
    </div>

    <table class="table table-sm table-striped">
      <thead v-if="orderedTickets.length">
      <tr class="ow font-blue cap ">
        <th class="cursor-pointer" v-on:click="setSort('number')">
        <span>
        <span>#</span>
        <span class="tab-arrows">


          <div v-show="sort.name != 'number' || (sort.name == 'number' && sort.order == 'asc')" class="arrow-up"></div>
          <div v-show="sort.name != 'number' || (sort.name == 'number' && sort.order == 'desc')"
               class="arrow-down"></div>

        </span>
        </span>
        </th>
        <th></th>
        <th class="cursor-pointer" v-on:click="setSort('hash')">
          {{$lang.messages.hash}}
          <span class="tab-arrows">


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
        <td><span v-if="t.number >= 0"> #{{t.number | int}}</span></td>
        <td>
          <div class="table-cube-padding">

            <cube :hash="t.hash"></cube>

          </div>
        </td>
        <td><span>{{t.hash | bytes}}</span></td>
        <td>
          {{t.addr}}
          <!--<a
            v-bind:href="'https://etherscan.io/address/'+t.addr">{{t.addr}}</a>-->
        </td>
        <td>
          {{game.ticketPrice | eth}}
        </td>

        <!--<hr/>
        <div v-if="t.tx && t.tx.args">

          <div style="float: right">{{t.tx.args.when | sdate}} {{t.tx.args.when | stime}}</div>
          <div style="font-size: 12px" class="card-text">        {{$lang.messages.owner}}:
            <a
            v-bind:href="'https://etherscan.io/address/'+t.addr">{{t.addr}}</a>
            <br/>

            {{$lang.messages.transaction}}:
            <a v-bind:href="'https://etherscan.io/tx/'+t.tx.transactionHash"
                           target="_blank">{{t.tx.transactionHash}}</a>
          </div>

        </div>-->

      </tr>

      </tbody>

    </table>
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
        },
        loaded: false
      }
    },


    methods: {
      setSort: function (name) {


        if (this.sort.name == name) {
          if (this.sort.order == 'asc') {
            this.sort.order = 'desc'
          } else {
            this.sort.order = 'asc'
          }
        } else {
          this.sort.name = name;
          this.sort.order = 'asc';
        }
      },
      init: function () {
        let self = this;
        return MetamaskService.games().getTicketFields(self.gameId, self.roundId, self.game.period.ticketAmount).then(function (r) {


          self.$set(self.game, 'tickets', []);


          for (var i = 0; i < r.length; i++) {
            r[i].number = parseInt(r[i].number);
            self.$set(self.game.tickets, i, r[i]);
          }

          self.loaded = true;



        });
      },

    }
  }
</script>
<style>
  .table-striped tbody tr:nth-of-type(odd).winner,
  .winner {
    background-color: #ffa800;
  }

</style>
