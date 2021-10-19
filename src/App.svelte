<script>
  import router from 'page'
  import { pathname } from "./js/pathname_store";

  import Toasts from "./components/Toasts.svelte";
  import About from './pages/About.svelte';
  import Test from './pages/Test.svelte';
  import Home from './pages/Home.svelte';
  import Login from "./pages/login/Login.svelte";
  import MemberList from './pages/member/MemberList.svelte';
  import Content from './components/Content.svelte';
  import MemberRegist from './pages/member/MemberRegist.svelte';
  import MemberDetail from './pages/member/MemberDetail.svelte';

  let page;
  let params;
  let querystring;

  router('/', () => page = Home)
  router('/about', () => page = About)
  router('/test', () => page = Test)
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
