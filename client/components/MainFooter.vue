<template>
  <footer>
    <div class="blue-bg footer-container font-white">

      <div class="container">

        <div class="footer-inner">

          <div class="row">
            <div class="col-sm cap">
              <div class="footer-copy">
                2018 (c) galaxy crypto games
              </div>
              <div class="left-links">
                <ul>
                  <li>
                    <a href="">
                      {{$lang.messages.contacts}}
                    </a>
                  </li>
                  <li>
                    <a href="">
                      {{$lang.messages.partnership}}
                    </a>
                  </li>
                  <li>
                    <a href="">
                      white paper
                    </a>
                  </li>
                  <li>
                    <a href="" class="ico-big-link">
                      ICO
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-sm">

              <div class="right-links cap">
                <ul>
                  <li>
                    <a href="">
                      {{$lang.messages.about}}
                    </a>
                  </li>
                  <li>
                    <a href="">
                      {{$lang.messages.question}}
                    </a>
                  </li>
                  <li>
                    <div class="row">
                      <div class="col-sm-6">

                        <a href="">
                          {{$lang.messages.follow}}
                        </a>
                      </div>
                      <div class="col-sm-6">
                        <a href="" class="icon-link gh"></a>
                        <a href="" class="icon-link fb"></a>
                        <a href="" class="icon-link tw"></a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div class="footer-container-eth">

                <div class="footer-eth-ico"></div>

                <div class="footer-eth-text">
                  {{$lang.messages.m6}}
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>

    </div>
  </footer>
</template>
<style>
  footer {

  }

  .footer-container {
    line-height: 32px;

  }

  .footer-inner {
    padding-top: 44px;
    padding-bottom: 108px;
  }

  .footer-container ul {
    list-style: none;
    line-height: 32px;

    margin: 0;
    padding: 0;

  }

  .footer-container .left-links ul {

    padding: 17px 0 0;
    font-size: 14px;
  }

  .footer-container .right-links ul {
    padding: 0px 0 0;
    font-size: 16px;
    line-height: 34px;
  }

  .footer-container ul li {
    margin: 0;
    padding: 0;

  }

  .footer-container ul li a {
    color: white;
  }

  .footer-container-eth {

  }

  .footer-eth-text {
    margin: 0 0 0 120px;
    font-size: 25px;
    padding: 44px  16px 0 0;
  }

  .footer-eth-ico {
    background-image: url(/static/header/e.png);
    width: 87px;
    height: 138px;
    background-size: 87px 138px;
    float: left;
    margin: 20px 20px 20px 0px;
  }

  .icon-link {
    width: 23px;
    height: 23px;
    display: inline-block;
    margin: 3px 3px;
  }

  .icon-link.fb {
    background-image: url(/static/footer/fb.png);
  }

  .icon-link.tw {
    background-image: url(/static/footer/tw.png);
  }

  .icon-link.gh {
    background-image: url(/static/footer/gh.png);
  }

  .ico-big-link {
    display: inline-block;
    margin-top: 17px;
    font-size: 22px;
  }
</style>
