<script>
  import { alertSuccess } from "../js/toast_store";
</script>

<div>Home</div>
<button on:click={() => alertSuccess(30000, "실패했습니다.가나다", "123멍멍멍<br/>123123멍멍")}>버튼</button
>
