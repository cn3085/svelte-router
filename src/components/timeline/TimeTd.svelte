<script>
    import dayjs from 'dayjs'
    import { setTime } from '../../js/reservation_store';
    import { alertError } from '../../js/toast_store';

    export let state = 'NONE'; //CHOOSEN, NONE, FULL
    export let startDate = null;
    export let endDate = null;

    const m = dayjs(endDate).get('m');

    function selectTime(){
        if(state === 'FULL'){
            alertError(3000, 'no');
            return;
        }
        setTime(startDate, endDate);
    }
</script>

<div class="time_td {state.toLowerCase()}" class:hour={m === 0} class:half={m === 30} on:click={selectTime}>

</div>

<style>
    .time_td{
        box-sizing: border-box;
        border-right: 1px dashed #a6a6a7;;
        height: 110px;
        width: 70px;
        flex-grow: 0;
        flex-shrink: 0;
        flex-basis: auto;
    }
    .time_td.hour{
        border-right: 1px solid black;
    }
    .time_td.half{
        border-right: 1px dashed black;
    }
    .time_td:hover{
        cursor: pointer;
        background-color: #e6e6e6;
    }
    .time_td.none{
        background-color: none;
    }

    .time_td.choosen{
        background-color: aquamarine;
    }

    .time_td.full{
        background-color: blue;
    }
</style>