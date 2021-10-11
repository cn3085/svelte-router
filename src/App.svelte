<script>
  import router from 'page'

  import Toasts from "./components/Toasts.svelte";
  import About from './pages/About.svelte';
  import Home from './pages/Home.svelte';
  import Login from "./pages/login/Login.svelte";
  import MemberList from './pages/member/MemberList.svelte';
  import Content from './components/Content.svelte';
  import MemberRegist from './pages/member/MemberRegist.svelte';
  import MemberDetail from './pages/member/MemberDetail.svelte';

  let page;
  let params;

  router('/', () => page = Home)
  router('/about', () => page = About)
  router('/member', (ctx, next)=> {
    params = ctx.params;  
    console.log(ctx);
    next();
  }, () => page = MemberList)
  router('/member/regist', () => page = MemberRegist)
  router('/member/detail/:id', (ctx, next) => {
    params = ctx.params;
    console.log(params);
    console.log(ctx);
    next();
  }, () => page = MemberDetail)
  router('/login', () => page = Login)
  router('/*', () => page = Login) //ERROR페이지로 보내기

  router.start();

  console.log('app render');
</script>


  <Content contentComponent={page} {params}/>
{#if false}
  <Login/>
{/if}
  <Toasts />
