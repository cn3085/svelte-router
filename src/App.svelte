<script>
  import router from 'page'
  import { pathname } from "./js/pathname_store";

  import Toasts from "./components/common/Toasts.svelte";
  import About from './pages/About.svelte';
  import Test from './pages/Test.svelte';
  import Home from './pages/Home.svelte';
  import Login from "./pages/login/Login.svelte";
  import Content from './components/Content.svelte';
  import MemberList from './pages/member/MemberList.svelte';
  import MemberRegist from './pages/member/MemberRegist.svelte';
  import MemberDetail from './pages/member/MemberDetail.svelte';
  import ReservationList from './pages/reservation/ReservationList.svelte';
  import ReservationRegist from './pages/reservation/ReservationRegist.svelte';
  import ReservationDetail from './pages/reservation/ReservationDetail.svelte';
  import ContentsList from './pages/contents/ContentsList.svelte';
  import ContentsRegist from './pages/contents/ContentsRegist.svelte';
  import ContentsDetail from './pages/contents/ContentsDetail.svelte';
  import Statistics from './pages/statistics/Statistics.svelte';
  import Setting from './pages/setting/Setting.svelte';
  import TimeTable from './pages/timetable/TimeTable.svelte';
  import Confirm from './pages/Confirm.svelte';
  import ConfirmTest from './pages/ConfirmTest.svelte';
  import Game from './pages/game/Game.svelte';
  import { isLogin } from './js/service/LoginService';
  import TodayReservationTable from './pages/reservation/TodayReservationTable.svelte';

  let page;
  let params;
  let querystring;

  router('/', (ctx, next) => {
    isLogin();
    $pathname = ctx.pathname;
    next();
  }, () => page = TodayReservationTable)
  router('/about', () => page = About)
  router('/blog', () => page = ConfirmTest)
  router('/test', () => page = Test)
  router('/game', () => page = Game)
  //////////////////////////////////////////////////////회원
  router('/member', (ctx, next)=> {
    isLogin();
    $pathname = ctx.pathname;
    params = ctx.params;
    querystring = ctx.querystring;
    next();
  }, () => page = MemberList)
  router('/member/regist', (ctx, next) => {
    isLogin();
    $pathname = ctx.pathname;
    params = ctx.params;
    querystring = ctx.querystring;
    next();
  }, () => page = MemberRegist)
  router('/member/detail/:id', (ctx, next) => {
    isLogin();
    $pathname = ctx.pathname;
    params = ctx.params;
    querystring = ctx.querystring;
    next();
  }, () => page = MemberDetail)
  //////////////////////////////////////////////////////예약
  router('/reservation', (ctx, next)=> {
    isLogin();
    $pathname = ctx.pathname;
    params = ctx.params;
    querystring = ctx.querystring;
    next();
  }, () => page = ReservationList)
  router('/reservation/today', (ctx, next)=> {
    isLogin();
    $pathname = ctx.pathname;
    params = ctx.params;
    querystring = ctx.querystring;
    next();
  }, () => page = TodayReservationTable)
  router('/reservation/regist', (ctx, next) => {
    isLogin();
    $pathname = ctx.pathname;
    params = ctx.params;
    querystring = ctx.querystring;
    next();
  }, () => page = ReservationRegist)
  router('/reservation/detail/:id', (ctx, next) => {
    isLogin();
    $pathname = ctx.pathname;
    params = ctx.params;
    querystring = ctx.querystring;
    next();
  }, () => page = ReservationDetail)
  //////////////////////////////////////////////////////콘텐츠
  router('/contents', (ctx, next)=> {
    isLogin();
    $pathname = ctx.pathname;
    params = ctx.params;
    querystring = ctx.querystring;
    next();
  }, () => page = ContentsList)
  router('/contents/regist', (ctx, next) => {
    isLogin();
    $pathname = ctx.pathname;
    params = ctx.params;
    querystring = ctx.querystring;
    next();
  }, () => page = ContentsRegist)
  router('/contents/detail/:id', (ctx, next) => {
    isLogin();
    $pathname = ctx.pathname;
    params = ctx.params;
    querystring = ctx.querystring;
    next();
  }, () => page = ContentsDetail)
  ///////////////////////////////////////////////////////통계
  router('/statistics', (ctx, next) => {
    isLogin();
    $pathname = ctx.pathname;
    params = ctx.params;
    querystring = ctx.querystring;
    next();
  }, () => page = Statistics)
  ///////////////////////////////////////////////////////설정
  router('/setting', (ctx, next) => {
    isLogin();
    $pathname = ctx.pathname;
    next();
  }, () => page = Setting)
  ///////////////////////////////////////////////////////예약표
  router('/timetable', () => page = TimeTable)
  ///////////////////////////////////////////////////////기본
  router('/login', () => page = Login)
  router('/*', () => page = Login) //ERROR페이지로 보내기

  router.start();
</script>


  <Content contentComponent={page} {params} {querystring}/>
{#if false}
  <Login/>
{/if}
  <Toasts />
  <Confirm/>
