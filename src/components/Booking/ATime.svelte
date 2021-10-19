<script>
import { alertError } from '../../js/toast_store';

    import * as t from '../../js/util/TimeUtil'

    export let state = 'NONE'; //CHOOSEN, NONE, FULL
    export let stime = t.getDatetime();
    export let etime = t.plusMinute(stime, 5);
    export let setTime;

    function selectTime(){
        if(state === 'FULL'){
            alertError(3000, 'no');
            return;
        }
        setTime(stime, etime);
    }

</script>
<div class="a_time {state.toLowerCase()}" on:click={selectTime}>
    <p>{state}</p>
    <slot></slot>
</div>
<style>
    .a_time{
        width: 100px;
        padding: 2px;
        border: 1px solid black;
    }
    .a_time:hover{
        cursor: pointer;
        padding: 0px;
        border: 3px solid black;
    }
    .a_time.none{
        background-color: none;
    }

    .a_time.choosen{
        background-color: aquamarine;
    }

    .a_time.full{
        background-color: blue;
    }
</style>