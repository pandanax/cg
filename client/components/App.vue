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

  .content {
    background: #fff;
    color: #000;
    padding: 40px 0 80px;
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


  .table th {
    font-size: 18px;
    font-weight: normal;
  }
  .table td {
    font-size: 14px;
  }
  .table th, .table td {
    border-top: none;
    padding: 0;
    line-height: 32px;
  }
  .table td .cube-outer {
    width: 100%;
    height: 100%;
  }
  .table-striped tbody tr:nth-of-type(odd) {
    background-color: #afbfda;
  }
  .table td .table-cube-padding {
    margin: 0 10px;
    width: 16px;
    height: 16px;
    position: relative;
    line-height: 28px;
    float: right;
  }


  .table th.cursor-pointer {
    cursor: pointer;
  }
  .table th .tab-arrows {
    display: inline-block;
    height: 12px;
    width: 5px;
    line-height: 32px;
    position: relative;
    cursor: pointer;
  }
  .table th .tab-arrows .arrow-down{
    margin-top: 2px;
  }


  .arrow-up {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;

    border-bottom: 5px solid;
  }

  .arrow-down {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;

    border-top: 5px solid;
  }

  .font-sm {
    font-size: 10px;
  }

  .table tr th:first-child,
  .table tr td:first-child {
    padding-left: 8px;
  }
  .table thead th {
    border-bottom: none;
  }

  .page-header {
    font-size: 36px;
  }


</style>
<script>
  import Navigation from 'components/Navigation'
  import MetamaskStatus from 'components/MetamaskStatus'
  /*import detectLang from 'detect-browser-language'*/


  export default {
    components: {
      Navigation,
      MetamaskStatus
    },
    created: function () {


      var s =
      (navigator.languages && navigator.languages[0]) ||
      navigator.language ||
      navigator.userLanguage;

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
