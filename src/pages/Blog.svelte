<script>
  import { alertError } from "../js/toast_store";
</script>

<div>Blog</div>
<button on:click={() => alertError(30000, "실패했습니다.\n가나다")}>버튼</button
>
