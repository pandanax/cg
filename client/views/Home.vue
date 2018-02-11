<template>
  <div class="body">



    <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
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


    </div>


  </div>
</template>

<script>
  import DownloadMetamask from 'components/DownloadMetamask'

  export default {
    components: {
      DownloadMetamask
    }
  }
</script>
