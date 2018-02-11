<template>
  <div id="app">
    <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
      <h5 class="my-0 mr-md-auto font-weight-normal"><a href="#/">CryptoGames</a></h5>
      <navigation></navigation>
      <a class="btn btn-outline-primary" href="#/profile">Profile</a>
    </div>
    <router-view></router-view>
  </div>
</template>

<style>

</style>
<script>
  import Navigation from 'components/Navigation'

  export default {
    components: {
      Navigation
    }
  }
</script>
