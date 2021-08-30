<script>
  import { link } from "svelte-spa-router";
  import active from "svelte-spa-router/active";
</script>

<nav id="nav">
  <ul>
      <li>
          <div class="main_menu">
              <div class="title">
                  <div class="menu_icon">
                      <img src="/images/common/home.png" alt="" srcset="">
                  </div>
                  <div class="menu_name">메인</div>
                  <div class="menu_arrow">></div>
              </div>
              <div class="sub_menu">
                  <ul>
                      <li>
                          <a href="http://" use:link use:active>회원등록</a>
                      </li>
                      <li>
                          <a href="http://" use:link use:active>회원조회</a>
                      </li>
                  </ul>
              </div>
          </div>
      </li>
      <li>
          <div class="main_menu active_menu">
              <div class="title">
                  <div class="menu_icon">
                      <img src="/images/common/member.png" alt="" srcset="">
                  </div>
                  <div class="menu_name">회원관리</div>
                  <div class="menu_arrow">></div>
              </div>
              <div class="sub_menu">
                  <ul>
                      <li>
                          <a href="http://" use:link use:active>회원등록</a>
                      </li>
                      <li>
                          <a href="http://" use:link use:active>회원조회</a>
                      </li>
                  </ul>
              </div>
          </div>
      </li>
      <li>
          <div class="main_menu">
              <div class="title">
                  <div class="menu_icon">
                      <img src="/images/common/reservation.png" alt="" srcset="">
                  </div>
                  <div class="menu_name">예약관리</div>
                  <div class="menu_arrow">></div>
              </div>
              <div class="sub_menu">
                  <ul>
                      <li>
                          <a href="http://" use:link use:active>회원등록</a>
                      </li>
                      <li>
                          <a href="http://" use:link use:active>회원조회</a>
                      </li>
                  </ul>
              </div>
          </div>
      </li>
      <li>
          <div class="main_menu">
              <div class="title">
                  <div class="menu_icon">
                      <img src="/images/common/contents.png" alt="" srcset="">
                  </div>
                  <div class="menu_name">콘텐츠관리</div>
                  <div class="menu_arrow">></div>
              </div>
              <div class="sub_menu">
                  <ul>
                      <li>
                          <a href="http://" use:link use:active>회원등록</a>
                      </li>
                      <li>
                          <a href="http://" use:link use:active>회원조회</a>
                      </li>
                  </ul>
              </div>
          </div>
      </li>
      <li>
          <div class="main_menu">
              <div class="title">
                  <div class="menu_icon">
                      <img src="/images/common/stats.png" alt="" srcset="">
                  </div>
                  <div class="menu_name">통계관리</div>
                  <div class="menu_arrow">></div>
              </div>
              <div class="sub_menu">
                  <ul>
                      <li>
                          <a href="http://" use:link use:active>회원등록</a>
                      </li>
                      <li>
                          <a href="http://" use:link use:active>회원조회</a>
                      </li>
                  </ul>
              </div>
          </div>
      </li>
  </ul>
</nav>

<!-- <nav>
  <div>
    <a href="/" use:link use:active>Home</a>
  </div>
  <div>
    <a href="/about" use:link use:active>About</a>
  </div>
  <div>
    <a href="/blog" use:link use:active>Blog</a>
  </div>
</nav> -->

<style>
#nav{
    position: fixed;
    height: 100%;
    width: 14%;
    /* border: 1px solid red; */
    margin-top: 69px;
}

.main_menu{
    margin-bottom: 8px;
    user-select: none;
}

.main_menu > .title {
    display: flex;
    width: 100%;
    background-color: #ffea71;
    border-left: 5px solid #ffea71;
    padding: 11px 15px;
    justify-content: space-between;
    opacity: 40%;
    align-items: center;
    cursor: pointer;
}

.main_menu.active_menu > .title {
    opacity: 100%;
    background-color: #ffea71;
    border-left: 5px solid #fbd600;
}
.main_menu.active_menu .menu_arrow{
    transform: rotate(90deg);
    transition: all ease .7s;
}

.menu_icon{
    width: 18px;
    margin-left: 5px;
    line-height: 13px;
}

.menu_name{
    font-size: 13px;
    width: 55%;
}

.menu_arrow{
    font-weight: bolder;
}


.main_menu .sub_menu{
    padding-left: 50%;
    font-size: 12px;
    max-height: 0px;
    transition: max-height 1s ease;
    overflow: hidden;
}

.main_menu.active_menu .sub_menu{
    max-height: 100%;
}

.sub_menu li{
    margin: 10px 0;
}
</style>
