<template>
  <div>
    <small-header></small-header>

    <main-nav></main-nav>

    <div>
        <div class="content">
      <div class="container">
          <div class="page-header ow cap">
            {{$lang.messages.menu3}}

            <download-metamask></download-metamask>

          </div>
        </div>
      </div>
    </div>

    <main-footer></main-footer>


  </div>
</template>

<script>

  //import Profile from 'components/Profile'

  import SmallHeader from 'components/SmallHeader'
  import MainNav from 'components/MainNav'
  import MainFooter from 'components/MainFooter'
  import DownloadMetamask from 'components/DownloadMetamask'


  export default {
    components: {
      SmallHeader,
      MainNav,
      MainFooter,
      DownloadMetamask
    },
    methods: {
      /*goToLot: function (x) {
        router.push({path: 'game/' + x});
      }*/
    }

  }
</script>
