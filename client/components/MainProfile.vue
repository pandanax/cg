<template>

  <div class="content">

    <div class="">
      <div class="container">

        <div class="profile-header ow">
          <span class="ow cap">
          {{$lang.messages.player }}
          </span>
          <span> {{address | addr}}</span>
        </div>

        <div class="tabs ow cap font-blue">
          <div v-on:click="setTab(0)" v-bind:class="{'active': tab == 0}" class="tab trapezoid">
            {{$lang.messages.shopHistory}}
          </div>
          <div v-on:click="setTab(1)" v-bind:class="{'active': tab == 1}" class="tab trapezoid">
            {{$lang.messages.winHistory}}
          </div>
        </div>

      </div>
      <div class="orange-bg-line"></div>
    </div>

    <div class="container">
      <div v-if="tab == 0">
        <div class="page-loading" v-if="gameCount*2 > loadedCount">
          <img src="/static/loader.gif"/>
        </div>
        <div class="ow cap font-blue" v-if="gameCount*2 == loadedCount && !orderedTickets.length">
          {{$lang.messages.n2}}
        </div>
        <table v-if="gameCount*2 == loadedCount && orderedTickets.length" class=" table table-sm table-striped ">
          <thead class="cap">
          <tr class="ow font-blue">

            <th class="cursor-pointer" v-on:click="setSort('gameId', 'tickets')">
              {{$lang.messages.game}}
              <span class="tab-arrows">


              <div
                v-show="sort.tickets.name != 'gameId' || (sort.tickets.name == 'gameId' && sort.tickets.order == 'asc')"
                class="arrow-up"></div>
              <div
                v-show="sort.tickets.name != 'gameId' || (sort.tickets.name == 'gameId' && sort.tickets.order == 'desc')"
                class="arrow-down"></div>

             </span>
            </th>
            <th class="cursor-pointer">
              {{$lang.messages.round}}
            </th>
            <th></th>
            <th class="cursor-pointer" v-on:click="setSort('hash', 'tickets')">
              {{$lang.messages.hash}}
              <span class="tab-arrows">


              <div v-show="sort.tickets.name != 'hash' || (sort.tickets.name == 'hash' && sort.tickets.order == 'asc')"
                   class="arrow-up"></div>
              <div v-show="sort.tickets.name != 'hash' || (sort.tickets.name == 'hash' && sort.tickets.order == 'desc')"
                   class="arrow-down"></div>

             </span>
            </th>

            <th class="cursor-pointer" v-on:click="setSort('price', 'tickets')">
              {{$lang.messages.ticketPrice}}
              <span class="tab-arrows">


              <div
                v-show="sort.tickets.name != 'price' || (sort.tickets.name == 'price' && sort.tickets.order == 'asc')"
                class="arrow-up"></div>
              <div
                v-show="sort.tickets.name != 'price' || (sort.tickets.name == 'price' && sort.tickets.order == 'desc')"
                class="arrow-down"></div>

             </span>
            </th>

            <th class="cursor-pointer" v-on:click="setSort('when', 'tickets')">
              {{$lang.messages.date}}
              <span class="tab-arrows">


              <div v-show="sort.tickets.name != 'when' || (sort.tickets.name == 'when' && sort.tickets.order == 'asc')"
                   class="arrow-up"></div>
              <div v-show="sort.tickets.name != 'when' || (sort.tickets.name == 'when' && sort.tickets.order == 'desc')"
                   class="arrow-down"></div>

             </span>
            </th>
          </tr>
          </thead>
          <tbody>

          <tr v-for="l in orderedTickets">
            <td><span>{{$lang.messages.game}} {{l.gameId | int}}</span></td>
            <td><span>#{{l.returnValues.periodNumber | int}}</span></td>
            <td>
              <div class="table-cube-padding">

                <cube :hash="l.returnValues.hash"></cube>

              </div>
            </td>
            <td><span>{{l.returnValues.hash | bytes}}</span></td>

            <td>
              {{l.price}} ETH
            </td>

            <td>
              {{l.returnValues.when | sdate}}
              {{l.returnValues.when | stime}}
            </td>


          </tr>

          </tbody>

        </table>
      </div>
      <div v-if="tab == 1">
        <div class="page-loading" v-if="gameCount*2 > loadedCount">
          <img src="/static/loader.gif"/>
        </div>
        <div class="ow cap font-blue" v-if="gameCount*2 == loadedCount && !orderedLogs.length">
          {{$lang.messages.n1}}
        </div>
        <table v-if="gameCount*2 == loadedCount && orderedLogs.length" class=" table table-sm table-striped ">
          <thead class="cap">
          <tr class="ow font-blue">

            <th class="cursor-pointer" v-on:click="setSort('gameId')">
              {{$lang.messages.game}}
              <span class="tab-arrows">


              <div v-show="sort.logs.name != 'gameId' || (sort.logs.name == 'gameId' && sort.logs.order == 'asc')"
                   class="arrow-up"></div>
              <div v-show="sort.logs.name != 'gameId' || (sort.logs.name == 'gameId' && sort.logs.order == 'desc')"
                   class="arrow-down"></div>

             </span>
            </th>
            <th class="cursor-pointer">
              {{$lang.messages.round}}
            </th>
            <th></th>
            <th class="cursor-pointer" v-on:click="setSort('hash')">
              {{$lang.messages.hash}}
              <span class="tab-arrows">


              <div v-show="sort.logs.name != 'hash' || (sort.logs.name == 'hash' && sort.logs.order == 'asc')"
                   class="arrow-up"></div>
              <div v-show="sort.logs.name != 'hash' || (sort.logs.name == 'hash' && sort.logs.order == 'desc')"
                   class="arrow-down"></div>

             </span>
            </th>

            <th class="cursor-pointer" v-on:click="setSort('price')">
              {{$lang.messages.ticketPrice}}
              <span class="tab-arrows">


              <div v-show="sort.logs.name != 'price' || (sort.logs.name == 'price' && sort.logs.order == 'asc')"
                   class="arrow-up"></div>
              <div v-show="sort.logs.name != 'price' || (sort.logs.name == 'price' && sort.logs.order == 'desc')"
                   class="arrow-down"></div>

             </span>
            </th>
            <th class="cursor-pointer" v-on:click="setSort('reward')">
              {{$lang.messages.gain}}
              <span class="tab-arrows">


              <div v-show="sort.logs.name != 'reward' || (sort.logs.name == 'reward' && sort.logs.order == 'asc')"
                   class="arrow-up"></div>
              <div v-show="sort.logs.name != 'reward' || (sort.logs.name == 'reward' && sort.logs.order == 'desc')"
                   class="arrow-down"></div>

             </span>
            </th>
            <th class="cursor-pointer" v-on:click="setSort('when')">
              {{$lang.messages.date}}
              <span class="tab-arrows">


              <div v-show="sort.logs.name != 'when' || (sort.logs.name == 'when' && sort.logs.order == 'asc')"
                   class="arrow-up"></div>
              <div v-show="sort.logs.name != 'when' || (sort.logs.name == 'when' && sort.logs.order == 'desc')"
                   class="arrow-down"></div>

             </span>
            </th>
          </tr>
          </thead>
          <tbody>

          <tr v-for="l in orderedLogs">
            <td><span>{{$lang.messages.game}} {{l.gameId | int}}</span></td>
            <td><span>#{{l.returnValues.periodNumber | int}}</span></td>
            <td>
              <div class="table-cube-padding">

                <cube :hash="l.returnValues.winnerHash"></cube>

              </div>
            </td>
            <td><span>{{l.returnValues.winnerHash | bytes}}</span></td>

            <td>
              {{l.price}} ETH
            </td>
            <td>
              {{l.returnValues.reward | eth}}
            </td>
            <td>
              {{l.returnValues.when | sdate}}
              {{l.returnValues.when | stime}}
            </td>

            <!--<hr/>
            <div v-if="t.tx && t.tx.returnValues">

              <div style="float: right">{{t.tx.returnValues.when | sdate}} {{t.tx.returnValues.when | stime}}</div>
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
  </div>

</template>
<script>

  import EtherData from '../ether'
  import Cube from 'components/Cube'


  import Metamask from 'services/Metamask';

  const MetamaskService = new Metamask();
  export default {
    components: {Cube},
    data: function () {
      return {
        address: '',
        level: -1,
        logs: [],
        tickets: [],
        tab: 0,
        sort: {
          logs: {
            name: 'when',
            order: 'desc'
          },
          tickets: {
            name: 'when',
            order: 'desc'
          }
        },
        gameCount: 0,
        loadedCount: 0
      }
    },
    created: function () {
      this.init();
    },
    computed: {
      orderedLogs: function () {
        if (this.logs) {
          return this.lodash.orderBy(this.logs, this.sort.logs.name, this.sort.logs.order);
        }
        return [];
      },

      orderedTickets: function () {
        if (this.logs) {
          return this.lodash.orderBy(this.tickets, this.sort.tickets.name, this.sort.tickets.order);
        }
        return [];
      }
    },
    methods: {
      setTab: function (n) {
        this.tab = n;
      },
      setSort: function (name, tck) {

        let prop = 'logs';
        if (tck) {
          prop = 'tickets';
        }


        if (this.sort[prop].name == name) {
          if (this.sort[prop].order == 'asc') {
            this.sort[prop].order = 'desc'
          } else {
            this.sort[prop].order = 'asc'
          }
        } else {
          this.sort[prop].name = name;
          this.sort[prop].order = 'asc';
        }
      },
      init: function () {


        let self = this;
        self.level = MetamaskService.detectLevel();


        function createEventListener(id) {


          MetamaskService.games().getEventLog(id, 'PeriodFinished').then(function (logs) {

            for (let k = 0; k < logs.length; k++) {
              let log = logs[k];

              if (log.returnValues.winnerAddr.toString().toLowerCase() == self.address.toString().toLowerCase()) {

                log.gameId = id;
                log.price = EtherData.contracts[id].price;
                log.hash = log.returnValues.winnerHash;
                log.when = log.returnValues.when;
                log.reward = log.returnValues.reward;
                self.$set(self.logs, self.logs.length, log);
              }
            }

            self.loadedCount++;

          })

          MetamaskService.games().getEventLog(id, 'TicketSelling', {address: '0x5520148407Fe16c273E67A4C32173D08350103f3'}).then(function (logs) {


            for (let k = 0; k < logs.length; k++) {

              let log = logs[k];
              if (log.returnValues.from.toString().toLowerCase() == self.address.toString().toLowerCase()) {

                log.gameId = id;
                log.price = EtherData.contracts[id].price;
                log.hash = log.returnValues.hash;
                log.when = log.returnValues.when;

                self.$set(self.tickets, self.tickets.length, log);
              }
            }

            self.loadedCount++;


          })


        }

        web3.eth.getAccounts(function (error, accounts) {
          if (accounts.length) {
            self.address = accounts[0];
            console.log('!self.address', self.address)
            for (let k in EtherData.contracts) {
              createEventListener(k);
              self.gameCount++;
            }
          }
        });


      }
    }
  }


</script>
<style>
  .profile-header {
    font-size: 36px;
    margin-bottom: 10px;
  }

  .trapezoid {
    border-bottom: 57px solid #c6c6c6;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    height: 0;
    width: 50%;
  }

  .tabs {
    height: 57px;
  }

  .tab:first-child {
    margin-right: -10px;
  }

  .tab:last-child {
    margin-left: -10px;
  }

  .tab {
    font-size: 18px;
    line-height: 57px;
    text-align: center;
    float: left;
    cursor: pointer;

  }

  .tab.active.trapezoid {
    border-bottom: 57px solid #ffa800;
    z-index: 1;
    position: relative;
  }

  .orange-bg-line {
    height: 4px;
    background: #ffa800;
    margin-bottom: 30px;
  }

</style>
