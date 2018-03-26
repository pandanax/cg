<template>
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


</template>

<style scoped="">
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
</style>
