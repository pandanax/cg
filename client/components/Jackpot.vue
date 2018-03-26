<template>
  <div class="jackpot cap ow">

    <div class="container">
      <div class="jackpot-str font-white">
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
</template>
<style scoped="">


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

</style>
