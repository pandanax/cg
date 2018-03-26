<template>
  <div class="abs-meta-cont">

    <div class="cap font-white ow">
      <div>

        <div class="container">
          <div class="ok-line">
            <div class="pull-left">
              {{$lang.messages.metamaskStatus[level]}}
            </div>
            <div class="pull-right" v-if="level == 2">
              <a class="profile-link" href="">
                {{$lang.messages.profile}}
              </a>
            </div>
          </div>
        </div>
        <div v-bind:class="{'gradient-green':level == 2, 'gradient-red':level == 0, 'gradient-yellow':level == 1}"></div>

      </div>
    </div>
  </div>
</template>
<style>
  .ok-line {

    line-height: 41px;
    font-size: 17px;;
    height: 41px;
  }

  .gradient-green {
    background: #00a308;
    background: linear-gradient(to right, #00a308, #fff);
    padding: 0 0 10px;
  }
  .gradient-red {
    background: #00a308;
    background: linear-gradient(to right, #a80000, #fff);
    padding: 0 0 10px;
  }
  .gradient-yellow {
    background: #00a308;
    background: linear-gradient(to right, #ffa800, #fff);
    padding: 0 0 10px;
  }

  .abs-meta-cont {
    width: 100%;
    left: 0;
    position: absolute;
  }
  a.profile-link {
    color: white;
  }

</style>
<script>
  import Metamask from 'services/Metamask';

  const MetamaskService = new Metamask();

  export default {
    components: {},
    created: function () {
      this.init();
    },

    data: function () {
      return {
        level: -1,
        addr: ''
      }
    },


    methods: {
      init: function () {
        let self = this;
        self.level = MetamaskService.detectLevel();
        self.addr = MetamaskService.getAddr();
        console.log('lvl', self.level)
      }
    }
  }
</script>
