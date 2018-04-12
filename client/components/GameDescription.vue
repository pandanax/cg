<template>

  <div class="description-inside">
    <!--<div v-if="gameId" class="">
    Вступление к описанию игры, которое будет немного позже. Далее идут дополнительные фишки

    </div>-->

    <div class="f-text-desc">

      {{$lang.messages.txt1}}

    </div>

    <!--<div>
      {{$lang.messages.currentRound}}: #{{game.currentPeriod | int}}
    </div>
    <div>
      {{$lang.messages.ticketPrice}}: {{game.ticketPrice | eth}}
    </div>
    <div>
      {{$lang.messages.bank}}: {{game.period.raised | eth}}
    </div>

    <div>
      {{$lang.messages.stock}}: {{game.maxTicketAmount - game.period.ticketAmount | int}}
    </div>-->
    <div>
      {{$lang.messages.maxTicketAmount}}: {{game.maxTicketAmount | int}}
    </div>

    <div>
      {{$lang.messages.benefit}}: {{game.benefitPercents | int}}%
    </div>
    <div>
      {{$lang.messages.jpp}}: {{game.jackPotPercents | int}}%
    </div>
    <div>
      {{$lang.messages.gpp}}: {{100 - game.benefitPercents - game.jackPotPercents | int}}%
    </div>
    <!--<div>
      {{$lang.messages.jackpot}}: {{game.jackPotFunds | eth}}
    </div>-->


    <div v-if="game.period.ticketAmount > 0 && game.period.finished" class="description-cube-container cap ">

      <cube :hash="game.period.winnerHash"></cube>
      <span>
        {{game.period.winnerHash | bytes}}
      </span>
    </div>

  </div>

</template>
<script>
  import Cube from 'components/Cube'


  export default {
    components: {Cube},
    props: ['gameId', 'game']

  }


</script>
<style>

.description-cube-container {
  margin-top: 20px;
}
.description-cube-container span {
  font-size: 14px;
  vertical-align: middle;
  margin-left: 5px;
}

  .description-cube-container .cube-outer {
    width: 32px;
    height: 32px;
  }
  .f-text-desc {
    margin-bottom: 10px;
  }

</style>
