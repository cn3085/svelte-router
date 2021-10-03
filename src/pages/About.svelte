<script>
  import { alertError, alertInfo, alertSuccess } from "../js/toast_store";
  import Toast from '../components/Toast.svelte'
</script>

<div>About</div>
<button on:click={() => alertSuccess(990000, "성공.")}>성공</button>
<button on:click={() => alertInfo(990000, "경고", "이미 예약된 회원입니다.\n최왈왈: 오락실")}>경고</button>
<button on:click={() => alertError(990000, "실패", "다시 시도하세요")}>에러</button>
<Toast/>
