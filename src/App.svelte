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
  import Setting from './pages/setting/Setting.svelte';
  import TimeTable from './pages/timetable/TimeTable.svelte';

  let page;
  let params;
  let querystring;

  router('/', () => page = Home)
  router('/about', () => page = About)
  router('/test', () => page = Test)
  //////////////////////////////////////////////////////회원
  router('/member', (ctx, next)=> {
    $pathname = ctx.pathname;
    params = ctx.params;
    querystring = ctx.querystring;
    next();
  }, () => page = MemberList)
  router('/member/regist', (ctx, next) => {
    $pathname = ctx.pathname;
    params = ctx.params;
    querystring = ctx.querystring;
    next();
  }, () => page = MemberRegist)
  router('/member/detail/:id', (ctx, next) => {
    $pathname = ctx.pathname;
    params = ctx.params;
    querystring = ctx.querystring;
    next();
  }, () => page = MemberDetail)
  //////////////////////////////////////////////////////예약
  router('/reservation', (ctx, next)=> {
    $pathname = ctx.pathname;
    params = ctx.params;
    querystring = ctx.querystring;
    next();
  }, () => page = ReservationList)
  router('/reservation/regist', (ctx, next) => {
    $pathname = ctx.pathname;
    params = ctx.params;
    querystring = ctx.querystring;
    next();
  }, () => page = ReservationRegist)
  router('/reservation/detail/:id', (ctx, next) => {
    $pathname = ctx.pathname;
    params = ctx.params;
    querystring = ctx.querystring;
    next();
  }, () => page = ReservationDetail)
  //////////////////////////////////////////////////////콘텐츠
  router('/contents', (ctx, next)=> {
    $pathname = ctx.pathname;
    params = ctx.params;
    querystring = ctx.querystring;
    next();
  }, () => page = ContentsList)
  router('/contents/regist', (ctx, next) => {
    $pathname = ctx.pathname;
    params = ctx.params;
    querystring = ctx.querystring;
    next();
  }, () => page = ContentsRegist)
  router('/contents/detail/:id', (ctx, next) => {
    $pathname = ctx.pathname;
    params = ctx.params;
    querystring = ctx.querystring;
    next();
  }, () => page = ContentsDetail)
  ///////////////////////////////////////////////////////설정
  router('/setting', () => page = Setting)
  ///////////////////////////////////////////////////////기본
  router('/timetable', () => page = TimeTable)
  ///////////////////////////////////////////////////////기본
  router('/login', () => page = Login)
  router('/*', () => page = Login) //ERROR페이지로 보내기

  router.start();

  console.log('app render');
</script>


  <Content contentComponent={page} {params} {querystring}/>
{#if false}
  <Login/>
{/if}
  <Toasts />
