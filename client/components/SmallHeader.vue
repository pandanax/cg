<template>
  <div class="header-bg ow">

    <div class="container">

      <header>

        <div class="header-space"></div>

        <div class="justify-content-md-center">
          <!--<div class="col-xs-2">

            <div class="eth-symbol"></div>
          </div>-->
          <div class=" title-line">
            <a class="no-decorate" href="/">
            <span class="header-title cap">
              Galaxy
            </span>
            <span class="header-subtitle cap font-white">
                Crypto Games
              </span>
            </a>
            <div class="header-subtitle-2 cap font-white">
              {{$lang.messages.h1}}
            </div>
          </div>
        </div>

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
    <!--<div class="maket"></div>-->

  </div>
</template>

<style scoped="">
  header {
    text-align: center;
  }

  .header-space {
    height: 100px;
  }

  .header-bg {

    height: 831px;
    background-image: url(/static/header/h.png);
    background-position: 50% -241px;
    background-repeat: no-repeat;
    height: 345px;
  }

  .eth-symbol {
    height: 213px;
    background-image: url(/static/header/e.png);
    background-position: 50% 0;
    background-repeat: no-repeat;
    width: 81px;
    background-size: 81px;
  }

  .maket {
    background-image: url(/static/tmp/images/seco_03.png);
    background-position: 50% 0;
    background-repeat: no-repeat;
    opacity: 0.5;
    position: absolute;
    width: 100%;
    height: 10000px;
    top: 51px;
  }

  .title-line {
    background-image: url(/static/header/e.png);
    background-position: 126px 20px;
    background-repeat: no-repeat;
    background-size: 85px;


  }

  .header-title {
    line-height: 156px;
    padding-left: 135px;
    font-size: 80px;
    color: #ffa800;
    text-shadow: 0px 0px 43px rgba(0, 0, 0, 1);

  }

  .header-subtitle {
    line-height: 156px;

    font-size: 80px;
    padding-left: 26px;
  }

  .header-subtitle-2 {
    font-size: 23px;
    line-height: 25px;
    letter-spacing: 5px;


  }
  .no-decorate:hover {
    text-decoration: none;
  }
  .no-decorate {

  }
</style>
