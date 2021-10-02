<script>
  import { alertInfo } from "../js/toast_store";
</script>

<div>About</div>
<button on:click={() => alertInfo(30000, "등록되었습니다.", "이름:멍멍멍")}
  >버튼</button
>
