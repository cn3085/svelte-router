<script>
    import dayjs from 'dayjs';
    export let endDate = null;

    let h = dayjs(endDate).get('h');
    h = h > 12 ? h - 12 : h;
    const m = dayjs(endDate).get('m');
</script>
<div class="time_head hour" class:hour={m === 0} class:half={m === 30}>
    <div class="time_number">
        {#if m === 0}
            {('' + h).padStart(2, '0')}    
        {:else}
            {('' + m).padStart(2, '0')}
        {/if}
    </div>
</div>

<style>
    .time_head{
        box-sizing: border-box;
        width: 70px;
        height: 8px;
        margin-top: 20px;
        border-bottom: 1px solid #a6a6a7;
        border-right: 1px solid #a6a6a7;
        position: relative;
        flex-grow: 0;
        flex-shrink: 0;
        flex-basis: auto;
    }

    .time_head .time_number{
        color: #a6a6a7;
        font-size: 10px;
        position: inherit;
        left: 65px;
        top: -15px;
    }
    .time_head.hour{
        height: 10px;
        border-right: 1px solid black;
    }
    .time_head.hour .time_number{
        color: black;
        font-size: 16px;
        left: 62px;
        top: -22px;
    }
    .time_head.half{
        height: 9px;
    }
    .time_head.half .time_number{
        color: #7c7c7c;
        font-size: 12px;
        left: 64px;
        top: -16px;
    }
    /* :global(.time_line .time_head:last-child){
      border-bottom: none;
    } */
</style>