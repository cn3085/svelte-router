<script>
    import { pathname } from "../js/pathname_store"

    function toggleMenu(e){
        document.querySelectorAll('.main_menu').forEach( ele => ele.classList.remove('active_menu'));
        e.currentTarget.closest('.main_menu').classList.add('active_menu');

    }
</script>

<nav id="nav">
  <ul>
      <li>
          <div class="main_menu">
              <div class="title" on:click={toggleMenu}>
                  <div class="menu_icon">
                      <img src="/images/common/home.png" alt="" srcset="">
                  </div>
                  <div class="menu_name">메인</div>
                  <div class="menu_arrow">></div>
              </div>
              <div class="sub_menu">
                  <ul>
                      <li>
                          <a class="sub_name" href="/member/regist">예약 확인</a>
                      </li>
                  </ul>
              </div>
          </div>
      </li>
      <li>
          <div class="main_menu" class:active_menu={$pathname.includes('/member')}>
              <div class="title" on:click={toggleMenu}>
                  <div class="menu_icon">
                      <img src="/images/common/member.png" alt="" srcset="">
                  </div>
                  <div class="menu_name">회원관리</div>
                  <div class="menu_arrow">></div>
              </div>
              <div class="sub_menu">
                  <ul>
                        <li>
                            <a class="sub_name"
                               class:active_menu={$pathname.includes('/member/regist')}
                               href="/member/regist" >회원등록</a>
                        </li>
                        <li>
                            <a class="sub_name"
                               class:active_menu={$pathname === '/member' || $pathname.includes('/member/detail')}
                               href="/member" >회원조회</a>
                        </li>
                  </ul>
              </div>
          </div>
      </li>
      <li>
          <div class="main_menu" class:active_menu={$pathname.includes('/reservation')}>
              <div class="title" on:click={toggleMenu}>
                  <div class="menu_icon">
                      <img src="/images/common/reservation.png" alt="" srcset="">
                  </div>
                  <div class="menu_name">예약관리</div>
                  <div class="menu_arrow">></div>
              </div>
              <div class="sub_menu">
                  <ul>
                      <li>
                          <a class="sub_name"
                             class:active_menu={$pathname.includes('/reservation/regist')}
                             href="/reservation/regist" >예약등록</a>
                      </li>
                      <li>
                          <a class="sub_name"
                             class:active_menu={$pathname === '/reservation' || $pathname.includes('/reservation/detail')}
                             href="/reservation" >예약조회</a>
                      </li>
                  </ul>
              </div>
          </div>
      </li>
      <li>
          <div class="main_menu" class:active_menu={$pathname.includes('/contents')}>
              <div class="title" on:click={toggleMenu}>
                  <div class="menu_icon">
                      <img src="/images/common/contents.png" alt="" srcset="">
                  </div>
                  <div class="menu_name">콘텐츠관리</div>
                  <div class="menu_arrow">></div>
              </div>
              <div class="sub_menu">
                  <ul>
                      <li>
                          <a class="sub_name"
                             class:active_menu={$pathname.includes('/contents/regist')}
                             href="/contents/regist" >콘텐츠등록</a>
                      </li>
                      <li>
                          <a class="sub_name"
                             class:active_menu={$pathname === '/contents' || $pathname.includes('/contents/detail')}
                             href="/contents" >콘텐츠조회</a>
                      </li>
                  </ul>
              </div>
          </div>
      </li>
      <li>
          <div class="main_menu">
              <div class="title" on:click={toggleMenu}>
                  <div class="menu_icon">
                      <img src="/images/common/stats.png" alt="" srcset="">
                  </div>
                  <div class="menu_name">통계관리</div>
                  <div class="menu_arrow">></div>
              </div>
              <div class="sub_menu">
                  <ul>
                      <li>
                          <a href="http://" >회원등록</a>
                      </li>
                      <li>
                          <a href="http://" >회원조회</a>
                      </li>
                  </ul>
              </div>
          </div>
      </li>
  </ul>
</nav>

<!-- <nav>
  <div>
    <a href="/" >Home</a>
  </div>
  <div>
    <a href="/about" >About</a>
  </div>
  <div>
    <a href="/blog" >Blog</a>
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
    transition: height ease .7s;
    margin-bottom: 8px;
    user-select: none;
    overflow: hidden;
    height: 46px;
}

.main_menu > .title {
    display: flex;
    background-color: #ffea71;
    border-left: 5px solid #ffea71;
    padding: 11px 15px;
    justify-content: space-between;
    opacity: 40%;
    align-items: center;
    cursor: pointer;
    transition: opacity ease .7s;
}

.main_menu.active_menu {
    height: 105px;
}

.main_menu.active_menu .title {
    opacity: 100%;
    background-color: #ffea71;
    border-left: 5px solid #fbd600;
}
.main_menu.active_menu .menu_arrow{
    transform: rotate(90deg);
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
    transition: all ease .7s;
    font-weight: bolder;
}


.main_menu .sub_menu{
    padding-left: 50%;
    font-size: 12px;
    max-height: 100%;
    overflow: hidden;
}

.sub_menu li{
    margin: 10px 0;
}

.sub_name.active_menu{
    font-weight: bolder;
    text-decoration: underline;
}
</style>
