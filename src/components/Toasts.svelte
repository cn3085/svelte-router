<script>
  import Toast from "./Toast.svelte";
  import { dismissToast, toasts } from "../js/toast_store";
</script>

{#if $toasts}
  <div id="toast_area">
    {#each $toasts as t (t.id)}
      <Toast
        id={t.id}
        type={t.type}
        dismissable={t.dismissable}
        timeoutId={t.timeoutId}
        timeout={t.timeout}
        on:dismiss={() => dismissToast(t.id)}
      >
        <p class="toast_title">{t.title}</p>
        <p class="toast_message">{t.message}</p>
      </Toast>
    {/each}
  </div>
{/if}

<style>
  #toast_area {
    position: fixed;
    right: 1%;
    bottom: 0;
    display: inline-flex;
    margin-top: 1rem;
    justify-content: center;
    flex-direction: column;
    z-index: 1000;
  }

  .toast_title {
    font-weight: bolder;
    font-size: 14px;
  }

  .toast_message {
    font-size: 12px;
  }
</style>
