<template>
  <nav>
    <div class="container ow">
      <ul class="main-menu cap">
        <li>
          <a href="#/games">{{$lang.messages.menu1}}</a>
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
</template>
<style scoped="">


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
</style>
