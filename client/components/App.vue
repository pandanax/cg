<template>
  <div class="body" id="app">
    <!--<div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
      <h5 class="my-0 mr-md-auto font-weight-normal"><a href="#/">CryptoGames</a></h5>
      <navigation></navigation>
      <a class="btn btn-outline-primary" href="#/profile">Profile</a>
    </div>-->
    <metamask-status></metamask-status>
    <router-view></router-view>
  </div>
</template>

<style>
  @font-face{

    font-family: 'OswaldRegular';

    src: url('/static/fonts/Oswald-Regular.ttf') format('truetype');

    font-weight: normal;

    font-style: normal;

  }

  .ow {
    font-family: 'OswaldRegular';
  }

  .body {
    /*background-color: #1c335a;*/
    background-color: #000;
    color: #111;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }

  .blue-bg {
    background: #1c335a;
  }


  a.font-blue,
  .font-blue  {
    color: #1c335a;
  }

  .cap {
    text-transform: uppercase;
  }

  .bold {
    font-weight: bold;
  }

  .font-white {
    color: #fff;
  }
  .font-yellow {
    color: #ffa800;
  }
  .bg-yellow {
    background-color: #ffa800;
  }
  .bg-white {
    background-color: white;
  }
  .pull-right {
    float: right;
  }
  .pull-left {
    float: left;
  }

</style>
<script>
  import Navigation from 'components/Navigation'
  import MetamaskStatus from 'components/MetamaskStatus'
  import detectLang from 'detect-browser-language'


  export default {
    components: {
      Navigation,
      MetamaskStatus
    },
    created: function () {


      var s = detectLang();
      //s = 'ru';
      //s = 'cn';
      var lng = s.substring(0, 2).toLowerCase();

      if (lng == 'cn') {
        this.$lang.setLang('cn')
      } else if (lng == 'ru') {
        this.$lang.setLang('ru')
      } else {
        this.$lang.setLang('en')
      }


    }

  }
</script>
