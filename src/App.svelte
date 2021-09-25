<script>
  import Router from "svelte-spa-router";
  import { replace } from "svelte-spa-router";
  import routes from "./js/routes";
  import Header from "./components/Header.svelte";
  import Nav from "./components/Nav.svelte";
  import Login from "./pages/login/Login.svelte";
  import {isValidLogin} from './js/service/LoginService'
  import { isUserLogin } from "./js/service/UserStore";

  if(isValidLogin()){//여기서 login체크
    $isUserLogin = true;
  }else{
    $isUserLogin = false;
  }

  console.log('app render');

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
  <Login/>
{/if}