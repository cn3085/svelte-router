<script>
  import Router from "svelte-spa-router";
  import { replace } from "svelte-spa-router";
  import routes from "./js/routes";
  import Header from "./components/Header.svelte";
  import Nav from "./components/Nav.svelte";
  import Toasts from "./components/Toasts.svelte";

  function conditionsFailed(event) {
    console.error("conditionsFailed event", event.detail);
    replace("/");
  }

  function routeLoaded(event) {
    console.log("routedLoaded", event.detail);
    if(isValidLogin()){//여기서 login체크
      $isUserLogin = true;
    }else{
      $isUserLogin = false;
    }
  }
</script>

<Header />
<Nav />
<section id="content_area">
  <Router
    {routes}
    on:conditionsFailed={conditionsFailed}
    on:routeLoaded={routeLoaded}
  />
</section>
<Toasts />

{#if $isUserLogin}
  <Header />
  <Nav />
  <section id="content_area">
    <Router
      {routes}
      on:conditionsFailed={conditionsFailed}
      on:routeLoaded={routeLoaded}
    />
  </section>
{:else}
  <Login />
{/if}
