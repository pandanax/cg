<template>
  <div class="body">
    <div class="header-bg ow">

      <div class="container">

        <header>

          <div class="header-space"></div>

          <div class="eth-symbol"></div>

          <div class="header-title cap">
            Galaxy
          </div>

          <div class="header-subtitle cap">
            Crypto Games
          </div>

          <div class="header-subtitle-2 cap">
            {{$lang.messages.h1}}
          </div>

          <a href class="header-main-button cap">
            {{$lang.messages.h2}}
          </a>

        </header>


        <!--<div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
          <h1 class="display-4">Криптоигры</h1>
          <p class="lead">
            Тут слоган должен быть. В нескольких словах раскрывающий суть.
          </p>
          <div class="row">
          <div class="col-4 offset-4">

            <a href="#/profile" class="btn btn-lg btn-block btn-primary">Играть</a>
          </div>
          </div>
        </div>

        <div class="container">
          <div class="text-center">
            <h2>Как работает?</h2>
            <p class="lead">
              Как это работает. Правила игры в двух словах. Про блокчейн, смартконтракты.
            </p>
          </div>

          <div class="text-center">
            <h2>Что нужно чтоб играть</h2>
            <p class="lead">
              Тут про метамаск, где его скачать, как юзать, где взять эфириумы

            </p>
            <download-metamask></download-metamask>
          </div>


        </div>-->


      </div>


    </div>

    <nav>
      <div class="container ow">
        <ul class="main-menu cap">
          <li>
            <a href>{{$lang.messages.menu1}}</a>
          </li>
          <li>
            <a href>{{$lang.messages.menu2}}</a>
          </li>
          <li>
            <a href>{{$lang.messages.menu3}}</a>
          </li>
          <li>
            <a href>{{$lang.messages.menu4}}</a>
          </li>
        </ul>
      </div>
    </nav>

    <div class="jackpot cap ow">

      <div class="container">
        <div class="jackpot-str">
          <span class="jackpot-str-total">
            {{$lang.messages.commonJackpot}}:
          </span>
          <span class="jackpot-str-number">

            <span class="jackpot-str-number-symbol">
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
            </span>
          </span>
          <span class="jackpot-str-total-currency">eth</span>
        </div>
      </div>

    </div>

    <div class="games bg-white">

      <game-grid></game-grid>

      <div class="more-games"></div>

    </div>

    <footer>
      <div class="blue-bg footer-container font-white">

        <div class="container">

          <div class="footer-inner">

            <div class="row">
              <div class="col-sm cap">
                <div class="footer-copy">
                  2018 (c) galaxy crypto games
                </div>
                <div class="left-links">
                  <ul>
                    <li>
                      <a href="">
                        {{$lang.messages.contacts}}
                      </a>
                    </li>
                    <li>
                      <a href="">
                        white paper
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-sm">

                <div class="right-links cap">
                  <ul>
                    <li>
                      <a href="">
                        {{$lang.messages.question}}
                      </a>
                    </li>
                    <li>
                      <a href="">
                        {{$lang.messages.about}}
                      </a>
                    </li>
                    <li>
                      <div class="row">
                        <div class="col-sm-6">

                          <a href="">
                            {{$lang.messages.follow}}
                          </a>
                        </div>
                        <div class="col-sm-6">
                          <a href="" class="icon-link gh"></a>
                          <a href="" class="icon-link fb"></a>
                          <a href="" class="icon-link tw"></a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>

                <div class="footer-container-eth">

                  <div class="footer-eth-ico"></div>

                  <div class="footer-eth-text">
                    {{$lang.messages.m6}}
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>


    <div class="maket"></div>
  </div>


</template>

<script>
  import DownloadMetamask from 'components/DownloadMetamask'
  import GameGrid from 'components/GameGrid'

  export default {
    components: {
      DownloadMetamask,
      GameGrid
    }
  }
</script>

<style>


  header {
    text-align: center;
  }

  .header-bg {

    height: 831px;
    background-image: url(/static/header/h.png);
    background-position: 50% 0;
    background-repeat: no-repeat;

  }

  .header-space {
    height: 66px;
  }

  .eth-symbol {
    height: 213px;
    background-image: url(/static/header/e.png);
    background-position: 50% 0;
    background-repeat: no-repeat;
  }

  .header-title {

    padding: 10px 0 0;
    line-height: 100%;
    font-size: 214px;
    color: #ffa800;
    text-shadow: 0px 0px 43px rgba(0, 0, 0, 1);

  }

  .header-subtitle {
    padding: 8px 0 0;
    font-size: 61px;
    line-height: 61px;
  }

  .header-subtitle-2 {
    font-size: 37px;
    line-height: 37px;
    padding: 68px 0 0;
    letter-spacing: 8px;

  }

  .maket {
    background-image: url("/static/tmp/GALAXY GAMES (1).png");
    position: absolute;
    height: 3000px;
    width: 100%;
    top: 0;
    left: 0;
    background-position: 50% 0;
    opacity: 0.5;
  }

  a.header-main-button {
    background-color: #ffa800;
    font-size: 48px;
    color: #000;
    margin: 40px auto 0;
    display: block;
    line-height: 64px;
    width: 586px;
  }

  nav {
    background: #1c335a;
  }

  .main-menu {
    display: block;
    margin: 0;
    height: 50px;
    text-align: center;
    /*text-align: justify;
    text-align-last: justify;
    -moz-text-align-last: justify;*/
    padding: 0;
  }

  .main-menu li {
    list-style: none;
    display: inline-block;
    height: 50px;
    margin: 0 30px;

  }

  .main-menu li a {
    color: #fff;
    font-size: 31px;
    line-height: 48px;

  }

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
    margin-left: 108px;
  }

  .jackpot-str-number-symbol {

    background-color: #ffa800;
    padding: 0;
    margin: 0 0px;
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
    margin: 0 7px;
  }

  .jackpot-str-total-currency {
    margin-left: 32px;
  }

  .more-games {
    height: 84px;
  }

  footer {

  }

  .footer-container {
    line-height: 32px;

  }

  .footer-inner {
    padding-top: 44px;
    padding-bottom: 108px;
  }

  .footer-container ul {
    list-style: none;
    line-height: 32px;

    margin: 0;
    padding: 0;

  }

  .footer-container .left-links ul {

    padding: 17px 0 0;
    font-size: 14px;
  }

  .footer-container .right-links ul {
    padding: 0px 0 0;
    font-size: 16px;
    line-height: 34px;
  }

  .footer-container ul li {
    margin: 0;
    padding: 0;

  }

  .footer-container ul li a {
    color: white;
  }

  .footer-container-eth {

  }

  .footer-eth-text {
    margin: 0 0 0 120px;
    font-size: 25px;
    padding: 44px  16px 0 0;
  }

  .footer-eth-ico {
    background-image: url(/static/header/e.png);
    width: 87px;
    height: 138px;
    background-size: 87px 138px;
    float: left;
    margin: 20px;
  }

  .icon-link {
    width: 23px;
    height: 23px;
    display: inline-block;
    margin: 3px 3px;
  }

  .icon-link.fb {
    background-image: url(/static/footer/fb.png);
  }

  .icon-link.tw {
    background-image: url(/static/footer/tw.png);
  }

  .icon-link.gh {
    background-image: url(/static/footer/gh.png);
  }


</style>
