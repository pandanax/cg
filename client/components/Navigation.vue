<template>
  <nav v-if="level == 2" class="my-2 my-md-0 mr-md-3">
    <a class="p-2 text-dark" href="#/games">Games</a>
  </nav>
</template>
<script>
  import Metamask from 'services/Metamask';

  const MetamaskService = new Metamask();

  export default {
    components: {
    },
    created: function () {
      this.init();
    },

    data: function () {
      return {
        level: -1
      }
    },


    methods: {
      init: function () {
        let self = this;
        self.level = MetamaskService.detectLevel();
      }
    }
  }
</script>
