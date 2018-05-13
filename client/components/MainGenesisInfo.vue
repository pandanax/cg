<template>
  <div class="container">

    <div v-if="level < 2">
      Login To Your Metamask
      <download-metamask></download-metamask>
    </div>
    <div v-else="">
      <h3>
        {{acc}}
      </h3>

      <div v-if="!registered">
        <form>
          <div class="form-group">

            <input class="form-control" placeholder="parent address" v-model="parentAddr"/>
          </div>
          <button v-if="!payment" type="button" class="btn btn-primary" v-on:click="join">JOIN</button>
          <div v-else="">
            <div class="form-group">
              <label>Pay more than {{payment | eth}}</label>

              <input class="form-control" placeholder="nickname" v-model="nickname"/>
              <input class="form-control" placeholder="paymant amount" v-model="paymentAmount"/>
              <button type="button" class="btn btn-primary" v-on:click="pay">PAY</button>

            </div>
          </div>
        </form>
      </div>

      <div class="table" v-else="">
        <tr>
          <td>parent</td>
          <td>{{parent}}</td>
        </tr>

        <tr>
          <td>children</td>
          <td>
            <div v-for="(c,i) in children">
              {{i}}: {{c}}
            </div>
          </td>
        </tr>

        <tr>
          <td>myAvailableFunds</td>
          <td>{{myAvailableFunds | eth}}
            <span v-if="myAvailableFunds">
            <button v-if="acc != genesis" class="btn btn-primary" v-on:click="getMine">GET</button>
            <button v-if="acc == genesis" class="btn btn-primary" v-on:click="getMineGenesis">GET</button>
          </span>
          </td>
        </tr>
      </div>
    </div>

  </div>
</template>
<script>
  import DownloadMetamask from 'components/DownloadMetamask'

  import Metamask from 'services/Metamask';

  const MetamaskService = new Metamask();

  export default {
    components: {
      DownloadMetamask,
    },
    created: function () {
      this.init();
    },

    data: function () {
      return {
        level: -1,
        acc: '',
        parent: '',
        myAvailableFunds: '',
        children: [],
        parentAddr: '',
        payment: '',
        paymentAmount: 0,
        nickname: '',
        registered: false,
        genesis: null
      }
    },


    methods: {
      getMineGenesis(){
        MetamaskService.genesis().getField('getMineGenesis').then(function (r) {
          console.log("RESULT", r);
        })
      },
      getMine(){
        MetamaskService.genesis().getField('getMine').then(function (r) {
          console.log("RESULT", r);
        })
      },
      pay(){
        let self = this;
        MetamaskService.genesis().register(self.parentAddr, self.nickname, self.paymentAmount * Math.pow(10, 18)).then(function (r) {
          console.log("RESULT", r);
        })
      },
      join(){
        let self = this
        //self.parentAddr
        MetamaskService.genesis().getField('payments', [self.parentAddr]).then(function (r) {
          self.payment = r;
          self.paymentAmount = r / Math.pow(10, 18) + 0.001
        }).catch(console.error)
      },

      init: function () {
        let self = this;
        self.level = MetamaskService.detectLevel();

        self.acc = MetamaskService.genesis().getAccount();

        MetamaskService.genesis().getField('genesis').then(function (r) {
          self.genesis = r;
        })
        MetamaskService.genesis().getField('isNotRegistered', [self.acc]).then(function (r) {
          self.registered = !r;
            console.log("RRR",!r, self.registered);
        })


        MetamaskService.genesis().getParent(self.acc).then(function (r) {
          self.parent = r;
        });

        MetamaskService.genesis().getField('myAvailableFunds').then(function (r) {
          self.myAvailableFunds = r;
        });

        function startReadChild(index) {
          MetamaskService.genesis().getField('children', [self.acc, index]).then(function (r) {
            ++index;
            if (r) {

              self.children.push(r);
              startReadChild(index)
            }


          }).catch(function (e) {
            console.log('eee', e);

          });
        }

        startReadChild(0);


      }
    }
  }
</script>
