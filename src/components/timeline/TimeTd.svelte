<script>
    export let m = 0;
</script>
<div class="time_td" class:hour={m === 0} class:half={m === 30}></div>
<style>
    .time_td{
        border-left: 1px dashed #a6a6a7;;
        height: 110px;
        width: 44px;
        flex-grow: 0;
        flex-shrink: 0;
        flex-basis: auto;
    }
    .time_td.hour{
        border-left: 1px solid black;
    }
    .time_td.half{
        border-left: 1px dashed black;
    }
</style>