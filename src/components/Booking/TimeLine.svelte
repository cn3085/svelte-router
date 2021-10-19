<script>
    import ATime from "../../components/Booking/ATime.svelte";
    import { alertError } from "../../js/toast_store";
    import * as t from '../../js/util/TimeUtil'

    export let nowDate;
    export let disabledTime = [];

    let stime = null;
    let etime = null;

    let atimeList = Array.from({length:12}, (_, i) => {
        let state = 'NONE';
        let stime = t.plusMinute(nowDate, i*5);
        let etime = t.plusMinute(stime, 5);
        
        let containsDisable = disabledTime.filter( disable => 
            disable.stime <= stime && disable.etime > stime
        )

        if(containsDisable.length > 0){
            state = 'FULL';
        }

        return {
            state: state,
            stime: stime,
            etime: etime
        }
    });


    let chooseStimeToggle = true;

    function setTime(newStime, newEtime){

        if(newEtime <= stime){
            stime = newStime;
            etime = newEtime;
            chooseStimeToggle = false;
        }else if(stime === null && etime === null || chooseStimeToggle){
            stime = newStime;
            etime = newEtime;
            chooseStimeToggle = !chooseStimeToggle;
        }else if(!chooseStimeToggle){
            etime = newEtime;
            chooseStimeToggle = !chooseStimeToggle;
        }

        let newAtimeList = [];

        try{
            newAtimeList = atimeList.map( time => {
                                            if(time.stime >= stime && time.etime <= etime){ //1. 시간 범위 안에 있는 칸들
                                                if(time.state === 'FULL'){ //1-1. FULL인 칸을 포함하면 안 된다
                                                    throw new Error('안돼');
                                                }
                                                time.state = 'CHOOSEN'; //1-2. 시간 범위 안에 있다면 선택된다
                                            }else{
                                                if(time.state === 'CHOOSEN'){//2. 이전에 선택됐던 칸들이 시간 범위 밖에 있다면
                                                    time.state = 'NONE'; //2-1. 선택 해제
                                                }
                                            }
                                            return time;
                                        });
        }catch(e){
            stime = null;
            etime = null;
            newAtimeList = atimeList.map( time => {
                if(time.state === 'CHOOSEN') {
                    time.state = 'NONE'
                };
                return time;
            });
            alertError(3000, '안 돼요');
        }
        atimeList = newAtimeList;
    }

</script>
<div class="time_line">
    {#each atimeList as time}
        <ATime {...time} {setTime}>
            <p>{time.stime}</p>
            <p>{time.etime}</p>
        </ATime>
    {/each}
</div>
<div>{stime}</div>
<div>{etime}</div>
<style>
    .time_line{
        display: flex;
    }
</style>