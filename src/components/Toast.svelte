<script>
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import SuccessIcon from "./SuccessIcon.svelte";
  import ErrorIcon from "./ErrorIcon.svelte";
  import InfoIcon from "./InfoIcon.svelte";
  import CloseIcon from "./CloseIcon.svelte";
  import { dismissToast } from "../js/toast_store";

  const dispatch = createEventDispatcher();

  export let type = "error";
  export let dismissible = true;
  export let id = -1;
  export let timeoutId = -1;
  export let timeout = 0;
  const renderStartTime = Date.now();
  let remainTime = 0;

  function resumeDismiss() {
    setTimeout(() => dismissToast(id), remainTime);
    console.log("resume", remainTime);
  }

  function pauseDismiss() {
    clearTimeout(timeoutId);
    const dismissTime = renderStartTime + timeout;
    const remain = dismissTime - Date.now();
    remainTime = remain;
  }
</script>

<article
  class={type}
  role="alert"
  transition:fade
  on:mouseleave={resumeDismiss}
  on:mouseenter={pauseDismiss}
>
  {#if type === "success"}
    <SuccessIcon width="1.1em" />
  {:else if type === "error"}
    <ErrorIcon width="1.1em" />
  {:else}
    <InfoIcon width="1.1em" />
  {/if}

  <div class="text">
    <slot />
  </div>

  {#if dismissible}
    <button class="close" on:click={() => dispatch("dismiss")}>
      <CloseIcon width="0.8em" />
    </button>
  {/if}
</article>

<style>
  article {
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 0.2rem;
    display: inline-flex;
    align-items: center;
    margin: 0 0 0.5rem 0;
    width: 20rem;
  }
  .error {
    background: IndianRed;
  }
  .success {
    background: MediumSeaGreen;
  }
  .info {
    background: SkyBlue;
  }
  .text {
    margin-left: 1rem;
  }
  button {
    color: white;
    background: transparent;
    border: 0 none;
    padding: 0;
    margin: 0 0 0 auto;
    line-height: 1;
    font-size: 1rem;
  }
</style>
