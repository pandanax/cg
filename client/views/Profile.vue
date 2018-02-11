<template>
  <div>


    <p v-if="level == -1">LOADING...</p>
    <p v-else-if="level == 0">
      <download-metamask></download-metamask>
    </p>
    <p v-else-if="level == 1">
      акк залочен!
    </p>
    <p v-else-if="level == 2">
      все хорошо!
    </p>
  </div>
</template>
<script>
  import DownloadMetamask from 'components/DownloadMetamask'


  import Metamask from 'services/Metamask';

  const MetamaskService = new Metamask();

  export default {
    components: {
      DownloadMetamask
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


<!--
<template>


    <div class="container">


        <profile></profile>


    </div>

</template>

<script>

  import Profile from 'components/Profile'

  export default {
    components: {
      Profile
    },
    created: function() {
    }

  }
</script>
-->
