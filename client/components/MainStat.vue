<template>
  <div>
    <div class="page-loading" v-if="loadedCount < gameCount">
      <img src="/static/loader.gif"/>
    </div>
    <div class="content" v-if="loadedCount == gameCount">
      <div class="container">
        <div>
          <div class="stat-header ow cap">
            {{$lang.messages.menu2}}
          </div>
          <table class="cap table table-sm table-striped">
            <thead>
            <tr class="ow font-blue">

              <th class="cursor-pointer" v-on:click="setSort('gameId')">
                {{$lang.messages.game}}
                <span class="tab-arrows">


              <div v-show="sort.name != 'gameId' || (sort.name == 'gameId' && sort.order == 'asc')"
                   class="arrow-up"></div>
              <div v-show="sort.name != 'gameId' || (sort.name == 'gameId' && sort.order == 'desc')"
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


              <div v-show="sort.name != 'hash' || (sort.name == 'hash' && sort.order == 'asc')" class="arrow-up"></div>
              <div v-show="sort.name != 'hash' || (sort.name == 'hash' && sort.order == 'desc')"
                   class="arrow-down"></div>

             </span>
              </th>
              <th>
                {{$lang.messages.player}}
              </th>
              <th class="cursor-pointer" v-on:click="setSort('price')">
                {{$lang.messages.ticketPrice}}
                <span class="tab-arrows">


              <div v-show="sort.name != 'price' || (sort.name == 'price' && sort.order == 'asc')"
                   class="arrow-up"></div>
              <div v-show="sort.name != 'price' || (sort.name == 'price' && sort.order == 'desc')"
                   class="arrow-down"></div>

             </span>
              </th>
              <th class="cursor-pointer" v-on:click="setSort('reward')">
                {{$lang.messages.gain}}
                <span class="tab-arrows">


              <div v-show="sort.name != 'reward' || (sort.name == 'reward' && sort.order == 'asc')"
                   class="arrow-up"></div>
              <div v-show="sort.name != 'reward' || (sort.name == 'reward' && sort.order == 'desc')"
                   class="arrow-down"></div>

             </span>
              </th>
              <th class="cursor-pointer" v-on:click="setSort('when')">
                {{$lang.messages.date}}
                <span class="tab-arrows">


              <div v-show="sort.name != 'when' || (sort.name == 'when' && sort.order == 'asc')" class="arrow-up"></div>
              <div v-show="sort.name != 'when' || (sort.name == 'when' && sort.order == 'desc')"
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
                {{l.returnValues.winnerAddr}}
              </td>
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


            </tr>

            </tbody>

          </table>
        </div>
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
        level: -1,
        logs: [],
        sort: {
          name: 'when',
          order: 'desc'
        },
        loadedCount: 0,
        gameCount: 0

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


        function createEventListener(id) {

          MetamaskService.games().getEventLog(id, 'PeriodFinished').then(function (logs) {

            for (var k = 0; k < logs.length; k++) {
              let log = logs[k];
              log.gameId = id;
              log.price = EtherData.contracts[id].price;
              log.hash = log.returnValues.winnerHash;
              log.when = log.returnValues.when;
              log.reward = log.returnValues.reward;
              self.$set(self.logs, self.logs.length, log);
            }

            self.loadedCount++;


          })

        }


        for (let k in EtherData.contracts) {
          createEventListener(k);
          self.gameCount++
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
