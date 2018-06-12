<template>
  <div>
    <small-header></small-header>

    <main-nav></main-nav>

    <div>
      <div class="content">
        <div class="container">
          <div class="ow ">

            <div class="page-header font-blue cap">{{$lang.messages.menu4}}</div>

            <div>
              <li>
                <div class="cap">
                  {{$lang.faq.q1}}
                </div>
                <div class="">
                  {{$lang.faq.a1}}
                </div>
              </li>

              <li>
                <div class="cap">
                  {{$lang.faq.q2}}
                </div>
                <div class="">
                  {{$lang.faq.a2}}
                </div>
              </li>

              <li>
                <div class="cap">
                  {{$lang.faq.q3}}
                </div>
                <div class="">
                  {{$lang.faq.a3}}
                </div>
              </li>

              <li>
                <div class="cap">
                  {{$lang.faq.q4}}
                </div>
                <div class="">
                  {{$lang.faq.a4}}
                </div>
              </li>







              5. что будет если я не укажу свою хэш функцию?

              как стать партнером / как еще можно заработать в этой игре?
              Напишите нашему администратору если можете пригласить большое количество игроков

              Является ли это лотереей?
              CRYPTOGAME не является лотереей. Может возникнуть ощущение схожести, из-за того, что вы покупаете билет, но алгоритм работы, логика и вероятность выигрыша рассчитывается по совершенно другим функциям.


              Почему это самая честная игра ?
              Всё прозрачно. Результаты записываются в блокчейн и их невозможно фальсифицировать, подделать или узнать заранее.

              Как я могу выиграть?
              По теории вероятности ваш выигрыш определяется как отношение 1 к общему  количеству участников.

              От чего зависит выигрыш?
              От количества купленных вами билетов в каждой игре

              Влияет ли количество купленных билетов на выигрыш?
              Да, пропорционально

              Бывают ли другие условия розыгрышей?
              Сумма и количество билетов устанавливается администратором игры. Администратором игры может стать любой желающий. Хотите узнать как стать администратором?

              Как пригласить друзей?
              Поделиться ссылкой на игру

              Как получить реферальные?
              Напишите нашему администратору если можете пригласить большое количество игроков

              Как зарегистрировать личный кабинет?
              Активируйте metamask

            </div>

          </div>
        </div>
      </div>

      <main-footer></main-footer>


    </div>
  </div>
</template>

<script>

  //import Profile from 'components/Profile'

  import SmallHeader from 'components/SmallHeader'
  import MainNav from 'components/MainNav'
  import MainFooter from 'components/MainFooter'
  import DownloadMetamask from 'components/DownloadMetamask'


  export default {
    components: {
      SmallHeader,
      MainNav,
      MainFooter,
      DownloadMetamask
    },
    methods: {
      /*goToLot: function (x) {
       router.push({path: 'game/' + x});
       }*/
    }

  }
</script>
