<script>
    import { confirm } from "../js/confirm_store";
    let a = '크크';
    let b = '바보';
    function test(){
        confirm('진짜 하실겁니까?', () => console.log(a, b + ' !!!'));
    }
</script>

<div on:click={test}>
    버튼
</div>
