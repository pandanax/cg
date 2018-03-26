<template>
  <div>
    <small-header></small-header>

    <main-nav></main-nav>

    <div>
      <game-grid></game-grid>
    </div>

    <main-footer></main-footer>

    <!--<div class="container">


      <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <h1 class="display-4">Игры</h1>
        <p class="lead">Мы создали разные игры с разными условиями входа и разными выигрышами</p>
      </div>


      <div class="container">
        <div class="card-deck mb-3 text-center">
          <div class="card mb-4 box-shadow">
            <div class="card-header">
              <h4 class="my-0 font-weight-normal">Воздушная игра</h4>
            </div>
            <div class="card-body">
              <h1 class="card-title pricing-card-title">0.01 <small class="text-muted">ETH</small></h1>
              <ul class="list-unstyled mt-3 mb-4">

                <li>100 билетов</li>
                <li>1 час длительность</li>
                <li>95% победителю</li>
              </ul>
              <button v-on:click="goToLot(1)" type="button" class="btn btn-lg btn-block btn-outline-primary">Играть</button>
            </div>
          </div>

          <div class="card mb-4 box-shadow">
            <div class="card-header">
              <h4 class="my-0 font-weight-normal">Простая игра</h4>
            </div>
            <div class="card-body">
              <h1 class="card-title pricing-card-title">0.03 <small class="text-muted">ETH</small></h1>
              <ul class="list-unstyled mt-3 mb-4">

                <li>33 билета</li>
                <li>3 часа длительность</li>
                <li>95% победителю</li>
              </ul>
              <button v-on:click="goToLot(2)" type="button" class="btn btn-lg btn-block btn-outline-primary">Играть</button>
            </div>
          </div>

        </div>
        <div class="card-deck mb-3 text-center">


        <div class="card mb-4 box-shadow">
            <div class="card-header">
              <h4 class="my-0 font-weight-normal">Серьезная игра</h4>
            </div>
            <div class="card-body">
              <h1 class="card-title pricing-card-title">0.1 <small class="text-muted">ETH</small></h1>
              <ul class="list-unstyled mt-3 mb-4">

                <li>10 билетов</li>
                <li>12 часов длительность</li>
                <li>95% победителю</li>
              </ul>
              <button v-on:click="goToLot(3)" type="button" class="btn btn-lg btn-block btn-outline-primary">Играть</button>
            </div>
          </div>

          <div class="card mb-4 box-shadow">
            <div class="card-header">
              <h4 class="my-0 font-weight-normal">Люкс игра</h4>
            </div>
            <div class="card-body">
              <h1 class="card-title pricing-card-title">0.5 <small class="text-muted">ETH</small></h1>
              <ul class="list-unstyled mt-3 mb-4">

                <li>10 билетов</li>
                <li>12 часов длительность</li>
                <li>97% победителю</li>
              </ul>
              <button v-on:click="goToLot(4)" type="button" class="btn btn-lg btn-block btn-outline-primary">Играть</button>
            </div>
          </div>




        </div>


      </div>



    </div>-->
  </div>
</template>

<script>

  //import Profile from 'components/Profile'

  import address from '../ether'
  import router from '../router'

  import GameGrid from 'components/GameGrid'
  import SmallHeader from 'components/SmallHeader'
  import MainNav from 'components/MainNav'
  import MainFooter from 'components/MainFooter'

  export default {
    components: {
      GameGrid,
      SmallHeader,
      MainNav,
      MainFooter
    },
    methods: {
      goToLot: function (x) {
        router.push({path: 'game/' + x});
      }
    }

  }
</script>
