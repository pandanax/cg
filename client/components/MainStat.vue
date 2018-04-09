<template>

  <div class="content">
    <div class="container">
      <div class="stat-header ow cap">
        {{$lang.messages.menu2}}
      </div>
      <table class="cap table table-sm table-striped">
        <thead>
        <tr class="ow font-blue">

          <th class="cursor-pointer" v-on:click="setSort('gameId')">
            {{$lang.messages.game}}
            <span class="tab-arrows">


              <div v-show="sort.name != 'gameId' || (sort.name == 'gameId' && sort.order == 'asc')" class="arrow-up"></div>
              <div v-show="sort.name != 'gameId' || (sort.name == 'gameId' && sort.order == 'desc')" class="arrow-down"></div>

             </span>
          </th>
          <th class="cursor-pointer">
            {{$lang.messages.round}}
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
          <th class="cursor-pointer" v-on:click="setSort('price')">
            {{$lang.messages.ticketPrice}}
            <span class="tab-arrows" >


              <div v-show="sort.name != 'price' || (sort.name == 'price' && sort.order == 'asc')" class="arrow-up"></div>
              <div v-show="sort.name != 'price' || (sort.name == 'price' && sort.order == 'desc')" class="arrow-down"></div>

             </span>
          </th>
          <th class="cursor-pointer" v-on:click="setSort('reward')">
            {{$lang.messages.gain}}
            <span class="tab-arrows" >


              <div v-show="sort.name != 'reward' || (sort.name == 'reward' && sort.order == 'asc')" class="arrow-up"></div>
              <div v-show="sort.name != 'reward' || (sort.name == 'reward' && sort.order == 'desc')" class="arrow-down"></div>

             </span>
          </th>
          <th class="cursor-pointer" v-on:click="setSort('when')">
            {{$lang.messages.date}}
            <span class="tab-arrows" >


              <div v-show="sort.name != 'when' || (sort.name == 'when' && sort.order == 'asc')" class="arrow-up"></div>
              <div v-show="sort.name != 'when' || (sort.name == 'when' && sort.order == 'desc')" class="arrow-down"></div>

             </span>
          </th>
        </tr>
        </thead>
        <tbody>

        <tr v-for="l in orderedLogs">
          <td><span>{{$lang.messages.game}} {{l.gameId | int}}</span></td>
          <td><span>#{{l.args.periodNumber | int}}</span></td>
          <td>
            <div class="table-cube-padding">

              <cube :hash="l.args.winnerHash"></cube>

            </div>
          </td>
          <td><span>{{l.args.winnerHash | bytes}}</span></td>
          <td>
            {{l.args.winnerAddr}}
            <!--<a
              v-bind:href="'https://rinkeby.etherscan.io/address/'+t.addr">{{t.addr}}</a>-->
          </td>
          <td>
            {{gamePrices[l.gameId]}} ETH
          </td>
          <td>
            {{l.args.reward | eth}}
          </td>
          <td>
            {{l.args.when | sdate}}
            {{l.args.when | stime}}
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
    </div>
  </div>

</template>
<script>

  import address from '../ether'
  import Cube from 'components/Cube'


  import Metamask from 'services/Metamask';

  const MetamaskService = new Metamask();
  export default {
    components: {Cube},
    data: function () {
      return {
        level: -1,
        logs: [],
        sort: {
          name: 'when',
          order: 'desc'
        },
        gamePrices: [0, 0.01, 0.03, 0.1, 0.5 ]
      }
    },
    created: function () {
      this.init();
    },
    computed: {
      orderedLogs: function () {
        if (this.logs) {
          return this.lodash.orderBy(this.logs, this.sort.name, this.sort.order);
        }
        return [];
      }
    },
    methods: {
      setSort: function (name) {


        if (this.sort.name == name) {
          if (this.sort.order == 'asc') {
            this.sort.order ='desc'
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
        self.level = MetamaskService.detectLevel();

        function createWatcher(id) {


          MetamaskService.games().initWatcher(id).then(function (event) {



            event.PeriodFinished.get(function (error, logs) {
              console.log('GAME', id);

              for (var k = 0; k < logs.length; k++) {
                let log = logs[k];
                log.gameId = id;
                log.price = self.gamePrices[id];
                log.hash = log.args.winnerHash;
                log.when = log.args.when;
                log.reward = log.args.reward;
                self.$set(self.logs, self.logs.length, log);
              }


              console.log('self.logs', self.logs)
            });


            /*event.TicketSelling.get(function (error, logs) {

             for (var i = 0; i < logs.length; i++) {
             if (logs[i].args.from == web3.eth.accounts[0]) {

             var el = logs[i].args;
             el.tx = logs[i];
             self.$set(self.logs[id], i, el);
             console.log('-----------');
             console.log(el);
             }

             }




             });*/
          });
        }


        for (let id = 1; id < 5; id++) {
          createWatcher(id);
        }


      }
    }
  }


</script>
<style>
.stat-header {
  font-size: 36px;
  margin-bottom: 10px;
}

</style>
