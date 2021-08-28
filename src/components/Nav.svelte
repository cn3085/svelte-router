<script>
  import { link } from "svelte-spa-router";
  import active from "svelte-spa-router/active";
</script>

<nav>
  <div>
    <a href="/" use:link use:active>Home</a>
  </div>
  <div>
    <a href="/about" use:link use:active>About</a>
  </div>
  <div>
    <a href="/blog" use:link use:active>Blog</a>
  </div>
</nav>

<style>
  :global(nav a.active) {
    font-weight: bold;
    text-decoration: underline;
  }
  :global(nav) {
    position: fixed;
  }
</style>
