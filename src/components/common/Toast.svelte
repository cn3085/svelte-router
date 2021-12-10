<script>
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import SuccessIcon from "../common/icon/SuccessIcon.svelte";
  import ErrorIcon from "../common/icon/ErrorIcon.svelte";
  import InfoIcon from "../common/icon/InfoIcon.svelte";
  import CloseIcon from "../common/icon/CloseIcon.svelte";
  import { dismissToast } from "../../js/toast_store";

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
  }

  function pauseDismiss() {
    clearTimeout(timeoutId);
    const dismissTime = renderStartTime + timeout;
    const remain = dismissTime - Date.now();
    remainTime = remain;
  }
</script>

<article
  role="alert"
  transition:fade
  on:mouseleave={resumeDismiss}
  on:mouseenter={pauseDismiss}
>
  <div class="alert_tag {type}"></div>
  <div class="alert_content">
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
      <div class="close" on:click={() => dispatch("dismiss")}>
        <CloseIcon width="0.8em" />
      </div>
    {/if}
  </div>
</article>

<style>
  article {
    color: white;
    border-radius: 0.2rem;
    display: inline-flex;
    margin: 0 0 0.5rem 0;
    width: 20rem;
    box-shadow: 0 10px 20px 0 rgba(155, 155, 155, 0.16);
    border: solid 1px #d9d9d9;
    background-color: #fff
  }
  .alert_tag{
    width: 5px;
    height: auto;
  }
  .alert_content{
    display: flex;
    padding: 5px 20px;
    width: 100%;
  }
  .error {
    background: #ed314f;
  }
  .warn {
    background: SkyBlue;
  }
  .success {
    background: #91d656;
  }
  .info {
    background: #ffcb30;
  }
  .text {
    margin-left: 1rem;
  }
  .close {
    color: #707070;
    background: transparent;
    border: 0 none;
    padding: 0;
    margin: 0 0 0 auto;
    line-height: 1;
    font-size: 1rem;
    display: flex;
    align-items: center;
  }
</style>
