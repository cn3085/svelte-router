<script>
  import Router from "svelte-spa-router";
  import { replace } from "svelte-spa-router";
  import routes from "./js/routes";
  import Header from "./components/Header.svelte";
  import Nav from "./components/Nav.svelte";

  function conditionsFailed(event) {
    console.error("conditionsFailed event", event.detail);
    replace("/");
  }

  function routeLoaded(event) {
    console.log("routedLoaded", event.detail);
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

<style>
  #content_area {
    margin-left: 50px;
  }
</style>
