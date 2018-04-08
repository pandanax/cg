<template>
  <div>
    <small-header></small-header>

    <main-nav></main-nav>

    <div>
      <main-stat></main-stat>
    </div>

    <main-footer></main-footer>


  </div>
</template>

<script>

  //import Profile from 'components/Profile'

  import address from '../ether'
  import router from '../router'

  import SmallHeader from 'components/SmallHeader'
  import MainNav from 'components/MainNav'
  import MainStat from 'components/MainStat'
  import MainFooter from 'components/MainFooter'

  export default {
    components: {
      SmallHeader,
      MainNav,
      MainFooter,
      MainStat
    },
    methods: {
      /*goToLot: function (x) {
        router.push({path: 'game/' + x});
      }*/
    }

  }
</script>
