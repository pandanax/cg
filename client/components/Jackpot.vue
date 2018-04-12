<template>
  <div v-show="jack > 0" class="jackpot cap ow">

    <div class="container">
      <div class="jackpot-str font-white">
          <span class="jackpot-str-total">
            {{$lang.messages.commonJackpot}}:
          </span>
        <span class="jackpot-str-number">

          <span v-bind:class="{'jackpot-str-number-symbol': j >=0 && j <=9, 'jackpot-str-number-dot': j == '.'}" v-for="j in getJack">
            {{(j>=0&&j<=9)?j:''}}
          </span>


            <!--<span class="jackpot-str-number-symbol">
              9
            </span>
            <span class="jackpot-str-number-symbol">
              9
            </span>
            <span class="jackpot-str-number-dot">
            </span>
            <span class="jackpot-str-number-symbol">
              9
            </span>
            <span class="jackpot-str-number-symbol">
              9
            </span>-->
          </span>
        <span class="jackpot-str-total-currency">eth</span>
      </div>
    </div>

  </div>
</template>
<script>
  import EtherData from '../ether'
  import Metamask from 'services/Metamask';
  const MetamaskService = new Metamask();
  export default {
    components: {},
    data: function () {
      return {
        jack: 0
      }
    },
    created: function () {
      this.init();
    },
    computed: {

      getJack: function () {
        let arr = [];
        let str = this.jack.toString().substring(0, 6);
        for (let i = 0; i < str.length; i++) {
          arr.push(str[i]);
        }
        return arr;
      }

    },
    methods: {
      init: function () {

        let self = this;

        function addJack(id) {


          return MetamaskService.games().getGameFields(id).then(function (r) {
            console.log('ID', r);
            self.jack += r.jackPotFunds / Math.pow(10, 18);
            console.log('self.jack', self.jack);
          })


        }

        for (let k in EtherData.contracts) {
          addJack(k);
        }

      }
    }
  }
</script>
<style scoped="">


  .jackpot {
    height: 278px;
    background-image: url(/static/jackpot/j.png);
    background-position: 50% 0;
    background-repeat: no-repeat;
  }

  .jackpot-str {
    font-size: 61px;
    line-height: 292px;
    text-align: center;
  }

  .jackpot-str-number {
    margin-left: 60px;
  }

  .jackpot-str-number-symbol {

    background-color: #ffa800;
    padding: 0;
    margin: 0 14px 0 0;
    text-align: center;
    color: #000;
    width: 58px;
    display: inline-block;
    line-height: 79px;;
  }

  .jackpot-str-number-dot {
    width: 24px;
    height: 24px;
    background-color: #ffa800;
    border-radius: 12px;
    display: inline-block;
    position: relative;
    top: 16px;
    margin: 0 11px 0 7px;
  }

  .jackpot-str-total-currency {
    margin-left: 14px;
  }

</style>
