<script>
  import router from 'page'
  import Header from "./components/Header.svelte";
  import Nav from "./components/Nav.svelte";
  import About from './pages/About.svelte';
  import Home from './pages/Home.svelte';
  import Login from "./pages/login/Login.svelte";
  import MemberList from './pages/member/MemberList.svelte';

  let page;

  router('/', () => page = Home)
  router('/about', () => page = About)
  router('/member', () => page = MemberList)

  router.start();

  console.log('app render');
</script>

  <Header />
  <Nav />
  <section id="content_area">
    <svelte:component this={page}/>
  </section>
{#if false}
  <Login/>
{/if}