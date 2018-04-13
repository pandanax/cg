<template>
  <div>
    <small-header></small-header>

    <main-nav></main-nav>

    <div>
      <div class="content">
        <div class="container">
          <div class="ow cap">

            <div class="page-header font-blue">{{$lang.messages.menu3}}</div>

            <p>

              {{$lang.messages.txt2}}<br/>
              <a href="https://metamask.io/" target="_blank">Metamask</a>,<br/>
              <a href="https://www.myetherwallet.com/" target="_blank">MyEtherWallet</a>,<br/>
              <a href="https://blockchain.info/" target="_blank">Blockchain.info</a>.
            </p>

            <p>
              {{$lang.messages.txt3}}

            </p>
            <p>

              <download-metamask></download-metamask>
            </p>

            <p>
              {{$lang.messages.txt4}}


            </p>

            <p>
              {{$lang.messages.txt5}}


            </p>

            <p>
              {{$lang.messages.txt6}}

            </p>

            <p>
              {{$lang.messages.txt7}}

            </p>

            <p>
              {{$lang.messages.txt8}}


            </p>




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
